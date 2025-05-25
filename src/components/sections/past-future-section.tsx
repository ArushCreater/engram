import { Card } from '@/components/ui/card';

export default function PastFutureSection() {
  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Past VS Future</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border-border aspect-[16/9] shadow-xl flex items-center justify-center">
            {/* Content for 'Past' card can go here */}
            {/* <p className="text-muted-foreground text-2xl">Past</p> */}
          </Card>
          <Card className="bg-card border-border aspect-[16/9] shadow-xl flex items-center justify-center">
            {/* Content for 'Future' card can go here */}
            {/* <p className="text-muted-foreground text-2xl">Future</p> */}
          </Card>
        </div>
      </div>
    </section>
  );
}
