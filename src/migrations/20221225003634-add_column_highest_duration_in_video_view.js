export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('VideoViews', 'highestDuration', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('VideoViews', 'highestDuration', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
    });
  },
};
