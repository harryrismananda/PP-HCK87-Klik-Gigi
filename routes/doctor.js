const Controller = require("../controllers/controller");
const { loggedIn } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/:userid`, Controller.doctorPage);
router.get(`/:userid/profile`, Controller.getDoctorProfile);
router.post(`/:userid/profile`, Controller.postDoctorProfile);

module.exports = router