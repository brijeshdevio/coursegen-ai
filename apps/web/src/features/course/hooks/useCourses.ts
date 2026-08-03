import { useQuery } from "@tanstack/react-query";
import { courseService } from "../course.service";

export const useCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getCourses,
    retry: false,
  });
