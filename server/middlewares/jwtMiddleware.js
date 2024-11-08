const jwt = require('jsonwebtoken')
const createToken = jwt.sign(payload , process.env.PRIVATE_KEY , (err ,token )=>{
    if(err){
        console.error("Invalid : " , err.message);
    }
    else{
        console.log(token);
    }
}) 
const validateToken = jwt.verify( token , process.env.PRIVATE_KEY , function(err , decoded){
    console.log(decoded.foo);
});
// try{

// }