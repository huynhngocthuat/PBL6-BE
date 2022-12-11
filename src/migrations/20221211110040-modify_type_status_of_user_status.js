import { status } from 'constants';

/* eslint-disable no-unused-vars */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('UserStatuss', 'status', {
      type: Sequelize.ENUM(
        status.WAITING_STATUS,
        status.ACTIVATED_STATUS,
        status.DENIED_STATUS
      ),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('UserStatuss', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
