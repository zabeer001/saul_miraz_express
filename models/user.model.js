import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // optional: for basic validation
    },
    role: {
        type: String,
        required: true,
        default: 'user', // set default value
    }
}, {
    timestamps: true,
});

//paginate
userSchema.plugin(mongoosePaginate); // Attach the pagination plugin

const User = mongoose.model('User', userSchema);

export default User;
