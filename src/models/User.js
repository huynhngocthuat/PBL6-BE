import { Model } from "sequelize";
import * as CONSTANTS from "constants";

export const UserModel = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.UserDetail, { foreignKey: "userId", as: "user" });
      this.hasMany(models.OauthAccessToken, {
        foreignKey: "userId",
        as: "oauthAccessTokens",
      });
      this.hasMany(models.Notification, {
        foreignKey: "userId",
        as: "notifications",
      });
      this.hasMany(models.Course, {
        foreignKey: "userId",
        as: "courses",
      });
      this.hasMany(models.Subscribe, {
        foreignKey: "userId",
        as: "subscribes",
      });
      this.hasMany(models.Video, { foreignKey: "userId", as: "videos" });
      this.hasMany(models.EmotionReact, {
        foreignKey: "userId",
        as: "emotionReacts",
      });
      this.hasMany(models.VideoComment, {
        foreignKey: "userId",
        as: "videoComments",
      });
      this.hasMany(models.VideoView, {
        foreignKey: "userId",
        as: "videoViews",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
          notNull: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordSendAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM(
          CONSTANTS.USER_ROLE,
          CONSTANTS.AUTHOR_ROLE,
          CONSTANTS.ADMIN_ROLE
        ),
        defaultValue: CONSTANTS.USER_ROLE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return User;
};
