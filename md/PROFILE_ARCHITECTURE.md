# 📊 Kiến Trúc Trang Hồ Sơ Cá Nhân

## 🗂️ File Structure

```
Project_Dormitory_Management/
│
├── app/
│   ├── profile/
│   │   └── page.tsx              ⭐ TRANG CHÍNH
│   │       ├── State: StudentProfile
│   │       ├── Component 1: ProfileHeader
│   │       ├── Component 2: ProfileForm
│   │       └── Component 3: ChangePasswordForm
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ProfileHeader.tsx          ✨ Component mới
│   ├── ProfileForm.tsx            ✨ Component mới
│   ├── ChangePasswordForm.tsx     ✨ Component mới
│   ├── Layout.tsx
│   ├── Sidebar.tsx                🔄 Cập nhật
│   └── ... (others)
│
├── lib/
│   └── api.example.ts             📋 Example API integration
│
├── PROFILE_PAGE_GUIDE.md          📖 Hướng dẫn chi tiết
├── CHANGES_SUMMARY.md             📝 Tóm tắt thay đổi
└── PROFILE_QUICKSTART.md          🚀 Hướng dẫn nhanh
```

---

## 🔄 Component Architecture

```
ProfilePage (app/profile/page.tsx)
│
├─ State: profile, saveMessage
│
├─ ProfileHeader
│   ├── Props: name, mssv, class, dormitory, avatarUrl
│   └── Displays: Avatar + Student Info
│
├─ ProfileForm
│   ├── Props: initialData, onSave
│   ├── State: formData, isEditing, errors, isSaving
│   ├── Features:
│   │   ├── View Mode (read-only)
│   │   ├── Edit Mode (with form fields)
│   │   ├── Validation
│   │   └── Save/Cancel buttons
│   └── Editable Fields:
│       ├── email
│       ├── phone
│       ├── emergencyContact
│       └── emergencyPhone
│
└─ ChangePasswordForm
    ├── Props: onSuccess
    ├── State: formData, errors, isLoading, showPasswords
    ├── Features:
    │   ├── Password strength indicator
    │   ├── Show/hide password buttons
    │   ├── Real-time validation
    │   └── Submit button
    └── Fields:
        ├── currentPassword
        ├── newPassword
        └── confirmPassword
```

---

## 📊 Data Flow

```
┌──────────────────┐
│  ProfilePage     │
│  (useState)      │
└────────┬─────────┘
         │
         ├──────────────────────────────────┐
         │                                  │
         ▼                                  ▼
    ┌──────────────┐              ┌──────────────────┐
    │ ProfileForm  │              │ ProfileHeader    │
    │ (editable)   │              │ (display only)   │
    └──────┬───────┘              └──────────────────┘
           │
           ├─ onChange → update formData state
           │
           ├─ onSubmit → validate → onSave callback
           │
           └─ ProfilePage updates state
              → Success message
              → Form resets
```

---

## 🔐 Validation Flow

### ProfileForm Validation:
```
Input Change
    │
    ▼
validate() function
    │
    ├─ Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    │
    ├─ Phone: /^0\d{9}$/
    │
    ├─ emergencyContact: !empty
    │
    └─ emergencyPhone: /^0\d{9}$/
         │
         └─ Set errors or clear
             │
             └─ Display error messages
```

### ChangePasswordForm Validation:
```
Input Change
    │
    ▼
validateForm() function
    │
    ├─ currentPassword: !empty
    │
    ├─ newPassword:
    │   ├─ length >= 8
    │   ├─ /[a-z]/ (lowercase)
    │   ├─ /[A-Z]/ (uppercase)
    │   ├─ /\d/ (digit)
    │   └─ !== currentPassword
    │
    ├─ confirmPassword:
    │   ├─ !empty
    │   └─ === newPassword
    │
    └─ Display errors or submit
```

---

## 🎨 UI Component Tree

```
ProfilePage
├─ <div> Page Header
│  ├─ <h1> Title
│  └─ <p> Description
│
├─ <ProfileHeader>
│  ├─ <img> Avatar
│  └─ <div> Info Section
│     ├─ <h3> Name
│     └─ <div> Details (MSSV, Class, Dorm)
│
├─ Success Message (conditional)
│  └─ <div.bg-green-50>
│
├─ <ProfileForm>
│  ├─ <h2> Title + Edit Button
│  ├─ <form>
│  │  ├─ <input> MSSV (read-only)
│  │  ├─ <input> Name (read-only)
│  │  ├─ <input> Class (read-only)
│  │  ├─ <input> Dormitory (read-only)
│  │  ├─ <hr>
│  │  ├─ <input> Email
│  │  ├─ <input> Phone
│  │  ├─ <div.bg-blue-50> Emergency Section
│  │  │  ├─ <input> Emergency Contact
│  │  │  └─ <input> Emergency Phone
│  │  └─ <div> Buttons (Save/Cancel)
│  └─ </form>
│
├─ <ChangePasswordForm>
│  ├─ <h2> Title
│  ├─ <form>
│  │  ├─ <input> Current Password + Show/Hide
│  │  ├─ <input> New Password + Show/Hide + Strength Meter
│  │  ├─ <input> Confirm Password + Show/Hide
│  │  ├─ <div.bg-amber-50> Warning Message
│  │  └─ <button> Submit
│  └─ </form>
│
└─ Info Box
   ├─ <h3> Tips
   └─ <ul> Tips List
```

