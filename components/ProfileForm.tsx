// components/ProfileForm.tsx
'use client';
import { useState, type ReactElement } from 'react';

interface StudentProfile {
  mssv: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  class: string;
  dormitory: string;
}

interface ProfileFormProps {
  initialData: StudentProfile;
  onSave?: (data: StudentProfile) => void;
}

export default function ProfileForm({ initialData, onSave }: ProfileFormProps): ReactElement {
  const [formData, setFormData] = useState<StudentProfile>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Partial<StudentProfile>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof StudentProfile]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentProfile> = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^0\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 0)';
    }

    // Validate emergency contact
    if (!formData.emergencyContact) {
      newErrors.emergencyContact = 'Tên người liên hệ không được để trống';
    }

    if (!formData.emergencyPhone) {
      newErrors.emergencyPhone = 'Số điện thoại liên hệ không được để trống';
    } else if (!/^0\d{9}$/.test(formData.emergencyPhone.replace(/\s/g, ''))) {
      newErrors.emergencyPhone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave?.(formData);
      setIsEditing(false);
      alert('✅ Cập nhật thông tin thành công!');
    } catch (error) {
      alert('❌ Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
          >
            <i className="bi bi-pencil me-2" />
            Chỉnh sửa
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* MSSV - Read only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mã số sinh viên (MSSV)
            </label>
            <input
              type="text"
              value={formData.mssv}
              disabled
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600"
            />
          </div>

          {/* Class - Read only */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Lớp
            </label>
            <input
              type="text"
              value={formData.class}
              disabled
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600"
            />
          </div>
        </div>

        {/* Name - Read only */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            value={formData.name}
            disabled
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600"
          />
        </div>

        {/* Dormitory - Read only */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ký túc xá
          </label>
          <input
            type="text"
            value={formData.dormitory}
            disabled
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600"
          />
        </div>

        {/* Editable fields */}
        <hr className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md transition ${
                !isEditing ? 'bg-slate-50 border-slate-300' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
              } ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="0xxxxxxxxx"
              className={`w-full px-3 py-2 border rounded-md transition ${
                !isEditing ? 'bg-slate-50 border-slate-300' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
              } ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-4">
          <h3 className="font-semibold text-blue-900 mb-3">
            <i className="bi bi-exclamation-circle me-2" />
            Thông tin liên hệ khẩn cấp
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Emergency Contact Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tên người liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Ví dụ: Mẹ, Cha, Chị..."
                className={`w-full px-3 py-2 border rounded-md transition ${
                  !isEditing ? 'bg-slate-50 border-slate-300' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
                } ${errors.emergencyContact ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.emergencyContact && <p className="text-red-600 text-sm mt-1">{errors.emergencyContact}</p>}
            </div>

            {/* Emergency Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Số điện thoại liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="0xxxxxxxxx"
                className={`w-full px-3 py-2 border rounded-md transition ${
                  !isEditing ? 'bg-slate-50 border-slate-300' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
                } ${errors.emergencyPhone ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.emergencyPhone && <p className="text-red-600 text-sm mt-1">{errors.emergencyPhone}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              <i className="bi bi-check-lg me-2" />
              {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition"
            >
              <i className="bi bi-x-lg me-2" />
              Hủy
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
