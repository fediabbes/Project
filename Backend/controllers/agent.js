const UserSchema = require("../models/UserSchema")

exports.GetAgent = async (req, res) => {
    try {
        const agent = await UserSchema.find()
        res.status(200).send({ message: 'This is your Agents', agent })
    } catch (error) {
        res.status(500).send({ message: 'Cannot find your Agents', error })
    }
}
exports.UpdateAgent = async (req, res) => {
    try {
        const agent = await UserSchema.findByIdAndUpdate(req.params.id, { $set: { ...req.body } })
        res.status(200).send({ message: 'Your Agent is Updated', agent })
    } catch (error) {
        res.status(500).send({ message: 'Cannot Update your Agent', error })
    }
}
exports.DeleteAgent = async (req, res) => {
    try {
        const agent = await UserSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: 'Your Agent is Deleted', agent })
    } catch (error) {
        res.status(500).send({ message: 'Cannot Delete your Agent', error })
    }
}
exports.GetOneAgent = async (req, res) => {
    try {
        const agent = await UserSchema.findById(req.params.id)
        res.status(200).send({ message: 'This is your Agent', agent })
    } catch (error) {
        res.status(500).send({ message: 'Cannot Get your Agent', error })
    }
}

