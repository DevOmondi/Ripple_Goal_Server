"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Causes",
      [
        {
          emoji: "🌱",
          name: "Environmental Action",
          description:
            "Protecting our planet for future generations through sustainable practices, conservation efforts, and climate advocacy. Every small action contributes to a greener, healthier Earth.",
          conversionRate: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          emoji: "📚",
          name: "Education Equity",
          description:
            "Breaking barriers to learning by ensuring all individuals—regardless of background—have access to quality education, resources, and opportunities to thrive.",
          conversionRate: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          emoji: "🧠",
          name: "Mental Health",
          description:
            "Promoting emotional well-being, reducing stigma, and expanding access to mental health resources so everyone can lead a fulfilling, supported life.",
          conversionRate: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          emoji: "🤝",
          name: "Community Support",
          description:
            "Strengthening communities by fostering solidarity, uplifting vulnerable groups, and creating networks of care and mutual aid.",
          conversionRate: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Causes", null, {});
  },
};
