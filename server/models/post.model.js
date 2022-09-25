module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        desc:{
          type: Sequelize.TEXT  
        },
        username: {
            type:Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING,
           },
        postimg: {
            type: Sequelize.STRING,
          },
          userimg: {
            type: Sequelize.STRING,
          }

    });

Post.associate = models => {
    Post.belongsTo(models.User, {
        foreignKey: "userId"
    });
}



    return Post;
}