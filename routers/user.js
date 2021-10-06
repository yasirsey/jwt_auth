const router = require('express').Router()

const userController = require('../controllers/user')

router.get('/', require('../middlewares/auth'), userController.getAll)

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router