"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="bg-[#0F1219]/90 backdrop-blur-md sticky top-0 z-40 w-full border-b border-[#2A2A2A]">
      <div className="container h-16 flex items-center justify-between px-4 md:px-6 relative">
        <div className="w-1/3 flex justify-start">
          <Button variant="ghost" className="text-white hover:bg-white/5 transition-all duration-300">
            About
          </Button>
        </div>
        
        {/* Centered logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-10 w-10 transform hover:scale-110 transition-transform duration-300">
            <Image 
              src="/image 94.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </div>
        </div>
        
        <div className="w-1/3 flex justify-end">
          <Button variant="ghost" className="text-white hover:bg-white/5 transition-all duration-300">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
