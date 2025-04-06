var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SequenceSchema = new Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Draft", "Active", "Paused", "Completed"],
    default: "Draft",
  },
  nodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Node",
    },
  ],
  currentNodeId: { type: String, default: null },
  createdBy: { type: String, required: true },
  lastExecutedNodeIndex: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sequence", SequenceSchema);
