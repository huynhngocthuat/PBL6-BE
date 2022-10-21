import { Model } from "sequelize";

export const VideoHashtagModel = (sequelize, DataTypes) => {
  class VideoHashtag extends Model {
    static associate(models) {
      this.belongsTo(models.Hashtag, {
        foreignKey: "hashtagId",
        as: "hashtag",
      });
      this.belongsTo(models.Video, { foreignKey: "videoId", as: "video" });
    }
  }

  VideoHashtag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      modelName: "VideoHashtag",
      tableName: "VideoHashtags",
      timestamps: true,
      underscored: true,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return VideoHashtag;
};
