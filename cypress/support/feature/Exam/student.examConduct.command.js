/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag, auiDialogClass, auiPanelClass, auiButtonClass, auiOptionList } from '../../AUI/aui.common.constants'
import { examClass, examStudentClass, sampleExamClass } from '../../AUI/exam.constants'
import { conductExamClass, paperClass } from '../../AUI/conduct.constants'
import { bankClass } from '../../AUI/bank.constants';
import { adminCourseClass } from '../../AUI/admin.constants';

Cypress.PageStudentTakeExam = Cypress.PageStudentTakeExam || {};

Cypress.PageStudentTakeExam.clickStartBtn = (_haveInstru) => {
    cy.waitElement(examStudentClass.examInstrucBottom)
    if (_haveInstru) {
        Cypress.PageStudentTakeSampleExam.acknowledgeSampleExam(true)
    }
    cy.get(examStudentClass.examInstrucBottom)
        .find('button')
        .click({ force: true })
};
Cypress.PageStudentTakeExam.startNow = (_haveInstru) => {
    Cypress.PageStudentTakeExam.clickStartBtn(_haveInstru)
    cy.waitElement(bankClass.quesLeft)
};
Cypress.PageStudentTakeExam.waitStartByTime = (_startTime) => {
    let start = new Date(_startTime)
    let delay = start - new Date()
    if (delay > 0) {
        cy.log(`exam start at ${start}, waiting ${delay / 1000}s`)
        cy.wait(delay)
    } else {
        cy.log(`aleady start ${start}`)
    }
    cy.wait(1500)
}
Cypress.PageStudentTakeExam.waitStartByElement = () => {
    cy.wait(2000)
    cy.waitNoElement('.instruction-button-bottom [disabled]')
};
Cypress.PageStudentTakeExam.waitStartByReadingTime = (_startTime) => {
    let start = new Date(_startTime)
    let delay = start - new Date() - 60000
    if (delay > 0) {
        cy.log(`exam start at ${start}, waiting ${delay / 1000}s`)
        cy.wait(delay)
    } else {
        cy.log(`aleady start ${start}`)
    }
    cy.wait(1500)
}
// Cypress.PageStudentTakeExam.startByInstruc = () => {
//     cy.waitLoading()
//     cy.get(examStudentClass.examInstruc).then(($ins) => {
//         let ins = $ins.text()
//         let st = ins.split('will start at: ')[1]
//         let diff = new Date(st) - new Date()
//         cy.log('will start in : ' + diff / 1000 + 's')
//         if (diff > 0) {
//             cy.wait(diff)
//             cy.reload(true)
//             cy.waitLoading()
//             cy.wait(1500)
//             cy.get(examStudentClass.examStartNowBtn)
//                 .click({ force: true })
//         }
//         else {
//             //临时添加
//             cy.wait(11000)
//             cy.get(examStudentClass.examStartNowBtn)
//                 .click({ force: true })
//         }
//         cy.waitLoading()
//     })
// }
Cypress.PageStudentTakeExam.verifyExamInstruction = (_content) => {
    cy.get(examStudentClass.examInstruc)
        .should('contain', _content)
}
Cypress.PageStudentTakeExam.nextQuestion = () => {
    cy.get(conductExamClass.nextQuestionBtn)
        .click({ force: true })
        .waitLoading()
}
Cypress.PageStudentTakeExam.nextQuestion_tooltip = () => {
    Cypress.auiCommon.verifyPopoverInner(conductExamClass.nextQuestionBtn, 'Next question')
}
Cypress.PageStudentTakeExam.nextQuestion_PreviousDisabled = () => {
    cy.get(conductExamClass.buttonBottom)
        .find('button')
        .eq(2)
        .click({ force: true })
        .waitLoading()
}
Cypress.PageStudentTakeExam.endExam = (_backHomeOrNot, _waitNewAttempt) => {
    cy.waitLoading()
    cy.contains('Submit and end exam')
        .click()
    // cy.get(auiDialogClass.auiDialog)
    //     .find(examStudentClass.endExamBtn)
    //     .click({ force: true })
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    cy.waitElement('.submittedPage_bt')
    if (_backHomeOrNot) {
        Cypress.PageStudentTakeExam.backToHome()
    }
}
Cypress.PageStudentTakeExam.backToHome = () => {
    cy.get(examStudentClass.backToHomeBtn)
        .click({ force: true })
    cy.waitLoading()
}
Cypress.PageStudentTakeExam.selectQuestion = (_index) => {
    let op = examStudentClass.studentQuestSecIndex
    cy.get(op).eq(_index)
        .click({ force: true })
    cy.wait(600)
}
Cypress.PageStudentTakeExam.selectSubQuestion = (_index) => {
    cy.get(examStudentClass.studentSubQuestSect)
        .find(examStudentClass.studentQuestSecIndex)
        .eq(_index)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.selectRadioByAnswer = (_value) => {
    cy.contains(_value).parent()
        .as('op')
    cy.get('@op')
        .find(auiCommonClass.auiRadio)
        .check({ force: true })
}
Cypress.PageStudentTakeExam.selectRadioByIndex = (_index) => {
    cy.get(auiCommonClass.auiRadio)
        .eq(_index)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.selectCheckBoxByIndex = (_index) => {
    let op = examStudentClass.studentQuestAnswerContent + auiCommonClass.auiOptionCheckBox
    cy.get(op)
        .eq(_index)
        .check({ force: true }, { delay: 50 })
    cy.wait(250)
}
Cypress.PageStudentTakeExam.inputBlank = (_index, _value) => {
    cy.get(paperClass.blank)
        .eq(_index)
        .click()
        .type(_value, { force: true })
}
Cypress.PageStudentTakeExam.inputEassy = (_value) => {
    // cy.wait(5000)
    cy.waitElement(examStudentClass.studentQuestAnswerContent + auiCommonClass.auiRichTextConent)
    cy.get(examStudentClass.studentQuestAnswerContent)
        .find(auiCommonClass.auiRichTextConent)
        .click({ force: true }).wait(1000)
        .clear({ force: true }).wait(1000)
        .type(_value, { force: true })
}
Cypress.PageStudentTakeExam.verifyInputEassy = (_value) => {
    cy.get(examStudentClass.studentQuestAnswerContent)
        .find(auiCommonClass.auiRichTextConent)
        .should('contain', _value)
}
Cypress.PageStudentTakeExam.clickExamInfo = () => {
    cy.get(examStudentClass.examInfoIcon)
        .click({ force: true })
    cy.wait(1000)
}
Cypress.PageStudentTakeExam.clickAppendix = () => {
    cy.get(examStudentClass.appendixBtn)
        .click()
};
Cypress.PageStudentTakeExam.verifyAppendix = (_value) => {
    cy.get(examStudentClass.appendixTitle)
        .should('contain', 'Appendix and reference file')
    cy.get(examStudentClass.appendixPanel + examStudentClass.appendixText)
        .should('contain', _value)
};

Cypress.PageStudentTakeExam.verifyExamInfo = (_examInfo) => {
    cy.get(auiPanelClass.auiPanelBody)
        .find(auiCommonClass.detailRow)
        .as('table')
    if (_examInfo.userId) {
        cy.get('@table').eq(0)
            .should('contain', 'User ID')
            .and('contain', _examInfo.userId)
    }
    if (_examInfo.firstOrganization) {
        cy.get('@table').eq(2)
            .should('contain', 'School')
            .and('contain', _examInfo.firstOrganization)
    }
    if (_examInfo.secondOrganization) {
        cy.get('@table').eq(3)
            .should('contain', 'Discipline')
            .and('contain', _examInfo.secondOrganization)
    }
    if (_examInfo.courseCode) {
        cy.get('@table').eq(4)
            .should('contain', 'Course code')
            .and('contain', _examInfo.courseCode)
    }
    if (_examInfo.courseName) {
        cy.get('@table').eq(5)
            .should('contain', 'Course name')
            .and('contain', _examInfo.courseName)
    }
    if (_examInfo.semester) {
        cy.get('@table').eq(6)
            .should('contain', 'Semester')
            .and('contain', _examInfo.semester)
    }
    if (_examInfo.examName) {
        cy.get('@table').eq(7)
            .should('contain', 'Exam name')
            .and('contain', _examInfo.examName)
    }
    if (_examInfo.sectionNo) {
        cy.get('@table').eq(8)
            .should('contain', 'Total No. of sections')
            .and('contain', _examInfo.sectionNo)
    }
    if (_examInfo.questionNo) {
        cy.get('@table').eq(9)
            .should('contain', 'Total No. of questions')
            .and('contain', _examInfo.questionNo)
    }
    if (_examInfo.classification) {
        cy.get('@table').eq(10)
            .should('contain', 'Exam classification')
            .and('contain', _examInfo.classification)
    }
    if (_examInfo.examTime) {
        cy.get('@table').eq(11).find(auiShadowTag.auiEllipsis).as('examTimeContent')
        cy.get('@examTimeContent').eq(0).should('contain', 'Exam time')
        cy.get('@examTimeContent').eq(1).as('examTime')
        cy.get('@examTime')
            .compareEosDateFormat(_examInfo.examTime.startTime)
            .compareEosTimeFormat(_examInfo.examTime.startTime)
            .compareEosTimeFormat(_examInfo.examTime.endTime)
    }
    if (_examInfo.readingDuration) {
        cy.get('@table').eq(12)
            .should('contain', 'Reading duration')
            .and('contain', _examInfo.readingDuration + ' mins')
    }
    if (_examInfo.answeringDuration) {
        if (_examInfo.answeringDuration === 1) {
            var min = ' min'
        } else {
            var min = ' mins'
        }
        cy.get('@table').eq(13)
            .should('contain', 'Answering duration')
            .and('contain', _examInfo.answeringDuration + min)
    }
    if (_examInfo.fullMark) {
        cy.get('@table').eq(14)
            .should('contain', 'Full marks')
            .and('contain', _examInfo.fullMark)
    }
    if (_examInfo.instruction) {
        cy.get(examStudentClass.examInformationInstruction)
            .should('contain', _examInfo.instruction)
    }
}
Cypress.PageStudentTakeExam.closeExamInfo = () => {
    cy.get(examClass.examInvigListPanel + auiButtonClass.auiBtnClose)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.verifyServerConnect = (_tips) => {
    cy.get(examStudentClass.netWorkIcon)
        .should('have.attr', "aria-label", _tips)
}
Cypress.PageStudentTakeExam.verifyHotSpotContent = (_content, _num, _blankContent) => {
    cy.get(auiCommonClass.auiRichPurHtml)
        .eq(0)
        .should('contain', _content)
    if (_blankContent) {
        Cypress.PageStudentTakeExam.verifyBlankContent(_num, _blankContent)
    }
}
Cypress.PageStudentTakeExam.verifyBlankContent = (_num, _content) => {
    cy.get(examStudentClass.questionName)
        .eq(_num)
        .should('contain', _content)
}
Cypress.PageStudentTakeExam.verifyHotSpotTip = (_num, _content) => {
    cy.get(examStudentClass.hotSpotTip)
        .eq(_num).should('contain', _content)
}
Cypress.PageStudentTakeExam.verifyOrderQueTip = (_content) => {
    cy.get(examStudentClass.orderQueTip)
        .should('contain', _content)
}
Cypress.PageStudentTakeExam.takeHotSpot = (_x, _y) => {
    cy.get(examStudentClass.hotSpotQuestion).then($el => {
        const a = $el[0].getBoundingClientRect();
        const basex = a.right - a.left;
        const basey = a.bottom - a.top;
        cy.get($el).click(basex * _x, basey * _y, { force: true })
    })
}
Cypress.PageStudentTakeExam.delHotSpot = (_num) => {
    cy.get(examStudentClass.hotSpotQuestion)
        .find('g').eq(_num)
        .find('circle').eq(2)
        .click({ force: true })
    cy.get(adminCourseClass.deleBtnIcon)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.takeOrderQue = (_value,) => {
    cy.contains(_value).as('name')
    cy.contains('1. ').next().as('answer')
    // cy.get('@name').drag('@answer')
    cy.get('@name')
        .trigger('mouseover').trigger('mousedown')
        .trigger('mousemove', { which: 1, clientX: 650, clientY: 145 })
        .trigger('mouseleave')
}


//take reading exam
Cypress.PageStudentTakeExam.verifyStartReadingTimeTip = () => {
    cy.get(examStudentClass.startReadingTime)
        .children().first()
        .should('contain', 'The reading time of the task will start in')
}
Cypress.PageStudentTakeExam.verifyReadingTimeTitle = (_value) => {
    cy.get(examStudentClass.readingTimeTitle)
        .should('contain', _value)
}
Cypress.PageStudentTakeExam.verifyReadingTimeTip = (_value1, _value2) => {
    cy.get(auiCommonClass.auiToastInfo + '.strong')
        .should('contain', _value1)
    cy.get(auiCommonClass.auiToastInfo + '.margin-top-s')
        .should('contain', _value2)
}
Cypress.PageStudentTakeExam.verifyTakeExamToast = (_value) => {
    cy.get(auiCommonClass.auiToastInfo)
        .should('contain', _value)
}
Cypress.PageStudentTakeExam.answerQuestion = () => {
    cy.get(auiCommonClass.auiRichTextConent)
        .type("I'm fine 3q and u?")
}
Cypress.PageStudentTakeExam.verifyNoDurationTip = () => {
    cy.waitElement(auiCommonClass.auiToastInfo)
    cy.get(auiCommonClass.auiToastInfo)
        .should('contain', 'The exam end time is almost up.')
}
//start now灰显
Cypress.PageStudentTakeExam.verifyNotClickStart = () => {
    cy.get(examStudentClass.examStartNowBtn).should('have.attr', 'disabled')
}
//不能答题
Cypress.PageStudentTakeExam.verifyNotAnswer = () => {
    cy.get(examStudentClass.disabledRichEditorToolBar + 'button')
        .should('have.attr', 'disabled')
}

//PDF Paper Exam
Cypress.PageStudentTakeExam.openCollapse = () => {
    cy.get(examStudentClass.studentPDFOpenCollapse)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.closeCollapse = () => {
    cy.get(examStudentClass.studentPDFCloseCollapse)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.verifySectionName = (_name) => {
    cy.get(examStudentClass.sectionName)
        .should('contain', _name)
}
Cypress.PageStudentTakeExam.verifyQuestionName = (_name) => {
    cy.get(examStudentClass.questionName)
        .should('contain', _name)
}
Cypress.PageStudentTakeExam.previousQuestion = () => {
    cy.get(conductExamClass.previousQuestionBtn)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.previousQuestion_tooltip = () => {
    Cypress.auiCommon.verifyPopoverInner(conductExamClass.previousQuestionBtn, 'Previous question')
}
Cypress.PageStudentTakeExam.inputAnswer = (_value) => {
    cy.get(examStudentClass.inputAnswer)
        .click({ force: true }).wait(500)
    cy.get('[aria-label="Exam"]').type(_value, { delay: 15 })
}
Cypress.PageStudentTakeExam.verifyAnswered = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num).should('have.class', 'answered')
}
Cypress.PageStudentTakeExam.verifyNotAnswered = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num).should('not.have.class', 'answered')
}
Cypress.PageStudentTakeExam.clearInputArea = () => {
    cy.get(examStudentClass.inputAnswer)
        .click({ force: true }).wait(500)
    cy.get('[aria-label="Exam"]').clear()
}
Cypress.PageStudentTakeExam.followUpQuestion = () => {
    cy.get(examStudentClass.followUpQuestion)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.verifyFollowUp = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num).should('have.class', 'followup')
}
Cypress.PageStudentTakeExam.verifyFollowUp = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num).should('have.class', 'followup')
}
Cypress.PageStudentTakeExam.verifyNotFollowUp = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num).should('not.have.class', 'followup')
}
Cypress.PageStudentTakeExam.verifyForbidAnswer = (_num) => {
    cy.get(examStudentClass.forbidAnswer)
        .should('have.attr', 'aria-disabled', 'true')
}
Cypress.PageStudentTakeExam.answerTrueOrFalse = (_num) => {
    cy.get(auiCommonClass.auiChoiceContent)
        .eq(_num).click({ force: true })
}
Cypress.PageStudentTakeExam.answerMatching = (_key, _value) => {
    cy.contains(_key)
        .click({ force: true }).wait(500)
    cy.contains(_value)
        .click({ force: true }).wait(500)
}
Cypress.PageStudentTakeExam.verifyUnpublishInfo = (_info) => {
    Cypress.auiCommon.verifyConfirmPopup(_info)
}
Cypress.PageStudentTakeExam.unpubToHome = () => {
    cy.get(examStudentClass.unpubToHomeBtn)
        .click({ force: true })
}
Cypress.PageStudentTakeExam.verifyEditTime = (_operation, _time) => {
    Cypress.auiCommon.verifyEditTimeTip(auiCommonClass.auiToastInfo, _operation, _time)
};
Cypress.PageStudentTakeExam.verifyExamInfoAnsweringTip = (_operation, _time) => {
    cy.get(examStudentClass.examInfoAnswerDurToolTip)
        .parent()
        .click({ force: true })
    Cypress.auiCommon.verifyEditTimeTip(auiCommonClass.auipopover, _operation, _time)
}
Cypress.PageStudentTakeExam.verifyAfterSubmitExam_AttemptsTip = (_num, _num2) => {
    cy.get(examStudentClass.submittedPageAttemptTip)
        .eq(0)
        .should('contain', `${_num} attempts are allowed for the exam, and you have attempted ${_num2}`)
}
Cypress.PageStudentTakeExam.clickStartNewAttemptBtn = () => {
    cy.contains('Start new attempt')
        .click({ force: true })
        .waitLoading()
};
Cypress.PageStudentTakeExam.verifyQuestionContent = (_num, _content) => {
    cy.get(examStudentClass.questionContent)
        .eq(_num)
        .should('contain', _content)
};
Cypress.PageStudentTakeExam.verifyUploadContent = (_name, _size) => {
    cy.get(auiCommonClass.auiUploaderContent)
        .should('contain', _name)
        .and('contain', _size)
};
Cypress.PageStudentTakeExam.inputEssayText = (_value, _notFullScreen) => {
    cy.get(examStudentClass.essayTextarea)
        .type(_value)
    if (_notFullScreen) {
        cy.get(examStudentClass.takingExamHeader)
            .click()
    }
};
Cypress.PageStudentTakeExam.answerCategorization = (_option, _answer) => {
    cy.get(auiCommonClass.displayBlock + examStudentClass.optionContent)
        .eq(_option)
        .click({ force: true })
    cy.get(auiCommonClass.auiBoxPartialContent + '[style="position: relative;"] ')
        .eq(_answer)
        .click({ force: true })
};
Cypress.PageStudentTakeExam.switchCategorizationAnsweredOption = (_answer1, _option1, _answer2) => {
    cy.get(auiCommonClass.auiBoxPartialContent)
        .eq(_answer1)
        .find(' [style="display: block;"] ' + examStudentClass.optionContent)
        .eq(_option1)
        .click({ force: true })
    cy.get(auiCommonClass.auiBoxPartialContent + '[style="position: relative;"] ')
        .eq(_answer2)
        .click({ force: true })
};
Cypress.PageStudentTakeExam.cancelAnsweredCategorization = (_answer, _option) => {
    cy.get(auiCommonClass.auiBoxPartialContent)
        .eq(_answer)
        .find(examStudentClass.optionContent)
        .eq(_option)
        .click({ force: true })
    cy.get(examStudentClass.optionArea)
        .click({ x: 0, y: 0 })
};
Cypress.PageStudentTakeExam.verifyCategoryFold = (_num) => {
    cy.get(examStudentClass.categorysArea + auiCommonClass.auiExpanderTitle + auiCommonClass.auiExpanderAction)
        .eq(_num)
        .should('have.attr', 'aria-expanded', 'false')
};
Cypress.PageStudentTakeExam.verifyQuestionTypeTooltip = (_value, _num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(bankClass.commonQuestionTypeIcon)
        .eq(num)
        .as('queTypeIcon')
    Cypress.auiCommon.verifyPopoverInner('@queTypeIcon', _value)
};
Cypress.PageStudentTakeExam.verifyNotHavePreviousQuestionBtn = () => {
    const actionButton = conductExamClass.buttonBottom + 'button'
    expect(actionButton.length()).to.equal(2)
};
Cypress.PageStudentTakeExam.verifyQuestionDisabled = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num)
        .should('have.attr', 'aria-disabled', 'true')
};
Cypress.PageStudentTakeExam.verifyDisabledQuestionToolTip = (_num) => {
    cy.get(examStudentClass.studentQuestSecIndex)
        .eq(_num)
        .should('have.attr', 'aria-label', 'You cannot navigate among questions randomly since this exam is set with strict order navigation.')
};
Cypress.PageStudentTakeExam.openRecordVideo = () => {
    cy.get(examStudentClass.recordVideoIcon)
        .click()
};
Cypress.PageStudentTakeExam.clickRecordVideoSettingBtn = () => {
    cy.get(examStudentClass.videoContainer + examStudentClass.settingsLabel)
        .click({ force: true })
        .wait(500)
};
Cypress.PageStudentTakeExam.clickRecordVideoMaxsizeBtn = () => {
    cy.get(examStudentClass.videoContainer + examStudentClass.maximiseLabel)
        .click({ force: true })
        .wait(500)
};
Cypress.PageStudentTakeExam.clickRecordVideoCancelBtn = () => {
    cy.get(examStudentClass.videoContainer + examStudentClass.cancelLabel)
        .click({ force: true })
        .wait(500)
};
Cypress.PageStudentTakeExam.openChatBox = () => {
    cy.get(examStudentClass.chatBoxLabel)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageStudentTakeExam.clickMaxsizeChatBoxBtn = () => {
    cy.get(examStudentClass.chatBoxId + examStudentClass.maximiseLabel)
        .click()
};
Cypress.PageStudentTakeExam.sendMessageToInvigilator = (_value) => {
    cy.get(examStudentClass.chatInvigilatorUser)
        .click()
        .waitLoading()
        .wait(500)
    cy.get(examStudentClass.chatTextarea)
        .type(_value)
    cy.get(examStudentClass.chatSend)
        .click()
};
Cypress.PageStudentTakeExam.verifyChatMessageInChatHistory = (_value) => {
    cy.get(examStudentClass.chatMessage)
        .should('contain', _value)
};
Cypress.PageStudentTakeExam.clickSmallChatBoxBtn = () => {
    cy.get(examStudentClass.chatBoxId + examStudentClass.smallChatLabel)
        .click()
};
Cypress.PageStudentTakeExam.clickChatBoxCallBtn = () => {
    cy.get(examStudentClass.callBtn)
        .click()
};
Cypress.PageStudentTakeExam.clickJoinCallBtn = () => {
    cy.get(examStudentClass.joinCallBtn)
        .click()
};
Cypress.PageStudentTakeExam.clickDeclineCallBtn = () => {
    cy.get(examStudentClass.declineCallBtn)
        .click()
        .wait(500)
};
Cypress.PageStudentTakeExam.verifyCallStatus = (_num, _value) => {
    cy.wait(2000)
    cy.get(examStudentClass.callStatus)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageStudentTakeExam.selectCamera = () => {
    cy.get(auiCommonClass.auiIcon)
        .click()
    cy.get(auiOptionList.auiOptionListItem)
        .eq(0)
        .click()
};
Cypress.PageStudentTakeExam.verifyPreviewEssayQuestion = (_num, _value) => {
    cy.get(examStudentClass.essayPreview)
        .eq(_num)
        .should('contain', _value)
};