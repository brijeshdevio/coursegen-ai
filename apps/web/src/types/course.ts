export type CourseCardType = {
  id: string;
  title: string;
  topic: string;
  chaptersCount: number;
  completedChapters: number;
  createdAt: Date;
};

export type CourseType = {
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
