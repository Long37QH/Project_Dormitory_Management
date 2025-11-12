// app/layout.tsx
import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'KTX Student - Dashboard',
  description: 'Dashboard quản lý sinh viên — KTX Manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
