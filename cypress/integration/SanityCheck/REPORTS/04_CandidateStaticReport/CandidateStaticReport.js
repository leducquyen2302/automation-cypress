/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var exam = {}, paperInfo = {}
// var AllResp = {}, Stu1Resp = {}, Stu2Resp = {}, CorrectResp = {}
// var ExamName // = testName
// var Groupandhotspot_examName = ''
// var candidate = []
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let stus = env[ct].Candidates
// candidate.push(stus[0])
// candidate.push(stus[1])
// let cm = env[ct].CM
// let statisticsReportColValues = []
// let statisticsReportRowHeaders = ['Candidate name','Candidate ID','User ID','No. of courses','No. of exams attended','No. of exams absent','Total score','Average score','Scoring rate']
// const ExamInfo1 = {
//     CourseCode:'AT003',
//     CourseName:'AutoTesting Programme 3',
//     Questions:[
//         {
//             questionIndex: 'Section A - Q1',
//             questioncontent: 'Can you pinpoint the area in which the volcano is located on the map?',
//             type: 'Hot spot',
//             difficulty: 'None',
//             Numofcandidatesmarked:2,
//             Accuracyrate: '50%',
//             Errorrate:'50%',
//             Scoringrate :'100%',
//             fullmarks: 1,
//             HighestScore:1,
//             lowestScore: 0.5,
//             AverageScore: 0.8,
//         },
//         {
//             questionIndex: 'Section A - Q2',
//             questioncontent: 'Ordering all of the examples or types of simple carbohydrates',
//             type: 'Ordering',
//             difficulty: 'None',
//             Numofcandidatesmarked:2,
//             Accuracyrate: '100%',
//             Errorrate:'0%',
//             Scoringrate :'100%',
//             fullmarks: 1,
//             HighestScore:1,
//             lowestScore: 1,
//             AverageScore: 1,
//         }
//     ]
// }
// before(() => {
//     cy.fixture('MarkExamInfo').then(($exam) => {
//         exam = $exam.examInfo
//         ExamName = exam.name
//         AllResp = $exam.AllStuResp
//         Stu1Resp = AllResp.Stu1
//         Stu2Resp = AllResp.Stu2
//         CorrectResp = AllResp.Correct
//         paperInfo = $exam.paperInfo
//         cy.log(`${exam.name}, end: ${exam.endTime}`)
       
//     })
//     cy.readFile('cypress/fixtures/hotSpotExam.json').then(($data) => {
//         Groupandhotspot_examName = $data[1]
//         cy.log(Groupandhotspot_examName)
//     })
// })
// Given('Course manager login system', () => {
//     cy.LoginExambyUserName(false,cm.loginid);
// });
// Given('I can enter candidate statistics report', () => {
//     Cypress.PageAdminCommon.clickLeftNaviAndJump('Reports')
//     let cardInfo = {
//         title: 'Candidate statistics report',
//         des: 'View and export candidate statistics report.'
//     }
//     Cypress.PageReport.verifyReportCard(3, cardInfo)
//     Cypress.PageReport.enterStaicReport(3, 16000)
// });
// Given('I unpublish score for candidate', () => {
//     cy.PublishExamResult(Groupandhotspot_examName,1,[candidate[0].userid])
// });
// Then('Get and save candidate statistics report colums for testing', () => {
//     for (var i = 0; i < 9; i++){
//         Cypress.PageExamMark.Gettablevalue(1,i + 1).then(($value) => {
//             cy.log(`$value is`+ $value.text()) 
//             let ele = $value.text()
//             statisticsReportColValues.push(ele)
//             cy.log(statisticsReportColValues) 
//         })
//     }
// });
// Given('Search candidate name', () => {
//     Cypress.PageQuestionReport.search(candidate[0].name)
//     // Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
// });
// Given('I can not filter this exam name', () => {
//     Cypress.PageQuestionReport.verifyFilterSearchResult(1,Groupandhotspot_examName,0)
// });
// Given('I publish score for candidate', () => {
//     cy.PublishExamResult(Groupandhotspot_examName,2,[candidate[0].userid])
// });
// Given('Go back in browser', () => {
//     cy.go("back")
// });
// Given('I can export candidate statistics report', () => {

// });
// Then('The report is exported successfully', () => {

