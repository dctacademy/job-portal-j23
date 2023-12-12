const User = require('../models/user-model')

const passwordSchema = {
    notEmpty: {
        errorMessage: 'password is required'
    },
    isLength: {
        options: { min: 8, max: 128 },
        errorMessage: 'password should be between 8 - 128 characters'
    }
}

const registerValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username is required'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'email should be in a valid format'
        },
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(user) {
                    throw new Error('email alreay taken')
                } else {
                    return true 
                }
            }
        }
    },
    password: passwordSchema,
    role: {
        notEmpty: {
            errorMessage: 'role is required'
        },
        isIn: {
            options: [['candidate', 'recruiter']],
            errorMessage: 'role should be either candidate or recruiter'
        }
    },
    mobile: {
        notEmpty: {
            errorMessage: 'mobile is required'
        },
        isLength: {
            options: { min: 10, max: 10},
            errorMessage: 'mobile should be 10 digits'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }
    }
}

const loginValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail : {
            errorMessage: 'invalid email format'
        }
    },
    password: passwordSchema
}

module.exports = {
    registerSchema: registerValidationSchema,
    loginSchema: loginValidationSchema
}