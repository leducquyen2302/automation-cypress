import { searchBox, dialog, table, comboBox } from '../../css/common.constants'
import { livProcPage, markingPage, examButton, instructionPage, takingPage, submitPage, examPage, examDetail, viewResult } from '../../css/Exam/exam.constants'

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
    totalScore: '',
    publishStatus: 'Published',
    publishTime: '',
}

const result = {
    userId: '',
    attendanceStatus: '',
    submissionStatus: '',
    score: '',
    totalScore: '',
    publishStatus: ''
}

let submittedMessageText = 'You have submitted the answers and ended your exam!'
Cypress.ExamPage.createExamForCourse = (courseCode, paperName, paperBody, examBody, examType) => {
    // cy.log('examBody   = ' + JSON.stringify(examBody))
    let type = 1
    if (examType === 'close book') {
        type = 0
        examBody.enableFacialRecognition = false
        examBody.enableIdVerification = false
        examBody.enableEnvironmentCheck = false
        examBody.enableScreenRecording = true
        examBody.enableCandidateRecording = true
        examBody.enableVideoProctoring = true
        examBody.screenRecording = true
    }

    examBody.examType = type
    cy.createExamAndPublishExamByAPI(courseCode, paperName, paperBody, examBody)
}

Cypress.ExamPage.goToInstructionsPageOfExam = (examName) => {
    Cypress.CommonPage.clickLeftNavigation('Exam')
    cy.get(examButton.enterExam).should('be.visible')
    cy.get(searchBox.searchField, { timeout: 5000 }).eq(0).type(examName + '{enter}', { delay: 20 })
    cy.waitLoading()
    cy.get(examButton.enterExam).eq(0).click()
    // cy.wait(10000)
    // handle environment checking
    // cy.get(instructionPage.button).should('be.visible').and('not.be.disabled').click()
    // cy.wait(1000)
    // cy.window().then((window) => {
    //     cy.stub(window.navigator.mediaDevices, 'getUserMedia').resolves();
    // })
    // cy.get(dialog.dialogTitle)
    //     .should('be.visible')
    //     .should('contain', 'Environment check')
    // cy.get(instructionPage.envFooterButton).click()
    // cy.wait(6000)
    // //finish recording
    // cy.get(instructionPage.envFooterButton).should('be.visible').and('not.be.disabled').click()
    // cy.wait(1000)
    // //submit recored env check
    // cy.get(instructionPage.envFooterButton).eq(1).click()
    // cy.wait(3000)
}

Cypress.ExamPage.enterExam = () => {
    //enter exam 
    cy.waitLoading()
    cy.wait(2000)
    cy.get(instructionPage.button, { timeout: 5000 }).should('be.visible').and('not.be.disabled').click()
    // cy.get(dialog.modal).find('aui-button').eq(1).click()
    cy.waitLoading()
    // //accept share screen
    // cy.get(takingPage.shareScreenDialog).should('be.visible').find('button').click()
    // cy.wait(2000)
}

Cypress.ExamPage.answerAllQuestions = () => {
    answerCategoization('')
    cy.get(takingPage.nextQuestion).should('be.visible').eq(1).click()

    answerMultipleChoice(['answer : 1', 'answer : 2'])
    cy.get(takingPage.nextQuestion).should('be.visible').eq(1).click()

    answerMatching('')
    cy.get(takingPage.nextQuestion).should('be.visible').eq(1).click()

    answerOrdering('')
    cy.get(takingPage.nextQuestion).should('be.visible').eq(1).click()

    answerSingleChoice('')
    cy.get(takingPage.nextQuestion).should('be.visible').eq(1).click()

    answerFIB('')
    cy.get(takingPage.nextQuestion).should('be.visible').eq(1).click()

    answerMultipleDropdown('')
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
    cy.wait(1000)
}

function answerCategoization(answer) {
    let numberAnswer = answer.length
    cy.get('.options-item.option-entity.option-move').each(($option, index) => {
        if (numberAnswer !== 0) {
            cy.wrap($option).contains(answer[index]).click()
            cy.get('.question-font-style.padding-bottom-s').eq(i).click()
        } else {
            cy.wrap($option).click()
            cy.get('.question-font-style.padding-bottom-s').eq(0).click()
        }
    })
}
function answerMultipleChoice(answer) {
    let numberAnswer = answer.length
    if (numberAnswer !== 0) {
        for (let i = 0; i < numberAnswer; i++) {
            cy.log('answer : ' + answer[i])
            cy.get('.singleChoice-input').contains(answer[i]).click()
        }
    }
}
function fileUpload() { }
function answerMatching() {
    cy.get('.matching-item .left').each(($opt, index) => {
        cy.wrap($opt).click()
        cy.get('.matching-item .right').eq(index).click()
    })
}
function answerOrdering() {
    cy.get('.order-options-wrap:nth-child(1) .had-option').each(() => {
        cy.get('.order-options-wrap:nth-child(1) .had-option', { timeout: 2000 }).eq(0).click()
        cy.get('.order-options-wrap:nth-child(3) .no-option', { timeout: 2000 }).eq(0).click()
    })
}
function answerSingleChoice(answer) {
    if (answer) {
        cy.log('answer : ' + answer)
        cy.get('.singleChoice-input').contains(answer).click()
    } else {
        cy.get('.singleChoice-input').eq(0).click()
    }
}
function answerEssay() { }
function answerFIB() {
    cy.get('.fib-blank-wrap input').each(($input, index) => {
        cy.wrap($input).type('answer : ' + index, { delay: 10 })
    })
}
function answerMultipleDropdown(answer) {
    cy.get(comboBox.comboBox).each(($combobox) => {
        cy.wrap($combobox).click()
        if (answer) {
            cy.log('answer : ' + answer)
            cy.get(comboBox.textCheckBox).invoke('text').then((text) => {
                if (text.includes(answer)) {
                    cy.get(comboBox.textCheckBox).contains(answer).click()
                }
            })
        } else {
            cy.get(comboBox.textCheckBox).eq(0).click()
        }
    })
}
function answerTrueFalse() { }

