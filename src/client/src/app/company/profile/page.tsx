"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Users, Globe, Edit, Heart, MoreHorizontal, ChevronLeft, ChevronRight, Camera, Facebook, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useUpdateCompany } from "@/hooks/useUpdateCompany";
import { useUpdateCompanyAvatar } from "@/hooks/useUpdateCompanyAvatar";
import { useUpdateCompanyIntro } from "@/hooks/useUpdateCompanyIntro";
import { useAuth } from "@/contexts/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/utils/toast";
import { useProvinces } from "@/hooks/useReferenceData";

// Component để render select field có thể edit
const EditableSelectField = ({ 
  field, 
  label, 
  value, 
  options,
  isLast = false,
  isEditing,
  isLoading,
  formData,
  onEdit,
  onCancel,
  onSave,
  onSelectChange,
  placeholder = "Chọn..."
}: { 
  field: string; 
  label: string; 
  value: string; 
  options: { value: string; label: string; }[];
  isLast?: boolean;
  isEditing: boolean;
  isLoading: boolean;
  formData: any;
  onEdit: (field: string) => void;
  onCancel: () => void;
  onSave: (field: string) => void;
  onSelectChange: (field: string, value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex-1 mr-4">
        <h3 className="font-medium text-gray-900 mb-1">{label}</h3>
        {isEditing ? (
          <div className="space-y-2">
            <Select
              value={formData[field]?.toString() || ""}
              onValueChange={(value) => onSelectChange(field, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => onSave(field)}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                Lưu
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">{value || 'Chưa cập nhật'}</p>
        )}
      </div>
      {!isEditing && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-primary/80"
          onClick={() => onEdit(field)}
        >
          Thay đổi
        </Button>
      )}
    </div>
  );
};

// Component để render field có thể edit
const EditableField = ({ 
  field, 
  label, 
  value, 
  type = "text",
  isLast = false,
  isEditing,
  isLoading,
  formData,
  onEdit,
  onCancel,
  onSave,
  onInputChange
}: { 
  field: string; 
  label: string; 
  value: string; 
  type?: "text" | "email" | "textarea";
  isLast?: boolean;
  isEditing: boolean;
  isLoading: boolean;
  formData: any;
  onEdit: (field: string) => void;
  onCancel: () => void;
  onSave: (field: string) => void;
  onInputChange: (field: string, value: string) => void;
}) => {
  return (
    <div className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex-1 mr-4">
        <h3 className="font-medium text-gray-900 mb-1">{label}</h3>
        {isEditing ? (
          <div className="space-y-2">
            {type === "textarea" ? (
              <textarea
                value={formData[field] || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange(field, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
            ) : (
              <Input
                type={type}
                value={formData[field] || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(field, e.target.value)}
                className="w-full"
              />
            )}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => onSave(field)}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                Lưu
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">{value || 'Chưa cập nhật'}</p>
        )}
      </div>
      {!isEditing && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-primary/80"
          onClick={() => onEdit(field)}
        >
          Thay đổi
        </Button>
      )}
    </div>
  );
};

export default function CompanyProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("gioi-thieu");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [introContent, setIntroContent] = useState("");
  const [formData, setFormData] = useState({
    nameCompany: "",
    nameAdmin: "",
    email: "",
    phone: "",
    web: "",
    intro: "",
    scale: "",
    idProvince: 0
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { company, avatarUpdateTime } = useAuth();
  const { data: companyProfile, isLoading, error } = useCompanyProfile();
  const updateCompanyMutation = useUpdateCompany();
  const updateAvatarMutation = useUpdateCompanyAvatar();
  const updateIntroMutation = useUpdateCompanyIntro();
  const { data: provincesData = [], isLoading: provincesLoading } = useProvinces();

  // Sử dụng dữ liệu từ API hoặc fallback từ auth context
  const companyData = companyProfile || company;

  // Dữ liệu cho company scales
  const companySizes = [
    { value: "ít hơn 10", label: "ít hơn 10 nhân viên" },
    { value: "10 - 20", label: "10 - 20 nhân viên" },
    { value: "20 - 100", label: "20 - 100 nhân viên" },
    { value: "100 - 500", label: "100 - 500 nhân viên" },
    { value: "500 - 1000", label: "500 - 1000 nhân viên" },
    { value: "1000 - 5000", label: "1000 - 5000 nhân viên" },
    { value: "nhiều hơn 5000", label: "nhiều hơn 5000 nhân viên" }
  ];

  // Chuẩn bị dữ liệu provinces cho select
  const provinces = Array.isArray(provincesData) ? provincesData : [];
  const provinceOptions = provinces.map(province => ({
    value: province.id.toString(),
    label: province.nameWithType
  }));

  // Cập nhật form data khi có dữ liệu từ API
  React.useEffect(() => {
    if (companyData) {
      setFormData({
        nameCompany: companyData.nameCompany || "",
        nameAdmin: companyData.nameAdmin || "",
        email: companyData.email || "",
        phone: companyData.phone || "",
        web: companyData.web || "",
        intro: companyData.intro || "",
        scale: companyData.scale || "",
        idProvince: companyData.idProvince || 0
      });
      setIntroContent(companyData.intro || "");
    }
  }, [companyData]);

  // Xử lý edit field
  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    setEditingField(null);
    // Reset form data về giá trị gốc
    if (companyData) {
      setFormData({
        nameCompany: companyData.nameCompany || "",
        nameAdmin: companyData.nameAdmin || "",
        email: companyData.email || "",
        phone: companyData.phone || "",
        web: companyData.web || "",
        intro: companyData.intro || "",
        scale: companyData.scale || "",
        idProvince: companyData.idProvince || 0
      });
    }
  };

  const handleSave = async (field: string) => {
    if (!companyData?.id) return;

    try {
      const updateData: any = {};
      updateData[field] = formData[field as keyof typeof formData];

      await updateCompanyMutation.mutateAsync({
        id: companyData.id,
        data: updateData
      });

      setEditingField(null);
      showToast.success("Cập nhật thông tin thành công!");
    } catch (error: any) {
      showToast.error(error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleInputChange = React.useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSelectChange = React.useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'idProvince' ? parseInt(value) : value
    }));
  }, []);

  // Xử lý upload avatar
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !companyData?.id) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showToast.error('Chỉ chấp nhận file ảnh (JPG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showToast.error('Kích thước file không được vượt quá 5MB');
      return;
    }

    try {
      await updateAvatarMutation.mutateAsync({
        id: companyData.id,
        file: file
      });
      showToast.success('Cập nhật logo công ty thành công!');
    } catch (error: any) {
      showToast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật logo');
    }

    // Reset input value để có thể chọn lại cùng file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Xử lý intro editor
  const handleEditIntro = () => {
    setIsEditingIntro(true);
  };

  const handleSaveIntro = async () => {
    if (!companyData?.id) {
      showToast.error('Không tìm thấy thông tin công ty');
      return;
    }

    try {
      await updateIntroMutation.mutateAsync({
        id: companyData.id,
        intro: introContent
      });
      setIsEditingIntro(false);
    } catch (error) {
      console.error('Error updating intro:', error);
    }
  };

  const handleCancelIntro = () => {
    setIntroContent(companyData?.intro || "");
    setIsEditingIntro(false);
  };

  // Mock job posts - sẽ tích hợp API jobs sau
  const mockJobPosts = [
    {
      id: 1,
      title: "Frontend Developer",
      company: companyData?.nameCompany || "Công ty",
      salary: "5 - 10 triệu",
      type: "Nhân viên chính thức",
      location: companyData?.provinceName || "Việt Nam",
      timeAgo: "một tháng trước"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-gray-600">Đang tải thông tin công ty...</span>
        </div>
      </div>
    );
  }

  if (error || !companyData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Không thể tải thông tin công ty</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
  }

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    if (tabId === "tuyen-dung") {
      router.push("/company/jobs/create");
    } else {
      setActiveTab(tabId);
    }
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
                <UserAvatar 
                  user={{ 
                    name: companyData.nameCompany, 
                    avatarPic: companyData.avatarPic 
                  }} 
                  size="xl"
                  className="w-32 h-32 border-4 border-white shadow-lg"
                  forceRefresh={avatarUpdateTime > 0}
                />
                <button 
                  onClick={handleAvatarClick}
                  disabled={updateAvatarMutation.isPending}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors shadow-md"
                  title="Thay đổi logo công ty"
                >
                  {updateAvatarMutation.isPending ? (
                    <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  )}
                </button>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Company Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nhà tuyển dụng</p>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{companyData.nameCompany}</h1>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      {companyData.scale && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{companyData.scale}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>0 người theo dõi</span>
                      </div>
                      {companyData?.web && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span className="text-primary">{companyData.web}</span>
                        </div>
                      )}
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
                    onClick={() => handleTabClick(tab.id)}
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
                      {!isEditingIntro ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary/80"
                          onClick={handleEditIntro}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={handleSaveIntro}
                            disabled={updateIntroMutation.isPending}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {updateIntroMutation.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            ) : null}
                            Lưu
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={handleCancelIntro}
                            disabled={updateIntroMutation.isPending}
                          >
                            Hủy
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {isEditingIntro ? (
                      <RichTextEditor
                        content={introContent}
                        onChange={setIntroContent}
                        placeholder=""
                        className="min-h-[300px]"
                      />
                    ) : (
                      <div className="text-gray-600 leading-relaxed">
                        {!companyData.intro || companyData.intro.trim() === "" ? (
                          <span className="text-gray-400 italic">Chưa có thông tin về công ty</span>
                        ) : (
                          <div 
                            className="prose prose-sm max-w-none company-intro-content"
                            dangerouslySetInnerHTML={{ __html: companyData.intro }}
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tuyển dụng */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Tuyển dụng</h2>
                    
                    {mockJobPosts.length > 0 ? (
                      <div className="space-y-4">
                        {mockJobPosts.map((job) => (
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
                  <div className="space-y-0">
                    <EditableField
                      field="nameCompany"
                      label="Tên công ty"
                      value={companyData?.nameCompany || ""}
                      isEditing={editingField === "nameCompany"}
                      isLoading={updateCompanyMutation.isPending}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onInputChange={handleInputChange}
                    />
                    <EditableField
                      field="nameAdmin"
                      label="Tên người đại diện"
                      value={companyData?.nameAdmin || ""}
                      isEditing={editingField === "nameAdmin"}
                      isLoading={updateCompanyMutation.isPending}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onInputChange={handleInputChange}
                    />
                    <EditableField
                      field="email"
                      label="Email"
                      value={companyData?.email || ""}
                      type="email"
                      isEditing={editingField === "email"}
                      isLoading={updateCompanyMutation.isPending}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onInputChange={handleInputChange}
                    />
                    <EditableField
                      field="phone"
                      label="Điện thoại"
                      value={companyData?.phone || ""}
                      isEditing={editingField === "phone"}
                      isLoading={updateCompanyMutation.isPending}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onInputChange={handleInputChange}
                    />
                    <EditableField
                      field="web"
                      label="Web"
                      value={companyData?.web || ""}
                      isEditing={editingField === "web"}
                      isLoading={updateCompanyMutation.isPending}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onInputChange={handleInputChange}
                    />
                    <EditableSelectField
                      field="idProvince"
                      label="Địa chỉ"
                      value={companyData?.provinceName || companyData?.provinceFullName || ""}
                      options={provinceOptions}
                      isEditing={editingField === "idProvince"}
                      isLoading={updateCompanyMutation.isPending || provincesLoading}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onSelectChange={handleSelectChange}
                      placeholder="Chọn tỉnh thành"
                    />
                    <EditableSelectField
                      field="scale"
                      label="Quy mô"
                      value={companyData?.scale || ""}
                      options={companySizes}
                      isLast={true}
                      isEditing={editingField === "scale"}
                      isLoading={updateCompanyMutation.isPending}
                      formData={formData}
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onSelectChange={handleSelectChange}
                      placeholder="Chọn quy mô công ty"
                    />
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
                  <span>{companyData.provinceName || companyData.provinceFullName || 'Chưa cập nhật'}</span>
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

// CSS styles cho hiển thị content
const styles = `
  .company-intro-content h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    line-height: 1.2;
    color: #1f2937;
  }
  .company-intro-content h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    line-height: 1.3;
    color: #1f2937;
  }
  .company-intro-content h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    line-height: 1.4;
    color: #1f2937;
  }
  .company-intro-content ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  .company-intro-content ol {
    list-style-type: decimal;
    margin-left: 1.5rem;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  .company-intro-content li {
    margin: 0.25rem 0;
    padding-left: 0.25rem;
  }
  .company-intro-content p {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
  .company-intro-content strong {
    font-weight: bold;
  }
  .company-intro-content em {
    font-style: italic;
  }
  .company-intro-content u {
    text-decoration: underline;
  }
  .company-intro-content s {
    text-decoration: line-through;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.getElementById('company-intro-styles');
  if (!styleElement) {
    const style = document.createElement('style');
    style.id = 'company-intro-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  }
}
