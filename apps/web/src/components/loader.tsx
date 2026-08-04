import clsx from "clsx";
import { Spinner } from "./ui/spinner";

export const WindowLoader = ({
  className = "",
  title = "",
}: {
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={clsx("flex h-screen items-center justify-center", className)}
    >
      <div className="space-y-1">
        <Spinner className="mx-auto size-8" />
        <div>
          <span className="text-sm text-muted-foreground">
            {title || "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );
};
