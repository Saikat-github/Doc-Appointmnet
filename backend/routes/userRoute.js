import express from 'express';
import { bookAppointment, cancelAppointment, getUser, listAppoinment, loginUser, registerUser, updateUser, paymentRazorpay, verifyPayment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';


const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getuser',authUser, getUser);
userRouter.post('/updateuser', authUser, updateUser);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/list-appointments", authUser, listAppoinment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay)
userRouter.post("/verify-razorpay", authUser, verifyPayment);



export default userRouter;