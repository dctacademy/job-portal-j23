const mongoose = require('mongoose') 
const User = require('../app/models/user-model')

const runScript = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/job-portal-j23')
        console.log('connected to db')
        
        const user = new User({ 
            username: "admin",
            email: "admin@gmail.com",
            password: "secret123", 
            role: "admin" 
        })
        const checkUser = await User.findOne({ email: user.email })
        if(checkUser) {
            console.log('account already created')
        } else {
            await user.save()
            console.log('user created', user)
        }
        await db.disconnect()
        console.log('db connection closed')
    } catch(e) {
        console.log('error connecting to db',e)
    }
}

runScript()