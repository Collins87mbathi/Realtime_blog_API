const router = require("express").Router();
const upload = require("../utils/uploadImage");
const uploadcontroller = require("../controllers/uploadController");
const {verifyUser,verifyToken} = require("../utils/verifyToken");

router.post("/user",verifyUser,upload,uploadcontroller);
router.post("/post",upload,uploadcontroller);

module.exports = router;