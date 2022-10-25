/* eslint-disable import/prefer-default-export */
const { Model } = require('sequelize');

export const SectionViewModel = (sequelize, DataTypes) => {
  class SectionView extends Model {
    static associate(models) {
      this.belongsTo(models.Section, {
        foreignKey: 'sectionId',
        as: 'section',
      });
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  SectionView.init(
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
      modelName: 'SectionView',
      tableName: 'SectionViews',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return SectionView;
};
