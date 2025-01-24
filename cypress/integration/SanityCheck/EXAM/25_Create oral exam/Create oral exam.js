/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let candiList = [], invigilator1 = '', invigilator2 = ''

let examObj = {
     examName: 'AT_OralExamName' + new Date().toLocaleString(),
     duplicateExamName: 'AT_OralExamName' + new Date().toLocaleString() + '_Copy',
     paperName: 'AT_OralExam' + new Date().toLocaleString(),
     courseCode: 'AT001',
     instruc: 'Long Text Instruction to Candidates ' + new Date().toLocaleString(),
     invigilator: '',
     duration: 40,
     team: 'Group 1',
     examPaperName: 'paper' + new Date().toJSON(),
     editTimeComment_1: 'This is a comment_1',
     editTimeComment_2: 'This is a comment_2',
     editTimeComment_3: 'This is a comment_3',
     editTimeComment_4: 'This is a comment_4',
     paperName: 'OralExamPaper_' + new Date().toLocaleString(),
     modifyPaperName: 'EditOralExamPaper_' + new Date().toLocaleString(),
     paperContent: 'paperContent_' + new Date().toLocaleString(),
}
const validationMessage = {
     requiredFields: 'Enter a value to proceed.',
     requiredCourse: 'Select a course.',
     requiredTime: 'The exam open time must be later than the current time.',
}

let td = new Date()
let yy = td.getFullYear(), mm = td.getMonth(), dd = td.getDate(), hh = td.getHours(), min = td.getMinutes()
let currentHour = td.getHours(), currentMinute = td.getMinutes()
let ExamafterMinute = 8

before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     candiList = env[ct].Candidates
     invigilator1 = env[ct].Invigilator1.display
     invigilator2 = env[ct].Invigilator2.display
})

// Scenario: Create oral exam to step1 verify required fields
Given(/^Create oral exam by home page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageExamHome.clickCreateOralExam()
     Cypress.auiCommon.verifyUrl('include', '/create?pageType=0&oralExam=true')
});
Then(/^I click save and next$/, () => {
     Cypress.PageExamCreate.saveNextForm()
});
Then(/^I verify all required fileds are right$/, () => {
     Cypress.PageExamCreate.verifyValidation(0, validationMessage.requiredFields)
     Cypress.PageExamCreate.verifyValidation(2, validationMessage.requiredCourse)
     Cypress.PageExamCreate.verifyValidation(3, validationMessage.requiredTime)
});

// Scenario: Step1 input info to step2
Given(/^I input step1 information$/, () => {
     Cypress.PageExamCreate.inputExamName(examObj.examName)
     Cypress.PageExamCreate.inputCourse(examObj.courseCode)
     Cypress.PageExamCreate.examStartTime_flexible(0, currentHour, currentMinute, ExamafterMinute)
     Cypress.PageExamCreate.examEndTime_flexible(0, currentHour, currentMinute, ExamafterMinute, examObj.duration)
     Cypress.PageExamCreate.examInstruction(examObj.instruc)
     let oralExamInfo = {
          'examName': examObj.examName,
          'instruction': examObj.instruc
     }
     cy.writeFile("cypress/fixtures/oralExamInfo.json", oralExamInfo)
});

// Scenario: Step2 verify exam basic information
When(/^I expand the exam basic information$/, () => {
     Cypress.PageExamCreate.expandBasicInfo()
});
Then(/^I verify step2 basic info$/, () => {
     let exanInfo = {
          firstOrganization: ['School', 'UI-school'],
          secondOrganization: ['Discipline', 'UI-discipline'],
          semester: ['Semester', 'UI-semester'],
          courseName: examObj.courseCode
     }
     Cypress.PageExamCreate.verifyOralExamBasicValue(exanInfo)
});

// Scenario: Step2 verify proctoring setting is on by default
Then(/^I expand the exam basic information$/, () => {
     Cypress.PageExamCreate.verifyReopensubmission()
});

