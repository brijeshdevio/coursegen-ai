import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { courseService } from "../course.service";

export const useCourse = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => courseService.getCourse(id!),
    retry: false,
  });
};
