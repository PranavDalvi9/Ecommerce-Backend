
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
    },
    fcmToken: {
        type: String
    },
    uid: {
        type: String,
    },
    profile_pic: {
        type: String,
    },
    auth_type: {
        type:String,
        enum: ['GOOGLE', 'FACEBOOK', 'PORTAL']
    }
}, { timestamps: true })
export default mongoose.model('user', userSchema);