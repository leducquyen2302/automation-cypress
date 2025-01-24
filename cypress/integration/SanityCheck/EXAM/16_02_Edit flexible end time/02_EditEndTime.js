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
const addComment_for_all = 'This is a comment for all!'

const flexible_editDeadline_toast = 'The exam deadline was updated.'
const flexible_editDuration_toast = 'The answering duration was updated.'
const resubmission_IllegalTip = ['The exam deadline must be later than the current time.', 'Enter a value to proceed.']
const reopensubmission_comment = 'This student is reopensubmission'
const reopensubmission_success_toast = 'The exam was reopened.'

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

let system = '', invigilator1 = '', stu1 = '', stu2 = '', stu3 = '', stu4 = ''

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
     stu4 = env[ct].Candidates[3]
     system = env[ct].System
     invigilator1 = env[ct].Invigilator1
})

// Scenario: CM edit flexible time range exam end time and set a duration and open for resubmission
Given(/^I create a flexible,open book,no reading time,set a duration exam$/, () => {
     examInfo.name = 'AT_Flexible_Edit_open'
     examInfo.startOffset = { level: "min", off: 1 }
     examInfo.duration = 5
     examInfo.isOpenB = true
     examInfo.filePath = 'editEndTimeExam.json'
     examInfo.previewTime = 0
     examInfo.examClassification = 1
     examInfo.deadline = 10
     examInfo.studentCount = [stu1.name, stu2.name, stu3.name, stu4.name]
     examInfo.stuChangeInviNumber = 4

     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

     cy.CreateExamByAPI(examInfo, paperInfo)
     cy.readFile('cypress/fixtures/editEndTimeExam.json').then(($data) => {
          flexExamInfo = $data.examInfo
     })
});
Then(/^I am login as course manager and in attandance page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(flexExamInfo.name)
     Cypress.PageExamAttendance.enterAttendance_examing()
});
When(/^I choose candidate1$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
});
Then(/^I click edit answering duration and click edit answering duration$/, () => {
     Cypress.PageExamAttendance.clickEditBtnInDurOrDeadline(0)
});
Then(/^I verify the popup info$/, () => {
     Cypress.PageExamAttendance.verifyEditDurationPopupInfo()
});
Then(/^I verify extend duration and comment is null$/, () => {
     Cypress.PageExamAttendance.verifyExtendDurAndComNull()
});
When(/^I input duration with 1q and click ok$/, () => {
     Cypress.PageExamAttendance.inputExtendDurAndCom('1q')
});
Then(/^I verify tips$/, () => {
     Cypress.PageSampleExamCreate.verifyValidationMessage(validationMessage[2])
});
When(/^I input duration with 10 and click ok$/, () => {
     Cypress.PageExamAttendance.inputExtendDurAndCom(edit_duration)
});
Then(/^I verify the toast$/, () => {
     Cypress.auiCommon.verifyToast(flexible_editDuration_toast)
});
And(/^I verify candidate1 all column and answering duration background is yellow$/, () => {
     let candiInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Candidate name',
                    value: stu1.name,
               },
               {
                    index: 6,
                    display: 'Attendance status',
                    value: 'Not started',
               },
               {
                    index: 7,
                    display: 'Examination status',
                    value: 'Not started',
               },
               {
                    index: 8,
                    display: 'Candidate started time',
                    value: '',
               },
               {
                    index: 14,
                    display: 'Answering duration',
                    value: flexExamInfo.duration + edit_duration,
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
     Cypress.auiCommon.verifyTimeInTable(1, 16, flexExamInfo.endTime)
     Cypress.auiCommon.verifyHighLightInTable(1, 15)
});
When(/^Candidate1 enter the exam$/, () => {
     Cypress.PageStudentTakeExam.waitStartByTime(flexExamInfo.startTime)
     cy.StuEnterExamApi(0, 'editEndTimeExam.json', true)
});
Then(/^I click candidate1 right edit answering duration button and modify duration$/, () => {
     Cypress.PageExamAttendance.editRightBtn(0)
     Cypress.PageExamAttendance.editDurationByRightBtn(0)
     Cypress.PageExamAttendance.inputExtendDurAndCom(edit_duration)
});
Then(/^I verify candidate1 start time and duration$/, () => {
     Cypress.auiCommon.verifyTimeInTable(1, 9, flexExamInfo.startTime)
     Cypress.auiCommon.verifyChangeValueInTable(1, 15, flexExamInfo.duration + edit_duration + edit_duration)
});
When(/^I click edit answering duration and click edit answering duration for all$/, () => {
     Cypress.PageExamAttendance.clickEditBtnInDurOrDeadline(1)
});
Then(/^I click edit exam deadline and click edit exam deadline$/, () => {
     Cypress.PageExamAttendance.clickEditBtnInDurOrDeadline(2)
});
And(/^I verify the for one popup echo date is right$/, () => {
     Cypress.PageExamAttendance.verifyPopupEchoDate_Flexible(flexExamInfo.endTime)
});
Then(/^I only input comment and ok$/, () => {
     Cypress.PageExamAttendance.inputEditDeadlineComment(addComment)
});
Then(/^Student1 submit exam$/, () => {
     cy.SubmitExamApi(0, 'editEndTimeExam.json')
});
Then(/^I click exam deadline and click edit exam deadline for all$/, () => {
     Cypress.PageExamAttendance.clickEditBtnInDurOrDeadline(3)
});
And(/^I verify the for all echo date is right$/, () => {
     candidate1_final_answeringDuration = flexExamInfo.duration + edit_duration * 3
     let time = new Date(flexExamInfo.startTime)
     let echo_time = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes() + candidate1_final_answeringDuration).toJSON()
     Cypress.PageExamAttendance.verifyPopupEchoDate_Flexible(echo_time)
});
Then(/^I set end time,comment and ok$/, () => {
     Cypress.PageExamAttendance.editEndTime_Flexible('edit', 1, 23, 30, addComment_for_all)
});
Then(/^I verify the deadline toast$/, () => {
     Cypress.auiCommon.verifyToast(flexible_editDeadline_toast)
});
And(/^I verify candidate1 all column$/, () => {
     let candiInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    value: stu1.name,
               },
               {
                    index: 14,
                    value: candidate1_final_answeringDuration,
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
     Cypress.auiCommon.verifyTimeInTable(1, 9, flexExamInfo.startTime)
     Cypress.auiCommon.verifyTimeInTable(1, 14, flexExamInfo.startTime)
     Cypress.auiCommon.verifyTimeInTable(1, 16, flexExamInfo.endTime)
});
And(/^I verify candidate2 all column$/, () => {
     let candiInfo = {
          rowIndex: 2,
          columns: [
               {
                    index: 1,
                    value: stu2.name,
               },
               {
                    index: 8,
                    value: '',
               },
               {
                    index: 14,
                    value: flexExamInfo.duration + edit_duration,
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
     Cypress.auiCommon.verifyTimeInTable(2, 14, flexExamInfo.startTime)
     flex_stu2_end = new Date(date.getFullYear(), date.getMonth(), new Date(flexExamInfo.endTime).getDate() + 1, 23, 30).toJSON()
     Cypress.auiCommon.verifyTimeInTable(2, 16, flex_stu2_end)
});
When(/^I open the candidate1 details$/, () => {
     Cypress.PageExamAttendance.enterCandiDetail(0)
});
Then(/^I verify candidate1 detail info is right$/, () => {
     let info = {
          candidateID: stu1.id,
          status: 'Active',
          attendanceStatus: 'Present',
          examinationStatus: 'Submitted',
          flexible_candidateStartTime: flexExamInfo.startTime,
          flexible_examDeadline: flexExamInfo.endTime,
          flexible_deadlineModified: 'N/A',
          flexible_commentForEditingDeadline: 'N/A',
          flexible_answeringDuration: `${candidate1_final_answeringDuration} minutes`,
          flexible_answeringDurationModified: [`${system.display} edited at `, `${new Date(flexExamInfo.startTime).getDate()}`],
          flexible_commentForExtendingDuration: edit_duration
     }
     Cypress.PageExamAttendance.verifyCandidateDetail(info)
});
Then(/^I logout$/, () => {
     cy.logoutApi()
})

// Scenario: Candidate1 verify the flexible exam with only edit duration
Given(/^I am login as Candidate1$/, () => {
     cy.LoginByLocal(stu1.userid)
});
Then(/^I search the flexible exam$/, () => {
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(flexExamInfo.name)
});
Then(/^I enter attendance page$/, () => {
     Cypress.PageExamAttendance.enterAttendance_examing()
});
When(/^I choose student2$/, () => {
     Cypress.PageExamAttendance.chooseStudent(1)
})
Then(/^I verify the flexible exam with only edit duration on card is right$/, () => {
     let card = {
          flexibleTime: {
               openTime: flexExamInfo.openTime,
               endTime: flexExamInfo.endTime
          },
          AnsweringDuration: candidate1_final_answeringDuration
     }
     Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});

// Scenario: Candidate2 verify the flexible exam with edit duration and edit deadline
Given(/^I am login as Candidate2$/, () => {
     cy.LoginByLocal(stu2.userid)
});
Then(/^I verify flexible exam verify the flexible exam with edit duration and edit deadline on card is right$/, () => {
     let card = {
          flexibleTime: {
               openTime: flexExamInfo.openTime,
               endTime: flex_stu2_end
          },
          AnsweringDuration: flexExamInfo.duration + edit_duration
     }
     Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});

// Scenario: Invigilator reopensubmission before flexible exam
Given(/^I am login as invigilator1$/, () => {
     cy.LoginByLocal(invigilator1.userid)
});
Then(/^I verify open for resubmission button is gray$/, () => {
     Cypress.PageExamAttendance.verifyReopenGray()
});
Then(/^I edit all deadline in next minute$/, () => {
     Cypress.PageExamAttendance.clickEditBtnInDurOrDeadline(3)
     let hour = new Date().getHours()
     let minute = new Date().getMinutes()
     Cypress.PageExamAttendance.editEndTime_Flexible('next1Min', 0, hour, minute)
});
Then(/^I click open for resubmission$/, () => {
     Cypress.PageExamAttendance.clickAttendanceHeaderBtn(3)
});
Then(/^I verify resubmission answering duration echo is right$/, () => {
     Cypress.PageExamAttendance.verifyResubmissionDuration_Echo(flexExamInfo.duration)
});
When(/^I set resubmission end time is yesterday and clear duration$/, () => {
     Cypress.PageExamAttendance.editEndTime_Flexible('edit', -1, 23, 30)
     Cypress.PageExamAttendance.clearReopensubmissionDuration_Flexible()
});
Then(/^I verify resubmission illegal tip$/, () => {
     Cypress.PageExamAttendance.verifyResubmission_IllegalTip(resubmission_IllegalTip[0], resubmission_IllegalTip[1])
});
Then(/^I set resubmission end time,duration and comment$/, () => {
     Cypress.PageExamAttendance.inputReopensubmissionDuration(reopen_duration)
     Cypress.PageExamAttendance.editEndTime_Flexible('edit', 0, 23, 30, reopensubmission_comment)
});
And(/^I verify reopen success toast$/, () => {
     Cypress.auiCommon.verifyToast(reopensubmission_success_toast)
});
Then(/^I verify stu1 candidate name,submission status,answering duration,exam deadline tooltip$/, () => {
     // Cypress.PageExamAttendance.verifyClockIconInfo(0, 'The exam deadline of the candidate has been updated to ', '2022-06-01T15:30:00.000Z')
     Cypress.PageExamAttendance.clickExamSessionHistory(0)
     let date = new Date()
     let yy = date.getFullYear(), mm = date.getMonth(), dd = date.getDate()
     let todayExamTime = new Date(yy, mm, dd, 23, 30, 0)
     Cypress.PageExamAttendance.verifyExamSessionHistory(0, invigilator1.display, true, todayExamTime, reopensubmission_comment)
     Cypress.PageExamAttendance.clickExamSessionHistory(0)
     Cypress.PageExamAttendance.verifyExamSessionHistory(1, system.display, false, 35, edit_duration)
});
And(/^I verify stu1 all column$/, () => {
     let candiInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    value: stu1.name,
               },
               {
                    index: 6,
                    value: 'Present',
               },
               {
                    index: 7,
                    value: 'In progress',
               },
               {
                    index: 8,
                    value: '',
               },
               {
                    index: 9,
                    value: '',
               },
               {
                    index: 14,
                    display: 'Answering duration',
                    value: reopen_duration,
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
     Cypress.auiCommon.verifyTimeInTable(1, 9, flexExamInfo.startTime)
     flex_reopen_stu1_deadline = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 30).toJSON()
     Cypress.auiCommon.verifyTimeInTable(1, 16, flex_reopen_stu1_deadline)
     Cypress.auiCommon.verifyHighLightInTable(1, 15)
});
And(/^I verify stu1 answering duration and exam deadline tooltip$/, () => {
     Cypress.auiCommon.verifyToolTipInTable(1, 15, reopensubmission_comment)
     Cypress.auiCommon.verifyToolTipInTable(1, 16, reopensubmission_comment)
});
And(/^I verify stu2 answering duration and exam deadline tooltip$/, () => {
     Cypress.auiCommon.verifyToolTipInTable(2, 15, 10)
});
Then(/^I verify stu1 details panel with time module$/, () => {
     let info = {
          flexible_candidateStartTime: flexExamInfo.startTime,
          flexible_examDeadline: flex_reopen_stu1_deadline,
          flexible_deadlineModified: `${invigilator1.display}`,
          flexible_commentForEditingDeadline: reopensubmission_comment,
          flexible_answeringDuration: `${reopen_duration} minutes`,
          flexible_answeringDurationModified: [`${invigilator1.display} edited at `, `${new Date(flexExamInfo.startTime).getDate()}`],
          flexible_commentForExtendingDuration: reopensubmission_comment
     }
     Cypress.PageExamAttendance.verifyCandidateDetail(info)
});

// Scenario: Candidate1 verify reopensubmission
Then(/^I verify exam time,answering duration and tooltips$/, () => {
     let examInfo = {
          flexibleTime: {
               openTime: flexExamInfo.startTime,
               endTime: flex_reopen_stu1_deadline
          },
          AnsweringDuration: reopen_duration,
          clockToolTip: {
               minute: reopen_duration,
               date: flex_reopen_stu1_deadline
          }
     }
     Cypress.PageStudentExam.verifyStudentExamCardInfo(0, examInfo)
});
When(/^I enter the exam and start$/, () => {
     Cypress.PageStudentExam.enterExam(0)
     Cypress.PageStudentTakeExam.startNow()
});
Then(/^I can see the repon toast$/, () => {
     Cypress.PageStudentTakeExam.verifyTakeExamToast(`Your exam has been reopened and the answering duration has been updated to ${reopen_duration} minutes.`)
});
Then(/^I end exam$/, () => {
     Cypress.PageStudentTakeExam.endExam()
     cy.logoutApi()
});

// Scenario: CM verify only can pause start exam student
When(/^I only choose candidate1 who already submit exam$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
});
Then(/^I verify pause exam button can not click$/, () => {
     Cypress.auiCommon.verifyButtonDisabled('This action is only available for the candidates who have started the exam.')
});
When(/^I only choose candidate2 who absent exam$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamAttendance.chooseStudent(1)
});
When(/^I reopen candidate1, candidate2 and only choose candidate2 who not start exam$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamAttendance.clickAttendanceHeaderBtn(3)
     let hour = new Date().getHours()
     let minute = new Date().getMinutes()
     Cypress.PageExamAttendance.editEndTime_Flexible('next1Min', 0, hour + 1, minute)
     Cypress.PageExamAttendance.chooseStudent(1)
});
When(/^I choose candidate1 who in progress exam$/, () => {
     Cypress.PageExamAttendance.chooseStudent(1)
     Cypress.PageExamAttendance.chooseStudent(0)
});

