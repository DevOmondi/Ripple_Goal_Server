const { Cause, Milestone } = require("../models");
const checkMilestones = async (causeId) => {
  const cause = await Cause.findByPk(causeId);
  const milestones = await Milestone.findAll({
    where: {
      causeId,
      achievedAt: null,
    },
    order: [["targetValue", "ASC"]],
  });

  const nextMilestone = milestones[0];
  if (nextMilestone && cause.currentTotal >= nextMilestone.targetValue) {
    await nextMilestone.update({ achievedAt: new Date() });
    // TODO: Trigger event for any milestone
  }
};

module.exports = { checkMilestones };
