export interface Comment {
  id: string;
  text: string;
  author: string;
  authorImage?: string;
  date: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage?: string;
  category: string;
  comments: Comment[];
  isLiked: boolean;
  likesCount: number;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  imageUrl: string;
}
