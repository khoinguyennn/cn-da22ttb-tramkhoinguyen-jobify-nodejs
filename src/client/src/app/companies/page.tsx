'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Heart, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Company {
  id: number;
  companyName: string;
  avatarPic?: string;
  provinceId: number;
  companyScale: string;
  jobCount: number;
  provinceName?: string;
  provinceFullName?: string;
}

interface Province {
  id: number;
  provinceName: string;
  provinceFullName: string;
}

const companySizes = [
  { id: 'under-10', label: 'Ít hơn 10 nhân viên' },
  { id: '10-20', label: '10 - 20 nhân viên' },
  { id: '20-100', label: '20 - 100 nhân viên' },
  { id: '100-500', label: '100 - 500 nhân viên' },
  { id: '500-1000', label: '500 - 1000 nhân viên' },
  { id: '1000-5000', label: '1000 - 5000 nhân viên' },
  { id: 'over-5000', label: 'Nhiều hơn 5000 nhân viên' },
];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    const mockCompanies: Company[] = [
      {
        id: 1,
        companyName: 'Facebook',
        avatarPic: '/api/placeholder/200/200',
        provinceId: 1,
        companyScale: '1000-5000',
        jobCount: 5,
        provinceName: 'Hồ Chí Minh',
        provinceFullName: 'Thành phố Hồ Chí Minh'
      },
      {
        id: 2,
        companyName: 'Microsoft',
        avatarPic: '/api/placeholder/200/200',
        provinceId: 2,
        companyScale: 'over-5000',
        jobCount: 1,
        provinceName: 'Trà Vinh',
        provinceFullName: 'Tỉnh Trà Vinh'
      },
      {
        id: 3,
        companyName: 'Apple',
        avatarPic: '/api/placeholder/200/200',
        provinceId: 3,
        companyScale: 'over-5000',
        jobCount: 1,
        provinceName: 'Hà Nội',
        provinceFullName: 'Thành phố Hà Nội'
      },
      {
        id: 4,
        companyName: 'Starbucks',
        avatarPic: '/api/placeholder/200/200',
        provinceId: 2,
        companyScale: '1000-5000',
        jobCount: 0,
        provinceName: 'Trà Vinh',
        provinceFullName: 'Tỉnh Trà Vinh'
      },
      {
        id: 5,
        companyName: 'NVIDIA',
        avatarPic: '/api/placeholder/200/200',
        provinceId: 4,
        companyScale: '1000-5000',
        jobCount: 1,
        provinceName: 'Hà Giang',
        provinceFullName: 'Tỉnh Hà Giang'
      },
      {
        id: 6,
        companyName: 'Lego',
        avatarPic: '/api/placeholder/200/200',
        provinceId: 5,
        companyScale: '500-1000',
        jobCount: 0,
        provinceName: 'Bình Dương',
        provinceFullName: 'Tỉnh Bình Dương'
      }
    ];

    const mockProvinces: Province[] = [
      { id: 1, provinceName: 'An Giang', provinceFullName: 'Tỉnh An Giang' },
      { id: 2, provinceName: 'Bà Rịa - Vũng Tàu', provinceFullName: 'Tỉnh Bà Rịa - Vũng Tàu' },
      { id: 3, provinceName: 'Bạc Liêu', provinceFullName: 'Tỉnh Bạc Liêu' },
      { id: 4, provinceName: 'Bắc Giang', provinceFullName: 'Tỉnh Bắc Giang' },
      { id: 5, provinceName: 'Bắc Kạn', provinceFullName: 'Tỉnh Bắc Kạn' },
      { id: 6, provinceName: 'Bắc Ninh', provinceFullName: 'Tỉnh Bắc Ninh' },
      { id: 7, provinceName: 'Bến Tre', provinceFullName: 'Tỉnh Bến Tre' },
      { id: 8, provinceName: 'Bình Định', provinceFullName: 'Tỉnh Bình Định' },
    ];

    setCompanies(mockCompanies);
    setProvinces(mockProvinces);
    setTotalPages(2);
    setIsLoading(false);
  }, []);

  const handleProvinceChange = (provinceId: string, checked: boolean) => {
    if (checked) {
      setSelectedProvinces([...selectedProvinces, provinceId]);
    } else {
      setSelectedProvinces(selectedProvinces.filter(id => id !== provinceId));
    }
  };

  const handleSizeChange = (sizeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, sizeId]);
    } else {
      setSelectedSizes(selectedSizes.filter(id => id !== sizeId));
    }
  };

  const getCompanyLogo = (avatarPic?: string) => {
    if (avatarPic) {
      return avatarPic;
    }
    return '/api/placeholder/200/200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Nhà tuyển dụng hàng đầu</h1>
            
            {/* Search Bar */}
            <div className="flex max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Tìm công ty"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-r-lg">
                Tìm
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Location Filter */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Địa chỉ</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {provinces.map((province) => (
                  <div key={province.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`province-${province.id}`}
                      checked={selectedProvinces.includes(province.id.toString())}
                      onCheckedChange={(checked) => 
                        handleProvinceChange(province.id.toString(), checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={`province-${province.id}`}
                      className="text-sm text-gray-700 cursor-pointer flex-1"
                    >
                      {province.provinceName}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Size Filter */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quy mô</h3>
              <div className="space-y-3">
                {companySizes.map((size) => (
                  <div key={size.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`size-${size.id}`}
                      checked={selectedSizes.includes(size.id)}
                      onCheckedChange={(checked) => 
                        handleSizeChange(size.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={`size-${size.id}`}
                      className="text-sm text-gray-700 cursor-pointer flex-1"
                    >
                      {size.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    {/* Company Logo */}
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={getCompanyLogo(company.avatarPic)}
                          alt={company.companyName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {company.companyName}
                      </h3>
                      
                      <div className="flex items-center justify-center text-sm text-gray-600 space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{company.provinceName}</span>
                      </div>

                      <div className="flex items-center justify-center text-sm text-primary space-x-1">
                        <span>{company.jobCount} việc làm</span>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" size="sm" className="border-red-200 text-red-500 hover:bg-red-50">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button 
                variant="outline" 
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </Button>
              
              <Button 
                variant={currentPage === 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(1)}
              >
                1
              </Button>
              
              <Button 
                variant={currentPage === 2 ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(2)}
              >
                2
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
