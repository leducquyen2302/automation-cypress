import { searchBox, dialog, table } from '../../css/common.constants'
import { examButton, instructionPage, takingPage, submitPage, examPage, examDetail } from '../../css/Exam/exam.constants'

Cypress.ExamPage = Cypress.ExamPage || {}

const expectBeforeSubmit = {
    numSubmitInChart: '0',
    UserID: 'Scan_ZTstu01@snapmail.cc',
    attendanceStatus: 'Not started',
    examinationStatus: 'Not started',
    submissionStatus: 'Not submitted',
    totalScore: '',
    publishStatus: 'Not published',
    publishTime: '',

}
const expectAfterSubmit = {
    numSubmitInChart: '1',
    UserID: 'Scan_ZTstu01@snapmail.cc',
    attendanceStatus: 'Present',
    examinationStatus: 'Submitted',
    submissionStatus: 'Submitted',
    totalScore: '0',
    publishStatus: 'Published',
    publishTime: '',
}

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
    cy.get(instructionPage.button).should('be.visible').and('not.be.disabled').click()
    cy.wait(1000)
    cy.window().then((window) => {
        cy.stub(window.navigator.mediaDevices, 'getUserMedia').resolves();
    })
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
    cy.waitLoading()
    cy.wait(2000)
    cy.get(instructionPage.button).should('be.visible').click()
    // cy.get(dialog.modal).find('aui-button').eq(1).click()
    cy.waitLoading()
    // //accept share screen
    // cy.get(takingPage.shareScreenDialog).should('be.visible').find('button').click()
    // cy.wait(2000)
}

Cypress.ExamPage.answerAllQuestions = () => {
    // answerCategoization('')
    cy.get(takingPage.nextQuestion).eq(1).click().wait(1000)
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
    //     .click()
    // cy.waitLoading()
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

Cypress.ExamPage.verifyResultBeforeCandidateSubmitAttendancePage = (candidateName) => {
    cy.get(examDetail.attendace).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.attendanceChartValue).eq(0)
        .should('be.visible')
        .should('have.text', expectBeforeSubmit.numSubmitInChart)

    //filter user id
    cy.get(examDetail.attendaceHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 20 })
    cy.waitLoading()

    //check value before submit
    cy.verifyCellValueOfTable(examDetail.attendanceTable, 'User ID', expectBeforeSubmit.UserID, 1)
    cy.verifyCellValueOfTable(examDetail.attendanceTable, 'Attendance status', expectBeforeSubmit.attendanceStatus, 1)
    cy.verifyCellValueOfTable(examDetail.attendanceTable, 'Examination status', expectBeforeSubmit.examinationStatus, 1)

}

