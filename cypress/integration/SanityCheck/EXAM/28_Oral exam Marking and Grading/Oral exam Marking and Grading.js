/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let today = new Date()
let student001 = '', student002 = '', student003 = '', student004 = '', invigilator1 = '', invigilator2 = '', marker1 = '', marker1_userId = '', marker2 = '', marker3 = '', examName = '', instru = ''
let score_student001 = 0.2
let score_student002 = 0.5
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     student001 = env[ct].Candidates[0]
     student002 = env[ct].Candidates[1]
     student003 = env[ct].Candidates[2]
     student004 = env[ct].Candidates[3]
     invigilator1 = env[ct].Invigilator1.display
     invigilator2 = env[ct].Invigilator2.display
     marker1 = env[ct].markers[0].display
     marker1_userId = env[ct].markers[0].userid
     marker2 = env[ct].markers[1].display
     marker3 = env[ct].markers[2].display
     cy.fixture("oralExamInfo.json").then(($examInfo) => {
          examName = $examInfo.examName
          instru = $examInfo.instruction
     })
})

// Scenario: Enter marking progress verify student001 and student002 info display right in table
Given(/^I enter the marking progress page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageExamMark.enterMarkingProgress(0)
     cy.wait(5000)
})
Then(/^I verify student001 info display right in table$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               // {
               //      index: 1,
               //      display: 'Candidate name',
               //      value: student001.name
               // },
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
                    display: 'Property',
                    value: ''
               },
               {
                    index: 6,
                    display: 'Class name',
                    value: 'Class 1'
               },
               {
                    index: 11,
                    display: 'Oral exam progress',
                    value: 'Not started'
               },
               {
                    index: 12,
                    display: 'Team name',
                    value: 'Group 1'
               },
               {
                    index: 13,
                    display: 'Total score',
                    value: ''
               },
               {
                    index: 14,
                    display: 'Marking progress',
                    value: '0/1 question marked'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, student001.name)
     Cypress.auiCommon.verifyDateInTable(1, 8, today)
     Cypress.auiCommon.verifyDateInTable(1, 9, today)
     Cypress.auiCommon.verifyDateInTable(1, 10, today)
     let stu1EndTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 30).toJSON()
     Cypress.auiCommon.verifyTimeInTable(1, 11, stu1EndTime)
})
Then(/^I verify student002 info display right in table$/, () => {
     let student002_Info = {
          rowIndex: 2,
          columns: [
               // {
               //      index: 1,
               //      value: student002.name
               // },
               {
                    index: 2,
                    value: student002.id
               },
               {
                    index: 3,
                    value: student002.userid
               },
               {
                    index: 4,
                    value: 'Active'
               },
               {
                    index: 6,
                    value: 'Class 1'
               },
               {
                    index: 8,
                    value: ''
               },
               {
                    index: 11,
                    value: 'In progress'
               },
               {
                    index: 12,
                    value: 'Group 1'
               },
               {
                    index: 13,
                    value: ''
               },
               {
                    index: 14,
                    value: '0/1 question marked'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student002_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(2, 2, student002.name)
     Cypress.auiCommon.verifyDateInTable(2, 8, today)
     Cypress.auiCommon.verifyDateInTable(2, 10, today)
     Cypress.auiCommon.verifyDateInTable(2, 11, today)
})

// Scenario: Filter oral exam progress
Given(/^I filter in progress of oral exam progress$/, () => {
     Cypress.PageExamMark.Filter('Oral exam progress', 'In progress')
})
Then(/^I verify have 1 result$/, () => {
     Cypress.PageExamMark.verifyTotalCandidateTips(1)
})
Then(/^I filter all oral exam progress$/, () => {
     Cypress.PageSampleReport.filterAllAfterFilterSome(4, 2)
})

// Scenario: Filter exam time to Specific date
Given(/^I filter exam time to Specific date$/, () => {
     Cypress.PageExamCreate.step2FilterDate(1)
})
Then(/^I verify have 2 result$/, () => {
     Cypress.PageExamMark.verifyTotalCandidateTips(2)
})

// Scenario: Filter exam time to Within the last 30 days
Given(/^I filter exam time to Within the last 30 days$/, () => {
     Cypress.PageExamCreate.step2FilterDate(2)
})
Then(/^I verify have 6 result$/, () => {
     Cypress.PageExamMark.verifyTotalCandidateTips(6)
})

// Scenario:Filter exam time to Custom date range to next day
Given(/^I filter exam time to Custom date range to next day$/, () => {
     Cypress.PageExamCreate.step2FilterDate(3)
})
Then(/^I verify have 3 result$/, () => {
     Cypress.PageExamMark.verifyTotalCandidateTips(3)
})

// Scenario: To student001 mark score end session
Given(/^I enter student001 exam$/, () => {
     cy.reload()
     Cypress.PageExamMark.enterExamInMarkingProgress(0)
})
Then(/^I click start session$/, () => {
     Cypress.PageExamMark.startSession()
})
Then(/^I input student001 score$/, () => {
     Cypress.PageExamMark.inputScore(score_student001)
})

// Scenario: To student002 mark score, add staff comment, add candidate comment, end session
Given(/^I enter student002 exam$/, () => {
     Cypress.PageExamMark.enterExamInMarkingProgress(1)
})
Then(/^I input student002 score and add staff comment$/, () => {
     Cypress.PageExamMark.inputScore(score_student002)
     Cypress.PageExamMark.inputScoreComment(0, 'Staff add comment!')
})
Then(/^I add candidate comment$/, () => {
     Cypress.PageExamMark.switchUserComment(1)
     Cypress.PageExamMark.inputScoreComment(0, 'Student add comment!')
})
Then(/^I end session and close marking page$/, () => {
     Cypress.PageExamMark.endSession()
     Cypress.PageExamMark.closeMarkProgress(0)
})
And(/^I verify student002 info after end session$/, () => {
     Cypress.auiCommon.verifyDateInTable(2, 9, today)
     Cypress.auiCommon.verifyValueInTable(2, 12, 'Completed')
     Cypress.auiCommon.verifyValueInTable(2, 14, score_student002)
     Cypress.auiCommon.verifyValueInTable(2, 15, '1/1 question marked')
})

// Scenario: Enter grading progress verify exam information
Given(/^I enter the grading progress page$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(5)
})
Then(/^I verify the exam basic information in grade page$/, () => {
     let exanInfo = {
          firstOrganization: ['School', 'UI-school'],
          secondOrganization: ['Discipline', 'UI-discipline'],
          courseName: 'AT001 (AutoTesting Programme 1)',
          Semester: 'UI-semester',
          enrolledCandidate: 6,
          invigilator: invigilator1,
          fullmark_inGrading: 1
     }
     Cypress.PageExamCreate.verifyOralExamBasicValue(exanInfo)
     Cypress.PageExamCreate.verifyMoreInvigNum(1)
     Cypress.PageExamCreate.clickMoreInvig()
     Cypress.PageExamCreate.verifyMoreInvigName(0, invigilator1)
     Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator2)
})

// Scenario: Filter class 1 in grading progress
Given(/^I filter class 1 in grading progress$/, () => {
     Cypress.PageExamGrade.Filter('Class name', 'Class 1')
})
Then(/^I verify have 4 result in grading progress$/, () => {
     Cypress.PageExamGrade.verifyTotalCandidateTips(4)
})

// Scenario: Filter attendance status in grading progress
Given(/^I filter present in grading processes$/, () => {
     Cypress.PageExamGrade.Filter('Attendance status', 'Present')
})
Then(/^I verify have 2 result in grading progress$/, () => {
     Cypress.PageExamGrade.verifyTotalCandidateTips(2)
})

// Scenario: Filter oral exam progress in grading progress
Given(/^I filter completed of oral exam progress after attendance status select all$/, () => {
     Cypress.PageSampleReport.filterAllAfterFilterSome(3, 4)
     Cypress.PageExamGrade.Filter('Oral exam progress', 'Completed')
})
Then(/^I verify have 1 result in grading progress$/, () => {
     Cypress.PageExamGrade.verifyTotalCandidateTips(1)
})

// Scenario: Verify edit publish settings value display right by default step3 settings
Given(/^I click edit publish settings$/, () => {
     Cypress.PageExamGrade.clickEditPublishSettingsBtn()
})
Then(/^I verify value display right by default step3 settings$/, () => {
     // Cypress.PageExamGrade.verifyEditPublishSettingsValue('false', 0, 0)
     Cypress.auiCommon.clickFooterBtnInPanel(0)
})

// Scenario: Verify Statistics value
Then(/^I verify Statistics value$/, () => {
     Cypress.PageExamGrade.verifyStatisticsValue(score_student002, score_student001, 0.4, 0.4)
})

// Scenario: Publish student001, student002 score to verify student002 view details
Given(/^I select student001, student002 publish score$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamAttendance.chooseStudent(1)
     Cypress.PageExamGrade.clickHeaderBtn(0)
     Cypress.auiCommon.clickPopupMenuitemBtn(0)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
When(/^I click student002 view details$/, () => {
     Cypress.auiCommon.clickButtonInTable(2, 15)
})
Then(/^I verify basic info and score are right$/, () => {
     let info = {
          candidate: [0, student002.name],
          progress: [1, 'Completed'],
          totalScore: [2, '0.5 / 1'],
     }
     Cypress.PageExamGrade.verifyBasicInfo_InViewDetais(info)
})

// Scenario: Unpublish student001 score
Given(/^I back to grading progress page$/, () => {
     Cypress.auiCommon.clickBreadcrumb(1)
})
Then(/^I unpublish student001 score$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.PageExamGrade.clickHeaderBtn(2)
     Cypress.auiCommon.clickPopupMenuitemBtn(0)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})

// Scenario: Student001 verify unpublish successfully
Given(/^I login as student001 search the exam$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(student001.userid)
     Cypress.PageAdminCommon.visitExam(5000)
     Cypress.PageExamHome.searchExam(examName)
})
Then(/^I verify cannot view results$/, () => {
     Cypress.PageStudentExam.verifyNoViewScore_OnCard()
})

