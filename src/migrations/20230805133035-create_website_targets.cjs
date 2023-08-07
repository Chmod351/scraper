'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Keyword
    await queryInterface.createTable('Keywords', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      keyword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      usedTimes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create ResultKeyword
    await queryInterface.createTable('ResultKeywords', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      scrapedTimes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      relatedResults: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create Results
    await queryInterface.createTable('Results', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create  WebsiteTarget
    await queryInterface.createTable('WebsiteTargets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cssClass: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      scrapedTimes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });

    // Create ResultKeywordKeyword n2n
    await queryInterface.createTable('ResultKeywordKeyword', {
      resultKeywordId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ResultKeywords',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      keywordId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Keywords',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    // Crea  ResultResultKeyword n2n
    await queryInterface.createTable('ResultResultKeyword', {
      resultId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Results',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      resultKeywordId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ResultKeywords',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ResultResultKeyword');
    await queryInterface.dropTable('ResultKeywordKeyword');
    await queryInterface.dropTable('Results');
    await queryInterface.dropTable('ResultKeywords');
    await queryInterface.dropTable('Keywords');
    await queryInterface.dropTable('WebsiteTargets');
  },
};
