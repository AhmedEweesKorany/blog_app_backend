const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    admin: {
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        default: ''
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        required: false,
    }
},{timestamps:true})

userSchema.methods.generateJWT = async function(){

    return await jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: '30d'});
}

userSchema.methods.passwordCompare = async function(pass){
    return await bcrypt.compare(pass, this.password);
}




module.exports = mongoose.model('User', userSchema);    