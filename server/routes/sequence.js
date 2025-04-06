var express = require("express");
const sequenceSchema = require("../models/sequenceSchema");
const {
  getAllSequences,
  createSequence,
} = require("../controllers/SequenceController");

var router = express.Router();

// get all sequences

router.get("/", getAllSequences);

// create new sequence
router.post("/", createSequence);

module.exports = router;
