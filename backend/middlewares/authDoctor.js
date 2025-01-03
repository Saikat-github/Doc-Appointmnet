import jwt from 'jsonwebtoken';

//doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers
        if (!dtoken) return res.json({ success: false, message: 'Access Denied' });

        const dtoken_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.body.docId = dtoken_decode.id;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Session Expired, Login Again' });
        }
        console.log(error);
        res.status(403).json({ success: false, message: 'Invalid Token' });
    }
}

export default authDoctor;