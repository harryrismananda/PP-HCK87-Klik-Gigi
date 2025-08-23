const { User, Doctor } = require(`../models`);
const bcrypt = require(`bcryptjs`);

class AuthController {
  static async login(req, res) {
    try {
      const { error } = req.query;
      res.render(`login`, { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const error = `invalid username/password`;

      if (user) {
        const validate = bcrypt.compareSync(password, user.password);
        if (validate) {
          req.session.userId = user.id;
          user.role === "Doctor" ? res.redirect(`/doctor`) : res.redirect(`/`);
        } else {
          res.redirect(`/user/login?error=${error}`);
        }
      } else {
        res.redirect(`/user/login?error=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async getRegister(req, res) {
    try {
      res.render(`register`);
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      const role = `Patient`;
      await User.create({ email, name, password, role });
      res.redirect(`/user/login`);
    } catch (error) {
      res.send(error);
    }
  }

  static async getDocRegister(req, res) {
    try {
      res.render(`docRegis`);
    } catch (error) {
      res.send(error);
    }
  }

  static async postDocRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      const role = `Doctor`;
      await User.create({ email, name, password, role });
      res.redirect(`/user/login`);
    } catch (error) {
      res.send(error);
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw err;
        } else {
          res.clearCookie('connect.sid')
          res.redirect("/user/login")
        }
      });
    } catch (error) {
      res.send(error);
    }
  }



}

module.exports = AuthController