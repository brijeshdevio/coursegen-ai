export type SignupResponse = {
  id: string;
  name: string | null;
  email: string;
};

export type LoginResponse = {
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  accessToken: string;
};
