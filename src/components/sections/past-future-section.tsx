import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Layers, BrainCircuit } from 'lucide-react'; // Corrected Layers import

export default function PastFutureSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The Evolution of Learning
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <Card 
            className="bg-card border-border shadow-xl p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-red-500/30 hover:border-destructive/60 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <CardHeader className="items-center mb-2">
              <div className="p-5 bg-muted rounded-full mb-6 shadow-md">
                <Layers size={60} className="text-destructive" />
              </div>
              <CardTitle className="text-3xl font-bold text-destructive">The Past: Information Silos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                Static documents, scattered notes, and fragmented knowledge. Learning felt like navigating a maze of disconnected data dumps, leading to inefficiency and lost insights.
              </CardDescription>
              <ul className="list-disc list-inside text-left text-base text-muted-foreground space-y-1.5 pt-2">
                <li>Passive consumption & information overload</li>
                <li>Context switching & fragmented understanding</li>
                <li>Knowledge decay & difficulty in retrieval</li>
                <li>Inefficient collaboration & knowledge sharing</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-card border-border shadow-xl p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-primary/40 hover:border-primary/80 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <CardHeader className="items-center mb-2">
              <div className="p-5 bg-primary/10 rounded-full mb-6 shadow-md">
                <BrainCircuit size={60} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary">The Future: Engram</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-foreground text-lg leading-relaxed">
                Dynamic, interconnected neurons of knowledge. Engram transforms learning into an intuitive journey with personalized paths and effortless understanding of complex concepts.
              </CardDescription>
               <ul className="list-disc list-inside text-left text-base text-foreground space-y-1.5 pt-2">
                <li>Active understanding & knowledge synthesis</li>
                <li>Personalized, adaptive learning paths</li>
                <li>Knowledge integration & holistic views</li>
                <li>Seamless collaboration & collective intelligence</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
