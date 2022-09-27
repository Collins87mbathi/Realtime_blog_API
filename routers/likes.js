const router = require("express").Router();
const {verifyUser} = require("../utils/verifyToken");
const db = require("../models/index");
const Likes = db.likes;

router.post("/", verifyUser, async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;
  
    const found = await Likes.findOne({
      where: { postId: postId, userId: userId },
    });
    if (!found) {
      await Likes.create({ postId: postId, userId: userId });
      res.json({ liked: true });
    } else {
      await Likes.destroy({
        where: { postId: postId, userId: userId },
      });
      res.json({ liked: false });
    }
  });


module.exports = router;