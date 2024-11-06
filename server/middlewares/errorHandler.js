const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {constants} = require("../constants");
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode? res.statusCode:500;
    switch(statusCode){ 
        case constants.VALIDATION_ERROR: res.json({
            title : "validation failed",
            message : err.message , 
            stackTrace : err.stack,
        });
        break;
        case constants.NOT_FOUND: res.json({
            title : "Not Found",
            message : err.message,
            stackTrace : err.stack,
        });
        case constants.UNAUTHORIZED: res.json({
            title : "Unauthorized",
            message : err.message,
            stackTrace : err.stack,
        });
        case constants.SERVER_ERROR: res.json({
            title : "Server Error",
            message : err.message,
            stackTrace : err.stack,
        });
        default:
            console.log(" No error , all good ! ");
            break;
    }
}
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("No token, authorization denied");
    }
});


module.exports = {errorHandler , protect};
