const { Schema, model } = require("mongoose");

const LeadSchema = new Schema(
  {
    sequenceId: {
      type: Schema.Types.ObjectId,
      ref: "Sequence",
      required: true,
    },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Lead = model("Lead", LeadSchema);
module.exports = Lead;
