/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs');
const lodashId = require('lodash-id')
const request = require('request')
const ATLog = require('./AT_Log')

let recordId = ''
let allFunctions = [
  {
    func: "Admin",
    path: "ADMIN",
    runs: []
  },
  {
    func: "Bank",
    path: "BANK",
    runs: []
  },
  {
    func: "Exam",
    path: "EXAM",
    runs: []
  },
  {
    func: "ExamStudent",
    path: "ExamStudent",
    runs: []
  },
  {
    func: "Calendar",
    path: "CALENDAR",
    runs: []
  },
  {
    func: "Reports",
    path: "REPORTS",
    runs: []
  },
  {
    func: "Header",
    path: "HEADER",
    runs: []
  }
]


exports.SaveToRemote = function (_res, _jobid, _project) {
  ATLog.atlog(' Saveing test results to local file... ')
  const adapter = new FileSync('results/run_records.json')
  const db = low(adapter)
  db._.mixin(lodashId)

  const collection = db.defaults({ posts: [] }).get('posts')
  const newposts = collection.insert({ res: _res }).write()
  recordId = newposts.id

  //console.log(newposts.id)
  ATLog.atlog(' Record Done, Run id:' + recordId)
  buildReport(_res, _jobid, _project)
}

function buildReport(_msg, _jobid, _project) {
  let ver = _msg.browserVersion.toString().split('.')[0]
  let startTime = new Date(_msg.startedTestsAt).toLocaleString()
  let header = 
    `## Cypress UI AutoTest for ${_project}:\n`+
    `> <font color="comment">Project: ${_project}</font>\n` +
    `> <font color="comment">Cypress:${_msg.cypressVersion}</font>\n` +
    `> <font color="comment">Started at:${startTime}</font>\n` +
    `> <font color="comment">Browser:${_msg.browserName}${ver}|${_msg.config.viewportWidth}*${ _msg.config.viewportHeight}</font>\n` +
    `> <font color="comment">Env:${_msg.config.baseUrl}</font>\n \r\n`

  let content = ''
  content = content + header

  let contents = assignCase2function(_msg)
  for (let c = 0; c < contents.length; c++) {
    let sta = sumStats(contents[c].runs)
    let ti_content = `> [#${contents[c].func.toString().toUpperCase()}]() \n`
    let sta_content = 
      `> Tested <font color="info">${sta[0]}</font> Scenarios in <font color="info">${contents[c].runs.length}</font> Feature \n`+
      `> Passed:<font color="info">${sta[1]}</font>, Failed:<font color="warning">${sta[2]}</font>\n` + 
      `> Duration:<font color="info">${sta[3]}s</font>\n\n`
    content = content + ti_content
    content = content + sta_content
  }

  let job = `[#${_jobid}](https://git.avepoint.net/confucius/examena/-/jobs/${_jobid})`
  let day = new Date().toLocaleDateString()
  let reportPath = "Examena_" + day.replace(/\//g, '_')
  let ft = `> Git Job: ${job}\n AT Report:[${reportPath}](http://10.1.169.171:2021/ATReport)`
  content = content + ft
  console.log(content)
  pushResults2Bot(content)
}

function assignCase2function(_res) {
  let allruns_list = _res.runs
  ATLog.atlog(`Total Runs: ${allruns_list.length}`)
  for (let r = 0; r < allruns_list.length; r++) {
    let sp = allruns_list[r].spec.name
    let part = sp.split('/')[1]
    ATLog.atlog(`retrieved test results in: ${part}`)
    for (let f = 0; f < allFunctions.length; f++) {
      if (part === allFunctions[f].path) {
        allFunctions[f].runs.push(allruns_list[r])
      }
    }
  }

  console.table(allFunctions)
  return allFunctions
}

function pushResults2Bot(_content) {
  ATLog.atlog(' Start pushing msg to wxBot... ')
  // to CypressZhuShou
  let remoteHost = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=6400cafb-25ea-4ff4-93b9-613a60a026ca'
  let _mkdata = {
    "msgtype": "markdown",
    "markdown": { "content": _content.toString() }
  }

  request({
    url: remoteHost,
    method: 'POST',
    json: true,
    headers: { 'content-type': 'application/json' },
    body: _mkdata
  },
    function (error, response, body) {
      console.log(response.statusCode)
      if (error) {
        ATLog.atlog(' !!!!!!!!!!!! Push Error !!!!!!!!!!!!!!!! ')
        console.log(error)
      }
      else {
        ATLog.atlog('>>> Push Successful ... ')
        console.log(body)
      }
    })
}

function sumStats(_runArr) {
  let totAll = 0, passAll = 0, durAll = 0, failAll = 0
  let stats = []
  for (let i = 0; i < _runArr.length; i++) {
    let tot = _runArr[i].stats.tests
    totAll = totAll + tot
    let pass = _runArr[i].stats.passes
    passAll = passAll + pass
    let fail = _runArr[i].stats.failures
    failAll = failAll + fail
    let dur = _runArr[i].stats.duration
    durAll = durAll + dur
  }
  stats = [totAll, passAll, failAll, (durAll / 1000).toFixed(2), _runArr.length]
  console.log(stats)
  return stats
}

function GetLength(str) {
  let realLength = 0, len = str.length, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128)
      realLength += 1
    else
      realLength += 2
  }
  return realLength
}

function cutString(content, length, addString) {
  let targetStr,
    addStr = addString ? addString : ''
  sliceLength = length
  targetStr = content
  if (targetStr.length <= sliceLength) {
    return content;
  }
  for (; sliceLength > 0; sliceLength--) {
    if (targetStr.charAt(sliceLength) == ' ') {
      targetStr = targetStr.slice(0, sliceLength) + addStr;
      sliceLength = length;
      break;
    }
  } return targetStr
}