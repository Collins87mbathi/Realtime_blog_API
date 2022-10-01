const db = require("../models/index");
const User = db.user;
const bcrypt = require("bcryptjs");
const emailValidator = require("../validators/emailValidator");
const error = require("../errorhandler/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const Register = async (req,res,next) => {
try {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        return next(error(401, "please input values"));
    }
    if(!emailValidator(email)) {
        return next(error(400, "please input a valid mail"));
    }
    // if(!passwordValidator(password)){
    //     return next(error(400, "password must contain uppercase and a number"));
    // }
    const checkmail = await User.findOne({where : {email : email}});
    if(checkmail) return next(error(402, "this email already exist"));

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
    next(error);
}
};

const Login = async (req,res,next) => {
try {
    if(!req.body.email || !req.body.password) {
        return next(error(401, "please input values"));
    };
    const user = await User.findOne({ where: {email:req.body.email}});
    if(!user) {
        res.status(401).send("This is email dos not exist");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) {
        res.status(401).send("This is an  incorrect password");
    }
    const token = jwt.sign({id:user.id , isAdmin:user.isAdmin}, process.env.JWT);
    
     
  res.cookie("access_token", token, {httpOnly: true}).status(200).json({user});
} catch (error) {
   next(error); 
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
    if(!user) return next(error(400, "user not found"));

    res.status(200).json({user});
} catch (error) {
   next(error); 
}
}

const getAllUsers = async (req,res,next) => {
try {
    const users = await User.findAll({
        include:[db.post]
    });
    res.status(200).json({users});
} catch (error) {
    next(error);
}
}

const deleteUser = async (req,res,next) => {
try {
    await User.destroy({
        where:{id:req.params.id}
    });
    res.status(200).json("sucessfully deleted user");
} catch (error) {
    next(error);
}
};

module.exports = {Register,Login,getAllUsers,getById,updateUser,deleteUser};