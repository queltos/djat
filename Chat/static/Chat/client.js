socket = new WebSocket("ws://" + window.location.host + "/general/?username=hihi");

socket.onmessage = function(e) {
    var para = document.createElement("P");
    var text = document.createTextNode(e.data);
    para.appendChild(text);
    document.getElementById("chat").appendChild(para);
}

socket.onopen = function() {
    socket.send("hello world");
}

function onSend() {
    // Call onopen directly if socket is already open
    if (socket.readyState == WebSocket.OPEN) socket.onopen();
}
