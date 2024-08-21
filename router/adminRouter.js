const express =require('express')
const router =express.Router()
const user_controller =require('../controller/admin_controller')
const autentication =require('../autentication')
const exercise =require('../controller/exerciseController')
router.post('/signup',user_controller.signup)
router.post('/login',user_controller.login)
router.post('/exercise',autentication.authenticate,exercise.Exercise)
module.exports =router