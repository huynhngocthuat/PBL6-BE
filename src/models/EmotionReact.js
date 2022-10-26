/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const EmotionReactModel = (sequelize, DataTypes) => {
  class EmotionReact extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Video, { foreignKey: 'videoId', as: 'video' });
    }
  }

  EmotionReact.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      isLike: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: 'EmotionReact',
      tableName: 'JEmotionReacts',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return EmotionReact;
};
