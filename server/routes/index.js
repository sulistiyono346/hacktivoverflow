var express = require('express');
var router = express.Router();
var userController = require("../controllers/users")
var tagController = require("../controllers/tags")
var { isLogin } = require("../middlewares/validations")

/* GET users listing. */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Status connect server"
  })
})
router.post("/watch_tag", tagController.watch_tag)
router.get("/validate", isLogin, userController.isLogin)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get('/user',isLogin, userController.get_user)
router.put("/tags", isLogin, tagController.add_tag)
router.put("/tags_remove",isLogin, tagController.remove_tag)


module.exports = router;
