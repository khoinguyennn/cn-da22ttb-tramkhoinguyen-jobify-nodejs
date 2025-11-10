"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User, LoginRequest, RegisterRequest } from '@/services/authService';
import { showToast } from '@/utils/toast';

interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: 'user' | 'company' | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<'user' | 'company' | null>(null);

  // Khởi tạo auth state từ localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuth = authService.isAuthenticated();
        const currentUser = authService.getCurrentUser();
        const currentUserType = authService.getUserType();

        setIsAuthenticated(isAuth);
        setUser(currentUser);
        setUserType(currentUserType);
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Đăng nhập
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.loginUser(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setUserType('user');
        showToast.success(response.message || 'Đăng nhập thành công!');
        return true;
      } else {
        showToast.error('Đăng nhập thất bại!');
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.error || error.message || 'Có lỗi xảy ra khi đăng nhập!';
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng ký
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.registerUser(userData);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setUserType('user');
        showToast.success(response.message || 'Đăng ký thành công!');
        return true;
      } else {
        showToast.error('Đăng ký thất bại!');
        return false;
      }
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error.error || error.message || 'Có lỗi xảy ra khi đăng ký!';
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng xuất
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Gọi API đăng xuất
      await authService.logout();
      
      // Cập nhật state
      setUser(null);
      setIsAuthenticated(false);
      setUserType(null);
      
      showToast.success('Đăng xuất thành công!');
      
    } catch (error: any) {
      console.error('Logout error:', error);
      
      // Vẫn clear local state ngay cả khi API fail
      setUser(null);
      setIsAuthenticated(false);
      setUserType(null);
      
      // Clear localStorage manually nếu API fail
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      
      showToast.warning('Đã đăng xuất (có lỗi kết nối server)');
      
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = () => {
    try {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();
      const currentUserType = authService.getUserType();
      
      setUser(currentUser);
      setIsAuthenticated(isAuth);
      setUserType(currentUserType);
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    userType,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook để sử dụng Auth Context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
