"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-border">
      <div className="container mx-auto max-w-7xl h-16 flex items-center justify-between px-4 md:px-6 relative">
        {/* Left side navigation */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <Image 
                src="/image 94.png" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="transition-opacity duration-200"
                priority
              />
            </div>
            <span className="font-medium text-lg hidden sm:inline-block">engram</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md text-sm font-medium">
              Product
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md text-sm font-medium">
              Solutions
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md text-sm font-medium">
              Resources
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md text-sm font-medium">
              Pricing
            </Button>
          </div>
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-secondary text-sm font-medium">
            Log in
          </Button>
          <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 text-sm font-medium">
            Try for free
          </Button>
        </div>
      </div>
    </header>
  );
}
