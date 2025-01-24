/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let newQues, course = 'AT001', questionType

before(() => {
    cy.fixture("/CreateDate/newQuestion.json").then(($basic) => {
        questionType = $basic.toCreateQuestionType
        newQues = $basic.standardQuestions[questionType]
        cy.log(`will create ${questionType}, ${newQues.title}`)
    })
})

Given(/^App Admin login, go to Bank Page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Bank')
    Cypress.PageBankQuestion.createQuestion()
    cy.wait(1500)
});
Then(/^Create Question$/, () => {
    cy.get('#aui_comboboxshell_0')
        .click({ force: true })
        .wait(1000)
    Cypress.PageAdminCourse.search(course)
    cy.log(newQues)

    Cypress.PageBankQuestion.fillQuestionForm(newQues)
    Cypress.auiCommon.closeToast()
    Cypress.PageBankQuestion.search(newQues.title)
})