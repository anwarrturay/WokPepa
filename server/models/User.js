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
        type:Number,
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
        data: Buffer,
        contentType: String
    },
    roles: {
        USER: {
            type:Number,
            default: 2004
        },
        ADMIN: Number
    },

})

module.exports = mongoose.model("User", usersSchema);