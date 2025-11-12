// components/ContractView.tsx
'use client';
import { useState, type ReactElement } from 'react';

interface Contract {
  id: string;
  roomNumber: string;
  building: string;
  roomType: string;
  monthlyPrice: number;
  startDate: string;
  expiryDate: string;
  studentName: string;
  studentId: string;
  studentPhone: string;
  studentEmail: string;
  terms: string[];
}

interface ContractViewProps {
  contract?: Contract;
}

export default function ContractView({ contract }: ContractViewProps): ReactElement {
  const defaultContract: Contract = {
    id: 'HOP-DONG-001',
    roomNumber: 'A101',
    building: 'Tòa A',
    roomType: 'Phòng đơn',
    monthlyPrice: 800000,
    startDate: '2025-09-01',
    expiryDate: '2026-08-31',
    studentName: 'Nguyễn Văn A',
    studentId: '200101',
    studentPhone: '0912345678',
    studentEmail: 'nguyenvana@student.edu.vn',
    terms: [
      'Sinh viên có trách nhiệm bảo vệ và duy trì sạch sẽ phòng ở',
      'Không được phép sửa chữa hay thay đổi cấu trúc phòng',
      'Tiền điện, nước được tính theo công tơ và thanh toán hàng tháng',
      'Tiền phòng phải thanh toán đủ và đúng hạn vào ngày 1 hàng tháng',
      'Cấm sử dụng những vật dụng dễ cháy nổ trong phòng',
      'Phải tuân thủ nội quy ký túc xá và không gây ồn ào',
      'Khi hết hạn hợp đồng, phải dọn dẹp sạch sẽ và trả lại chìa khóa',
      'Mất hoặc hỏng hóc tài sản phòng phải bồi thường theo quy định',
    ],
  };

  const displayContract = contract || defaultContract;
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const downloadPDF = () => {
    alert('📥 Chức năng tải PDF sẽ sớm có. Hiện tại bạn có thể sử dụng in ra PDF từ trình duyệt.');
  };

  const printContract = () => {
    window.print();
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(displayContract.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isExpiringSoon = daysUntilExpiry < 30 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry <= 0;

  return (
    <div className="space-y-6">
      {/* Contract Status Alert */}
      {isExpired && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">
          <i className="bi bi-exclamation-triangle me-2" />
          <strong>⚠️ Hợp đồng đã hết hạn!</strong> Vui lòng liên hệ ban quản lý để gia hạn ngay.
        </div>
      )}
      {isExpiringSoon && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
          <i className="bi bi-exclamation-circle me-2" />
          <strong>⚠️ Hợp đồng sắp hết hạn!</strong> Còn {daysUntilExpiry} ngày nữa. Vui lòng gửi yêu cầu gia
          hạn trước khi hết hạn.
        </div>
      )}

      {/* Contract Document */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">HỢP ĐỒNG THUÊ PHÒNG</h1>
            <p className="text-sky-100 mt-2">Ký túc xá - Trường Đại học</p>
          </div>
          <div className="text-center text-sm text-sky-100">
            <p>Số hợp đồng: <span className="font-mono font-semibold text-white">{displayContract.id}</span></p>
          </div>
        </div>

        {/* Contract Content */}
        <div className="p-8 space-y-6">
          {/* Section 1: Parties */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-sky-300 pb-2">
              I. THÔNG TIN BÊN THUÊ
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-600 font-medium">Họ và tên</div>
                <div className="text-slate-900">{displayContract.studentName}</div>
              </div>
              <div>
                <div className="text-slate-600 font-medium">MSSV</div>
                <div className="text-slate-900 font-mono">{displayContract.studentId}</div>
              </div>
              <div>
                <div className="text-slate-600 font-medium">Số điện thoại</div>
                <div className="text-slate-900">{displayContract.studentPhone}</div>
              </div>
              <div>
                <div className="text-slate-600 font-medium">Email</div>
                <div className="text-slate-900 break-all">{displayContract.studentEmail}</div>
              </div>
            </div>
          </section>

          {/* Section 2: Room Info */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-sky-300 pb-2">
              II. THÔNG TIN PHÒNG
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-600 font-medium">Phòng số</div>
                <div className="text-slate-900 font-mono font-bold text-lg">{displayContract.roomNumber}</div>
              </div>
              <div>
                <div className="text-slate-600 font-medium">Tòa nhà</div>
                <div className="text-slate-900">{displayContract.building}</div>
              </div>
              <div>
                <div className="text-slate-600 font-medium">Loại phòng</div>
                <div className="text-slate-900">{displayContract.roomType}</div>
              </div>
              <div>
                <div className="text-slate-600 font-medium">Giá phòng/tháng</div>
                <div className="text-slate-900 font-bold">₫{displayContract.monthlyPrice.toLocaleString('vi-VN')}</div>
              </div>
            </div>
          </section>

          {/* Section 3: Duration */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-sky-300 pb-2">
              III. THỜI HẠN HỢP ĐỒNG
            </h2>
            <div className="grid grid-cols-3 gap-4 text-sm bg-blue-50 p-4 rounded-lg">
              <div>
                <div className="text-blue-600 font-medium">Bắt đầu</div>
                <div className="text-slate-900 font-semibold text-lg">
                  {new Date(displayContract.startDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
              <div>
                <div className="text-blue-600 font-medium">Kết thúc</div>
                <div className="text-slate-900 font-semibold text-lg">
                  {new Date(displayContract.expiryDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
              <div>
                <div className="text-blue-600 font-medium">Thời hạn</div>
                <div className="text-slate-900 font-semibold text-lg">12 tháng</div>
              </div>
            </div>
          </section>

          {/* Section 4: Terms and Conditions */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-sky-300 pb-2">
              IV. ĐIỀU KHOẢN VÀ ĐIỀU KIỆN
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {displayContract.terms.map((term, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-sky-600 font-bold flex-shrink-0">{idx + 1}.</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: Signature */}
          <section className="mt-8 pt-8 border-t-2 border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6 border-b-2 border-sky-300 pb-2">
              V. XÁC NHẬN
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="h-20 mb-2"></div>
                <div className="border-t border-slate-400 pt-2">
                  <p className="text-sm font-medium text-slate-900">Người thuê</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {displayContract.studentName}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="h-20 mb-2"></div>
                <div className="border-t border-slate-400 pt-2">
                  <p className="text-sm font-medium text-slate-900">Ban Quản Lý KTX</p>
                  <p className="text-xs text-slate-600 mt-1">Ngày ký: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-xs text-slate-500 pt-6 border-t border-slate-200">
            <p>Hợp đồng này được in tự động từ hệ thống. Cần giấy tờ tương đương khi thực hiện giao dịch.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={printContract}
          className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium flex items-center justify-center gap-2"
        >
          <i className="bi bi-printer" />
          In hợp đồng
        </button>
        <button
          onClick={downloadPDF}
          className="flex-1 px-6 py-3 border border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition font-medium flex items-center justify-center gap-2"
        >
          <i className="bi bi-download" />
          Tải PDF
        </button>
        <button
          onClick={() => {
            alert('Tính năng sắp có: Chia sẻ hợp đồng qua email');
          }}
          className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium flex items-center justify-center gap-2"
        >
          <i className="bi bi-share" />
          Chia sẻ
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <i className="bi bi-info-circle me-2" />
        <strong>Hợp đồng điện tử:</strong> Hợp đồng này có giá trị pháp lý như hợp đồng giấy. Bạn có thể in ra
        hoặc tải PDF để lưu trữ.
      </div>
    </div>
  );
}
