const Node = require("../models/node");
const Sequence = require("../models/sequenceSchema");

// get all sequences
const getAllSequences = async (req, res) => {
  try {
    const sequences = await Sequence.find();
    res.status(200).json(sequences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSequence = async (req, res) => {
  const sequence = new Sequence(req.body);
  try {
    const savedSequence = await sequence.save();
    const node = await Node.create({
      type: "lead-source",
      sequenceId: sequence._id,
      data: {
        label: "Lead Source",
        emails: [],
        subject: "",
        body: "",
        delayTime: 0,
      },
    });
    return res.status(201).json(savedSequence);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getSequenceDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const sequence = await Sequence.findById(id).populate("nodes");

    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }
    const nodes = await Node.find({ sequenceId: id });
    return res.status(200).json({ sequence, nodes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSequence = async (req, res) => {
  const { id } = req.params;
  try {
    const sequence = await Sequence.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }
    return res.status(200).json(sequence);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSequence = async (req, res) => {
  const { id } = req.params;
  try {
    const sequence = await Sequence.findByIdAndDelete(id);
    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }
    return res.status(200).json({ message: "Sequence deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSequences,
  createSequence,
  getSequenceDetails,
  updateSequence,
  deleteSequence,
};
