const express = require("express");
const router = express.Router();

const {
  createNewGoal,
  getUserGoals,
} = require("../controllers/goalsController");
const { decodeId } = require("../utils/hashids");

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    // const decodedUserId = decodeId(userId);
    const userGoals = await getUserGoals(userId);

    if (!userGoals.success) {
      return res.status(500).json({ success: false, error: userGoals.error });
    }

    return res.status(200).json(userGoals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/create-goal", async (req, res) => {
  try {
    const { userId, title, targetFrequency, frequencyUnit, causeId } = req.body;
    const decodedUserId = decodeId(userId);
    const goalData = {
      userId: decodedUserId,
      title,
      targetFrequency,
      frequencyUnit,
      causeId,
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    const newGoal = await createNewGoal(goalData);
    res.status(201).json({ success: true, goal_created: newGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
