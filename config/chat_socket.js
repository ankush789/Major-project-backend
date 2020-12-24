//this will work as an observer (on the server side) which will receive the
//incoming connection
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
    cors: {
    origin: "http://localhost:9000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
    });
    io.sockets.on('connection',function(socket){
        console.log('New Connection received',socket.id);
         //Automatic disconnects event
        socket.on('disconnect',function(){
        console.log('Socket Disconnected');
    });
});   
}