import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { addDays } from 'date-fns';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUserRefreshTokensRepository from '../repositories/IUserRefreshTokensRepository';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenReponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
  ) {}

  public async execute(current_refresh_token: string): Promise<ITokenReponse> {
    const { sub, email } = verify(
      current_refresh_token,
      auth.jwt.secret_refresh,
    ) as IPayload;

    const user_id = sub;

    const userToken = await this.userRefreshTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      current_refresh_token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token não encontrado.');
    }

    await this.userRefreshTokensRepository.deleteById(userToken.id);

    const {
      secret,
      expiresIn,
      secret_refresh,
      expiresIn_refresh_token,
      expires_refresh_token_days,
    } = auth.jwt;

    const refresh_token = sign({ email }, secret_refresh, {
      subject: sub,
      expiresIn: expiresIn_refresh_token,
    });

    const expires_date = addDays(new Date(), expires_refresh_token_days);

    await this.userRefreshTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: sub,
    });

    const token = sign({}, secret, {
      subject: sub,
      expiresIn,
    });

    return { refresh_token, token };
  }
}
export default RefreshTokenService;
