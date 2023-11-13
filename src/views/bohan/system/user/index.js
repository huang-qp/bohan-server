
const express = require("express");
const connect = require("../../../../public/connectMysql");
const common = require("../../../../common/index")
const user = express.Router();
const dayjs = require('dayjs')
// 查询用户表格数据
user.post("/bohan/api/system/user/queryUserTable", (req, res) => {
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
      // 处理时间格式
      item.creationTime = dayjs(item.creationTime).format('YYYY-MM-DD HH:mm:ss')
      item.editTime = dayjs(item.editTime).format('YYYY-MM-DD HH:mm:ss')
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
// 用户初始化
user.post("/bohan/api/system/user/initUser", (req, res) => {
  let responseObject = {
    status:{code:'000000',message:'初始化成功'},
    result:{}
  }
  //响应数据给客户端
  res.send(responseObject)
});
// 新增用户
user.post("/bohan/api/system/user/addUserInfo", (req, res) => {
  let obj = {...req.body}
  // 处理'是否启用'
  if(obj.whetherEnabledCode==='1'){
    obj.whetherEnabledName = '是'
  }else{
    obj.whetherEnabledName = '否'
  }
  // 处理'是否开启'
  if(obj.whetherOpen){
    obj.whetherOpen = '1'
  }else{
    obj.whetherOpen = '0'
  }
  // 处理创建时间
  obj.creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let sql = `INSERT INTO user_info (user_name, nick_name,mobile_phone_number,email,whether_enabled_name,whether_enabled_code,whether_open,creation_time,edit_time) 
             VALUES ( '${obj.userName}','${obj.nickName}','${obj.mobilePhoneNumber}','${obj.email}','${obj.whetherEnabledName}','${obj.whetherEnabledCode}','${obj.whetherOpen}','${obj.creationTime}','${obj.creationTime}')`;

  connect.query(sql, (err, result)=>{
    // 执行失败
    if (err) {
      let responseObject = {
        status:{code:'111111',message: err},
      }
      //响应数据给客户端
      return res.send(responseObject);
    }
    let responseObject = {
      status:{code:'000000',message:'新增成功'},
      result:{}
    }
    //响应数据给客户端
    res.send(responseObject)
  })

});
// 用户修改
user.post("/bohan/api/system/user/editUserInfo", (req, res) => {
  let obj = {...req.body}
  // 处理'是否启用'
  if(obj.whetherEnabledCode==='1'){
    obj.whetherEnabledName = '是'
  }else{
    obj.whetherEnabledName = '否'
  }
  // 处理'是否开启'
  if(obj.whetherOpen){
    obj.whetherOpen = '1'
  }else{
    obj.whetherOpen = '0'
  }
  // 处理创建时间
  obj.editTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let sql = `UPDATE user_info SET user_name = '${obj.userName}', nick_name='${obj.nickName}',mobile_phone_number='${obj.mobilePhoneNumber}',email='${obj.email}',whether_enabled_name='${obj.whetherEnabledName}',whether_enabled_code='${obj.whetherEnabledCode}',whether_open='${obj.whetherOpen}',edit_time='${obj.editTime}' WHERE id='${obj.id}'`;

  connect.query(sql, (err, result)=>{
    // 执行失败
    if (err) {
      let responseObject = {
        status:{code:'111111',message: err},
      }
      //响应数据给客户端
      return res.send(responseObject);
    }
    let responseObject = {
      status:{code:'000000',message:'新增成功'},
      result:{}
    }
    //响应数据给客户端
    res.send(responseObject)
  })

});
// 用户删除
user.post("/bohan/api/system/user/deleteUserInfo", (req, res) => {
  let obj = {...req.body}
  let idList = []
  obj.deleteDataList.forEach((item)=>{
    idList.push(item.id)
  })
  let sql = `delete from user_info where id in (${idList})`

  connect.query(sql, (err, result)=>{
    // 执行失败
    if (err) {
      let responseObject = {
        status:{code:'111111',message: err},
      }
      //响应数据给客户端
      return res.send(responseObject);
    }
    let responseObject = {
      status:{code:'000000',message:'删除成功'},
      result:{}
    }
    //响应数据给客户端
    res.send(responseObject)
  })
});
module.exports = {user};
