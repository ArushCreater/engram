import Link from 'next/link';
import { Asterisk } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div></div> {/* Spacer to push logo to the right, or use justify-end on parent */}
        <Link href="/" className="group flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300">
          <div className="relative rounded-full p-1.5 overflow-hidden">
            <div className="glass-highlight"></div>
            <Asterisk className="h-7 w-7 text-primary relative z-10" />
          </div>
          <span className="text-2xl font-semibold">engram</span>
        </Link>
      </div>
    </header>
  );
}
