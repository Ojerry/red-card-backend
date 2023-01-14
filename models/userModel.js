const mongoose = require("mongoose")

//Creating User Schema
const userSchema = new mongoose.Schema({
    personnelNo: {
        type: String,
        required: [true, 'Personnel No is Required'],
    },
    password: {
        type: String,
        select: false,
    },
    phone: {
        type: Number,
        default: null
    },
    profession: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
    cards: {
        type: Array,
        default:[]
    },
}, {
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
}, )

const User = mongoose.model('User', userSchema)

// exports.User = User
module.exports = User