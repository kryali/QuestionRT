var socket = new io.Socket(null, { port: 3000, rememberTransport: false});
socket.connect();

socket.on('message', function(obj){
});
