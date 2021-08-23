import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Augusto',
      email: 'augusto@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Augusto');
    expect(profile.email).toBe('augusto@gmail.com');
  });

  it('should not be able to show profile if non existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'no-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
