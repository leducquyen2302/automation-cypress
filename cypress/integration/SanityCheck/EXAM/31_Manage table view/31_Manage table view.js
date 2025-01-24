/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let system = '', student001 = '', cm = ''
let viewName = 'Auto test view Name'
let edit_viewName = 'Edit Auto test view Name'
let examName = ''

before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     system = env[ct].System
     cm = env[ct].CM
     student001 = env[ct].Candidates[0]
})

// Scenario: Verify all columns tab display right on manage views panel
Given(/^Login as system admin$/, () => {
     cy.LoginExamAsSystem()
     cy.readFile('cypress/fixtures/01_02_CreateFixedReadingExam.json').then(($data) => {
          examName = $data
     })
})
Then(/^Enter marking progress$/, () => {
     Cypress.PageAdminCommon.visitExam(70000)
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageExamMark.enterMarkingProgress(0)
     cy.wait(5000)
})
When(/^I click manage views$/, () => {
     Cypress.PageExamMark.clickManageViewsBtn()
})
Then(/^I verify All columns tab display highlight and default$/, () => {
     Cypress.PageExamMark.verifyHightLight_InManageViews(0, 'true', true)
})
And(/^I verify set as default display yes$/, () => {
     Cypress.PageExamMark.verifyDefaultValue('Yes')
})
And(/^I verify all columns are checked$/, () => {
     Cypress.PageExamMark.verifyAllColumnsSelected()
})
When(/^I click edit all columns$/, () => {
     Cypress.PageExamMark.clickEditViewBtn()
})
Then(/^I verify name cannot edit and set as default button checked$/, () => {
     Cypress.PageExamMark.verifyEditViewNameDisabled()
})
Then(/^I click cancel$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog(0)
})

// Scenario: Create view in regular marking
Given(/^I click create view$/, () => {
     Cypress.PageExamMark.clickCreateViewBtn()
})
When(/^I click save create view button$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify illegal tip$/, () => {
     Cypress.auiCommon.verifyValiMessage(1, 'Enter a value to proceed.')
})
Then(/^I input name and set as default/, () => {
     Cypress.PageExamMark.inputViewName(viewName)
     Cypress.PageExamMark.checkDefaultView()
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify just create view is highlight and display default$/, () => {
     Cypress.PageExamMark.verifyHightLight_InManageViews(1, 'true', true)
})
And(/^I verify Candidate name, Total score, Marking progress, Marker status, Marking status Double-blind marking, Action are disabled check$/, () => {
     Cypress.PageExamMark.verifyViewDefaultCheck(['Candidate name', 'Total score', 'Marking progress', 'Marker status', 'Marking status (Double-blind marking)', 'Action'])
})
Then(/^I check Candidate ID and click move up$/, () => {
     Cypress.PageExamMark.checkViewColumn(1)
     Cypress.PageExamMark.moveUpViewColumn(1)
})
Then(/^I click save manage views$/, () => {
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
Then(/^I verify table display right in regular marking$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Candidate ID',
                    value: student001.id
               },
               {
                    index: 3,
                    display: 'Total score',
                    value: ''
               },
               {
                    index: 4,
                    display: 'Marking progress',
                    value: '0/1 question marked'
               },
               // {
               //      index: 5,
               //      display: 'Marking status',
               //      value: 'Uncompleted'
               // },
               {
                    index: 5,
                    display: '',
                    value: 'Mark score'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 3, student001.name)
})

// Scenario: Verify view in double mind marking
Given(/^I switch double mind marking$/, () => {
     Cypress.PageExamMark.clickSwitchMarkingProgressSettingBtn(1)
})
Then(/^I verify default view is just created$/, () => {
     Cypress.PageExamMark.manageColumnsDisplayText(viewName)
})
Then(/^I verify table display right in double mind marking$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Candidate ID',
                    value: student001.id
               },
               {
                    index: 3,
                    display: 'Total score',
                    value: ''
               },
               {
                    index: 4,
                    display: 'Marking progress',
                    value: '0/1 question marked'
               },
               {
                    index: 5,
                    display: 'Marking status',
                    value: 'Uncompleted'
               },
               {
                    index: 6,
                    display: '',
                    value: 'Mark score'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 3, student001.name)
})

