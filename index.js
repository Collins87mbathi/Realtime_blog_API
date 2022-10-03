const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;
const db = require("./models/index");
const UserRoute = require("./routers/user");
const PostRoute = require("./routers/post");
const CommentRoute = require("./routers/comment");
const RepliesRoute = require("./routers/replies");
const CategoryRoute = require("./routers/category");
const LikeRoute = require("./routers/likes");
const multer = require("multer");
const path = require("path");
const http = require('http').Server(app);
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const ErrorHandler = require("./errorhandler/ErrorHandler");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors({ credentials:true, origin:'https://collinsblogs.netlify.app'}));


//
//client

app.use("/images", express.static(path.join(__dirname, "/images")));

//database
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

const io = new Server(http,{ 
  cors: {
    origin: "https://collinsblogs.netlify.app"
}
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
 
  let onlineUsers = [];
  //addPost event
  socket.on('addPost', (data) => {
    onlineUsers.push(data); //logs the message from the client
    socket.broadcast.emit('addPostResponse', data);
  });

  socket.on('LikePost', (data) => {
    onlineUsers.push(data); 
    socket.broadcast.emit('LikePostResponse', data);
  });

  socket.on('CommentPost', (data) => {
    onlineUsers.push(data); 
    socket.broadcast.emit('CommentPostResponse', data);
  });
 });

 

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage: storage });

//router
app.get('/', (req,res)=> {
 res.send("This is a realtime BLOG API");
});
app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);
app.use('/api/comment', CommentRoute);
app.use('/api/comment/replies', RepliesRoute);
app.use('/api/category',CategoryRoute);
app.use('/api/likes',LikeRoute);
app.post('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//error handler
app.use(ErrorHandler);



http.listen(PORT, ()=> {
    console.log(`server is listening on ${PORT}`);
})



