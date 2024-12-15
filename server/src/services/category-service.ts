import { PrismaClient, type Post } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (name: string, description?: string) => {
  const insertCategorySQL = `
      INSERT INTO "categories" ("name", "description", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

  const now = new Date(); // Current timestamp for createdAt and updatedAt

  const newCategory = await prisma.$queryRawUnsafe(
    insertCategorySQL,
    name,
    description,
    now,
    now,
  );

  return newCategory;
};

export const getAllCategory = async () => {
  const query = `
    SELECT * FROM "categories";
  `;

  const categories = await prisma.$queryRawUnsafe<Post>(query);
  return categories;
};
