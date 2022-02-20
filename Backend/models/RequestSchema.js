
const mongoose = require('mongoose')

const ReqSchema = new mongoose.Schema({
    datedebut: Date,
    datefin: Date,
    justification: String,
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthSchema' }
})

module.exports = mongoose.model('ReqSchema', ReqSchema)