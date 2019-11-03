const { Conservation } = require('../Models/Conservation');
const { User } = require('../Models/User');
var uniqid = require('uniqid');

function setReady(req, res) {
  req.app.systemData.available.push(req.body.id);
  res.status(200).end();
}

function search(req, res) {
  const id = req.body.id;
  
  for (let i = 0; i < req.app.systemData.conservations.length; i++) {
    // Checking that everybody is ready
    if (req.app.systemData.conservations[i].host.id === id || req.app.systemData.conservations[i].client.id === id) {
      if(req.app.systemData.conservations[i].host.id !== undefined && req.app.systemData.conservations[i].client.id !== undefined) {
        res.status(202);
        res.send(JSON.stringify(req.app.systemData.conservations[i]));
        res.end();
        return
      }
    }

    // Get a conservation
    if (req.app.systemData.conservations[i].host.id !== id && req.app.systemData.conservations[i].client.id === undefined) {
      req.app.systemData.available = req.app.systemData.available.filter((item) => item !== id);
      req.app.systemData.conservations[i].client = req.app.systemData.getUser(id);
      res.status(202);
      res.send(JSON.stringify(req.app.systemData.conservations[i]))
      res.end();
      return;
    }

    // Check if we already created a conservation
    if (req.app.systemData.conservations[i].host.id === id || req.app.systemData.conservations[i].client.id === id) {
      res.status(304);
      res.end();
      return;
    }
  }

  // Create a conservation
  req.app.systemData.available = req.app.systemData.available.filter((item) => item !== id);
  const conservation = new Conservation(req.app.systemData.getUser(id), new User(undefined, undefined), uniqid());
  req.app.systemData.conservations.push(conservation);
  res.status(201);
  res.end();
}

module.exports = {
  setReady,
  search
};