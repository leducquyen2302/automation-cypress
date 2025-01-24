/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiTableClass, auiComboboxClass, auiCommonClass, auiPopup, auiFilterCommon } from '../../AUI/aui.common.constants'
import { sampleExamClass } from '../../AUI/exam.constants'
import { adminMarkingSettingsClass } from '../../AUI/admin.constants'


Cypress.PageSampleReport = Cypress.PageSampleReport || {};


Cypress.PageSampleReport.clickFilter = (_num) => {
    cy.get(auiComboboxClass.auiComboShell)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageSampleReport.clickSelectAll = (_num) => {
    cy.get(auiPopup.auiPopupVisible + sampleExamClass.selectAll)
        .eq(_num)
        .click({ force: true })
}
Cypress.PageSampleReport.selectValue = (_num, _value) => {
    cy.get(auiPopup.auiPopupBox + auiCommonClass.auiSearchBoxInput)
        .eq(_num)
        .type(_value, { delay: 25 })
        .wait(500)
    cy.get(`[aria-label="${_value}"]`)
        .click({ force: true })
        .wait(500)
}
Cypress.PageSampleReport.chooseOperate = (_num, _ok) => {
    if (_ok) {
        cy.get(auiComboboxClass.auiComboShellRight + auiCommonClass.auiOptionOKBtn)
            .eq(_num)
            .click({ force: true })
            .wait(2000)
    } else {
        cy.get(auiComboboxClass.auiComboShellRight + adminMarkingSettingsClass.confirmCancelMapping)
            .eq(_num)
            .click({ force: true })
    }
}
Cypress.PageSampleReport.filterAllAfterFilterSome = (_num1, _num2) => {
    Cypress.PageSampleReport.clickFilter(_num1)
    Cypress.PageSampleReport.clickSelectAll(0)
    // 确定ok btn的位置；不写num2则默认与filter一至
    let num = _num1
    if (_num2) {
        num = _num2
    }
    Cypress.PageSampleReport.chooseOperate(num, true)
};
Cypress.PageSampleReport.verifyMessage = (_content) => {
    cy.get(auiTableClass.auiTableMessageContent)
        .children()
        .should('contain', _content)
}
Cypress.PageSampleReport.verifyStudentNumber = (_num) => {
    cy.wait(3000)
    let number = auiTableClass.auiTbody + auiTableClass.auiTRow
    expect(Cypress.$(number).length).to.equal(_num)
}
Cypress.PageSampleReport.filter = (_name, _options) => {
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
                case 'Class':
                    fil_index = 3
                    popup_index = 1
                    break;
                case 'Status':
                    fil_index = 4
                    popup_index = 2
                    break;
                case 'Type':
                    fil_index = 5
                    popup_index = 3
                    break;
                case 'Sample exam name':
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
            cy.get(auiFilterCommon.auiFilterContainer + auiCommonClass.auiSearchBoxInput)
                .eq(popup_index)
                .type(_options)
                .wait(1000)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(popup_index)
                .click({ force: true })
            cy.waitLoading().wait(1000)
        })
}