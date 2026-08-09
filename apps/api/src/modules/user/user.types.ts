export type GetProfileResponse = {
  id: string;
  name: string | null;
  email: string;
  totalCourses: number;
  completedCourses: number;
  createdAt: Date;
};

export type UpdateProfileResponse = {
  id: string;
  name: string | null;
  email: string;
};
