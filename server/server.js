// src/server.js
const app = require("./app");
// const { defineEmailJob } = require("./jobs/emailJobs");
const defineEmailJob = require("./jobs/emailJobs");
const connectDB = require("./config/database");
const agenda = require("./config/agenda");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await agenda.start();
  defineEmailJob();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
