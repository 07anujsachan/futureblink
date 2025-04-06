// src/server.js
const app = require("./app");
const { initAgenda } = require("./config/agenda");
const { defineEmailJob } = require("./jobs/emailJobs");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await initAgenda();
  defineEmailJob();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
