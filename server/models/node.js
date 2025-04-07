const { Schema, model } = require("mongoose");

const NodeSchema = new Schema(
  {
    sequenceId: {
      type: String,
      ref: "Sequence",
      required: true,
    },
    type: {
      type: String,
      enum: ["lead-source", "cold-email", "delay", "add-node-button"],
      required: true,
    },
    data: {
      label: String,
      // emails: [String],
      subject: String,
      body: String,
      delayTime: String,
    },
    nextNodeId: { type: String, default: null },
  },
  { timestamps: true }
);

const Node = model("Node", NodeSchema);
module.exports = Node;
