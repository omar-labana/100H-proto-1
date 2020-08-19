//server related
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const server = app.listen(PORT, () =>
  console.log(`Eyes on port ${PORT} ` + "http://localhost:3000/")
);
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, "./client")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});
io.on("connection", (socket) => {
  socket.on("cords", (cords) => {
    io.emit("draw", cords);
  });
  socket.on("vecs", (data) => {
    // console.log(vecs);
    socket.broadcast.emit("drawLine", data);
  });
  socket.on("msg", (data) => {
    // console.log(vecs);
    socket.broadcast.emit("printMsg", data);
  });

  socket.on("reset", () => {
    socket.broadcast.emit("clearCan");
  });
});
