import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          Web Weaver
        </Link>
        {/* Navigation links can be added here if needed in the future */}
      </div>
    </header>
  );
}