// Scenario: Student002 view score after publish score
Given(/^I login as student002 search the exam$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(student002.userid)
     Cypress.PageAdminCommon.visitExam(5000)
     Cypress.PageExamHome.searchExam(examName)
})
Then(/^I click view score and verify score info are right$/, () => {
     Cypress.PageStudentExam.clickViewScoreBtn()
     let info = {
          status: [0, 'Submitted'],
          totalScore: [1, '0.5 / 1'],
     }
     Cypress.PageStudentExam.viewExamResults(info)
})
And(/^I verify score info are right$/, () => {
     Cypress.PageStudentExam.verifyExamResultsComment('Student add comment!')
})

// Scenario: Admin verify switch candidate button in regular marking
Given(/^I login as Admin and enter the marking progress page$/, () => {
     // cy.logoutApi()
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageExamMark.enterMarkingProgress(0)
})
Then(/^I assign all student marker1$/, () => {
     Cypress.PageExamMark.clickAssignMarkertoAll()
     Cypress.PageExamMark.searchMarker(marker1)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
And(/^I assign student001 marker2$/, () => {
     Cypress.auiCommon.chooseCheckbox(2)
     Cypress.PageExamMark.clickAssignMarkertoSelectStudents()
     Cypress.PageExamMark.searchMarker(marker2)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
Then(/^I click student001 mark score$/, () => {
     Cypress.PageExamMark.enterExamInMarkingProgress(0)
})
When(/^I click switch candidate button$/, () => {
     Cypress.PageExamMark.clickSwitchCandidateBtn()
})
Then(/^I verify the candidate table info are right$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               // {
               //      index: 1,
               //      display: 'Candidate name',
               //      value: student001.name
               // },
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
               // {
               //      index: 4,
               //      display: 'Marker',
               //      value: marker2
               // },
               {
                    index: 5,
                    display: 'Marking progress',
                    value: '1/1'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 5, marker2)
     let student003_Info = {
          rowIndex: 2,
          columns: [
               // {
               //      index: 1,
               //      display: 'Candidate name',
               //      value: student003.name
               // },
               {
                    index: 2,
                    display: 'Candidate ID',
                    value: student003.id
               },
               {
                    index: 3,
                    display: 'User ID',
                    value: student003.userid
               },
               // {
               //      index: 3,
               //      display: 'Marker',
               //      value: marker1
               // },
               {
                    index: 5,
                    display: 'Marking progress',
                    value: '0/1'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student003_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(2, 5, marker1)
})

// Scenario: Admin filter marker in candidate list after click switch candidate in regular marking
Given(/^I filter marker1$/, () => {
     Cypress.PageExamMark.switchCandidateListFilter_InRegularMark('Marker', marker1)
})
Then(/^I verify the table info after filter marker1$/, () => {
     let student003_Info = {
          rowIndex: 1,
          columns: [
               // {
               //      index: 1,
               //      value: student003.name
               // },
               {
                    index: 2,
                    value: student003.id
               },
               {
                    index: 3,
                    value: student003.userid
               },
               // {
               //      index: 3,
               //      value: marker1
               // },
               {
                    index: 5,
                    value: '0/1'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student003_Info)
     Cypress.auiCommon.verifyCandidateName_InShadow_HaveTag(1, 2, student003.name)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 5, marker1)
})
When(/^I click ok$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify have tips Select a candidate to mark scores.$/, () => {
     Cypress.auiCommon.verifyValiMessage(1, 'Select a candidate to mark scores.')
     cy.wait(8000)
})

// Scenario: Admin switch candidate in regular marking
Given(/^I choose student003 to switch$/, () => {
     Cypress.auiCommon.chooseCheckbox(0)
     cy.wait(8000)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify switch student003 successfully$/, () => {
     cy.wait(8000)
     Cypress.auiCommon.verifyCurrentUser(student003.name)
})
And(/^I verify previous candidate button is disabled$/, () => {
     cy.wait(3000)
     Cypress.auiCommon.verifyButtonDisabled('Previous candidate')
})
When(/^I click next candidate button$/, () => {
     Cypress.auiCommon.clickButton_HaveLabel('Next candidate')
})
Then(/^I verify switch student004 successfully$/, () => {
     Cypress.auiCommon.verifyCurrentUser(student004.name)
})
When(/^I click previous candidate button$/, () => {
     Cypress.auiCommon.clickButton_HaveLabel('Previous candidate')
})

// Scenario: Admin verify switch candidate table info in Double-blind marking
Given(/^I switch Double-blind marking$/, () => {
     cy.wait(2000)
     Cypress.PageExamMark.closeMarkProgress(1)
     Cypress.PageExamCreate.leftNavigationTo(5)
     Cypress.PageExamGrade.clickHeaderBtn(2)
     Cypress.auiCommon.clickPopupMenuitemBtn(1)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
     Cypress.PageExamCreate.leftNavigationTo(4)
     Cypress.PageExamMark.clickSwitchMarkingProgressSettingBtn(1)
})
Then(/^I assign marker1, marker2 to all$/, () => {
     Cypress.auiCommon.clickStickySectionBtn(1)
     Cypress.auiCommon.clickPopupMenuitemBtn(3)
     Cypress.auiCommon.comboBoxInput_InPanel(marker1, 0)
     Cypress.auiCommon.comboBoxInput_InPanel(marker2, 1)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
Then(/^I assign admin, marker1 to student001$/, () => {
     Cypress.PageExamAttendance.chooseStudent(0)
     Cypress.auiCommon.clickStickySectionBtn(1)
     Cypress.auiCommon.clickPopupMenuitemBtn(0)
     Cypress.auiCommon.comboBoxInput_InPanel(marker2, 0)
     Cypress.auiCommon.comboBoxInput_InPanel(marker1, 1)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
When(/^I mark score$/, () => {
     Cypress.PageExamMark.enterExamInMarkingProgress(0)
})
Then(/^I click switch candidate and verify switch candidate table info in Double-blind marking$/, () => {
     Cypress.PageExamMark.clickSwitchCandidateBtn()
     let student001_Info = {
          rowIndex: 1,
          columns: [
               // {
               //      index: 1,
               //      display: 'Candidate name',
               //      value: student001.name
               // },
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
               // {
               //      index: 3,
               //      display: 'Marker 1',
               //      value: marker2
               // },
               // {
               //      index: 4,
               //      display: 'Marker 2',
               //      value: marker1
               // },
               {
                    index: 6,
                    display: 'Marking progress',
                    value: '0/1'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 5, marker2)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 6, marker1)
})

// Scenario: Admin verify filter marker in switch candidate table in Double-blind marking
When(/^I filter marker1 in Double-blind marking$/, () => {
     Cypress.PageExamMark.switchCandidateListFilter_InDoubleBlindMark('Marker 1', marker1)
})
Then(/^I verify filter marker is right$/, () => {
     let student002_Info = {
          rowIndex: 1,
          columns: [
               // {
               //      index: 1,
               //      value: student002.name
               // },
               {
                    index: 2,
                    value: student002.id
               },
               // {
               //      index: 3,
               //      value: marker1
               // },
               // {
               //      index: 4,
               //      value: marker2
               // },
               {
                    index: 6,
                    display: 'Marking progress',
                    value: '0/1'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student002_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 5, marker1)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 6, marker2)
})
And(/^I switch student002$/, () => {
     Cypress.auiCommon.chooseCheckbox(0)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify switch student002 successfully$/, () => {
     Cypress.auiCommon.verifyCurrentUser(student002.name)
})

// Scenario: Marker1 confirm score in regular marking
Given(/^I switch regular marking assign marker to student001$/, () => {
     Cypress.PageExamMark.closeMarkProgress(1)
     Cypress.PageExamMark.clickSwitchMarkingProgressSettingBtn(0)
     cy.wait(4000)
     Cypress.auiCommon.chooseCheckbox(2)
     Cypress.PageExamMark.clickAssignMarkertoSelectStudents()
     Cypress.PageExamMark.searchMarker(marker1)
     Cypress.PageExamMark.searchMonitor(marker2)
     Cypress.PageExamMark.searchChecker(marker3)
     Cypress.PageExamMark.confirmSave("Save")
})
Then(/^Marker login confirm score$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(marker1_userId)
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageExamMark.enterMarkingProgress(0)
     Cypress.PageExamMark.enterExamInMarkingProgress(0)
     Cypress.PageExamMark.inputScore(0)
     Cypress.PageExamMark.closeMarkProgress()
     Cypress.PageExamMark.confirmScore()
     cy.logoutApi()
})

// Scenario: Filter marker status in marking progress
When(/^I filter confirmed in marking progress$/, () => {
     cy.wait(4000)
     Cypress.PageExamMark.Filter('Marker status','Unconfirmed')
})
Then(/^I verify have 1 result in marking progress$/, () => {
     Cypress.PageExamMark.verifyTotalCandidateTips(1)
})