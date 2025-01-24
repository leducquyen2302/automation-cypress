/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiFilterCommon, auiShadowTag } from '../../AUI/aui.common.constants'
import { examClass, examGradeClass, sampleExamClass } from '../../AUI/exam.constants'
import { adminMarkingSettingsClass } from '../../AUI/admin.constants'


Cypress.PageExamGrade = Cypress.PageExamGrade || {};

// Cypress.PageExamGrade.enterGradingProgress = (_index) => {
//     cy.get(examClass.examCard)
//         .eq(_index)
//         .find(examClass.gradingProgressBtn)
//         .click({ force: true })
//     cy.waitLoading()
//     cy.wait(5000)
//     Cypress.auiCommon.verifyUrl('include', '/exam/marking/markgrading?')
// }
Cypress.PageExamGrade.searchExam = (_value, _index) => {
    cy.waitLoading()
    cy.get("#exam-homepage").find('.aui-searchbox')
        .eq(0).find("input")
        .as('searchBox')
    cy.get('@searchBox')
        .clear().wait(300)
        .type(_value, { delay: 20 }).wait(300)
        .type('{enter}', { force: true })
    cy.waitLoading()
    cy.wait(5000)
    if (_index) {
        cy.get(examClass.examCard)
            .eq(_index).as('card')
    } else {
        cy.get(examClass.examCard)
            .eq(0).as('card')
    }
    cy.get('@card')
        .find(examClass.examCardTitle)
        .should('contain', _value)
};
Cypress.PageExamGrade.enterGradingProgress = (_index) => {
    cy.get(examClass.examCard)
        .eq(_index)
        .find(examClass.gradingProgressBtn)
        .wait(1000)
        .click({ force: true })
        .wait(5000)
    cy.waitLoading()
    Cypress.auiCommon.verifyUrl('include', 'exam/marking/markgrading?')
}
Cypress.PageExamGrade.clickManagecolumns = () => {
    cy.get(examGradeClass.manageColumnsbtn)
        .click({ force: true })
        .wait(300)
}
Cypress.PageExamGrade.clickOptionlistCheckbox = (_content) => {
    cy.get(examGradeClass.optionlistSelectText).contains(_content)
        .click({ force: true })
        .wait(300)
}
Cypress.PageExamGrade.clickOptionlistBtn = (_content) => {
    if (_content == "OK") {
        cy.get(examGradeClass.okBtn).click({ force: true }).wait(300)
    }
    if (_content == "Cancel") {
        cy.get(examGradeClass.cancelBtn).click({ force: true }).wait(300)
    }
}
Cypress.PageExamGrade.lockScore = () => {
    cy.get(examGradeClass.fialock).click().wait(500)
    cy.waitUntil(() => cy.get(examGradeClass.confirmLockBtn, { timeout: 6000 }))
    cy.get(examGradeClass.confirmLockBtn).click().wait(1500)
}
Cypress.PageExamGrade.verifyGradeMessageBar = (_content) => {
    cy.get(examGradeClass.gradeMessageBar + auiShadowTag.auiI18n)
        .shadow()
        .find('span')
        .eq(0)
        .should('contain', _content)
}
Cypress.PageExamGrade.unLockScore = () => {
    cy.get(examGradeClass.fiaunlock).click().wait(500)
    cy.waitUntil(() => cy.get(examGradeClass.confirmUnlockBtn, { timeout: 6000 }))
    cy.get(examGradeClass.confirmUnlockBtn).click().wait(1500)
}
Cypress.PageExamGrade.checkEditScoreStatus = (_candidateindex, _bool) => {
    Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox(_candidateindex)
    if (_bool) {
        cy.get(examGradeClass.fiaFilePenScore).parent().should('not.have.class', 'disabled')
    }
    else {
        cy.get(examGradeClass.fiaFilePenScore).parent().should('be.disabled')
    }
}
Cypress.PageExamGrade.clickGeneratePDFforSelected = () => {
    cy.get(examGradeClass.moreBtn).click().wait(1000)
    cy.get(examGradeClass.fiaFilePdf + ":visible").click().wait(500)
}
Cypress.PageExamGrade.clickSync = () => {
    cy.get(examGradeClass.fiaSuyc).click().wait(500)
    cy.get(examGradeClass.syncBut).click().wait(1500)
}
// Cypress.PageExamGrade.clickDownload = () => {
//     cy.get("#grading-mapping-downloadPDF-panel")
//     .find("[text=Generate]")
//     .find(".button")
//     .click().wait(500)
// }

