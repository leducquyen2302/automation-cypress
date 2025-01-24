/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let paperName = 'ATPaper_Attendance' + new Date().toLocaleString()
let OpenExam_Name = '', CloseExam_Name = '', flexibleExam_name = '', flexibleExam_startTime = '', flexibleExam_duration = '', flexibleExam_endTime = '', exam_Id = '', fleExamInfo = {}
let Question1 = {}
let stu1 = '', stu2 = '', stu3 = '', stu4 = '', stu5 = '', stu6 = '', system = '', invigilator1 = '', invigilator2 = ''
let reEnterDate = ''
let text = 'This is auto test.'
const toast = 'The exam has been ended.'

const notstart = 'Not started'
const submitted = 'Submitted'
const subbyinvigilator = 'Submitted by invigilator'
const notsub = 'Not submitted'
const absent = 'Absent'
const present = 'Present'
const liveproctoring_status = ['Not started', 'Network disconnected', 'Compulsory submit']

const editEndTimeComment = 'This is a comment to edit end time ~'
const reopenExamComment = 'This is a comment to reopen exam ~'
const tooltips = [
     'The time when the candidate starts the exam.',
     'The exam end time that is calculated based on the exam start time.',
     'The time when the candidate starts the exam and the exam end time calculated based on the exam start time.'
]
let today = new Date()

let student001 = '', student002 = '', examName = '', instru = '', editEndStudent006 = '', reopenStudent001 = ''
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     student001 = env[ct].Candidates[0]
     student002 = env[ct].Candidates[1]
     invigilator1 = env[ct].Invigilator1.display
     invigilator2 = env[ct].Invigilator2.display
     cy.fixture("oralExamInfo.json").then(($examInfo) => {
          examName = $examInfo.examName
          instru = $examInfo.instruction
     })
})

// Scenario: Verify oral exam basic info
Given(/^I enter the attendance page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageExamAttendance.enterAttendance_examing()
})
Then(/^I verify oral exam basic info$/, () => {
     // Cypress.PageExamCreate.expandBasicInfo()
     let exanInfo = {
          firstOrganization: ['School', 'UI-school'],
          secondOrganization: ['Discipline', 'UI-discipline'],
          courseName: 'AT001 (AutoTesting Programme 1)',
          enrolledCandidate: 6,
          invigilator: invigilator1,
          administered: 6,
          fullmark_inAttendance: 1
     }
     Cypress.PageExamCreate.verifyOralExamBasicValue(exanInfo)
     Cypress.PageExamCreate.verifyMoreInvigNum(1)
     Cypress.PageExamCreate.clickMoreInvig()
     Cypress.PageExamCreate.verifyMoreInvigName(0, invigilator1)
     Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator2)
})

// Scenario: Filter class name
Given(/^Filter Class1$/, () => {
     Cypress.PageExamAttendance.Filter('Class name', 'Class 1')
})
Then(/^I verify have 4 result$/, () => {
     Cypress.PageExamAttendance.verifyTotalCandidateTips(4)
})

// Scenario: Filter attendance status
Given(/^Filter Present attendance status$/, () => {
     Cypress.PageExamAttendance.Filter('Attendance status', 'Present')
})
Then(/^I verify have 2 result$/, () => {
     Cypress.PageExamAttendance.verifyTotalCandidateTips(2)
})

// Scenario: Filter oral exam progress
Given(/^Filter Completed oral exam progress$/, () => {
     Cypress.PageExamAttendance.Filter('Oral exam progress', 'Completed')
})
Then(/^I verify result student only have student001$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Candidate name',
                    value: student001.name
               },
               {
                    index: 2,
                    display: 'Candidate ID',
                    value: student001.id
                },
                {
                    index: 3,
                    display: 'User ID',
                    value: student001.userid
                },
               {
                    index: 4,
                    display: 'Status',
                    value: 'Active'
               },
               {
                    index: 5,
                    display: 'Class name',
                    value: 'Class 1'
               },
               {
                    index: 6,
                    display: 'Team name',
                    value: 'Group 1'
               },
               {
                    index: 7,
                    display: 'Attendance status',
                    value: 'Present'
               },
               {
                    index: 8,
                    display: 'Oral exam progress',
                    value: 'Completed'
               }
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyDateInTable(1, 10, today)
     Cypress.auiCommon.verifyDateInTable(1, 11, today)
     Cypress.auiCommon.verifyDateInTable(1, 12, today)
     Cypress.auiCommon.verifyDateInTable(1, 13, today)
     Cypress.PageExamAttendance.verifyTotalCandidateTips(1)

})

// Scenario: Filter exam time
Given(/^Reload attendance page to clear filter$/, () => {
     cy.reload()
})
Then(/^Filter today exam time student$/, () => {
     Cypress.PageExamCreate.step2FilterDate(1)
})

// Scenario: Select student006 to edit exam end time
Given(/^Select student006 to edit exam end time$/, () => {
     Cypress.PageExamCreate.step2FilterDate(0)
     Cypress.PageExamAttendance.chooseStudent(5)
     Cypress.PageExamAttendance.clickAttendanceHeaderBtn(1)
     Cypress.auiCommon.clickPopupMenuitemBtn(0)
     Cypress.PageExamAttendance.editEndTime_Flexible('edit', 2, 23, 59, editEndTimeComment)
})
Then(/^I verify student006 comment display right on table$/, () => {
     Cypress.auiCommon.verifyToolTipInTable(6, 13, editEndTimeComment)
})

// Scenario: Reopen student001
Given(/^Select student001 to reopen exam$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamAttendance.clickAttendanceHeaderBtn(2)
     Cypress.PageExamAttendance.editEndTime_Flexible('edit', 0, 23, 30, reopenExamComment)
})
Then(/^I verify student001 status, end time and comment display right on table$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Candidate name',
                    value: student001.name
               },
               {
                    index: 7,
                    display: 'Attendance status',
                    value: 'Present'
               },
               {
                    index: 8,
                    display: 'Oral exam progress',
                    value: 'Not started'
               }
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyHighLightInTable(1, 13)
     reopenStudent001 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 30).toJSON()
     Cypress.auiCommon.verifyTimeInTable(1, 13, reopenStudent001)
     Cypress.auiCommon.verifyToolTipInTable(1, 13, reopenExamComment)
})

