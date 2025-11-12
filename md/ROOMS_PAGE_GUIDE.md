# 📚 Trang Phòng & Gia Hạn - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Trang **Phòng & Gia Hạn** cung cấp các chức năng quản lý phòng ký túc xá cho sinh viên:

- 🚪 **Tra cứu phòng trống** - Xem danh sách và chi tiết phòng
- 📝 **Đăng ký phòng** - Gửi yêu cầu đăng ký phòng mong muốn
- 📋 **Theo dõi yêu cầu** - Kiểm tra trạng thái các yêu cầu
- 🔄 **Gia hạn hợp đồng** - Gửi yêu cầu gia hạn thời gian
- 📄 **Xem hợp đồng** - Kiểm tra chi tiết hợp đồng hiện tại

## 🗂️ Cấu Trúc Components

### Components Tạo Mới

#### 1. **RoomCard.tsx** (95 dòng)
Hiển thị thông tin một phòng trong dạng card.

**Features:**
- Avatar/hình ảnh phòng
- Số phòng, tòa nhà, tầng
- Loại phòng (đơn/đôi/tập thể)
- Giá phòng/tháng
- Thanh chỉ báo sức chứa (progress bar)
- Danh sách tiện ích (amenities)
- Nút "Đăng ký phòng"
- Badge trạng thái (Còn trống/Hết chỗ)

**Props:**
```typescript
interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
  onRegister?: (room: Room) => void;
}
```

#### 2. **RoomsList.tsx** (167 dòng)
Danh sách các phòng với bộ lọc.

**Features:**
- Grid layout responsive
- Lọc theo loại phòng (đơn/đôi/tập thể)
- Lọc theo tòa nhà
- Lọc theo khoảng giá
- Nút "Đặt lại" để reset filter
- Hiển thị số phòng còn trống
- Thông báo khi không tìm thấy

**Mock Data:**
- 6 phòng mẫu với dữ liệu đầy đủ

#### 3. **RoomRegistrationForm.tsx** (138 dòng)
Form đăng ký phòng.

**Features:**
- Chọn phòng từ dropdown
- Chọn lý do đăng ký
- Chọn ngày bắt đầu
- Ghi chú thêm
- Checkbox xác nhận
- Validation form
- Loading state
- Error messages

**Validation:**
- Phòng: Bắt buộc
- Lý do: Bắt buộc
- Ngày: Bắt buộc, không được là quá khứ

#### 4. **RequestTracker.tsx** (178 dòng)
Theo dõi các yêu cầu đã gửi.

**Features:**
- Danh sách yêu cầu
- Expand/collapse chi tiết
- Status badge (Chờ/Duyệt/Từ chối)
- Thông tin yêu cầu chi tiết
- Lý do từ chối (nếu có)
- Action buttons (Chỉnh sửa/Hủy/Tạo mới)
- Biểu tượng loại yêu cầu

**Mock Data:**
- 3 yêu cầu mẫu (pending/approved/rejected)

#### 5. **RenewalForm.tsx** (145 dòng)
Form gia hạn hợp đồng.

**Features:**
- Hiển thị ngày hết hạn hiện tại
- Chọn kỳ gia hạn (6/12/24/36 tháng)
- Tính toán tự động ngày hết hạn mới
- Chọn lý do gia hạn
- Ghi chú thêm
- Hiển thị số ngày còn lại
- Status indicator (Còn lâu/Sắp hết/Hết hạn)

**Validation:**
- Ngày hết hạn: Bắt buộc
- Lý do: Bắt buộc

#### 6. **ContractView.tsx** (207 dòng)
Hiển thị hợp đồng chi tiết.

**Features:**
- Header chuyên nghiệp
- Thông tin bên thuê
- Thông tin phòng
- Thời hạn hợp đồng
- Điều khoản & điều kiện
- Chữ ký điện tử
- Nút in (print)
- Nút tải PDF
- Nút chia sẻ
- Alert hợp đồng sắp hết hạn
- Alert hợp đồng đã hết hạn

**Content:**
- 8 điều khoản chi tiết
- Layout giống hợp đồng thực

### Pages

#### **app/rooms/page.tsx** (163 dòng)
Trang chính quản lý phòng.

**Features:**
- 5 tabs (Phòng/Đăng ký/Yêu cầu/Gia hạn/Hợp đồng)
- Dynamic tab switching
- State management
- Success messages
- Info boxes
- Responsive design

## 📋 Các Chức Năng Chi Tiết

### 1. 🚪 Tra Cứu Phòng Trống

**Bước 1: Xem Danh Sách**
- Click tab "Phòng Trống"
- Xem tất cả phòng có sẵn

**Bước 2: Lọc Phòng**
- Chọn loại phòng (Tất cả/Đơn/Đôi/Tập thể)
- Chọn tòa nhà
- Nhập giá tối đa
- Click "Đặt lại" để reset

**Bước 3: Xem Chi Tiết**
- Click vào card phòng để xem chi tiết
- Hoặc click "Đăng ký phòng này"

### 2. 📝 Đăng Ký Phòng

