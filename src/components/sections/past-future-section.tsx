
import { Card } from '@/components/ui/card';

export default function PastFutureSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl md:text-6xl font-bold text-center mb-16 opacity-0 animate-fade-in-up text-foreground/90"
          style={{ animationDelay: '0.2s' }}
        >
          Past VS Future
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Card 
            className="bg-card border-border/50 shadow-xl p-8 aspect-[3/2] flex justify-center items-center opacity-0 animate-fade-in-up rounded-lg transition-all duration-300 hover:shadow-primary/30"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Content removed to match plain card in image */}
          </Card>
          
          <Card 
            className="bg-card border-border/50 shadow-xl p-8 aspect-[3/2] flex justify-center items-center opacity-0 animate-fade-in-up rounded-lg transition-all duration-300 hover:shadow-primary/30"
            style={{ animationDelay: '0.6s' }}
          >
            {/* Content removed to match plain card in image */}
          </Card>
        </div>
      </div>
    </section>
  );
}
