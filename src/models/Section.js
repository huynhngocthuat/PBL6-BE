/* eslint-disable import/prefer-default-export */
const { Model } = require('sequelize');

export const SectionModel = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate(models) {
      this.hasMany(models.Video, { foreignKey: 'sectionId', as: 'videos' });
      this.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
      this.hasMany(models.SectionView, {
        foreignKey: 'sectionId',
        as: 'sectionViews',
      });
    }
  }

  Section.init(
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
      modelName: 'Section',
      tableName: 'Sections',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );

  return Section;
};
