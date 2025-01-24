/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const report = require('multiple-cucumber-html-reporter');
const ATLog = require('./AT_Log')
let date = new Date()
let day = date.toLocaleDateString()
let reportFileName = 'Examena Daily AT Result ' + day
let reportPath = "Examena_" + day.replace(/\//g, '_')

let reportConfig = {
    jsonDir: 'results/cucumber_result/',
    reportPath: 'results/html/' + reportPath,
    reportName: reportFileName,
    displayDuration: true,
    saveCollectedJSON: true,
    pageTitle: reportFileName,
    metadata: {
        browser: {
            name: '',
            version: ''
        },
        desktop: 'Desktop',
        device: "VM",
        platform: {
            name: '',
            version: ''
        }
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project', value: '' },
            { label: 'Job Id', value: '' },
            { label: 'Cypress', value: '' },
            { label: 'Test Env', value: '' },
            { label: 'Execution Start', value: '' },
            { label: 'Execution End', value: '' },
            { label: 'Execution Duration', value: '' },
            { label: '本次运行时截图', value: '' }
        ]
    }
}

let generateReport = function (_brow, _os,  _resInfo, _startInfo) {
    ATLog.atlog(` Start to generate HTML Report: ${reportConfig.reportPath} ... ` )

    let job = 'https://git.avepoint.net/confucius/examena/-/pipelines/' + _startInfo.Job_Id
    let html_job = `<a href="${job} target="_blank">${_startInfo.Job_Id}</a>`

    let ENV =  _resInfo._env.split('//')[1].split('.')[0].toUpperCase()
    let html_env = `<a href="${_resInfo._env}" target="_blank">${ENV}</a>`

    let ScreenShotPath = 'http://10.1.169.171:2021/screenshot/' + _startInfo.Job_Id
    let html_sc = `<a href="${ScreenShotPath}" target="_blank">ScreenShot </a>`

    reportConfig.metadata.browser.name = _brow.name
    reportConfig.metadata.browser.version = _brow.ver
    reportConfig.metadata.platform.name = _os.name
    reportConfig.metadata.platform.version = _os.ver

    reportConfig.customData.data[0].value = _startInfo.Project
    reportConfig.customData.data[1].value = html_job
    reportConfig.customData.data[2].value = _resInfo._cyVer
    reportConfig.customData.data[3].value = html_env
    reportConfig.customData.data[4].value = (new Date(_resInfo._runStart)).toString()
    reportConfig.customData.data[5].value = (new Date(_resInfo._runEnd)).toString()
    reportConfig.customData.data[6].value = (_resInfo._toDur / 1000).toFixed(2) + 's'
    reportConfig.customData.data[7].value = html_sc

    console.table(reportConfig.customData.data)
    report.generate(reportConfig)
    ATLog.atlog(' Report Generation Done !')
}

module.exports = {
    generate: generateReport
}