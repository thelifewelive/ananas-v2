class System {

  constructor() {
    this.users = {};
    this.available = new Array();
    this.conservations = new Array();
  }

  getUser(id) {
    return this.users[id];
  }

  removeConservation(id) {
    this.conservations = this.conservations.filter(function(conservation) {
      if(conservation.host.id !== id && conservation.client.id !== id) {
        return true;
      } else {
        return false;
      }
    });
  }

}

module.exports = { System };