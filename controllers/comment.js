const db = require("../models/index");
const Comment = db.comment;
const error = require("../errorhandler/error");

const createComment = async (req,res,next) => {
    const {id,name} = req.user;
try {
    const createdComment = await Comment.create({
      desc:req.body.desc,
      username:name,
      postId:req.params.id,
      userId:id
    });
    const savedComment = await createdComment.save();
    res.status(200).json({savedComment});
} catch (error) {
    next(error);
}
};

const getById = async (req,res,next) => {
   try {
    const singlecomment = await Comment.findByPk(req.params.id, {
      include:[db.replies]
    });
     if(!singlecomment) return next(error(404, "comments not found"));
     res.status(200).json({singlecomment});
   } catch (error) {
    next(error);
   }
}

const getAllComments = async (req,res,next) => {
 try {
    const allcomments = await Comment.findAll({
      include:[db.replies]
    });
    res.status(200).json({allcomments});
 } catch (error) {
    next(error);
 }
}

const updateComment = async (req,res,next) => {
    try {
      const postupdated = await Comment.update(req.body, {
          where: {id:req.params.id}
      });
      res.status(200).json({postupdated});
    } catch (error) {
     next(error); 
    } 
  }
  
  const deleteComment = async (req,res,next) => {
      try {
          await Comment.destroy({
              where:{id:req.params.id}
          });
          res.status(200).json("comment successfully deleted");
      } catch (error) {
        next(error);  
      }
  }

module.exports = {createComment,getById,getAllComments,updateComment,deleteComment};