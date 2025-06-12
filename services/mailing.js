const { MailtrapClient } = require("mailtrap");

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN || "your-mailtrap-token",
});
const SENDER_EMAIL = process.env.SENDER_EMAIL || "collinsomondi778@gmail.com";

const sender = { name: "Ripple Goal", email: SENDER_EMAIL };

// Email sending utility function
const sendEmail = async ({ to, subject, html, text }) => {
  client
    .send({
      from: sender,
      to: [{ email: to }],
      subject: subject || "Welcome to Ripple Goal!",
      text: text || "Thank you for joining Ripple Goal!",
    })
    .then((response) => {
      console.log("Email sent successfully:", response);
      return { success: true, messageId: response.id };
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    });
};

module.exports = { sendEmail };
