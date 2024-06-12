'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('category',[
      {
        name:'nodejs'
      },
      {
        name:'vuejs'
      },
      {
        name:'reactjs'
      },
      {
        name:'reactnative'
      },
      {
        name:'laravel'
      },
      {
        name:'flutter'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('categories', {}, null);
  }
};
