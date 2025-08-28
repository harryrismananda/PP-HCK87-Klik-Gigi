const Controller = require("../controllers/controller");
const { loggedIn } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/:UserId`, loggedIn, Controller.home)
router.get(`/:UserId/profile`, loggedIn, Controller.getPatientProfile);
router.post(`/:UserId/profile`, loggedIn, Controller.postPatientProfile);
// router.get(`/appointmentlist`, Controller.home)
router.get(`/:UserId/newAppointment`, loggedIn, Controller.getNewAppointment)
router.post(`/:UserId/newAppointment`, loggedIn, Controller.postNewAppointment)
router.get(`/:UserId/appointmentList`, loggedIn, Controller.appointmentList)
router.get(`/:UserId/appointments/:AppointmentId/prescription/:PrescriptionId/download`, loggedIn, Controller.downloadPrescription)


module.exports = router