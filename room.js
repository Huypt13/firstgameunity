let listUser = [];
// join
module.exports.joinRoom = (id, socket, room) => {
  let ischatting = false;
  let index = listUser.findIndex((data) => data.id == id.trim());
  if (index == -1) {
    return listUser.push({ id, socket, room });
  } else {
    listUser[index].room = room;
  }
};

exports.getById = (id) => {
  return listUser.find((data) => {
    return data.id == id;
  });
};

exports.leaveRoom = (id) => {
  let index = listUser.findIndex((data) => data.id == id);
  return listUser.splice(index, 1);
};

exports.getRoom = (room) => {
  return listUser.filter((data) => data.room == room);
};
