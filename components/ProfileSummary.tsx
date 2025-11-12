// app/components/ProfileSummary.tsx
import type { ReactElement } from 'react';

interface Student {
  mssv: string;
  class: string;
  phone: string;
  name?: string;
}

interface ProfileSummaryProps {
  student: Student;
  onEdit?: () => void;
}

export default function ProfileSummary({ student, onEdit }: ProfileSummaryProps): ReactElement {
  return (
    <div className="bg-white rounded-xl shadow-sm mt-6">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h6 className="font-medium mb-1">Thông tin sinh viên</h6>
          <div className="text-sm text-slate-500">MSSV: <span id="profileMSSV">{student.mssv}</span></div>
          <div className="text-sm text-slate-500">Lớp: <span id="profileClass">{student.class}</span></div>
          <div className="text-sm text-slate-500">Số điện thoại: <span id="profilePhone">{student.phone}</span></div>
        </div>
        <div>
          <button onClick={onEdit} className="px-3 py-2 border border-sky-600 text-sky-600 rounded">Chỉnh sửa hồ sơ</button>
        </div>
      </div>
    </div>
  );
}