**Bước 1: Chọn Phòng**
- Từ tab "Phòng Trống" click "Đăng ký phòng"
- Hoặc vào tab "Đăng Ký" và chọn phòng

**Bước 2: Điền Form**
- Phòng: Chọn phòng từ dropdown
- Lý do: Chọn từ (Sinh viên mới/Đổi phòng/Nâng cấp/Khác)
- Ngày bắt đầu: Chọn ngày
- Ghi chú: (Optional)

**Bước 3: Gửi Yêu Cầu**
- Đánh dấu checkbox xác nhận
- Click "Gửi yêu cầu đăng ký"
- Nhận thông báo kết quả

### 3. 📋 Theo Dõi Yêu Cầu

**Trạng Thái Yêu Cầu:**
- 🟡 **Chờ duyệt** - Yêu cầu đang được xem xét
- 🟢 **Đã duyệt** - Yêu cầu được chấp nhận
- 🔴 **Từ chối** - Yêu cầu bị từ chối

**Thao Tác:**
- **Chờ duyệt**: Chỉnh sửa/Hủy yêu cầu
- **Đã duyệt**: Xem hợp đồng
- **Từ chối**: Tạo yêu cầu mới

### 4. 🔄 Gia Hạn Hợp Đồng

**Lợi Ích:**
- Tiếp tục ở ký túc xá
- Tránh mất phòng
- Tránh rắc rối pháp lý

**Cách Gia Hạn:**
1. Click tab "Gia Hạn"
2. Chọn kỳ gia hạn (6/12/24/36 tháng)
3. Chọn lý do gia hạn
4. Thêm ghi chú (nếu cần)
5. Click "Gửi yêu cầu gia hạn"

**Lưu Ý:**
- Nên gia hạn trước 1 tháng khi hết hạn
- Phí gia hạn = tiền phòng bình thường

### 5. 📄 Xem Hợp Đồng

**Nội Dung Hợp Đồng:**
- Thông tin sinh viên
- Thông tin phòng
- Thời hạn (ngày bắt đầu & kết thúc)
- 8 điều khoản chi tiết
- Chữ ký điện tử

**Thao Tác:**
- **In hợp đồng**: In ra giấy
- **Tải PDF**: Lưu file PDF
- **Chia sẻ**: Gửi qua email (sắp có)

## 🔐 Validation Rules

### Email & Phone
```
Email: Format hợp lệ (xxx@xxx.xxx)
Phone: 10 chữ số, bắt đầu bằng 0
```

### Ngày
```
Ngày bắt đầu: Không được là quá khứ
Ngày hết hạn: Tự động tính toán
```

### Lý Do
```
Đăng ký: Bắt buộc
Gia hạn: Bắt buộc
```

## 🎨 UI/UX Features

- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Tab navigation
- ✅ Expand/collapse details
- ✅ Progress bars
- ✅ Status badges
- ✅ Color-coded alerts
- ✅ Loading states
- ✅ Success messages
- ✅ Real-time validation
- ✅ Professional card layouts

## 📱 Responsive Design

```
Mobile (<640px)      → Single column, stacked tabs
Tablet (640-1024px)  → 2-column grid
Desktop (>1024px)    → Full-width, optimized layout
```

## 🔗 Navigation

**Sidebar Menu:**
```
Phòng & Gia Hạn → /rooms ✨ NEW
```

**Tab Navigation (Inside /rooms):**
- Phòng Trống
- Đăng Ký
- Yêu Cầu
- Gia Hạn
- Hợp Đồng

## 💾 Mock Data

### Phòng Mẫu (6 phòng)
```
- A101: Đơn, 800,000₫, Tòa A, Tầng 1
- A102: Đôi, 1,200,000₫, Tòa A, Tầng 1
- A103: Tập thể, 1,500,000₫, Tòa A, Tầng 1
- B201: Đôi, 1,300,000₫, Tòa B, Tầng 2
- B202: Đơn, 900,000₫, Tòa B, Tầng 2
- C301: Tập thể, 1,600,000₫, Tòa C, Tầng 3
```

### Yêu Cầu Mẫu (3 yêu cầu)
```
1. Đăng ký A101 - Chờ duyệt
2. Gia hạn A102 - Đã duyệt
3. Đăng ký B201 - Từ chối
```

## 🔮 Future Enhancements

- [ ] Upload ảnh phòng
- [ ] Virtual tour phòng
- [ ] Chat với quản lý
- [ ] Lịch sử thanh toán
- [ ] Notification system
- [ ] Mobile app
- [ ] QR code access
- [ ] Room booking system

## ⚡ Performance

- ✅ Client-side filtering
- ✅ Optimized re-renders
- ✅ Smooth transitions
- ✅ No external API calls yet
- ✅ Responsive images

## 🔐 Security

- ✅ Form validation
- ✅ Input sanitization
- ✅ Error handling
- ✅ No sensitive data storage

## 📝 Notes

- Tất cả dữ liệu hiện tại là mock data
- Ready cho API integration
- Fully type-safe (TypeScript)
- Production-ready code

---

**Hướng dẫn tạo trang Phòng & Gia Hạn hoàn tất! 🎉**
