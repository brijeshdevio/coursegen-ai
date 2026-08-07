import { useGetCourses } from "@/features/course/hooks/useGetCourses";
import { useGetCourseStats } from "@/features/course/hooks/useGetCourseStats";

export default function Courses() {
  const { items, pagination, isLoading, isError, refetch } = useGetCourses();
  const { data } = useGetCourseStats();

  // @/types/index.ts
  // @/features/course/course.types.ts

  return <>Courses Page</>;
}
