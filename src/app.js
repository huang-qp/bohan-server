//1.导入express包 
const express = require("express");
//2.创建web服务器 
const app = express();
//3.使用服务器名.listen()方法启动服务器 
const bodyParser = require('body-parser') 
const cors = require('cors');
const register = require("./views/register/index")
const login = require("./views/login/index")
const homePage = require("./views/homePage/index")
const user = require("./views/bohan/system/user/index")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 处理跨域
app.use(cors());
// 注册接口
app.use(register.register)
// 登陆接口
app.use(login.login)
// 首页接口
app.use(homePage.homePage)
// 用户接口
app.use(user.user)

app.listen(9999, () => { console.log("服务器启动于http://127.0.0.1"); })