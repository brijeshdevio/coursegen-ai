export type SaveCourseResponse = {
  id: string;
  title: string;
  description: string | null;
  topic: string;
  level: string | null;
  createdAt: Date;
};

export type CourseListItemResponse = {
  id: string;
  title: string;
  description: string | null;
  topic: string;
  level: string | null;
  totalModules: number;
  totalTopics: number;
  totalCompletedTopics: number;
  createdAt: Date;
};

export type GetCoursesResponse = {
  items: CourseListItemResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CourseDetailsResponse = {
  id: string;
  title: string;
  description: string | null;
  topic: string;
  level: string | null;
  createdAt: Date;
  updatedAt: Date;
  modules: {
    id: string;
    title: string;
    order: number;
    topics: {
      id: string;
      title: string;
      order: number;
      isCompleted: boolean;
    }[];
  }[];
  resources: {
    id: string;
    title: string;
    url: string;
    type: string;
  }[];
};

export type CourseTopicResponse = {
  id: string;
  title: string;
  order: number;
  content: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ToggleTopicCompletionResponse = {
  id: string;
  isCompleted: boolean;
};

export type CourseStatsResponse = {
  totalCourses: number;
  totalModules: number;
  totalTopics: number;
  completedTopics: number;
  completionRate: number;
};
