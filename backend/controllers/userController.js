import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import { createOrder, verifyPaymentSignature, razorpayInstance } from '../config/razorpay.js';



//API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all fields" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be atleast 8 characters" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        //save user data to database
        const newUser = new userModel(userData);
        const user = await newUser.save();

        //creating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Please fill all fields" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            //creating token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to get user data
const getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to update user data
const updateUser = async (req, res) => {
    try {
        const { userId, email, password } = req.body;
        if (email || password) {
            return res.json({ success: false, message: "You can't change your email & password" })
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, { ...req.body });
        res.json({ success: true, message: "User details updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor Not Available" })
        }

        let slotsbooked = docData.slots_booked
        //checking for slots availability
        if (slotsbooked[slotDate]) {
            if (slotsbooked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slots not available" })
            } else {
                slotsbooked[slotDate].push(slotTime)
            }
        } else {
            slotsbooked[slotDate] = [];
            slotsbooked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);

        await newAppointment.save();

        //save new slots data in doctor data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsbooked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to get user appointments for frontend my-appointments page
const listAppoinment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify appointment user
        if (appointmentData.userId != userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //updating doctor slots
        let { docId, slotDate, slotTime } = appointmentData;

        const docData = await doctorModel.findById(docId);

        let slotsData = docData.slots_booked;
        slotsData[slotDate] = slotsData[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsData });

        res.json({ success: true, message: "Appointment Cancelled" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//API to make payment of appointment using razorapy
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }


        //creation of an order
        const order = await createOrder(appointmentData.amount, process.env.CURRENCY, appointmentData._id);
        res.json({ success: true, order })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to verify payment of razorpay
const verifyPayment = async (req, res) => {
    try {
        const paymentDetails = req.body;
        // Verify the payment signature
        verifyPaymentSignature(paymentDetails);

        
        const { razorpay_order_id } = paymentDetails
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            res.json({success: true, message: "Payment successful"});
        } else {
            res.json({success: false, message: "Payment failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



export { registerUser, loginUser, getUser, updateUser, bookAppointment, listAppoinment, cancelAppointment, paymentRazorpay, verifyPayment };