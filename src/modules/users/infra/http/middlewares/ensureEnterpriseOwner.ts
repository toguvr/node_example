import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  enterprise: string;
}

export default function ensureEnterpriseOwner(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { enterprise } = decoded as ITokenPayload;

    request.enterprise = {
      id: enterprise,
    };
    return next();
  } catch (err) {
    throw new AppError('Token expirou, refaça o login.', 401);
  }
}
