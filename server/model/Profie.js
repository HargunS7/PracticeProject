const mongoose = require("mongoose");
const profieSchema = mongoose.Schema({
    title:{
        type : String
    },
    image:String
})
module.exports = mongoose.model("Profie" , profieSchema);