// Scenario: Step2 verify blue message display right
And(/^I verify the blue message display right$/, () => {
     Cypress.PageExamAttendance.verifyMessage('There are 6 candidates in the course. 6 candidates are enrolled in the exam, and 0 candidates are pending enrolment.')
});

// Scenario: Step2 verify close x of x selected button
Given(/^I check student006$/, () => {
     Cypress.PageAdminCourse.courseTableRowCheckbox(5)
});
Then(/^I click close x of x selected button$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(6)
});

// Scenario: Step2 add team
Given(/^I create team$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(5)
     Cypress.PageExamCreate.clickBtnInManageGroupPanel(0)
     Cypress.auiCommon.inputInDialog(examObj.team, 'Save')
     Cypress.auiCommon.closePanel()
});
Then(/^I assign team for all$/, () => {
     cy.wait(3000)
     Cypress.PageAdminQuickLink.checkAll()
     Cypress.PageExamCreate.invigilatorSubTitleBtn(4)
     Cypress.auiCommon.checkOptionInDialog(examObj.team)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
});

// Scenario: Step2 edit exam time for selected candidates
Given(/^I search student006$/, () => {
     Cypress.PageExamCreate.searchCandidate(candiList[5].name)
});
Then(/^I click edit exam time for selected candidates button$/, () => {
     Cypress.PageAdminCourse.courseTableRowCheckbox(0)
     Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
     Cypress.PageExamCreate.editExamTimeForBtn_OralExam(0)
});
Then(/^I edit exam time to save$/, () => {
     Cypress.PageExamCreate.setStep2EditExamTime(0, 1, 1, 23, 0)
     Cypress.PageExamCreate.setStep2EditExamTime(1, 2, 1, 23, 30)
     Cypress.auiCommon.inputTextareaInPanel(examObj.editTimeComment_1)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
     cy.wait(4000)
});
Then(/^I verify exam time modified successfully and have comment when mourseover$/, () => {
     Cypress.auiCommon.verifyTimeInTable(1, 6, new Date(yy, mm, dd + 1, 23, 0, 0))
     Cypress.auiCommon.verifyTimeInTable(1, 7, new Date(yy, mm, dd + 1, 23, 30, 0))
     Cypress.auiCommon.verifyHighLightInTable(1, 6)
     Cypress.auiCommon.verifyHighLightInTable(1, 7)
     Cypress.auiCommon.verifyToolTipInTable(1, 6, examObj.editTimeComment_1)
});

