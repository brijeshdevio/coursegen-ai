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

export type GetCoursesQuery = {
  page?: number;
  limit?: number;
  search?: string;
  level?: string;
};
