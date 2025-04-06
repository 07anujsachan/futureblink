const express = require("express");
const router = express.Router();
const agenda = require("../config/agenda");

router.post("/schedule-emails", async (req, res) => {
  console.log("✅ API /schedule-emails is called"); // 👈 Add this log

  try {
    const { to, subject, text, delay } = req.body;

    if (!to || !subject || !text || !delay) {
      console.log("❌ Missing fields in request body");
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("📩 Scheduling email for:", to, "with delay:", delay);

    // Schedule email
    await agenda.schedule("in 5 seconds", "send scheduled email", {
      to,
      subject,
      text,
    });

    console.log("✅ Email scheduled successfully");
    res.json({ message: `📧 Email scheduled for ${to} after ${delay}` });
  } catch (error) {
    console.error("❌ Error scheduling email:", error);
    res.status(500).json({ message: "Failed to schedule email" });
  }
});

module.exports = router;
