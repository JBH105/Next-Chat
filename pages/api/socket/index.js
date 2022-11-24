import { Server } from "socket.io";

const ioHandler = (req, res) => {
  const { method } = req;
  const io = new Server(res.socket.server);
  if (!res.socket.server.io) {
    io.on("connection", (socket) => {
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData?._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        // if (!chat.users) return console.log("chat.users not defined");

        // chat.users.forEach((user) => {
        //   if (user._id == newMessageRecieved.sender._id) return;
        // socket.in(newMessageRecieved.selectedChat).emit("message recieved", newMessageRecieved);
        socket.emit("message recieved", newMessageRecieved);
        // });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
  } else {
    console.log("socket.io already running");
  }
  res.end();
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export default ioHandler;

// import { Server } from 'socket.io'

// const ioHandler = (req, res) => {
// //   if (!res.socket.server.io) {
//     console.log('*First use, starting socket.io')

//     const io = new Server(res.socket.server)

//     io.on('connection', socket => {
//     //   socket.broadcast.emit('a user connected')
//       socket.on('hi', msg => {
//         console.log(msg );
//         socket.emit('hello', 'world!SASDASD')
//       })
//     })

//     res.socket.server.io = io
// //   } else {
// //     console.log('socket.io already running')
// //   }
//   res.end()
// }

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

// export default ioHandler
