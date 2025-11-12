// app/components/RequestsList.tsx
import type { ReactElement } from 'react';

interface Req {
  title: string;
  status: string;
}

interface RequestsListProps {
  requests?: Req[];
  onTrack?: (r: Req) => void;
}

export default function RequestsList({ requests = [], onTrack }: RequestsListProps): ReactElement {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-4 py-3 border-b border-slate-100 font-medium">Yêu cầu / Phản ánh</div>
      <div className="p-0">
        <ul className="divide-y">
          {requests.map((r, i) => (
            <li key={i} className="flex justify-between items-start p-4">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-slate-500">Trạng thái: {r.status}</div>
              </div>
              <div>
                <button onClick={() => onTrack?.(r)} className="px-2 py-1 border rounded text-sm">Chi tiết</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
