const sequenceSchema = require("../models/sequenceSchema");

// get all sequences
const getAllSequences = async (req, res) => {
  try {
    const sequences = await sequenceSchema.find();
    res.status(200).json(sequences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSequence = async (req, res) => {
  const sequence = new sequenceSchema(req.body);
  try {
    const savedSequence = await sequence.save();
    return res.status(201).json(savedSequence);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSequences,
  createSequence,
};
