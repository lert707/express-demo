const express = require('express')
const path = require('path')

const accountRouter = express.Router()

const accountCTRL = require(path.join(__dirname,"../controllers/accountCtrl.js"))

accountRouter.get('/login',accountCTRL.getLoginPage)

module.exports = accountRouter