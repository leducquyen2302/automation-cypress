/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { examFileSaveTrackingClass, examClass, examStudentClass, sampleExamClass } from '../../AUI/exam.constants'
import { adminApplicationClass, adminGlobalLinks, adminSwitchRoleClass, adminRoleClass, adminLmsIntegration } from '../../AUI/admin.constants'
import { bankClass } from '../../AUI/bank.constants'
import { auiCommonClass, auiComboboxClass, auiTableClass, auiPanelClass, auiDateFilter, auiFilterCommon, auiButtonClass, auiOptionList, auiCalendar, auiDialogClass, auiPopup } from '../../AUI/aui.common.constants'

Cypress.PageFileSaveTracking = Cypress.PageFileSaveTracking || {};

Cypress.PageFileSaveTracking.clickOnlyShowCandidatesWithoutSavingBtn = () => {
    cy.get(auiCommonClass.auiChoiceInput)
        .eq(0)
        .click()
        .waitLoading()
};
Cypress.PageFileSaveTracking.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Attendance status':
                    fil_index = 0
                    break;
                case 'Submission status':
                    fil_index = 1
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(fil_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiFilterCommon.auiFilterContainer + auiCommonClass.auiSearchBoxInput)
                .eq(fil_index)
                .type(_options)
                .wait(1000)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.waitLoading().wait(1000)
        })
};
Cypress.PageFileSaveTracking.clickRefreshBtn = () => {
    cy.get(examFileSaveTrackingClass.refreshBtn)
        .parent()
        .click()
        .waitLoading()
};
Cypress.PageFileSaveTracking.verifyTotalCandidates = (_num) => {
    cy.get(examFileSaveTrackingClass.totalCandidates)
        .eq(0)
        .should('contain', `Total ${_num} candidate`)
};
Cypress.PageFileSaveTracking.clickViewQuestionContentBtn = () => {
    cy.get(examFileSaveTrackingClass.viewQuestionContentBtn)
        .click()
};
Cypress.PageFileSaveTracking.verifyViewQuestionContent = (_paperContent, _fileName) => {
    cy.get(auiCommonClass.auiRichPurHtml)
        .should('contain', _paperContent)
    cy.get(auiCommonClass.auiUploaderContent + 'a')
        .should('contain', _fileName)
};