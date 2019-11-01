const express = require('express');
const app = express();
const { environment } = require('./Environments/environment');

const port = process.env.port || environment.server.port;
app.listen(port, () => {
  console.log('Ananas has been started!');
  console.log('The application is listening on ' + port);
});