Cypress.ExamPage.verifyResultBeforeCandidateSubmitAttendancePage = (candidateName) => {
    cy.get(examDetail.attendace).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.attendanceChartValue).eq(0)
        .should('be.visible')
        .should('have.text', expectBeforeSubmit.numSubmitInChart)
    cy.get(examDetail.attendanceTable).should('be.visible')

    //filter user id
    cy.get(examDetail.attendaceHeader, { timeout: 5000 }).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 20 })
    cy.waitLoading()
    //check value before submit
    cy.getColumnOfTable(examDetail.attendanceTable, 'User ID').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.UserID, 1)
    })
    cy.getColumnOfTable(examDetail.attendanceTable, 'Attendance status').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.attendanceStatus, 1)
    })
    cy.getColumnOfTable(examDetail.attendanceTable, 'Examination status').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.examinationStatus, 1)
    })
}

Cypress.ExamPage.verifyResultBeforeCandidateSubmitMarkingPage = (candidateName) => {
    cy.get(examDetail.marking).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.markingTable).should('be.visible')

    //filter candidate name
    cy.get(examDetail.markingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.getColumnOfTable(examDetail.markingTable, 'User ID').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.UserID, 1)
    })
    cy.getColumnOfTable(examDetail.markingTable, 'Submission status').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.submissionStatus, 1)
    })
    cy.getColumnOfTable(examDetail.markingTable, 'Total score').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.totalScore, 1)
    })
}

Cypress.ExamPage.verifyResultBeforeCandidateSubmitGradingPage = (candidateName) => {
    cy.get(examDetail.grading).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.gradingTable).should('be.visible')

    //filter candidate name
    cy.get(examDetail.gradingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.getColumnOfTable(examDetail.gradingTable, 'User ID').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.UserID, 1)
    })
    cy.getColumnOfTable(examDetail.gradingTable, 'Attendance status').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.attendanceStatus, 1)
    })
    cy.getColumnOfTable(examDetail.gradingTable, 'Submission status').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.submissionStatus, 1)
    })
    cy.getColumnOfTable(examDetail.gradingTable, 'Total score').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.totalScore, 1)
    })
    cy.getColumnOfTable(examDetail.gradingTable, 'Publish status').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.publishStatus, 1)
    })
    cy.getColumnOfTable(examDetail.gradingTable, 'Publish time').then((col) => {
        cy.verifyCellValueOfTable(col, expectBeforeSubmit.publishTime, 1)
    })

}

Cypress.ExamPage.filterExamHasNameAndViewDetail = (examName) => {
    Cypress.CommonPage.clickLeftNavigation('Exam')
    cy.waitLoading()
    cy.get(examPage.examName).should('be.visible')
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
    cy.get(examDetail.attendanceTable).should('be.visible')

    //filter user id
    cy.get(examDetail.attendaceHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 20 })
    cy.waitLoading()
    //check value after submit
    cy.getColumnOfTable(examDetail.attendanceTable, 'User ID').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.UserID, 1)
    })
    cy.getColumnOfTable(examDetail.attendanceTable, 'Attendance status').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.attendanceStatus, 1)
    })
    cy.getColumnOfTable(examDetail.attendanceTable, 'Examination status').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.examinationStatus, 1)
    })

}

