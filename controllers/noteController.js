const getNotes = async (req, res) => {
    const locals = {
        title:"Nodejs",
        description:"Adding lots of tech"
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page.ejs'
    })
}
const getNotesAbout = async (req, res) => {
    const locals = {
        title:"Nodejs about",
        description:"about page"
    }
    res.render('about', {
        locals,
        layout: '../views/layouts/main.ejs'
    })
}

module.exports = { getNotes, getNotesAbout }