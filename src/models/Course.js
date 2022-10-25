/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const CourseModel = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.belongsTo(models.CategoryTopic, {
        foreignKey: 'categoryTopicId',
        as: 'categoryTopic',
      });
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(models.Section, { foreignKey: 'courseId', as: 'sections' });
      this.hasMany(models.Subscribe, {
        foreignKey: 'courseId',
        as: 'subscribes',
      });
      this.hasMany(models.CourseHashtag, {
        foreignKey: 'courseId',
        as: 'courseHashtags',
      });
    }
  }

  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbnailUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActived: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      modelName: 'Course',
      tableName: 'Courses',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return Course;
};
