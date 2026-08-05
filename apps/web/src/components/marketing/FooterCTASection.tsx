import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FooterCTASection() {
  return (
    <section className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
          Ready to build your personal curriculum?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
          Join CourseGen AI today and stop wasting time searching for the perfect course. Generate it instead.
        </p>
        <Button 
          size="lg" 
          variant="secondary" 
          className="h-14 px-8 text-lg rounded-full shadow-lg transition-transform hover:-translate-y-1 text-primary"
        >
          Get Started for Free
          <ArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </section>
  );
}
