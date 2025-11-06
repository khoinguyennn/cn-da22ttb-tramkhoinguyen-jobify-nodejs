import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Button } from "@/components/ui/button";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Jobify - Tìm việc làm dễ dàng",
  description: "Nền tảng tìm việc làm hiện đại, kết nối ứng viên và nhà tuyển dụng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${roboto.variable} antialiased font-sans`}
      >
        <QueryProvider>
          <div className="px-8 lg:px-16">
            {/* Header Navigation */}
            <header className="border-b bg-white -mx-8 lg:-mx-16">
              <div className="container mx-auto px-12 lg:px-20 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Jobify Logo" width={32} height={32} className="object-contain" />
                    <span className="text-2xl font-bold text-primary">Jobify</span>
                  </div>
                  
                  <nav className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-muted-foreground hover:text-primary">Trang chủ</a>
                    <a href="#" className="text-muted-foreground hover:text-primary">Ngành nghề hàng đầu</a>
                    <a href="#" className="text-muted-foreground hover:text-primary">Tin tức</a>
                    <a href="#" className="text-muted-foreground hover:text-primary">Công ty</a>
                  </nav>
                  
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" className="hover:bg-primary/10">Đăng nhập</Button>
                    <Button className="bg-primary hover:bg-primary/90">Nhà tuyển dụng</Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main>
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-muted py-12 -mx-8 lg:-mx-16">
              <div className="container mx-auto px-12 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Image src="/logo.png" alt="Jobify Logo" width={32} height={32} className="object-contain" />
                      <span className="text-2xl font-bold text-primary">Jobify</span>
                    </div>
                    <p className="text-muted-foreground">
                      Kết nối tài năng với cơ hội. Tìm kiếm công việc mơ ước của bạn.
                    </p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-muted-foreground hover:text-foreground">📧</a>
                      <a href="#" className="text-muted-foreground hover:text-foreground">📱</a>
                      <a href="#" className="text-muted-foreground hover:text-foreground">🐦</a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">Dành cho ứng viên</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a href="#" className="hover:text-foreground">Tìm việc làm</a></li>
                      <li><a href="#" className="hover:text-foreground">Công ty</a></li>
                      <li><a href="#" className="hover:text-foreground">Cẩm nang nghề nghiệp</a></li>
                      <li><a href="#" className="hover:text-foreground">Công cụ tính lương</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">Dành cho nhà tuyển dụng</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a href="#" className="hover:text-foreground">Đăng tin tuyển dụng</a></li>
                      <li><a href="#" className="hover:text-foreground">Tìm hồ sơ</a></li>
                      <li><a href="#" className="hover:text-foreground">Báo cáo thị trường</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">Liên hệ</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📍 Hà Nội, Việt Nam</li>
                      <li>📞 +84 123 456 789</li>
                      <li>✉️ info@jobify.vn</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
                  <p>&copy; 2024 Jobify. Tất cả quyền được bảo lưu.</p>
                </div>
              </div>
            </footer>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
