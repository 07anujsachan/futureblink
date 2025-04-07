const agenda = require("../config/agenda");
const Node = require("../models/node");
const Sequence = require("../models/sequenceSchema");
const { sendEmail } = require("../services/emailServices");

agenda.define("send-cold-email", async (job) => {
  const { nodeId } = job.attrs.data;
  const node = await Node.findById(nodeId);
  if (!node) return;

  const sequenceId = node.sequenceId;

  if (node.type === "cold-email" && node.data.emails) {
    for (const email of node.data.emails) {
      try {
        await sendEmail(email, node.data.subject, node.data.body);
        console.log(`✅ Email sent to ${email}`);
      } catch (err) {
        console.error(`❌ Failed to send email to ${email}`, err.message);
      }
    }
  }

  // Update currentNodeId in Sequence
  await Sequence.findByIdAndUpdate(sequenceId, {
    currentNodeId: node._id,
  });

  // Proceed to next node
  if (node.nextNodeId) {
    const nextNode = await Node.findById(node.nextNodeId);
    if (!nextNode) return;

    if (nextNode.type === "delay") {
      // Wait for delayTime before moving to next node
      const delay = nextNode.data.delayTime || "5 minutes";
      console.log(delay);
      
      await agenda.schedule(`${delay}`, "send-cold-email", {
        nodeId: nextNode.nextNodeId,
      });
      console.log(`⏳ Waiting ${delay} min before next node`);
    } else {
      // Immediately trigger the next node
      await agenda.now("send-cold-email", {
        nodeId: nextNode._id,
      });
    }
  } else {
    // No next node → complete sequence
    await Sequence.findByIdAndUpdate(sequenceId, {
      status: "Completed",
      currentNodeId: null,
    });
    console.log("🎉 Sequence completed");
  }
});
