import type { Pagination } from "@/types";

export type CourseListItem = {
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

export type GetCourses = {
  items: CourseListItem[];
  pagination: Pagination;
};

export type CourseDetails = {
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

export type CourseTopic = {
  id: string;
  title: string;
  order: number;
  content: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ToggleTopicCompletion = { id: string; isCompleted: boolean };

export type GenerateCourse = {
  title: string;
  description?: string;
  topic: string;
  level?: string;
  modules: {
    title: string;
    order: number;
    topics: {
      title: string;
      order: number;
    }[];
  }[];
  resources: {
    title: string;
    url: string;
    type: string;
  }[];
};

export type SaveCourse = {
  id: string;
  title: string;
  topic: string;
  level: string;
  createdAt: Date;
};

export type CourseStats = {
  totalCourses: number;
  totalModules: number;
  totalTopics: number;
  completedTopics: number;
  completionRate: number;
};
