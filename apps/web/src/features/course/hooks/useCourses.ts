import { useQuery } from "@tanstack/react-query";
import { courseService } from "../course.service";
import type { GetCoursesParams } from "@/types/course";

export const useCourses = (params?: GetCoursesParams) =>
  useQuery({
    queryKey: ["courses", params],
    queryFn: () => courseService.getCourses(params),
    retry: false,
  });
