# Hướng Dẫn Trang Hồ Sơ Cá Nhân (Profile Page)

## 📄 Mô Tả
Trang **Hồ sơ cá nhân** cho phép sinh viên xem và cập nhật thông tin cá nhân, quản lý liên hệ khẩn cấp, và đổi mật khẩu.

## 🎯 Chức Năng

### 1. **Xem & Cập Nhật Thông Tin Cá Nhân**
- **Thông tin chỉ đọc (Read-only):**
  - Mã số sinh viên (MSSV)
  - Họ và tên
  - Lớp
  - Ký túc xá

- **Thông tin có thể chỉnh sửa:**
  - Email (có validation email)
  - Số điện thoại (10 chữ số, bắt đầu bằng 0)

### 2. **Quản Lý Liên Hệ Khẩn Cấp**
- Tên người liên hệ (ví dụ: Mẹ, Cha, Chị, v.v.)
- Số điện thoại liên hệ
- Validation tự động

### 3. **Đổi Mật Khẩu**
- Yêu cầu mật khẩu hiện tại
- Mật khẩu mới với tiêu chí bảo mật:
  - Tối thiểu 8 ký tự
  - Chứa chữ cái hoa (A-Z)
  - Chứa chữ cái thường (a-z)
  - Chứa chữ số (0-9)
- Hiển thị mức độ mạnh của mật khẩu (Yếu / Trung bình / Mạnh)
- Xác nhận mật khẩu (phải khớp)
- Nút show/hide password

## 📁 Cấu Trúc File

```
components/
├── ProfileHeader.tsx          → Header hiển thị avatar & thông tin cơ bản
├── ProfileForm.tsx            → Form chỉnh sửa thông tin cá nhân
└── ChangePasswordForm.tsx     → Form đổi mật khẩu

app/
└── profile/
    └── page.tsx               → Trang chính (Profile Page)
```

## 🎨 Component Details

### **ProfileHeader**
Hiển thị:
- Avatar sinh viên
- Tên, MSSV, Lớp, Ký túc xá
- Trạng thái tài khoản (hoạt động)

Props:
```typescript
interface ProfileHeaderProps {
  name: string;
  mssv: string;
  class: string;
  dormitory: string;
  avatarUrl?: string;  // Optional, default to placeholder
}
```

### **ProfileForm**
Chức năng:
- Chế độ xem và chỉnh sửa
- Validation form tự động
- Nút Lưu/Hủy
- Thông báo lỗi inline

Props:
```typescript
interface ProfileFormProps {
  initialData: StudentProfile;
  onSave?: (data: StudentProfile) => void;
}
```

### **ChangePasswordForm**
Chức năng:
- 3 input password (current, new, confirm)
- Show/hide password buttons
- Password strength indicator
- Validation mạnh
- Thông báo cảnh báo

Props:
```typescript
interface ChangePasswordFormProps {
  onSuccess?: () => void;
}
```

## 🔐 Validation Rules

### Email
- ✓ Không được để trống
- ✓ Phải có định dạng email hợp lệ (xxx@xxx.xxx)

### Số Điện Thoại
- ✓ Không được để trống
- ✓ Phải là 10 chữ số
- ✓ Bắt đầu bằng 0

### Liên Hệ Khẩn Cấp
- ✓ Tên không được để trống
- ✓ Số điện thoại không được để trống và phải hợp lệ

### Mật Khẩu Mới
- ✓ Tối thiểu 8 ký tự
- ✓ Chứa ít nhất một chữ cái hoa
- ✓ Chứa ít nhất một chữ cái thường
- ✓ Chứa ít nhất một chữ số
- ✓ Không được trùng với mật khẩu cũ

## 🌐 Navigation

Thêm link trong Sidebar (đã cập nhật):
```
Hồ sơ cá nhân → /profile
```

Sidebar sẽ tự động highlight trang hiện tại dựa trên `usePathname()`

## 🚀 Cách Sử Dụng

1. **Truy cập trang:**
   ```
   http://localhost:3000/profile
   ```

2. **Chỉnh sửa thông tin:**
   - Click nút "Chỉnh sửa"
   - Sửa email/số điện thoại/liên hệ
   - Click "Lưu thay đổi" hoặc "Hủy"

3. **Đổi mật khẩu:**
   - Nhập mật khẩu hiện tại
   - Nhập mật khẩu mới
   - Xác nhận mật khẩu mới
   - Click "Đổi mật khẩu"

## 💾 Data Flow

Hiện tại sử dụng mock data. Để integrate với API backend:

```typescript
// Trong ProfileForm.tsx - handleSubmit()
const response = await fetch('/api/profile', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

// Trong ChangePasswordForm.tsx - handleSubmit()
const response = await fetch('/api/password/change', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## 🎨 UI/UX Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth transitions và animations
- ✅ Form validation feedback
- ✅ Error messages inline
- ✅ Loading states
- ✅ Success messages
- ✅ Password strength indicator
- ✅ Show/hide password toggle
- ✅ Read-only fields visualization

## 📝 Notes

- Dữ liệu hiện tại là mock data (cần API integration)
- Password validation khá nghiêm ngặt để bảo mật
- Sau khi đổi mật khẩu, user sẽ cần đăng nhập lại
- Avatar sử dụng placeholder, có thể thay bằng real image URL

## 🔮 Future Enhancements

- [ ] Thêm avatar upload feature
- [ ] Thêm two-factor authentication
- [ ] Thêm login history
- [ ] Thêm device management
- [ ] Thêm notification preferences
- [ ] Thêm activity log
