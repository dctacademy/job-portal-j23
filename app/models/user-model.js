const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    mobile: String 
}, { timestamps: true }) 

const User = model('User', userSchema) 

module.exports = User 

