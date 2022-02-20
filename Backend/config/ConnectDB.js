const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('       Your Database is Connected')
    } catch (error) {
        console.log(error)
    }
}
module.exports = ConnectDB