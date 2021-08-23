import UserExpertise from '../infra/typeorm/entities/UserExpertise';
import ICreateUserExpertiseDTO from '../dtos/ICreateUserExpertiseDTO';

export default interface IUserExpertiseRepository {
  create(data: ICreateUserExpertiseDTO): Promise<UserExpertise>;
  findById(id: string): Promise<UserExpertise | undefined>;
  findByExpertiseIdAndUserId(
    expertise_id: string,
    user_id: string,
  ): Promise<UserExpertise | undefined>;
  findAll(): Promise<UserExpertise[]>;
  save(plan: UserExpertise): Promise<UserExpertise>;
  delete(plan: UserExpertise): Promise<UserExpertise>;
}
