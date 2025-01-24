/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiComboboxClass, auiShadowTag, auiDateFilter, auiDialogClass, auiFilterCommon, auiButtonClass, auiPopup } from '../../AUI/aui.common.constants'
import { examClass, sampleExamClass, examAttendanceClass } from '../../AUI/exam.constants'

Cypress.PageExamHome = Cypress.PageExamHome || {};

Cypress.PageExamHome.selectFilter = (_Opt) => {
    // Cypress.auiCommon.selectTextFilter(_name, _Opt)
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox).as('box')
    cy.get('@box').eq(0).find(auiFilterCommon.auiFilterContent)
        .click({ force: true }).wait(1500)
    cy.get(auiCommonClass.auiOptionAll).eq(0)
        .find(auiCommonClass.auiOptionCheckBox)
        .click({ force: true })
    cy.log(_Opt)
    cy.get(auiCommonClass.auiSearch).eq(1).type(_Opt)
    cy.wait(500)
    cy.get(auiCommonClass.auiChoiceInput).eq(5).click({ force: true })
    cy.get(auiCommonClass.auiOptionOKBtn).eq(0).click({ force: true })
    cy.wait(1000)
};
Cypress.PageExamHome.selectDateFilter = (_level, _Opt) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiDateFilter.auiDateFilterDefault)
        .click({ force: true })

    Cypress.auiCommon.selectDateFilter(_level, _Opt)
    cy.waitLoading()
};
Cypress.PageExamHome.selectDateFilterfixed = (_level, _Opt) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiComboboxClass.auiComboShell)
        .eq(7)
        .click({ force: true })
    Cypress.auiCommon.selectDateFilter(_level, _Opt)
    cy.waitLoading()
}
Cypress.PageExamHome.clickAndVerifyLink = (_text, _href) => {
    cy.get(examClass.examContainer)
        .find('a').eq(0).as('link')
        .should('contain', _text)
    cy.get('@link')
        .click({ force: true })
    cy.waitLoading()
    cy.waitElement('[placeholder="Search by exam name"]')
        .wait(1500)
    cy.url().should('contain', _href)
};
Cypress.PageExamHome.clickTutorial = (_text) => {
    cy.get(examClass.examTutorial + examClass.examTutorialText)
        .as('tu')
        .should('contain', _text)
    cy.get('@tu').click({ force: true })
};
Cypress.PageExamHome.closeTutorial = () => {
    cy.get(examClass.examTutorialContent +
        examClass.examTuExitBtn)
        .click({ force: true })
};
Cypress.PageExamHome.clickCreateExam = (_num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(examClass.createExamBtn)
        .eq(num)
        .click()
    cy.waitElement(examClass.examStepText)
    cy.wait(2000)
}
Cypress.PageExamHome.clickCreateOralExam = () => {
    cy.get(auiShadowTag.auiCarousel)
        .eq(0)
        .find(examClass.examGroupListBtn)
        .eq(0)
        .click()
    cy.get(auiPopup.auiPopupVisible + examClass.createOralExamBtn)
        .click()
    cy.waitElement(examClass.examStepText)
    cy.wait(2000)
}
Cypress.PageExamHome.searchExam = (_value, _verifyCardTitle) => {
    cy.wait(800)
    cy.waitElement('[placeholder="Search by exam name"]')
        .wait(200)
    // cy.waitLoading()
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(0)
        .clear()
        .type(_value)
        .wait(400)
        .type('{enter}')
        .waitLoading()
    if (_verifyCardTitle) {
        cy.waitLoading()
        cy.get(examClass.examCard)
            .eq(0).as('card')
        cy.get('@card')
            .find(examClass.examCardTitle)
            .should('contain', _value)
    }
};
Cypress.PageExamHome.searchExamInTableView = (_value, _verifyCardTitle) => {
    cy.waitElement('[placeholder="Search by exam name"]')
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(0)
        .clear()
        .type(_value)
        .wait(300)
        .type('{enter}')
        .wait(2500)
};
Cypress.PageExamHome.editExam = (_index) => {
    cy.get(examClass.examCard).eq(_index)
        .as('card')
    cy.get('@card')
        .find(examClass.editExamBtn)
        .click({ force: true })
    cy.wait(5000)
}
Cypress.PageExamHome.publishCardExam = (_index) => {
    cy.get(examClass.examCard)
        .eq(_index)
        .find(examClass.publishBtn)
        .click({ force: true })
        .wait(500)

}
Cypress.PageExamHome.unpublishCardExam = (_index) => {
    cy.get(examClass.examCardContainer + auiButtonClass.auiMoreTriggerBtn)
        .click()
    cy.get(examClass.unPublishBtn)
        .click({ force: true })
        .wait(500)
    cy.wait(1500)
}

