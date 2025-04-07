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
      enum: ["lead-source", "cold-email", "delay"],
      required: true,
    },
    data: {
      label: String,
      emails: [String],
      subject: String,
      body: String,
      delayTime: Number,
    },
    nextNodeId: { type: String, default: null },
  },
  { timestamps: true }
);

const Node = model("Node", NodeSchema);
module.exports = Node;
