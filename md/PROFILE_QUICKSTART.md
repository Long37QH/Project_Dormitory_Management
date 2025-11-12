# 🎉 Trang Hồ Sơ Cá Nhân - Hướng Dẫn Nhanh

## 📍 Truy Cập Trang

**URL:** `http://localhost:3000/profile`

## 🎯 Các Chức Năng Có Sẵn

### 1. 👤 Xem Thông Tin Cá Nhân
- Tên sinh viên
- Mã số sinh viên (MSSV)
- Lớp
- Ký túc xá
- Avatar placeholder

### 2. ✏️ Chỉnh Sửa Thông Tin
**Các trường có thể chỉnh sửa:**
- 📧 Email
- 📱 Số điện thoại
- 👥 Tên người liên hệ khẩn cấp
- 📞 Số điện thoại liên hệ khẩn cấp

**Cách dùng:**
1. Click nút "Chỉnh sửa"
2. Sửa thông tin cần thiết
3. Click "Lưu thay đổi" hoặc "Hủy"

### 3. 🔐 Đổi Mật Khẩu
**Yêu cầu:**
- ✓ Tối thiểu 8 ký tự
- ✓ Chứa chữ cái hoa (A-Z)
- ✓ Chứa chữ cái thường (a-z)
- ✓ Chứa chữ số (0-9)
- ✓ Không trùng với mật khẩu cũ

**Features:**
- 👁️ Show/hide password button
- 📊 Password strength indicator
- ⚠️ Real-time validation

---

## 📂 Cấu Trúc Thư Mục

```
components/
├── ProfileHeader.tsx        → Avatar & thông tin cơ bản
├── ProfileForm.tsx          → Form chỉnh sửa
└── ChangePasswordForm.tsx   → Form đổi mật khẩu

app/
└── profile/
    └── page.tsx             → Trang chính

lib/
└── api.example.ts           → Example API integration

Documentation:
├── PROFILE_PAGE_GUIDE.md    → Hướng dẫn chi tiết
├── CHANGES_SUMMARY.md       → Tóm tắt thay đổi
└── PROFILE_QUICKSTART.md    → File này
```

---

## 🧪 Test Cases

### Test 1: Xem Thông Tin
1. Navigate to `/profile`
2. ✅ Should see avatar, name, MSSV, class, dormitory
3. ✅ Should see profile form with data

### Test 2: Chỉnh Sửa Thông Tin
1. Click "Chỉnh sửa"
2. Input field should become editable
3. Change email to invalid value → should show error
4. Change email to valid value → error should disappear
5. Click "Lưu thay đổi" → should show success message
6. Data should update in the form
7. Click "Chỉnh sửa" again → click "Hủy" → data should revert

### Test 3: Validation
**Email validation:**
- Try: `invalid` → ❌ "Email không hợp lệ"
- Try: `valid@email.com` → ✅ Valid

**Phone validation:**
- Try: `123456789` → ❌ "Phải là 10 chữ số"
- Try: `912345678` → ❌ "Phải bắt đầu bằng 0"
- Try: `0912345678` → ✅ Valid

**Emergency contact validation:**
- Try: empty → ❌ "Không được để trống"
- Try: any text → ✅ Valid

### Test 4: Đổi Mật Khẩu
1. Try empty fields → should show errors
2. Try password < 8 characters → ❌ error
3. Try password without uppercase → ❌ error
4. Try password without lowercase → ❌ error
5. Try password without numbers → ❌ error
6. Try matching passwords → should enable button
7. Try mismatched passwords → ❌ error
8. Enter valid password → should see strength indicator
9. Click "Đổi Mật Khẩu" → should show success

### Test 5: Responsive Design
- 📱 Mobile (< 640px): Single column, stacked layout
- 📱 Tablet (640px - 1024px): Flexible grid
- 🖥️ Desktop (> 1024px): Optimal layout

### Test 6: Sidebar Navigation
1. Click "Hồ sơ cá nhân" in sidebar
2. Should navigate to `/profile`
3. Link should be highlighted (blue background)
4. Click "Tổng quan" → should highlight home link

---

## 💾 Mock Data

Current data (từ `app/profile/page.tsx`):
```javascript
{
  mssv: '200101',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@student.edu.vn',
  phone: '0912345678',
  emergencyContact: 'Mẹ - Nguyễn Thị B',
  emergencyPhone: '0987654321',
  class: 'CTK43',
  dormitory: 'Ký túc xá A - Phòng A101',
}
```

Để thay đổi data, edit `app/profile/page.tsx`

---

## 🔗 API Integration

**Status:** Sử dụng mock data (client-side only)

Để integrate API backend, xem `lib/api.example.ts`

### Các API endpoint cần thiết:
```
GET    /api/profile                    → Lấy thông tin
PUT    /api/profile                    → Cập nhật thông tin
POST   /api/password/change            → Đổi mật khẩu
```

---

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Icons:** Bootstrap Icons
- **Colors:**
  - Primary: Sky blue (`sky-600`)
  - Success: Emerald green (`emerald-600`)
  - Warning: Amber (`amber-500`)
  - Error: Red (`red-600`)
  - Info: Blue (`blue-600`)

---

## 🔧 Customization

### Thay đổi mock data:
```typescript
// app/profile/page.tsx
const [profile, setProfile] = useState<StudentProfile>({
  // Edit here
  name: 'Your Name',
  email: 'your.email@example.com',
  // ...
});
```

### Thay đổi avatar URL:
```typescript
// components/ProfileHeader.tsx
avatarUrl="https://your-image-url.com/avatar.jpg"
```

### Thay đổi validation rules:
```typescript
// components/ProfileForm.tsx
// Edit validateForm() function
```

---

## 🚀 Next Steps

1. ✅ Frontend complete
2. ⏳ **Backend API:** Setup API endpoints
3. ⏳ **Authentication:** Integrate with login
4. ⏳ **Avatar Upload:** Add image upload feature
5. ⏳ **Email Verification:** Add email verification flow
6. ⏳ **Activity Log:** Track profile changes

---

## ⚠️ Known Limitations

- ✖️ Data not persisted (mock only)
- ✖️ Avatar upload not implemented
- ✖️ Email verification not implemented
- ✖️ Two-factor authentication not implemented
- ✖️ Activity log not available

---

## 📞 Support

Tài liệu chi tiết: `PROFILE_PAGE_GUIDE.md`
Tóm tắt thay đổi: `CHANGES_SUMMARY.md`

---

**Happy testing! 🎉**
