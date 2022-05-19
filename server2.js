const Websocket = require("ws");
const Room = require("./room");

const wss = new Websocket.Server({ port: 8080 }, () => {
  console.log("start");
});

wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const data1 = JSON.parse(data);
    if (data1.type == "connect") {
      ws.id = data1?.id;

      console.log(data1);
      Room.joinRoom(ws.id, ws, data1?.room);
    } else if (data1.type == "play") {
      Room.getRoom("1").forEach((e) => {
        if (e.id != ws.id) {
          e.socket.send(data1.type + "-" + JSON.stringify(data1));
        }
      });
    }
  });
});

wss.on("listening", () => {
  console.log("listening in 8080");
});
