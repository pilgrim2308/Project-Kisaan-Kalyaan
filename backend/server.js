var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    { Users }               = require("./models/user.model"),
    User                    = require("./models/user.model"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    config = require('config');
    
require('dotenv').config();

const app = express();

//connect to mongodb 
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());

app.use(require("express-session")({
    secret: "She is precious!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req,res) => {
    res.send('homepage');
})
app.get('/current', isLoggedIn, async (req,res) => {
    const user = await User.find({}, (err, user) => {
        if(err){
            res.send('dikkt');
        } else {
            res.send(user);
        }
    });
});

app.get("/login", function(req, res){
    res.send("login page");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/current",
    failureRedirect: "/login"
}), function(req, res){    
});

app.post('/register', async(req,res) => {
    User.register(
        new User({ 
                username: req.body.username,
                personal: {
                    firstname: req.body.personal.firstname,
                    lastname: req.body.personal.lastname,
                    dob: req.body.personal.dob,
                    mobile: req.body.personal.mobile
                },
            } 
        ), req.body.password, function(err, user){
        if(err){
            return res.send("Cant SignUp!\n" + err);
        };
        passport.authenticate("local")(req, res, function(){
            res.send("Account Created Successfully!")
        });
    });
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect("/login");
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));