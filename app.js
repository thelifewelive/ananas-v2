const express = require('express');
const app = express();
const { environment } = require('./Environments/environment');
const { System } = require('./Server/Models/System');
const { User } = require('./Server/Models/User');
var io = require('socket.io')(environment.socket.port);

app.use(express.json());
app.use(express.static('Frontend'));

app.systemData = new System();

io.on('connection', socket => {
  // When start the application
  console.log(`${socket.id} connected!`);

  // When user set the name and start
  socket.on('start', name => {
    app.systemData.users[socket.id] = new User(name, socket.id);
  });

  // When the user disconnected
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected!`);
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

const port = process.env.port || environment.server.port;
app.listen(port, () => {
  console.log('Ananas has been started!');
  console.log('The application is listening on ' + port);
});