const { Cause } = require("../models");
const { checkMilestones } = require("../utils/checkMilestones");
const updateCommunityProgress = async (goal, checkinValue) => {
  try {
    const pointsEarned = checkinValue * goal.Cause.conversionRate;

    await Cause.increment("currentTotal", {
      by: pointsEarned,
      where: { id: goal.causeId },
    });

    // Check for milestone achievements
    checkMilestones(goal.causeId);
  } catch (error) {
    console.error("Error updating community progress:", error);
  }
};

module.exports = { updateCommunityProgress };