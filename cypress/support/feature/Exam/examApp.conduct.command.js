/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { conductExamClass, instructionClass, paperClass } from '../../AUI/conduct.constants';
import { auiButtonClass, auiShadowTag, auiCommonClass, auiDialogClass } from '../../AUI/aui.common.constants'
import { examStudentClass, markExamClass } from '../../AUI/exam.constants'

Cypress.PageConductExam = Cypress.PageConductExam || {};

Cypress.PageConductExam.waitStartNow = () => {
    cy.get(instructionClass.timer).then(($ti) => {
        let toStart = $ti.text()
        cy.log('will begin in ' + toStart)
        let time = toStart.split(':')
        let second = time[1] * 60 + parseInt(time[2]) + 2
        cy.log(second)
        cy.wait(second * 1000)
    })
};
Cypress.PageConductExam.clickSection = (_sectionNubmer) => {
    cy.get(paperClass.section).eq(_sectionNubmer).click()
        .waitLoading()
};
Cypress.PageConductExam.answerMCQuestion = (_nubmer) => {
    cy.get(auiCommonClass.auiRadio).eq(_nubmer).click()
        .waitLoading()
};
Cypress.PageConductExam.followUp = () => {
    cy.get(paperClass.followUp).click()
        .waitLoading()
};
Cypress.PageConductExam.removeFollowUp = () => {
    cy.get(paperClass.removeFollowUp).click()
        .waitLoading()
};
Cypress.PageConductExam.clickFollowUp = (_follow) => {
    cy.get(examStudentClass.followUpQuestion)
        .as('flag')
    cy.get('@flag')
        .click({ force: true })
    if (_follow) {
        cy.get('@flag')
            .should('have.class', 'question-sign-icon-red')
    } else {
        cy.get('@flag')
            .should('not.have.class', 'question-sign-icon-red')
    }
}

