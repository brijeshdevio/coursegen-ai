import { Layers, BookOpen, BrainCircuit } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Instant Course Generation",
      description: "From a single prompt, watch as an entire curriculum is built. You get modules, topics, and detailed markdown content within seconds.",
      icon: <BrainCircuit className="size-6 text-primary" />,
    },
    {
      title: "Tailored to Your Level",
      description: "Beginner, intermediate, or advanced—our AI adjusts the depth, terminology, and complexity to match exactly where you are.",
      icon: <Layers className="size-6 text-primary" />,
    },
    {
      title: "Immersive Topic Reader",
      description: "Learn without distractions. A dedicated reader environment tracks your progress and lets you focus completely on the content.",
      icon: <BookOpen className="size-6 text-primary" />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            A New Way to Learn
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master a new subject, tailored exactly to your specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
