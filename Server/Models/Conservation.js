class Conservation {

  constructor(host, client, id) {
    this.host = host;
    this.client = client;
    this.id = id;
    this.messages = new Array();
  }

}

module.exports = { Conservation };