// Scenario: Step2 edit exam time for teams
When(/^I clear search$/, () => {
     Cypress.PageAdminCourse.clearSearch()
});
Then(/^I click edit exam time for teams button$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
     Cypress.PageExamCreate.editExamTimeForBtn_OralExam(1)
});
And(/^I verify edit exam time for teams panel table display right$/, () => {
     let table_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Team name',
                    value: examObj.team
               },
               {
                    index: 2,
                    display: 'Number of candidates',
                    value: 6
               },
               {
                    index: 3,
                    display: 'Exam start time',
                    value: 'Multiple start times for different candidates'
               },
               {
                    index: 4,
                    display: 'Exam end time',
                    value: 'Multiple end times for different candidates'
               }
          ]
     }
     Cypress.auiCommon.verifyTableInPanel(table_Info)
});
And(/^I verify multiple start time link display right$/, () => {
     Cypress.PageExamCreate.clickMultipleInvigilator(0)
     Cypress.PageExamCreate.verifyMultipleInfo(1, 5)
     Cypress.PageExamCreate.verifyMultipleInfo(3, 1)
});
And(/^I verify multiple deadline link display right$/, () => {
     Cypress.PageExamCreate.clickMultipleInvigilator(1)
     Cypress.PageExamCreate.verifyMultipleInfo(5, 5)
     Cypress.PageExamCreate.verifyMultipleInfo(7, 1)
});
When(/^I click edit exam time button by edit exam time for teams panel$/, () => {
     Cypress.auiCommon.checkBoxInPanelTable(0)
     Cypress.PageExamCreate.clickEditExamTimeInPanel()
});
Then(/^I edit new start, end time and add comment2$/, () => {
     Cypress.PageExamCreate.setStep2EditExamTime(0, 1, 1, 20, 0)
     Cypress.PageExamCreate.setStep2EditExamTime(1, 2, 1, 20, 30)
     Cypress.auiCommon.inputTextareaInPanel(examObj.editTimeComment_2)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
});
And(/^I verify modified successfully in panel table$/, () => {
     let table_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Team name',
                    value: examObj.team
               },
               {
                    index: 2,
                    display: 'Number of candidates',
                    value: 6
               },
               {
                    index: 3,
                    display: 'Exam start time',
                    value: '20:00'
               },
               {
                    index: 4,
                    display: 'Exam end time',
                    value: '20:30'
               }
          ]
     }
     Cypress.auiCommon.verifyTableInPanel(table_Info)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify student001 exam time modified successfully and have comment2 when mourseover$/, () => {
     Cypress.auiCommon.verifyTimeInTable(1, 6, new Date(yy, mm, dd + 1, 20, 0, 0))
     Cypress.auiCommon.verifyTimeInTable(1, 7, new Date(yy, mm, dd + 1, 20, 30, 0))
     Cypress.auiCommon.verifyHighLightInTable(1, 6)
     Cypress.auiCommon.verifyHighLightInTable(1, 7)
     // Cypress.auiCommon.verifyToolTipInTable(1, 6, examObj.editTimeComment_2)
});
And(/^I verify student006 exam time modified successfully and have comment2 when mourseover$/, () => {
     Cypress.auiCommon.verifyTimeInTable(6, 6, new Date(yy, mm, dd + 1, 20, 0, 0))
     Cypress.auiCommon.verifyTimeInTable(6, 7, new Date(yy, mm, dd + 1, 20, 30, 0))
     Cypress.auiCommon.verifyHighLightInTable(1, 6)
     Cypress.auiCommon.verifyHighLightInTable(1, 7)
     // Cypress.auiCommon.verifyToolTipInTable(6, 6, examObj.editTimeComment_2)
});

// Scenario: Step2 edit exam time for classes
Given(/^I click edit exam time for classes button$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
     Cypress.PageExamCreate.editExamTimeForBtn_OralExam(2)
});
And(/^I verify edit exam time for classes panel table display right$/, () => {
     let row_Info_1 = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Class name',
                    value: 'Class 1'
               },
               {
                    index: 2,
                    display: 'Number of candidates',
                    value: 4
               },
               {
                    index: 3,
                    display: 'Exam start time',
                    value: '20:00'
               },
               {
                    index: 4,
                    display: 'Exam end time',
                    value: '20:30'
               }
          ]
     }
     Cypress.auiCommon.verifyTableInPanel(row_Info_1)
     let row_Info_2 = {
          rowIndex: 2,
          columns: [
               {
                    index: 1,
                    value: 'Class 2'
               },
               {
                    index: 2,
                    value: 2
               },
               {
                    index: 3,
                    value: '20:00'
               },
               {
                    index: 4,
                    value: '20:30'
               }
          ]
     }
     Cypress.auiCommon.verifyTableInPanel(row_Info_2)
});
When(/^I select class1 and click edit exam time button by edit exam time for classes panel$/, () => {
     Cypress.auiCommon.checkBoxInPanelTable(1)
     Cypress.PageExamCreate.clickEditExamTimeInPanel()
});
Then(/^I edit new start, end time and add comment3$/, () => {
     Cypress.PageExamCreate.setStep2EditExamTime(0, 1, 1, 21, 0)
     Cypress.PageExamCreate.setStep2EditExamTime(1, 2, 1, 21, 30)
     Cypress.auiCommon.inputTextareaInPanel(examObj.editTimeComment_3)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
});
And(/^I verify modified successfully in classes panel table$/, () => {
     let rowIndex_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 2,
                    value: 4
               },
               {
                    index: 3,
                    value: '21:00'
               },
               {
                    index: 4,
                    value: '21:30'
               }
          ]
     }
     Cypress.auiCommon.verifyTableInPanel(rowIndex_Info)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify student001 exam time modified successfully and have comment3 when mourseover$/, () => {
     Cypress.auiCommon.verifyTimeInTable(1, 6, new Date(yy, mm, dd + 1, 21, 0, 0))
     Cypress.auiCommon.verifyTimeInTable(1, 7, new Date(yy, mm, dd + 1, 21, 30, 0))
     Cypress.auiCommon.verifyHighLightInTable(1, 6)
     Cypress.auiCommon.verifyHighLightInTable(1, 7)
     // Cypress.auiCommon.verifyToolTipInTable(1, 6, examObj.editTimeComment_3)
});

