import { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';

export default async function jwtPlugin(server: FastifyInstance) {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersegredo',
    sign: {
      expiresIn: '1h',
    },
  });

  server.decorate(
    'authenticate',
    async function (
      request: { jwtVerify: () => any },
      reply: { send: (arg0: unknown) => any },
    ) {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    },
  );
}
