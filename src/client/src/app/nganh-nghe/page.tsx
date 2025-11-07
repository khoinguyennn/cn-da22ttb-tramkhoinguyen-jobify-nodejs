'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function NganhNghePage() {
  const jobCategories = [
    {
      title: "Bộ phận hỗ trợ",
      color: "text-primary",
      jobs: [
        { name: "Biên phiên dịch / Thông dịch viên", count: 1 },
        { name: "Nhân sự", count: 1 },
        { name: "Pháp lý / Luật", count: 1 },
        { name: "Thư ký / Hành chính", count: 0 },
      ]
    },
    {
      title: "Hỗ trợ sản xuất", 
      color: "text-primary",
      jobs: [
        { name: "Quản lý chất lượng", count: 0 },
        { name: "Vận chuyển / Giao hàng / Kho bãi", count: 0 },
        { name: "Vật tư / Thu mua", count: 0 },
        { name: "Xuất nhập khẩu / Ngoại thương", count: 0 },
      ]
    },
    {
      title: "Sản xuất",
      color: "text-primary", 
      jobs: [
        { name: "An toàn lao động", count: 0 },
        { name: "Dầu khí / Khoáng sản", count: 0 },
        { name: "Dệt may / Da giày", count: 0 },
        { name: "Đồ gỗ", count: 0 },
        { name: "Hóa chất / Sinh hóa / Thực phẩm", count: 0 },
        { name: "Nông nghiệp / Lâm / Ngưu", count: 0 },
        { name: "Ô tô", count: 0 },
        { name: "Sản xuất / Vận hành sản xuất", count: 0 },
        { name: "Thủy hải sản", count: 0 },
      ]
    },
    {
      title: "Dịch vụ",
      color: "text-primary",
      jobs: [
        { name: "An ninh / Bảo vệ", count: 0 },
        { name: "Bán lẻ / Bán sỉ", count: 0 },
        { name: "Chăm sóc sức khỏe / Y tế", count: 0 },
        { name: "Dịch vụ khách hàng", count: 0 },
        { name: "Giáo dục / Đào tạo / Thư viện", count: 0 },
        { name: "Phi chính phủ / Phi lợi nhuận", count: 0 },
        { name: "Spa / Làm đẹp", count: 0 },
      ]
    },
    {
      title: "Công nghệ thông tin",
      color: "text-primary",
      jobs: [
        { name: "CNTT - Phần mềm", count: 7 },
        { name: "CNTT - Phần cứng / Mạng", count: 0 },
      ]
    },
    {
      title: "Khách sạn / Du lịch",
      color: "text-primary", 
      jobs: [
        { name: "Du lịch", count: 0 },
        { name: "Khách sạn", count: 0 },
        { name: "Nhà hàng / Dịch vụ ăn uống", count: 0 },
      ]
    },
    {
      title: "Xây dựng / Bất động sản",
      color: "text-primary",
      jobs: [
        { name: "Bất động sản", count: 0 },
        { name: "Kiến trúc", count: 0 },
        { name: "Nội thất / Ngoại thất", count: 0 },
        { name: "Xây dựng", count: 0 },
      ]
    },
    {
      title: "Dịch vụ tài chính", 
      color: "text-primary",
      jobs: [
        { name: "Bảo hiểm", count: 0 },
        { name: "Kế toán / Kiểm toán", count: 0 },
        { name: "Ngân hàng / Chứng khoán", count: 0 },
        { name: "Tài chính / Đầu tư", count: 0 },
      ]
    },
    {
      title: "Kỹ thuật",
      color: "text-primary",
      jobs: [
        { name: "Bảo trì / Sửa chữa", count: 0 },
        { name: "Điện lạnh / Nhiệt lạnh", count: 0 },
        { name: "Dược / Sinh học", count: 0 },
        { name: "Điện / Điện tử", count: 1 },
        { name: "Cơ khí / Ô tô / Tự động hóa / Kỹ thuật", count: 0 },
        { name: "Môi trường / Xử lý chất thải", count: 0 },
      ]
    },
    {
      title: "Truyền thông",
      color: "text-primary", 
      jobs: [
        { name: "Báo chí / Biên tập viên / Xuất bản", count: 0 },
        { name: "Nghệ thuật / Thiết kế", count: 0 },
        { name: "Viễn thông", count: 0 },
      ]
    },
    {
      title: "Dịch vụ khách hàng",
      color: "text-primary",
      jobs: [
        { name: "Bán hàng / Kinh doanh", count: 0 },
        { name: "Hàng gia dụng", count: 0 },
        { name: "Quảng cáo / Đối ngoại", count: 0 },
        { name: "Thời trang", count: 0 },
        { name: "Tiếp thị", count: 0 },
        { name: "Tư vấn", count: 0 },
      ]
    },
    {
      title: "Theo dõi tương",
      color: "text-primary",
      jobs: [
        { name: "Lao động phổ thông", count: 0 },
        { name: "Mới tốt nghiệp / Thực tập sinh", count: 0 },
        { name: "Người nước ngoài", count: 0 },
        { name: "Quản lý điều hành", count: 1 },
      ]
    },
    {
      title: "Khác",
      color: "text-primary",
      jobs: [
        { name: "Khác", count: 0 },
      ]
    }
  ];

  const provinces = [
    {
      letter: "A",
      cities: [
        { name: "An Giang", count: 0 }
      ]
    },
    {
      letter: "B", 
      cities: [
        { name: "Bắc Kạn", count: 0 },
        { name: "Bắc Giang", count: 0 },
        { name: "Bắc Ninh", count: 0 },
        { name: "Bình Định", count: 0 },
        { name: "Bình Thuận", count: 0 },
        { name: "Bình Phước", count: 1 },
        { name: "Bình Dương", count: 1 },
        { name: "Bà Rịa - Vũng Tàu", count: 0 },
        { name: "Bến Tre", count: 0 },
        { name: "Bạc Liêu", count: 0 }
      ]
    },
    {
      letter: "C",
      cities: [
        { name: "Cao Bằng", count: 1 },
        { name: "Cần Thơ", count: 2 },
        { name: "Cà Mau", count: 0 }
      ]
    },
    {
      letter: "D", 
      cities: [
        { name: "Điện Biên", count: 1 },
        { name: "Đà Nẵng", count: 0 },
        { name: "Đắk Lắk", count: 0 },
        { name: "Đắk Nông", count: 0 },
        { name: "Đồng Nai", count: 0 },
        { name: "Đồng Tháp", count: 0 }
      ]
    },
    {
      letter: "G",
      cities: [
        { name: "Gia Lai", count: 0 }
      ]
    },
    {
      letter: "H",
      cities: [
        { name: "Hà Nội", count: 4 },
        { name: "Hà Giang", count: 1 },
        { name: "Hòa Bình", count: 0 },
        { name: "Hải Dương", count: 0 },
        { name: "Hải Phòng", count: 0 },
        { name: "Hưng Yên", count: 0 },
        { name: "Hà Nam", count: 0 },
        { name: "Hà Tĩnh", count: 0 },
        { name: "Hồ Chí Minh", count: 3 },
        { name: "Hậu Giang", count: 0 }
      ]
    },
    {
      letter: "K",
      cities: [
        { name: "Khánh Hòa", count: 0 },
        { name: "Kon Tum", count: 0 },
        { name: "Kiên Giang", count: 0 }
      ]
    },
    {
      letter: "L",
      cities: [
        { name: "Lào Cai", count: 0 },
        { name: "Lai Châu", count: 0 },
        { name: "Lạng Sơn", count: 0 },
        { name: "Lâm Đồng", count: 0 },
        { name: "Long An", count: 0 }
      ]
    },
    {
      letter: "N", 
      cities: [
        { name: "Nam Định", count: 0 },
        { name: "Ninh Bình", count: 0 },
        { name: "Nghệ An", count: 0 },
        { name: "Ninh Thuận", count: 0 }
      ]
    },
    {
      letter: "P",
      cities: [
        { name: "Phú Thọ", count: 0 },
        { name: "Phú Yên", count: 0 }
      ]
    },
    {
      letter: "Q",
      cities: [
        { name: "Quảng Ninh", count: 0 },
        { name: "Quảng Bình", count: 0 },
        { name: "Quảng Trị", count: 0 },
        { name: "Quảng Nam", count: 0 },
        { name: "Quảng Ngãi", count: 0 }
      ]
    },
    {
      letter: "S", 
      cities: [
        { name: "Sơn La", count: 0 },
        { name: "Sóc Trăng", count: 0 }
      ]
    },
    {
      letter: "T",
      cities: [
        { name: "Tuyên Quang", count: 0 },
        { name: "Thái Nguyên", count: 0 },
        { name: "Thái Bình", count: 0 },
        { name: "Thanh Hóa", count: 0 },
        { name: "Thừa Thiên Huế", count: 0 },
        { name: "Tây Ninh", count: 0 },
        { name: "Tiền Giang", count: 0 },
        { name: "Trà Vinh", count: 0 }
      ]
    },
    {
      letter: "V",
      cities: [
        { name: "Vĩnh Phúc", count: 0 },
        { name: "Vĩnh Long", count: 0 }
      ]
    },
    {
      letter: "Y",
      cities: [
        { name: "Yên Bái", count: 0 }
      ]
    }
  ];

  const popularCategories = [
    { name: "CNTT - Phần mềm", count: 7 },
    { name: "Biên phiên dịch / Thông dịch viên", count: 1 },
    { name: "Nhân sự", count: 1 },
    { name: "Pháp lý / Luật", count: 1 },
    { name: "Điện / Điện tử", count: 1 },
    { name: "Quản lý điều hành", count: 1 },
    { name: "Thư ký / Hành chính", count: 0 },
    { name: "An ninh / Bảo vệ", count: 0 },
    { name: "Bán lẻ / Bán sỉ", count: 0 },
    { name: "Chăm sóc sức khỏe / Y tế", count: 0 }
  ];

  const suggestedKeywords = [
    "Nhân sự", "Phát triển", "Quản lý", "Kế toán", "Kỹ thuật", "Thiết kế",
    "Marketing", "Bán hàng", "Hỗ trợ", "Tư vấn", "IT", "Nghiên cứu", "Y tế",
    "Luật", "Sản xuất", "Dịch vụ", "Nghệ thuật", "Xây dựng", "Giáo dục", "Nông nghiệp"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Tìm kiếm việc làm nhanh</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cột trái - Danh mục nghề nghiệp và tỉnh thành */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tìm kiếm theo ngành nghề */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Tìm kiếm việc làm nhanh theo ngành nghề</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className={`font-semibold ${category.color}`}>
                        {category.title}
                      </h3>
                      <ul className="space-y-1">
                        {category.jobs.map((job, jobIndex) => (
                          <li key={jobIndex}>
                            <Link 
                              href={`/tim-kiem?job=${encodeURIComponent(job.name)}`}
                              className="text-sm text-gray-600 hover:text-primary transition-colors"
                            >
                              {job.name} ({job.count})
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tìm kiếm theo tỉnh */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Tìm kiếm việc làm nhanh theo tỉnh</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {provinces.map((province, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {province.letter}
                      </h3>
                      <ul className="space-y-1">
                        {province.cities.map((city, cityIndex) => (
                          <li key={cityIndex}>
                            <Link 
                              href={`/tim-kiem?location=${encodeURIComponent(city.name)}`}
                              className="text-sm text-gray-600 hover:text-primary transition-colors"
                            >
                              {city.name} ({city.count})
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cột phải - Ngành nghề phổ biến */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Ngành nghề phổ biến</h2>
                <ul className="space-y-2">
                  {popularCategories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        href={`/tim-kiem?job=${encodeURIComponent(category.name)}`}
                        className="text-sm text-gray-600 hover:text-primary transition-colors flex justify-between"
                      >
                        <span>{category.name}</span>
                        <span>({category.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Gợi ý từ khóa */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Gợi ý từ khóa</h2>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map((keyword, index) => (
                    <Link
                      key={index}
                      href={`/tim-kiem?q=${encodeURIComponent(keyword)}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-purple-100 hover:text-primary transition-colors"
                    >
                      {keyword}
                    </Link>
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
