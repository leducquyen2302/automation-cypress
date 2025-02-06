import { searchBox, dialog } from '../../css/common.constants'
import { examButton, instructionPage, takingPage, submitPage } from '../../css/Exam/exam.constants'

import '@4tw/cypress-drag-drop'

Cypress.ExamPage = Cypress.ExamPage || {}

let submittedMessageText = 'You have submitted the answers and ended your exam!'
Cypress.ExamPage.createExamForCourse = (courseCode, paperName, paperBody, examBody) => {
    // cy.log('examBody   = ' + JSON.stringify(examBody))
    cy.createExamAndPublishExamByAPI(courseCode, paperName, paperBody, examBody)
}

Cypress.ExamPage.goToInstructionsPageOfExam = (examName) => {
    Cypress.CommonPage.clickLeftNavigation('Exam')
    cy.wait(3000)
    cy.get(searchBox.searchField).eq(0).type(examName + '{enter}', { delay: 20 })
    cy.waitLoading()
    cy.get(examButton.enterExam).eq(0).click()
    cy.wait(10000)
    //handle environment checking
    cy.get(instructionPage.button).should('be.visible').click()
    cy.wait(1000)
    cy.window().then((window) => {
        cy.stub(window.navigator.mediaDevices, 'getUserMedia').resolves();
    })
    // cy.wait(10000)
    cy.get(dialog.dialogTitle)
        .should('be.visible')
        .should('contain', 'Environment check')
    cy.get(instructionPage.envFooterButton).click()
    cy.wait(6000)
    //finish recording
    cy.get(instructionPage.envFooterButton).should('be.visible').and('not.be.disabled').click()
    cy.wait(1000)
    //submit recored env check
    cy.get(instructionPage.envFooterButton).eq(1).click()
    cy.wait(3000)
}

Cypress.ExamPage.enterExam = () => {
    //enter exam 
    cy.wait(3000)
    cy.get(instructionPage.button).should('be.visible').click()
    // cy.get(dialog.modal).find('aui-button').eq(1).click()
    cy.wait(1000)
    // //accept share screen
    // cy.get(takingPage.shareScreenDialog).should('be.visible').find('button').click()
    // cy.wait(2000)
}

Cypress.ExamPage.answerAllQuestions = () => {
    // answerCategoization('')
    cy.get(takingPage.nextQuestion).eq(1).click()
    cy.contains('Submit and end exam').should('be.visible').click()
    cy.contains('End exam').should('be.visible').click()
    cy.waitLoading()
}

Cypress.ExamPage.submitExamSuccess = () => {

    cy.get(submitPage.submitedIcon)
        .should('be.visible')
        .should('have.attr', 'src', '/taking/resources/images/examapp-completed-succ.svg')
    cy.get(submitPage.submitMessage)
        .should('contain.text', submittedMessageText)
    cy.get(submitPage.backToHomePageBtn)
        .should('be.visible')
        .click()
    cy.waitLoading()
    cy.wait(3000)

}

function answerCategoization(answer) {
    if (answer === '') {
        cy.wait(3000)
        cy.get('.drop-area-from-option [style="display: block;"] .drag-option').eq(0)
            .drag('.options-order-column .order-options-item:nth-child(1)').wait(1000)
    }
    cy.wait(2000)
}

function answerMultipleChoice(answer) { }
function fileUpload() { }
function answerMatching() { }
function answerSingleChoice() { }
function answerEssay() { }
function answerFIB() { }
function answerMultipleDropdown() { }
function answerTrueFalse() { }

Cypress.ExamPage.delteteExamCreated = (examName) => {
    cy.deleteExamByAPI(examName)
    cy.log('delete exam name   = ' + JSON.stringify(examName))

}
Cypress.ExamPage.deltetePaperCreated = () => {
    cy.deletePaperByAPI('TutuPaper_' + date)
    cy.log('delete paper name   = ' + 'TutuPaper_' + date)
}







