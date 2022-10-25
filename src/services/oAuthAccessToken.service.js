import { oAuthAccessTokenRepository } from 'repositories';

class OAuthAccessTokenService {
  constructor(repo) {
    this.repo = repo;
    this.createOauthAccessToken = this.createOauthAccessToken.bind(this);
    this.getOauthAccessTokenByRefreshToken =
      this.getOauthAccessTokenByRefreshToken.bind(this);
  }

  async createOauthAccessToken(data) {
    const oAuth = this.repo.create(data);
    return oAuth;
  }

  async getOauthAccessTokenByRefreshToken(refreshToken) {
    const oAuth = this.repo.findOneByCondition({ refreshToken });
    return oAuth;
  }
}

export default new OAuthAccessTokenService(oAuthAccessTokenRepository);
