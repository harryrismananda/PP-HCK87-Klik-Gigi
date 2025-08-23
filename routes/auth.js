const AuthController = require("../controllers/authController");
const Controller = require("../controllers/controller");
const router = require(`express`).Router();



router.get(`/login`, AuthController.login);
router.post(`/login`, AuthController.postLogin);
router.get(`/register`, AuthController.getRegister);
router.post(`/register`, AuthController.postRegister);
router.get(`/reg-admin`, AuthController.getDocRegister);
router.post(`/reg-admin`, AuthController.postDocRegister);
router.get(`/logout`, AuthController.logout);



module.exports = router