// Scenario: Step2 edit exam time for all
Given(/^I click edit exam time for all button$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
     Cypress.PageExamCreate.editExamTimeForBtn_OralExam(3)
});
Then(/^I edit new start, end time and add comment4$/, () => {
     Cypress.PageExamCreate.setStep2EditExamTime(0, 1, 1, 22, 0)
     Cypress.PageExamCreate.setStep2EditExamTime(1, 2, 1, 22, 30)
     Cypress.auiCommon.inputTextareaInPanel(examObj.editTimeComment_4)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
     cy.wait(4000)
});
Then(/^I verify student001 exam time modified successfully and have comment4 when mourseover$/, () => {
     Cypress.auiCommon.verifyTimeInTable(1, 6, new Date(yy, mm, dd + 1, 22, 0, 0))
     Cypress.auiCommon.verifyTimeInTable(1, 7, new Date(yy, mm, dd + 1, 22, 30, 0))
     Cypress.auiCommon.verifyHighLightInTable(1, 6)
     Cypress.auiCommon.verifyHighLightInTable(1, 7)
     // Cypress.auiCommon.verifyToolTipInTable(1, 6, examObj.editTimeComment_4)
});

// Scenario: Step2 remove candidate001, candidate002
Given(/^I check candidate001, candidate002$/, () => {
     Cypress.PageAdminCourse.courseTableRowCheckbox(0)
     Cypress.PageAdminCourse.courseTableRowCheckbox(1)
});
Then(/^I remove them$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(2)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
     cy.wait(4000)
});

// Scenario: Step2 add candidate001, candidate002
Given(/^I add candidate001, candidate002$/, () => {
     Cypress.PageExamCreate.invigilatorSubTitleBtn(1)
     Cypress.auiCommon.checkBoxInPanelTable(0)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
});

// Scenario: Step2 assign candidate001, candidate002 team
Given(/^I assign candidate001, candidate002 team$/, () => {
     Cypress.PageAdminCourse.courseTableRowCheckbox(0)
     Cypress.PageAdminCourse.courseTableRowCheckbox(1)
     Cypress.PageExamCreate.invigilatorSubTitleBtn(4)
     Cypress.auiCommon.checkOptionInDialog(examObj.team)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
     cy.wait(4000)
});

// Scenario: Step2 filter exam time to Specific date
Given(/^I filter exam time to Specific date$/, () => {
     Cypress.PageExamCreate.step2FilterDate(1)
});
Then(/^I verify filter 2 result$/, () => {
     Cypress.PageExamCreate.verifyStep2TotalCandidates(2)
});

// Scenario: Step2 filter exam time to Within the last 30 days
Given(/^I filter exam time to Within the last 30 days$/, () => {
     Cypress.PageExamCreate.step2FilterDate(2)
});
Then(/^I verify filter 6 result$/, () => {
     Cypress.PageExamCreate.verifyStep2TotalCandidates(6)
});

// Scenario: Step2 filter exam time to Custom date range to next day
Given(/^I filter exam time to Custom date range to next day$/, () => {
     Cypress.PageExamCreate.step2FilterDate(3)
});
Then(/^I verify filter 4 result$/, () => {
     Cypress.PageExamCreate.verifyStep2TotalCandidates(4)
});

// Scenario: Step2 filter exam time to All
Given(/^I filter exam time to All$/, () => {
     Cypress.PageExamCreate.step2FilterDate(0)
});

