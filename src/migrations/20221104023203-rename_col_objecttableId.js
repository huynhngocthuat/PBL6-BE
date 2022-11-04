/* eslint-disable no-unused-vars */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'JNotifications',
      'objecttableId',
      'objectableId'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'JNotifications',
      'objectableId',
      'objecttableId'
    );
  },
};
