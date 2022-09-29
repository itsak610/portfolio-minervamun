var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
var compression = require("compression");
var MongoStore = require("connect-mongo");
var LocalStrategy = require("passport-local").Strategy;

var app = express();

//Make new databse
mongoose.connect(
    "mongodb+srv://itsak:hipeople@cluster0.rac7asr.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;

//If Mongo Error
db.on("error", console.error.bind(console, "connection error"));
app.set("trust proxy", 1);

//Setting up sessions+cookies
var sessionConfig = {
    secret: "AroraJi",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://itsak:hipeople@cluster0.rac7asr.mongodb.net/?retryWrites=true&w=majority",
    }),
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

var User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//Setting up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Compress all HTTP responses
app.use(compression());

//Setting public directory
app.use(express.static(__dirname + "/public"));

//Setting view engine
app.set("view engine", "pug");
app.set("views", [
    __dirname + "/views/admin-1-main",
    __dirname + "/views/admin-2-entries",
    __dirname + "/views/admin-3-allotment",
    __dirname + "/views/static",
    __dirname + "/views/user",
]);

//Setting routes
var routes = require("./routes/index");
app.use("/", routes);

//404
app.use((res, req, next) => {
    var err = new Error("File not found!");
    err.status = 404;
    next(err);
});

//Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.render("error", {
        title: "Error",
        message: err.message,
        error: {},
    });
});

// Listening
app.listen(process.env.PORT || 5000);