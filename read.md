##集群
socket.io 单台实现聊天 只需要维护io这一个对象即可
但是集群以后每台机器的io对象都不一样,socket会随机连接到其中一台上
为了解决这个问题 可以使用redis对io进行维护

##socket.io-redis
使用socket.io-redis实现聊天功能 只需要使用io.to方法即可
群聊的话就是把所有用户加入房间
私聊的话由于io.sockets对象在不同机器上无法维护，但是socket.io-redis会为每个socket创建一个房间
所以只需要使用io.to(socket.id)即可
