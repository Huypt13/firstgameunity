const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

server.listen(process.env.PORT || 8080, () => {
  console.log("thanh cong");
});
//create socket io
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("aaa");
  console.log("connect", socket.id);
});

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "a.html"));
});
