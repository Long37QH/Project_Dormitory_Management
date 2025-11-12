// app/components/Transactions.tsx
import type { ReactElement } from 'react';

interface Tx {
  title: string;
  date: string;
  method?: string;
  amount: string;
}

interface TransactionsProps {
  items?: Tx[];
}

export default function Transactions({ items = [] }: TransactionsProps): ReactElement {
  return (
    <div className="bg-white rounded-xl shadow-sm mb-4">
      <div className="px-4 py-3 border-b border-slate-100 font-medium">Lịch sử giao dịch gần nhất</div>
      <div className="p-0">
        <div className="divide-y">
          {items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-start p-4">
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-slate-500">{it.date}{it.method ? ` — ${it.method}` : ''}</div>
              </div>
              <div className="text-right">{it.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
