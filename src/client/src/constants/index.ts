// Constants cho dự án Jobify

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  JOB_DETAIL: '/jobs/[id]',
  PROFILE: '/profile',
  COMPANY: '/company',
  APPLICATIONS: '/applications',
} as const;

export const USER_TYPES = {
  CANDIDATE: 'candidate',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
} as const;

export const JOB_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CLOSED: 'closed',
} as const;

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export const EMPLOYMENT_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
} as const;

export const QUERY_KEYS = {
  JOBS: 'jobs',
  JOB_DETAIL: 'job-detail',
  USER_PROFILE: 'user-profile',
  APPLICATIONS: 'applications',
  COMPANIES: 'companies',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
} as const;
