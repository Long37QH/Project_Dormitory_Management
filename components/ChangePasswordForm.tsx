// components/ChangePasswordForm.tsx
'use client';
import { useState, type ReactElement } from 'react';

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps): ReactElement {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Mật khẩu hiện tại không được để trống';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được để trống';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/(?=.*[a-z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Mật khẩu phải chứa ít nhất một chữ cái thường';
    } else if (!/(?=.*[A-Z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Mật khẩu phải chứa ít nhất một chữ cái hoa';
    } else if (!/(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Mật khẩu phải chứa ít nhất một chữ số';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu mới';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được trùng với mật khẩu hiện tại';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      alert('✅ Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
      onSuccess?.();
    } catch (error) {
      alert('❌ Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: 'Yếu', color: 'text-red-600', bgColor: 'bg-red-200' };
    if (strength <= 3) return { level: 'Trung bình', color: 'text-yellow-600', bgColor: 'bg-yellow-200' };
    return { level: 'Mạnh', color: 'text-green-600', bgColor: 'bg-green-200' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold mb-6">
        <i className="bi bi-shield-lock me-2" />
        Đổi mật khẩu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              className={`w-full px-3 py-2 border rounded-md pr-10 transition ${
                errors.currentPassword ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              <i className={`bi ${showPasswords.current ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>
          {errors.currentPassword && <p className="text-red-600 text-sm mt-1">{errors.currentPassword}</p>}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
              className={`w-full px-3 py-2 border rounded-md pr-10 transition ${
                errors.newPassword ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              <i className={`bi ${showPasswords.new ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.bgColor} transition-all`}
                    style={{ width: `${(getPasswordStrength(formData.newPassword).level === 'Yếu' ? 33 : getPasswordStrength(formData.newPassword).level === 'Trung bình' ? 66 : 100)}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${passwordStrength.color}`}>
                  {passwordStrength.level}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                ✓ Tối thiểu 8 ký tự
                <br />
                ✓ Chứa chữ cái hoa, thường, số
              </div>
            </div>
          )}

          {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu mới"
              className={`w-full px-3 py-2 border rounded-md pr-10 transition ${
                errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              <i className={`bi ${showPasswords.confirm ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Warning Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
          <i className="bi bi-exclamation-triangle me-2" />
          Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50 transition"
          >
            <i className="bi bi-check-lg me-2" />
            {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </button>
        </div>
      </form>
    </div>
  );
}
