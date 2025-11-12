// app/components/QuickActions.tsx
'use client';
import type { ReactElement } from 'react';

export default function QuickActions(): ReactElement {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button onClick={() => alert('Yêu cầu phòng (demo)')} className="px-3 py-2 rounded-md bg-sky-600 text-white shadow"><i className="bi bi-door-open me-1" /> Yêu cầu phòng</button>
      <button onClick={() => alert('Nộp tiền (demo)')} className="px-3 py-2 rounded-md bg-emerald-600 text-white shadow"><i className="bi bi-wallet2 me-1" /> Nộp tiền</button>
      <button onClick={() => alert('Gửi phản ánh (demo)')} className="px-3 py-2 rounded-md bg-amber-500 text-white shadow"><i className="bi bi-bug me-1" /> Gửi phản ánh</button>
      <button onClick={() => alert('Xem hợp đồng (demo)')} className="px-3 py-2 rounded-md border border-slate-200 text-slate-700"><i className="bi bi-file-earmark-text me-1" /> Xem hợp đồng</button>
    </div>
  );
}
