const express =require('express')
const router =express.Router()
const exercise =require('../controller/exerciseController')
const exerciseController=require('../controller/exerciseController')
router.get('/detail',exerciseController.getexercises)
module.exports =router