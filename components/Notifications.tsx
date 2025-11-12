// app/components/Notifications.tsx
import type { ReactElement } from 'react';

interface Noti {
  title: string;
  subtitle?: string;
}

interface NotificationsProps {
  notis?: Noti[];
}

export default function Notifications({ notis = [] }: NotificationsProps): ReactElement {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="font-medium">Thông báo gần đây</div>
        <button className="text-sm text-sky-600">Xem tất cả</button>
      </div>
      <div className="p-4">
        {notis.map((n, i) => (
          <div key={i} className="mb-3">
            <div className="font-semibold">{n.title}</div>
            {n.subtitle && <div className="text-sm text-slate-500">{n.subtitle}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
