import type { PrismaClient, User } from '@prisma/client';
import { userData } from '../types/user.interfaces';

export async function createUserService(
  prisma: PrismaClient,
  data: userData,
): Promise<User> {
  return await prisma.user.create({ data });
}