// Scenario: CM pause student001
Given(/^Student001 enter the exam$/, () => {
     cy.StuEnterExamApi(0, 'editEndTimeExam.json', true)
});
Then(/^CM pause student001$/, () => {
     Cypress.PageExamAttendance.pauseExam()
});
And(/^CM verify student001 status is paused in table$/, () => {
     let candiInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    value: stu1.name,
               },
               {
                    index: 6,
                    value: 'Present',
               },
               {
                    index: 7,
                    value: 'Paused',
               },
               {
                    index: 9,
                    value: '',
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
});

// Scenario: Student001 check pause exam
Then(/^I enter the flexible exam$/, () => {
     Cypress.PageStudentExam.enterExam(0)
});
Then(/^I verify exam display paused$/, () => {
     Cypress.PageStudentExam.verifyExamPaused()
});

// Scenario: CM resume student001
Then(/^I resume student001$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamAttendance.resumeExam()
});
And(/^CM verify student001 status is in progress in table$/, () => {
     let candiInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    value: stu1.name,
               },
               {
                    index: 6,
                    value: 'Present',
               },
               {
                    index: 7,
                    value: 'In progress',
               },
               {
                    index: 9,
                    value: '',
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
});

// Scenario: Student001 resume exam
Then(/^I answer the question and submit end the exam$/, () => {
     Cypress.PageConductExam.answerMCQuestion(0)
     Cypress.PageConductExam.endExam()
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

// Scenario: CM verify student001 submit exam after resume exam
Then(/^CM verify student001 status is Submitted in table$/, () => {
     let candiInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    value: stu1.name,
               },
               {
                    index: 6,
                    value: 'Present',
               },
               {
                    index: 7,
                    value: 'Submitted',
               }
          ]
     }
     Cypress.auiCommon.verifyTable(candiInfo)
});