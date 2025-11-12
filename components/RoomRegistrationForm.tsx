// components/RoomRegistrationForm.tsx
'use client';
import { useState, type ReactElement } from 'react';

interface Room {
  id: string;
  roomNumber: string;
  type: 'single' | 'double' | 'triple';
  price: number;
}

interface RegistrationFormProps {
  selectedRoom?: Room;
  onSubmit?: (data: RegistrationData) => void;
  onCancel?: () => void;
}

interface RegistrationData {
  roomId: string;
  roomNumber: string;
  reason: string;
  startDate: string;
  notes: string;
}

export default function RoomRegistrationForm({
  selectedRoom,
  onSubmit,
  onCancel,
}: RegistrationFormProps): ReactElement {
  const [formData, setFormData] = useState<RegistrationData>({
    roomId: selectedRoom?.id || '',
    roomNumber: selectedRoom?.roomNumber || '',
    reason: '',
    startDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.roomId) {
      newErrors.roomId = 'Vui lòng chọn phòng';
    }

    if (!formData.reason) {
      newErrors.reason = 'Vui lòng chọn lý do đăng ký';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
    } else {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        newErrors.startDate = 'Ngày bắt đầu không được là ngày quá khứ';
      }
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
      setFormData({
        roomId: '',
        roomNumber: '',
        reason: '',
        startDate: '',
        notes: '',
      });
    } catch (error) {
      alert('❌ Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        <i className="bi bi-clipboard-check me-2" />
        Đăng ký phòng mới
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selected Room Info */}
        {selectedRoom && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-blue-600 font-medium">Phòng</div>
                <div className="text-slate-900 font-semibold">{selectedRoom.roomNumber}</div>
              </div>
              <div>
                <div className="text-blue-600 font-medium">Loại</div>
                <div className="text-slate-900 font-semibold">
                  {selectedRoom.type === 'single' ? 'Phòng đơn' : selectedRoom.type === 'double' ? 'Phòng đôi' : 'Phòng tập thể'}
                </div>
              </div>
              <div>
                <div className="text-blue-600 font-medium">Giá/Tháng</div>
                <div className="text-slate-900 font-semibold">₫{selectedRoom.price.toLocaleString('vi-VN')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Room Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phòng <span className="text-red-500">*</span>
          </label>
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md transition ${
              errors.roomId
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-sky-500 focus:ring-sky-200'
            }`}
          >
            <option value="">-- Chọn phòng --</option>
            <option value="A101">A101 - Phòng đơn (800,000₫/tháng)</option>
            <option value="A102">A102 - Phòng đôi (1,200,000₫/tháng)</option>
            <option value="A103">A103 - Phòng tập thể (1,500,000₫/tháng)</option>
            <option value="B202">B202 - Phòng đơn (900,000₫/tháng)</option>
            <option value="C301">C301 - Phòng tập thể (1,600,000₫/tháng)</option>
          </select>
          {errors.roomId && <p className="text-red-600 text-sm mt-1">{errors.roomId}</p>}
        </div>

        {/* Reason for Registration */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Lý do đăng ký <span className="text-red-500">*</span>
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
            <option value="new_student">Sinh viên mới</option>
            <option value="change_room">Đổi phòng</option>
            <option value="upgrade">Nâng cấp phòng</option>
            <option value="other">Lý do khác</option>
          </select>
          {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ngày bắt đầu <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md transition ${
              errors.startDate
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-sky-500 focus:ring-sky-200'
            }`}
          />
          {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú thêm</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ví dụ: Có nhu cầu đặc biệt, tình huống đặc biệt..."
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200 resize-none"
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
          <input
            type="checkbox"
            id="agreement"
            className="mt-1"
            required
          />
          <label htmlFor="agreement" className="text-sm text-slate-700">
            Tôi cam kết tuân thủ nội quy ký túc xá và sẽ thanh toán tiền phòng đúng hạn.
            Tôi hiểu rằng phòng sẽ được cấp dựa trên thứ tự đăng ký.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50 transition font-medium"
          >
            <i className="bi bi-send me-2" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu đăng ký'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition font-medium"
          >
            <i className="bi bi-x-lg me-2" />
            Hủy
          </button>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
        <i className="bi bi-exclamation-circle me-2" />
        <strong>Lưu ý quan trọng:</strong> Thời gian duyệt yêu cầu thường là 3-5 ngày làm việc.
        Bạn sẽ nhận thông báo qua email khi yêu cầu được xử lý.
      </div>
    </div>
  );
}
