const Note = require('../models/Notes')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const dashboardController = async (req, res) => {

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

const pipeline = [
  {
    $match: { user: new ObjectId(req.user.id) }
  },
  {
    $sort: { updatedAt: -1 }
  },
  {
    $skip: (page - 1) * limit
  },
  {
    $limit: parseInt(limit)
  }
];

const noteQuery = Note.aggregate(pipeline);

    const locals = {
        title:"dashboard",
        description:"Adding dashboard"
    }

    try{
        const notes = await noteQuery.exec();
        const count = await Note.count();

        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard.ejs',
            current: page,
            pages: Math.ceil(count / limit)
        })
    }catch(err){
        console.log(err);
    }

   
}

const dashboardViewNote = async (req,res) => {
    const id = req.params.id;
    const userId = req.user.id;

    let conditions = {_id: id, user: userId};
    const note = await Note.findOne(conditions);

    if(note){
        res.render("dashboard/view-note", {
            noteID: req.params.id,
            note,
            layout: "../views/layouts/dashboard.ejs"
        })
    }
    else {
        res.send("Something went wrong.");
      }

}
const dashboardUpdateNote = async (req,res) => {
    const id = req.params.id;
    const { title, body } = req.body;

    try{
       const note = await Note.findByIdAndUpdate(id, { title, body });
       res.redirect(`/dashboard/item/${note._id}`);

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}
const dashboardDeleteNote = async (req,res) => {
    const id = req.params.id;
    const userId = req.user.id;

    let conditions = {_id: id, user: userId};
    try{
       const note = await Note.findOneAndDelete(conditions);
       res.redirect(`/dashboard`);

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}

const dashboardAddNote = async (req,res) => {
    res.render("dashboard/add", {
        layout: "../views/layouts/dashboard",
      });
}

const dashboardAddNoteSubmit = async (req,res) => {
    req.body.user = req.user.id
    try{
        await Note.create(req.body)
        res.redirect("/dashboard")

    }catch(err){
        console.log(err)
    }
}

const dashboardSearchNote = async (req,res) => {
    try {
        res.render("dashboard/search", {
          searchResults: "",
          layout: "../views/layouts/dashboard",
        });
      } catch (error) {
        console.log(error)
      }
}
const dashboardSearchNoteSubmit = async (req,res) => {
    try {
        let searchTerm = req.body.searchTerm;

        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const searchResults = await Note.find({
          $or: [
            { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          ],
        }).where({ user: req.user.id });
    
        res.render("dashboard/search", {
          searchResults,
          layout: "../views/layouts/dashboard",
        });
      } catch (error) {
        console.log(error);
      }
}

module.exports = { 
                    dashboardController, 
                    dashboardViewNote, 
                    dashboardUpdateNote, 
                    dashboardDeleteNote, 
                    dashboardAddNote, 
                    dashboardAddNoteSubmit,
                    dashboardSearchNote,
                    dashboardSearchNoteSubmit
                }