const Agenda = require("agenda");
require("dotenv").config();

const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "agendaJobs",
  },
  processEvery: "30 seconds", 
});

agenda.on("ready", () => {
  console.log("✅ Agenda is connected to MongoDB");
});

agenda.on("error", (err) => {
  console.error("❌ Agenda connection error:", err);
});

module.exports = agenda;
