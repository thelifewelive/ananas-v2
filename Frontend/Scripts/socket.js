const socket = io('http://localhost:3000');
const searchTiming = 2000;

function socket_start(name) {
  socket.emit('start', name);
}

function socket_ready() {
  socket.emit('set_ready');
  const data = { id: socket.id };
  let request = new Request('/app/ready', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  fetch(request);
  const ready = false;
  const search = setInterval(function () {
    fetch(new Request('/app/search', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })).then(response => {
      if (response.status == 202) {
        return response.json();
      } else {
        return { status: "searching" };
      }
    })
      .then(data => {
        if (data.status == undefined) {
          clearInterval(search);
          start_conservation(data);
        }
      })
  }, searchTiming);
}

function socket_create_conservation(data) {
  socket.emit('create-conservation', data);
}

function socket_send_message(data) {
  socket.emit('send-message', data);
}

socket.on('receive-message', data => {
  const messageUI = document.createElement('div');
  messageUI.className = "message oponent";
  messageUI.innerHTML = data.message;
  document.getElementById('message-container').append(messageUI);
  document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight;
}); 