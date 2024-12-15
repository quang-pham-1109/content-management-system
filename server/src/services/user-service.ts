import { PrismaClient, type User } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  const query = `
    SELECT * FROM "users" 
    WHERE "email" = '${email}';
  `;

  const users = await prisma.$queryRawUnsafe<User[]>(query);
  return users[0];
};

export const findUserById = async (id: number) => {
  const query = `
    SELECT * FROM "users" 
    WHERE "id" = ${id};
  `;

  const user = await prisma.$queryRawUnsafe<User[]>(query);
  return user[0];
};

export const createUser = async (email: string, password: string) => {
  const query: string = `
    INSERT INTO "users" ("email", "password") 
    VALUES ('${email}', '${password}');
  `;

  const newUser = await prisma.$executeRawUnsafe<User[]>(query);
  return newUser;
};
