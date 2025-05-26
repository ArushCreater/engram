"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border"> 
      <div className="notion-container py-16 md:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/image 94.png"
                alt="engram Logo"
                width={24}
                height={24}
                className="opacity-80"
                priority
              />
              <span className="font-medium text-foreground">engram</span>
            </div>
            <p className="text-sm text-foreground/60 mt-4 max-w-xs">
              Organize, enhance, and share your knowledge in a beautiful workspace.
            </p>
          </div>
          
          {/* Navigation columns */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Templates</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Enterprise</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Guides</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Help center</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">API</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">About us</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="border-t border-border pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Stay updated</h3>
            <p className="text-sm text-foreground/60">Get notified about new features and updates.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="glass-input text-sm md:w-72 px-4 py-2"
            />
            <Button 
              className="bg-foreground text-background hover:bg-foreground/90 text-sm font-medium"
            >
              Subscribe
            </Button>
          </div>
        </div>
        
        {/* Legal section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} engram by Neural Network Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-foreground/50 hover:text-foreground/80 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-foreground/50 hover:text-foreground/80 transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-foreground/50 hover:text-foreground/80 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
