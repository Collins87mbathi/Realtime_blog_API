const router = require("express").Router();
const {createPost,getAllPost,getById,deletePost,updatePost} = require("../controllers/post");
const {verifyToken,verifyAdmin,verifyUser} = require("../utils/verifyToken");

router.post('/create',verifyToken,verifyUser, createPost);
router.get('/all',getAllPost);
router.put('/:id',verifyUser,updatePost);
router.get('/:id',getById);
router.delete('/:id',verifyUser,deletePost);

module.exports = router;