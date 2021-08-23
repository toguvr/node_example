export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',

    secret_refresh: process.env.APP_SECRET_REFRESH || 'default',
    expiresIn_refresh_token: '30d',
    expires_refresh_token_days: 30,
  },
};
