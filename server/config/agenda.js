const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: "agendaJobs" } });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use other services if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define Agenda Job
agenda.define("send scheduled email", async (job) => {
  const { to, subject, text } = job.attrs.data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
});

// Start Agenda
(async function () {
  await agenda.start();
  console.log("🚀 Agenda Started");
})();

module.exports = agenda;
