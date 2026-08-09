import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw } from "lucide-react";

import { useGetCourseTopic } from "@/features/course/hooks/useGetCourseTopic";
import { TopicContent } from "@/features/course/components/TopicContent";
import { TopicControls } from "@/features/course/components/TopicControls";

export default function CourseTopic() {
  const { id, topicId } = useParams<{ id: string; topicId: string }>();

  const { data: topic, isLoading, isError, refetch } = useGetCourseTopic(
    id || "",
    topicId || ""
  );

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Topic</h2>
          <p className="text-destructive/80 mb-6">
            We couldn't fetch the topic content. Please check your connection or try again.
          </p>
          <Button onClick={() => refetch()} variant="outline" className="w-full">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !topic) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
        <div className="border-b pb-6 space-y-4">
          <Skeleton className="h-10 w-3/4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <br />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 py-4 lg:py-8">
      <TopicContent topic={topic} />
      <TopicControls 
        courseId={id || ""} 
        topicId={topicId || ""} 
        isCompleted={topic.isCompleted} 
      />
    </div>
  );
}
