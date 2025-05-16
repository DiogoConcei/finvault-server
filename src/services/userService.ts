import type { PrismaClient, User } from '@prisma/client';
import { userData } from '../types/user.interfaces';

export async function createUserService(
  prisma: PrismaClient,
  data: userData,
): Promise<User> {
  return await prisma.user.create({ data });
}

export async function findUser(prisma: PrismaClient, email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
