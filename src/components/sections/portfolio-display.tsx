import PortfolioCard from '@/components/portfolio-card';
import { Separator } from '@/components/ui/separator';

const portfolioItems = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack, feature-rich online store with secure payments and inventory management.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'online store',
    projectUrl: '#',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    title: 'Project Management Tool',
    description: 'A collaborative SaaS platform for team task tracking and project planning.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'software dashboard',
    projectUrl: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
  },
  {
    title: 'Personal Blog Site',
    description: 'A minimalist, fast-loading blog built with a static site generator and headless CMS.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'website blog',
    projectUrl: '#',
    tags: ['Gatsby', 'Contentful', 'Markdown', 'SEO'],
  },
   {
    title: 'Mobile Fitness App',
    description: 'UX/UI design and prototype for a cross-platform mobile fitness application.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile app',
    projectUrl: '#',
    tags: ['Figma', 'User Research', 'Prototyping', 'Mobile UI'],
  },
];

export default function PortfolioDisplay() {
  return (
    <section id="portfolio" className="py-12 md:py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-2">My Work</h2>
      <p className="text-lg text-muted-foreground text-center mb-10">
        A selection of projects I've built and designed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {portfolioItems.map((item) => (
          <PortfolioCard
            key={item.title}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            imageHint={item.imageHint}
            projectUrl={item.projectUrl}
            tags={item.tags}
          />
        ))}
      </div>
      <Separator className="my-16" />
    </section>
  );
}
