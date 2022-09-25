const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases:0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });

  const db = {}
 db.Sequelize = Sequelize;
 db.sequelize = sequelize;
 db.user = require("./user.model")(sequelize, Sequelize);
 db.post = require("./post.model")(sequelize,Sequelize);
 db.comment = require("./comment.model")(sequelize,Sequelize);
 db.replies = require("./replies.model")(sequelize,Sequelize);
 db.category = require("./category.model")(sequelize, Sequelize)
 db.likes = require("./like.model")(sequelize,Sequelize);
 db.user.hasMany(db.post, {
    onDelete:"cascade"
 });
db.post.hasMany(db.comment,{
    onDelete:"cascade"
});
db.post.hasMany(db.likes,{
    onDelete:"cascade"
});
db.user.hasMany(db.likes,{
    onDelete:"cascade"
});
db.likes.belongsTo(db.post,{
    foreignKey:"postId"
});
db.likes.belongsTo(db.user,{
    foreignKey:"userId"
});
db.comment.belongsTo(db.post,{
    foreignKey:"postId"
});
db.user.hasMany(db.comment,{
    onDelete:"cascade"
});
db.comment.belongsTo(db.user, {
    foreignKey:"userId"
});
db.post.belongsTo(db.user, {
    foreignKey: "userId"
});
db.comment.hasMany(db.replies, {
 onDelete: "cascade"
});
db.replies.belongsTo(db.comment, {
    foreignKey:"commentId"
})
db.user.hasMany(db.replies,{
    onDelete:"cascade"
})
db.replies.belongsTo(db.user,{
    foreignKey:"userId"
})

 module.exports = db;

