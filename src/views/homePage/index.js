const express = require("express");
const homePage = express.Router();
const connect = require('../../public/connectMysql')
const common = require("../../common/index")
homePage.post("/bohan/api/fetchMenuList", (req, res) => {
    // 定义sql语句:意思为查询menu_list表
    const sql = 'select * from menu_list'
    // 执行sql语句
    connect.query(sql, (err, result) => {
        // 执行失败
        if (err) {
            let responseObject = {
                status:{code:'111111',message: err},
            }
            //响应数据给客户端
            return res.send(responseObject);
        }
        // 处理数据对象的key值（改为小驼峰命名）
        result = result.map((item)=>{
            return common.convertKey(item)
        })

        //执行成功后返回，表中的数据
        let responseObject = {
            status:{code:'000000',message:'查询成功'},
            result:result
        }
        //响应数据给客户端
        return res.send(responseObject);
    });
});
homePage.post("/bohan/api/homePage/queryHomePageTable", (req, res) => {
    // 定义sql语句:意思为查询user_info表
    let sql = "SELECT * FROM user_info"
    let flag = false
    if(
        req.body.userName||req.body.nickName||
        req.body.mobilePhoneNumber||req.body.email||
        req.body.whetherEnabledName||req.body.whetherEnabledCode||
        req.body.whetherOpen||req.body.creationTime
    ){
        sql+=" WHERE "
    }
    if (req.body.userName){
        sql += "user_name LIKE '%" + req.body.userName + "%' AND ";
        flag = true;
    }
    if (req.body.nickName){
        sql += "nick_name LIKE '%" + req.body.nickName + "%' AND ";
        flag = true;
    }
    if (req.body.mobilePhoneNumber){
        sql += "mobile_phone_number LIKE '%" + req.body.mobilePhoneNumber + "%' AND ";
        flag = true;
    }
    if (req.body.email){
        sql += "email LIKE '%" + req.body.email + "%' AND ";
        flag = true;
    }
    if (req.body.whetherEnabledName){
        sql += "whether_enabled_name LIKE '%" + req.body.whetherEnabledName + "%' AND ";
        flag = true;
    }
    if (req.body.whetherEnabledCode){
        sql += "whether_enabled_code LIKE '%" + req.body.whetherEnabledCode + "%' AND ";
        flag = true;
    }
    if (req.body.whetherOpen){
        sql += "whether_open LIKE '%" + req.body.whetherOpen + "%' AND ";
        flag = true;
    }
    if (req.body.creationTime){
        sql += "creation_time LIKE '%" + req.body.creationTime + "%' AND ";
        flag = true;
    }
    if (flag == true){
        sql = sql.substring(0, sql.length-5);
    }
    // 执行sql语句
    connect.query(sql, (err, result) => {
        // 执行失败
        if (err) {
            let responseObject = {
                status:{code:'111111',message: err},
            }
            //响应数据给客户端
            return res.send(responseObject);
        }
        // 处理数据对象的key值（改为小驼峰命名）
        result = result.map((item)=>{
            return common.convertKey(item)
        })
        // 处理数据
        result.forEach((item)=>{
            if(item.whetherOpen==='1'){
                item.whetherOpen = true
            }else{
                item.whetherOpen = false
            }
        })
        //执行成功后返回，表中的数据
        let responseObject = {
            status:{code:'000000',message:'查询成功'},
            result:{
                tableData:result,
                total:result.length,
                currentPage:1
            }
        }
        //响应数据给客户端
        return res.send(responseObject);
    });
});
module.exports = {homePage};
