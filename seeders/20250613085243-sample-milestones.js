"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First get all existing causes
    const causes = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Causes"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!causes || causes.length === 0) {
      console.log("No causes found - skipping milestone seeding");
      return;
    }

    // Milestone templates for different cause types
    const milestoneTemplates = {
      "Environmental Action": [
        { targetValue: 1000, action: "Plant 100 trees in urban areas" },
        { targetValue: 5000, action: "Fund a community garden project" },
        {
          targetValue: 100000,
          action: "Sponsor a forest restoration initiative",
        },
      ],
      "Education Equity": [
        { targetValue: 500, action: "Donate school supplies to 50 students" },
        {
          targetValue: 1500,
          action: "Fund a scholarship for underprivileged students",
        },
        {
          targetValue: 30000,
          action: "Renovate a classroom in a rural school",
        },
      ],
      "Mental Health": [
        {
          targetValue: 200,
          action: "Fund 10 therapy sessions for those in need",
        },
        {
          targetValue: 1000,
          action: "Organize a mental health awareness workshop",
        },
        {
          targetValue: 25000,
          action: "Sponsor a counseling center for a month",
        },
      ],
      "Community Support": [
        {
          targetValue: 500,
          action: "Provide meals for 100 homeless individuals",
        },
        { targetValue: 1500, action: "Fund a community center renovation" },
        {
          targetValue: 30000,
          action: "Support a job training program for 20 people",
        },
      ],
      // Default template if cause name doesn't match
      default: [
        { targetValue: 1000, action: "Reach first community milestone" },
        { targetValue: 5000, action: "Make significant community impact" },
        { targetValue: 10000, action: "Achieve major collective goal" },
      ],
    };

    // Prepare milestones for all causes
    const milestones = [];
    const now = new Date();

    causes.forEach((cause) => {
      const template =
        milestoneTemplates[cause.name] || milestoneTemplates["default"];

      template.forEach((milestone, index) => {
        milestones.push({
          causeId: cause.id,
          targetValue: milestone.targetValue,
          action: milestone.action,
          achievedAt: null, // None achieved yet
          createdAt: now,
          updatedAt: now,
          // Space out the target values for demo purposes
          targetValue: milestone.targetValue * (index + 1),
        });
      });
    });

    // Bulk insert milestones
    if (milestones.length > 0) {
      await queryInterface.bulkInsert("Milestones", milestones);
      console.log(
        `Inserted ${milestones.length} milestones for ${causes.length} causes`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Milestones", null, {});
    console.log("Deleted all milestones");
  },
};
