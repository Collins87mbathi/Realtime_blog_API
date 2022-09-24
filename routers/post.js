const router = require("express").Router();
const {createPost,getAllPost,getById,deletePost,updatePost} = require("../controllers/post");
const {verifyToken,verifyAdmin,verifyUser} = require("../utils/verifyToken");

router.post('/create',verifyToken, createPost);
router.get('/all',getAllPost);
router.put('/:id',verifyToken,verifyUser,updatePost);
router.get('/:id',getById);
router.delete('/:id',verifyToken,verifyUser,deletePost);

module.exports = router;