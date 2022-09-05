const db = require("../models/index");
const Category = db.category;
const error = require("../errorhandler/error");

const createCategory = async (req,res,next) => {
   
try {
    const createdCategory = await Category.create({
      title:req.body.title,  
    });
    const savedCategory = await createdCategory.save();
    res.status(200).json({savedCategory});
} catch (error) {
    next(error);
}
};

const getById = async (req,res,next) => {
   try {
    const singlecategory = await Category.findByPk(req.params.id);
     if(!singlecategory) return next(error(404, "categories not found"));
     res.status(200).json({singlecategory});
   } catch (error) {
    next(error);
   }

}

const getAllCategory = async (req,res,next) => {
 try {
    const allcategories = await Category.findAll();
    res.status(200).json({allcategories});
 } catch (error) {
    next(error);
 }
}

const updateCategory = async (req,res,next) => {
    try {
      const categoryupdated = await Category.update(req.body, {
          where: {id:req.params.id}
      });
      res.status(200).json({categoryupdated});
    } catch (error) {
     next(error); 
    } 
  }
  
  const deleteCategory = async (req,res,next) => {
      try {
          await Category.destroy({
              where:{id:req.params.id}
          });
          res.status(200).json("category successfully deleted");
      } catch (error) {
        next(error);  
      }
  }

module.exports = {createCategory,getById,getAllCategory,updateCategory,deleteCategory};