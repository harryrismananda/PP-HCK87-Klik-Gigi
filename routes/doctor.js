const Controller = require("../controllers/controller");
const { loggedIn, isDoctor } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/medicines`,loggedIn, isDoctor, Controller.getMedicines);
router.get(`/:UserId`, loggedIn, isDoctor, Controller.doctorPage);
router.get(`/:UserId/profile`, loggedIn, isDoctor, Controller.getDoctorProfile);
router.post(`/:UserId/profile`, loggedIn, isDoctor, Controller.postDoctorProfile);
router.get(`/:UserId/appointments/:AppointmentId/approve`, loggedIn, isDoctor, Controller.approveAppointment);
router.get(`/:UserId/appointments/:AppointmentId/prescription`, loggedIn, isDoctor, Controller.getPrescription);
router.post(`/:UserId/appointments/:AppointmentId/prescription`, loggedIn, isDoctor, Controller.postPrescription);
router.get(`/:UserId/appointments/:AppointmentId/delete`, loggedIn, isDoctor, Controller.deleteAppointment);

module.exports = router