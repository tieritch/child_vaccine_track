const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost',
  credentials:true,
}));
dotenv.config();
const knexInstance=require('./db/connection');
const port=process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`Node server listening on the port ${port}`)
})