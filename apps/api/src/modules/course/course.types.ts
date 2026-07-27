export type CreateCourseResponse = {
  id: string;
  title: string;
  topic: string;
  createdAt: Date;
};

export type CourseItemResponse = {
  id: string;
  title: string;
  topic: string;
  chaptersCount: number;
  completedChapters: number;
  createdAt: Date;
};

export type GetCoursesResponse = {
  items: CourseItemResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
