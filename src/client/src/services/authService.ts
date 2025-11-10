import { apiClient } from './api';

// Types cho authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  idProvince?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  idProvince?: number;
  avatarPic?: string;
  intro?: string;
  address?: string;
  birthday?: string;
  sex?: string;
  education?: string;
  experience?: string;
  provinceName?: string;
  provinceFullName?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

class AuthService {
  // Đăng nhập người tìm việc
  async loginUser(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/users/sessions', credentials);
      
      // Lưu token vào localStorage
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('userType', 'user');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        error: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.',
      };
    }
  }

  // Đăng ký người tìm việc
  async registerUser(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/users', userData);
      
      // Lưu token vào localStorage sau khi đăng ký thành công
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('userType', 'user');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        error: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.',
      };
    }
  }

  // Đăng xuất
  async logout(): Promise<void> {
    try {
      // Gọi API logout nếu có token
      const token = localStorage.getItem('token');
      if (token) {
        await apiClient.delete('/auth/sessions');
      }
    } catch (error) {
      // Ignore logout API errors
      console.warn('Logout API call failed:', error);
    } finally {
      // Luôn xóa dữ liệu local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
    }
  }

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Lấy thông tin user hiện tại
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Lấy token hiện tại
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Lấy loại user hiện tại
  getUserType(): 'user' | 'company' | null {
    return localStorage.getItem('userType') as 'user' | 'company' | null;
  }
}

export const authService = new AuthService();
export default authService;
