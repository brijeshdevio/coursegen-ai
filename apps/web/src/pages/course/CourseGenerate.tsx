import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateCourseFacade } from "@/features/course/hooks/useGenerateCourse";
import { useSaveCourseFacade } from "@/features/course/hooks/useSaveCourse";
import type { GenerateCourse as GenerateCourseType } from "@/features/course/course.types.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  Layers,
  Link2,
  Loader2,
  RefreshCw,
  Save,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

// ─── Step indicator ───
function StepIndicator({ current }: { current: number }) {
  const steps = ["Configure", "Generating", "Preview"];
  return (
    <div className="mb-10 flex items-center justify-center gap-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`h-px w-8 sm:w-12 ${
                  isDone ? "bg-primary" : "bg-border"
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isDone
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : stepNum}
              </div>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  isActive
                    ? "text-foreground"
                    : isDone
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 2: Generating animation ───
const GENERATING_MESSAGES = [
  "Analyzing your topic...",
  "Structuring modules...",
  "Curating free resources...",
  "Almost ready...",
];

function GeneratingState() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % GENERATING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 8000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 95);
      setProgress(pct);
      if (elapsed < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-12 text-center">
      {/* AI animation — pulsing rings */}
      <div className="relative mb-10 h-32 w-32">
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/20" />
        <div
          className="absolute inset-3 animate-ping rounded-full border-2 border-primary/30"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute inset-6 animate-ping rounded-full border-2 border-primary/40"
          style={{ animationDelay: "0.6s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-7 w-7 animate-pulse text-primary" />
          </div>
        </div>
      </div>

      <p className="mb-2 h-7 text-lg font-medium transition-all">
        {GENERATING_MESSAGES[msgIdx]}
      </p>
      <p className="mb-8 text-sm text-muted-foreground">
        This usually takes a few seconds.
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="mt-10 grid w-full grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───
export default function CourseGenerate() {
  const {
    handleSubmit,
    submit,
    register,
    errors,
    isPending,
    data,
    isSuccess,
    setValue,
  } = useGenerateCourseFacade();
  const {
    submit: saveCourse,
    isPending: isSaving,
    isSuccess: isSaved,
  } = useSaveCourseFacade();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<string>("");

  // Transition to step 3 when generation completes
  useEffect(() => {
    if (isSuccess && data) {
      setStep(3);
    }
  }, [isSuccess, data]);

  // Navigate away after save
  useEffect(() => {
    if (isSaved) {
      navigate("/courses");
    }
  }, [isSaved, navigate]);

  // Transition to step 2 when pending
  useEffect(() => {
    if (isPending) {
      setStep(2);
    }
  }, [isPending]);

  const handleSave = useCallback(() => {
    if (!data) return;
    saveCourse(data as any);
  }, [data, saveCourse]);

  const handleRegenerate = useCallback(() => {
    setStep(1);
  }, []);

  const handleCancel = useCallback(() => {
    navigate("/courses");
  }, [navigate]);

  const quickTopics = [
    "Python",
    "C++",
    "DSA",
    "React",
    "System Design",
    "Networking",
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <StepIndicator current={step} />

      {/* ─── Step 1: Form ─── */}
      {step === 1 && (
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <Badge
              variant="outline"
              className="mb-2 rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-primary"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              AI course generator
            </Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Generate a new course
            </h1>
            <p className="text-muted-foreground">
              Enter any topic and get a full structured course in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {/* Hero field: Topic */}
            <div className="space-y-3">
              <div className="relative">
                <Terminal className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("topic")}
                  placeholder="Enter a topic — Python, DSA, Networking..."
                  className="h-14 border-border bg-muted/50 pl-12 text-base"
                />
              </div>
              {errors.topic && (
                <p className="text-xs text-destructive">
                  {errors.topic.message}
                </p>
              )}

              {/* Quick topic pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {quickTopics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setValue("topic", t, { shouldValidate: true })
                    }
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <Label>Difficulty level</Label>
              <div className="grid grid-cols-3 gap-3">
                {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map(
                  (lv) => {
                    const selected = level === lv;
                    return (
                      <button
                        key={lv}
                        type="button"
                        onClick={() => {
                          setLevel(lv);
                          setValue("level", lv, { shouldValidate: true });
                        }}
                        className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {lv.charAt(0) + lv.slice(1).toLowerCase()}
                      </button>
                    );
                  }
                )}
              </div>

              {errors.level && (
                <p className="text-xs text-destructive">
                  {errors.level.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full text-base"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      )}

      {/* ─── Step 2: Generating ─── */}
      {step === 2 && <GeneratingState />}

      {/* ─── Step 3: Preview ─── */}
      {step === 3 && data && (
        <PreviewStep
          course={data}
          onSave={handleSave}
          onRegenerate={handleRegenerate}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

// ─── Preview Step Component ───
function PreviewStep({
  course,
  onSave,
  onRegenerate,
  onCancel,
  isSaving,
}: {
  course: GenerateCourseType;
  onSave: () => void;
  onRegenerate: () => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const totalTopics = course.modules.reduce(
    (sum, m) => sum + m.topics.length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-medium">
            {course.topic}
          </Badge>
          {course.level && (
            <Badge variant="outline" className="font-medium">
              {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
            </Badge>
          )}
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight">
          {course.title}
        </h1>
        {course.description && (
          <p className="leading-relaxed text-muted-foreground">
            {course.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            {course.modules.length} modules
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="h-4 w-4" />
            {totalTopics} topics
          </span>
        </div>
      </div>

      <Separator />

      {/* Modules Accordion */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold">Modules</h2>
        <Accordion className="space-y-3">
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map((mod, modIdx) => (
              <AccordionItem
                key={modIdx}
                value={`mod-${modIdx}`}
                className="overflow-hidden rounded-xl border border-border/50 px-0 transition-shadow data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-muted/30 hover:no-underline data-[state=open]:bg-muted/30">
                  <div className="flex w-full items-center gap-5">
                    <span className="w-10 shrink-0 text-center font-display text-3xl font-bold text-muted-foreground/30 tabular-nums">
                      {String(mod.order).padStart(2, "0")}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="text-base font-semibold">{mod.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {mod.topics.length} topics
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pt-0 pb-4">
                  <div className="ml-[60px] space-y-1">
                    {mod.topics
                      .sort((a, b) => a.order - b.order)
                      .map((topic, topIdx) => (
                        <div
                          key={topIdx}
                          className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5"
                        >
                          <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                          <span className="text-sm">{topic.title}</span>
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>

      {/* Resources */}
      {course.resources && course.resources.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Free Resources</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {course.resources.map((resource, i) => {
                let domain = "";
                try {
                  domain = new URL(resource.url).hostname.replace("www.", "");
                } catch {
                  domain = resource.url;
                }

                return (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-sm">
                      <CardContent className="flex items-start gap-3 p-4">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Badge
                            variant="outline"
                            className="mb-1 text-[10px] tracking-wider uppercase"
                          >
                            {resource.type}
                          </Badge>
                          <p className="line-clamp-1 text-sm font-medium transition-colors group-hover:text-primary">
                            {resource.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            {domain}
                            <ExternalLink className="h-3 w-3" />
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Actions row */}
      <div className="flex flex-col items-center gap-3 pb-8 sm:flex-row">
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save course
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onRegenerate}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="w-full text-destructive hover:text-destructive sm:w-auto"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
