const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors= require("cors");
const hbs = require("hbs");
const path = require("path");
const doctorsDetails = require("./routes/doctorsDetails");


const users = [
    { name: "Harman Dhiman", age: 20 },
    { name: "Hindveer", age: 19 },
    { name: "Jaikirat", age: 20 },
];
const app = express();
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
//register route
app.use("/api/register" , require("./routes/userRoutes"));
app.use("/api/doctors", doctorsDetails);
app.listen(port , ()=>{
    console.log(`Server running on http://localhost:${port}`);

});