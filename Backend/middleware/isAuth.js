const jwt = require("jsonwebtoken")
const UserSchema = require("../models/UserSchema")


const isAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.send("You are not Authorized")
        }
        var decoded = jwt.verify(token, process.env.JWTSECRET)
        const user = await UserSchema.findById(decoded._id)
        req.user = user
        next()
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'is auth server error' }] })
    }
}

module.exports = isAuth