const router = require("express").Router();

const {adminLogin, } = require ('../controllers/adminController')

router.post("/adminlogin", adminLogin)


module.exports = router;