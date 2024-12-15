export interface CreatePostResponse {
  message: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllPostsResponse {
  posts: Post[];
}
