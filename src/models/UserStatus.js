/* eslint-disable import/prefer-default-export */
import { status } from 'constants';
import { Model } from 'sequelize';

export const UserStatusModel = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  UserStatus.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          status.WAITING_STATUS,
          status.ACCEPTED_STATUS,
          status.DENIED_STATUS
        ),
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
      modelName: 'UserStatus',
      tableName: 'UserStatuss',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return UserStatus;
};
