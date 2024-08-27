const express =require('express')
const router =express.Router()
const exerciseController=require('../controller/exerciseController')
const authentication= require('../autentication')
router.get('/exerciseDetail/:id',exerciseController.getExercise)
router.get('/detail',exerciseController.getexercises)
router.post('/update/:id',authentication.authenticate,exerciseController.updateExercise)
router.delete('/delete/:id',authentication.authenticate,exerciseController.deleteExercise)


module.exports =router