Cypress.ExamPage.verifyResultBeforeCandidateSubmitMarkingPage = (candidateName) => {
    cy.get(examDetail.marking).should('be.visible').click()
    cy.waitLoading()
    //filter candidate name
    cy.get(examDetail.markingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.verifyCellValueOfTable(examDetail.markingTable, 'User ID', expectBeforeSubmit.UserID, 1)
    cy.verifyCellValueOfTable(examDetail.markingTable, 'Submission status', expectBeforeSubmit.submissionStatus, 1)
    cy.verifyCellValueOfTable(examDetail.markingTable, 'Total score', expectBeforeSubmit.totalScore, 1)

}

Cypress.ExamPage.verifyResultBeforeCandidateSubmitGradingPage = (candidateName) => {
    cy.get(examDetail.grading).should('be.visible').click()
    cy.waitLoading()
    //filter candidate name
    cy.get(examDetail.gradingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.verifyCellValueOfTable(examDetail.gradingTable, 'User ID', expectBeforeSubmit.UserID, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Attendance status', expectBeforeSubmit.attendanceStatus, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Submission status', expectBeforeSubmit.submissionStatus, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Total score', expectBeforeSubmit.totalScore, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Publish status', expectBeforeSubmit.publishStatus, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Publish time', expectBeforeSubmit.publishTime, 1)


}

Cypress.ExamPage.filterExamHasNameAndViewDetail = (examName) => {
    Cypress.CommonPage.clickLeftNavigation('Exam')
    cy.waitLoading()
    cy.get(searchBox.searchField).should('be.visible').eq(0).type(examName + '{enter}', { delay: 10 })
    cy.waitLoading()
    cy.get(examPage.examName).eq(0).click()
    cy.waitLoading()
}

Cypress.ExamPage.verifyResultAfterCandidateSubmitAttendancePage = (candidateName) => {
    cy.get(examDetail.attendace).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.attendanceChartValue).eq(0)
        .should('be.visible')
        .should('have.text', expectAfterSubmit.numSubmitInChart)
    //filter user id
    cy.get(examDetail.attendaceHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 20 })
    cy.waitLoading()
    //check value after submit
    cy.verifyCellValueOfTable(examDetail.attendanceTable, 'User ID', expectAfterSubmit.UserID, 1)
    cy.verifyCellValueOfTable(examDetail.attendanceTable, 'Attendance status', expectAfterSubmit.attendanceStatus, 1)
    cy.verifyCellValueOfTable(examDetail.attendanceTable, 'Examination status', expectAfterSubmit.examinationStatus, 1)
}

Cypress.ExamPage.verifyResultAfterCandidateSubmitMarkingPage = (candidateName) => {
    cy.get(examDetail.marking).should('be.visible').click()
    cy.waitLoading()
    //filter candidate name
    cy.get(examDetail.markingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.verifyCellValueOfTable(examDetail.markingTable, 'User ID', expectAfterSubmit.UserID, 1)
    cy.verifyCellValueOfTable(examDetail.markingTable, 'Submission status', expectAfterSubmit.submissionStatus, 1)
    // cy.verifyCellValueOfTable(examDetail.markingTable, 'Total score', expectAfterSubmit.totalScore, 1)

}

Cypress.ExamPage.unpublishScoreAll = () => {
    cy.get(examDetail.unpublish).should('be.visible').click()
    cy.contains('Unpublish results for all').should('be.visible').click()
    cy.get('.aui-dialog-modal aui-button[text="Unpublish"]')
        .should('be.visible')
        .click().wait(1000)
    cy.waitLoading()
}

Cypress.ExamPage.publishScoreOfCandidate = (candidateName) => {
    //filter candidate name
    cy.get(examDetail.gradingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.contains(candidateName)
        .invoke('attr', 'data-cell')
        .then((dataCell) => {
            const row = dataCell.split(',')[0]
            cy.get('.aui-table-row[data-row="' + row + '"] [name="MarkScoreList-Checkbox"]').eq(0).click
        })
    cy.get(examDetail.publishScore).click()
    cy.contains('Publish to selected candidates').should('be.visible').click()
    cy.get('.aui-dialog-modal aui-button[text="Publish"]')
        .should('be.visible')
        .click().wait(1000)
    cy.waitLoading()
}

Cypress.ExamPage.verifyResultAfterCandidateSubmitGradingPage = (candidateName) => {

    cy.verifyCellValueOfTable(examDetail.gradingTable, 'User ID', expectAfterSubmit.UserID, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Attendance status', expectAfterSubmit.attendanceStatus, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Submission status', expectAfterSubmit.submissionStatus, 1)
    cy.verifyCellValueOfTable(examDetail.gradingTable, 'Total score', expectAfterSubmit.totalScore, 1)
    // cy.verifyCellValueOfTable(examDetail.gradingTable, 'Publish status', expectAfterSubmit.publishStatus, 1)
    // cy.verifyCellValueOfTable(examDetail.gradingTable, 'Publish time', expectAfterSubmit.publishTime, 1)
}


Cypress.ExamPage.delteteExamCreated = (examName) => {
    cy.deleteExamByAPI(examName)
    cy.log('delete exam name   = ' + JSON.stringify(examName))
}

Cypress.ExamPage.deltetePaperCreated = () => {
    cy.deletePaperByAPI('TutuPaper_' + date)
    cy.log('delete paper name   = ' + 'TutuPaper_' + date)
}










