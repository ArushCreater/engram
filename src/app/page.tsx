import SiteHeader from '@/components/site-header';
import PortfolioDisplay from '@/components/sections/portfolio-display';
import AboutMe from '@/components/sections/about-me';
import SiteFooter from '@/components/site-footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <PortfolioDisplay />
        <AboutMe />
      </main>
      <SiteFooter />
    </div>
  );
}
