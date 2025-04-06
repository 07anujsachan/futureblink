const Agenda = require("agenda");

let agenda;

const initAgenda = async () => {
  agenda = new Agenda({
    db: { address: process.env.MONGO_URI, collection: "jobs" },
  });
  await agenda.start();
  console.log("✅ Agenda Started");
  return agenda;
};

const getAgenda = () => agenda;

module.exports = { initAgenda, getAgenda };
