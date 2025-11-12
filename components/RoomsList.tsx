// components/RoomsList.tsx
'use client';
import { useState, type ReactElement } from 'react';
import RoomCard from './RoomCard';

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

interface RoomsListProps {
  onRoomSelect?: (room: Room) => void;
  onRegisterClick?: (room: Room) => void;
}

export default function RoomsList({ onRoomSelect, onRegisterClick }: RoomsListProps): ReactElement {
  // Mock data - Replace with API call in production
  const mockRooms: Room[] = [
    {
      id: '1',
      roomNumber: 'A101',
      type: 'single',
      floor: 1,
      building: 'Tòa A',
      price: 800000,
      capacity: 1,
      currentOccupancy: 0,
      amenities: ['Giường', 'Bàn', 'Tủ'],
      available: true,
    },
    {
      id: '2',
      roomNumber: 'A102',
      type: 'double',
      floor: 1,
      building: 'Tòa A',
      price: 1200000,
      capacity: 2,
      currentOccupancy: 1,
      amenities: ['Giường × 2', 'Bàn', 'Tủ', 'Điều hòa'],
      available: true,
    },
    {
      id: '3',
      roomNumber: 'A103',
      type: 'triple',
      floor: 1,
      building: 'Tòa A',
      price: 1500000,
      capacity: 3,
      currentOccupancy: 2,
      amenities: ['Giường × 3', 'Bàn', 'Tủ', 'Điều hòa', 'Wifi'],
      available: true,
    },
    {
      id: '4',
      roomNumber: 'B201',
      type: 'double',
      floor: 2,
      building: 'Tòa B',
      price: 1300000,
      capacity: 2,
      currentOccupancy: 2,
      amenities: ['Giường × 2', 'Bàn', 'Tủ'],
      available: false,
    },
    {
      id: '5',
      roomNumber: 'B202',
      type: 'single',
      floor: 2,
      building: 'Tòa B',
      price: 900000,
      capacity: 1,
      currentOccupancy: 0,
      amenities: ['Giường', 'Bàn', 'Tủ', 'Ban công'],
      available: true,
    },
    {
      id: '6',
      roomNumber: 'C301',
      type: 'triple',
      floor: 3,
      building: 'Tòa C',
      price: 1600000,
      capacity: 3,
      currentOccupancy: 1,
      amenities: ['Giường × 3', 'Bàn', 'Tủ', 'Điều hòa', 'Wifi', 'Nước nóng'],
      available: true,
    },
  ];

  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  // Filter rooms based on criteria
  const filteredRooms = rooms.filter((room) => {
    if (selectedType !== 'all' && room.type !== selectedType) return false;
    if (selectedBuilding !== 'all' && room.building !== selectedBuilding) return false;
    if (room.price < priceRange[0] || room.price > priceRange[1]) return false;
    return true;
  });

  const uniqueBuildings = Array.from(new Set(rooms.map((r) => r.building)));
  const availableCount = filteredRooms.filter((r) => r.available && r.currentOccupancy < r.capacity).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Danh sách phòng trống</h2>
          <p className="text-slate-600 text-sm">
            Tìm phòng phù hợp với nhu cầu của bạn ({availableCount} phòng trống)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-900 text-lg">Bộ lọc</h3>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Room Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Loại phòng</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
            >
              <option value="all">Tất cả loại phòng</option>
              <option value="single">Phòng đơn</option>
              <option value="double">Phòng đôi</option>
              <option value="triple">Phòng tập thể</option>
            </select>
          </div>

          {/* Building Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tòa nhà</label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
            >
              <option value="all">Tất cả tòa nhà</option>
              {uniqueBuildings.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Giá tối đa</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
              placeholder="2,000,000"
            />
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedBuilding('all');
                setPriceRange([0, 2000000]);
              }}
              className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition"
            >
              <i className="bi bi-arrow-clockwise me-2" />
              Đặt lại
            </button>
          </div>
        </div>

        {/* Filter Results */}
        <div className="text-sm text-slate-600">
          Hiển thị <span className="font-semibold">{filteredRooms.length}</span> phòng
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelect={onRoomSelect}
              onRegister={onRegisterClick}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="bi bi-inbox text-5xl text-slate-300 mb-4 block" />
            <p className="text-slate-600 font-medium">Không tìm thấy phòng nào phù hợp</p>
            <p className="text-sm text-slate-500">Vui lòng thay đổi các điều kiện lọc</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <i className="bi bi-info-circle me-2" />
        <strong>Lưu ý:</strong> Phòng được cấp dựa trên thứ tự đăng ký. Vui lòng kiểm tra thông tin phòng
        kỹ lưỡng trước khi gửi yêu cầu.
      </div>
    </div>
  );
}
