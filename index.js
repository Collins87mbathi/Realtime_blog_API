const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const db = require("./models/index");
const UserRoute = require("./routers/user");
const PostRoute = require("./routers/post");
const CommentRoute = require("./routers/comment");
const RepliesRoute = require("./routers/replies");
const CategoryRoute = require("./routers/category");
const uploadRoute = require("./routers/upload");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({origin:'*'}));
app.use(fileUpload({    
  useTempFiles: true
}));

//database
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

//router
app.get('/', (req,res)=> {
 res.send("This is a realtime BLOG API");
});
app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);
app.use('/api/comment', CommentRoute);
app.use('/api/comment/replies', RepliesRoute);
app.use('/api/category',CategoryRoute);
app.use('/api/upload',uploadRoute);

//error handler
app.use((err,req,res)=> {
let errorStatus = err.status || 500;
let errorMessage = err.message || "something went wrong";
return res.status(errorStatus).json({
    success:false,
    message:errorMessage
})
})

app.listen(PORT, ()=> {
    console.log(`server is listening on ${PORT}`);
})



