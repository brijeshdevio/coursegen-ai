export type RegisterUserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type LoginUserResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
