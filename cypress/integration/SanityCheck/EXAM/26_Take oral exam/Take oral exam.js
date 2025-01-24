/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let student001 = '', student002 = '', examName = '', instru = ''
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     student001 = env[ct].Candidates[0].userid
     student002 = env[ct].Candidates[1].userid
     cy.fixture("oralExamInfo.json").then(($examInfo) => {
          examName = $examInfo.examName
          instru = $examInfo.instruction
     })
})

//Scenario: Start session to student001 and student002
Given(/^Admin enter the oral exam marking page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(5000)
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageExamMark.enterMarkingProgress(0)
});
Then(/^I start 001 session and end 001 session$/, () => {
     // Start session
     Cypress.PageExamMark.enterExamInMarkingProgress(0)
     Cypress.PageExamMark.startSession()
     Cypress.auiCommon.verifyToast('The session was started.')
     // End session
     Cypress.PageExamMark.endSession()
     Cypress.auiCommon.verifyToast('The session was ended.')
     Cypress.PageExamMark.closeMarkProgress(0)
});
Then(/^I start 002 session$/, () => {
     Cypress.PageExamMark.enterExamInMarkingProgress(1)
     Cypress.PageExamMark.startSession()
});
Then(/^I logout$/, () => {
     cy.logoutApi()
});

//Scenario: Student001 filter oral exam
Given(/^I login as Student001$/, () => {
     cy.LoginByLocal(student001)
});
Then(/^I enter exam home page$/, () => {
     Cypress.PageAdminCommon.visitExam(5000)
});
Then(/^I filter oral exam$/, () => {
     Cypress.PageExamHome.filter('Exam type', 'Oral exam')
});

//Scenario: Verify student001 oral exam card display completed
Given(/^I search the oral exam$/, () => {
     Cypress.PageExamHome.searchExam(examName)
});
Then(/^I verify exam card display completed$/, () => {
     let card1 = {
          title: examName,
          totalQues: 1,
          fullScore: 1,
          status: 'Completed'
     }
     Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card1)
});

//Scenario: Student002 oral exam card display right with view instructions and click
Given(/^I login as Student002$/, () => {
     cy.LoginByLocal(student002)
});
Then(/^I verify exam card display view instructions and click$/, () => {
     Cypress.PageStudentExam.viewInstructionExam(0)
});
Then(/^I verify exam instruction display right$/, () => {
     Cypress.PageStudentTakeExam.verifyExamInstruction(instru)
});
