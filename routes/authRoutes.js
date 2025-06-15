const express = require("express");
const router = express.Router();
const { encodeId } = require("../utils/hashids");

const { sendWelcomeEmail } = require("../controllers/authController");
const { createUser, loginUser } = require("../controllers/authController");

router.post("/send-welcome-email", async (req, res) => {
  // console.log("Received request to send welcome email");
  const { email, userDisplayName } = req.body;

  if (!email || !userDisplayName) {
    return res
      .status(400)
      .json({ error: "Email and user display name are required" });
  }

  try {
    const result = await sendWelcomeEmail(email, userDisplayName);
    return res
      .status(200)
      .json({ message: "Welcome email sent successfully", result: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/create-user", async (req, res) => {
  // console.log("Received request to create user");
  const { name, email } = req.body;
  try {
    const user = await createUser(name, email);
    const user_id = encodeId(user.id);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user_id: user_id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login-user", async (req, res) => {
  // console.log("Received request to login user");
  const { email } = req.body;
  try {
    const user = await loginUser(email);
    const user_id = encodeId(user.id);
    return res
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        user_id: user_id,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
