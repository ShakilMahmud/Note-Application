const router = require("express").Router()

const { dashboardController, 
        dashboardViewNote, 
        dashboardUpdateNote, 
        dashboardDeleteNote, 
        dashboardAddNote, 
        dashboardAddNoteSubmit, 
        dashboardSearchNote, 
        dashboardSearchNoteSubmit 
    } = require("../controllers/dashboardController")

const  isLogged  = require("../middleware/checkAuth")

router.use(isLogged)
router.get('/',dashboardController)
router.get('/item/:id',dashboardViewNote)
router.patch('/item/:id/update',dashboardUpdateNote)
router.delete('/item/:id/delete',dashboardDeleteNote)

router.get('/add',dashboardAddNote)
router.post('/add',dashboardAddNoteSubmit)

// router.get('/search',dashboardSearchNote)
router.post('/search',dashboardSearchNoteSubmit)

module.exports = router