import SiteHeader from '@/components/site-header';
import HeroSection from '@/components/sections/hero-section';
import LearnersFeaturesSection from '@/components/sections/learners-features-section';
import TimeSection from '@/components/sections/time-section';
import PastFutureSection from '@/components/sections/past-future-section';
import FileShowcaseSection from '@/components/sections/file-showcase-section';
import ShowcaseSection from '@/components/sections/showcase-section';
import SiteFooter from '@/components/site-footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <LearnersFeaturesSection />
        <TimeSection />
        <PastFutureSection />
        <FileShowcaseSection />
        <ShowcaseSection />
      </main>
      <SiteFooter />
    </div>
  );
}
