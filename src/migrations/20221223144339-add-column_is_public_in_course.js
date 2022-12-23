export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Courses', 'isPublic', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courses', 'isPublic', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
