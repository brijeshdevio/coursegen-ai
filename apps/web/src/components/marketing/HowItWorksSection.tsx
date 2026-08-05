import { MessageSquare, Settings2, Trophy } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Input Your Topic",
      description: "Simply type what you want to learn. 'Advanced React Patterns', 'Basics of Astrophysics', or 'How to bake sourdough bread'.",
      icon: <MessageSquare className="size-6 text-primary" />,
    },
    {
      number: "02",
      title: "Configure & Generate",
      description: "Select your experience level. Our AI instantly drafts a structured syllabus with modules and topics. Review and save to your library.",
      icon: <Settings2 className="size-6 text-primary" />,
    },
    {
      number: "03",
      title: "Start Learning",
      description: "Dive into the custom markdown content. Track your progress module by module in our distraction-free reader.",
      icon: <Trophy className="size-6 text-primary" />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to your personalized curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-border -z-10" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-6 shadow-sm">
                {step.icon}
              </div>
              <div className="absolute top-0 right-0 md:-right-6 md:-top-4 text-6xl font-black text-muted/50 -z-10 select-none">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
