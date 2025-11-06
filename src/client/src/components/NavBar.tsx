"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, MapPin, Search, Building } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/nganh-nghe", label: "Ngành nghề/Địa điểm", icon: MapPin },
    { href: "/tim-kiem", label: "Tìm kiếm", icon: Search },
    { href: "/cong-ty", label: "Công ty", icon: Building },
  ];

  return (
    <header className="border-b bg-white -mx-8 lg:-mx-16">
      <div className="container mx-auto px-12 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Jobify Logo" width={32} height={32} className="object-contain" />
            <span className="text-2xl font-bold text-primary">Jobify</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-muted-foreground"
                  )}
                >
                  <IconComponent 
                    className={cn(
                      "w-4 h-4 transition-colors group-hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} 
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="hover:bg-primary/10">Đăng nhập</Button>
            <Button className="bg-primary hover:bg-primary/90">Nhà tuyển dụng</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
