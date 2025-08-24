const { User, Doctor, Patient } = require(`../models`);
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
          // req.session.userId = user.id;
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
      const { name, email, password, confirmPassword, gender, age, bloodType } = req.body;
      const role = `Patient`
      if (password !== confirmPassword) {
        const err = `Password does not match!`
        return res.redirect(`/user/register?error=${err}`)
      }
      await User.create({name, password, role, email})
      const createdUser = await User.findOne({where: {email}})
      await Patient.create({gender, age, bloodType, UserId: createdUser.id})
      return res.redirect(`/user/login`);
    } catch (error) {
      console.log(error)
      res.send(error);
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
      const { name, email, password, confirmPassword, specialization, licenseNumber } = req.body;
      const role = `Doctor`;
      if (password !== confirmPassword) {
        const err = `Password does not match!`
        return res.redirect(`/user/register?error=${err}`)
      }
      await User.create({ email, name, password, role });
      const createdUser = await User.findOne({where: {email}})
      await Doctor.create({specialization, licenseNumber, UserId: createdUser.id})
      return res.redirect(`/user/login`);
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