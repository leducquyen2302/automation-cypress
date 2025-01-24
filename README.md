# Cypress 脚本启动

## 前提
运行时环境，应该提前安装有NodeJS

使用NPM安装以下依赖项：cypress, lowdb, lodash-id, request, multiple-cucumber-html-reporter

`npm install cypress`

`npm install lowdb`

`npm install lodash-id`

`npm install request`

`npm install multiple-cucumber-html-reporter`

## 在Node环境下 调用RunAT_Main.js脚本

启动命令：
`Node RunCy_Main.js {ProjectName} {JobID}`

`脚本接受两个参数：`

`{ProjectName}: 传入被测试系统的名字，为了后续组装Report，非必填`
`{JobID}: Git pipeline job id，为了后续组装Report， 必填`

## 运行结果
* 在运行目录同级，有一个results文件夹，存有一份含有全部详细Test result的JSON文件
* 在cypress目录的screenshots目录下有当次运行失败case的截图
* 在Git job CLI上有当次运行的报告
