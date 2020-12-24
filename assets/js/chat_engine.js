// this is the file which is communicating from the client side
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

    //Initialize connection
    this.socket = io.connect('http://localhost:5000');
    if(this.userEmail){
        this.connectionHandler();
    }
}
connectionHandler(){
    this.socket.on('connect',function(){
        console.log('Connection established using sockets');
    });
 }
}