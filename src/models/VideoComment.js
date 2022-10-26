/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const VideoCommentModel = (sequelize, DataTypes) => {
  class VideoComment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Video, { foreignKey: 'videoId', as: 'video' });
    }
  }

  VideoComment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      content: {
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
      modelName: 'VideoComment',
      tableName: 'JVideoComments',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return VideoComment;
};
