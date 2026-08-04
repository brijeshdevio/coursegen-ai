import { AlertCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUGGESTIONS } from "@/constants";
import { GeneratingSkeleton } from "@/features/course/components/GeneratingSkeleton";
import { useGenerateFacade } from "@/features/course/hooks/useGenerate";
import { ResultBlock } from "@/features/course/components/ResultBlock";

export default function Generate() {
  const { handleSubmit, submit, register, isPending, getValues, data } =
    useGenerateFacade();

  return (
    <>
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> AI course generator
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Generate a new course
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter any topic and get a full structured course in seconds.
          </p>
        </div>

        {/* Input */}
        <form
          className={`mx-auto mt-10 max-w-2xl ${
            isPending ? "animate-[shake_0.4s_ease-in-out]" : ""
          }`}
          onSubmit={handleSubmit(submit)}
        >
          <div className="rounded-2xl border bg-card p-2 focus-within:border-primary/50">
            <div className="flex items-center gap-2">
              <span className="hidden pr-1 pl-3 font-mono text-xs text-muted-foreground sm:inline">
                &gt;_
              </span>
              <Input
                placeholder="Enter a topic — Python, DSA, Networking..."
                disabled={status === "loading"}
                className="h-14 flex-1 border-0 bg-transparent text-base shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                {...register("topic")}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <Button size="lg" className="mt-6 w-full gap-2" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating your
                course...
              </>
            ) : (
              <>
                Generate course <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {status === "error" && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              Something went wrong. Please try again.
            </div>
          )}
        </form>

        {/* Loading skeleton */}
        {isPending && <GeneratingSkeleton topic={getValues("topic")} />}

        {/* Result */}
        {data ? (
          <ResultBlock
            course={data}
            onSave={() => {}}
            onRegenerate={() => {}}
            onClear={() => {}}
            saved={status === "saved"}
          />
        ) : null}
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </>
  );
}
