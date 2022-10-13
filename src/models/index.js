import dbConfig from "configs/db.config";
import Sequelize from "sequelize";

import { CategoryTopicModel } from "./CategoryTopic";
import { CourseModel } from "./Course";
import { EmotionReactModel } from "./EmotionReact";
import { HashtagModel } from "./Hashtag";
import { NotificationModel } from "./Notification";
import { OauthAccessTokenModel } from "./OauthAccessToken";
import { SectionModel } from "./Section";
import { SubscribeModel } from "./Subscribe";
import { UserModel } from "./User";
import { UserDetailModel } from "./UserDetail";
import { VideoModel } from "./Video";
import { VideoCommentModel } from "./VideoComment";
import { VideoHashtagModel } from "./VideoHashtag";
import { VideoViewModel } from "./VideoView";

const models = [
  CategoryTopicModel,
  CourseModel,
  EmotionReactModel,
  HashtagModel,
  NotificationModel,
  OauthAccessTokenModel,
  SectionModel,
  SubscribeModel,
  UserModel,
  UserDetailModel,
  VideoModel,
  VideoCommentModel,
  VideoHashtagModel,
  VideoViewModel,
];

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },

  logging: false,
});

const db = {};

models.forEach((model) => {
  const modelInstance = model(sequelize, Sequelize);
  db[modelInstance.name] = modelInstance;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
