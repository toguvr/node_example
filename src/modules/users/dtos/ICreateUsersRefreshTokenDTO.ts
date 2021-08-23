export default interface ICreateUsersRefreshTokenDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}
