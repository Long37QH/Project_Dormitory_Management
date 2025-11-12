// app/components/Modal.tsx
'use client';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ModalContent } from './Layout';

interface ModalProps {
  content: ModalContent | null;
  onClose: () => void;
}

export default function Modal({ content, onClose }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h5 className="font-semibold">{content.title}</h5>
          <button className="text-slate-500" onClick={onClose}><i className="bi bi-x-lg" /></button>
        </div>
        <div className="p-4">{content.body}</div>
        <div className="p-4 border-t text-right">{content.footer ?? null}</div>
      </div>
    </div>
  );
}
