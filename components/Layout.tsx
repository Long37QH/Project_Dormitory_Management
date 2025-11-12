// app/components/Layout.tsx
'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Modal from './Modal';

interface LayoutProps {
  children: ReactNode;
}

export interface ModalContent {
  title: string;
  body: ReactNode;
  footer?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    function setByWidth() {
      setSidebarOpen(window.innerWidth >= 1024); // mở sidebar mặc định trên lg
    }
    setByWidth();
    window.addEventListener('resize', setByWidth);
    return () => window.removeEventListener('resize', setByWidth);
  }, []);

  return (
    <>
      <Navbar onToggleSidebar={() => setSidebarOpen(s => !s)} />

      {/* overlay only for small screens when sidebar open */}
      <div
        className={`fixed inset-0 bg-black/25 z-40 transition-opacity duration-200
                    ${sidebarOpen ? 'opacity-100 lg:opacity-0' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* layout container: use flex so on lg the sidebar (relative) occupies its width,
          and main naturally fills remaining space. On small screens the sidebar is fixed (out of flow),
          so main will be full width. */}
      <div className="w-full mx-auto sm:px-6 lg:px-0">
        <div className="flex">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-6 min-h-[calc(100vh-56px)] transition-all duration-200">
            {children}
          </main>
        </div>
      </div>

      <Modal content={null} onClose={() => {}} />
    </>
  );
}
