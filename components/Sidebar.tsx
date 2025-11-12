// app/components/Sidebar.tsx
'use client';
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

/*
 Behaviour:
 - Mobile (<lg): fixed off-canvas, translate-x-0 when open, -translate-x-full when closed.
 - Desktop (lg+): relative (in flow) so it occupies space in the flex container and main will sit to the right.
*/

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside
      className={`z-50 w-[var(--sidebar-w)] bg-white border-r border-slate-200 p-4
        transform transition-transform duration-200 ease-in-out

        /* Mobile: fixed off-canvas */
        fixed left-0 top-0 h-full

        /* Slide in/out based on open state (works for mobile) */
        ${open ? 'translate-x-0' : '-translate-x-full'}

        /* Desktop: put sidebar back into normal flow so it occupies left column */
        lg:relative lg:translate-x-0 lg:top-auto lg:left-auto lg:h-auto lg:block lg:fixed-none`}
      aria-hidden={!open && typeof window !== 'undefined' && window.innerWidth < 1024}
    >
      <nav className="flex flex-col space-y-2">
        <a href="#" className="px-3 py-2 rounded-md bg-sky-100 text-sky-600 flex items-center gap-2"><i className="bi bi-house-door" /> Tổng quan</a>
        <a href="#profile" className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2"><i className="bi bi-person" /> Hồ sơ cá nhân</a>
        <a href="#myroom" className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2"><i className="bi bi-door-closed" /> Phòng & Hợp đồng</a>
        <a href="#payments" className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2"><i className="bi bi-receipt" /> Thanh toán</a>
        <a href="#requests" className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2"><i className="bi bi-exclamation-circle" /> Phản ánh / Bảo trì</a>
        <a href="#notifications" className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2"><i className="bi bi-bell" /> Thông báo</a>
        <a href="#history" className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2"><i className="bi bi-clock-history" /> Lịch sử</a>

        <div className="border-t border-slate-100 my-2"></div>
        <button onClick={() => { alert('Đăng xuất (demo)'); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 flex items-center gap-2">
          <i className="bi bi-box-arrow-right" /> Đăng xuất
        </button>
      </nav>
    </aside>
  );
}
