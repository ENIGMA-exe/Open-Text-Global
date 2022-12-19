var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var cors = require('cors');
var socket = require('socket.io');

var PORT = process.env.PORT || 8000;
var app = express();


app.set("view engine","hbs")

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/views"))

//http req type end point....
app.get('/',(req,res)=>{
  res.render("index.hbs")
})

const server = app.listen(PORT,async (req,res)=>{
  //console.log(`server listen @ ${PORT}`)
})

//setup socket.....
var io = socket(server);

io.on('connection',(socket)=>{
    //console.log("socket connection is working",socket.id)
    
    //reciving data from any of the node that connected to this server...
    socket.on('chat',(data)=>{

        //after reciving data, emit data to all other nodes that are connected to the server...
        io.sockets.emit('chat',data);
    })


    //broadCasting
    //after reciving data, emit/send data to all other nodes that are connected to the server,except the node from which it will get the data...
    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data)
    })
    
    //broadcasting when input text is null
    socket.on("null-typ",()=>{
        socket.broadcast.emit("null-typ",{})
    })
})
