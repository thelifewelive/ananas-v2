const express = require('express');
const app = express();
const { environment } = require('./Environments/environment');
const { System } = require('./Server/Models/System');
const { User } = require('./Server/Models/User');
var io = require('socket.io')(environment.socket.port);

app.use(express.json());
app.use(express.static('Frontend', { extensions: ['html'] }));

app.systemData = new System();

io.on('connection', socket => {
  console.log(`${socket.id} connected!`);

  socket.on('start', name => {
    app.systemData.users[socket.id] = new User(name, socket.id);
  });

  socket.on('create-conservation', conservation => {
    socket.join(conservation.id, () => {
      console.log(socket.id + ' connected to room ' + conservation.id);
    });
  });

  socket.on('send-message', data => {
    socket.to(data.conservation.id).emit('receive-message', data.message);
  });

  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected! Reason: ${reason}`);
    delete app.systemData.users[socket.id];
    app.systemData.available = app.systemData.available.filter((id) => id != socket.id);
    app.systemData.removeConservation(socket.id);
  });
});

const {
  setReady,
  search
} = require('./Server/Requests/conservation');

app.post('/app/ready', setReady);
app.post('/app/search', search);

app.listen(process.env.PORT || environment.server.port, () => {
  console.log('Ananas has been started!');
  console.log('The application is listening on ' + port);
});