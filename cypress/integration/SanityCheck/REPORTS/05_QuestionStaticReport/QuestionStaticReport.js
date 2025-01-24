/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var exam = {}, paperInfo = {}
// var AllResp = {}, Stu1Resp = {}, Stu2Resp = {}, CorrectResp = {}
// var ExamName // = testName
// var Groupandhotspot_examName = ''
// var stu1 = {}, stu2 =  {}
// const score_candidate = ["10","20"]
// const grade = ["Grade1","Grade2"]
// const comment_candidate = ["Edit comment candidate1 score and publish" 
//                             ,"Edit comment candidate2 score and not publish" ]
// const radioGroup = ['Yes','No','Scores','Grades','Scores and grades']  
// const cmds = ['Publish to selected candidates','Publish to all','Unpublish results for selected candidates','Unpublish results for all']                 
// const gradeMsg = {
//    scoreUpdated: 'The score was updated.',
//    gradeMapSaved: 'The publish settings were updated.',
//    startGeneratePDF: 'Start generating candidate responses PDF files. You can click ',
//    finishGeneratePDF: 'Candidate responses PDF files were generated. You can click'
//     }
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
// Given('Course manager login system', () => {
//     cy.LoginExamAsExamAdmin(false)
// });
// Given('I can enter question statistics report', () => {
//     Cypress.PageAdminCommon.clickLeftNaviAndJump('Reports')
//     let cardInfo = {
//         title: 'Question statistics report',
//         des: 'View and export question statistics report.'
//     }
//     Cypress.PageReport.verifyReportCard(1, cardInfo)
//     Cypress.PageReport.enterStaicReport(1, 16000)
// });
// Then(/^Filter by (.*) at (.*) index$/, (_Name,_index) => {
//     let filter = [ExamInfo1.CourseName, Groupandhotspot_examName, ExamInfo1.Questions[0].type]
//     Cypress.PageQuestionReport.Filter(_index,filter[_index])
//     let cols = [
//         {
//             index: 1,
//             display: 'Course code',
//             value: ExamInfo1.CourseCode
//         },
//         {
//             index: 3,
//             display: 'Exam name',
//             value:  Groupandhotspot_examName
//         }, 
//         {
//             index: 5,
//             display: 'Type',
//             value:  ExamInfo1.Questions[0].type
//         }
//     ];
//     let G1 = {
//         rowIndex: 1,
//         columns:cols[_index]
//     }  
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });
// Then(/^Clear filter by (.*) at (.*) index$/, (_Name,_index) => {
//     Cypress.PageQuestionReport.clearFilter(_index) 
// });
// Then('Search question content', () => {
//     Cypress.PageQuestionReport.search(ExamInfo1.Questions[0].questioncontent)
//     // Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
// });
// Then('Clear search', () => {
//     Cypress.PageQuestionReport.clearSearch()
// });
// Then('Question colums are displayed right', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Course code',
//                 value: ExamInfo1.CourseCode
//             },
//             {
//                 index: 2,
//                 display: 'Course name',
//                 value:  ExamInfo1.CourseName
//             },
//             {
//                 index: 3,
//                 display: 'Exam name',
//                 value:  Groupandhotspot_examName
//             },
//             {
//                 index: 4,
//                 display: 'Question index',
//                 value:  ExamInfo1.Questions[0].questionIndex
//             },
//             {
//                 index: 5,
//                 display: 'Question content',
//                 value:  ExamInfo1.Questions[0].questioncontent
//             },
//             {
//                 index: 6,
//                 display: 'Type',
//                 value:  ExamInfo1.Questions[0].type
//             },
//             {
//                 index: 7,
//                 display: 'Difficulty',
//                 value:  ExamInfo1.Questions[0].difficulty
//             },
//             {
//                 index: 8,
//                 display: 'Number of candidates marked',
//                 value:  ExamInfo1.Questions[0].Numofcandidatesmarked
//             },
//             {
//                 index: 9,
//                 display: 'Accuracy rate',
//                 value:  ExamInfo1.Questions[0].Accuracyrate
//             },
//             {
//                 index: 10,
//                 display: 'Error rate',
//                 value:  ExamInfo1.Questions[0].Errorrate
//             },
//             {
//                 index: 11,
//                 display: 'Scoring rate',
//                 value:  ExamInfo1.Questions[0].Scoringrate
//             },
//             {
//                 index: 12,
//                 display: 'Full marks',
//                 value:  ExamInfo1.Questions[0].fullmarks
//             },
//             {
//                 index: 13,
//                 display: 'Highest score',
//                 value:  ExamInfo1.Questions[0].HighestScore
//             },
//             {
//                 index: 14,
//                 display: 'Lowest score',
//                 value:  ExamInfo1.Questions[0].lowestScore
//             },
//             {
//                 index: 15,
//                 display: 'Average score',
//                 value:  ExamInfo1.Questions[0].AverageScore
//             }
//         ]
//     }  
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });
// Given('I click question index link', () => {
//     Cypress.PageQuestionReport.clickQuestionIndexLink(0)
// });
// Then('Verify info is right in group view', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Group name',
//                 value: 'EditGroup1'
//             },
//             {
//                 index: 2,
//                 display: 'Number of candidates marked',
//                 value: 2
//             },
//             {
//                 index: 3,
//                 display: 'Accuracy rate',
//                 value:  "50%"
//             },
//             {
//                 index: 4,
//                 display: 'Error rate',
//                 value:  "50%"
//             },
//             {
//                 index: 5,
//                 display: 'Scoring rate',
//                 value:  "100%"
//             },
//             {
//                 index: 6,
//                 display: 'Full marks',
//                 value:  "1"
//             },
//             {
//                 index: 7,
//                 display: 'Highest score',
//                 value:  '1'
//             },
//             {
//                 index: 8,
//                 display: 'Lowest score',
//                 value:  '0.5'
//             },
//             {
//                 index: 9,
//                 display: 'Average score',
//                 value: '0.8'
//             }
//         ]
//     }; 
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });
// Given('Filter normal exam', () => {
//     Cypress.PageQuestionReport.Filter(1,ExamName)
// });
// Then('Verify info is right in option view', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Option',
//                 value: 'A'
//             },
//             {
//                 index: 2,
//                 display: 'Option value',
//                 value: 'True'
//             },
//             {
//                 index: 3,
//                 display: 'Selectance',
//                 value:  '50%'
//             },
//             {
//                 index: 3,
//                 display: 'Selectance',
//                 value:  '1 candidate'
//             }
//         ]}
//     let G2 = {
//         rowIndex: 2,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Option',
//                 value: 'B'
//             },
//             {
//                 index: 1,
//                 display: 'Option',
//                 value: 'Correct'
//             },
//             {
//                 index: 2,
//                 display: 'Option value',
//                 value: 'False'
//             },
//             {
//                 index: 3,
//                 display: 'Selectance',
//                 value:  '50%'
//             },
//             {
//                 index: 3,
//                 display: 'Selectance',
//                 value:  '1 candidate'
//             }
//         ]}
//     Cypress.PageExamGrade.verifyTableValue(G1)
//     Cypress.PageExamGrade.verifyTableValue(G2)
// });
// Then('Search choice question content', () => {
//     Cypress.PageQuestionReport.search(paperInfo.sections[0].questions[0].question.content)
// });