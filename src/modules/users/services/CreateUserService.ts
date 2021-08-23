import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/MailProviders';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { addDays } from 'date-fns';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUserRefreshTokensRepository from '../repositories/IUserRefreshTokensRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cellphone: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    cellphone,
  }: IRequest): Promise<IResponse> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email já em uso.');
    }

    const checkCellphoneExist = await this.usersRepository.findByCellphone(
      cellphone,
    );

    if (checkCellphoneExist) {
      throw new AppError('Celular já em uso.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cellphone,
    });

    const {
      secret,
      expiresIn,
      expiresIn_refresh_token,
      expires_refresh_token_days,
      secret_refresh,
    } = authConfig.jwt;

    const tokenJwt = sign({}, secret, {
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

    return { user, token: tokenJwt, refresh_token };
  }
}

export default CreateUserService;
