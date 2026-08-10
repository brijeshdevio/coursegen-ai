import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  ArrowRight,
  Brain,
  Zap,
  CheckCircle2,
  Terminal,
  Code,
  Sparkles,
  Layout,
  Video,
} from "lucide-react";
import { Logo } from "@/assets/Logo";

export default function Home() {
  const [isDark, setIsDark] = useState(true); // Default to dark for premium feel

  // Toggle theme placeholder logic (assumes a standard 'dark' class on html)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {/* 1. Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />
          <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-muted"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/auth/login">
                <Button variant="ghost">Log in</Button>
              </Link>

              <Link to="/auth/signup">
                <Button>
                  Start free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="relative z-10 container mx-auto flex flex-col items-center px-4 text-center">
          <Badge
            variant="outline"
            className="mb-6 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-primary"
          >
            <Sparkles className="mr-2 h-4 w-4" /> V2.0 is now live
          </Badge>
          <h1 className="mb-8 max-w-4xl font-display text-5xl leading-[1.1] font-extrabold tracking-tight md:text-7xl">
            Turn any topic into a{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              complete course
            </span>{" "}
            in seconds.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            CourseGen AI analyzes your brief, structures a curriculum, and
            generates engaging modules with interactive quizzes and reading
            materials.
          </p>
          <div className="mb-16 flex flex-col gap-4 sm:flex-row">
            <Link to="/courses/generate">
              <Button size="lg" className="h-14 px-8 text-base">
                Generate your first course{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="h-14 px-8 text-base">
              View Example
            </Button>
          </div>

          {/* Floating Terminal-style AI Output Preview */}
          <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div className="absolute top-0 left-0 flex h-12 w-full items-center gap-2 border-b border-border bg-muted/50 px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/80"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="mx-auto rounded-md border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
                ~ coursegen --topic "Quantum Computing"
              </div>
            </div>
            <div className="p-6 pt-16 text-left font-mono text-sm sm:text-base">
              <div className="mb-2 flex gap-2 text-primary">
                <Terminal className="h-5 w-5" />
                <span>Analyzing prompt...</span>
              </div>
              <div className="mb-4 pl-7 text-muted-foreground">
                Creating curriculum structure for "Quantum Computing for
                Beginners"
              </div>

              <div className="space-y-3 pl-7">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-foreground">
                    Module 1: Introduction to Qubits
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-foreground">
                    Module 2: Superposition & Entanglement
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  <span className="font-medium text-primary">
                    Generating Module 3: Quantum Gates...
                  </span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-card to-transparent" />
          </div>
        </div>
      </section>

      {/* 3. How it Works */}
      <section
        id="how-it-works"
        className="border-y border-border/50 bg-muted/30 py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 md:mb-24">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
              How it works
            </h2>
            <p className="max-w-xl text-lg text-muted-foreground">
              From a single sentence to a fully interactive curriculum in three
              simple steps.
            </p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-3">
            <div className="absolute top-12 right-[15%] left-[15%] hidden h-px bg-linear-to-r from-transparent via-border to-transparent md:block" />

            {[
              {
                num: "01",
                title: "Set the parameters",
                desc: "Define your topic, target audience, and desired length. Provide any existing materials or guidelines.",
              },
              {
                num: "02",
                title: "AI generates structure",
                desc: "Our engine crafts a logical curriculum, breaking down complex topics into digestible modules.",
              },
              {
                num: "03",
                title: "Review and publish",
                desc: "Tweak the generated content, add your own flair, and instantly publish or export the course.",
              },
            ].map((step, i) => (
              <div key={i} className="group relative z-10 flex flex-col">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card font-display text-3xl font-bold text-primary shadow-sm transition-transform group-hover:-translate-y-1">
                  {step.num}
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features (Bento Grid) */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">
              Everything you need to teach
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful features designed to help you create engaging,
              high-quality educational content at scale.
            </p>
          </div>

          <div className="grid auto-rows-[300px] gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group relative col-span-1 overflow-hidden border-border/50 bg-linear-to-br from-card to-card/50 transition-colors hover:border-primary/30 md:col-span-2 lg:col-span-2">
              <CardHeader className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Adaptive AI Generation
                </CardTitle>
                <CardDescription className="mt-2 max-w-md text-base">
                  Our models adjust the tone, complexity, and pacing based on
                  your specified target audience.
                </CardDescription>
              </CardHeader>
              <div className="pointer-events-none absolute right-0 bottom-0 h-2/3 w-2/3 rounded-tl-[100px] bg-linear-to-tl from-primary/10 to-transparent transition-transform duration-500 group-hover:scale-110" />
            </Card>

            <Card className="border-border/50 bg-card transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <CardTitle className="text-xl">Instant Quizzes</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Automatically generate knowledge checks and assessments for
                  every module.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Code className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Rich Formatting</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Support for code blocks, math equations, tables, and Markdown.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Video className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Media Integration</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Seamlessly embed videos, images, and external resources into
                  your lessons.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative col-span-1 overflow-hidden border-border/50 bg-card transition-colors hover:border-primary/30 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <Layout className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-xl">Custom Branding</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Make it yours with custom domains, logos, and color schemes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Pricing */}
      <section
        id="pricing"
        className="border-y border-border/50 bg-muted/30 py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Start for free, upgrade when you need more power.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {/* Free */}
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>
                  Perfect for exploring the platform.
                </CardDescription>
                <div className="mt-4 flex items-baseline font-display text-5xl font-extrabold">
                  $0
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /mo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="mt-6">
                <ul className="space-y-4">
                  {[
                    "3 courses per month",
                    "Standard AI models",
                    "Basic templates",
                    "Community support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Pro */}
            <Card className="relative border-primary bg-card shadow-2xl shadow-primary/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="border-none bg-primary px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground uppercase hover:bg-primary">
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Pro</CardTitle>
                <CardDescription>
                  For serious creators and educators.
                </CardDescription>
                <div className="mt-4 flex items-baseline font-display text-5xl font-extrabold">
                  $29
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /mo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="mt-6">
                <ul className="space-y-4">
                  {[
                    "Unlimited courses",
                    "Advanced AI models (GPT-4)",
                    "Custom branding",
                    "Priority support",
                    "Export to LMS (SCORM)",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button className="w-full">Upgrade to Pro</Button>
              </CardFooter>
            </Card>

            {/* Team */}
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">Team</CardTitle>
                <CardDescription>
                  For organizations scaling their training.
                </CardDescription>
                <div className="mt-4 flex items-baseline font-display text-5xl font-extrabold">
                  $99
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /mo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="mt-6">
                <ul className="space-y-4">
                  {[
                    "Everything in Pro",
                    "5 Team seats",
                    "Collaborative editing",
                    "Advanced analytics",
                    "Dedicated success manager",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">
              Loved by educators
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                q: "CourseGen AI cut our curriculum development time by 80%. What used to take weeks now takes an afternoon.",
                a: "Sarah L.",
                role: "Instructional Designer",
                initials: "SL",
              },
              {
                q: "The quality of the generated quizzes is outstanding. It captures the nuance of the material perfectly.",
                a: "Dr. James K.",
                role: "University Professor",
                initials: "JK",
              },
              {
                q: "As a solo creator, this tool is like having a full team of researchers and writers at my disposal.",
                a: "Elena M.",
                role: "Content Creator",
                initials: "EM",
              },
            ].map((t, i) => (
              <Card key={i} className="border-none bg-muted/30 shadow-none">
                <CardContent className="pt-8">
                  <div className="mb-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Sparkles
                        key={s}
                        className="h-4 w-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <p className="mb-8 text-lg leading-relaxed text-foreground">
                    "{t.q}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.a}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="border-t border-border/50 bg-muted/30 py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="relative md:col-span-5">
              <div className="sticky top-32">
                <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">
                  Common questions
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Everything you need to know about the product and billing.
                </p>
                <Button variant="outline">Contact Support</Button>
              </div>
            </div>
            <div className="md:col-span-7">
              <Accordion className="w-full">
                {[
                  {
                    q: "How accurate is the AI-generated content?",
                    a: "We use state-of-the-art models fine-tuned specifically for educational content. However, we always recommend reviewing and verifying the output before publishing to your students.",
                  },
                  {
                    q: "Can I export the courses to my own LMS?",
                    a: "Yes. Pro and Team plans support SCORM export, allowing you to seamlessly integrate the generated courses into Canvas, Moodle, Blackboard, and other popular LMS platforms.",
                  },
                  {
                    q: "What languages are supported?",
                    a: "Currently, we fully support English, Spanish, French, and German. We are actively working on adding more languages in the coming months.",
                  },
                  {
                    q: "Is there a limit on how long a course can be?",
                    a: "Free users can generate up to 5 modules per course. Pro users can generate up to 20 modules, and Team users have unlimited module generation.",
                  },
                ].map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-b-border/50 py-2"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium transition-colors hover:text-primary hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/40 via-accent/20 to-primary/40 p-1">
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl"></div>
            <div className="relative z-10 flex flex-col items-center rounded-[1.4rem] border border-border/50 bg-card/50 p-12 text-center md:p-20">
              <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
                Ready to transform your teaching?
              </h2>
              <p className="mb-10 max-w-2xl text-xl text-muted-foreground">
                Join thousands of creators who are building the future of
                education with CourseGen AI.
              </p>
              <Link to="/courses/generate">
                <Button size="lg" className="h-14 rounded-full px-10 text-lg">
                  Generate your first course{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display font-bold text-primary-foreground">
                  CG
                </div>
                <span className="font-display text-xl font-bold tracking-tight">
                  CourseGen AI
                </span>
              </div>
              <p className="mb-6 max-w-xs text-muted-foreground">
                Empowering educators with artificial intelligence to build
                better learning experiences.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-t border-border/50 pt-8 text-sm text-muted-foreground md:flex-row">
            <p>
              © {new Date().getFullYear()} CourseGen AI. All rights reserved.
            </p>
            <div className="mt-4 flex gap-4 md:mt-0">
              <a href="#" className="transition-colors hover:text-primary">
                Twitter
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                GitHub
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
