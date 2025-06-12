const express = require("express");
const router = express.Router();

const { getAvailableCauses } = require("../controllers/causesController");

router.get("/", async (req, res) => {
  try {
    const causes = await getAvailableCauses();
    res.status(200).json({ success: true, causes: causes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
