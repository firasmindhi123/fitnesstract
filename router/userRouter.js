const express =require('express')
const router =express.Router()
const user_controller =require('../controller/userController')
const autentication =require('../autentication')
const exerciseController=require('../controller/exerciseController')
router.post('/signup',user_controller.signup)
router.post('/login',user_controller.login)
router.get('/getdata',exerciseController.getexercises)
module.exports =router