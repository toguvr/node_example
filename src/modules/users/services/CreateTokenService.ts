import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { addDays } from 'date-fns';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUserRefreshTokensRepository from '../repositories/IUserRefreshTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface ITokenReponse {
  token: string;
  refresh_token: string;
}

@injectable()
class CreateTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
  ) {}

  public async execute(user_id: string): Promise<ITokenReponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const {
      secret,
      expiresIn,
      secret_refresh,
      expiresIn_refresh_token,
      expires_refresh_token_days,
    } = auth.jwt;

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

    return { token, refresh_token };
  }
}
export default CreateTokenService;
