const error = require("../errorhandler/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
       return next(error(401, "You are not authenticated"));
    }
   jwt.verify(token , process.env.JWT, (err, user)=> {
     if(err) return next(error(403, "Token is not valid!"));
     req.user = user;
     next();    
   });
   };
   
   const verifyUser = (req,res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
          next();
        } else {
          return next(error(403, "You are not authorized!"));
        }
      });
   }
   const verifyAdmin = (req,res,next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          return next(error(403, "You are not authorized!"));
        }
      });
   } 
   
   module.exports = {verifyToken,verifyUser,verifyAdmin};