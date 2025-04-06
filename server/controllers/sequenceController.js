const Node = require("../models/node");
const Sequence = require("../models/sequenceSchema");
const { getAgenda } = require("../config/agenda");

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
    sequence.nodes.push(node._id);
    const savedSequence = await sequence.save();
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
    await Node.deleteMany({ sequenceId: id });
    // Delete all nodes associated with the sequence
    return res.status(200).json({ message: "Sequence deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNodeToSequence = async (req, res) => {
  const { id: sequenceId } = req.params;
  const { type, data } = req.body;
  try {
    const node = await Node.create({
      type,
      sequenceId,
      data,
    });
    const sequence = await Sequence.findByIdAndUpdate(
      sequenceId,
      { $push: { nodes: node._id } },
      { new: true }
    );
    return res.status(201).json({ node, sequence });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const startSequence = async (req, res) => {
  const agenda = getAgenda();
  try {
    const sequenceId = req.params.id;
    const nodes = await Node.find({ sequenceId }).sort("createdAt");

    if (nodes.length === 0) return res.status(400).json({ error: "No nodes" });

    await Sequence.findByIdAndUpdate(sequenceId, {
      status: "Active",
      currentNodeId: nodes[0]._id,
      lastExecutedNodeIndex: 0,
    });

    await agenda.now("send-cold-email", { nodeId: nodes[0]._id });

    res.json({ message: "Sequence started" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pauseSequence = async (req, res) => {
  try {
    await Sequence.findByIdAndUpdate(req.params.id, { status: "Paused" });
    res.json({ message: "Sequence paused" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resumeSequence = async (req, res) => {
  try {
    const sequence = await Sequence.findById(req.params.id);
    if (sequence.status !== "Paused") {
      return res.status(400).json({ error: "Sequence not paused" });
    }

    const node = await Node.findById(sequence.currentNodeId);
    await Sequence.findByIdAndUpdate(req.params.id, { status: "Active" });
    await agenda.now("send-cold-email", { nodeId: node._id });

    res.json({ message: "Sequence resumed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllSequences,
  createSequence,
  getSequenceDetails,
  updateSequence,
  deleteSequence,
  addNodeToSequence,
  startSequence,
  pauseSequence,
  resumeSequence,
};
