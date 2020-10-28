var express = require("express");
var app = express();
var path = require("path");
var multer = require("multer");
var nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const fs= require('fs');
var jsonParser = bodyParser.json()
// MODULE INITIALIZATION
var HTTP_PORT = process.env.PORT || 8080;

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

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

function onHttpStart() {
    console.log("Express http server listing on: " + HTTP_PORT);
}

app.use(express.static("views"));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render('index',{layout: false});
    
});

app.get("/BecomeAHost", function(req,res){
    res.render('BecomeAHost',{layout: false});
});
app.get("/dashboard", function(req,res){
    
        res.render('dashboard',{layout: false});

});

app.post("/contact-for-process", (req, res) => {
    
    const FORM_DATA = req.body;
    res.render('dashboard',{layout: false});
    var emailOptions = {
        from: 'pthoang3web322@gmail.com',
        to: FORM_DATA.email,
        subject: 'Register Confirmation from PTH Airbnb',
        html: '<h1>Welcome ' + FORM_DATA.fname + 'to PTH Airbnb website.</h1><br><p>Thank you for signing up our website. We hope you have best experience with us.'
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