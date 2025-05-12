import Fastify from 'fastify';
import userRoutes from './routes/userRoutes';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});

fastify.register(userRoutes, { prefix: '/users' });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Server listening at ${address}`);
});
