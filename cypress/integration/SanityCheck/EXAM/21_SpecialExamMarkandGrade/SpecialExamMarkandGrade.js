/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// const publishBtns = ['Publish to selected candidates','Publish to all','Unpublish results for selected candidates','Unpublish results for all']                 
// const attemptTimes = 2;
// let paperName = 'ATReading_Paper' + new Date().toLocaleString()
// let readingTimeExam_Name = ''
// let specialExam = {}
// let Question = {}
// let stu1 = '', cm = ''
// let AllStuResp = {
//     Correct: {
//         Q1: { 
//             type: 'Choice',
//             answer: ["B. False"], 
//             Score: [4] ,
//             sta: 'pass'
//             }
//     },
//     Wrong: {
//         Q1: {
//             type: 'Choice',
//             answer: ["A. True"], 
//             Score: [0],
//             sta: 'pass'
//         }
//     }
// }
// let examInfo = {
//     name: "",
//     courseCode: "AT001",
//     courseId: '',
//     startOffset: {},
//     previewTime: 5,
//     startTime: "",
//     duration: 10,
//     endTime: "",
//     isopenB: '',
//     isSave2LocalFile: true,
//     studentCount: 1,
//     isAppend: false,
//     sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 4 }]
// }
// let section_temp = [
//     {
//         name: "AT Section 1",
//         description: "Choice and Essay",
//         order: 1,
//         questions: [
//             {
//                 order: 1,
//                 question: ""
//             }
//         ]
//     }
// ]
// let paperInfo = {
//     name: paperName,
//     sections: section_temp
// }

// before(() => {
//     cy.fixture("questionInfo").then(($ques) => {
//         Question = $ques[0]
//         section_temp[0].questions[0].question = Question
//     })
//     let current = Cypress.env('current_Env')
//     let ct = Cypress.env('current_ten')
//     let env = Cypress.env(current)
//     cm = env[ct].CM
//     stu1 = env[ct].Candidates[0]
//     examInfo.name = 'specialExamMark'
//     examInfo.startOffset = { level: "min", off: 2 }
//     examInfo.duration = 10
//     examInfo.isOpenB = true
//     examInfo.filePath = 'specialExamMark.json'
//     examInfo.examClassification = 1
//     examInfo.deadline = 4
//     examInfo.previewTime = 0
//     examInfo.examAttempts = 3
//     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
//     cy.CreateExamByAPI(examInfo, paperInfo)
//     cy.readFile('cypress/fixtures/specialExamMark.json').then(($data) => {
//         specialExam = $data.examInfo
//     })
//     cy.wait(500)
// })

