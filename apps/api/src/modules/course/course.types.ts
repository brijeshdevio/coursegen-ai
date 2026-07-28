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

export type GetCourseResponse = {
  id: string;
  title: string;
  description: string;
  topic: string;
  createdAt: Date;
  chapters: {
    id: string;
    title: string;
    order: number;
    points: string[];
    completed: boolean;
  }[];
  resources: {
    id: string;
    title: string;
    url: string;
    type: string;
  }[];
};

export type UpdateChapterResponse = {
  id: string;
  completed: boolean;
  courseProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
};
