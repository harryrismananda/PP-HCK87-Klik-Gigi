const Controller = require("../controllers/controller");
const { loggedIn } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/medicines`,loggedIn, Controller.getMedicines);
router.get(`/:UserId`, loggedIn, Controller.doctorPage);
router.get(`/:UserId/profile`, loggedIn, Controller.getDoctorProfile);
router.post(`/:UserId/profile`, loggedIn, Controller.postDoctorProfile);
router.get(`/:UserId/appointments/:AppointmentId/approve`, loggedIn, Controller.approveAppointment);
router.get(`/:UserId/appointments/:AppointmentId/prescription`, loggedIn, Controller.getPrescription);
router.post(`/:UserId/appointments/:AppointmentId/prescription`, loggedIn, Controller.postPrescription);
router.get(`/:UserId/appointments/:AppointmentId/delete`, loggedIn, Controller.deleteAppointment);

module.exports = router