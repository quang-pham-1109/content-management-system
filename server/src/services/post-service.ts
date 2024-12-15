import { PrismaClient, type Post } from '@prisma/client';
// import { deleteListById } from './category-service';

const prisma = new PrismaClient();

export const createPost = async (
  title: string,
  userId: string,
  content?: string,
  slug?: string,
) => {
  // Generate slug if not provided
  const generatedSlug = slug || title.toLowerCase().replace(/ /g, '-');

  const insertPostSQL = `
      INSERT INTO "posts" ("title", "content", "authorId", "slug", "status", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

  const post = await prisma.$queryRawUnsafe<Post[]>(
    insertPostSQL,
    title, // $1
    content ?? '', // $2
    userId, // $3
    generatedSlug, // $4
    'draft', // $5 (default status)
    new Date(), // $6 (current timestamp)
    new Date(), // $7 (current timestamp)
  );

  return post[0];
};

// Sort by updatedAt in descending order
export const getAllPosts = async () => {
  const query = `
    SELECT * FROM "posts"
    ORDER BY "updatedAt" DESC;
  `;
  const posts = await prisma.$queryRawUnsafe<Post[]>(query);
  return posts;
};

export const getPostById = async (postId: number) => {
  const query = `
    SELECT * FROM "posts"
    WHERE "id" = ${postId};
  `;
  const post = await prisma.$queryRawUnsafe<Post[]>(query);
  return post[0];
};

export const getPostByCategoryId = async (categoryId: number) => {
  const query = `
    SELECT * FROM "posts"
    WHERE "categoryId" = $1;
  `;

  const posts = await prisma.$queryRawUnsafe<Post[]>(query, categoryId);

  return posts;
};

export const updatePostContentById = async (
  postId: number,
  content: string,
) => {
  const now = new Date();
  const query = `
    UPDATE "posts"
    SET "content" = $1, "updatedAt" = $2
    WHERE "id" = $3
    RETURNING *;
  `;
  const updatedPost = await prisma.$queryRawUnsafe<Post[]>(
    query,
    content,
    now,
    postId,
  );
  return updatedPost[0];
};
