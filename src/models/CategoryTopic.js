/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const CategoryTopicModel = (sequelize, DataTypes) => {
  class CategoryTopic extends Model {
    static associate(models) {
      this.hasMany(models.Course, {
        foreignKey: 'categoryTopicId',
        as: 'courses',
      });
    }
  }

  CategoryTopic.init(
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
      modelName: 'CategoryTopic',
      tableName: 'CategoryTopics',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return CategoryTopic;
};
