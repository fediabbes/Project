const express = require('express')
const ConnectDB = require('./config/ConnectDB')
const AgentRoutes = require('./routes/agent')
const AuthRoutes = require('./routes/AuthRoutes')
const ReqRoutes = require('./routes/request')
const app = express()
app.use(express.json())
require('dotenv').config()



app.use('/api/auth', AuthRoutes)
app.use('/api/agent', AgentRoutes)
app.use('/api/request', ReqRoutes)

ConnectDB()
app.listen(process.env.PORT, () => console.log(`   Port is running on LocalHost : ${process.env.PORT}`))

