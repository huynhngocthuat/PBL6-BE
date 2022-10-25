import db from 'models';
import BaseRepository from 'commons/base.repository';

const { OauthAccessToken } = db;

export class OAuthAccessTokenRepository extends BaseRepository {
  constructor() {
    super(OauthAccessToken);
  }
}

export default new OAuthAccessTokenRepository();
