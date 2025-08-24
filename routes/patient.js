const Controller = require("../controllers/controller");
const router = require(`express`).Router();

router.get(`/:userid`, Controller.home)
// router.get(`/appointmentlist`, Controller.home)
router.get(`/:userid/newAppointment`, Controller.getNewAppointment)
router.post(`/:userid/newAppointment`, Controller.postNewAppointment)
router.get(`/:userid/appointmentList`, Controller.appointmentList)


module.exports = router