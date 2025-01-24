/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const moment = require('moment')

let logWithStack = function(_content){
    const obj = Object.create(null); 
    Error.captureStackTrace(obj); // use Error 捕捉堆栈\  
    let st = obj.stack.split('at ')[2].split('\n')[0].split('\\')
    console.log()
    let ms = moment(new Date()).format('YYYY/MM/DD HH:mm:ss.SSS')
    let msg = `[${ms}], ${st[st.length-1].split(')')[0]} -->> ${_content}`
    return console.log(msg)
}

module.exports = {
    atlog : logWithStack
} 