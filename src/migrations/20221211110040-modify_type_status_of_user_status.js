import { status } from 'constants';

/* eslint-disable no-unused-vars */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('UserStatuss', 'status', {
      type: Sequelize.ENUM(
        status.WAITING_STATUS,
        status.ACCEPTED_STATUS,
        status.DENIED_STATUS
      ),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('UserStatuss', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
