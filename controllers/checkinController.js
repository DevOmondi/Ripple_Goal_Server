const { Goal, Checkin, Cause } = require("../models");
const { updateCommunityProgress } = require("../utils/updateCommunityProgress");
const { calculateProgress } = require("../utils/calculateProgress");

const createCheckin = async (goalId, value, notes, userId) => {
  try {
    // Check if goal exists and belongs to user
    const goal = await Goal.findOne({
      where: { id: goalId, userId },
      include: [
        {
          model: Cause,
          as: "Cause",
        },
      ],
    });

    if (!goal) {
      return {
        success: false,
        status: 404,
        error: "Goal not found or unauthorized",
      };
    }

    // Create the checkin
    const checkin = await Checkin.create({
      goalId,
      value,
      notes,
      checkinDate: new Date(),
    });
    
    // Reload goal to update checkins
    await goal.reload({
      include: [{ model: Checkin, as: "Checkins" }],
    });

    // Update community progress
    updateCommunityProgress(goal, value);

    return {
      success: true,
      status: 201,
      data: {
        checkin,
        goalProgress: calculateProgress(goal),
      },
    };
  } catch (error) {
    console.error("Error creating checkin:", error);
    let errorMsg = "Failed to record checkin";
    if (error.name === "SequelizeEagerLoadingError") {
      errorMsg = "Configuration error in data relationships";
    }
    return {
      success: false,
      status: 500,
      error: "Failed to record checkin",
    };
  }
};

module.exports = { createCheckin };
