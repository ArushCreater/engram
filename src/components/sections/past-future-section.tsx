import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Archive, BrainCircuit, Lightbulb, Layers } from 'lucide-react';

export default function PastFutureSection() {
  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The Evolution of Learning
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <Card 
            className="bg-card border-border shadow-xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-red-500/20 hover:border-destructive/50 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <CardHeader className="items-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Layers size={48} className="text-destructive" />
              </div>
              <CardTitle className="text-2xl font-semibold text-destructive">The Past: Information Silos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                Static documents, scattered notes, and fragmented knowledge. Learning felt like navigating a maze of disconnected data dumps, leading to inefficiency and lost insights.
              </CardDescription>
              <ul className="list-disc list-inside text-left text-sm text-muted-foreground space-y-1">
                <li>Passive consumption</li>
                <li>Context switching</li>
                <li>Knowledge decay</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-card border-border shadow-xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-primary/40 hover:border-primary opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <BrainCircuit size={48} className="text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-primary">The Future: Engram</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="text-foreground text-base leading-relaxed">
                Dynamic, interconnected neurons of knowledge. Engram transforms learning into an intuitive journey with personalized paths and effortless understanding of complex concepts.
              </CardDescription>
               <ul className="list-disc list-inside text-left text-sm text-foreground space-y-1">
                <li>Active understanding</li>
                <li>Personalized paths</li>
                <li>Knowledge integration</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