// });
// Then(/^I can filter (.*) at (.*) index$/, (_Name,_index) => {
//     let filter = [ExamInfo1.CourseName, Groupandhotspot_examName]
//     Cypress.PageQuestionReport.Filter(_index,filter[_index])
//     let cols = [
//         {
//             index: 1,
//             display: 'Course code',
//             value: ExamInfo1.CourseCode
//         },
//         {
//             index: 2,
//             display: 'Exam name',
//             value:  Groupandhotspot_examName
//         } 
//     ];
//     let G1 = {
//         rowIndex: 1,
//         columns:cols[_index]
//     }  
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });

// Then('Clear search', () => {
//     Cypress.PageQuestionReport.clearSearch()
// });
// Then('Candidate statistics report colums are displayed right', () => {
//     cy.log(statisticsReportColValues)
//     let fullmarksold = parseFloat(statisticsReportColValues[6]) / parseFloat(statisticsReportColValues[8].replace('%','')/100)
//     cy.log(`full marks old is` + fullmarksold)
//     let getfullscorenew = parseFloat(statisticsReportColValues[6]) + 1.5
//     let fullmarksnew = parseFloat(fullmarksold) + ExamInfo1.Questions[0].fullmarks + ExamInfo1.Questions[1].fullmarks
//     cy.log(`full marks new is` + fullmarksnew)
//     let ExanCount = parseInt(statisticsReportColValues[4]) + 1
//     let Totalsocre = getfullscorenew
//     let avesscore = parseFloat(Totalsocre / ExanCount).toFixed()
//     // let scoringRate = ((Totalsocre / fullmarksnew)*100).toFixed().toString() 
//     let candidatStatisticsColInfo = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: statisticsReportRowHeaders[0],
//                 value: statisticsReportColValues[0]
//             }, 
//             {
//                 index: 2,
//                 display: statisticsReportRowHeaders[1],
//                 value: statisticsReportColValues[1]
//             }, 
//             {
//                 index: 3,
//                 display: statisticsReportRowHeaders[2],
//                 value: statisticsReportColValues[2]
//             }, 
//             {
//                 index: 4,
//                 display: statisticsReportRowHeaders[3],
//                 value: statisticsReportColValues[3]
//             }, 
//             {
//                 index: 5,
//                 display: statisticsReportRowHeaders[4],
//                 value: ExanCount
//             }, 
//             {
//                 index: 6,
//                 display: statisticsReportRowHeaders[5],
//                 value: statisticsReportColValues[5]
//             }, 
//             {
//                 index: 7,
//                 display: statisticsReportRowHeaders[6],
//                 value: Totalsocre
//             }, 
//             {
//                 index: 8,
//                 display: statisticsReportRowHeaders[7],
//                 value: avesscore
//             }, 
//             {
//                 index: 9,
//                 display: statisticsReportRowHeaders[8],
//                 value: '%'
//             } 
//         ]
//     }
//     Cypress.PageExamGrade.verifyTableValue(candidatStatisticsColInfo)
// });
// Given('I click candidate name link', () => {
//     Cypress.PageCandidateReport.clickCandidateNameLink(0)
// });
// Then('Candidate performance report colums are displayed right', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Course name',
//                 value: ExamInfo1.CourseName
//             },
//             {
//                 index: 2,
//                 display: 'Exam name',
//                 value: Groupandhotspot_examName
//             },
//             {
//                 index: 3,
//                 display: 'Candidate exam score',
//                 value:  1.5
//             },
//             {
//                 index: 4,
//                 display: 'Exam average score',
//                 value:  ((1.5+2)/2).toFixed(1)
//             },
//             {
//                 index: 5,
//                 display: 'Exam median score',
//                 value:  ((1.5+2)/2).toFixed(1)
//             },
//             {
//                 index: 6,
//                 display: 'Exam standard deviation',
//                 value:  0.3
//             },
//             {
//                 index: 7,
//                 display: 'Exam full marks',
//                 value:  2
//             }
//         ]
//     }; 
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });
// Then('Candidate performance report infomation are displayed right', () => {
//     const resulttable = [
//         {
//         title:"Candidate ID",
//         value: statisticsReportColValues[1]},
//         {
//         title:"User ID",
//         value: statisticsReportColValues[2]},
//         {
//         title:"No. of courses",
//         value: statisticsReportColValues[3]},
//         {
//         title:"No. of exams",
//         value: statisticsReportColValues[4]},
//         {
//         title:"Total score",
//         value: statisticsReportColValues[6]},
//         {
//         title:"Average score",
//         value: statisticsReportColValues[7]}      
//     ];
//     Cypress.PageExamGrade.verifyPropertyTable(resulttable)
// });
