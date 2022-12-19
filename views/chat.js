//make connection
var socket = io.connect('https://open-text-global.herokuapp.com');

//ui-opration

var input = document.getElementById('ctxt')
var btn = document.getElementById("send")
var chatBox = document.getElementsByClassName('chat-box')[0]
const feedBack = document.getElementById('feedback')
var owner;



//taking ownwer name.....

while(owner ==+ null || owner === "" ||owner === undefined){
    owner = prompt("enter your name");
}
document.getElementsByClassName('main-heading')[0].children[1].innerText = owner;

var Socket_id;
socket.on('connect',()=>{
    Socket_id = socket.id
    console.log(Socket_id)
})


// emit event (reciving emit msg from serever)
var data = {owner:owner, msg:"",id:""}
btn.addEventListener('click',function(){
    data.id = Socket_id
    data.msg = input.value
    input.value = "";

    //emiting the msg
    socket.emit('chat',data);

},false)

// input.addEventListener('keyup',(e)=>{
    
// })

input.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        data.id = Socket_id
        data.msg = input.value
        input.value = "";

        //emiting the msg
        socket.emit('chat',data);
    }
    // if(input.value === "" || input.value === null){
    //     socket.emit("null-typ",{});
    // }
    // else{
    //     socket.emit("typing",owner)
    // }
},false)



//listen for event
socket.on('chat',(data)=>{

    if(data.id === Socket_id){
        // feedBack.style.visibility = "hidden";
        chatBox.innerHTML += `
                    <div class="chat-sub-box owner-chat">
                        <div class="sender-head">
                            You
                        </div>
                        <div class="txt">
                            ${data.msg}
                        </div>
                    </div>`
    }else{
        // feedBack.style.visibility = "hidden";
        chatBox.innerHTML += `
                    <div class="chat-sub-box">
                        <div class="sender-head">
                            ${data.owner}
                        </div>
                        <div class="txt">
                            ${data.msg}
                        </div>
                    </div>`
    }

    chatBox.scrollTo(0, chatBox.scrollHeight)
})

// socket.on('typing',(data)=>{
//     //console.log("reciving typing result")
//      console.log(feedBack);
//     feedBack.style.visibility = "visible"
//     feedBack.innerText = data + " is typing...";
// })

// socket.on("null-typ",()=>{
//     //console.log('reciving-null-typ result')
//     console.log(feedBack);
//     feedBack.style.visibility = "hidden"
// })
