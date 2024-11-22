// Common types used across the application
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}