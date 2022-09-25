const router = require("express").Router();
const {Register,Login,getAllUsers,getById,updateUser,deleteUser} = require("../controllers/user");
const {verifyAdmin,verifyUser, verifyToken} = require("../utils/verifyToken");

router.post('/register',Register);
router.post('/login',Login);
router.get('/all',verifyAdmin,getAllUsers);
router.get('/:id',getById);
router.put('/:id',verifyToken,verifyUser,updateUser);
router.delete('/:id',verifyToken,verifyUser,deleteUser);


module.exports = router;

