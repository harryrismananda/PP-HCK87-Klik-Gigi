const { User } = require(`../models`);
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
      // console.log(user)
      if (user) {
        const validate = bcrypt.compareSync(password, user.password);
        if (validate) {
          req.session.userId = user.id;
          req.session.role = user.role
          user.role === "Doctor" ? res.redirect(`/doctor/${user.id}`) : res.redirect(`/patient/${user.id}`);
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
      const { error } = req.query
      res.render(`register`, {error});
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const role = `Patient`

      if (password !== confirmPassword) {
        const errors = [{message: `Password does not match!`,
          path: "password"
        }]
        throw {name: "PasswordError" , errors}
      }

      await User.create({name, password, role, email})
      
      return res.redirect(`/user/login`);
    } catch (error) {
      // console.log(error)
      if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError" || error.name === "PasswordError") {
        let err = await User.validation(error.errors)

        res.redirect(`/user/register?error=${err}`);
      }
      res.send(error)
    }
  }

  static async getDocRegister(req, res) {
    try {
      const {error} = req.query
      res.render(`docRegis`, {error});
    } catch (error) {
      res.send(error);
    }
  }

  static async postDocRegister(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const role = `Doctor`;
      if (password !== confirmPassword) {
        const errors = [{message: `Password does not match!`,
          path: "password"
        }]
        throw {name: "PasswordError" , errors}
      }

      await User.create({ email, name, password, role });
      
      return res.redirect(`/user/login`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError" || error.name === "PasswordError") {
        let err = await User.validation(error.errors)

        res.redirect(`/user/reg-admin?error=${err}`);
      }
      res.send(error)
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