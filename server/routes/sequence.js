var express = require("express");
const sequenceSchema = require("../models/sequenceSchema");
const {
  getAllSequences,
  createSequence,
  getSequenceDetails,
  updateSequence,
  deleteSequence,
  addNodeToSequence,
  startSequence,
  pauseSequence,
  resumeSequence,
} = require("../controllers/SequenceController");

var router = express.Router();

// get all sequences

router.get("/", getAllSequences);

// create new sequence
router.post("/", createSequence);

// get sequence details by id
router.get("/:id", getSequenceDetails);

// update sequence by id
router.put("/:id", updateSequence);

// delete sequence by id
router.delete("/:id", deleteSequence);

// add node to sequence
router.post("/:id/nodes", addNodeToSequence);

//start the sequence nodes
router.post("/:id/start", startSequence);

// pause sequence

router.post("/:id/pause", pauseSequence);

// resume sequence

router.post("/:id/resume", resumeSequence);

module.exports = router;
