'use client';
import { useState, type ReactElement } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileForm from '@/components/ProfileForm';
import ChangePasswordForm from '@/components/ChangePasswordForm';

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

export default function ProfilePage(): ReactElement {
  // Mock data - In production, this would come from API
  const [profile, setProfile] = useState<StudentProfile>({
    mssv: '200101',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@student.edu.vn',
    phone: '0912345678',
    emergencyContact: 'Mẹ - Nguyễn Thị B',
    emergencyPhone: '0987654321',
    class: 'CTK43',
    dormitory: 'Ký túc xá A - Phòng A101',
  });

  const [saveMessage, setSaveMessage] = useState<string>('');

  const handleProfileSave = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    setSaveMessage('Thông tin cá nhân đã được cập nhật');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handlePasswordSuccess = () => {
    // Optionally redirect to login or logout
    console.log('Password changed successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          <i className="bi bi-person-vcard me-2" />
          Hồ sơ cá nhân
        </h1>
        <p className="text-slate-600">Quản lý thông tin cá nhân, liên hệ và bảo mật tài khoản</p>
      </div>

      {/* Profile Header with Avatar */}
      <ProfileHeader
        name={profile.name}
        mssv={profile.mssv}
        class={profile.class}
        dormitory={profile.dormitory}
      />

      {/* Success Message */}
      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center gap-2">
          <i className="bi bi-check-circle" />
          {saveMessage}
        </div>
      )}

      {/* Profile Form */}
      <ProfileForm initialData={profile} onSave={handleProfileSave} />

      {/* Change Password Form */}
      <ChangePasswordForm onSuccess={handlePasswordSuccess} />

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">
          <i className="bi bi-info-circle me-2" />
          Thông tin hữu ích
        </h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>
            <i className="bi bi-check-circle text-green-600 me-2" />
            Cập nhật email và số điện thoại để nhận thông báo quan trọng
          </li>
          <li>
            <i className="bi bi-check-circle text-green-600 me-2" />
            Số liên hệ khẩn cấp được dùng trong trường hợp cần thiết
          </li>
          <li>
            <i className="bi bi-check-circle text-green-600 me-2" />
            Đổi mật khẩu định kỳ để bảo vệ tài khoản của bạn
          </li>
          <li>
            <i className="bi bi-check-circle text-green-600 me-2" />
            Không chia sẻ mật khẩu với bất kỳ ai, kể cả nhân viên quản lý
          </li>
        </ul>
      </div>
    </div>
  );
}
