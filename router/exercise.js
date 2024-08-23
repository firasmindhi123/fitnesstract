const express =require('express')
const router =express.Router()
const exercise =require('../controller/exerciseController')
const exerciseController=require('../controller/exerciseController')
router.get('/detail',exerciseController.getexercises)
router.post('/update/:id',exerciseController.updateExercise)
router.delete('/delete/:id',exerciseController.deleteExercise)

module.exports =router