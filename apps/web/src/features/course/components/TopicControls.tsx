import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { useUpdateTopicCompletion } from "../hooks/useUpdateTopicCompletion";

interface TopicControlsProps {
  courseId: string;
  topicId: string;
  isCompleted: boolean;
}

export function TopicControls({ courseId, topicId, isCompleted }: TopicControlsProps) {
  const { updateTopicCompletion, isPending } = useUpdateTopicCompletion(courseId, topicId);

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 py-8 border-t mt-12">
      <Link to={`/courses/${courseId}`}>
        <Button variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Syllabus
        </Button>
      </Link>
      
      <Button
        variant={isCompleted ? "secondary" : "default"}
        className="w-full sm:w-auto"
        onClick={() => updateTopicCompletion()}
        disabled={isPending}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Completed
          </>
        ) : (
          <>
            <Circle className="mr-2 h-4 w-4" /> Mark as Complete
          </>
        )}
      </Button>
    </div>
  );
}
