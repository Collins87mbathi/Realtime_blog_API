const db = require("../models/index");
const User = db.user;
const bcrypt = require("bcryptjs");
const emailValidator = require("../validators/emailValidator");
const passwordValidator = require("../validators/passwordValidator");
const ApiError = require("../errorhandler/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const Register = async (req,res,next) => {
try {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        return next(ApiError.BadRequest("please input values"));
    }
    if(!emailValidator(email)) {
        return next(ApiError.BadRequest("please input a valied email"));
    }
    if(!passwordValidator(password)){
        return next(ApiError.BadRequest("password must contain min 8 characters, at least 1 letter (uppercase and lowercase), 1 number and 1 special character"));
    }
    const checkmail = await User.findOne({where : {email : email}});
    if(checkmail) return next(ApiError.BadRequest("This email already exist"));

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const createUser = await User.create({
     name:name,
     email:email,
     password:hash
    });
   const user = await createUser.save();

   res.status(200).json({user});

} catch (error) {
    // next(ApiError.InternalError("something went wrong"));
    console.log(error);
}
};

const Login = async (req,res,next) => {
try {
    if(!req.body.email || !req.body.password) {
        return next(ApiError.BadRequest("please input values"));
    };
    const user = await User.findOne({ where: {email:req.body.email}});
    if(!user) {
        return next(ApiError.BadRequest("This email does not exist"));
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) {
        return next(ApiError.BadRequest("This password is incorrect"));
    }
    const token = jwt.sign({id:user.id , isAdmin:user.isAdmin}, "collo");
    
  const { password, ...others } = user.dataValues;

  res.status(200).json({user:{...others,token}});
} catch (error) {
   console.log(error);
}
};

const updateUser = async (req,res,next) => {
    try {
   await User.update(req.body, {
        where: {id:req.params.id}
     })

     res.status(200).json("update successfully");   
    } catch (error) {
        next(error);
    }
}

const getById = async (req,res,next) => {
try {
    const user = await User.findByPk(req.params.id, {
        include : [db.post]
    });
    if(!user) return next(ApiError.NotFound("This user is not found"));

    res.status(200).json({user});
} catch (error) {
   next(ApiError.InternalError("something went wrong")); 
}
}

const getAllUsers = async (req,res,next) => {
try {
    const users = await User.findAll({
        include:[db.post]
    });
    res.status(200).json({users});
} catch (error) {
    next(ApiError.InternalError("something went wrong"));
}
}

const deleteUser = async (req,res,next) => {
try {
    await User.destroy({
        where:{id:req.params.id}
    });
    res.status(200).json("sucessfully deleted user");
} catch (error) {
    next(ApiError.InternalError("something went wrong"));
}
};

module.exports = {Register,Login,getAllUsers,getById,updateUser,deleteUser};