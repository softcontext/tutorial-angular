// const WebSocket = require('ws');
//
// module.exports = (server) => {
//   const wss = new WebSocket.Server({ server });
//
//   wss.on('connection', (ws, req) => {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     console.log('New Client Connected. IP: ', ip);
//
//     ws.on('message', (message) => {
//       console.log(message);
//     });
//
//     ws.on('error', (error) => {
//       console.error(error);
//     });
//
//     ws.interval = setInterval(() => {
//       if (ws.readyState === ws.OPEN) {
//         ws.send('A Message Is Sending From Server To Client.');
//       }
//     }, 3000);
//
//     ws.on('close', () => {
//       console.log('A Client Disconnected. IP: ', ip);
//       clearInterval(ws.interval);
//     });
//   });
// };






const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, {
    path: '/socket.io'
  });

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새 클라이언트 접속!', ip, socket.id, req.id);

    // 커스텀 이벤트:
    // 클라이언트에서 'reply'라는 이벤트명으로 데이터를 보낼 때 cb 함수가 기동한다.
    socket.on('reply', (data) => {
      console.log(data);
    });

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
  });
};





// const SocketIO = require('socket.io');
// const axios = require('axios');
//
// module.exports = (server, app, sessionMiddleware) => {
//   const io = SocketIO(server, {
//     path: '/socket.io'
//   });
//
//   io.use((socket, next) => {
//     sessionMiddleware(socket.request, socket.request.res, next);
//   });
//
//   // 라우터에서 io 객체를 쓸 수 있게 저장해 둔다.
//   app.set('io', io);
//
//   // 네임스페이스를 부여한다. 같은 네임스페이스끼리만 데이터를 전달한다.
//   // 네임스페이스마다 각각 이벤트 리스너를 붙일 수 있다.
//   const room = io.of('/room');
//   const chat = io.of('/chat');
//
//   room.on('connection', (socket) => {
//     console.log('room 네임스페이스에 접속');
//
//     socket.on('disconnect', () => {
//       console.log('room 네임스페이스 접속 해제');
//     });
//   });
//
//   chat.on('connection', (socket) => {
//     console.log('chat 네임스페이스에 접속');
//
//     // socket.request.headers.referer를 통해 현재 웹 페이지의 URL을 가져온다.
//     const req = socket.request;
//     const { headers: { referer } } = req;
//     const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');
//
//     socket.join(roomId);
//
//     socket.to(roomId).emit('join', {
//       user: 'system',
//       chat: `${req.session.color}님이 입장하셨습니다.`
//     });
//
//     socket.on('disconnect', () => {
//       console.log('chat 네임스페이스 접속 해제');
//       socket.leave(roomId);
//
//       const currentRoom = socket.adapter.rooms[roomId];
//       const userCount = currentRoom ? currentRoom.length : 0;
//
//       if (userCount === 0) {
//         axios.delete(`http://localhost:3000/room/${roomId}`).then(() => {
//           console.log('방 제거 요청 성공');
//         }).catch((error) => {
//           console.error(error);
//         });
//       } else {
//         socket.to(roomId).emit('exit', {
//           user: 'system',
//           chat: `${req.session.color}님이 퇴장하셨습니다.`
//         });
//       }
//     });
//   });
// };
