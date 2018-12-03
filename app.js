//========================================================================
// node moduals that is require
var express = require("express"),
    bodyParser = require("body-parser"),
    mongo = require("mongoose"),
    fileUpload = require('express-fileupload'),
    methodOverride = require("method-override");
//=========================================================================

//Database SetUp
mongo.connect("mongodb://rayka:rayka1boss@ds229295.mlab.com:29295/solar-store");
//Product Schema 
var carDetailSchema = new mongo.Schema({
    name:String,
    company: String,
    model: String,
    type:String,
    description: String,
    img: String,
    prize: Number,
    color: String,
    engineCapacity: String,
    fuel:String, 
    created: {
        type: Date,
        default: Date.now
    }
})
var carDetail = mongo.model("cardetail", carDetailSchema);

//=========================================================================
//other Settings
var app = express();
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

function fileUp(reqBody, reqFiles) {
    if (!reqFiles)
        return console.log("No files were uploaded.");
    else
        console.log(reqFiles);
    
    // check if file is uploaded or not
    if (reqFiles.img){
        reqBody.img = "../images/" + reqFiles.img.name
        path = "./public/images/" + reqFiles.img.name;
        imgfile = reqFiles.img;
        imgfile.mv(path, function (err) {
            //setting for server path where uploded file saved
            if (err)
                console.log("Error while Upload");
            else
                console.log("Successfully uploaded.");
        });
    }else{
        reqBody.img = "../images/img_avatar.png"
    }
    console.log(reqBody);
}

//=========================================================================
//listener
app.listen(process.env.PORT, process.env.IP,function () {
    console.log("Server started at 3000...")
});

 
//=========================================================================
//Routes 
app.get("/", function (req, res) { //home page
    res.render("homePage");
})

app.get("/addcar",(req,res)=>{
    res.render("addCar");
})

app.get("/search",(req,res)=>{
    res.render("search");
})

app.post("/search",(req,res)=>{
    console.log(req.body);
    var minp = Number(req.body.prizemin);
    var maxp = Number(req.body.prizemax);
    var minc = parseInt(req.body.ccmin);
    var maxc = parseInt(req.body.ccmax);
    console.log(maxp,minp,minc,maxc);
    
    carDetail.find({
        company : req.body.company,
        prize: {$gt:minp , $lt:maxp},
        engineCapacity:{$gt:minc , $lt:maxc}
    }, function (err, cars) {
        if (err) {
            console.log("Error...!",err);
        } else {
            console.log("Success:",cars);
            res.render("searchResult", {cars: cars});
        }
    });
})
// app.get("/searchResult",(req,res)=>{
//     res.render('searchResult')
// })
app.post("/addcar",  function (req, res) { //adding new item to db
    //uploading file
    fileUp(req.body, req.files);
    //database entry for new Product
    carDetail.create(req.body, function (err, cardata) {
        if (err) {
            console.log("Error",err);
            res.render("/homePage");
        } else {
            console.log("Success",cardata);
            res.redirect("/addcar");
        }
    })
})
