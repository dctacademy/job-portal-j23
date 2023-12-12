const mongoose = require('mongoose')
const { Schema, model } = mongoose 
const recruiterSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: String,
    website: String,
    details: String, 
    jobs: [Schema.Types.ObjectId]
}, { timestamps: true })

const Recruiter = model('Recruiter', recruiterSchema)

module.exports = Recruiter 