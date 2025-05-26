import Link from 'next/link';
import Image from 'next/image';
import { Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0F1219] border-t border-[#2A2A2A]"> 
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-white mb-6">
          Discover more Brains
        </h2>
        
        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 relative mb-2">
              <Image
                src="/network-nodes-logo.svg"
                alt="Engram Logo"
                width={64}
                height={64}
                className="opacity-90"
              />
            </div>
            <span className="text-2xl font-semibold text-white">engram</span>
          </div>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md text-sm"
        >
          Join the Waitlist
        </Button>
        
        <p className="text-xs text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} Engram Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
