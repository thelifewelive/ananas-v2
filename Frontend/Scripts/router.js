let name;
let conservation;

function login() {
    hide_show('#main-banner', '#lobby');
}

function start() {
    name = document.getElementById('name').value;
    if (name !== '' && name !== undefined) {
        socket_start(name);
        hide_show('#lobby', '#chat');
    }
}

function ready() {
    socket_ready();
    show('#looking-for');
}

function start_conservation(data) {
    conservation = data;
    if (data.host.name == name) {
        document.getElementById('oponent').innerText = data.client.name;
    } else {
        document.getElementById('oponent').innerText = data.host.name;
    }
    hide_show('#looking-for', '#connected-to');
    hide_show('#ready', '#controls');
    socket_create_conservation(conservation);
}

function send_message() {
    const message = document.getElementById('message').value;
    document.getElementById('message').value = "";
    const messageUI = document.createElement('div');
    messageUI.className = "message user";
    messageUI.innerHTML = message;
    document.getElementById('message-container').append(messageUI);
    document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight;
    socket_send_message({ conservation: conservation, message: { from: name, message: message } });
}