const { sendEmail } = require("../services/emailServices");
const { getAgenda } = require("../config/agenda");
const Node = require("../models/node");

const defineEmailJob = () => {
  const agenda = getAgenda();

  agenda.define("send-cold-email", async (job) => {
    const { nodeId } = job.attrs.data;
    const node = await Node.findById(nodeId);

    if (node?.data.emails) {
      for (const email of node.data.emails) {
        await sendEmail(email, node.data.subject, node.data.body);
      }
    }

    if (node.nextNodeId) {
      const nextNode = await Node.findById(node.nextNodeId);

      if (nextNode?.type === "delay") {
        await agenda.schedule(
          `${nextNode.data.delayTime} minutes`,
          "send-cold-email",
          { nodeId: nextNode.nextNodeId }
        );
      } else {
        await agenda.now("send-cold-email", { nodeId: node.nextNodeId });
      }
    }
  });
};

module.exports = { defineEmailJob };
