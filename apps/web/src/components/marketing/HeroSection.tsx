import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:pb-28">
      {/* Decorative background elements (optional, minimal) */}
      <div className="absolute inset-0 -z-10 bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.1),rgba(255,255,255,0))]"></div>

      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        <Sparkles className="size-4" />
        <span>Your Personal AI Curriculum Designer</span>
      </div>

      <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
        Stop Browsing. <br className="hidden sm:block" />
        <span className="text-primary">Start Creating.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
        Describe a topic you want to learn, and our AI instantly generates a
        complete, structured course tailored to your level.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button
          size="lg"
          className="h-12 rounded-full px-8 text-base shadow-lg transition-transform hover:-translate-y-1"
        >
          Generate Your First Course
          <ArrowRight className="ml-2 size-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12 rounded-full px-8 text-base transition-transform hover:-translate-y-1"
        >
          See How It Works
        </Button>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center gap-6 text-sm font-medium text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary/80"></div>
          10-30 Modules per Course
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary/80"></div>
          Custom Depth
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary/80"></div>
          Markdown Content
        </div>
      </div>
    </section>
  );
}
