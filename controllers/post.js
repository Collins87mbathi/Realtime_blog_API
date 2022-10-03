
const ApiError = require("../errorhandler/error");
const error = require("../errorhandler/error");
const db = require("../models/index");
const Op = db.Sequelize.Op;
const Post = db.post;

const createPost = async (req,res,next)=> {
    // const {id} = req.user;
try {
const {title,desc,category,postimg,userimg,username,userId} = req.body;
if(!title || !desc ) return next(ApiError.BadRequest("please input values"));

if(!postimg) return next(ApiError.BadRequest("no images uploaded"));

const post = await Post.create({
    userId,
    title,
    desc,
    category,
    postimg,
    userimg,
    username
});
const savedPost = await post.save();
res.status(200).json({savedPost});
} catch (error) {
    next(ApiError.InternalError(error));
}
}

const getById = async (req,res,next) => {
    try {
        const singlepost = await Post.findByPk(req.params.id, {
            include:[db.comment]
        });
        if(!singlepost) return next(ApiError.NotFound("This post is not found"));
        res.status(200).json({singlepost});
    } catch (error) {
       next(error); 
    }
    }

const updatePost = async (req,res,next) => {
  try {
    const postupdated = await Post.update(req.body, {
        where: {id:req.params.id}
    });
    res.status(200).json({postupdated});
  } catch (error) {
   next(ApiError.InternalError(error)); 
  } 
}

const deletePost = async (req,res,next) => {
    try {
        await Post.destroy({
            where:{id:req.params.id}
        });
        res.status(200).json("post successfully deleted");
    } catch (error) {
      next(ApiError.InternalError(error));  
    }
}

const getAllPost = async (req,res,next) => {
let category = req.query.category;
let search = req.query.search;
let options = { where: {},
include:[db.comment,db.likes]
}
    try {
        if(category) options.where.category = category;
        if(search) options.where.title ={ [Op.like]:`%${search}%`};
        const posts = await Post.findAll(options);
        res.status(200).json({posts});
    } catch (error) {
       next(ApiError.InternalError(error)); 
    }
}

module.exports = {createPost,getById,updatePost,deletePost,getAllPost};