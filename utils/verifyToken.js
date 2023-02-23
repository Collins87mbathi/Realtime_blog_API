const error = require("../errorhandler/error");
const jwt = require("jsonwebtoken");
const ApiError = require("../errorhandler/error");
require("dotenv").config();

const verifyToken = (req,res,next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "collo", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
   };
   
   const verifyUser = (req,res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
          next();
        } else {
          return next(ApiError.UnAuthorized("You are not Authorized"));
        }
      });
   }
   const verifyAdmin = (req,res,next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          return next(ApiError.UnAuthorized("You are not Authorized"));
        }
      });
   } 
   
   module.exports = {verifyToken,verifyUser,verifyAdmin};