// Given('Course manager login system', () => {
//     cy.LoginExamAsExamAdmin(false)
//     Cypress.PageAdminCommon.visitExam(15000)
//     Cypress.PageExamMark.searchExam(specialExam.name)
// });
// Given('Candidate login system', () => {
//     cy.LoginExambyUserName(false, stu1.userid)
//     Cypress.PageAdminCommon.visitExam(15000)
//     Cypress.PageExamMark.searchExam(specialExam.name)
// });
// Then('I logout', () => {
//     cy.logoutApi()
// });
// Given('Go to edit publish settings page in exam paper step', () => {
//     Cypress.PageExamHome.unpublishExam()
//     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
//     Cypress.PageExamHome.enterExamByCardTitle()
//     cy.wait(5000)
// });
// Then('Open auto publish in publish settings page', () => {
//     Cypress.PageExamGrade.clickEditPublishSetttinginExam()
//     Cypress.PageExamGrade.choiceAutoPublish(0)
//     Cypress.PageExamGrade.clickSavePublishSettting()
//     Cypress.PageExamCreate.examPublish()
// });
// Given('Candidate enter exam, input wrong answer and submit it', () => {
//     Cypress.PageStudentTakeExam.waitStartByTime(specialExam.openTime)
//     Cypress.PageStudentExam.enterExam(0)
//     Cypress.PageStudentTakeExam.startNow()
//     Cypress.PageStudentTakeExam.selectQuestion(0)
//     Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Wrong.Q1.answer[0])
//     Cypress.PageStudentTakeExam.endExam()
// });
// Then('Candidate can find auto marked score', () => {
//     Cypress.PageExamGrade.verifySubmittedPageScore(AllStuResp.Wrong.Q1.Score[0])
// });
// Then('Candidate can click view result', () => {
//     Cypress.PageExamGrade.clickSubmittedPageResult()
// });
// Given('Go to marking progress page', () => { 
//     Cypress.PageExamMark.leftNavigationTo(5)
// });
// Given('Go to grading progress page', () => {
//     Cypress.PageExamMark.leftNavigationTo(6)
// });
// Given('Click exam title into exam page', () => {
//     Cypress.PageExamHome.enterExamByCardTitle()
//     // cy.wait(5000)
// });
// Then('Verify mark score button status', () => {
//     Cypress.PageExamMark.verifyMarkScoreStatus(0,false)
// });
// Then('Verify publish all button status id disabled', () => {
//     Cypress.PageExamGrade.verifyPublishBtnStatus(1,false)
// });
// Then('Candidate enter exam, input correct answer and submit it', () => {
//     Cypress.PageStudentExam.reenterExam(0)
//     Cypress.PageStudentTakeExam.startNow()
//     Cypress.PageStudentTakeExam.selectQuestion(0)
//     Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Correct.Q1.answer[0])
//     Cypress.PageStudentTakeExam.endExam()
// });
// Then('Verify response and score is reset', () => {
//     Cypress.PageExamMark.clickMarkScore(0)
//     Cypress.PageExamMark.clickStu(0)
//     Cypress.PageExamMark.verifyScore(true,AllStuResp.Correct.Q1.Score[0])
//     Cypress.PageExamMark.verifyStuRespContent(AllStuResp.Correct.Q1)
//     Cypress.PageExamMark.closeMarkProgress()
// });
// Given('Go to view details page in grading progress', () => {
//     Cypress.PageExamGrade.clickViewDetailsBtn(0)
// });
// Then('Verify has two attempts tab and different result', () => {
//     Cypress.PageExamGrade.verifyAttmptTablenght(attemptTimes)
//     Cypress.PageExamGrade.clickAttmptTab(0)
//     const resulttable = {
//         attemp2: {
//             title: "Computed score",
//             value: AllStuResp.Correct.Q1.Score[0]},
//         attemp1: {
//             title: "Computed score",
//             value: AllStuResp.Correct.Q1.Score[0]}
//     }
//     Cypress.PageExamGrade.verifyResultInfo(2,resulttable.attemp2)
//     Cypress.PageExamGrade.clickAttmptTab(1)
//     Cypress.PageExamGrade.verifyResultInfo(2,resulttable.attemp1)
//     Cypress.PageExamGrade.closeViewDetailsPage()
// });
// Given('Publish score and and details', () => {
//     Cypress.PageExamGrade.clickPublish('Publish to all')
//     let popup = {nextAction: "publish"}
//     Cypress.PageExamGrade.confrimPublish(popup)
// });
// Given('Go to exam attempts page', () => {
//     Cypress.PageExamGrade.clickAttmptinExamCard(0)
// });
// Then('Verify exam attempts page info', () => {
//     const resulttable = [
//         {
//         title:"Attempted/Attempts",
//         value: attemptTimes + ' / ' + examInfo.examAttempts},
//         {
//         title:"No. of questions",
//         value: 1},
//         {
//         title:"Full marks",
//         value: AllStuResp.Correct.Q1.Score[0]}      
//     ];
//     Cypress.PageExamGrade.verifyPropertyTable(resulttable)
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 0,
//                 display: 'Attempt',
//                 value: 1
//             },
//             {
//                 index: 3,
//                 display: 'Score',
//                 value:  AllStuResp.Wrong.Q1.Score[0]
//             }
//         ]
//     }  
//     let G2 = {
//         rowIndex: 2,
//         columns: [
//             {
//                 index: 0,
//                 display: 'Attempt',
//                 value: 2
//             },
//             {
//                 index: 3,
//                 display: 'Score',
//                 value:  AllStuResp.Correct.Q1.Score[0]
//             }
//         ]
//     }  
//     Cypress.PageExamMark.verifyNarkScoreTable(G1)
//     Cypress.PageExamMark.verifyNarkScoreTable(G2)
// });
// Given('Click view details button in exam attempts', () => {
//     Cypress.PageExamGrade.clickViewAttemptDetailsBtn(0)
// });
// Then('Verify result matching this attempt submitted', () => {
//     const resulttable = [
//         {
//         title:"Score",
//         value: AllStuResp.Wrong.Q1.Score[0]
//         }      
//     ];
//     Cypress.PageExamGrade.verifyPropertyTable(resulttable)
// });

// Given('Wait exam end', () => {
//     let delay = new Date(specialExam.endTime) - new Date()
//     if (delay > 0) {
//         cy.log(`>>> wait for marking: ${delay/1000}s`)
//         cy.wait(delay)
//     }else{
//         cy.log(`>>> aleady end `)
//     }
// });
// Given('Unpublish candidate', () => {
//     Cypress.PageExamGrade.clickUnpublish(publishBtns[3])
//     let popup = {nextAction: "unpublish"}
//     Cypress.PageExamGrade.confrimUnPublish(popup)
// });
// Given('Open for resubmission for candidate', () => {
//     Cypress.PageExamMark.leftNavigationTo(4)
//     Cypress.PageExamAttendance.chooseStudent(0)
//     Cypress.PageExamAttendance.clickAttendanceHeaderBtn(3)
//     Cypress.PageExamAttendance.editEndTime_Flexible('edit', 0, 23, 30)
// });
// Then('Verify score and comment is clear after open for resubmission', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 8,
//                 display: 'Computed score',
//                 value: ""
//             },
//             {
//                 index: 9,
//                 display: 'Grade',
//                 value:  ""
//             }
//         ]
//     }  
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });
// Then('Verify score is clear in marking progress', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 6,
//                 display: 'Marking progress',
//                 value: "0/0 candidates marked"
//             }
//         ]
//     }  
//     Cypress.PageExamGrade.verifyTableValue(G1)
// });