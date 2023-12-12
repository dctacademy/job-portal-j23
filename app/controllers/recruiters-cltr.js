const Recruiter = require('../models/recruiter-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')
const recruitersCltr = {}


recruitersCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const body = _.pick(req.body, ['companyName', 'website', 'details'])
    const recruiter = new Recruiter(body) 
    try{ 
        recruiter.userId = req.user.id 
        await recruiter.save()
        res.json(recruiter)
    } catch(e) {
        res.status(500).json(e) 
    }
}


module.exports = recruitersCltr 