Cypress.ExamPage.verifyResultAfterCandidateSubmitMarkingPage = (candidateName) => {
    cy.get(examDetail.marking).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.markingTable).should('be.visible')

    cy.get(markingPage.totalMarks).should('be.visible').invoke('text').then((text) => {
        cy.log('total marks     :' + text)
        expectAfterSubmit.totalScore = text
        result.totalScore = text
        cy.log('result.totalScore     :' + result.totalScore)

    })
    //filter candidate name
    cy.get(examDetail.markingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()

    cy.getColumnOfTable(examDetail.markingTable, 'User ID').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.UserID, 1)
    })
    cy.getColumnOfTable(examDetail.markingTable, 'Submission status').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.submissionStatus, 1)
    })
    cy.getColumnOfTable(examDetail.markingTable, 'Total score').then((col) => {
        cy.get('.aui-table-cell[data-col="' + col + '"][data-cell="1,' + col + '"]')
            .scrollIntoView({ easing: 'linear', duration: 500 })
            .invoke('text')
            .then((text) => {
                result.score = text
            })
    })
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
    cy.get(examDetail.gradingTable).should('be.visible')
    cy.wait(2000)

    //filter candidate name
    cy.get(examDetail.gradingHeader).find(searchBox.searchField).type(candidateName + '{enter}', { delay: 10 })
    cy.waitLoading()
    cy.wait(1000)

    cy.contains(candidateName)
        .closest('.aui-table-cell')
        .should('exist')
        .invoke('attr', 'data-cell')
        .then((dataCell) => {
            const row = dataCell.split(',')[0]
            cy.get('.aui-table-row[data-row="' + row + '"] [name="MarkScoreList-Checkbox"]').click({ force: true })
        })
    cy.get(examDetail.publishScore).click()
    cy.contains('Publish to selected candidates').should('be.visible').click()
    cy.get('aui-button[name="publish"]')
        .should('be.visible')
        .click().wait(1000)
    cy.waitLoading()
}

Cypress.ExamPage.verifyResultAfterCandidateSubmitGradingPage = () => {
    cy.getColumnOfTable(examDetail.gradingTable, 'User ID').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.UserID, 1).then((text) => {
            result.userId = text
        })
    })

    cy.getColumnOfTable(examDetail.gradingTable, 'Attendance status').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.attendanceStatus, 1).then((text) => {
            result.attendanceStatus = text
        })
    })

    cy.getColumnOfTable(examDetail.gradingTable, 'Submission status').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.submissionStatus, 1).then((text) => {
            result.submissionStatus = text
        })
    })

    cy.getColumnOfTable(examDetail.gradingTable, 'Total score').then((col) => {
        cy.verifyCellValueOfTable(col, result.score, 1).then((text) => {
            result.score = text
        })
    })

    cy.getColumnOfTable(examDetail.gradingTable, 'Publish status').then((col) => {
        cy.verifyCellValueOfTable(col, expectAfterSubmit.publishStatus, 1).then((text) => {
            result.publishStatus = text
        })
    })
    // cy.verifyCellValueOfTable(examDetail.gradingTable, 'Publish time', expectAfterSubmit.publishTime, 1)
}

Cypress.ExamPage.candidateVerifyPublishedScoreOfExam = (examName) => {
    cy.wait(3000)
    cy.get(examPage.studentExamCard).should('be.visible')

    cy.get(searchBox.searchField).should('be.visible').eq(0).type(examName + '{enter}', { delay: 10 })
    cy.waitLoading()

    //check score at exam page
    cy.get(examPage.examScore).should('be.visible').then(($score) => {
        const scoreAct = $score.text().trim().split('/')[0]
        const scoreTotalAct = $score.text().trim().split('/')[1]

        expect(scoreAct).to.equal(result.score)
        expect(scoreTotalAct).to.equal(result.totalScore)
    })
    //check score at View result page
    cy.get(examPage.viewResultBtn).should('be.visible').click()
    cy.waitLoading()
    cy.get(viewResult.score).should('be.visible').invoke('text').then(($text) => {
        let score = $text.split('/')[0].trim()
        let totalScore = $text.split('/')[1].trim()
        expect(score).to.equal(result.score)
        expect(totalScore).to.equal(result.totalScore)
    })
    cy.get(viewResult.status).should('be.visible').invoke('text').then(($text) => {
        expect($text).to.equal(result.submissionStatus)
    })
}

Cypress.ExamPage.verifyAfterCandidateSubmitOnProctoringPage = (canName, examName, expectStt) => {
    cy.get(examDetail.attendace).should('be.visible').click()
    cy.waitLoading()
    cy.get(examDetail.attendanceTable).should('be.visible')
    cy.getExamIdByAPI(examName).then((res) => {
        let examId = res.body.result[0].examId
        let path = 'https://examenauat-sg.dev.edutechonline.org/#/exam/schedule/livevideo?examId=' + examId
        cy.visit(path)
    })
    // cy.get(examDetail.liveProctoringButton).should('be.visible').click()
    verifyCandidateOnProctoringPage(canName, expectStt)
}

function verifyCandidateOnProctoringPage(candidateName, expectStt) {
    cy.get(livProcPage.roomView).should('be.visible')
    //check icon on candidate list
    cy.get(livProcPage.listCandidate + ' aui-profile')
        .shadow()
        .find('aui-avatar')
        .shadow()
        .find('.avatar div')
        .should('have.class', 'img-icon-submitted')

    //check status in room view
    cy.get('.invigilator_roomToolBar_view_item_left[aria-label="' + candidateName + '"]')
        .closest('.invigilator_room_container')
        .find('span')
        .should('have.text', expectStt)
}

Cypress.ExamPage.delteteExamCreated = (examName) => {
    cy.deleteExamByAPI(examName)
    cy.log('delete exam name   = ' + JSON.stringify(examName))
}

Cypress.ExamPage.deltetePaperCreated = () => {
    cy.deletePaperByAPI('TutuPaper_' + date)
    cy.log('delete paper name   = ' + 'TutuPaper_' + date)
}










