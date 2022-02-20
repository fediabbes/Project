const express = require('express')
const { GetAgent, UpdateAgent, DeleteAgent, GetOneAgent } = require("../controllers/agent");
const AgentRoutes = express.Router()

AgentRoutes.get('/', GetAgent)
//Update Agent
//req.body
//req.params.id
AgentRoutes.put('/:id', UpdateAgent)
//Delete Agent
//req.params
AgentRoutes.delete('/:id', DeleteAgent)
//Get One Agent
//req.params.id
AgentRoutes.get('/:id', GetOneAgent)

module.exports = AgentRoutes