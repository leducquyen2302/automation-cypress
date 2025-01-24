/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiButtonClass, auiCommonClass, auiMessageBox, auiComboboxClass, auiShadowTag } from '../../AUI/aui.common.constants'
import { examStudentClass, sampleExamStudentClass, examClass } from '../../AUI/exam.constants'
import { conductExamClass } from '../../AUI/conduct.constants';

Cypress.PageStudentTakeSampleExam = Cypress.PageStudentTakeSampleExam || {};

Cypress.PageStudentTakeSampleExam.verifySampleExamPopup = () => {
     cy.get(sampleExamStudentClass.sampleExamPopup)
          .children().should('contain', 'Sample exam')
          .should('contain', 'Please try out the sample exam to familiarise with the exam process and user interface before your exam.')
}
Cypress.PageStudentTakeSampleExam.verifySampleExamTip = () => {
     cy.get(sampleExamStudentClass.enterSampleExam)
          // .children().should('contain', 'To get familiar with the system, you can start with the sample exam. ')
          .should('contain', 'Click here to try')
}
Cypress.PageStudentTakeSampleExam.verifyInstructionInfo = (_breadcrumb, _userID, _candidateId, _examName, _fullMark, _instruction) => {
     if (_breadcrumb) {
          cy.get(sampleExamStudentClass.instructionPageExamName)
               .should('contain', _examName)
     }
     cy.get(sampleExamStudentClass.examInformation)
          .click({ force: true })
     let value = [_userID, _candidateId, _examName, 1, 2, _fullMark]
     for (let index = 0; index < value.length; index++) {
          cy.get(auiCommonClass.detailRowValue)
               .eq(index).should('contain', value[index])
     }
     cy.get(examStudentClass.examInformationInstruction)
          .should('contain', _instruction)
     Cypress.auiCommon.clickFooterBtnInPanel(0)
}
Cypress.PageStudentTakeSampleExam.enterSampleExamsPage = (_examId) => {
     cy.visit('/#/sampleexam')
          .wait(500)
}
Cypress.PageStudentTakeSampleExam.enterStartExamPage = (_examId) => {
     cy.visit('/#/examapp/Instruction?examId=' + _examId)
     cy.waitElement(examStudentClass.examInstrucBottom)
          .wait(1000)
}
Cypress.PageStudentTakeSampleExam.enterQuestionPage = (_examId) => {
     cy.visit('/#/examapp/Question?examId=' + _examId)
          .wait(500)
}
Cypress.PageStudentTakeSampleExam.startSampleExam = () => {
     cy.get(examStudentClass.examStartNowBtn)
          .click({ force: true })
     cy.waitLoading()
}
Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle = (_value) => {
     cy.get(sampleExamStudentClass.tourGuideTitle)
          .should('contain', _value)
}
Cypress.PageStudentTakeSampleExam.nextTourGuide = () => {
     Cypress.auiCommon.clickBtn(examClass.nextBtn)
}
Cypress.PageStudentTakeSampleExam.previousTourGuide = () => {
     Cypress.auiCommon.clickBtn(sampleExamStudentClass.previousGuideBtn)
}
Cypress.PageStudentTakeSampleExam.skipTourGuide = () => {
     Cypress.auiCommon.clickBtn(sampleExamStudentClass.skipGuideBtn)
}
Cypress.PageStudentTakeSampleExam.closeTourGuide = () => {
     cy.get(sampleExamStudentClass.guideDialog + auiButtonClass.auiBtnClose)
          .eq(0)
          .click()
}
Cypress.PageStudentTakeSampleExam.openExamTutorial = () => {
     cy.get(sampleExamStudentClass.examTutorialLabelBtn)
          .click()
}
Cypress.PageStudentTakeSampleExam.previewQuestions = () => {
     cy.get(conductExamClass.buttonBottom)
          .find('button')
          .eq(1)
          .click({ force: true })
          .waitLoading()
}
Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent = (_num, _value) => {
     cy.get(auiCommonClass.auiRichCotainer)
          .eq(_num)
          .should('contain', _value)
}
Cypress.PageStudentTakeSampleExam.verifyQuestionMark = (_num, _value) => {
     cy.get(sampleExamStudentClass.questionMark + sampleExamStudentClass.questionMark)
          .eq(_num)
          .should('contain', _value)
}
Cypress.PageStudentTakeSampleExam.exitPreviewQuestion = () => {
     cy.get(sampleExamStudentClass.existBtn)
          .click()
}
Cypress.PageStudentTakeSampleExam.acknowledgeSampleExam = (_verify) => {
     cy.get(sampleExamStudentClass.acknowledgeBtn)
          .click({ force: true })
     if (_verify) {
          Cypress.auiCommon.verifyConfirmDialogContent('Please read the instructions carefully before starting the task. Click Confirm to acknowledge and continue.')
     }
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
}
Cypress.PageStudentTakeSampleExam.verifyAcknowConfirm = () => {

}
Cypress.PageStudentTakeSampleExam.noOfAttempts = (_examName) => {
     cy.get('[aria-label="' + _examName + '"]')
          .parent().next().next().next().find('span').eq(1)
          .should('contain', 1)
}
Cypress.PageStudentTakeSampleExam.inputEassy = (_value) => {
     cy.wait(2000)
     cy.get(examStudentClass.studentQuestAnswerContent)
          .find(sampleExamStudentClass.inputEssay)
          .click({ force: true }).wait(2000)
          .type(_value, { delay: 15 })
     cy.wait(2000)
}
Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay = (_value) => {
     cy.get(examStudentClass.studentQuestAnswerContent)
          .find(sampleExamStudentClass.inputEssay)
          .should('contain', _value)
};
Cypress.PageStudentTakeSampleExam.clickPinyinBtn = () => {
     cy.get(examStudentClass.pinyinBtn)
          .eq(0)
          .click({ force: true }).waitLoading()
};
Cypress.PageStudentTakeSampleExam.verifyPinYinTip = () => {
     cy.get(examStudentClass.rightToolTip)
          .should('contain', 'How to input Chinese phonetic alphabet with tones?')
          .and('contain', 'Use the tone number')
          .and('contain', 'Enter a final and its tone number (0-4) to convert the number to the corresponding tone automatically. For example, enter "i3" to convert it to "ǐ" and enter "v0" to convert it to "ü".')
          .and('contain', 'Use the provided finals with tones')
          .and('contain', 'Click the provided finals with tones to insert them to your text directly.')
};
Cypress.PageStudentTakeSampleExam.clickZiMu = (_value, _operation) => {
     cy.get(`[data-pinyin="${_value}"]`)
          .click({ force: true })
     if (_operation === 'OK') {
          cy.get(`[title="${_operation}"]`)
               .eq(0)
               .click({ force: true })
     }
     if (_operation === 'Cancel') {
          cy.get(`[title="${_operation}"]`)
               .eq(1)
               .click({ force: true })
     }
};
Cypress.PageStudentTakeSampleExam.inputOnPinYinText = (_value, _operation) => {
     cy.get(examStudentClass.pinyinText)
          .type(_value, { delay: 25 })
     if (_operation === 'OK') {
          cy.get(auiCommonClass.ckeDialogOkBtn)
               .click({ force: true })
     }
};
Cypress.PageStudentTakeSampleExam.clickFaceVericationBtn = () => {
     cy.get(examStudentClass.examInstrucBottom + 'button')
          .click({ force: true })
          .wait(2000)
};
Cypress.PageStudentTakeSampleExam.verifyDeviceDisplay = (_value) => {
     cy.get(auiComboboxClass.auiComboShellContent)
          .should('contain', _value)
};
Cypress.PageStudentTakeSampleExam.verifyUserInfoInFaceVerication = (_value1, _value2) => {
     cy.get(examStudentClass.facialTagText + auiShadowTag.auiEllipsis)
          .eq(0)
          .should('contain', _value1)
     cy.get(examStudentClass.facialTagText + auiShadowTag.auiEllipsis)
          .eq(1)
          .should('contain', _value2)
};
Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn = () => {
     cy.get(examStudentClass.faceVerifyBtn)
          .click({ force: true })
          .waitLoading()
          .wait(4000)
};
Cypress.PageStudentTakeSampleExam.verifyFaceWarnMessage = (_value) => {
     cy.get(examStudentClass.faceVerifyWarn)
          .should('contain', _value)
};
Cypress.PageStudentTakeSampleExam.verifyFaceFailed = (_value) => {
     cy.get(examStudentClass.faceVerifyFailed)
          .should('contain', _value)
};
Cypress.PageStudentTakeSampleExam.clickFullScreenBtn = () => {
     cy.get(sampleExamStudentClass.fullScreenBtn)
          .click()
};
Cypress.PageStudentTakeSampleExam.exitFullScreenBtn = () => {
     cy.get(sampleExamStudentClass.exitFullScreenBtn)
          .click()
};
Cypress.PageStudentTakeSampleExam.verifyNextQuestionDisabled = () => {
     cy.get(sampleExamStudentClass.nextQuestionBtn)
          .should('have.attr', 'disabled')
};
Cypress.PageStudentTakeSampleExam.verifyPreviousQuestionDisabled = () => {
     cy.get(sampleExamStudentClass.previousQuestionBtn)
          .should('have.attr', 'disabled')
};
Cypress.PageStudentTakeSampleExam.clickNextQuetions_FullScreen = () => {
     cy.get(sampleExamStudentClass.fullScreenToolBar + sampleExamStudentClass.nextQuestionBtn)
          .click({ force: true })
};
Cypress.PageStudentTakeSampleExam.clickPreviousQuetions_FullScreen = () => {
     cy.get(sampleExamStudentClass.fullScreenToolBar + sampleExamStudentClass.previousQuestionBtn)
          .click({ force: true })
};
Cypress.PageStudentTakeSampleExam.verifyFollowup_FullScreen = () => {
     cy.get(sampleExamStudentClass.followUpInFullScreen)
          .should('have.class', 'question-sign-icon-red')
};
Cypress.PageStudentTakeSampleExam.clickFollowup_FullScreen = () => {
     cy.get(sampleExamStudentClass.followUpInFullScreen)
          .click({ force: true })
};
Cypress.PageStudentTakeSampleExam.exitFullscreen = () => {
     cy.get(sampleExamStudentClass.exitFullScreen)
          .click({ force: true })
};