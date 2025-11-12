// app/components/CardStat.tsx
import type { ReactElement } from 'react';

interface CardStatProps {
  label: string;
  value: string | number;
  valueClass?: string;
}

export default function CardStat({ label, value, valueClass }: CardStatProps): ReactElement {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`font-semibold mt-1 ${valueClass ?? ''}`}>{value}</div>
    </div>
  );
}
