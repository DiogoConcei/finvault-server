import Fastify from 'fastify';
import cors from '@fastify/cors';
import prismaPlugin from './plugins/prisma';
import userRoutes from './routes/userRoutes';
import jwtPlugin from './plugins/jwt';

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);
fastify.register(jwtPlugin);

// Configuração padrão
fastify.register(cors, {
  origin: 'http://localhost:5173', // ou seu domínio de frontend
  credentials: true, // se precisar enviar cookies/autenticação
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(userRoutes, { prefix: '/users' });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Server listening at ${address}`);
});
