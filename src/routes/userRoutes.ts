import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/userController';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/create-user', userController.createUser);
}
