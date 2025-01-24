/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { adminAuthorisedUrl, adminLmsIntegration } from '../../AUI/admin.constants';
import { sampleExamClass, examAttendanceClass } from '../../AUI/exam.constants';
import { auiCommonClass, auiPanelClass, auiComboboxClass, auiOptionList, auiFilterCommon } from '../../AUI/aui.common.constants';


Cypress.PageAdminAuthorisedUrl = Cypress.PageAdminAuthorisedUrl || {};

Cypress.PageAdminAuthorisedUrl.clickAddUrlBtn = () => {
    cy.get(adminAuthorisedUrl.addUrlLabel)
        .eq(0)
        .click()
};
Cypress.PageAdminAuthorisedUrl.inputUrlInfo = (_name, _url, _redirect) => {
    cy.get(sampleExamClass.inputName)
        .clear()
        .type(_name)
    if (_url) {
        cy.get(adminAuthorisedUrl.url)
            .clear()
            .type(_url)
    }
    if (_redirect) {
        cy.get(auiPanelClass.auiPanelBody + examAttendanceClass.textArea)
            .click()
            .clear()
            .type(_redirect)
    }
};
Cypress.PageAdminAuthorisedUrl.viewDetails = (_num) => {
    cy.get(adminAuthorisedUrl.uploadImg + 'a')
        .eq(_num)
        .click()
};
Cypress.PageAdminAuthorisedUrl.verifyViewDetailsInfo = (_name, _title, _value) => {
    cy.get(adminLmsIntegration.detailName)
        .should('contain', _name)
    Cypress.auiCommon.verifyDetailPanel(_title, _value)
};