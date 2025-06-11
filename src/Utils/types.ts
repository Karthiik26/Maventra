export interface Post {
  _id?: string;
  title: string;
  subTitle: string;
  content: string;
  tag: string[];
  author?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
}
