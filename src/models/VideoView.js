/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const VideoViewModel = (sequelize, DataTypes) => {
  class VideoView extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Video, { foreignKey: 'videoId', as: 'video' });
    }
  }

  VideoView.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      countView: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lastDuration: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      lastestViewDate: {
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
      modelName: 'VideoView',
      tableName: 'VideoViews',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return VideoView;
};
