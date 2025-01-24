/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { adminApplicationClass, adminCourseClass } from '../../AUI/admin.constants';
import { sampleExamClass } from '../../AUI/exam.constants';
import { auiCommonClass, auiButtonClass, auiComboboxClass, auiOptionList, auiShadowTag, auiFilterCommon, auiPanelClass } from '../../AUI/aui.common.constants';


Cypress.PageAdminApplication = Cypress.PageAdminApplication || {};

Cypress.PageAdminApplication.clickAddApplication = () => {
    cy.get(adminApplicationClass.createApplicationBtn).click({ force: true })
};
Cypress.PageAdminApplication.clickAdd = (_num) => {
    cy.get(adminApplicationClass.addBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminApplication.verifyPromptInfo = (_num, _content) => {
    cy.get(adminApplicationClass.promptInformation).eq(_num).should('contain', _content)
};
Cypress.PageAdminApplication.verifyDefaultScope = (_value) => {
    cy.get(auiCommonClass.auiModalBody + auiComboboxClass.auiComboShell)
        .eq(1)
        .should('contain', _value)
};
Cypress.PageAdminApplication.inputInfo = (_num, _content) => {
    cy.get(adminApplicationClass.appInputInfo).eq(_num).type(_content)
};
Cypress.PageAdminApplication.chooseScope = (_value, _num) => {
    let number = 0
    if (_value === 'windows') {
        number = 1
    }
    cy.get(auiCommonClass.auiModalBody + auiComboboxClass.auiComboShell)
        .eq(number)
        .click({ force: true })
    cy.get(auiOptionList.auiOptionListBox + auiOptionList.auiOptionListItem)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminApplication.clickAddprocess = (_content) => {
    cy.get('button')
        .contains('Add process')
        .click({ force: true })
    cy.get(adminApplicationClass.processName)
        .type(_content)
    Cypress.PageAdminApplication.clickAdd(1)
};
Cypress.PageAdminApplication.search = (_content) => {
    Cypress.auiCommon.searchBox(auiCommonClass.auiSearchBoxInput, _content)
    cy.waitLoading()
};
Cypress.PageAdminApplication.filterScope = (_value) => {
    cy.get(adminApplicationClass.levelLabel)
        .click({ force: true })
    cy.get(`input[aria-label="${_value}"]`)
        .click({ force: true })
    cy.get(auiCommonClass.auiOptionOKBtn)
        .eq(1)
        .click({ force: true })
};
Cypress.PageAdminApplication.clickApplicationName = () => {
    cy.waitLoading()
    cy.get(adminApplicationClass.viewTableCellContent).eq(0).find('a').click({ force: true })
    cy.waitLoading()
};
Cypress.PageAdminApplication.applicationDetails = (_num, _content) => {
    cy.get(auiShadowTag.auiEllipsis)
        .eq(_num + 1)
        .should('contain', _content)
};
Cypress.PageAdminApplication.clickDetailEdit = () => {
    cy.get(adminCourseClass.editBtn).click({ force: true })
};
Cypress.PageAdminApplication.appTableRowCheckbox = (_rowIndex) => {
    let table = adminApplicationClass.appTableBody
    Cypress.auiCommon.checkBoxInTable(table, _rowIndex)
};
Cypress.PageAdminApplication.clickEdit = () => {
    const EditBtn = auiButtonClass.editBtn
    return Cypress.auiCommon.clickBtn(EditBtn, 3000)
};
Cypress.PageAdminApplication.deleteProcess = () => {
    cy.get(adminApplicationClass.editAppBtn).eq(2).click({ force: true })
    cy.get(adminApplicationClass.popupBtn)
        .eq(5)
        .click({ force: true })
    Cypress.PageAdminCourse.confirmDialog(1)
};
Cypress.PageAdminApplication.clickSave = () => {
    cy.get(auiButtonClass.saveBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminApplication.clickDelApp = () => {
    cy.get(auiButtonClass.deleBtn)
        .eq(0)
        .click({ force: true })
        .wait(500)
    Cypress.PageAdminCourse.confirmDialog(1)
};
Cypress.PageAdminApplication.clickMacList = () => {
    cy.get(auiCommonClass.auiTabsBar).find('div').contains('macOS').click({ force: true })
    cy.wait(1500)
};