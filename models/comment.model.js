module.exports = (sequelize , Sequelize) => {
    const Comment = sequelize.define("comment", { 
      desc: {
      type: Sequelize.STRING
     },
     username:{
        type: Sequelize.STRING
     }
});

return Comment;
}