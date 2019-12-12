const Koa = require('koa');
const app = new Koa()
const redis = require('socket.io-redis');
const Redis = require('ioredis');


//redis sentinels配置
const options = {
    sentinels: [
        { host: 'localhost', port: 26379 }
    ],
    name: 'name'
};



const http = require('http');
const server = http.createServer(app.callback());
const io = require('socket.io')(server,{
        "transports":['websocket', 'polling']
    }
);

io.adapter(redis({
    pubClient: new Redis(options),
    subClient: new Redis(options)
}));



//监听连接
io.on('connection',async function (socket) {
    // console.log(io,socket)

    //私聊
    socket.on("chat",msg=>{
        socket.to(msg.to,msg);
    })

    //加入房间
    socket.on("join",msg=>{
        socket.room = msg.room;
        socket.join(msg.room);
    })

    //群聊
    socket.on("room-chat",msg=>{
        io.to(socket.room).emit('room-message',msg);//只在这个房间中发送信息
    })
})


server.listen(8770);