// Scenario: Step3 verify exam basic info
Then(/^I verify step3 exam basic info$/, () => {
     let exanInfo = {
          firstOrganization: ['School', 'UI-school'],
          secondOrganization: ['Discipline', 'UI-discipline'],
          semester: ['Semester', 'UI-semester'],
          courseName: examObj.courseCode,
          enrolledCandidate: 6,
          // invigilator: '+',
          // invigilator: '1'
     }
     Cypress.PageExamCreate.verifyOralExamBasicValue(exanInfo)
});

// Scenario: Step3 create paper directly
Given(/^I click create paper directly$/, () => {
     Cypress.PageExamCreate.examCreateOralPaperDirectly(examObj.paperName, examObj.paperContent, true)
});

// Scenario: Step3 verify verify Question settings, Score publishing display right
Given(/^I verify Score publishing display right$/, () => {
     // Cypress.PageExamCreate.verifyStep3ScorePublishingValue('Disabled', 'Scores', 'Yes')
});

// Scenario: Step3 edit paper and publish
When(/^I click edit paper button$/, () => {
     Cypress.PageSampleExamCreate.editPaper()
})
Then(/^I edit paper name and complete$/, () => {
     Cypress.PageSampleExamCreate.modifyPaperName(examObj.modifyPaperName)
     Cypress.PageSampleExamCreate.completePaper()
})
Then(/^I verify paper name and publish exam$/, () => {
     cy.wait(1000)
     Cypress.PageSampleExamCreate.verifyPaperName(examObj.modifyPaperName)
     Cypress.PageExamCreate.examPublish()
     cy.wait(3000)
})

// Scenario: Filter oral exam
When(/^I filter oral exam$/, () => {
     Cypress.PageExamHome.filter('Exam type', 'Oral exam')
})
Then(/^I search the oral exam$/, () => {
     Cypress.PageExamHome.searchExam(examObj.examName)
})

// Scenario: Duplicate oral exam
Given(/^I duplicate oral exam$/, () => {
     Cypress.PageExamHome.duplicateExam()
})
Then(/^I remove paper$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(2)
     Cypress.PageSampleExamCreate.clickRemovePaper()
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
})
Then(/^I add paper from bank and publish exam$/, () => {
     Cypress.PageSampleExamCreate.addPaperFromBank(examObj.modifyPaperName)
     Cypress.PageExamCreate.examPublish()
})

// Scenario: Unpublish the duplicate oral exam
Given(/^I search the duplicate oral exam$/, () => {
     Cypress.PageExamHome.searchExam(examObj.duplicateExamName)
})
Then(/^I unpublish the duplicate exam$/, () => {
     Cypress.PageExamHome.clickExamCardBtn(0, true)
})

// Scenario: Republish the duplicate oral exam
Then(/^I publish the duplicate exam$/, () => {
     Cypress.PageExamCreate.examPublish()
     cy.wait(5000)
})

// Scenario: Delete the duplicate oral exam
Then(/^I delete the duplicate exam$/, () => {
     Cypress.PageExamHome.clickExamCardBtn(1, true)
})

// Scenario: Verify oral exam in calendar
Given(/^I enter the calendar page to seach the oral exam$/, () => {
     Cypress.PageAdminCommon.visitCalendar()
     Cypress.PageCalendar.searchExamInCalendar(examObj.examName)
})
Then(/^I can see the oral exam on the right panel$/, () => {
      Cypress.PageCalendar.VerifyPanelItem(examObj.examName, "0", false, examObj.duration)
})
When(/^I click the exam name on calendar$/, () => {
     Cypress.PageCalendar.selectCalItem(0, 0)
})
Then(/^I verify the exam details$/, () => {
     let itemInfo = {
          title: `${examObj.courseCode} - UI-semester - ${examObj.examName} - UI-school - UI-discipline`,
          enrolledNumber: `6 enrolled`,
      }
      Cypress.PageCalendar.VerifyCalPopup(itemInfo)
})