/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const OauthAccessTokenModel = (sequelize, DataTypes) => {
  class OauthAccessToken extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  OauthAccessToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      refreshToken: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      revokeAt: {
        type: DataTypes.DATE,
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
      modelName: 'OauthAccessToken',
      tableName: 'OauthAccessTokens',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return OauthAccessToken;
};
