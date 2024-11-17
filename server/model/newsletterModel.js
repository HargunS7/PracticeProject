const mongoose = require("mongoose");
const newsletterSchema = mongoose.Schema({
    title:{
        type : String , 
        require : [ true , "please add your title"],
    },
    author:{
        type : String , 
        require : [ true , "please add your author name"],
        unique:true,
    },
    date:{
        type : String , 
        require : [ true , "please add your date"],
    },
    imgeUrl:{
        type : String , 
        require : [ true , "please add your imageURL"],
    },
    description:{
        type : String , 
        require : [ true , "please add description "],
    },
   
   
},
{
    timestamps : true ,
});
module.exports = mongoose.model("Newsletter" , newsletterSchema);