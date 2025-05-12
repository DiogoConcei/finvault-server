import { FastifyRequest, FastifyReply } from 'fastify';
import { userData } from '../types/user.interfaces';
import bcrypt from 'bcrypt';
import { createUserService } from '../services/userService';

export const createUser = async (
  request: FastifyRequest<{ Body: userData }>,
  reply: FastifyReply,
) => {
  const payload = request.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const newUser = await createUserService(request.server.prisma, {
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
    });

    return reply.code(201).send(newUser);
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: 'Erro ao criar usuário' });
  }
};
