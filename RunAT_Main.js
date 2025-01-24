/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const cypress = require("cypress")
var domain = require('domain')
const reportor = require("./report")
const RunHelper = require('./RunHelper')
const ATLog = require('./AT_Log')

let allCasePath = 'cypress/integration/SanityCheck/**/*.feature'
let testPath = 'cypress/integration/SanityCheck/ADMIN/*.feature'


ATLog.atlog('========================== AutoTest Script Start ...  =============================')
if (process.argv.length < 3) {
  ATLog.atlog("!!!!!!! Must specify Argvs for autotest, script quit")
  return 1
}
let startInfo = {
  Project: 'Examena',
  Job_Id: process.argv[2],
  Scope: allCasePath
}
ATLog.atlog(" Start Autotesting script with following argvs:")
console.table(startInfo)

let runOption = {
  browser: "chrome",
  config: {
    viewportWidth: 1920,
    viewportHeight: 1080
  },
  spec: startInfo.Scope,
  noExit: true,
  headed: false
}

let startCyTest = function () {
  cypress.run(runOption)
    .then((results) => {
      ATLog.atlog(' Cypress Run Complete ! ')
      let brow = {
        name: results.browserName,
        ver: results.browserVersion
      }
      let os = {
        name: 'windows',
        ver: results.osVersion
      }
      ATLog.atlog(' start build reports progress ... ')
      RunHelper.SaveToRemote(results, startInfo.Job_Id, startInfo.Project)
      let resultInfo = {
        _cyVer: results.cypressVersion,
        _env: results.config.baseUrl,
        _runStart: results.startedTestsAt,
        _runEnd: results.endedTestsAt,
        _toDur: results.totalDuration
      }
      reportor.generate(brow, os, resultInfo, startInfo)
    }).catch((err) => {
      console.error(err)
    })
}


var d = domain.create()
d.on('error', (err) => {
  ATLog.atlog(' capture an error ...')
  console.log(err)
})
d.run(() => {
  ATLog.atlog(' Try to start Cypress runner ...')
  startCyTest()
})