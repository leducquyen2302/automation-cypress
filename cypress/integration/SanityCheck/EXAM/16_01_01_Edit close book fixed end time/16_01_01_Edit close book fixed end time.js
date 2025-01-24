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

// Scenario: Staff edit no reading close-book exam end time
Given(/^I create no reading close-book exam and answer start after 1 minutes$/, () => {
     examInfo.isOpenB = false
     examInfo.previewTime = 0
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})
Then(/^I login as system$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
})
When(/^I search exam$/, () => {
     cy.readFile('cypress/fixtures/editEndTimeExam.json').then(($data) => {
          ExamName = $data.examInfo.name
          readingStartTime = $data.examInfo.readTime
          endTime = $data.examInfo.endTime
          Cypress.PageExamHome.searchExam(ExamName)
     })
})
Then(/^I enter attendance page$/, () => {
     Cypress.PageExamAttendance.enterAttendance_examing()
})
Then(/^I shorten student1 end exam time before start time by clock button$/, () => {
     cy.wait(4000)
     Cypress.PageExamAttendance.clickClockBtn(0)
     Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, 1, 0)
})
Then(/^I verify the validation message1$/, () => {
     Cypress.auiCommon.verifyValiMessage(0, validationMessage[0])
})
When(/^Student1 enter exam$/, () => {
     Cypress.PageStudentTakeExam.waitStartByTime(examInfo.startTime)
     cy.StuEnterExamApi(0, 'editEndTimeExam.json')
     cy.wait(62000)
})
Then(/^I shorten student1 end exam time before current time by clock button$/, () => {
     Cypress.PageExamAttendance.clickClockBtn(0)
     let date = new Date()
     let hour = date.getHours(), minute = date.getMinutes()
     Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, hour, minute)
})
Then(/^I verify the validation message2$/, () => {
     Cypress.auiCommon.verifyValiMessage(0, validationMessage[1])
})
When(/^I extend student1 end exam time after current time and have comment by clock button$/, () => {
     Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, 23, 30)
})
Then(/^I verify studen1 exam end time、comment、background color is right$/, () => {
     Cypress.PageExamAttendance.verifyEditEndTime(addComment)
})

// Scenario: Staff edit no reading close-book exam end time and reopen it two
Then(/^Student1 submit exam$/, () => {
     cy.SubmitExamApi(0, 'editEndTimeExam.json')
})
When(/^I choose student2$/, () => {
     Cypress.PageExamAttendance.chooseStudent(1)
})
Then(/^I click ‘Edit exam end time’ button$/, () => {
     Cypress.PageExamAttendance.clickEditEndBtn_Single()
})
When(/^I extend student2 end exam time 1 minute$/, () => {
     Cypress.PageExamAttendance.editEndTime_Fixed('next1Min', addComment)
})
Then(/^I click student002 clock icon to verify exam session history$/, () => {
     Cypress.PageExamAttendance.clickExamSessionHistory(1)
     let endDate = new Date(endTime)
     let yy = endDate.getFullYear(), mm = endDate.getMonth(), dd = endDate.getDate(), hh = endDate.getHours(), min = endDate.getMinutes()
     let nextMinTime = new Date(yy, mm, dd, hh, min + 1, 0)
     Cypress.PageExamAttendance.verifyExamSessionHistory(0, system.display, true, nextMinTime, addComment)
})
When(/^I click ‘Edit exam end time for all’ button$/, () => {
     Cypress.PageExamAttendance.clickEditEndBtn_All()
})
Then(/^I verify the exam end time for all page echo student1's end time（all student latest time）$/, () => {
     Cypress.PageExamAttendance.verifyEchoTimeInDialog('2023-01-14T15:30:00.000Z')
})
When(/^I extend the time to 22:00$/, () => {
     Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, 23, 50)
})
Then(/^I verify all student end time is right on table$/, () => {
     cy.window().then(win => {
          let format = win.DefaultDateTimeFormat.Time
          if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
               var stu1_endTime = '23:30'
          }
          else {
               var stu1_endTime = '11:30 PM'
          }
          var invigInfo0 = {
               rowIndex: 1,
               columns: [
                    {
                         index: 1,
                         display: 'Candidate name',
                         value: stu1.name,
                    },
                    {
                         index: 14,
                         display: 'Exam end time',
                         value: stu1_endTime,
                    }
               ]
          }
          Cypress.PageExamCreate.verifyInvigilatorTable(invigInfo0)
     })


     cy.window().then(win => {
          let format = win.DefaultDateTimeFormat.Time
          if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
               var stu2_stu3_endTime = '23:50'
          }
          else {
               var stu2_stu3_endTime = '11:50 PM'
          }
          let invigInfo1 = {
               rowIndex: 2,
               columns: [
                    {
                         index: 1,
                         display: 'Candidate name',
                         value: stu2.name,
                    },
                    {
                         index: 14,
                         display: 'Exam end time',
                         value: stu2_stu3_endTime,
                    }
               ]
          }
          Cypress.PageExamCreate.verifyInvigilatorTable(invigInfo1)

          let invigInfo3 = {
               rowIndex: 3,
               columns: [
                    {
                         index: 1,
                         display: 'Candidate name',
                         value: stu3.name,
                    },
                    {
                         index: 14,
                         display: 'Exam end time',
                         value: stu2_stu3_endTime,
                    }
               ]
          }
          Cypress.PageExamCreate.verifyInvigilatorTable(invigInfo3)
     })
})
When(/^I click student2$/, () => {
     Cypress.PageExamAttendance.enterCandiDetail(1)
})
Then(/^I verify candidate detail page:Exam time、Exam end time modified、Comment$/, () => {
     let info = {
          candidateID: stu2.id,
          fixed_examTime: [readingStartTime, '2022-06-01T15:50:00.000Z'],
          fixed_examEndTimeModified: `${system.display} edited at `,
          fixed_comment: addComment
     }
     Cypress.PageExamAttendance.verifyCandidateDetail(info)

})
When(/^I reopen stu1 next minute$/, () => {
     Cypress.auiCommon.closePanel()
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamAttendance.clickAttendanceHeaderBtn(2)
     Cypress.PageExamAttendance.editEndTime_Fixed('next1Min', addComment)
});
Then(/^I verify stu1 submission status tooltip$/, () => {
     Cypress.PageExamAttendance.verifySubmissionStatus(0, `${system.display} opened the exam for candidate resubmission at `)
});