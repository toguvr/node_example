import { Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async findByUserId(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { user_id },
    });

    return userToken;
  }

  public async findByCode(code: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { code },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const userToken = this.ormRepository.create({
      user_id,
      code,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
