const { Goal, Checkin, Cause, Milestone } = require("../models");
const { calculateProgress } = require("../utils/calculateProgress");

const createNewGoal = async (goalData) => {
  const newGoal = await Goal.create(goalData);
  return newGoal;
};

const getUserGoals = async (userId) => {
  try {
    const goals = await Goal.findAll({
      where: { userId },
      include: [
        {
          model: Checkin,
          as: "Checkins",
          order: [["checkinDate", "DESC"]],
          limit: 5,
        },
        {
          model: Cause,
          as: "Cause",
          attributes: ["id", "name", "emoji", "conversionRate", "currentTotal"],
          include: [
            {
              model: Milestone,
              as: "Milestones",
              attributes: ["id", "targetValue", "action"],
              order: [["targetValue", "ASC"]],
              where: {},
              limit: 10,
              required: false,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,
      data: goals.map((goal) => ({
        ...goal.get({ plain: true }),
        progress: calculateProgress(goal),
        // Add next milestone info to each goal
        nextMilestone: goal.Cause?.Milestones?.[0] || null,
      })),
    };
  } catch (error) {
    console.error("Error fetching goals:", error);
    return {
      success: false,
      error: "Failed to fetch goals",
    };
  }
};

module.exports = { createNewGoal, getUserGoals };
