import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//DB config
connectDB();
connectCloudinary();


//api endpoints
app.use('/api/admin', adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);



app.get('/', (req, res) => res.status(200).send('Hello World'));


//listener
app.listen(port, () => console.log(`Listening on port ${port}`));