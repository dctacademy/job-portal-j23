const Recruiter = require('../models/recruiter-model')

const recruiterValidationSchema = {
    userId: {
        custom: {
            options: async function(value, { req } ){
                const recruiter = await Recruiter.findOne({ userId: req.user.id })
                if(recruiter){ 
                    throw new Error('Company already created')
                }  else {
                    return true 
                }
            }
        }
    },
    companyName: {
        notEmpty: {
            errorMessage: 'company name is required'
        }
    },
    website: {
        notEmpty: {
            errorMessage: 'website is required'
        },
        isURL: {
            errorMessage: 'invalid url'
        }
    },
    details: {
        notEmpty:{
            errorMessage: 'descriptio is required'
        },
        isLength: {
            options: { min: 10},
            errorMessage: 'minimum details is required'
        }
    }
}

module.exports = recruiterValidationSchema