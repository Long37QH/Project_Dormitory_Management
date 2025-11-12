// app/page.tsx
'use client';
import CardStat from '@/components/CardStat';
import QuickActions from '@/components/QuickActions';
import Notifications from '@/components/Notifications';
import Transactions from '@/components/Transactions';
import RequestsList from '@/components/RequestsList';
import ProfileSummary from '@/components/ProfileSummary';
import type { ReactElement } from 'react';

export default function Page(): ReactElement {
  const notis = [
    { title: 'Lịch thu tiền phòng tháng 11', subtitle: 'Hạn nộp: 20/11/2025' },
    { title: 'Cúp điện tòa A', subtitle: '12/11/2025 — Bảo trì' },
  ];

  const transactions = [
    { title: 'Tiền phòng tháng 11', date: '01/11/2025', method: 'VNPay', amount: '₫800,000' },
  ];

  const requests = [
    { title: 'Đèn phòng hỏng (A101)', status: 'Đang xử lý' },
  ];

  const student = { mssv: '200101', class: 'CTK43', phone: '090xxxxxxx' };

  return (
    <>
      <h4 className="text-lg font-semibold mb-4">Bảng điều khiển của bạn</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardStat label="Phòng hiện tại" value="A101 Loại Đơn - Nam" />
        <CardStat label="Hợp đồng" value="Hiệu lực (01/09/2025 - 31/08/2026)" />
        <CardStat label="Công nợ hiện tại" value="₫ 0" valueClass="text-red-600" />
        <CardStat label="Yêu cầu đang xử lý" value="1" />
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Notifications notis={notis} />
        <div>
          <Transactions items={transactions} />
          <RequestsList requests={requests} onTrack={(r) => alert('Chi tiết: ' + r.title)} />
        </div>
      </div>

      <ProfileSummary student={student} onEdit={() => alert('Open edit modal (demo)')} />
    </>
  );
}
