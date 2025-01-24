/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let date = new Date()
let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate()
let flexExamInfo = {}, flex_stu1_end = '', flex_stu2_end = '', flex_stu3_end = '', sum_minute = '', extend_minute = '', answering_duration = '', candidate1_final_answeringDuration = ''
let reopen_duration = 4, flex_reopen_stu1_deadline = ''
const edit_duration = 10
const validationMessage = [
     'The exam end time must be later than the answering start time.',
     'The exam end time must be later than the current time.',
     'Enter an integer greater than zero to proceed.'
]
const addComment = 'This is a comment!'

// create exam
let ExamName = '', ExamId = '', readingStartTime = '', startTime = '', endTime = ''
let paperName = 'ATPaper_Unpublish' + new Date().toLocaleString()
let section_temp = [
     {
          name: "AT Section 1",
          description: "Choice and Essay",
          order: 1,
          questions: [
               {
                    order: 1,
                    question: ""
               }
          ]
     }
]
let examInfo = {
     name: "AT_EditExam",
     courseCode: "AT001",
     courseId: '',
     startOffset: { level: "min", off: 1 },
     startTime: "",
     duration: 5,
     endTime: "",
     isSave2LocalFile: true,
     isAppend: false,
     filePath: 'editEndTimeExam.json',
     sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 4 }]
}
let paperInfo = {
     name: paperName,
     sections: section_temp
}
let Question1 = {}
before(() => {
     cy.fixture("questionInfo").then(($ques) => {
          Question1 = $ques[0]
          section_temp[0].questions[0].question = Question1
     })
})

let system = '', invigilator1 = '', stu1 = '', stu2 = '', stu3 = ''

function duration(startTime, endTime) {
     let sum = (new Date(endTime) - new Date(startTime)) / 60000
     return sum
};

before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu1 = env[ct].Candidates[0]
     stu2 = env[ct].Candidates[1]
     stu3 = env[ct].Candidates[2]
     system = env[ct].System
     invigilator1 = env[ct].Invigilator1
})

// Scenario: Staff edit no reading open-book exam end time
Given(/^I create no reading open-book exam and answer start after 2 minutes$/, () => {
     examInfo.isOpenB = true
     examInfo.previewTime = 0
     examInfo.duration = 3,
          Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})
When(/^I enter the exam attendance page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
     cy.readFile('cypress/fixtures/editEndTimeExam.json').then(($data) => {
          ExamName = $data.examInfo.name
          ExamId = $data.examInfo.examId
          startTime = $data.examInfo.startTime
          endTime = $data.examInfo.endTime
          Cypress.PageExamHome.searchExam(ExamName)
     })
     Cypress.PageExamAttendance.enterAttendance_examing()
})
Then(/^I choose student2 and student3$/, () => {
     Cypress.PageExamAttendance.chooseStudent(1)
     Cypress.PageExamAttendance.chooseStudent(2)
})
And(/^I shorten student2 and student3 end time 1 minute$/, () => {
     Cypress.PageExamAttendance.clickEditEndBtn_Single()
     let date = new Date()
     let hour = date.getHours(), minute = date.getMinutes()
     Cypress.PageExamAttendance.editEndTime_Fixed('shorten1Min', addComment, hour, minute)
})
And(/^I verify student2 clock icon info is shorten 1 minute$/, () => {
     Cypress.PageExamAttendance.clickExamSessionHistory(1)
     let endDate = new Date(endTime)
     let yy = endDate.getFullYear(), mm = endDate.getMonth(), dd = endDate.getDate(), hh = endDate.getHours(), min = endDate.getMinutes()
     let shortMinTime = new Date(yy, mm, dd, hh, min - 1, 0)
     Cypress.PageExamAttendance.verifyExamSessionHistory(0, system.display, true, shortMinTime, addComment)
})
Then(/^I extend student1 end time to 23:30$/, () => {
     Cypress.PageExamAttendance.clickClockBtn(0)
     Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, 23, 30)
     // Cypress.PageExamAttendance.getEditMinute(0)
})
And(/^I logout$/, () => {
     cy.logoutApi()
})

// Scenario: Student home verify end time
Given(/^I login as Student1$/, () => {
     cy.LoginByLocal(stu1.userid)
})
When(/^I search the exam$/, () => {
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(ExamName)
})
Then(/^I verify exam time on card is right$/, () => {
     Cypress.PageExamAttendance.verifyCardExamTime(endTime, true)
})
When(/^I am in calendar page$/, () => {
     Cypress.PageAdminCommon.visitCalendar()
})
Then(/^I verify the exam time is right$/, () => {
     Cypress.PageCalendar.verifyExamTime(ExamName, endTime)
})

// Scenario: Student take exam
Given(/^Student1 enter exam instruction page$/, () => {
     Cypress.PageStudentTakeSampleExam.enterStartExamPage(ExamId)
})
Then(/^I verify exam information$/, () => {
     Cypress.PageStudentTakeExam.clickExamInfo()
     let examInfo = {
          examName: ExamName,
          examTime: {
               startTime: startTime,
               endTime: '2022-06-01T15:30:00.000Z'
          }
     }
     Cypress.PageStudentTakeExam.verifyExamInfo(examInfo)
     Cypress.PageStudentTakeExam.closeExamInfo()

})
When(/^I start now$/, () => {
     Cypress.PageStudentTakeExam.waitStartByTime(examInfo.startTime)
     Cypress.PageStudentTakeExam.startNow()
})
Then(/^I verify the edit time tips$/, () => {
     Cypress.PageExamAttendance.verifyStuTakeExamEditExam()
})
Then(/^I end exam$/, () => {
     Cypress.PageStudentTakeExam.endExam()
})