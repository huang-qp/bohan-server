
const express = require("express");
const login = express.Router();
login.post("/bohan/api/login", (req, res) => {
	console.log('2222',req.body);
    let responseObject = {
        status:{code:'000000',message:'登陆成功'},
        result:{
            token:'123456789'
        }
    }
    //响应数据给客户端 
    res.send(responseObject)
});

module.exports = {login};
