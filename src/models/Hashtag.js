/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const HashtagModel = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      this.hasMany(models.CourseHashtag, {
        foreignKey: 'hashtagId',
        as: 'courseHashtags',
      });
    }
  }

  Hashtag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
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
      modelName: 'Hashtag',
      tableName: 'Hashtags',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return Hashtag;
};