Cypress.PageExamGrade.clickDownload = () => {
    cy.get(examGradeClass.downloadBtn).click().wait(500)
}

Cypress.PageExamGrade.publishResult = () => {
    cy.get("#exam-publis-score-btn")
        .find("button")
        .click().wait(500)
    cy.get("#exam-public-toall-btn")
        .find(".button")
        .click()
    cy.get(".button[name=publish]")
        .click()
}
Cypress.PageExamGrade.unpublishResult = () => {
    cy.get("#exam-unpublish-btn")
        .find("button")
        .click().wait(500)
    cy.get('.aui-popup:visible button').eq(3).click({ force: true })
    cy.get(".button[name=publish]")
        .click()
}


// Cypress.PageExamGrade.clickPublish = (_ops) => {
//     cy.get(examGradeClass.publishGroupBtn, { timeout: 6000 })
//         .click({ force: true })
//         .wait(300)
//     if (_ops === 'Publish to selected candidates') {
//         cy.get(examGradeClass.btnGropePop)
//             .find(examGradeClass.publishSelectedBtn)
//             .click({ force: true })
//             .wait(300)
//     }
//     if (_ops === 'Publish to all') {
//         cy.get(examGradeClass.btnGropePop)
//             .find(examGradeClass.publishAllBtn)
//             .click({ force: true })
//             .wait(300)
//     }
// }
// Cypress.PageExamGrade.verifyPublishBtnStatus = (_index, _bool) => {
//     cy.waitLoading()
//     cy.get(examGradeClass.publishGroupBtn, { timeout: 6000 })
//         .click()
//         .wait(1500)
//     if (_index == 1) {
//         cy.get(examGradeClass.btnGropePop, { timeout: 6000 })
//             .find(examGradeClass.publishAllBtn).as('pubbtn')
//     }
//     else if (_index == 0) {
//         cy.get(examGradeClass.btnGropePop, { timeout: 6000 })
//             .find(examGradeClass.publishSelectedBtn).as('pubbtn')
//     }
//     cy.get('@pubbtn').then(($ele) => {
//         if (_bool) {
//             cy.get($ele).should('not.have.class', 'disabled')
//         }
//         else {
//             cy.get($ele).should('be.disabled')
//         }
//     });
// }
// Cypress.PageExamGrade.choicePublishResponseDetails = (_ops) => {
//     if (_ops === 'Yes') {
//         cy.get(examGradeClass.publishReponseDetailsRadio + examGradeClass.auiRadioYes)
//             .find('input')
//             .click({ force: true })
//             .wait(300)
//     }
//     if (_ops === 'No') {
//         cy.get(examGradeClass.publishReponseDetailsRadio + examGradeClass.auiRadioNo)
//             .find('input')
//             .click({ force: true })
//             .wait(300)
//     }
// }
// Cypress.PageExamGrade.choicePublishDisplayDetails = (_ops) => {
//     if (_ops === 'Scores') {
//         cy.get(examGradeClass.publishReponseDisplayRadio + examGradeClass.auiRadioScores)
//             .find('input')
//             .click({ force: true })
//             .wait(300)
//     }
//     if (_ops === 'Grades') {
//         cy.get(examGradeClass.publishReponseDisplayRadio + examGradeClass.auiRadioGrades)
//             .find('input')
//             .click({ force: true })
//             .wait(300)
//     }
//     if (_ops === 'Scores and grades') {
//         cy.get(examGradeClass.publishReponseDisplayRadio + examGradeClass.auiRadioScoresGrades)
//             .find('input')
//             .click({ force: true })
//             .wait(300)
//     }
// }
// Cypress.PageExamGrade.clickUnpublish = (_ops) => {
//     cy.get(examGradeClass.unPublishGroupBtn)
//         .click({ force: true })
//         .wait(300)
//     if (_ops === 'Unpublish results for selected candidates') {
//         cy.get(examGradeClass.btnGropePop)
//             .find(examGradeClass.unpublishSelectedIcon)
//             .click({ force: true })
//             .wait(300)
//     }
//     if (_ops === 'Unpublish results for all') {
//         cy.get(examGradeClass.btnGropePop)
//             .find(examGradeClass.unpublishAllIcon)
//             .click({ force: true })
//             .wait(300)
//     }
// }

