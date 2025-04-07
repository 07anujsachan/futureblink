const Node = require("../models/node");
const Sequence = require("../models/sequenceSchema");
const agenda = require("../config/agenda");


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

    const leadSourceNode = await Node.create({
      type: "lead-source",
      sequenceId: savedSequence._id,
      data: {
        label: "Add Lead Source",
        emails: [],
        subject: "",
        body: "",
        delayTime: 0,
      },
      nextNodeId: null,
    });

    const addNodeButton = await Node.create({
      type: "add-node-button",
      sequenceId: savedSequence._id,
      data: { label: "+" },
      nextNodeId: null,
    });

    leadSourceNode.nextNodeId = addNodeButton._id;
    await leadSourceNode.save();

    savedSequence.nodes.push(leadSourceNode._id, addNodeButton._id);
    await savedSequence.save();

    const finalSequence = await Sequence.findById(savedSequence._id).populate(
      "nodes"
    );

    return res.status(201).json(finalSequence);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const addNodeToSequence = async (req, res) => {
  try {
    const { id: sequenceId } = req.params;
    const { type, data } = req.body;

    const addNodeButton = await Node.findOne({
      sequenceId,
      type: "add-node-button",
    });

    const prevNode = await Node.findOne({
      sequenceId,
      nextNodeId: addNodeButton._id,
    });

    const newNode = await Node.create({
      sequenceId,
      type,
      data,
      nextNodeId: addNodeButton._id,
    });

    if (prevNode) {
      prevNode.nextNodeId = newNode._id;
      await prevNode.save();
    }

    const updatedSequence = await Sequence.findByIdAndUpdate(
      sequenceId,
      { $push: { nodes: newNode._id } },
      { new: true }
    ).populate("nodes");

    res.status(201).json(updatedSequence);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const addMailsToSequence = async (req, res) => {
  try {
    const { id: sequenceId } = req.params;
    const { emails } = req.body;

    const sequence = await Sequence.findByIdAndUpdate(
      sequenceId,
      {
        $addToSet: { emails: { $each: emails } },
      },
      { new: true }
    ).populate("nodes");
    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }
   
   for (const node of sequence.nodes) {
    if (node.type === "lead-source") {
      const existingEmails = node.data?.emails || [];

      const updatedEmails = [...new Set([...existingEmails, ...emails])];

      node.data = {
        ...node.data,
        emails: updatedEmails,
      };

      await node.save();
    }
  }

    return res.status(200).json(sequence);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSequenceDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const sequence = await Sequence.findById(id).populate("nodes");

    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }

    const addNodeButtonNode = sequence.nodes.find(
      (node) => node.type === "add-node-button"
    );

    const otherNodes = sequence.nodes.filter(
      (node) => node.type !== "add-node-button"
    );

    let finalNodes = [...otherNodes];
    if (addNodeButtonNode) finalNodes.push(addNodeButtonNode);

    return res.status(200).json({
      sequence: {
        ...sequence.toObject(),
        nodes: finalNodes,
      },
    });
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
    
    return res.status(200).json({ message: "Sequence deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const startSequence = async (req, res) => {
  try {
    const sequenceId = req.params.id;
    const nodes = await Node.find({ sequenceId }).sort("createdAt");

    if (nodes.length === 0) {
      return res.status(400).json({ error: "No nodes in this sequence" });
    }


    const startNode = nodes.find((node) =>
      ["cold-email", "delay"].includes(node.type)
    );

    if (!startNode) {
      return res
        .status(400)
        .json({ error: "No executable node found to start" });
    }

    await Sequence.findByIdAndUpdate(sequenceId, {
      status: "Active",
      currentNodeId: startNode._id,
      lastExecutedNodeIndex: nodes.findIndex((n) =>
        n._id.equals(startNode._id)
      ),
    });

    await agenda.now("send-cold-email", { nodeId: startNode._id });

    console.log(`🚀 Sequence started at node: ${startNode._id}`);
    res.json({ message: "Sequence started successfully" });
  } catch (err) {
    console.error("❌ Error in startSequence:", err.message);
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

const deleteNode = async (req, res) => {
  try {
    const nodeId = req.params.id;

    const node = await Node.findById(nodeId);
    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    // Prevent deletion of special nodes
    if (["Add Lead Source", "+"].includes(node.data?.label)) {
      return res.status(400).json({
        message: `Cannot delete protected node (${node.data.label}).`,
      });
    }


    const previousNode = await Node.findOne({ nextNodeId: nodeId });
    if (previousNode) {
      await Node.findByIdAndUpdate(previousNode._id, {
        nextNodeId: node.nextNodeId || null,
      });
    }


    await Node.findByIdAndDelete(nodeId);

    res.json({ message: "Node deleted and chain updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  addMailsToSequence,
  deleteNode,
};
