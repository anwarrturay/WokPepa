const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    telephone:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profession:{
        type: String,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    roles: {
        USER: {
            type:Number,
            default: 2004
        },
        ADMIN: {
            type: Number,
            default: null
        }
    },
    refreshToken: { type: String }

}, { timestamps: true })

module.exports = mongoose.model("User", usersSchema);