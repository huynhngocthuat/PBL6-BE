import { oAuthAccessTokenRepository } from 'repositories';

class OAuthAccessTokenService {
  constructor(repo) {
    this.repo = repo;
  }

  async createOauthAccessToken(data) {
    const oAuth = this.repo.create(data);
    return oAuth;
  }

  async getOauthAccessTokenById(idOAuth) {
    const oAuth = await this.repo.find(idOAuth);
    return oAuth;
  }

  async getOauthAccessTokenByRefreshToken(refreshToken) {
    const oAuth = await this.repo.findOneByCondition({ refreshToken });
    return oAuth;
  }

  async deleteOauthAccessToken(idOAuth) {
    const isDeleted = await this.repo.delete(idOAuth);

    if (!isDeleted) {
      throw new Error();
    }

    return isDeleted;
  }
}

export default new OAuthAccessTokenService(oAuthAccessTokenRepository);
