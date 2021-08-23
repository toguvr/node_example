import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { addDays } from 'date-fns';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRefreshTokensRepository from '../repositories/IUserRefreshTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Nenhuma conta com este email cadastrada.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Email ou senha incorretos.', 401);
    }

    const {
      secret,
      expiresIn,
      expiresIn_refresh_token,
      expires_refresh_token_days,
      secret_refresh,
    } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const userRefreshToken = await this.userRefreshTokensRepository.findByUserId(
      user.id,
    );

    if (userRefreshToken) {
      await this.userRefreshTokensRepository.deleteById(userRefreshToken.id);
    }

    const refresh_token = sign({ email: user.email }, secret_refresh, {
      subject: user.id,
      expiresIn: expiresIn_refresh_token,
    });

    const expires_date = addDays(new Date(), expires_refresh_token_days);

    await this.userRefreshTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: user.id,
    });

    return { user, token, refresh_token };
  }
}

export default AuthenticateUserService;
