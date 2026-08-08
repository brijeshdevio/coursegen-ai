import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  Sparkles,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { Logo } from "@/assets/Logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="container mx-auto flex flex-col items-center space-y-8 px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <div className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none">
            <Sparkles className="mr-1 h-3 w-3" /> Now in Public Beta
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Learn Anything with{" "}
            <span className="text-primary">AI-Generated</span> Courses
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Don't browse endless catalogs. Just tell us what you want to learn,
            and we'll instantly generate a complete, structured course tailored
            to your level.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link to="/auth/signup">
              <Button size="lg" className="h-12 px-8 text-base">
                Generate Your First Course{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
              >
                View Library
              </Button>
            </Link>
          </div>
        </section>

        {/* 3. Features Section */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Why CourseGen AI?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Built for self-learners who want structured, comprehensive
                knowledge without the fluff.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-background">
                <CardHeader>
                  <Brain className="mb-4 h-10 w-10 text-primary" />
                  <CardTitle>AI-Powered Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our AI acts as your personal mentor, designing 10-30 modules
                    filled with detailed markdown content tailored perfectly to
                    your prompt.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardHeader>
                  <BookOpen className="mb-4 h-10 w-10 text-primary" />
                  <CardTitle>Custom Difficulty Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Whether you are a beginner looking for basics or an advanced
                    user needing deep technical insight, we adjust the depth
                    accordingly.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardHeader>
                  <Clock className="mb-4 h-10 w-10 text-primary" />
                  <CardTitle>Save Time, Learn Faster</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Skip the process of searching for the perfect MOOC. Generate
                    a course in seconds and start learning immediately with zero
                    distractions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 4. How it Works */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  How it works in 3 easy steps
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">
                        Describe your topic
                      </h3>
                      <p className="text-muted-foreground">
                        Type any topic you want to master, from "System Design"
                        to "History of Rome".
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">
                        Review the syllabus
                      </h3>
                      <p className="text-muted-foreground">
                        We instantly generate a structured curriculum. Preview
                        it, tweak it, or regenerate if needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">
                        Start learning & tracking
                      </h3>
                      <p className="text-muted-foreground">
                        Dive into the rich markdown content, mark topics as
                        complete, and track your progress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-2xl border bg-muted p-8">
                <div className="text-center text-muted-foreground">
                  [Interactive Preview / App Screenshot Placeholder]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Benefits Section */}
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">
                  Designed for Focus
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground/80" />
                    <span className="text-lg">
                      Clean, distraction-free reading experience
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground/80" />
                    <span className="text-lg">
                      Built-in progress tracking to keep your momentum
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground/80" />
                    <span className="text-lg">
                      Your own personal library of generated courses
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground/80" />
                    <span className="text-lg">
                      Soft-delete to manage your library safely
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 backdrop-blur-sm">
                <blockquote className="space-y-4">
                  <p className="text-xl leading-relaxed font-medium italic">
                    "It's closer to having a senior mentor write you a custom
                    syllabus than enrolling in a generic MOOC. I learn exactly
                    what I need, when I need it."
                  </p>
                  <footer className="font-semibold text-primary-foreground/80">
                    — Early Adopter
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="bg-muted/30 py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How is this different from ChatGPT?
                </AccordionTrigger>
                <AccordionContent>
                  While ChatGPT gives you conversational answers, CourseGen AI
                  structures knowledge into a complete curriculum. It creates
                  modules, topics, and tracks your reading progress over time,
                  giving you a proper learning environment rather than a chat
                  interface.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I choose the difficulty?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! When generating a course, you can specify if you are a
                  beginner, intermediate, or advanced learner. The AI will
                  tailor the depth, vocabulary, and concepts accordingly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Is the generated content saved?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. Every course you generate is saved to your
                  personal library. You can revisit it anytime, pick up where
                  you left off, or delete it if you no longer need it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="border-t py-24">
          <div className="container mx-auto space-y-8 px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to start learning?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Join today and generate your first custom course in seconds. No
              credit card required.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CourseGen AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
