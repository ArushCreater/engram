import { CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const skills = [
  'Next.js & React Ecosystem',
  'TypeScript & JavaScript (ES6+)',
  'Node.js & Express.js',
  'Tailwind CSS & ShadCN UI',
  'RESTful APIs & GraphQL',
  'Database Management (SQL & NoSQL)',
  'UI/UX Design Principles',
  'Agile Methodologies & Git',
];

export default function AboutMe() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <Avatar className="w-24 h-24 mx-auto mb-6 ring-2 ring-primary ring-offset-4 ring-offset-background">
          <AvatarImage src="https://placehold.co/100x100.png" alt="Your Name" data-ai-hint="person portrait" />
          <AvatarFallback>YW</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-bold tracking-tight mb-4">About Me</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Hello! I'm a passionate Web Weaver, dedicated to crafting beautiful, performant, and user-centric digital experiences. With a strong foundation in modern web technologies, I specialize in turning complex problems into elegant, intuitive solutions. I thrive in collaborative environments and am always eager to learn and explore new tools and techniques to push the boundaries of web development.
        </p>
      </div>
      <div className="mt-10 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-6">Core Skills</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
              <span className="text-foreground">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
