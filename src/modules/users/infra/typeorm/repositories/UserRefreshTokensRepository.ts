import { Repository, getRepository } from 'typeorm';

import IUserRefreshTokensRepository from '@modules/users/repositories/IUserRefreshTokensRepository';
import ICreateUsersRefreshTokenDTO from '@modules/users/dtos/ICreateUsersRefreshTokenDTO';
import RefreshToken from '../entities/RefreshToken';

class UserRefreshTokensRepository implements IUserRefreshTokensRepository {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersRefreshTokenDTO): Promise<RefreshToken> {
    const userRefreshToken = this.ormRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.ormRepository.save(userRefreshToken);

    return userRefreshToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<RefreshToken | undefined> {
    const refreshsTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return refreshsTokens;
  }

  async findByUserId(user_id: string): Promise<RefreshToken | undefined> {
    const refreshsTokens = await this.ormRepository.findOne({
      user_id,
    });

    return refreshsTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserRefreshTokensRepository;
