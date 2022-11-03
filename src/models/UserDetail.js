/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const UserDetailModel = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  UserDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      payment: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      identityImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: 'UserDetail',
      tableName: 'UserDetails',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return UserDetail;
};
