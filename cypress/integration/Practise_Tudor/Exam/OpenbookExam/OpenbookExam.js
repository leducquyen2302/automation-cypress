Given(/^Login as service admin$/, () => {
    cy.LoginExamAsSystem()
})

When(/^I prepare a new Openbook exam before taking the exam$/, () => {
    Cypress.ExamPage.createExamForCourse()
})