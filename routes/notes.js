
const express = require('express');
const { addNote, getAllNotes, updateNote, deleteNote, getPreviousInfo } = require('../controllers/notes');
const { verifyToken } = require('../Middlewares/authMiddlewares');
const { handleNoteIdParam } = require('../Middlewares/Notesparams');
const router = express.Router();

router.param("noteId", handleNoteIdParam);

router.post("/add", verifyToken, addNote);
router.get("/getallnotes", verifyToken, getAllNotes)
router.put("/update/:noteId", verifyToken,updateNote);
router.get("/update/:noteId", verifyToken, getPreviousInfo);
router.delete("/delete/:noteId", verifyToken, deleteNote)
module.exports = router ;