import { Model } from "sequelize";

export const VideoModel = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      this.belongsTo(models.Section, {
        foreignKey: "sectionId",
        as: "section",
      });
      this.hasMany(models.EmotionReact, {
        foreignKey: "videoId",
        as: "emotionReacts",
      });
      this.hasMany(models.VideoComment, {
        foreignKey: "videoId",
        as: "videoComments",
      });
      this.hasMany(models.VideoView, {
        foreignKey: "videoId",
        as: "videoViews",
      });
      this.hasMany(models.VideoHashtag, {
        foreignKey: "videoId",
        as: "videoHashtags",
      });
    }
  }

  Video.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      thumnailUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isLock: {
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
      modelName: "Video",
      tableName: "Videos",
    }
  );

  return Video;
};
