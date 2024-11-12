const express = require("express");
//  const { validateJwtToken } = require("../server.js");
const User = require("../model/userModel");
const myAccount = async(req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({ email

     });
    if(user){
        res.send(user);
    }

}
const router = express.Router();
const {
    registerUser,
    loginUser
} = require("../controllers/userController");
const { validateJwtToken } = require("../middlewares/jwtMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details" , myAccount , validateJwtToken);
module.exports = router;
