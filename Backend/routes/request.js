const express = require('express')
const isAuth = require('../middleware/isAuth')
const RequestSchema = require('../models/RequestSchema')
const ReqRoutes = express.Router()

ReqRoutes.post('/newreq', isAuth, async (req, res) => {
    try {
        const request = new RequestSchema({
            ...req.body, agentId: req.user._id
        })
        await request.save()
        res.status(200).send({ message: 'Your Request succeded', request })
    } catch (error) {
        res.status(500).send({ message: 'Request Failed', error })
    }
})

ReqRoutes.get('/', async (req, res) => {
    try {
        const requests = await RequestSchema.find().populate('agentId')
        res.status(200).send({ message: "This is Your Requests", requests })
    } catch (error) {
        res.status(500).send({ message: 'Cannot Find your Requests', error })
    }
})

// req.params.id
ReqRoutes.get('/:id', async (req, res) => {
    try {
        const request = await RequestSchema.findById(req.params.id)
        res.status(200).send({ message: 'This is your Request', request })
    } catch (error) {
        res.status(500).send({ message: 'Cannot find your request', error })
    }
})

//req.params.id
ReqRoutes.delete('/:id', async (req, res) => {
    try {
        const request = await RequestSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Request Deleted", request })
    } catch (error) {
        res.status(500).send({ message: "Cannot delete your request", error })
    }
})

module.exports = ReqRoutes

