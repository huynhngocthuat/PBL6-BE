/* eslint-disable import/prefer-default-export */
import { Model } from 'sequelize';

export const SubscribeModel = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Subscribe.init(
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
      modelName: 'Subscribe',
      tableName: 'JSubscribes',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return Subscribe;
};
