const agenda = require("../config/agenda");
const Node = require("../models/node");
const Sequence = require("../models/sequenceSchema");
const { sendEmail } = require("../services/emailServices");

module.exports = function defineEmailJob() {
  agenda.define("send-cold-email", async (job) => {
    console.log("🚀 Agenda job picked up!");
    console.log("📦 Job Data:", job.attrs.data);
    const { nodeId } = job.attrs.data;

    const node = await Node.findById(nodeId);
    if (!node) return;

    const sequenceId = node.sequenceId;
    const sequence = await Sequence.findById(sequenceId);
    if (!sequence) return;


    if (node.type === "cold-email") {
      console.log("📬 Cold Email Node Triggered");

      const sequence = await Sequence.findById(sequenceId);
      if (!sequence) {
        console.warn("❌ Sequence not found");
        return;
      }

      console.log("📧 Emails in sequence:", sequence.emails);

      if (sequence.emails?.length) {
        for (const email of sequence.emails) {
          try {
            console.log(`🚀 Sending email to ${email}`);
            await sendEmail(email, node.data.subject, node.data.body);
            console.log(`✅ Email sent to ${email}`);
          } catch (err) {
            console.error(`❌ Failed to send email to ${email}`, err.message);
          }
        }
      } else {
        console.warn("⚠️ No emails found in sequence.emails");
      }
    }


    await Sequence.findByIdAndUpdate(sequenceId, {
      currentNodeId: node._id,
    });


    if (node.nextNodeId) {
      const nextNode = await Node.findById(node.nextNodeId);
      if (!nextNode) return;

      if (nextNode.type === "delay") {
        const delay = nextNode.data.delayTime || "1 minute";
        console.log(`⏳ Waiting ${delay} before next node`);

        await agenda.schedule(`${delay}`, "send-cold-email", {
          nodeId: nextNode._id,
        });
      } else {
        await agenda.now("send-cold-email", {
          nodeId: nextNode._id,
        });
      }
    } else {
      await Sequence.findByIdAndUpdate(sequenceId, {
        status: "Completed",
        currentNodeId: null,
      });
      console.log("🎉 Sequence completed");
    }
  });
};
