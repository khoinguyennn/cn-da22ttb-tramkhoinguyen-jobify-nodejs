"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, DollarSign, Clock, GraduationCap, Users, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Province {
  id: number;
  name: string;
  nameWithType: string;
  jobCount: number;
}

interface Field {
  id: number;
  name: string;
  typeField: string;
  jobCount: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  salary: string;
  type: string;
  location: string;
  postedTime: string;
  isHighlighted?: boolean;
}

export default function TimKiemPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [salaryRange, setSalaryRange] = useState([1, 50]);
  const [showSalaryRange, setShowSalaryRange] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Job types options
  const jobTypes = [
    "Nhân viên chính thức",
    "Bán thời gian", 
    "Tự do",
    "Thực tập"
  ];

  // Experience options
  const experienceOptions = [
    "Không yêu cầu",
    "1 năm",
    "1 - 2 năm",
    "2 - 5 năm", 
    "5 - 10 năm",
    "Trên 10 năm"
  ];

  // Education options
  const educationOptions = [
    "Không yêu cầu",
    "Tốt nghiệp THPT",
    "Trung cấp",
    "Cao đẳng",
    "Đại học",
    "Thạc sĩ",
    "Tiến sĩ"
  ];

  // Mock job data
  const mockJobs: Job[] = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty Test",
      logo: "/logo.png",
      salary: "5 - 10 triệu",
      type: "Nhân viên chính thức",
      location: "Cần Thơ",
      postedTime: "18 ngày trước"
    },
    {
      id: 2,
      title: "Tuyển Dụng Kỹ Sư Phát Triển Công Nghệ",
      company: "NVIDIA",
      logo: "/logo.png",
      salary: "20 - 25 triệu",
      type: "Nhân viên chính thức",
      location: "Bình Dương",
      postedTime: "2 năm trước"
    },
    {
      id: 3,
      title: "Giám Sát Nhà Phân Phối ( Sales Supervisor)",
      company: "Vinamilk",
      logo: "/logo.png", 
      salary: "Thỏa thuận",
      type: "Nhân viên chính thức",
      location: "Bình Phước",
      postedTime: "2 năm trước"
    },
    {
      id: 4,
      title: "Biên Phiên Dịch Tiếng Nhật (N1 IT Communicator)",
      company: "FPT Software",
      logo: "/logo.png",
      salary: "Thỏa thuận", 
      type: "Nhân viên chính thức",
      location: "Hà Nội",
      postedTime: "2 năm trước"
    },
    {
      id: 5,
      title: "Fresher Java (Tiếng Nhật) - Đào Tạo Tiếng Nhật - Thu Nhập 10-15 triệu",
      company: "FPT Software",
      logo: "/logo.png",
      salary: "10 - 15 triệu",
      type: "Nhân viên chính thức", 
      location: "Hồ Chí Minh",
      postedTime: "2 năm trước"
    },
    {
      id: 6,
      title: "Cộng Tác Viên Hậu Kỳ Dựng Video (Nhận Cả Sinh Viên) Làm Việc Tại Nhà",
      company: "Facebook",
      logo: "/logo.png",
      salary: "Thỏa thuận",
      type: "Thực tập",
      location: "Điện Biên", 
      postedTime: "2 năm trước"
    }
  ];

  // Load provinces and fields on component mount
  useEffect(() => {
    loadProvinces();
    loadFields();
  }, []);

  const loadProvinces = async () => {
    try {
      // Sẽ gọi API thực tế sau
      // const response = await fetch('/api/provinces/type');
      // const data = await response.json();
      
      // Mock data for now
      const mockProvinces: Province[] = [
        { id: 1, name: "Hà Nội", nameWithType: "Thành phố Hà Nội", jobCount: 50 },
        { id: 2, name: "Hồ Chí Minh", nameWithType: "Thành phố Hồ Chí Minh", jobCount: 70 },
        { id: 3, name: "Đà Nẵng", nameWithType: "Thành phố Đà Nẵng", jobCount: 18 },
        { id: 4, name: "Cần Thơ", nameWithType: "Thành phố Cần Thơ", jobCount: 12 },
        { id: 5, name: "Bình Dương", nameWithType: "Tỉnh Bình Dương", jobCount: 20 },
      ];
      setProvinces(mockProvinces);
    } catch (error) {
      console.error('Error loading provinces:', error);
    }
  };

  const loadFields = async () => {
    try {
      // Sẽ gọi API thực tế sau
      // const response = await fetch('/api/fields/type');
      // const data = await response.json();
      
      // Mock data for now
      const mockFields: Field[] = [
        { id: 1, name: "CNTT - Phần mềm", typeField: "Công nghệ thông tin", jobCount: 15 },
        { id: 2, name: "Bán hàng / Kinh doanh", typeField: "Dịch vụ khách hàng", jobCount: 10 },
        { id: 3, name: "Kế toán / Kiểm toán", typeField: "Dịch vụ tài chính", jobCount: 6 },
        { id: 4, name: "Nhân sự", typeField: "Bộ phận hỗ trợ", jobCount: 1 },
      ];
      setFields(mockFields);
    } catch (error) {
      console.error('Error loading fields:', error);
    }
  };

  const handleSearch = () => {
    const filters = {
      searchQuery,
      selectedProvince: selectedProvince === "all" ? "" : selectedProvince,
      selectedField: selectedField === "all" ? "" : selectedField,
      selectedJobType: selectedJobType === "all" ? "" : selectedJobType,
      selectedExperience: selectedExperience === "all" ? "" : selectedExperience,
      selectedEducation: selectedEducation === "all" ? "" : selectedEducation,
      salaryRange
    };
    
    console.log("Searching with filters:", filters);
  };

  const handleSalaryRangeChange = (value: number[]) => {
    setSalaryRange(value);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div 
        className="relative py-16 px-4 mx-4 my-4 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)"
        }}
      >
        <div className="container mx-auto max-w-6xl">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-3xl">
              <div className="relative bg-white rounded-lg shadow-lg border border-gray-100">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Tên công ty, công việc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-32 py-5 text-lg bg-transparent border-0 rounded-lg focus:outline-none focus:ring-0 w-full placeholder:text-gray-400"
                  style={{
                    boxShadow: 'none'
                  }}
                />
                <Button 
                  onClick={handleSearch}
                  className="absolute right-0.5 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Province Filter */}
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="bg-white border-0 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Tỉnh thành" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả tỉnh thành</SelectItem>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name} ({province.jobCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Field Filter */}
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="bg-white border-0 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Ngành nghề" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                {fields.map((field) => (
                  <SelectItem key={field.id} value={field.id.toString()}>
                    {field.name} ({field.jobCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Salary Filter */}
            <div className="relative">
              <Select 
                value={showSalaryRange ? "range" : "all"} 
                onValueChange={(value) => {
                  if (value === "range") {
                    setShowSalaryRange(true);
                  } else {
                    setShowSalaryRange(false);
                  }
                }}
              >
                <SelectTrigger className="bg-white border-0 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <SelectValue placeholder="Mức lương" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức lương</SelectItem>
                  <SelectItem value="range">Tùy chọn khoảng lương</SelectItem>
                  <SelectItem value="under-5">Dưới 5 triệu</SelectItem>
                  <SelectItem value="5-10">5 - 10 triệu</SelectItem>
                  <SelectItem value="10-20">10 - 20 triệu</SelectItem>
                  <SelectItem value="20-30">20 - 30 triệu</SelectItem>
                  <SelectItem value="over-30">Trên 30 triệu</SelectItem>
                  <SelectItem value="negotiable">Thỏa thuận</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Salary Range Slider */}
              {showSalaryRange && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-10 p-4 bg-white shadow-lg">
                  <CardContent className="p-0">
                    <Label className="text-sm font-medium mb-2 block">
                      Mức lương: {salaryRange[0]} - {salaryRange[1]} triệu
                    </Label>
                    <Slider
                      value={salaryRange}
                      onValueChange={handleSalaryRangeChange}
                      max={50}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Job Type Filter */}
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger className="bg-white border-0 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Loại công việc" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Experience Filter */}
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="bg-white border-0 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Kinh nghiệm" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả kinh nghiệm</SelectItem>
                {experienceOptions.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Education Filter */}
            <Select value={selectedEducation} onValueChange={setSelectedEducation}>
              <SelectTrigger className="bg-white border-0 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Học vấn" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả học vấn</SelectItem>
                {educationOptions.map((edu) => (
                  <SelectItem key={edu} value={edu}>
                    {edu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto max-w-6xl py-8 px-4">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {mockJobs.length} việc làm
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sắp xếp:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="salary-high">Lương cao nhất</SelectItem>
                <SelectItem value="salary-low">Lương thấp nhất</SelectItem>
                <SelectItem value="company">Tên công ty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {mockJobs.map((job) => (
            <Card key={job.id} className={`hover:shadow-lg transition-shadow ${job.isHighlighted ? 'ring-2 ring-blue-500' : ''}`}>
              <CardContent className="p-6">
                {/* Job Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image 
                      src={job.logo} 
                      alt={job.company}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {job.company}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-green-600 font-medium">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                </div>

                {/* Job Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{job.postedTime}</span>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Ứng tuyển
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
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
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  );
}
