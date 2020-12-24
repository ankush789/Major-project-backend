// this is the file which is communicating from the client side
class ChatEngine{
    constructor(chatBoxId, userEmail, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.name = userName;

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

    //Sending messages on clicking on send button
    $('#send-message').click(function(){
        let msg = $('#chat-message-input').val();

        if(msg != ''){
            self.socket.emit('send_message', {
                message: msg,
                user_email: self.userEmail,
                name: self.name,
                chatroom:'codeial'
            });
        }
    });

    //Detecting receive_message event and adding message to the list
    self.socket.on('receive_message',function(data){
        console.log('message received',data.message);

        let newMessage = $('<li>');

        let messageType = 'other-message';

        if(data.user_email == self.userEmail){
            messageType = 'self-message';
            console.log("reached################");
        }

        newMessage.append($('<span>', {
            'html':data.message
        }));

        newMessage.append($('<sub>', {
            'html': data.name
        }));

        newMessage.addClass(messageType);

        $('#chat-messages-list').append(newMessage);
    });
 }
}