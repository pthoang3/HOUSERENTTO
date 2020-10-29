var express = require("express");
var app = express();
var path = require("path");
var multer = require("multer");
var nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const hbs = require('express-handlebars');
const fs= require('fs');

var HTTP_PORT = process.env.PORT || 8080;

app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// START-UP FUNCTIONS
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
 

const STORAGE = multer.diskStorage({
    destination: "./public/photos/",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const UPLOAD = multer({storage: STORAGE});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pthoang3web322@gmail.com',
        pass: 'web322HoangThuy'
    }
});
var myUser={
    user_fname:'',
    user_lname:'',
    user_email:'',
    username:''
}

app.use(express.static("views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req,res){
    res.render('index',{layout: false});
    
});

app.get("/BecomeAHost", function(req,res){
    res.render('BecomeAHost',{layout: false});
});
app.get("/dashboard", function(req,res){
    
        res.render('dashboard',{layout: false});

});

app.post("/signup", (req, res) => {
    
    const FORM_DATA = req.body;
    myUser.user_fname=FORM_DATA.fname;
    myUser.user_lname=FORM_DATA.lname;
    myUser.user_email=FORM_DATA.email;
    myUser.username=myUser.user_fname+ ' '+ myUser.user_lname;
    res.render('dashboard',{data: myUser, layout: false});
    var emailOptions = {
        from: 'pthoang3web322@gmail.com',
        to: FORM_DATA.email,
        subject: 'Register Confirmation from PTH Airbnb',
        html: '<p>Welcome ' + FORM_DATA.fname + ' to PTH Airbnb website.</p><p>Thank you for signing up our website. We hope you have best experience with us.</p><p>Regards,</p><p>Jane</p>'
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log("ERROR: " + error);
        } else {
            console.log("SUCCESS: " + info.response);
            
        }
    });
    
});

// setup http server to listen opn the port designated above
app.listen(HTTP_PORT, onHttpStart);
