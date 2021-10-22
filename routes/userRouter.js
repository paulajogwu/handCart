const router = require("express").Router();
const users = require("../controllers/userController");



router.get('/get_user/:_id', users.getUserById);
router.post('/create_user', users.createUser);
router.post('/login', users.login);

module.exports = router;
