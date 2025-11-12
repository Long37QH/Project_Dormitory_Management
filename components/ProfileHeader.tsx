// components/ProfileHeader.tsx
import type { ReactElement } from 'react';

interface ProfileHeaderProps {
  name: string;
  mssv: string;
  class: string;
  dormitory: string;
  avatarUrl?: string;
}

export default function ProfileHeader({
  name,
  mssv,
  class: studentClass,
  dormitory,
  avatarUrl = 'https://via.placeholder.com/120',
}: ProfileHeaderProps): ReactElement {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      <img
        src={avatarUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-4 border-sky-100 flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-slate-900">{name}</h3>
        <div className="text-slate-600 mt-2 space-y-1 text-sm">
          <div>
            <span className="font-medium">MSSV:</span> {mssv}
          </div>
          <div>
            <span className="font-medium">Lớp:</span> {studentClass}
          </div>
          <div>
            <span className="font-medium">Ký túc xá:</span> {dormitory}
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-900 text-center sm:text-left">
        <i className="bi bi-info-circle text-blue-600 me-2" />
        Tài khoản hoạt động
      </div>
    </div>
  );
}
