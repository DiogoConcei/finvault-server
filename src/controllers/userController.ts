import { FastifyRequest, FastifyReply } from 'fastify';
import { userData, userLogin } from '../types/user.interfaces';
import bcrypt from 'bcrypt';
import { createUserService, findUser } from '../services/userService';

export const createUser = async (
  request: FastifyRequest<{ Body: userData }>,
  reply: FastifyReply,
) => {
  const payload = request.body;

  const saltRounds = 10;

  const existing = await findUser(request.server.prisma, payload.email);

  if (existing) {
    return reply.code(409).send({ error: 'Email já cadastrado!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const newUser = await createUserService(request.server.prisma, {
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
    });

    const token = await reply.jwtSign({
      sub: String(newUser.id),
      email: newUser.email,
    });

    return reply.code(201).send({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: 'Erro ao criar usuário' });
  }
};

export const loginUser = async (
  request: FastifyRequest<{ Body: userLogin }>,
  reply: FastifyReply,
) => {
  const payload = request.body;
  const { email, password } = payload;

  try {
    const user = await findUser(request.server.prisma, email);

    if (!user) {
      return reply.code(401).send({ error: 'Credenciais inválidas' });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return reply.code(401).send({ error: 'Credenciais inválidas' });
    }

    return reply.code(200).send({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    request.log.error(e);
    return reply.code(500).send({ error: 'Erro interno ao realizar login' });
  }
};
