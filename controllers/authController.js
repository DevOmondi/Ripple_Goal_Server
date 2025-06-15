const { User } = require("../models");
const { sendEmail } = require("../services/mailing");

const sendWelcomeEmail = async (email, userDisplayName) => {
  const subject = "Welcome to Ripple Goal!";
  const html = `
        <h1>Welcome to Ripple Goal, ${userDisplayName}!</h1>
        <p>Thank you for joining us. We are excited to have you on board.</p>
        <p>Best regards,<br/>The Ripple Goal Team</p>
    `;
  const text = `Welcome to Ripple Goal, ${userDisplayName}!\n\nThank you for joining us. We are excited to have you on board.\n\nBest regards,\nThe Ripple Goal Team`;

  try {
    await sendEmail({ to: email, subject, html, text });
    // console.log(`Welcome email sent to ${email}`);
    return { success: true, message: "Welcome email sent successfully" };
  } catch (error) {
    // console.error(`Failed to send welcome email to ${email}:`, error);
    throw new Error("Failed to send welcome email");
  }
};

const createUser = async (name, email) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create({ name, email });
    return user;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user");
  }
};

const loginUser = async (email) => {
  try {
    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Failed to login user:", error);
    throw new Error("Failed to login user");
  }
};

module.exports = {
  sendWelcomeEmail,
  createUser,
  loginUser
};
