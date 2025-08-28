const Controller = require("../controllers/controller");
const { loggedIn, errorNotFound } = require("../middlewares/auth");
const router = require(`express`).Router();
const routerAuth = require(`./auth`)
const routerDoc = require(`./doctor`)
const routerPatient = require(`./patient`)



router.use(`/user`,  routerAuth)
router.use(`/doctor`, routerDoc)

router.use(`/patient`, routerPatient);


router.get(`/`, Controller.landingPage)

router.use(errorNotFound);




module.exports = router;
