/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag } from '../../AUI/aui.common.constants'
import { examClass, examGradeClass, examStudentClass } from '../../AUI/exam.constants'

Cypress.PageStudentExam = Cypress.PageStudentExam || {};

Cypress.PageStudentExam.clickSeeAlllink = () => {
    Cypress.PageExamHome.clickAndVerifyLink('See all', '/exam')
}
Cypress.PageStudentExam.enterExam = (_index) => {
    cy.log('enter exam ')
    cy.get(examClass.examCard).eq(_index).as('card')
    cy.get('@card')
        .find(examClass.examCardFooter)
        .as('footer')
    cy.get('@footer')
        .should('contain', 'Enter exam')
        .as('enter')
        .and('have.class', 'exam-card-footer-highlight')
    cy.get('@enter').find('button')
        .click({ force: true })
    cy.waitLoading()
}
Cypress.PageStudentExam.reenterExam = (_index) => {
    cy.log('enter exam ')
    cy.get(examClass.examCard).eq(_index).as('card')
    cy.get('@card')
        .find(examClass.examCardFooter)
        .as('footer')
    cy.get('@footer')
        .should('contain', 'Re-enter')
        .as('enter')
        .and('have.class', 'exam-card-footer-highlight')
    cy.get('@enter').find('button')
        .click({ force: true })
    cy.waitLoading()
}
Cypress.PageStudentExam.viewInstructionExam = (_index) => {
    cy.log('enter exam ')
    cy.get(examClass.examCard).eq(_index).as('card')
    cy.get('@card')
        .find(examClass.examCardFooter)
        .as('footer')
    cy.get('@footer')
        .should('contain', 'View instruction')
        .as('enter')
        .and('have.class', 'exam-card-footer-highlight')
    cy.get('@enter').find('button')
        .click({ force: true })
    cy.waitLoading()
        .wait(2000)
}

