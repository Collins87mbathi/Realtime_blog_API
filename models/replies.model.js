module.exports = (sequelize, Sequelize) => {
    const Replies = sequelize.define("replies", { 
        desc: {
        type: Sequelize.STRING
       },
       username:{
          type: Sequelize.STRING
       },
       userimg:{
        type: Sequelize.STRING
     }
    });
    return Replies;
};