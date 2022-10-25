/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';
import { notiTypes } from 'constants';

export const NotificationModel = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          notiTypes.PAY_FOR_COURSE,
          notiTypes.PAY_FOR_USER,
          notiTypes.LIKE_VIDEO,
          notiTypes.COMMENT_VIDEO,
          notiTypes.RATING_VIDEO,
          notiTypes.USER_SUBSCRIBE_COURSE,
          notiTypes.USER_REQUEST_ACTIVE,
          notiTypes.ADMIN_ACTIVE_USER,
          notiTypes.ADMIN_DEACTIVATE_USER,
          notiTypes.ADMIN_ACTIVE_COURSE,
          notiTypes.ADMIN_DEACTIVATE_COURSE
        ),
        defaultValue: notiTypes.SYSTEM_NOTI,
        allowNull: false,
      },
      objecttableId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'JNotifications',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return Notification;
};
