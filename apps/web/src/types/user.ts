export type AuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  totalCourses: number;
  completedCourses: number;
  createdAt: Date;
};
