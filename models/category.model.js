module.exports = (sequelize , Sequelize) => {
    const Category = sequelize.define("category", { 
      title: {
      type: Sequelize.STRING
     },
     
});

return Category;
}