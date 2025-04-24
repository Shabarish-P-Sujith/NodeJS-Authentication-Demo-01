const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // only allows 'user' OR 'admin' Roles
        default: 'user',
    }
}, { timestamps: true }); // will provide me with createdAt & updatedAt

module.exports = mongoose.model('User', UserSchema);