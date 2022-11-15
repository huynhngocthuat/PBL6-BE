/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const CourseHashtagModel = (sequelize, DataTypes) => {
  class CourseHashtag extends Model {
    static associate(models) {
      this.belongsTo(models.Hashtag, {
        foreignKey: 'hashtagId',
        as: 'hashtag',
      });
      this.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
    }
  }

  CourseHashtag.init(
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
      modelName: 'CourseHashtag',
      tableName: 'CourseHashtags',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return CourseHashtag;
};