---

## 🔗 Routing & Navigation

```
Sidebar Navigation
│
├─ / (Home)                    → app/page.tsx
│
├─ /profile ⭐ NEW             → app/profile/page.tsx
│   ├─ ProfileForm
│   ├─ ChangePasswordForm
│   └─ ProfileHeader
│
├─ /myroom                     → (to be created)
├─ /payments                   → (to be created)
├─ /requests                   → (to be created)
├─ /notifications              → (to be created)
└─ /history                    → (to be created)
```

### Sidebar Active State Logic:
```typescript
const pathname = usePathname()  // e.g., "/profile"

const isActive = (path: string) => {
  if (path === '/' && pathname === '/') return true  // Exact match for home
  if (path !== '/' && pathname.startsWith(path)) return true  // Startswith for others
  return false
}

// Usage:
<a href="/profile" className={isActive('/profile') ? 'bg-sky-100 text-sky-600' : 'hover:bg-slate-100'}>
  Hồ sơ cá nhân
</a>
```

---

## 📝 Form State Management

### ProfileForm:
```typescript
const [formData, setFormData] = useState<StudentProfile>()
const [isEditing, setIsEditing] = useState(false)
const [errors, setErrors] = useState<Partial<StudentProfile>>()
const [isSaving, setIsSaving] = useState(false)
```

### ChangePasswordForm:
```typescript
const [formData, setFormData] = useState({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const [errors, setErrors] = useState<Record<string, string>>()
const [isLoading, setIsLoading] = useState(false)
const [showPasswords, setShowPasswords] = useState({
  current: false,
  new: false,
  confirm: false,
})
```

---

## 🎯 Event Flow

### Edit Profile:
```
User Click Edit Button
    │
    ├─ setIsEditing(true)
    │
    └─ Inputs become enabled
         │
         ├─ User enters data
         │
         └─ onChange → setFormData
              │
              ├─ Option 1: Click Save
              │  └─ onSubmit → validate → save → success message
              │
              └─ Option 2: Click Cancel
                 └─ revert formData to initial
```

### Change Password:
```
User Enters Password
    │
    ├─ onChange → setFormData
    │
    └─ If newPassword entered → show strength indicator
         │
         ├─ onChange → getPasswordStrength()
         │  └─ Return: { level, color, bgColor }
         │
         └─ Display meter with progress bar
              │
              ├─ Yếu (0-33%)
              ├─ Trung bình (34-66%)
              └─ Mạnh (67-100%)

User Click Submit
    │
    ├─ validate() → check all rules
    │
    ├─ If valid: POST /api/password/change
    │
    └─ Show success/error message
```

---

## 🧪 Testing Checklist

```
□ View Mode
  □ Avatar displays correctly
  □ Student info shows
  □ Form has initial data
  □ Edit button visible

□ Edit Mode
  □ Edit button disappears
  □ Inputs become editable
  □ Save/Cancel buttons appear

□ Validation
  □ Email validation works
  □ Phone validation works
  □ Error messages display
  □ Errors clear on valid input

□ Save
  □ Can save with valid data
  □ Shows success message
  □ Data persists (updates form)
  □ Returns to view mode

□ Password Change
  □ All 3 inputs required
  □ Strength indicator shows
  □ Show/hide works
  □ Validation enforced
  □ Can't use current password

□ Responsive
  □ Mobile layout
  □ Tablet layout
  □ Desktop layout

□ Sidebar
  □ Profile link navigates correctly
  □ Link highlights when active
  □ Navigation works
```

---

## 🚀 Performance Notes

- ✅ Client-side form validation (no round trips)
- ✅ Debounced error clearing
- ✅ Loading states prevent double submit
- ✅ Conditional rendering (error messages)
- ✅ Tailwind CSS (optimized)
- ⏳ Ready for lazy loading (route-based)

---

## 🔮 Future Enhancements

```
ProfilePage
│
├─ ProfileHeader (enhanced)
│  ├─ Avatar upload
│  └─ Edit avatar modal
│
├─ ProfileForm (enhanced)
│  ├─ Address field
│  ├─ Date of birth
│  └─ Gender
│
├─ ChangePasswordForm (enhanced)
│  ├─ Current password strength check
│  ├─ Password history
│  └─ Logout after change
│
└─ Activity Log (new)
   ├─ Login history
   ├─ Password changes
   ├─ Profile updates
   └─ Device list
```

---

**This architecture ensures:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Type safety (TypeScript)
- ✅ User experience (validation feedback)
- ✅ Security (password validation)
