const router = require("express").Router();
const {verifyUser} = require("../utils/verifyToken");
const db = require("../models/index");
const Likes = db.likes;

router.post("/", verifyUser, async (req, res) => {
    // const { postId } = req.body;
    const{userId,postId} = req.body;
  
    const found = await Likes.findOne({
      where: { userId: userId,postId: postId },
    });
    if (!found) {
      await Likes.create({userId: userId , postId: postId});
      res.json( {
        userId
       });
    } else {
      await Likes.destroy({
        where: { userId: userId , postId:postId},
      });
      res.json({ liked: false });
    }
  });


module.exports = router;