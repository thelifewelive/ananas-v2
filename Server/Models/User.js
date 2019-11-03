class User {

  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  toString() {
    return this.name + ' with id ' + this.id;
  }

}

module.exports = { User };