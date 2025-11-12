// components/RoomCard.tsx
import type { ReactElement } from 'react';

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
  image?: string;
}

interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
  onRegister?: (room: Room) => void;
}

export default function RoomCard({ room, onSelect, onRegister }: RoomCardProps): ReactElement {
  const getRoomTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      single: '🧑 Phòng đơn',
      double: '👥 Phòng đôi',
      triple: '👨‍👩‍👧 Phòng tập thể',
    };
    return types[type] || type;
  };

  const occupancyPercent = (room.currentOccupancy / room.capacity) * 100;
  const isAvailable = room.available && room.currentOccupancy < room.capacity;

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
        isAvailable ? 'border-slate-200 hover:border-sky-300' : 'border-red-200 opacity-75'
      }`}
      onClick={() => onSelect?.(room)}
    >
      {/* Room Image */}
      <div className="relative h-40 bg-gradient-to-br from-blue-100 to-slate-100 overflow-hidden">
        {room.image ? (
          <img src={room.image} alt={room.roomNumber} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="bi bi-door-closed text-4xl text-slate-400" />
          </div>
        )}
        {isAvailable && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Còn trống
          </div>
        )}
        {!isAvailable && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Hết chỗ
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="p-4">
        {/* Room Number & Building */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{room.roomNumber}</h3>
            <p className="text-sm text-slate-600">
              <i className="bi bi-building me-1" />
              {room.building} - Tầng {room.floor}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Loại</div>
            <div className="text-xs font-semibold text-sky-600">{getRoomTypeLabel(room.type)}</div>
          </div>
        </div>

        {/* Price */}
        <div className="bg-blue-50 rounded-md p-2 mb-3 text-center">
          <div className="text-xs text-slate-600">Giá phòng/tháng</div>
          <div className="text-lg font-bold text-sky-600">₫{room.price.toLocaleString('vi-VN')}</div>
        </div>

        {/* Occupancy */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-600">Sức chứa</span>
            <span className="text-xs font-semibold">
              {room.currentOccupancy}/{room.capacity} người
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all ${occupancyPercent < 100 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Amenities */}
        {room.amenities.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-slate-600 mb-1">Tiện ích:</p>
            <div className="flex flex-wrap gap-1">
              {room.amenities.map((amenity, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {isAvailable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister?.(room);
            }}
            className="w-full mt-3 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition font-medium text-sm"
          >
            <i className="bi bi-check-circle me-2" />
            Đăng ký phòng này
          </button>
        )}
        {!isAvailable && (
          <button
            disabled
            className="w-full mt-3 px-4 py-2 bg-slate-200 text-slate-500 rounded-md cursor-not-allowed text-sm font-medium"
          >
            Phòng này đã hết chỗ
          </button>
        )}
      </div>
    </div>
  );
}
