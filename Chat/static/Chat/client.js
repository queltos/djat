let socket;

function join(room) {
  if (!room) return;

  socket = new WebSocket("ws://" + window.location.host + "/" + room);

  document.getElementById("chat").innerHTML = '';

  socket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let para = document.createElement("p");
    let text = document.createTextNode(data["username"] + ": " + data["message"]);
    para.appendChild(text);
    document.getElementById("chat").appendChild(para);
  };

  socket.onopen = function () {
    let msg = document.createElement("p");
    let text = document.createTextNode("Current room: " + room);
    msg.appendChild(text);
    let roomDisplay = document.getElementById("room");
    if (roomDisplay.firstChild) {
      roomDisplay.replaceChild(msg, roomDisplay.firstChild);
    } else {
      roomDisplay.appendChild(msg);
    }
  };
}

function onSend() {
  let input = document.getElementById('msgInput');
  let msg = input.value;
  input.value = "";

  if (msg.startsWith('/join ')) {
    let room = msg.split(' ')[1];
    join(room);
  }

  if (socket.readyState === WebSocket.OPEN) socket.send(msg);
}
