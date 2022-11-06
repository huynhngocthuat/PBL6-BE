/* eslint-disable no-unused-vars */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Videos', 'thumnailUrl', 'thumbnailUrl');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Videos', 'thumbnailUrl', 'thumnailUrl');
  },
};
