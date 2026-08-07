import { useGenerateCourseFacade } from "@/features/course/hooks/useGenerateCourse";

export default function CourseGenerate() {
  const { handleSubmit, submit, register, errors, isPending, data } =
    useGenerateCourseFacade();

  // <form onSubmit={handleSubmit(submit)}>
  // @/features/course/course.types.ts
  return <>CourseGenerate Page</>;
}
