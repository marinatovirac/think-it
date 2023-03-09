type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

type Posts = {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
};
