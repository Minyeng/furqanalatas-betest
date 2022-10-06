const router = require('express').Router()
const auth = require('../authorization')
const userController = require('../controllers/user.controller')

router.post('/register', userController.createUser)

router.get('/', auth, userController.getUsers)

router.get('/account/:accountNumber', auth, userController.getUserByAccountNumber)

router.get('/identity/:identityNumber', auth, userController.getUserByIdentityNumber)

router.put('/:userId', auth, userController.modifyUser)

router.delete('/:userId', auth, userController.deleteUser)

module.exports = router;