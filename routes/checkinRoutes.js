const express = require("express");
const router = express.Router();

const { createCheckin } = require("../controllers/checkinController");
const { decodeId } = require("../utils/hashids");

router.post("/create-checkin", async (req, res) => {
  const { goalId, value, notes, userId } = req.body;

  // validation
  if (!goalId || value == null || !userId) {
    return res.status(400).json({
      success: false,
      error: "goalId, value, and userId are required",
    });
  }
  
  const decodedUserId = decodeId(userId);
  const response = await createCheckin(goalId, value, notes, decodedUserId);

  if (response.success) {
    return res.status(response.status).json({
      success: true,
      message: "Checkin created successfully",
      data: response.data,
    });
  } else {
    return res.status(response.status).json({
      success: false,
      error: response.error,
    });
  }
});

module.exports = router;
