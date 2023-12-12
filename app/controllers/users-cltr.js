const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const usersCltr = {}

usersCltr.register = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = _.pick(req.body, ['username', 'email', 'password','mobile','role']) 
    const user = new User(body) 
    try {
        const salt = await bcryptjs.genSalt() 
        const hashedPassword = await bcryptjs.hash(user.password, salt) 
        user.password = hashedPassword 
        await user.save() 
        res.status(201).json(user) 
    } catch(err){
        res.status(500).json(err)
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = _.pick(req.body, ['email', 'password']) 
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) {
            return res.status(404).json({ errors: 'invalid email / password '})
        }
        const result = await bcryptjs.compare(req.body.password, user.password)  
        if(!result) {
            return res.status(404).json({ errors: 'invalid email / password '})
        }
        const tokenData = {
            id: user._id,
            role: user.role 
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET , { expiresIn: '7d'})
        res.json({ token: token })
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = usersCltr 