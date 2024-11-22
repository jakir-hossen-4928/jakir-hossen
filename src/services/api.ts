// Simple API service for handling data operations
import { User, Project, Blog } from '../types';

// Example function to fetch projects
export const fetchProjects = async (): Promise<Project[]> => {
  // This would normally call an API, but for now returns mock data
  return [
    {
      id: '1',
      title: 'Sample Project',
      description: 'This is a sample project',
      imageUrl: 'https://example.com/image.jpg'
    }
  ];
};

// Example function to fetch blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  // This would normally call an API, but for now returns mock data
  return [
    {
      id: '1',
      title: 'Sample Blog',
      content: 'This is a sample blog post',
      author: 'John Doe',
      date: '2024-02-20'
    }
  ];
};

// Example function to get user data
export const fetchUserData = async (userId: string): Promise<User> => {
  // This would normally call an API, but for now returns mock data
  return {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false
  };
};