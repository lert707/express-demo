const express = require('express')
const path = require('path')

const accountRouter = express.Router()

const accountCTRL = require(path.join(__dirname,"../controllers/accountCtrl.js"))

// 获取登录页面
accountRouter.get('/login',accountCTRL.getLoginPage)

// 获取验证码
accountRouter.get('/vcode',accountCTRL.getVcode)

// 获取注册页面
accountRouter.get('/register',accountCTRL.toRegister)

// 注册
accountRouter.post('/register',accountCTRL.register)

// 登录
accountRouter.post('/login',accountCTRL.login)

// 退出
accountRouter.get('/loginOut',accountCTRL.loginOut)


module.exports = accountRouter