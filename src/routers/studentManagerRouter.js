const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

const studentManagerController = require(path.join(__dirname,"../controllers/studentManagerController.js"))

// 获取学生信息列表页面
studentManagerRouter.get('/list',studentManagerController.getStudentListPage)

// 新增学生页面
studentManagerRouter.get('/add',studentManagerController.addStudentPage)

// 新增学生
studentManagerRouter.post('/add',studentManagerController.addStudent)

// 删除学生
studentManagerRouter.get('/delete',studentManagerController.deleteStudent)



module.exports = studentManagerRouter
