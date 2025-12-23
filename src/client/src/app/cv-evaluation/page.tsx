'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Search, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';

export default function CVEvaluationPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, userType } = useAuth();
  const [jobTitle, setJobTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const hasShownToastRef = useRef(false);
  const isRedirectingRef = useRef(false);

  // Kiểm tra authentication - Cho phép cả user và company
  useEffect(() => {
    if (!isLoading && !hasShownToastRef.current && !isRedirectingRef.current) {
      if (!isAuthenticated) {
        hasShownToastRef.current = true;
        isRedirectingRef.current = true;
        showToast.warning('Vui lòng đăng nhập để sử dụng tính năng đánh giá CV');
        
        // Delay redirect một chút để tránh race condition
        setTimeout(() => {
          router.push('/login');
        }, 100);
        return;
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not authenticated (but not if already showing toast/redirecting)
  if (!isAuthenticated && !hasShownToastRef.current && !isRedirectingRef.current) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Yêu cầu đăng nhập
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để sử dụng tính năng đánh giá CV với AI.
          </p>
          <Button
            onClick={() => router.push('/login')}
            className="bg-primary hover:bg-primary/90"
          >
            Đăng nhập ngay
          </Button>
        </div>
      </div>
    );
  }

  const handleFileSelect = (file: File) => {
    // Kiểm tra loại file (PDF, DOC, DOCX)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ hỗ trợ file PDF, DOC, DOCX');
      return;
    }

    // Kiểm tra kích thước file (tối đa 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File không được vượt quá 5MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleEvaluate = () => {
    if (!jobTitle.trim()) {
      showToast.warning('Vui lòng nhập tên công việc mục tiêu');
      return;
    }
    
    if (!selectedFile) {
      showToast.warning(userType === 'user' ? 'Vui lòng tải lên CV của bạn' : 'Vui lòng tải lên CV cần đánh giá');
      return;
    }

    // TODO: Implement AI evaluation logic
    console.log('Đánh giá CV:', { 
      userType, 
      jobTitle, 
      file: selectedFile.name,
      evaluatedBy: userType === 'user' ? 'candidate' : 'company'
    });
    
    showToast.success(
      userType === 'user' 
        ? 'Đang phân tích CV của bạn với AI...' 
        : 'Đang đánh giá CV ứng viên với AI...'
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-6 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 mr-2" />
            AI POWER
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tối ưu hóa CV của bạn cùng{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              AI thông minh
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {userType === 'user' 
              ? 'Nhận phản hồi tích cực, điểm số phù hợp và gợi ý cải thiện để tăng cơ hội trúng tuyển vào công việc mơ ước chỉ trong vài giây.'
              : 'Đánh giá CV của ứng viên một cách khách quan và chính xác để tìm ra ứng viên phù hợp nhất với vị trí tuyển dụng.'
            }
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Step 1: Chọn công việc mục tiêu */}
            <Card className="border-0 shadow-lg">
              <CardContent className="px-12 py-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Chọn công việc mục tiêu</h3>
                    <p className="text-gray-600 text-sm">AI căn biệt bạn đang ứng tuyển vị trí nào để đánh giá chính xác.</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tên công việc
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder={userType === 'user' ? "Ví dụ: Frontend Developer" : "Ví dụ: Backend Developer, UI/UX Designer"}
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Tải lên CV */}
            <Card className="border-0 shadow-lg">
              <CardContent className="px-12 py-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {userType === 'user' ? 'Tải lên CV của bạn' : 'Tải lên CV cần đánh giá'}
                    </h3>
                    <p className="text-gray-600 text-sm">Hỗ trợ định dạng PDF, DOCX (Tối đa 5MB).</p>
                  </div>
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    isDragOver
                      ? 'border-purple-500 bg-purple-50'
                      : selectedFile
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-25'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  
                  {selectedFile ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-700">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('cv-upload')?.click()}
                      >
                        Chọn file khác
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-2">
                          Kéo thả CV vào đây hoặc{' '}
                          <label htmlFor="cv-upload" className="text-purple-600 cursor-pointer hover:text-purple-700">
                            chọn tệp
                          </label>
                        </p>
                        <p className="text-sm text-gray-500">
                          Chúng tôi cam kết bảo mật thông tin trong CV được tải lên.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evaluate Button */}
          <div className="text-center mt-12">
            <Button
              onClick={handleEvaluate}
              disabled={!jobTitle.trim() || !selectedFile}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Đánh giá ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
