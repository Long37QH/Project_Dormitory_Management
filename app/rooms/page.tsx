'use client';
import { useState, type ReactElement } from 'react';
import RoomsList from '@/components/RoomsList';
import RoomRegistrationForm from '@/components/RoomRegistrationForm';
import RequestTracker from '@/components/RequestTracker';
import RenewalForm from '@/components/RenewalForm';
import ContractView from '@/components/ContractView';

interface Room {
  id: string;
  roomNumber: string;
  type: 'single' | 'double' | 'triple';
  floor: number;
  building: string;
  price: number;
  capacity: number;
  currentOccupancy: number;
  amenities: string[];
  available: boolean;
}

type TabType = 'rooms' | 'registration' | 'requests' | 'renewal' | 'contract';

export default function RoomsPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<TabType>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setActiveTab('registration');
  };

  const handleRegister = (room: Room) => {
    setSelectedRoom(room);
    setActiveTab('registration');
  };

  const handleRegistrationSubmit = (data: unknown) => {
    setRegistrationMessage('✅ Yêu cầu đăng ký phòng đã được gửi thành công!');
    setActiveTab('requests');
    setTimeout(() => setRegistrationMessage(''), 5000);
  };

  const handleRenewalSubmit = (data: unknown) => {
    alert('✅ Yêu cầu gia hạn hợp đồng đã được gửi thành công!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          <i className="bi bi-door-closed me-2" />
          Quản lý Phòng & Gia Hạn
        </h1>
        <p className="text-slate-600">
          Tra cứu phòng trống, đăng ký, theo dõi yêu cầu và gia hạn hợp đồng
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`py-3 px-4 whitespace-nowrap font-medium border-b-2 transition ${
              activeTab === 'rooms'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="bi bi-door-closed me-2" />
            Phòng Trống
          </button>
          <button
            onClick={() => setActiveTab('registration')}
            className={`py-3 px-4 whitespace-nowrap font-medium border-b-2 transition ${
              activeTab === 'registration'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="bi bi-clipboard-check me-2" />
            Đăng Ký
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-3 px-4 whitespace-nowrap font-medium border-b-2 transition ${
              activeTab === 'requests'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="bi bi-list-check me-2" />
            Yêu Cầu
          </button>
          <button
            onClick={() => setActiveTab('renewal')}
            className={`py-3 px-4 whitespace-nowrap font-medium border-b-2 transition ${
              activeTab === 'renewal'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="bi bi-arrow-repeat me-2" />
            Gia Hạn
          </button>
          <button
            onClick={() => setActiveTab('contract')}
            className={`py-3 px-4 whitespace-nowrap font-medium border-b-2 transition ${
              activeTab === 'contract'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="bi bi-file-text me-2" />
            Hợp Đồng
          </button>
        </nav>
      </div>

      {/* Success Message */}
      {registrationMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <i className="bi bi-check-circle" />
          {registrationMessage}
        </div>
      )}

      {/* Tab Content */}
      <div className="min-h-screen">
        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <RoomsList onRoomSelect={handleRoomSelect} onRegisterClick={handleRegister} />
        )}

        {/* Registration Tab */}
        {activeTab === 'registration' && (
          <RoomRegistrationForm
            selectedRoom={selectedRoom}
            onSubmit={handleRegistrationSubmit}
            onCancel={() => setActiveTab('rooms')}
          />
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && <RequestTracker />}

        {/* Renewal Tab */}
        {activeTab === 'renewal' && (
          <RenewalForm
            currentRoom={{
              roomNumber: 'A101',
              expiryDate: '2026-08-31',
            }}
            onSubmit={handleRenewalSubmit}
          />
        )}

        {/* Contract Tab */}
        {activeTab === 'contract' && <ContractView />}
      </div>

      {/* Bottom Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <i className="bi bi-info-circle text-blue-600 text-xl mb-2 block" />
          <h3 className="font-semibold text-blue-900 mb-1">Thông tin Phòng</h3>
          <p className="text-sm text-blue-800">Xem danh sách phòng trống theo loại, giá, và tiện ích.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <i className="bi bi-clipboard-check text-green-600 text-xl mb-2 block" />
          <h3 className="font-semibold text-green-900 mb-1">Đăng Ký Phòng</h3>
          <p className="text-sm text-green-800">Gửi yêu cầu đăng ký phòng yêu thích của bạn.</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
          <i className="bi bi-list-check text-sky-600 text-xl mb-2 block" />
          <h3 className="font-semibold text-sky-900 mb-1">Theo Dõi</h3>
          <p className="text-sm text-sky-800">Kiểm tra trạng thái yêu cầu và hợp đồng của bạn.</p>
        </div>
      </div>
    </div>
  );
}
