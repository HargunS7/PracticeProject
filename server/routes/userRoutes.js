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
// const uupdateUser = async(req ,res)=>{
//     const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;


// }
const updateUser = async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { firstName, lastName, age, gender, bloodGroup, phoneNumber, password },
            { new: true }
        );
        if (user) {
            res.send({ message: "User updated successfully", user });
        } else {
            res.status(404).send({ message: "User not found" });
        
        npm}
    }catch (error) {
        res.status(500).send({ message: "Error updating user details" });
    }

};
const router = express.Router();
const {
    registerUser,
    loginUser
} = require("../controllers/userController");
const { validateJwtToken } = require("../middlewares/jwtMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details" , myAccount , validateJwtToken);
router.put("/detailsUpdate", updateUser , validateJwtToken);
module.exports = router;
