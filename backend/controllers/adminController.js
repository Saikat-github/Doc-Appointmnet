import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


//api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, about, fees, address, experience } = req.body;
        const imageFile = req.file;

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: 'Please fill all fields' });
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter valid email' });
        }

        //validating password strength
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be atleast 8 characters long' });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;


        //add doctor to db
        const doctorData = {
            ...req.body,
            password: hashedPassword,
            image: imageUrl,
            date: Date.now()
        };

        //save to db
        const newDoctor = new doctorModel(doctorData);

        await newDoctor.save();
        res.json({ success: true, message: 'Doctor added successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



//API to remove doctor
const removeDoctor = async (req, res) => {
    try {
        const { id } = req.body;

        const doctor = await doctorModel.findById(id);
        console.log(doctor, id)
        const imgUrl = doctor.image;

        // Extract the public ID from the URL
        const publicId = imgUrl
            .split('/')
            .slice(-1)[0] // Get the last part (filename with extension)
            .split('.')[0]; // Remove the file extension

        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            await doctorModel.findByIdAndDelete(id);
            res.json({ success: true, message: "Doctor Removed" })
        } else {
            res.json({ success: false, message: 'Failed to delete image', result });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}




//API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




//API to get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}





//API to get dashboard data for admin panel 
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});

        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




//API to cancel appointment
// const appointmentCancel = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;

//         const appointmentData = await appointmentModel.findById(appointmentId);


//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         //updating doctor slots
//         let { docId, slotDate, slotTime } = appointmentData;

//         const docData = await doctorModel.findById(docId);

//         let slotsData = docData.slots_booked;
//         slotsData[slotDate] = slotsData[slotDate].filter(e => e !== slotTime);

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsData });

//         res.json({ success: true, message: "Appointment Cancelled" })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }



export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminDashboard, removeDoctor };