var express = require("express");
const sequenceSchema = require("../models/sequenceSchema");
const {
  getAllSequences,
  createSequence,
  getSequenceDetails,
  updateSequence,
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

module.exports = router;
