// lib/api.example.ts
/**
 * Example API integration for Profile Page
 * 
 * Copy this file to lib/api.ts and update with your actual API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

export interface StudentProfile {
  mssv: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  class: string;
  dormitory: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ===== PROFILE ENDPOINTS =====

export async function getProfile(token: string): Promise<ApiResponse<StudentProfile>> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  return response.json();
}

export async function updateProfile(
  token: string,
  data: Partial<StudentProfile>
): Promise<ApiResponse<StudentProfile>> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
}

// ===== PASSWORD ENDPOINTS =====

export async function changePassword(
  token: string,
  data: ChangePasswordRequest
): Promise<ApiResponse<void>> {
  const response = await fetch(`${API_BASE_URL}/password/change`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to change password');
  }

  return response.json();
}

// ===== EXAMPLE USAGE =====

/**
 * Usage in ProfileForm.tsx:
 * 
 * import { updateProfile } from '@/lib/api';
 * 
 * const handleSubmit = async (e: React.FormEvent) => {
 *   e.preventDefault();
 *   if (!validateForm()) return;
 * 
 *   setIsSaving(true);
 *   try {
 *     const token = localStorage.getItem('token'); // Get auth token
 *     const response = await updateProfile(token, formData);
 *     
 *     if (response.success) {
 *       onSave?.(response.data);
 *       setIsEditing(false);
 *       alert('✅ Cập nhật thông tin thành công!');
 *     } else {
 *       // Handle validation errors
 *       if (response.errors) {
 *         setErrors(response.errors);
 *       }
 *       alert(`❌ ${response.message}`);
 *     }
 *   } catch (error) {
 *     alert(`❌ ${error.message}`);
 *   } finally {
 *     setIsSaving(false);
 *   }
 * };
 */

/**
 * Usage in ChangePasswordForm.tsx:
 * 
 * import { changePassword } from '@/lib/api';
 * 
 * const handleSubmit = async (e: React.FormEvent) => {
 *   e.preventDefault();
 *   if (!validateForm()) return;
 * 
 *   setIsLoading(true);
 *   try {
 *     const token = localStorage.getItem('token');
 *     const response = await changePassword(token, {
 *       currentPassword: formData.currentPassword,
 *       newPassword: formData.newPassword,
 *     });
 *     
 *     if (response.success) {
 *       // Clear form
 *       setFormData({
 *         currentPassword: '',
 *         newPassword: '',
 *         confirmPassword: '',
 *       });
 *       alert('✅ Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
 *       onSuccess?.();
 *       // Optionally redirect to login
 *       // window.location.href = '/login';
 *     } else {
 *       if (response.errors) {
 *         setErrors(response.errors);
 *       }
 *       alert(`❌ ${response.message}`);
 *     }
 *   } catch (error) {
 *     alert(`❌ ${error.message}`);
 *   } finally {
 *     setIsLoading(false);
 *   }
 * };
 */
