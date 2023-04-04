require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');

const noteRouter = require("./routes/noteRoute")
const dashboardRouter = require("./routes/dashboardRoute")
const authRouter = require("./routes/authRoute")

const dbConnect = require("./config/db")
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require("passport");
const methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 5000;

// Database connection
dbConnect()

 function createMongoStore() {
     mongoose.connect(process.env.DB_CON_STR);
    const store = MongoStore.create({
      mongoUrl: process.env.DB_CON_STR
    });
    return store;
  }

// (async () => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store:  createMongoStore()
    }));
// })();

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))



//static files
app.use(express.static('public'));

// templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', authRouter)
app.use('/', noteRouter)
app.use('/dashboard', dashboardRouter)

app.get('*', (req, res) => {
    res.status(404).render('404')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})