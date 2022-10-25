import { oAuthAccessTokenRepository } from 'repositories';
import { errors } from 'constants';

class OAuthAccessTokenService {
  constructor(repo) {
    this.repo = repo;
    this.createOauthAccessToken = this.createOauthAccessToken.bind(this);
    this.getOauthAccessTokenByRefreshToken =
      this.getOauthAccessTokenByRefreshToken.bind(this);
    this.deleteOauthAccessToken = this.deleteOauthAccessToken.bind(this);
  }

  async createOauthAccessToken(data) {
    const oAuth = this.repo.create(data);
    return oAuth;
  }

  async getOauthAccessTokenByRefreshToken(refreshToken) {
    const oAuth = this.repo.findOneByCondition({ refreshToken });
    return oAuth;
  }

  async deleteOauthAccessToken(idOAuth) {
    try {
      const isDeleted = await this.repo.delete(idOAuth);

      if (!isDeleted) {
        throw new Error();
      }

      return isDeleted;
    } catch (error) {
      throw new Error(errors.DELETE_OAUTH_ACCESS_TOKEN);
    }
  }
}

export default new OAuthAccessTokenService(oAuthAccessTokenRepository);
