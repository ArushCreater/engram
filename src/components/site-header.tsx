import Link from 'next/link';
import { Asterisk } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="bg-secondary/50 backdrop-blur-sm sticky top-0 z-50 border-b border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div></div> {/* Spacer to push logo to the right, or use justify-end on parent */}
        <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-300">
          <Asterisk className="h-7 w-7 text-primary" />
          <span className="text-2xl font-semibold">engram</span>
        </Link>
      </div>
    </header>
  );
}
