
const express = require("express");
const register = express.Router();
const connect = require('../../public/connectMysql')
register.post("/bohan/api/register", (req, res) => {
	console.log('11111111111',req.body);
    // 定义sql语句:意思为查询test表
    const sql = "select * from test";
    console.log('222');
    // 执行sql语句
    connect.query(sql, (err, result) => {
        // 执行失败
        if (err) {
            console.log('33333');
            return res.send({ state: 1, message: err });
        }
        //执行成功后返回，表中的数据
        console.log('444');
        return res.send({ state: 0, message: "查询成功", data: result });
    });
    // let responseObject = {
    //     status:{code:'000000'},
    //     result:{
    //     }
    // }
    // //响应数据给客户端
    // res.send(responseObject)
});

module.exports = {register};
