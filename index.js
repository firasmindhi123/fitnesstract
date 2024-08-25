const express = require('express');
const mongoose =require('mongoose')
const path =require('fs')
const port = 3000;
const route_Admin= require('./router/adminRouter.js')
const userRouter=require('./router/userRouter')
const admin =require('./model/adminModel.js')
const exerciseRouter=require('./router/exercise.js')
const Exercise =require('./model/Exercise.js')

const cors =require('cors')
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors({credentials:true,origin:"https://fitnesstract.vercel.app"}))
app.use(express.json())
app.use('/api',route_Admin);
app.use('/user',userRouter);
app.use('/exercise',exerciseRouter)
 
mongoose.connect('mongodb+srv://firas:UWJVX9NQBmiKxbZB@cluster0.vlq7rvy.mongodb.net/new_app?retryWrites=true').then(()=>{

  app.listen(3000)
}).catch((err)=>{console.log(err)})