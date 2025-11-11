"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Globe, Edit, Heart, MoreHorizontal, ChevronLeft, ChevronRight, Camera, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState("gioi-thieu");

  // Mock data - sẽ thay thế bằng API sau
  const companyData = {
    id: 1,
    nameCompany: "Công ty Test",
    avatarPic: "/company-avatar.jpg",
    coverImage: "/company-cover.jpg",
    scale: "100 - 500 nhân viên",
    followers: 1,
    website: "abc.com",
    provinceName: "Cần Thơ",
    intro: "Không có",
    description: `Công ty chúng tôi chuyên về phát triển phần mềm và công nghệ thông tin. 
    Với đội ngũ nhân viên giàu kinh nghiệm và tâm huyết, chúng tôi cam kết mang đến 
    những sản phẩm chất lượng cao cho khách hàng.`,
    jobPosts: [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Công ty Test",
        salary: "5 - 10 triệu",
        type: "Nhân viên chính thức",
        location: "Cần Thơ",
        timeAgo: "một tháng trước"
      }
    ]
  };

  const tabs = [
    { id: "gioi-thieu", label: "Giới thiệu" },
    { id: "thong-tin", label: "Thông tin" },
    { id: "ung-vien", label: "Ứng viên" },
    { id: "tuyen-dung", label: "Tuyển dụng" }
  ];

  const keywords = [
    "Nhân sự", "Phát triển", "Quản lý", "Kế toán", "Kỹ thuật", "Thiết kế",
    "Marketing", "Bán hàng", "Hỗ trợ", "Tư vấn", "IT", "Nghiên cứu", "Y tế",
    "Luật", "Sản xuất", "Dịch vụ", "Nghệ thuật", "Xây dựng", "Giáo dục",
    "Nông nghiệp"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative">

        {/* Company Info */}
        <div className="bg-white pt-6">
          <div className="max-w-6xl mx-auto px-2">
            <div className="flex items-start gap-6 pb-6">
              {/* Company Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white text-4xl font-bold">M</span>
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-md">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>

              {/* Company Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nhà tuyển dụng</p>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{companyData.nameCompany}</h1>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{companyData.scale}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{companyData.followers} người theo dõi</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span className="text-primary">{companyData.website}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                    onClick={() => setActiveTab("thong-tin")}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "gioi-thieu" && (
              <>
                {/* Về công ty */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">Về công ty</h2>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {companyData.intro === "Không có" ? (
                        <span className="text-gray-400 italic">Chưa có thông tin về công ty</span>
                      ) : (
                        companyData.description
                      )}
                    </p>
                  </CardContent>
                </Card>

                {/* Tuyển dụng */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Tuyển dụng</h2>
                    
                    {companyData.jobPosts.length > 0 ? (
                      <div className="space-y-4">
                        {companyData.jobPosts.map((job) => (
                          <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-lg font-bold">M</span>
                                </div>
                                
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                                  
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                    <span>$ {job.salary}</span>
                                    <span>{job.type}</span>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{job.location}</span>
                                    </div>
                                  </div>
                                  
                                  <p className="text-xs text-gray-400">{job.timeAgo}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2">
                                  Ứng tuyển
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-400">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Pagination */}
                        <div className="flex justify-center pt-6">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" disabled className="text-gray-400">
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button className="bg-primary text-primary-foreground w-8 h-8 text-sm">1</Button>
                            <Button variant="ghost" size="sm" disabled className="text-gray-400">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">Chưa có tin tuyển dụng nào</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "tuyen-dung" && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nội dung tuyển dụng đã được hiển thị trong tab Giới thiệu</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "thong-tin" && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Tên công ty */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Tên công ty</h3>
                        <p className="text-gray-600">{companyData.nameCompany}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>

                    {/* Tên người đại diện */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Tên người đại diện</h3>
                        <p className="text-gray-600">Trâm Khôi Nguyên</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">test@test.com</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>

                    {/* Điện thoại */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Điện thoại</h3>
                        <p className="text-gray-600">0987765252</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>

                    {/* Web */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Web</h3>
                        <p className="text-gray-600">{companyData.website}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>

                    {/* Địa chỉ */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Địa chỉ</h3>
                        <p className="text-gray-600">{companyData.provinceName}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>

                    {/* Quy mô */}
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Quy mô</h3>
                        <p className="text-gray-600">{companyData.scale}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Thay đổi
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "ung-vien" && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nội dung đang được phát triển</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Địa chỉ & Chia sẻ */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Địa chỉ</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{companyData.provinceName}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-4">Chia sẻ</h3>
                <div className="flex gap-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 p-0" title="Chia sẻ lên Facebook">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 hover:bg-gray-100" title="Gửi qua Email">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-black hover:bg-gray-800 text-white w-10 h-10 p-0" title="Chia sẻ lên X">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Gợi ý từ khóa */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Gợi ý từ khóa</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer text-sm py-1 px-3"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
