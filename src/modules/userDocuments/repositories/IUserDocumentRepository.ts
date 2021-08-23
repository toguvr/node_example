import UserDocument from '../infra/typeorm/entities/UserDocument';
import ICreateRewardDTO from '../dtos/ICreateUserDocumentDTO';

export default interface IUserDocumentRepository {
  create(data: ICreateRewardDTO): Promise<UserDocument>;
  findById(id: string): Promise<UserDocument | undefined>;
  findByType(type: string): Promise<UserDocument | undefined>;
  findAllByUserId(user_id: string): Promise<UserDocument[]>;
  save(plan: UserDocument): Promise<UserDocument>;
  delete(plan: UserDocument): Promise<UserDocument>;
}
