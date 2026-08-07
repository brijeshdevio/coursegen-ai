import { apiClient } from "@/lib/apiClient";
import type { ListParams } from "@/types";

import type {
  CourseDetails,
  CourseStats,
  CourseTopic,
  GenerateCourse as GenerateCourseRes,
  GetCourses,
  SaveCourse as SaveCourseRes,
  ToggleTopicCompletion,
} from "./course.types";

import type { GenerateCourse } from "./schema/generateCourse.schema";
import type { SaveCourse } from "./schema/saveCourse.schema";

export const courseService = {
  generateCourse: (data: GenerateCourse): Promise<GenerateCourseRes> =>
    apiClient.post("/courses/generate", data).then((r) => r.data.data),
  saveCourse: (data: SaveCourse): Promise<SaveCourseRes> =>
    apiClient.post("/courses/save", data).then((r) => r.data.data),
  getCourseStats: (): Promise<CourseStats> =>
    apiClient.get("/courses/stats").then((r) => r.data.data),
  getCourses: (params?: ListParams & { level?: string }): Promise<GetCourses> =>
    apiClient.get("/courses", { params }).then((r) => r.data.data),
  getCourse: (id: string): Promise<CourseDetails> =>
    apiClient.get(`/courses/${id}`).then((r) => r.data.data),
  getCourseTopic: (id: string, topicId: string): Promise<CourseTopic> =>
    apiClient.get(`/courses/${id}/topics/${topicId}`).then((r) => r.data.data),
  updateTopicCompletion: (
    courseId: string,
    topicId: string
  ): Promise<ToggleTopicCompletion> =>
    apiClient
      .patch(`/courses/${courseId}/topics/${topicId}/completion`)
      .then((r) => r.data.data),
  deleteCourse: (id: string): Promise<{ message: string }> =>
    apiClient.delete(`/courses/${id}`).then((r) => r.data),
};
