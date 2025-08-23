const Controller = require("../controllers/controller");
const { loggedIn } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/`, loggedIn, Controller.doctorPage);

module.exports = router