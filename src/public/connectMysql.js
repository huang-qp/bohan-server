// 引入模块
const mysql = require('mysql');
// 建立连接对象
const connect = mysql.createPool({
    host: "localhost", // 数据库的IP地址(本地的或者是云服务器的都可以)
    user: "root",//用户名
    password: "mysql0828",
    database: "bohan", //指定要操作哪个数据库
});
// 检测数据库是否连接成功
connect.query("select 1", (err, results) => {
  if (err) return console.log(err);
  console.log(results);
});
//如果能打印出[ RowDataPacket { '1': 1 } ]代表连接数据库成功

//导出
module.exports = connect;