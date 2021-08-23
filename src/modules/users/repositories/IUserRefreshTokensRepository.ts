import ICreateUsersRefreshTokenDTO from '../dtos/ICreateUsersRefreshTokenDTO';
import RefreshToken from '../infra/typeorm/entities/RefreshToken';

export default interface IUserRefreshTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersRefreshTokenDTO): Promise<RefreshToken>;

  findByUserId(user_id: string): Promise<RefreshToken | undefined>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<RefreshToken | undefined>;

  deleteById(id: string): Promise<void>;
}
