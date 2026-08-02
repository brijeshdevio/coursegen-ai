import { Spinner } from "./ui/spinner";

export const WindowLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-1">
        <Spinner className="mx-auto size-8" />
        <div>
          <span className="text-sm text-muted-foreground">
            Authenticating...
          </span>
        </div>
      </div>
    </div>
  );
};
