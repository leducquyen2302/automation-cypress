/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let today = new Date()
let student001 = '', student002 = '', invigilator1 = '', invigilator2 = '', examName = '', instru = ''
let score_student001 = 0.2
let score_student002 = 0.5
let examObj = {
     name: 'FileSaveTrackingExam_' + new Date().toJSON(),
     courseCode: 'AT001',
     instruc: 'Long Text Area Instruction to Candidates! \rGood Luck:) ',
     invigilator: '',
     paperName: 'FileSaveTrackingExamPaper_' + new Date().toLocaleString(),
     paperContent: 'paperContent_' + new Date().toLocaleString(),
}
const fileUploadName = 'test word.docx'
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     student001 = env[ct].Candidates[0]
     student002 = env[ct].Candidates[1]
})

// Scenario: Create exam with file save tracking question
Given(/^Create exam with file save tracking question$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(5000)
     Cypress.PageExamHome.clickCreateExam()
     Cypress.PageExamCreate.inputExamNameWithCode(examObj.name)
     Cypress.PageExamCreate.inputCourse(examObj.courseCode)
     Cypress.PageExamCreate.chooseExamType(0)
     Cypress.PageExamCreate.examStartTime(0, 21, 0)
     Cypress.PageExamCreate.examEndTime(0, 22, 0)
     Cypress.PageSampleExamCreate.addAuthorisedApplication('Microsoft Word')
     Cypress.PageSampleExamCreate.addAuthorisedApplication('Microsoft Word', true)
     Cypress.PageExamCreate.saveNextForm()
     Cypress.PageExamCreate.saveNextForm()
     Cypress.PageExamCreate.examCreateOralPaperDirectly(examObj.paperName, examObj.paperContent, true, 12, fileUploadName)
     Cypress.PageExamCreate.examPublish()
})

// Scenario: Enter file save tracking page and verify only show candidates without saving
Given(/^Enter file save tracking page$/, () => {
     Cypress.PageExamHome.searchExam(examObj.name)
     Cypress.PageExamHome.enterExamByCardTitle()
     Cypress.PageExamCreate.leftNavigationTo(4)
})
When(/^I click only show candidates without saving$/, () => {
     Cypress.PageFileSaveTracking.clickOnlyShowCandidatesWithoutSavingBtn()
})
Then(/^I verify no items to show$/, () => {
     Cypress.PageSampleReport.verifyMessage('No items to show in this view.')
})
Then(/^I cancel check it$/, () => {
     Cypress.PageFileSaveTracking.clickOnlyShowCandidatesWithoutSavingBtn()
})

// Scenario: Filter Attendance status is Present
Given(/^I filter Attendance status is Present$/, () => {
     Cypress.PageFileSaveTracking.filter('Attendance status', 'Present')
})

// Scenario: Filter Submission status is Submitted
Given(/^I reenter this page$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(3)
     Cypress.PageExamCreate.leftNavigationTo(4)
})
Then(/^I filter Submission status is Submitted$/, () => {
     Cypress.PageFileSaveTracking.filter('Submission status', 'Submitted')
})

// Scenario: Verify refresh button
Then(/^I search student001$/, () => {
     Cypress.auiCommon.search(student001.name)
})
When(/^I click refresh button$/, () => {
     Cypress.PageFileSaveTracking.clickRefreshBtn()
})
Then(/^I verify total 1 candidates and have update tip$/, () => {
     Cypress.PageFileSaveTracking.verifyTotalCandidates(1)
})

// Scenario: Verify basic info
Then(/^I verify student001 table info$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               // {
               //      index: 0,
               //      display: 'Candidate name',
               //      value: student001.name
               // },
               {
                    index: 1,
                    display: 'Candidate ID',
                    value: student001.id
               },
               {
                    index: 2,
                    display: 'Attendance status',
                    value: 'Not started'
               },
               {
                    index: 3,
                    display: 'Examination status',
                    value: 'Not started'
               },
               {
                    index: 4,
                    value: 'Not opened'
               }
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, student001.name)
})
When(/^I click view question content$/, () => {
     Cypress.PageFileSaveTracking.clickViewQuestionContentBtn()
})
Then(/^I verify question content is right$/, () => {
     Cypress.PageFileSaveTracking.verifyViewQuestionContent(examObj.paperContent, fileUploadName)
})