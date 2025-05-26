"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0a0d15] border-t border-[#1A1A2A]"> 
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Connect your knowledge
          </h2>
          
          <p className="text-white/70 mb-10 leading-relaxed">
            Join our network of connected brains and experience a new dimension of learning and knowledge transfer.
          </p>
        </div>
        
        <div className="flex justify-center items-center mb-10">
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 relative mb-3 transform group-hover:scale-110 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
              <Image
                src="/image 94.png"
                alt="Logo"
                width={80}
                height={80}
                className="opacity-100 group-hover:opacity-100 transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <Button 
            variant="glass"
            className="px-8 py-4 text-white font-medium rounded-md bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300"
          >
            Join the Waitlist
          </Button>
        </div>
        
        <div className="pt-10 border-t border-[#1A1A2A]">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Neural Network Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
