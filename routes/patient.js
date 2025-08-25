const Controller = require("../controllers/controller");
const router = require(`express`).Router();

router.get(`/:UserId`, Controller.home)
// router.get(`/appointmentlist`, Controller.home)
router.get(`/:UserId/newAppointment`, Controller.getNewAppointment)
router.post(`/:UserId/newAppointment`, Controller.postNewAppointment)
router.get(`/:UserId/appointmentList`, Controller.appointmentList)
router.get(`/:UserId/appointments/:AppointmentId/prescription/:PrescriptionId/download`, Controller.downloadPrescription)


module.exports = router