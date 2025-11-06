"use client";

import Image from "next/image";
import { 
  Search, MapPin, Users, Shield, Calculator, Building, Heart, Star, HandCoins,
  TrendingUp, Package, Megaphone, Shirt, Target, MessageCircle, 
  CheckCircle, Truck, Globe, Code, Stethoscope, Headphones, ArrowLeft, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/30 to-accent/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-6 pr-0 lg:pr-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Khám phá tìm năng nghề nghiệp cùng{" "}
                <span className="text-primary">Jobify</span> -{" "}
                Bước đầu cho sự nghiệp tuơi sáng!
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tìm kiếm công việc mơ ước của bạn với hàng ngàn cơ hội việc làm từ các công ty hàng đầu. 
                Chúng tôi kết nối tài năng với cơ hội.
              </p>
              
              {/* Company Logos */}
              <div className="flex items-center space-x-4 py-4">
                <span className="text-sm text-muted-foreground">Đối tác của chúng tôi:</span>
                <div className="flex items-center space-x-3">
                  <div className="bg-card px-3 py-1 rounded shadow-sm border">
                    <span className="font-semibold text-orange-600">UNG</span>
                  </div>
                  <div className="bg-card px-3 py-1 rounded shadow-sm border">
                    <span className="font-semibold text-green-600">vietjet</span>
                  </div>
                </div>
              </div>

              {/* Search Form */}
              <div className="bg-card p-6 rounded-lg shadow-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Nhập tên công việc..."
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Chọn địa điểm..."
                      className="pl-10"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full">
                    Tìm việc
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative flex justify-center">
        <Image
                src="/hero-illustration.svg" 
                alt="Cơ hội việc làm" 
                width={400} 
                height={300} 
                className="object-contain w-full h-auto max-w-lg"
          priority
        />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Industries */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Ngành nghề phổ biến</h2>
            <a href="#" className="text-primary hover:text-primary/80">Xem tất cả &gt;</a>
          </div>
          
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-6xl mx-auto"
          >
            <CarouselContent>
              {/* Slide 1: Ngành nghề 1-6 */}
              <CarouselItem>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                  {[
                    { icon: Users, title: "Dịch vụ khách hàng", color: "bg-primary/10 text-primary" },
                    { icon: Building, title: "Giáo dục / Đào tạo / Thư viện", color: "bg-primary/10 text-primary" },
                    { icon: Shield, title: "Bảo hiểm", color: "bg-primary/10 text-primary" },
                    { icon: Calculator, title: "Kế toán / Kiểm toán", color: "bg-primary/10 text-primary" },
                    { icon: Building, title: "Ngân hàng / Chứng khoán", color: "bg-primary/10 text-primary" },
                    { icon: HandCoins, title: "Tài chính / Đầu tư", color: "bg-primary/10 text-primary" }
                  ].map((item, index) => (
                    <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-lg ${item.color}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>

              {/* Slide 2: Ngành nghề 7-12 */}
              <CarouselItem>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                  {[
                    { icon: TrendingUp, title: "Bán hàng / Kinh doanh", color: "bg-primary/10 text-primary" },
                    { icon: Package, title: "Hàng gia dụng", color: "bg-primary/10 text-primary" },
                    { icon: Megaphone, title: "Quảng cáo / Đối ngoại", color: "bg-primary/10 text-primary" },
                    { icon: Shirt, title: "Thời trang", color: "bg-primary/10 text-primary" },
                    { icon: Target, title: "Tiếp thị", color: "bg-primary/10 text-primary" },
                    { icon: MessageCircle, title: "Tư vấn", color: "bg-primary/10 text-primary" }
                  ].map((item, index) => (
                    <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-lg ${item.color}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>

              {/* Slide 3: Ngành nghề 13-18 */}
              <CarouselItem>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                  {[
                    { icon: CheckCircle, title: "Quản lý chất lượng", color: "bg-primary/10 text-primary" },
                    { icon: Truck, title: "Vận chuyển / Giao hàng / Kho bãi", color: "bg-primary/10 text-primary" },
                    { icon: Globe, title: "Xuất nhập khẩu / Ngoại thương", color: "bg-primary/10 text-primary" },
                    { icon: Code, title: "CNTT - Phần mềm", color: "bg-primary/10 text-primary" },
                    { icon: Stethoscope, title: "Chăm sóc sức khỏe / Y tế", color: "bg-primary/10 text-primary" },
                    { icon: Headphones, title: "Dịch vụ khách hàng", color: "bg-primary/10 text-primary" }
                  ].map((item, index) => (
                    <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-lg ${item.color}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary/30 to-primary/20 rounded-lg p-8">
                <div className="bg-card rounded-lg p-4 w-fit mx-auto border">
                  <Building className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Công thông tin việc làm đáng tin cậy và phổ biến
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hơn 10 năm kinh nghiệm trong lĩnh vực tuyển dụng, chúng tôi tự hào mang đến cho bạn 
                những cơ hội việc làm chất lượng cao từ các doanh nghiệp uy tín hàng đầu Việt Nam.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Tìm việc ngay
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Công ty hàng đầu</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              { name: "Facebook", logo: "🔵", bg: "bg-primary" },
              { name: "Microsoft", logo: "🪟", bg: "bg-secondary" },
              { name: "Apple", logo: "🍎", bg: "bg-muted" },
              { name: "Starbucks", logo: "☕", bg: "bg-accent" },
              { name: "NVIDIA", logo: "💚", bg: "bg-primary/80" },
              { name: "LEGO", logo: "🔴", bg: "bg-destructive" },
              { name: "FPT", logo: "🔶", bg: "bg-secondary/80" },
              { name: "Netflix", logo: "🔴", bg: "bg-destructive/80" }
            ].map((company, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 ${company.bg} rounded-lg flex items-center justify-center text-primary-foreground text-xl`}>
                    {company.logo}
                  </div>
                  <p className="text-sm font-medium text-foreground">{company.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quy trình ứng tuyển</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tạo tài khoản",
                description: "Đăng ký tài khoản miễn phí để truy cập hàng ngàn cơ hội việc làm"
              },
              {
                step: "2", 
                title: "Cập nhật hồ sơ",
                description: "Hoàn thiện hồ sơ của bạn để tăng cơ hội được nhà tuyển dụng chú ý"
              },
              {
                step: "3",
                title: "Ứng tuyển",
                description: "Tìm kiếm và ứng tuyển vào những vị trí phù hợp với bạn"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Việc làm mới nhất</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Frontend Developer",
                company: "Công ty ABC",
                location: "Hà Nội",
                salary: "15-25 triệu",
                experience: "2-3 năm",
                type: "Fulltime"
              },
              {
                title: "Backend Developer", 
                company: "Công ty XYZ",
                location: "TP.HCM",
                salary: "18-30 triệu", 
                experience: "3-5 năm",
                type: "Fulltime"
              },
              {
                title: "UI/UX Designer",
                company: "Startup Tech",
                location: "Đà Nẵng", 
                salary: "12-20 triệu",
                experience: "1-3 năm",
                type: "Remote"
              },
              {
                title: "DevOps Engineer",
                company: "Big Corp",
                location: "Hà Nội",
                salary: "25-40 triệu",
                experience: "3-7 năm", 
                type: "Hybrid"
              }
            ].map((job, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription>{job.company}</CardDescription>
                    </div>
                  </div>
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-destructive cursor-pointer" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span>{job.salary}</span>
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Ứng tuyển
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Xem tất cả việc làm
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}