/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';
import { roles } from 'constants';

export const UserModel = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.UserDetail, { foreignKey: 'userId', as: 'user' });
      this.hasMany(models.OauthAccessToken, {
        foreignKey: 'userId',
        as: 'oauthAccessTokens',
      });
      this.hasMany(models.Notification, {
        foreignKey: 'userId',
        as: 'notifications',
      });
      this.hasMany(models.Course, {
        foreignKey: 'userId',
        as: 'courses',
      });
      this.hasMany(models.Subscribe, {
        foreignKey: 'userId',
        as: 'subscribes',
      });
      this.hasMany(models.Video, { foreignKey: 'userId', as: 'videos' });
      this.hasMany(models.EmotionReact, {
        foreignKey: 'userId',
        as: 'emotionReacts',
      });
      this.hasMany(models.VideoComment, {
        foreignKey: 'userId',
        as: 'videoComments',
      });
      this.hasMany(models.VideoView, {
        foreignKey: 'userId',
        as: 'videoViews',
      });
      this.hasMany(models.SectionView, {
        foreignKey: 'userId',
        as: 'sectionViews',
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
      },
      fullName: {
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
      verifyCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      verifyCodeSendAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM(
          roles.USER_ROLE,
          roles.AUTHOR_ROLE,
          roles.ADMIN_ROLE
        ),
        defaultValue: roles.USER_ROLE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return User;
};
