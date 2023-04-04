const router = require("express").Router()
const { getNotes, getNotesAbout } = require("../controllers/noteController")

router.get('/',getNotes)
router.get('/about',getNotesAbout)

module.exports = router