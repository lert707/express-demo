const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

app.use(express.static(path.join(__dirname,"statics")))

// 对post请求的请求体进行解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 使用session
app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized:true, cookie: { maxAge: 10 * 60000 }}))

app.all('*',(req,res,next)=>{
    if (req.url.includes('account')) {
        next()
    } else {
        if (!req.session.loginedName) {
            res.send('<script>alert("您还没有登录，请先登录");location.href="/account/login"</script>')
            return
        }
        next()
    }
})

//3.0 集成路由中间件
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
app.use('/account',accountRouter)

const studentManagerRouter = require(path.join(__dirname,'./routers/studentManagerRouter'))
app.use('/studentManager',studentManagerRouter)


//4.0 开启
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log('start OK')
})