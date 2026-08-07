import { useParams } from "react-router-dom";

import { useGetCourse } from "@/features/course/hooks/useGetCourse";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, refetch } = useGetCourse(id || "");

  // isLoading → show skeleton
  // isError   → show error state
  // @/features/course/course.types.ts

  return <>CourseDetails Page</>;
}
