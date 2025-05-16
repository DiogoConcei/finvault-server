import '@fastify/jwt';
import { PrismaClient } from '@prisma/client';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; email: string }; // o que vai no token
    user: { sub: string; email: string }; // o que é recuperado de volta
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