// Scenario: Edit view in double mind marking
Then(/^I verify All columns tab set as default display No$/, () => {
     Cypress.PageExamMark.verifyDefaultValue('No')
})
When(/^I switch just created view$/, () => {
     Cypress.PageExamMark.clickTab_InManageViewsPanel(1)
})
Then(/^I move down Candidate ID$/, () => {
     Cypress.PageExamMark.moveDownViewColumn(0)
})
And(/^I edit the view name$/, () => {
     Cypress.PageExamMark.clickEditViewBtn()
     Cypress.PageExamMark.inputViewName(edit_viewName)
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify table display right after edit in double mind marking$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 2,
                    display: 'Candidate ID',
                    value: student001.id
               },
               {
                    index: 3,
                    display: 'Total score',
                    value: ''
               },
               {
                    index: 4,
                    display: 'Marking progress',
                    value: '0/1 question marked'
               },
               {
                    index: 5,
                    display: 'Marking status',
                    value: 'Uncompleted'
               },
               {
                    index: 6,
                    display: '',
                    value: 'Mark score'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, student001.name)
})

// Scenario: CM check marking progress table view
Given(/^Login as CM$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(cm.userid)
})
Then(/^I verify table display all columns$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 2,
                    display: 'Candidate ID',
                    value: student001.id
               },
               {
                    index: 4,
                    display: 'Status',
                    value: 'Active'
               },
               {
                    index: 6,
                    display: 'Class name',
                    value: 'Class 1'
               },
               {
                    index: 7,
                    display: 'Submission status',
                    value: 'Not submitted'
               },
               {
                    index: 8,
                    display: 'Team name',
                    value: 'Group 1'
               },
               {
                    index: 9,
                    display: 'Total score',
                    value: ''
               },
               {
                    index: 10,
                    display: 'Tolerance',
                    value: ''
               },
               {
                    index: 11,
                    display: 'Marking progress',
                    value: '0/1 question marked'
               },
               {
                    index: 12,
                    display: 'Marking status',
                    value: 'Uncompleted'
               },
               {
                    index: 13,
                    display: '',
                    value: 'Mark score'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, student001.name)
})

// Scenario: System delete just created table view
Given(/^CM logout and login as system admin$/, () => {
     cy.logoutApi()
     cy.LoginExamAsSystem()
})
Then(/^I delete just created table view$/, () => {
     Cypress.PageExamMark.deleteTableView()
})

// Scenario: Verify view in grading progress
Given(/^I enter grading progress$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(5)
})
Then(/^I verify table view name display all columns$/, () => {
     Cypress.PageExamMark.manageColumnsDisplayText('All columns')
})
Then(/^I create table view and set default in grading progress$/, () => {
     Cypress.PageExamMark.clickCreateViewBtn()
     Cypress.PageExamMark.inputViewName(viewName)
     Cypress.PageExamMark.checkDefaultView()
     Cypress.auiCommon.clickFooterBtnInDialog(1)
})
Then(/^I verify table view is just created in grading progress$/, () => {
     let student001_Info = {
          rowIndex: 1,
          columns: [
               {
                    index: 1,
                    display: 'Candidate ID',
                    value: student001.id
               },
               {
                    index: 2,
                    display: 'Candidate name',
                    value: student001.name
               },
               {
                    index: 3,
                    display: 'Total score',
                    value: ''
               },
               {
                    index: 4,
                    display: 'Publish status',
                    value: 'Not published'
               },
          ]
     }
     Cypress.auiCommon.verifyTable(student001_Info)
})

// Scenario: Edit table view set all columns default in grading progress
Then(/^I set as default$/, () => {
     Cypress.PageExamMark.checkDefaultView()
     Cypress.auiCommon.clickFooterBtnInDialog(1)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
And(/^I verify table display all columns in grading progress$/, () => {
     Cypress.PageExamMark.manageColumnsDisplayText('All columns')
})