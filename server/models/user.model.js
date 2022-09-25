module.exports =  (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        
      },
      password: {
        type: Sequelize.STRING,
        
      },
      img: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
   User.associate = models => {
    User.hasMany(models.Post, {
      onDelete:"cascade"
    });
   };
    return User;
  };