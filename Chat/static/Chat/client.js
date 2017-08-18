var socket;

function onJoin() {
    var room = document.getElementById("roomInput").value;
    var user = document.getElementById("userInput").value;

    if(room && user) {
        socket = new WebSocket("ws://" + window.location.host + "/" + room + "/?username=" + user);

        socket.onmessage = function(e) {
            var data = JSON.parse(e.data);
            var para = document.createElement("P");
            var text = document.createTextNode(data["username"] + ": " + data["text"]);
            para.appendChild(text);
            document.getElementById("chat").appendChild(para);
        }

        socket.onopen = function() {
            var para = document.createElement("P");
            var text = document.createTextNode(room);
            para.appendChild(text);
            document.getElementById("rooms").appendChild(para);
        }
    }
}

function onSend() {
    var msg = document.getElementById('msgInput').value;

    if (socket.readyState == WebSocket.OPEN) socket.send(msg);
}
