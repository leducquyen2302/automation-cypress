/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiButtonClass, auiTableClass, auiFilterCommon } from '../../AUI/aui.common.constants';
import { adminConductSettings, adminRoleClass } from '../../AUI/admin.constants';
import { examAttendanceClass, examClass } from '../../AUI/exam.constants';

Cypress.ConductSettings = Cypress.ConductSettings || {};

Cypress.ConductSettings.clickActionButton = (_num) => {
    cy.get(examAttendanceClass.actionHeaderBtn)
        .eq(_num)
        .click()
        .waitLoading()
        .wait(2000)
};
Cypress.ConductSettings.saveShortcut = () => {
    cy.get(auiButtonClass.saveBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.ConductSettings.verifyValidationMessage = () => {
    cy.get(auiCommonClass.auiValidationMessage)
        .click({ force: true })
        .waitLoading()
};
Cypress.ConductSettings.inputFunction = (_value) => {
    cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiInputTarget)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.ConductSettings.openVirtualKeyboard = (_num) => {
    cy.get(adminConductSettings.hotkey)
        .eq(_num)
        .find('span')
        .click({ force: true })
};
Cypress.ConductSettings.chooseShortcut = (_system, _value) => {
    let system = ''
    let num = ''
    if (_system === 'windows') {
        system = "Ctrl"
        num = 0
    }
    if (_system === 'mac') {
        system = "command"
        num = 1
    }
    cy.get(`[aria-label="${system}"]`)
        .eq(0)
        .click({ force: true })
    cy.get(`[aria-label="${_value}"]`)
        .click({ force: true })
    cy.get(adminRoleClass.okBtn)
        .eq(num)
        .click({ force: true })
        .wait(500)
};
Cypress.ConductSettings.verifyChoosedShortcut = (_num, _value) => {
    cy.get(adminConductSettings.hotkeyInput)
        .eq(_num)
        .should('have.attr', 'value', _value)
};
Cypress.ConductSettings.search = (_value) => {
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(0)
        .as('search')
    Cypress.auiCommon.searchBox('@search', _value)
    cy.waitLoading()
};
Cypress.ConductSettings.verifyButtonDisabled = (_num) => {
    cy.get(examAttendanceClass.actionHeaderBtn)
        .eq(_num)
        .should('have.attr', 'disabled')
};
Cypress.ConductSettings.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Type':
                    fil_index = 0
                    break;
                case 'Status':
                    fil_index = 1
                    break;
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(fil_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.wait(3000)
        })
}
Cypress.ConductSettings.chooseShowRows = (_value) => {
    // cy.get('aui-pager ')
    //     .shadow()
    // .find('.page-size ')
    // .shadow()
    // .find('.action')
    cy.get('.page-size ')
        .click({ force: true })
    cy.wait(5000)
    cy.get('aui-pager ')
        .shadow()
        .find('aui-select-lite ')
        .shadow()
        .find(`[data-value="${_value}"]`)
        .click({ force: true })
        .wait(2500)
};
Cypress.ConductSettings.verifyDefaultDataNumber = (_value) => {
    let number = auiTableClass.auiTbody + auiTableClass.auiTRow
    expect(Cypress.$(number).length).to.equal(_value)
};

// Exam setup settings
Cypress.ConductSettings.chooseWhetherAbled_keyCode = (_num) => {
    cy.get(adminConductSettings.keyCodeId + auiCommonClass.auiRadio)
        .eq(_num)
        .click({ force: true })
};
Cypress.ConductSettings.inputMinutes = (_num, _newValue, _originalValue) => {
    cy.get(auiCommonClass.auiInputTarget)
        .eq(_num)
        .as('input')
    if (_originalValue) {
        cy.get('@input')
            .should('have.attr', 'value', _originalValue)
    }
    cy.get('@input')
        .clear({ force: true })
        .type(_newValue, { force: true })
        .type('{enter}')
};
Cypress.ConductSettings.chooseWhetherRestriction_entranceRestriction = (_num) => {
    cy.get(adminConductSettings.entranceRestrictionId + auiCommonClass.auiRadio)
        .eq(_num)
        .click({ force: true })
};
Cypress.ConductSettings.clickSave_examSetupSettings = () => {
    cy.get(adminConductSettings.examSetupSettingsFooter + 'button')
        .click({ force: true })
};
Cypress.ConductSettings.checkEnableIDVerification_onlineProctoring = (_num) => {
    cy.get(examClass.IdVerification)
        .eq(_num)
        .click()
        .wait(300)
};
Cypress.ConductSettings.switchButton_environmentCheck = () => {
    Cypress.auiCommon.clickSwitchBtn_InModal(1)
};
Cypress.ConductSettings.switchButton_onlineProctoring = () => {
    Cypress.auiCommon.clickSwitchBtn_InModal(2)
};
Cypress.ConductSettings.checkNoPerson_onlineProctoring = () => {
    cy.get(examClass.noPerson)
        .click()
        .wait(300)
};
Cypress.ConductSettings.verifyByDefaultYes_QuestionVisibility = () => {
    cy.get(adminConductSettings.questionVisibilityForCandidates + 'input')
        .eq(0)
        .should('have.attr', 'checked')
};
Cypress.ConductSettings.checkBtn_QuestionVisibility = (_num) => {
    cy.get(adminConductSettings.questionVisibilityForCandidates + 'input')
        .eq(_num)
        .click({ force: true })
};
Cypress.ConductSettings.checkChatBoxBtn = (_num) => {
    cy.get(adminConductSettings.chatBoxBtn)
        .eq(_num)
        .click({ force: true })
};
Cypress.ConductSettings.verifyCheckChatBoxBtn = (_num) => {
    cy.get(adminConductSettings.chatBoxBtn)
        .eq(_num)
        .should('have.attr', 'aria-checked', 'true')
};
Cypress.ConductSettings.verifySubmissionVisibility = (_num, _value) => {
    Cypress.auiCommon.verifyWhetherChecked(adminConductSettings.viewSubmissionBtn, _num, _value)
};
Cypress.ConductSettings.checkSubmissionVisibilityBtn = (_num) => {
    cy.get(adminConductSettings.viewSubmissionBtn)
        .eq(_num)
        .click({ force: true })
};
Cypress.ConductSettings.inputLowSuspicion = (_value) => {
    cy.get(adminConductSettings.inputLowSuspicion)
        .clear()
        .type(_value)
        .type('{enter}')
};
Cypress.ConductSettings.resetDefaultSuspiciousActivities = () => {
    cy.get(adminConductSettings.resetDefaultSuspiciousActivities)
        .click({ force: true })
};