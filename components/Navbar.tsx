// app/components/Navbar.tsx
'use client';
import type { MouseEventHandler } from 'react';

interface NavbarProps {
  onToggleSidebar: MouseEventHandler<HTMLButtonElement>;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <button onClick={onToggleSidebar} className="lg:hidden text-sky-600 p-1 focus:outline-none" aria-label="Toggle menu">
              <i className="bi bi-list text-2xl" />
            </button>
            <a className="font-semibold text-sky-600 text-lg" href="#">KTX Student</a>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block text-right mr-3">
              <div className="text-xs text-slate-500">Xin chào,</div>
              <div className="font-semibold" id="studentName">Nguyễn Văn A</div>
            </div>
            <img id="studentAvatar" src="https://via.placeholder.com/40" className="rounded-full ms-2 w-50px h-50px" alt="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}
