import { Heart } from 'lucide-react';
import { useFollowCompanyCheck, useToggleFollowCompany } from '@/hooks/useFollowedCompanies';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';

interface FollowCompanyButtonProps {
  companyId: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FollowCompanyButton: React.FC<FollowCompanyButtonProps> = ({ 
  companyId, 
  className = '', 
  size = 'md',
  showLabel = false 
}) => {
  const router = useRouter();
  const { userType, isAuthenticated } = useAuth();
  const { data: followStatus } = useFollowCompanyCheck(isAuthenticated && userType === 'user' ? companyId : undefined);
  const { toggleFollowCompany, isLoading } = useToggleFollowCompany();
  
  const isFollowed = followStatus?.isFollowed || false;
  const isCompanyUser = userType === 'company';
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn click event bubbling
    
    // Kiểm tra đăng nhập
    if (!isAuthenticated) {
      showToast.info('Vui lòng đăng nhập để theo dõi công ty!');
      router.push('/login');
      return;
    }
    
    // Kiểm tra role
    if (isCompanyUser) {
      showToast.warning('Chỉ người tìm việc mới có thể theo dõi công ty!');
      return;
    }
    
    if (!isLoading) {
      toggleFollowCompany(companyId, isFollowed);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center gap-2 transition-colors ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      aria-label={isFollowed ? 'Hủy theo dõi công ty' : 'Theo dõi công ty'}
    >
      <Heart 
        className={`${sizeClasses[size]} transition-colors ${
          isFollowed 
            ? 'text-red-500 fill-red-500 hover:text-red-600' 
            : 'text-muted-foreground hover:text-red-500'
        }`}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground">
          {isFollowed ? 'Đang theo dõi' : 'Theo dõi'}
        </span>
      )}
    </button>
  );
};
