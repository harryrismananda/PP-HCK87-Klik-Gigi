const Controller = require("../controllers/controller");
const { loggedIn } = require("../middlewares/auth");
const router = require(`express`).Router();


router.get(`/medicines`, Controller.getMedicines);
router.get(`/:UserId`, Controller.doctorPage);
router.get(`/:UserId/profile`, Controller.getDoctorProfile);
router.post(`/:UserId/profile`, Controller.postDoctorProfile);
router.get(`/:UserId/appointments/:AppointmentId/approve`, Controller.approveAppointment);
router.get(`/:UserId/appointments/:AppointmentId/prescription`, Controller.getPrescription);
router.post(`/:UserId/appointments/:AppointmentId/prescription`, Controller.postPrescription);

module.exports = router