// Verification Command 
Cypress.PageExamHome.verifyHomePageComponent = () => { }
Cypress.PageExamHome.latestExam = (_title) => {
    cy.get(examClass.examContainer)
        .find('.exam-container-title')
        .invoke('attr', 'tabindex', 0)
        .focus().wait(200)
        .should('contain', _title)
}
Cypress.PageExamHome.landingUnit = (_index, _title) => {
    cy.get(examClass.examHomeLandingUnit)
        .find(examClass.examHomeLandingUnitHeader)
        .eq(_index)
        .invoke('attr', 'tabindex', _index)
        .focus().wait(200)
        .should('contain', _title)
    cy.wait(500)
}
Cypress.PageExamHome.homeCalendar = (_index, _title) => { }
Cypress.PageExamHome.homeQlink = (_index, _title) => { }

Cypress.PageExamHome.verifyExamCardInfo = (_index, _cardInfo) => {
    cy.get(examClass.examCard)
        .eq(_index).as('card')
    cy.get('@card')
        .find(examClass.examCardTitle)
        .should('contain', _cardInfo.title)
    if (_cardInfo.examCardTitleSta) {
        cy.get('@card')
            .find(examClass.examCardTitleSta)
            .should('contain', _cardInfo.titleSta)
    }
    if (_cardInfo.examTime) {
        cy.get(examClass.cardExamTime)
            .compareEosDateFormat(_cardInfo.examTime)
    }
    if (_cardInfo.CM) { }
    if (_cardInfo.candidates) {
        cy.get('@card')
            .find(examClass.examCardCandidatesNum)
            .next()
            .should('contain', _cardInfo.candidates)
    }
    if (_cardInfo.sta) {
        cy.get('@card')
            .find(examClass.examCardSta).as('sta')
        cy.get('@sta')
            .find(examClass.examCardStaDescrip)
            .should('contain', _cardInfo.sta.descrip)
        if (_cardInfo.sta.step) {
            cy.get('@sta')
                .find(examClass.examCardStaProgress + examClass.examCardStaProgressCheckIcon)
                .then(($icon) => {
                    cy.expect($icon.length)
                        .eq(_cardInfo.sta.step)
                })
        }
    }
    if (_cardInfo.noAnsweringDuration) {
        cy.get(examClass.cardExamTime)
            .find('span')
            .eq(1)
            .find('span')
            .then(($time) => {
                expect($time.length).to.equal(1)
            })
    }
};
Cypress.PageExamHome.expectExamCardsLowerThan = (_exp) => {
    cy.get(examClass.examCard).then(($cards) => {
        cy.expect(_exp).to.equal($cards.length)
    })
};
Cypress.PageExamHome.verifyTutorialContent = (_title, _content) => {
    cy.get(examClass.examTutorialTitle)
        .should('contain', _title)
    for (let i = 0; i < _content.length; i++) {
        cy.get(`${examClass.examTuMenu} li`)
            .eq(i)
            .wait(300)
            .click({ force: true })
            .should('contain', _content[i].step_name)
        cy.wait(300)

        cy.get(`${examClass.examTuBodyDesc} p`)
            .should('contain', _content[i].step_des)
    }
};
Cypress.PageExamHome.verifyQuickTutorial = (_title, _content) => {
    cy.get(examClass.quickExamTutorialHeader).should('contain', _title)
    for (let i = 0; i < _content.length; i++) {
        cy.get(auiShadowTag.auiCarousel)
            .shadow()
            .find('.aui-list-number')
            .eq(i)
            .invoke('attr', 'tabindex', i)
            .focus().wait(200)
            .click({ force: true })
        cy.get(examClass.quickExamTutorialStepPanel + examClass.quickExamTutorialStepTitle)
            .eq(i)
            .invoke('attr', 'tabindex', i)
            .focus().wait(200)
            .should('contain', _content[i].step)
        cy.get(examClass.quickExamTutorialStepPanel + examClass.quickExamTutorialStepDes)
            .eq(i)
            .invoke('attr', 'tabindex', i)
            .focus().wait(200)
            .should('contain', _content[i].des)
    }
}
Cypress.PageExamHome.duplicateExam = () => {
    cy.waitLoading()
    cy.get(examClass.examCardContainer + auiButtonClass.auiMoreTriggerBtn)
        .eq(0)
        .click({ force: true })
    cy.get(examClass.duplicateBtn)
        .eq(0)
        .click({ force: true })
        .waitLoading()
        .wait(3000)
}

