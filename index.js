const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");


dotenv.config();

const app = express();


/**
 * SOCKET IMPLEMENTATION
 */

const server = http.createServer(app);

const io = socket(server, {
  cors: { 
    allowed: "*",
  },
});
 
 io.on("connection",(socket)=>{
   console.log("user has connected!");
   
    socket.on("addUser", data =>{
     
      console.log(data)
   
    })
     io.emit("getUsers","this is from the server socket!");

   // receive message from client and then broadcast to clients
     
   socket.on("sendMessage",(msg) =>{
        io.emit("getMessage", {
          msg,
        });
        console.log("this is client message",msg);
     });

   socket.on("disconnect",()=>{
     console.log("user disconnectd!");
     io.emit("getUsers","user is disconnected!");
   });

  });
/**
 * Connection to the database
 */
mongoose
  .connect(process.env.DB_CONNECTION, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!");
  });


app.use(cors());
app.use(express.json());

/**
 * Route Middleware
 */

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);


app.use("*", (req, res, next) => {
  res.status(400).json({
    status: "error",
    message: `The requested url ${req.originalUrl} does not exist`,
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});