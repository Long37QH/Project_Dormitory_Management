// components/RenewalForm.tsx
'use client';
import { useState, type ReactElement } from 'react';

interface RenewalData {
  currentExpiryDate: string;
  newExpiryDate: string;
  renewalPeriod: string;
  reason: string;
  notes: string;
}

interface RenewalFormProps {
  currentRoom?: {
    roomNumber: string;
    expiryDate: string;
  };
  onSubmit?: (data: RenewalData) => void;
}

export default function RenewalForm({ currentRoom, onSubmit }: RenewalFormProps): ReactElement {
  const defaultExpiryDate = currentRoom?.expiryDate || '2025-08-31';
  const defaultRoom = currentRoom?.roomNumber || 'A101';

  const [formData, setFormData] = useState<RenewalData>({
    currentExpiryDate: defaultExpiryDate,
    newExpiryDate: '',
    renewalPeriod: '12',
    reason: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<RenewalData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate new expiry date based on current date + renewal period
  const calculateNewDate = (period: string) => {
    const currentDate = new Date(formData.currentExpiryDate);
    const months = parseInt(period);
    currentDate.setMonth(currentDate.getMonth() + months);
    return currentDate.toISOString().split('T')[0];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'renewalPeriod') {
      const newDate = calculateNewDate(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        newExpiryDate: newDate,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof RenewalData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RenewalData> = {};

    if (!formData.newExpiryDate) {
      newErrors.newExpiryDate = 'Vui lòng chọn ngày hết hạn mới';
    }

    if (!formData.reason) {
      newErrors.reason = 'Vui lòng chọn lý do gia hạn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSubmit?.(formData);
      alert('✅ Gửi yêu cầu gia hạn thành công!');
      setFormData({
        currentExpiryDate: defaultExpiryDate,
        newExpiryDate: calculateNewDate('12'),
        renewalPeriod: '12',
        reason: '',
        notes: '',
      });
    } catch (error) {
      alert('❌ Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(formData.currentExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        <i className="bi bi-arrow-repeat me-2" />
        Yêu cầu gia hạn hợp đồng
      </h2>
      <p className="text-slate-600 text-sm mb-6">Gia hạn thời gian sử dụng phòng của bạn</p>

      {/* Current Contract Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-blue-600 font-medium">Phòng hiện tại</div>
            <div className="text-slate-900 font-semibold">{defaultRoom}</div>
          </div>
          <div>
            <div className="text-blue-600 font-medium">Hợp đồng hết hạn</div>
            <div className="text-slate-900 font-semibold">
              {new Date(formData.currentExpiryDate).toLocaleDateString('vi-VN')}
            </div>
          </div>
          <div>
            <div className="text-blue-600 font-medium">Còn lại</div>
            <div className={`font-semibold ${daysUntilExpiry > 30 ? 'text-green-600' : daysUntilExpiry > 0 ? 'text-amber-600' : 'text-red-600'}`}>
              {daysUntilExpiry > 0 ? `${daysUntilExpiry} ngày` : 'Đã hết hạn'}
            </div>
          </div>
          <div>
            <div className="text-blue-600 font-medium">Trạng thái</div>
            <div className={`font-semibold ${daysUntilExpiry > 30 ? 'text-green-600' : daysUntilExpiry > 0 ? 'text-amber-600' : 'text-red-600'}`}>
              {daysUntilExpiry > 30 ? 'Còn lâu' : daysUntilExpiry > 0 ? 'Sắp hết' : 'Hết hạn'}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Renewal Period */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Kỳ gia hạn <span className="text-red-500">*</span>
          </label>
          <select
            name="renewalPeriod"
            value={formData.renewalPeriod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
          >
            <option value="6">6 tháng</option>
            <option value="12">1 năm (12 tháng)</option>
            <option value="24">2 năm (24 tháng)</option>
            <option value="36">3 năm (36 tháng)</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Hợp đồng mới sẽ kết thúc vào: {new Date(formData.newExpiryDate).toLocaleDateString('vi-VN')}</p>
        </div>

        {/* New Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ngày hết hạn mới <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="newExpiryDate"
            value={formData.newExpiryDate}
            readOnly
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600 cursor-not-allowed"
          />
          {errors.newExpiryDate && <p className="text-red-600 text-sm mt-1">{errors.newExpiryDate}</p>}
        </div>

        {/* Reason for Renewal */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Lý do gia hạn <span className="text-red-500">*</span>
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md transition ${
              errors.reason
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-sky-500 focus:ring-sky-200'
            }`}
          >
            <option value="">-- Chọn lý do --</option>
            <option value="continue_study">Tiếp tục học</option>
            <option value="work">Làm việc tại thành phố</option>
            <option value="family_business">Gia đình, công việc</option>
            <option value="satisfied">Hài lòng với phòng</option>
            <option value="other">Lý do khác</option>
          </select>
          {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú thêm</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ghi chú bất kỳ thông tin quan trọng (nếu có)..."
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200 resize-none"
          />
        </div>

        {/* Cost Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
          <i className="bi bi-info-circle me-2" />
          <strong>Thông tin phí:</strong> Bạn sẽ được thông báo chi phí gia hạn sau khi yêu cầu được duyệt.
          Thông thường, phí gia hạn bằng với tiền phòng bình thường.
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50 transition font-medium"
          >
            <i className="bi bi-send me-2" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu gia hạn'}
          </button>
          <button
            type="reset"
            className="flex-1 px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition font-medium"
          >
            <i className="bi bi-arrow-clockwise me-2" />
            Đặt lại
          </button>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-900">
        <i className="bi bi-check-circle me-2" />
        <strong>Lợi ích của gia hạn sớm:</strong> Gia hạn hợp đồng trước 1 tháng khi hết hạn sẽ giúp bạn tránh
        mất phòng và tránh những rắc rối không cần thiết.
      </div>
    </div>
  );
}