// ============================================= unpublish =============================================
Cypress.PageExamHome.unpublishExam = (_num) => {
    if (_num) {
        cy.get(examClass.examCardContainer + auiButtonClass.auiMoreTriggerBtn)
            .eq(_num).click({ force: true })
        cy.get(examClass.unPublishBtn)
            .eq(_num).click({ force: true }).wait(1500)
    }
    else {
        cy.get(examClass.examCardContainer + auiButtonClass.auiMoreTriggerBtn)
            .click({ force: true })
        cy.get(examClass.unPublishBtn)
            .click({ force: true }).wait(1500)
    }
}
Cypress.PageExamHome.verifyConfirmUnpub = (_num, _value, _num2) => {
    if (_num == 0 || _num == 2) {
        cy.get(sampleExamClass.sampleExamConfirm + 'p ' + 'strong')
            .eq(_num2).should('contain', _value)
    }
    else {
        cy.get(sampleExamClass.sampleExamConfirm + 'p')
            .eq(_num).should('contain', _value)
    }
}
// Cypress.PageExamHome.confirmUnpublish = () => {
//     cy.get(sampleExamClass.sampleUnplishExam)
//         .click({ force: true })
//         .wait(2500)
// }
Cypress.PageExamHome.verifyCardStatus = (_value) => {
    cy.get(examClass.examCardStaDescrip)
        .should('contain', _value)
}
Cypress.PageExamHome.enterExamByCardTitle = () => {
    cy.get(examClass.examCardTitle)
        .click({ force: true }).wait(3000)
}
Cypress.PageExamHome.verifyUnpubExamToast = (_num, _value) => {
    cy.get(auiCommonClass.auiToastInfo)
        .find('div').children().find('span').eq(_num)
        .should('contain', _value)
}
Cypress.PageExamHome.filterFlexible = (_number) => {
    cy.contains('Exam classification: All')
        .click({ force: true }).wait(300)
    cy.get(sampleExamClass.selectAll)
        .click({ force: true }).wait(300)
    cy.get('input' + examClass.flexibleTime)
        .click({ force: true }).wait(300)
    cy.get(auiCommonClass.auiPopupBody + auiCommonClass.auiOptionOKBtn)
        .eq(3)
        .click({ force: true }).waitLoading()
}
Cypress.PageExamHome.verifySumDuration = () => {
    cy.get(examClass.examCardDuration)
        .children()
        .should('contain', '45 mins')
}
Cypress.PageExamHome.verifyReadAndAnsDuration = () => {
    cy.get(examClass.examCardDuration)
        .invoke('attr', 'aria-label', 'Reading duration: 15 minutes Answering duration: 30 minutes')
}

// ============================================= examList =============================================
Cypress.PageExamHome.verifyCardOrTableViewBtn_tooltip = () => {
    cy.get(auiShadowTag.auiTabBtn + auiCommonClass.roleTab)
        .eq(0)
        .should('have.attr', 'aria-label', 'Card view')
    cy.get(auiShadowTag.auiTabBtn + auiCommonClass.roleTab)
        .eq(1)
        .should('have.attr', 'aria-label', 'Table view')
}
Cypress.PageExamHome.switchExamView = (_value) => {
    let num = ''
    if (_value == 'Table') {
        num = 1
    } else {
        num = 0
    }
    cy.get(auiShadowTag.auiTabBtn)
        .shadow()
        .find('input')
        .eq(num)
        .click({ force: true })
        .wait(2000)
}
Cypress.PageExamHome.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'School':
                    fil_index = 0
                    popup_index = 5
                    break;
                case 'Discipline':
                    fil_index = 1
                    popup_index = 6
                    break;
                case 'Course':
                    fil_index = 2
                    popup_index = 0
                    break;
                case 'Semester':
                    fil_index = 3
                    popup_index = 1
                    break;
                case 'Status':
                    fil_index = 4
                    popup_index = 2
                    break;
                case 'Exam type':
                    fil_index = 5
                    popup_index = 3
                    break;
                case 'Exam classification':
                    fil_index = 6
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
            cy.get(auiPopup.auiPopupVisible)
                .find(auiCommonClass.auiOptionOKBtn)
                // .eq(popup_index)
                .eq(0)
                .click({ force: true })
                .waitElement('[placeholder="Search by exam name"]')
            cy.wait(5000)
        })
};
Cypress.PageExamHome.verifyGenerateKeyBtn_hightLight = () => {
    cy.get(examClass.generateKeyBtn)
        .should('not.have.attr', 'disabled')
};
Cypress.PageExamHome.clickRightBtn_tableView = (_examNum, _btnNum) => {
    Cypress.PageExamAttendance.editRightBtn(_examNum)
    cy.get(auiButtonClass.auiPopupBodyBtn)
        .eq(_btnNum)
        .click()
        .wait(2000)
};
Cypress.PageExamHome.clickExamName_tableView = () => {
    cy.get(examClass.tableViewExamName)
        .eq(0)
        .find('a')
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamHome.verifyFooterCopyright = () => {
    cy.get(auiCommonClass.auiFooterLeft)
        .children()
        .should('have.attr', 'alt', 'Powered by MaivenPoint')
};
Cypress.PageExamHome.verifyShowNoExams = () => {
    cy.get(examClass.examHomePage)
        .should('contain', 'There are no exams to show in this view.')
};
Cypress.PageExamHome.clickExamCardBtn = (_num, _operation) => {
    cy.get(examClass.examCardContainer + auiButtonClass.auiMoreTriggerBtn)
        .eq(0)
        .click({ force: true })
    cy.get(auiButtonClass.auiPopupBodyBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(3000)
    if (_operation) {
        Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    }
};