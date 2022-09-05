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
            type: Sequelize.JSON,
          },
          userimg: {
            type: Sequelize.JSON,
          }

    });

Post.associate = models => {
    Post.belongsTo(models.User, {
        foreignKey: "userId"
    });
}



    return Post;
}