import { useParams } from "react-router-dom";

import { useGetCourseTopic } from "@/features/course/hooks/useGetCourseTopic";

export default function CourseTopic() {
  const { id, topicId } = useParams<{ id: string; topicId: string }>();

  const { data, isLoading, isError, refetch } = useGetCourseTopic(
    id || "",
    topicId || ""
  );

  // isLoading → show skeleton
  // isError   → show error state
  // @/features/course/course.types.ts

  return <>CourseTopic Page</>;
}
