const Controller = require("../controllers/controller");
const { loggedIn, isPatient } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/:UserId`, loggedIn, isPatient, Controller.home)
router.get(`/:UserId/profile`, loggedIn, isPatient, Controller.getPatientProfile);
router.post(`/:UserId/profile`, loggedIn, isPatient, Controller.postPatientProfile);
// router.get(`/appointmentlist`, Controller.home)
router.get(`/:UserId/newAppointment`, loggedIn, isPatient, Controller.getNewAppointment)
router.post(`/:UserId/newAppointment`, loggedIn, isPatient, Controller.postNewAppointment)
// router.get(`/:UserId/appointmentList`, loggedIn, isPatient, Controller.appointmentList)
router.get(`/:UserId/appointments/:AppointmentId/prescription/:PrescriptionId/download`, loggedIn, isPatient, Controller.downloadPrescription)


module.exports = router