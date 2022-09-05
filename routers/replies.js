const router = require("express").Router();
const {createReplies,deleteReplies,updateReplies,getAllReplies,getById} = require("../controllers/replies");
const {verifyToken,verifyUser} = require("../utils/verifyToken");

router.post('/:id/create',verifyToken,createReplies);
router.get('/all',getAllReplies);
router.put('/:id',verifyUser,updateReplies);
router.get('/:id',getById);
router.delete('/:id',verifyUser,deleteReplies);

module.exports = router;