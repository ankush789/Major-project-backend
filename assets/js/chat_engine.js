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
    let self = this;

    this.socket.on('connect',function(){
        console.log('Connection established using sockets');
    });

    //Requesting to join the chat room
    self.socket.emit('join_room', {
        user_email: self.userEmail,
        chatroom: 'codeial'
    });

    //Detecting "user_joined" event 
    self.socket.on('user_joined',function(data){
        console.log('A user joined',data);
    });

 }
}