// // // Verification Command 
// Cypress.PageExamGrade.confrimPublish = (_content) => {
//     Cypress.auiCommon.verifyConfirmDialogContent(_content)
//     if (_content.nextAction === 'publish') {
//         cy.get(examGradeClass.publishBtn)
//             .click({ force: true })
//     }
//     if (_content.nextAction === 'cancel') {
//         cy.get(examGradeClass.cancelBtn)
//             .click({ force: true })
//     }
//     cy.waitLoading()
//     cy.wait(2000)
// }
// Cypress.PageExamGrade.confrimUnPublish = (_content) => {
//     Cypress.auiCommon.verifyConfirmDialogContent(_content)
//     if (_content.nextAction === 'unpublish') {
//         cy.get(examGradeClass.unPublishConfirmBtn)
//             .click({ force: true })
//     }
//     if (_content.nextAction === 'cancel') {
//         cy.get(examGradeClass.cancelBtn)
//             .click({ force: true })
//     }
//     cy.waitLoading()
//     cy.wait(2000)
// }
// Cypress.PageExamGrade.verifyGradeMessageBar = (_content) => {
//     cy.get(examGradeClass.gradeMessageBar)
//         .invoke('attr', 'tabindex', 0)
//         .focus()
//         .wait(100)
//         .should('contain', _content)
// }
// Cypress.PageExamGrade.clickManagecolumns = () => {
//     cy.get(examGradeClass.manageColumnsbtn)
//         .click({ force: true })
//         .wait(300)
// }
// Cypress.PageExamGrade.clickOptionlistCheckbox = (_content) => {
//     cy.get(examGradeClass.optionlistSelectText).contains(_content)
//         .click({ force: true })
//         .wait(300)
// }
// Cypress.PageExamGrade.clickOptionlistBtn = (_content) => {
//     if (_content == "OK") {
//         cy.get(examGradeClass.okBtn).click({ force: true }).wait(300)
//     }
//     if (_content == "Cancel") {
//         cy.get(examGradeClass.cancelBtn).click({ force: true }).wait(300)
//     }
// }
// Cypress.PageExamGrade.verifyResultScore = (_content) => {
//     if (_content.action == 'scoreonly') {
//         cy.get(examGradeClass.viewScoreinfo).eq(0).should('contain', 'Your score: ' + _content.score)
//     }
//     if (_content.action == 'gradeonly') {
//         cy.get(examGradeClass.viewScoreinfo).eq(0).should('contain', 'Your grade: ' + _content.grade)
//     }
//     if (_content.action == 'scoregradeonly') {
//         cy.get(examGradeClass.viewScoreinfo).eq(0).should('contain', 'Your grade: ' + _content.grade + ' (' + _content.score + ')')
//     }
// }
// Cypress.PageExamGrade.ClickViewResultBtn = () => {
//     cy.waitLoading()
//     cy.get(examGradeClass.viewResultBtn).eq(0).click().wait(2500)
//     cy.waitLoading()
// }
// Cypress.PageExamGrade.verifyResultInfo = (_index, _cardInfo) => {
//     cy.get(examGradeClass.responseGridrow).eq(_index)
//         .as('resulttable')
//     cy.get('@resulttable')
//         .find(examGradeClass.responseGridrowLeft)
//         .should('contain', _cardInfo.title)
//     cy.get('@resulttable')
//         .find(examGradeClass.responseGridrowRight)
//         .should('contain', _cardInfo.value)
// };
// Cypress.PageExamGrade.editScore = (_score, _comment, _action) => {
//     cy.get(examGradeClass.fiaFilePenScore).parent().click({ force: true }).wait(500)
//     if (_score != null) {
//         cy.get(examGradeClass.inputScore).clear().type(_score, { delay: 30 })
//     };
//     if (_comment != null) {
//         cy.get(examGradeClass.textareaScoreComment).clear().type(_comment, { delay: 30 })
//     };
//     if (_action == "push") {
//         cy.get(examGradeClass.inputScoreToCandidate).check()
//     }
//     else {
//         cy.get(examGradeClass.inputScoreToCandidate).uncheck()
//     }
//     cy.get(examGradeClass.saveScoreBtn).click().wait(500)
// }
// Cypress.PageExamGrade.mourseOverTab = (_rowIndex, _columnIndex) => {
//     cy.waitLoading()
//     cy.get(examGradeClass.MarkScoreList)
//         .find('[data-cell="' + _rowIndex + ',' + _columnIndex + '"]')
//         .trigger('mouseover')
// }
// Cypress.PageExamGrade.verifyGradeComment = (_content, _isPush) => {
//     const commentTitle = ['Comment for candidate:', 'Private comment:']
//     cy.get(examGradeClass.auiPopupBody + ':visible')
//         .find('p').then(($c) => {
//             if (_isPush == "push") { cy.get($c).eq(0).should("contain", commentTitle[0]) }
//             else if (_isPush == "not push") { cy.get($c).eq(0).should("contain", commentTitle[1]) }
//             cy.get($c).eq(1).should("contain", _content)
//         })
// }
// Cypress.PageExamGrade.clickEditPublishSettting = () => {
//     cy.get(examGradeClass.moreBtn).click().wait(1000)
//     cy.get(examGradeClass.mappintfiaConfig + ':visible').parent().click({ force: true }).wait(1000)
// }
// Cypress.PageExamGrade.clickEditPublishSetttinginExam = () => {
//     cy.get(examGradeClass.editPaperBtn).eq(1).click().wait(1000)
// }
// Cypress.PageExamGrade.choiceAutoPublish = (_index) => {
//     cy.get(examGradeClass.auiChoiceGroup)
//         .find(examGradeClass.radiogroupautoPublish)
//         .eq(_index).click().wait(1000)
// }
// Cypress.PageExamGrade.enableGradeMapping = (_bool) => {
//     cy.get(examGradeClass.mappingAuiSwitchButton).invoke('attr', 'aria-checked').then(($pro) => {
//         if (_bool.toString() != $pro.toString()) {
//             cy.get(examGradeClass.mappingAuiSwitchHandle)
//                 .click()
//         }
//     })
//     cy.wait(2000)
// }
// Cypress.PageExamGrade.clickSavePublishSettting = () => {
//     cy.wait(500)
//     cy.get(examGradeClass.saveGradeBtn).click().wait(500)
// }
// Cypress.PageExamGrade.clickScoreup = (_index) => {
//     cy.get(examGradeClass.auiInputAction + examGradeClass.fauiAngleUpS)
//         .eq(_index).click().wait(500)
// }
// Cypress.PageExamGrade.clickScoreDown = (_index) => {
//     cy.get(examGradeClass.auiInputAction + examGradeClass.fauiAngleDownS)
//         .eq(_index).click().wait(500)
// }
// Cypress.PageExamGrade.editGradeinMapping = (_index, _grade) => {
//     cy.get(examGradeClass.gradeWrap).find(examGradeClass.inputText).eq(_index)
//         .clear()
//         .type(_grade, { delay: 20 }).wait(300)
// }
// Cypress.PageExamGrade.editScoreinMapping = (_index, _score) => {
//     cy.get(examGradeClass.scoreWrap).find(examGradeClass.inputText).eq(_index)
//         .clear()
//         .type(_score, { delay: 20 }).wait(300)
// }
// Cypress.PageExamGrade.clickGeneratePDFforSelected = () => {
//     cy.get(examGradeClass.moreBtn).click().wait(1000)
//     cy.get(examGradeClass.fiaFilePdf + ":visible").click().wait(500)
// }
// Cypress.PageExamGrade.clickGeneratePDFforAll = () => {
//     cy.get(examGradeClass.moreBtn).click().wait(1000)
//     cy.get(examGradeClass.fiaFilePdfCheck + ":visible").click().wait(500)
// }
// Cypress.PageExamGrade.clickDownload = () => {
//     cy.get(examGradeClass.downloadBtn).click().wait(500)
// }
// Cypress.PageExamGrade.clickPrintBtn = () => {
//     cy.get(examGradeClass.printbtn).click().wait(500)
// }
// Cypress.PageExamGrade.verifyFeedback = (_feedback, _index) => {
//     cy.get(examGradeClass.feedback)
//         .eq(_index)
//         .should('contain', _feedback)
// }
// Cypress.PageExamGrade.lockScore = () => {
//     cy.get(examGradeClass.fialock).click().wait(500)
//     cy.waitUntil(() => cy.get(examGradeClass.confirmLockBtn, { timeout: 6000 }))
//     cy.get(examGradeClass.confirmLockBtn).click().wait(1500)
// }
// Cypress.PageExamGrade.unLockScore = () => {
//     cy.get(examGradeClass.fiaunlock).click().wait(500)
//     cy.waitUntil(() => cy.get(examGradeClass.confirmUnlockBtn, { timeout: 6000 }))
//     cy.get(examGradeClass.confirmUnlockBtn).click().wait(1500)
// }
// Cypress.PageExamGrade.checkEditScoreStatus = (_candidateindex, _bool) => {
//     Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox(_candidateindex)
//     if (_bool) {
//         cy.get(examGradeClass.fiaFilePenScore).parent().should('not.have.class', 'disabled')
//     }
//     else {
//         cy.get(examGradeClass.fiaFilePenScore).parent().should('be.disabled')
//     }
// }
// Cypress.PageExamGrade.clickViewDetailsBtn = (_index) => {
//     cy.get(auiTableClass.auiTbody)
//         .find(examGradeClass.buttonlink)
//         .eq(_index)
//         .click({ force: true })
//         .wait(500)
//     cy.waitLoading()
// }
// Cypress.PageExamGrade.clickAttmptTab = (_index) => {
//     cy.get(examGradeClass.tablist)
//         .find(examGradeClass.auitabsbar)
//         .eq(_index)
//         .click({ force: true })
//         .wait(500)
//     cy.waitLoading()
// }
// Cypress.PageExamGrade.verifyAttmptTablenght = (_length) => {
//     cy.get(examGradeClass.tablist)
//         .find(examGradeClass.auitabsbar)
//         .should('have.length', _length)
// }
// Cypress.PageExamGrade.closeViewDetailsPage = () => {
//     cy.get(examGradeClass.closedetailsBtn)
//         .click({ force: true })
//         .wait(500)
// }
// Cypress.PageExamGrade.clickAttmptinExamCard = (_index) => {
//     cy.get(examClass.examCard).eq(_index).as('card')
//     cy.get('@card')
//         .find(examClass.examCardAttempts)
//         .click()
//         .wait(2000)
//     cy.waitLoading()
// }
// Cypress.PageExamGrade.verifyPropertyTable = (_groupInfo) => {
//     for (var i = 0; i < _groupInfo._length; i++) {
//         cy.get(examGradeClass.responseGridrow)
//             .as('resulttable')
//         cy.get('@resulttable')
//             .find(examGradeClass.responseGridrowLeft)
//             .contains(_groupInfo[i].title)
//             .parentsUntil('@resulttable')
//             .find(examGradeClass.responseGridrowRight)
//             .should('contain', _groupInfo[i].value)
//     }
// };
// Cypress.PageExamGrade.clickViewAttemptDetailsBtn = (_index) => {
//     cy.get(auiTableClass.auiTbody)
//         .find(examGradeClass.attemptdetailsBtn)
//         .eq(_index)
//         .click({ force: true })
//         .wait(500)
//     cy.waitLoading()
// }
// Cypress.PageExamGrade.verifyTableValue = (_info) => {
//     for (let c = 0; c < _info.columns.length; c++) {
//         if (_info.columns[c].display) {
//             cy.get('[data-cell="0,' + _info.columns[c].index + '"]')
//                 .should('contain', _info.columns[c].display)
//         }
//         cy.get('[data-cell="' + _info.rowIndex + "," + _info.columns[c].index + '"]')
//             .should('contain', _info.columns[c].value)
//     }
// }
// Cypress.PageExamGrade.verifySubmittedPageScore = (_score) => {
//     cy.get(examGradeClass.submittedPageGrade, { timeout: 6000 })
//         .should('contain', _score)
// }
// Cypress.PageExamGrade.clickSubmittedPageResult = () => {
//     cy.wait(5000)
//     cy.get(examGradeClass.submittedPageBtResult, { timeout: 6000 })
//         .click({ force: true })
// }
Cypress.PageExamGrade.Filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'Status':
                    fil_index = 0
                    popup_index = 0
                    break;
                case 'Class name':
                    fil_index = 1
                    popup_index = 1
                    break;
                case 'Team name':
                    fil_index = 2
                    popup_index = 2
                    break;
                case 'Attendance status':
                    fil_index = 3
                    popup_index = 3
                    break;
                case 'Oral exam progress':
                    fil_index = 4
                    popup_index = 4
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(popup_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(popup_index)
                .click({ force: true })
            cy.wait(2000)
        })
};
Cypress.PageExamGrade.verifyTotalCandidateTips = (_num) => {
    cy.get(examGradeClass.gradingProgressSticky)
        .should('contain', `Total ${_num} candidates`)
};
Cypress.PageExamGrade.clickEditPublishSettingsBtn = () => {
    cy.get(examGradeClass.editPublishSettingBtn)
        .click()
        .wait(500)
};
Cypress.PageExamGrade.verifyEditPublishSettingsValue = (_value1, _value2, _value3) => {
    cy.get(sampleExamClass.faceVerificationBtn)
        .should('have.attr', 'aria-checked', _value1)
    cy.get(auiCommonClass.auiChoiceGroup)
        .eq(0)
        .find('input')
        .eq(_value2)
        .should('have.attr', 'aria-checked', 'true')
    cy.get(auiCommonClass.auiChoiceGroup)
        .eq(1)
        .find('input')
        .eq(_value2)
        .should('have.attr', 'aria-checked', 'true')
};
Cypress.PageExamGrade.verifyStatisticsValue = (_value1, _value2, _value3, _value4) => {
    const classification = ['Highest score', 'Lowest score', 'Medium score', 'Average score']
    const score = [_value1, _value2, _value3, _value4]
    for (let index = 0; index < classification.length; index++) {
        cy.get(examGradeClass.statisticsItem)
            .eq(index)
            .should('contain', classification[index])
            .and('contain', score[index])
    }
};
Cypress.PageExamGrade.clickHeaderBtn = (_num) => {
    cy.get(examGradeClass.gradingProgressSticky + 'button')
        .eq(_num)
        .click({ force: true })
        .wait(500)
};
Cypress.PageExamGrade.verifyBasicInfo_InViewDetais = (_info) => {
    if (_info.candidate) {
        cy.get('[aria-label="Candidate"]')
            .should('contain', 'Candidate')
        Cypress.PageExamCreate.verifyBasicInfoName(_info.candidate[1])
    }
    if (_info.progress) {
        cy.get('[aria-label="Oral exam progress"]')
            .should('contain', 'Oral exam progress')
        cy.get('[aria-label="Oral exam progress"]')
            .next()
            .should('contain', _info.progress[1])
    }
    if (_info.totalScore) {
        cy.get('[aria-label="Total score"]')
            .should('contain', 'Total score')
        cy.get('[aria-label="Total score"]')
            .next()
            .should('contain', _info.totalScore[1])
    }
};
Cypress.PageExamGrade.verifyDisplaySettings_WhetherChecked = (_num, _value) => {
    Cypress.auiCommon.verifyWhetherChecked(adminMarkingSettingsClass.displaySettingInput, _num, _value)
};
Cypress.PageExamGrade.verifyPublishResultConfirm = (_value) => {
    cy.get(sampleExamClass.sampleExamConfirm + 'p')
        .eq(1)
        .should('contain', _value)
};