// Verification Command 
Cypress.PageStudentExam.verifyWelcomeConent = (_value) => {
    cy.get(examStudentClass.studWelcome).as('welcome')
    cy.get('@welcome')
        .find(examStudentClass.studWelcomeTitle)
        .should("contain", _value.title)
    if (_value.content) {
        cy.get('@welcome')
            .find(examStudentClass.studWelcomeEntry)
            .eq(0).should("contain", _value.content)
    }
    if (_value.sampletext) {
        cy.get('@welcome')
            .find(examStudentClass.studWelcomeSample)
            .children().shadow().find('span').eq(0)
            .should("contain", _value.sampletext)
    }

};
Cypress.PageStudentExam.verifyStudentExamCardInfo = (_index, _card) => {
    cy.log('verifing exam card')
    cy.get(examClass.examCard).eq(_index).as('card')
    if (_card.title) {
        cy.get('@card')
            .find(examClass.examCardTitle)
            .invoke('attr', 'tabindex', 0)
            .focus().wait(200)
            .should('contain', _card.title)
    }
    if (_card.time) {
        cy.get('@card')
            .find('[data-tooltip="true"]').eq(2)
            .invoke('attr', 'tabindex', 1)
            .focus().wait(200)
            .compareEosDateFormat(_card.time)
    }
    if (_card.flexibleTime) {
        cy.log(`===============================${_card.flexibleTime.endTime}`)
        cy.get('@card')
            .find('[data-tooltip="true"]')
            .eq(2)
            // .invoke('attr', 'tabindex', 1)
            // .focus().wait(200)
            .compareEosDateFormat(_card.flexibleTime.openTime)
            .compareEosTimeFormat(_card.flexibleTime.openTime)
            .compareEosDateFormat(_card.flexibleTime.endTime)
            .compareEosTimeFormat(_card.flexibleTime.endTime)
    }
    if (_card.sumDuration) {
        cy.get('@card')
            .find('[data-tooltip="true"]')
            .eq(3)
            .children()
            .should('contain', _card.sumDuration + ' mins')
    }
    if (_card.readingAndAnsweringDuration) {
        cy.get('@card')
            .find('[data-tooltip="true"]')
            .eq(3)
            .should('have.attr', 'aria-label', 'Reading duration: ' + _card.readingAndAnsweringDuration[0] + ' minutes\n Answering duration: ' + _card.readingAndAnsweringDuration[1] + ' minutes')
    }
    if (_card.AnsweringDuration) {
        cy.get('@card')
            .find('[data-tooltip="true"]')
            .eq(3)
            .should('have.attr', 'aria-label', ` Answering duration: ${_card.AnsweringDuration} minutes`)
            .should('contain', `${_card.AnsweringDuration} mins`)
    }
    if (_card.clockToolTip) {
        cy.get('@card')
            .find(examStudentClass.clockIcon)
            .as('clockIcon')
        Cypress.auiCommon.verifyPopoverInner('@clockIcon', `Your exam has been reopened and the answering duration has been updated to ${_card.clockToolTip.minute} minutes.`)
        Cypress.auiCommon.verifyPopoverInner('@clockIcon', `Your exam deadline has been updated to `)
        cy.get(auiShadowTag.auiTooltip)
            .shadow()
            .find(auiCommonClass.tooltip)
            .compareEosDateFormat(_card.clockToolTip.date)
            .compareEosTimeFormat(_card.clockToolTip.date)
    }
    if (_card.noAnsweringDuration) {
        cy.get(examClass.flexibleTime)
            .next()
            .find('span')
            .then($data => {
                expect($data.length).to.equal(1)
            })
    }
    if (_card.totalQues) {
        if (_card.totalQues === 1) {
            cy.get('@card')
                .find(examClass.examCardQuestionNum)
                .next()
                .invoke('attr', 'tabindex', 2)
                .focus().wait(200)
                .should('contain', _card.totalQues)
        } else {
            cy.get('@card')
                .find(examClass.examCardQuestionNum)
                .next()
                .invoke('attr', 'tabindex', 3)
                .focus().wait(200)
                .should('contain', _card.totalQues)
        }
    }
    if (_card.fullScore) {
        cy.get('@card')
            .find(examClass.examCardMark)
            .next()
            .invoke('attr', 'tabindex', 4)
            .focus().wait(200)
            .should('contain', _card.fullScore)
    }
    if (_card.examType) {
        cy.get('@card')
            .find(examClass.examCardType)
            .next().as('type')
            .should('contain', _card.examType)
        if (_card.examType === 'Closed-book') {
            // cy.get('.student-hibar-title')
            //     .click({ force: true })
            //     .wait(300)
            // cy.get('@type')
            //     .next()
            //     .find(auiCommonClass.auiFiaInfo)
            //     .invoke('attr', 'tabindex', 5)
            //     .focus().wait(200)
            //     .click({ force: true })
            //     .wait(300)
            // cy.get(auiCommonClass.auipopover).eq(0)
            //     .should('contain', _card.popup)
            cy.get('@type')
                .next()
                .children()
                .as('closeBookIcon')
            Cypress.auiCommon.verifyPopoverInner('@closeBookIcon', _card.popup)
        }
    }
    if (_card.attempts) {
        cy.get('@card')
            .find(examClass.examCardAttempts)
            .should('contain', `(${_card.attempts.submitted}/${_card.attempts.sum} attempts)`)
    }
    if (_card.status) {
        cy.get('@card')
            .find(examClass.examCardFooter)
            .as('footer')
        if (_card.status === 'ongoing') {
            cy.get('@footer')
                .should('contain', 'Enter exam')
                .invoke('attr', 'tabindex', 6)
                .focus().wait(200)
                .and('have.class', 'exam-card-footer-highlight')
        }
        if (_card.status === 'upcoming') {
            cy.get('@footer')
                .find(examStudentClass.cardStatusDisplay)
                .invoke('attr', 'tabindex', 7)
                .focus().wait(200)
                .should('contain', 'Upcoming')

            cy.get('@footer')
                .find('button')
                .should('be.disabled')
        }
        if (_card.status === 'overdue') {
            cy.get('@footer')
                .find(examStudentClass.cardStatusDisplay)
                .invoke('attr', 'tabindex', 8)
                .focus().wait(200)
                .should('contain', 'Overdue')
        }
        if (_card.status === 'Completed') {
            cy.get('@footer')
                .find(examStudentClass.cardStatusDisplay)
                .invoke('attr', 'tabindex', 9)
                .focus().wait(200)
                .should('contain', 'Completed')
        }
    }
};
Cypress.PageStudentExam.clickViewScoreBtn = () => {
    cy.get(examStudentClass.cardRightBtn)
        .click()
        .waitLoading()
};
Cypress.PageStudentExam.verifyExamResultsComment = (_value) => {
    cy.get(examStudentClass.questionComment)
        .should('contain', _value)
};
Cypress.PageStudentExam.verifyNoViewScore_OnCard = () => {
    cy.get(examStudentClass.cardRightBtn)
        .find('button')
        .should('have.length', 0)
};
Cypress.PageStudentExam.viewExamResults = (_info) => {
    if (_info.progress) {
        cy.get(auiShadowTag.auiEllipsis)
            .eq(_info.progress[0])
            .should('contain', _info.progress[1])
    }
    if (_info.totalScore) {
        cy.get(auiShadowTag.auiEllipsis)
            .eq(_info.totalScore[0])
            .should('contain', _info.totalScore[1])
    }
};
Cypress.PageStudentExam.verifyExamPaused = () => {
    cy.get(examStudentClass.examPausedTitle)
        .should('contain', 'The exam has been paused.')
};