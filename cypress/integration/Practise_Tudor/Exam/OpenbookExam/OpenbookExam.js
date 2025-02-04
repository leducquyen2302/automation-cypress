Given(/^Login as service admin$/, () => {
    cy.LoginExamAsSystem()
})

When(/^I prepare a new Openbook exam before taking the exam$/, () => {
    Cypress.ExamPage.createExamForCourse()
})

Then(/^I verify candidate taking the exam and submitting the answers normally$/, () => {
    Cypress.ExamPage.delteteExamCreated()
})
