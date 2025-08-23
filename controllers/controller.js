const { User, Doctor } = require(`../models`);

class Controller {
  

  static async home(req, res) {
    try {
      res.render(`home`);
    } catch (error) {
      res.send(error);
    }
  }

  static async doctorPage(req, res) {
    try {
      res.render(`doctorHome`);
    } catch (error) {
      res.send(error);
    }
  }

  
}

module.exports = Controller;
