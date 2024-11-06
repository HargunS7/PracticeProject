const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors= require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require('multer');
const { GridFsStorage } = require("multer-gridfs-storage");
// const upload = multer({ dest : 'uploads/'})
const mongoose = require("mongoose");
const doctorsDetails = require("./routes/doctorsDetails");
const Profie= require("./model/Profie")
const app = express();
app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const users = [
    { name: "Harman Dhiman", age: 20 },
    { name: "Hindveer", age: 19 },
    { name: "Jaikirat", age: 20 },
];

const port = 3000 || 5000;
const dotenv = require("dotenv");
 dotenv.config();
 connectDb();
app.use(express.json());
app.use(cors());
app.get('/' , (req , res)=>{
    res.send("working");
})
app.set('view engine' , 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.get("/home",(req , res)=>{
    res.render("home" , {
       username:" Harman Dhiman",
       posts : " time pass"
    })
})
app.get("/alluser", (req, res) => {
    res.render("alluser", {
        users: users, 
    });
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads"); // Directory to save files
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffex = Date.now() + "-" + Math.round(Math.random()*1E9);
//         cb(null, file.filename +'-'+uniqueSuffex); 
//     },
// });

// Set up GridFsStorage for file storage in MongoDB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
//   const upload = multer({ storage: storage })
 const upload = multer({storage : storage});
app.post("/profile", upload.single("avatar"), async function(req, res , next) {
    
    console.log(req.body);
    console.log(req.file);
    // console.log(req.file.path)
    let {title} = req.body;
    let {path} = req.file;
    // let newProfie= new Profie({image:req.file.path});
    // await newProfie.save()
    // res.render("profile",{image:req.file.path})
    // const imagePath = "/uploads/" + req.file.filename.replace(/\\/g, "/");
    let newProfie = new Profie({ title:title ,  image: path });
    await newProfie.save();
    res.render("profile", { image: path });
    // return res.redirect("/home");
});
app.get("/profile",async(req,res)=>{
    
    let allblog=await Profie.find();
    // console.log(allblog)
    // console.warn("THISHSHSHSH")
    console.log("chalgya");
    
    res.render("profile",{profile : allblog});
}) 
// app.get("/profile", async (req, res) => {
//     let profile = await Profie.findOne();
//     console.log(profile)
    
//     if (profile) {
//         // console.log("Image URL:"+ profile.image);  // Log the image path
//         res.render("profile", { image: profile.image });
//     } else {
//         console.log("No profile found.");
//         res.render("profile", { image: null });
//     }
// });

//register route
app.use("/api/register" , require("./routes/userRoutes"));
app.use("/api/doctors", doctorsDetails);
app.listen(port , ()=>{
    console.log(`server running on http://localhost:${port}`);
})
