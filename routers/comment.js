const router = require("express").Router();
const {createComment,getAllComments,getById,deleteComment,updateComment} = require("../controllers/comment");
const {verifyToken,verifyUser} = require("../utils/verifyToken");

router.post('/:id/create',verifyToken,createComment);
router.get('/all',getAllComments);
router.put('/:id',verifyUser,updateComment);
router.get('/:id',getById);
router.delete('/:id',verifyUser,deleteComment);

module.exports = router;