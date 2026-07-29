export type GetProfileResponse = {
  id: string;
  name: string;
  email: string;
  totalCourses: number;
  completedCourses: number;
  createdAt: Date;
};

export type UpdateProfileResponse = {
  id: string;
  name: string;
  email: string;
};
