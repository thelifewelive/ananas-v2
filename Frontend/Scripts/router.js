let name;

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
    hide_show('#ready', '#next-con');
    show('#looking-for');
}

function start_conservation(data) {
    if (data.host.name == name) {
        document.getElementById('oponent').innerText = data.client.name;
    } else {
        document.getElementById('oponent').innerText = data.host.name;
    }
    hide_show('#looking-for', '#connected-to');
    socket_create_conservation(data);
}