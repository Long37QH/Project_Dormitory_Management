// components/RequestTracker.tsx
'use client';
import { useState, type ReactElement } from 'react';

interface Request {
  id: string;
  requestType: 'registration' | 'renewal';
  roomNumber: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  expiryDate?: string;
  rejectionReason?: string;
}

interface RequestTrackerProps {
  requests?: Request[];
}

export default function RequestTracker({ requests = [] }: RequestTrackerProps): ReactElement {
  const mockRequests: Request[] = [
    {
      id: '1',
      requestType: 'registration',
      roomNumber: 'A101',
      submittedDate: '2025-11-10',
      status: 'pending',
      reason: 'Sinh viên mới',
      expiryDate: '2026-08-31',
    },
    {
      id: '2',
      requestType: 'renewal',
      roomNumber: 'A102',
      submittedDate: '2025-11-08',
      status: 'approved',
      expiryDate: '2026-08-31',
    },
    {
      id: '3',
      requestType: 'registration',
      roomNumber: 'B201',
      submittedDate: '2025-11-05',
      status: 'rejected',
      reason: 'Nâng cấp phòng',
      rejectionReason: 'Phòng không còn trống',
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const displayRequests = requests.length > 0 ? requests : mockRequests;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; icon: string }> = {
      pending: { label: 'Chờ duyệt', color: 'bg-amber-100 text-amber-800', icon: 'bi-hourglass-split' },
      approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-800', icon: 'bi-check-circle' },
      rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-800', icon: 'bi-x-circle' },
    };
    const statusInfo = statusMap[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
        <i className={`bi ${statusInfo.icon}`} />
        {statusInfo.label}
      </span>
    );
  };

  const getRequestTypeLabel = (type: string) => {
    return type === 'registration' ? '📝 Đăng ký phòng' : '🔄 Gia hạn hợp đồng';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        <i className="bi bi-list-check me-2" />
        Theo dõi yêu cầu
      </h2>

      {displayRequests.length > 0 ? (
        <div className="space-y-3">
          {displayRequests.map((request) => (
            <div key={request.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition">
              {/* Request Header */}
              <button
                onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  {/* Type Icon */}
                  <div className="text-2xl">
                    {request.requestType === 'registration' ? '🚪' : '🔄'}
                  </div>

                  {/* Request Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">
                        {getRequestTypeLabel(request.requestType)}
                      </span>
                      <span className="text-slate-600 text-sm">
                        Phòng <span className="font-mono font-bold">{request.roomNumber}</span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Gửi ngày {formatDate(request.submittedDate)}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="ml-4">{getStatusBadge(request.status)}</div>
                </div>

                {/* Toggle Icon */}
                <i
                  className={`bi bi-chevron-down ms-4 transition-transform ${
                    expandedId === request.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Request Details */}
              {expandedId === request.id && (
                <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-3">
                  {/* Basic Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600 font-medium">Mã yêu cầu</div>
                      <div className="font-mono text-slate-900">#{request.id}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 font-medium">Loại yêu cầu</div>
                      <div className="text-slate-900">
                        {request.requestType === 'registration' ? 'Đăng ký phòng' : 'Gia hạn'}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 font-medium">Phòng</div>
                      <div className="font-mono font-bold text-sky-600">{request.roomNumber}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 font-medium">Trạng thái</div>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>

                  <hr className="border-slate-300" />

                  {/* Request Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {request.reason && (
                      <div>
                        <div className="text-slate-600 font-medium">Lý do</div>
                        <div className="text-slate-900">{request.reason}</div>
                      </div>
                    )}
                    {request.expiryDate && (
                      <div>
                        <div className="text-slate-600 font-medium">Ngày hết hạn hợp đồng</div>
                        <div className="text-slate-900">{formatDate(request.expiryDate)}</div>
                      </div>
                    )}
                  </div>

                  {/* Rejection Reason */}
                  {request.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <div className="text-red-900 font-medium mb-1">Lý do từ chối:</div>
                      <div className="text-red-800">{request.rejectionReason}</div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {request.status === 'pending' && (
                      <>
                        <button className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition text-sm font-medium">
                          <i className="bi bi-pencil me-1" />
                          Chỉnh sửa
                        </button>
                        <button className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition text-sm font-medium">
                          <i className="bi bi-trash me-1" />
                          Hủy yêu cầu
                        </button>
                      </>
                    )}
                    {request.status === 'approved' && (
                      <button className="flex-1 px-4 py-2 border border-sky-300 text-sky-600 rounded-md hover:bg-sky-50 transition text-sm font-medium">
                        <i className="bi bi-file-pdf me-1" />
                        Xem hợp đồng
                      </button>
                    )}
                    {request.status === 'rejected' && (
                      <button className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition text-sm font-medium">
                        <i className="bi bi-plus-circle me-1" />
                        Tạo yêu cầu mới
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="bi bi-inbox text-5xl text-slate-300 mb-4 block" />
          <p className="text-slate-600 font-medium">Không có yêu cầu nào</p>
          <p className="text-sm text-slate-500">Bạn chưa gửi yêu cầu đăng ký hoặc gia hạn phòng</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <i className="bi bi-info-circle me-2" />
        <strong>Thông tin:</strong> Các yêu cầu đang chờ duyệt thường được xử lý trong vòng 3-5 ngày làm
        việc. Bạn sẽ nhận thông báo qua email khi có cập nhật.
      </div>
    </div>
  );
}
