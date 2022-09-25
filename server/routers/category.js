const router = require("express").Router();
const {createCategory,deleteCategory,updateCategory,getById,getAllCategory} = require("../controllers/category");


router.post('/create',createCategory);
router.get('/all',getAllCategory);
router.put('/:id',updateCategory);
router.get('/:id',getById);
router.delete('/:id',deleteCategory);

module.exports = router;