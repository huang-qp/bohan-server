/**
 * @description: 将对象的key下划线改为驼峰命名
 * @param {Object} obj 要替换的数据对象
 * @author:hqp
 * @return:Object 处理好的数据对象
 * @example：
 */
const convertKey = obj => {
    // 先判断是否是对象

    if (typeof obj !== 'object' || !obj) return obj

    const newObj = {}
    for (const key in obj) {
        // 判断key是否是这个对象的
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // 全局匹配下划线 然后转换为大写字母
            let newKey = key.replace(/_([a-z])/g, res => res[1].toUpperCase())
            // 递归 (取到的时间为空对象'{}',将时间做成了对象去做处理 没有在第一个判断处返回)
            newObj[newKey] = JSON.stringify(convertKey(obj[key]))=='{}'?obj[key]:convertKey(obj[key])
        }
    }
    return newObj
}
module.exports = {convertKey};