// Types cơ bản cho dự án Jobify

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'candidate' | 'recruiter' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  location?: string;
  size?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobPost {
  id: string;
  companyId: string;
  company?: Company;
  title: string;
  description: string;
  requirements: string;
  salaryMin?: number;
  salaryMax?: number;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'active' | 'paused' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobPostId: string;
  userId: string;
  jobPost?: JobPost;
  user?: User;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
