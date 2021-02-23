
import express from  'express'
import * as userController from '../controllers/userController'
import * as authController from '../controllers/authController'

const router = express.Router();

router.post('/signup',authController.signUp)
router.post('/login',authController.login)

router
.route('/')
.get(authController.protect,userController.getAllUsers)
.post(authController.protect,userController.createUser);

router
.route('/:id')
.get(authController.protect,userController.getUser)
.delete(authController.protect,userController.deleteUser)
.patch(authController.protect,userController.updateUser);


export default router;