// Cypress.PageStudentTakeExam.previousQuestion = () => {
//     cy.get(conductExamClass.buttonBottom)
//         .find('button').eq(1)
//         .click({ force: true })
//         .waitLoading()
// };
Cypress.PageConductExam.endExam = () => {
    cy.get(conductExamClass.buttonBottom)
        .find('button').eq(0)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageConductExam.clickConfirmCancel = () => {
    cy.get(`${auiDialogClass.auiDialog}:visible`)
        .find(auiButtonClass.cancelBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageConductExam.clearAnswerEssay = () => {
    cy.get(examStudentClass.studentQuestAnswerContent)
        .find(auiCommonClass.auiRichTextConent)
        .clear({ force: true })
        .waitLoading()
};
Cypress.PageConductExam.clickquestionTitle = (_nubmer) => {
    cy.get(paperClass.questionTitle).eq(_nubmer).click().wait(500)
        .waitLoading()
};
Cypress.PageConductExam.clickBreadCrumb = () => {
    cy.get(examStudentClass.breadCrumb)
        .click({ force: true })
        .waitLoading()
};


//Verification Command 
Cypress.PageConductExam.verifySectionContent = (_num, _section) => {
    cy.waitElement(examStudentClass.quesSection)
        .wait(1500)
    cy.get(examStudentClass.quesSection)
        .eq(_num)
        .as('pop')
    if (_section.name) {
        cy.get('@pop')
            .find(examStudentClass.sectionName)
            .should('contain', _section.name)
    }
    if (_section.des) {
        cy.get('@pop').find(auiShadowTag.auiEllipsis).eq(0)
            .invoke('attr', 'tabindex', 0)
            .focus().wait(40)
            .should('contain', _section.des)
    }
    if (_section.quesNum) {
        cy.get('@pop')
            .find('.fia-boxes').eq(1).next()
            .invoke('attr', 'tabindex', 0)
            .focus().wait(40)
            .should('contain', _section.quesNum)
    }
    if (_section.marks) {
        let icon = 0
        if (_num === 0) {
            icon = 1
        }
        cy.get('@pop')
            .find('.fia-bookmark')
            .eq(icon).next()
            .invoke('attr', 'tabindex', 0)
            .focus().wait(40)
            .should('contain', _section.marks)
    }
    cy.waitLoading()
};
Cypress.PageConductExam.verifyAdditionalMarks = (_additionalMarks) => {
    cy.get('.base-label')
        .as('additionalMarks')
        .should('contain', 'Additional marks')
    cy.get('@additionalMarks')
        .next()
        .should('contain', _additionalMarks)
};
Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion = (_questionNubmer) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_questionNubmer)
        .should('have.class', 'answered')
};
Cypress.PageConductExam.verifySubQuestionIndexAnsweredQuestion = (_questionNubmer) => {
    cy.get(markExamClass.markQuestionRightPanel + examStudentClass.studentQuestSecIndex)
        .eq(_questionNubmer)
        .should('have.class', 'answered')
};
Cypress.PageConductExam.verifySubQuestionIndexNoAnsweredQuestion = (_questionNubmer) => {
    cy.get(markExamClass.markQuestionRightPanel + examStudentClass.studentQuestSecIndex)
        .eq(_questionNubmer)
        .should('not.have.class', 'answered')
};
Cypress.PageConductExam.verifyFollowUp = (_questionNubmer) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_questionNubmer)
        .should('have.class', 'followup')
};
Cypress.PageConductExam.verifySubFollowUp = (_questionNubmer) => {
    cy.get(markExamClass.markQuestionRightPanel + examStudentClass.studentQuestSecIndex)
        .eq(_questionNubmer)
        .should('have.class', 'followup')
};
Cypress.PageConductExam.verifyQuestionTitle = (_questionNubmer, _questionTitle) => {
    cy.get(paperClass.questionTitle)
        .eq(_questionNubmer)
        .should('contain', _questionTitle)
};
Cypress.PageConductExam.verifyQuestionIndexNoAnsweredQuestion = (_questionNubmer) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_questionNubmer)
        .should('not.have.class', 'answered')
};
Cypress.PageConductExam.verifyConfirmContent = (_errorMessage) => {
    cy.get(auiDialogClass.auiDialogBody).should('contain', _errorMessage)
};
Cypress.PageConductExam.verifyAnswerFIB = (_FIBAnswer, _nubmer) => {
    cy.get(paperClass.blank)
        .eq(_nubmer)
        .should('have.value', _FIBAnswer)
};
Cypress.PageConductExam.verifyAnswerMRQuestion = (_nubmer) => {
    cy.get(auiCommonClass.auiCheckBox)
        .eq(_nubmer)
        .should('be.checked')
};
Cypress.PageConductExam.verifyAnswerMCQuestion = (_nubmer) => {
    cy.get(auiCommonClass.auiRadio)
        .eq(_nubmer)
        .should('be.checked')
};
Cypress.PageConductExam.verifyAnswerEssay = (_essayAnswers) => {
    cy.get(auiCommonClass.auiRichTextConent)
        .should('contain', _essayAnswers)
};
Cypress.PageConductExam.verifySubmittedMessage = (_submittedMessage) => {
    cy.get(conductExamClass.submittedMessage)
        .should('contain', _submittedMessage)
};
Cypress.PageConductExam.verifyNoFollowUp = (_nubmer) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_nubmer)
        .should('not.have.class', 'followup')
};
Cypress.PageConductExam.hideRemainingTime = () => {
    cy.get(conductExamClass.timerContainer)
        .click()
    cy.get(conductExamClass.eyeHideIcon)
        .click({ force: true })
};
Cypress.PageConductExam.showRemainingTime = () => {
    cy.get(conductExamClass.timerContainer)
        .click()
    cy.get(conductExamClass.eyeIcon)
        .eq(0)
        .click({ force: true })
};
Cypress.PageConductExam.verifyHideRemainingTimeHaveClock = () => {
    cy.get(conductExamClass.timerContainer + conductExamClass.timeClockIcon)
        .should('contain', '')
};
Cypress.PageConductExam.verifyShowRemainingTimeHaveTimeNumber = () => {
    cy.get(conductExamClass.timerContainer + conductExamClass.timeNumberColon)
        .eq(0)
        .should('contain', ':')
};
Cypress.PageConductExam.verifyAutoSaveAnswer = () => {
    cy.get(conductExamClass.autoSaveText)
        .should('contain', 'Auto saved at ')
};
Cypress.PageConductExam.verifyChoiceSelected = (_num) => {
    cy.get(auiCommonClass.auiRadio)
        .eq(_num)
        .should('have.attr', 'aria-checked', 'true')
};
Cypress.PageConductExam.verifyExamTime_FullScreen = () => {
    cy.get(conductExamClass.examTimeDsiplay)
        .should('contain', 0)
};
Cypress.PageConductExam.collapseQuestion = () => {
    cy.get(conductExamClass.collapseQuestionLabel)
        .eq(0)
        .click({ force: true })
};
Cypress.PageConductExam.switchSubQuestion = (_num) => {
    cy.get(conductExamClass.subQuestionIndex + _num)
        .click({ force: true })
};
Cypress.PageConductExam.verifySwitchQueStructureBtnTooltip = (_value) => {
    Cypress.auiCommon.verifyPopoverInner(conductExamClass.switchQueStructureBtn, _value)
};