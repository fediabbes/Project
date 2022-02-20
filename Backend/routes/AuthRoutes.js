const express = require('express')
const AuthSchema = require('../models/UserSchema')
const AuthRoutes = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');
const { RegisterValidation, Validator } = require('../middleware/Validation');
const isAuth = require('../middleware/isAuth');


AuthRoutes.post("/signup", RegisterValidation, Validator, async (req, res) => {

    const { email, password } = req.body
    try {
        const user = new AuthSchema(req.body)
        const found = await UserSchema.findOne({ email })
        if (found) {
            return res.status(400).send({ msg: 'User Already exists' })
        }
        const salt = 10
        const hashedPassword = bcrypt.hashSync(password, salt)
        user.password = hashedPassword

        const payload = { _id: user._id }
        const token = jwt.sign(payload, process.env.JWTSECRET)
        await user.save()
        res.status(200).send({ msg: 'Register succeeded', user, token })
    } catch (error) {
        res.status(500).send({ msg: 'Could not Register', error })
    }
})

AuthRoutes.post("/signin", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserSchema.findOne({ email })
        if (!user) {
            return res.status(400).send({ msg: 'Bad Credentials' })
        }

        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return res.status(400).send({ msg: 'Bad Credentials' })
        }

        const payload = { _id: user._id }
        const token = jwt.sign(payload, process.env.JWTSECRET)

        res.status(200).send({ msg: 'Login Succeded', user, token })
    } catch (error) {
        res.status(500).send({ msg: 'Cannot Login ', error })
    }
})

AuthRoutes.get('/me', isAuth, (req, res) => {
    res.send(req.user)
})


module.exports = AuthRoutes
