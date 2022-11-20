import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors'

const app = express();
app.use(cors())
//KzXHBMMshNTkSL69

app.use(express.json())

app.use("/api/user",router) //http://localhost:5000/api/user/
app.use("/api/blog",blogRouter)


mongoose.connect("mongodb+srv://admin:KzXHBMMshNTkSL69@cluster0.nvk2x3i.mongodb.net/Blog?retryWrites=true&w=majority").then(()=>
app.listen(5000)).then(()=>console.log("Database Connected and Listening To Localhost:5000")).catch((err)=>console.log(err))


