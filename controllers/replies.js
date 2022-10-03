const db = require("../models/index");
const Replies = db.replies;
const error = require("../errorhandler/error");
const ApiError = require("../errorhandler/error");

const createReplies = async(req,res,next) => {
 const {id} = req.user;
try {
   const createdReply = await Replies.create({
    desc:req.body.desc,
    commentId:req.params.id,
    userId:id
   });
   const savedReply = await createdReply.save();
 res.status(200).json({savedReply});
} catch (error) {
  next(ApiError.InternalError(error));  
}
}

const getById = async (req,res,next) => {
    try {
     const singlecomment = await Replies.findByPk(req.params.id);
      if(!singlecomment) return next(ApiError("The reply not found"));
      res.status(200).json({singlecomment});
    } catch (error) {
     next(error);
    }
 }
 
 const getAllReplies = async (req,res,next) => {
  try {
     const allcomments = await Replies.findAll();
     res.status(200).json({allcomments});
  } catch (error) {
     next(ApiError.InternalError(error));
  }
 }
 
 const updateReplies = async (req,res,next) => {
     try {
       const postupdated = await Replies.update(req.body, {
           where: {id:req.params.id}
       });
       res.status(200).json({postupdated});
     } catch (error) {
      next(ApiError.InternalError(error)); 
     } 
   }
   
   const deleteReplies = async (req,res,next) => {
       try {
           await Replies.destroy({
               where:{id:req.params.id}
           });
           res.status(200).json("comment successfully deleted");
       } catch (error) {
         next(ApiError.InternalError(error));  
       }
   }

module.exports = {deleteReplies,updateReplies,createReplies,getAllReplies,getById};