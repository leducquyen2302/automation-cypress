/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { adminGlobalSettings, adminAccountClass, adminApprovalProcesses } from '../../AUI/admin.constants';
import { examClass } from '../../AUI/exam.constants';
import { auiCommonClass, auiButtonClass, auiPanelClass, auiPopup, auiComboboxClass, auiFilterCommon, auiTableClass } from '../../AUI/aui.common.constants';


Cypress.PageAdminApprovalProcesses = Cypress.PageAdminApprovalProcesses || {};

Cypress.PageAdminApprovalProcesses.clickTopButton = (_num) => {
    cy.get(adminGlobalSettings.userSettingContent + 'button')
        .eq(_num)
        .click()
        .wait(500)
};
Cypress.PageAdminApprovalProcesses.verifyRequiredFields = () => {
    for (let i = 0; i < 3; i++) {
        cy.get(`${examClass.validationMessage}:visible`)
            .eq(i)
            .should('contain', 'Enter a value to proceed.')
    }
};
Cypress.PageAdminApprovalProcesses.inputName = (_value) => {
    cy.get(adminApprovalProcesses.nameLabel)
        .clear({ force: true })
        .type(_value)
};
Cypress.PageAdminApprovalProcesses.chooseServiceType = (_value) => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellEllipsis)
        .eq(0)
        .click({ force: true })
    if (_value == 'Paper') {
        cy.get(auiPopup.auiPopupVisible + adminApprovalProcesses.paperLabel)
            .click({ force: true })
    }
    if (_value == 'Exam') {
        cy.get(auiPopup.auiPopupVisible + adminApprovalProcesses.examLabel)
            .click({ force: true })
    }
    if (_value == 'Exam, paper, and question') {
        cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiCheckBox)
            .eq(0)
            .click({ force: true })
    }
    cy.get(auiPopup.auiPopupVisible + '.aui-comboboxshell-right')
        .eq(0)
        .find(auiCommonClass.auiOptionOKBtn)
        .click()
};
Cypress.PageAdminApprovalProcesses.openCoursePopup = () => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellEllipsis)
        .eq(1)
        .click({ force: true })
};
Cypress.PageAdminApprovalProcesses.checkCourse = (_num) => {
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiCheckBox)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminApprovalProcesses.clickCoursePopupOkBtn = () => {
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiOptionOKBtn)
        .eq(1)
        .click({ force: true })
};
Cypress.PageAdminApprovalProcesses.chooseCourse = (_value) => {
    Cypress.PageAdminApprovalProcesses.openCoursePopup()
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(5)
        .type(_value)
    Cypress.PageAdminApprovalProcesses.checkCourse(0)
    Cypress.PageAdminApprovalProcesses.clickCoursePopupOkBtn()
};
Cypress.PageAdminApprovalProcesses.inputDescription = (_value) => {
    cy.get(adminApprovalProcesses.descriptionLabel)
        .type(_value)
};
Cypress.PageAdminApprovalProcesses.clickAddStage = () => {
    cy.get(adminApprovalProcesses.addStageBtn)
        .click()
};
Cypress.PageAdminApprovalProcesses.inputApprover = (_num, _value) => {
    cy.get(auiComboboxClass.auiComboInput)
        .eq(_num)
        .type(_value)
        .type('{enter}')
};
Cypress.PageAdminApprovalProcesses.inputReminder = (_num, _value) => {
    cy.get(adminApprovalProcesses.reminder)
        .eq(_num)
        .type(_value)
};
Cypress.PageAdminApprovalProcesses.verifyConflictCourseTips = (_num, _value) => {
    cy.get(adminApprovalProcesses.approvalCourseId + '[style="color: var(--error-color);"]')
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageAdminApprovalProcesses.verifyMoreCourseNumber = (_value) => {
    cy.get(adminAccountClass.propertyNum)
        .should('contain', '+')
        .and('contain', _value)
};
Cypress.PageAdminApprovalProcesses.deleteStage = (_num) => {
    cy.get(auiButtonClass.deleBtn)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminApprovalProcesses.verifyStageBtnDisabled = () => {
    cy.get(adminApprovalProcesses.deleteStageBtn)
        .should('have.attr', 'disabled')
};
Cypress.PageAdminApprovalProcesses.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Course':
                    fil_index = 0
                    break;
                case 'Service type':
                    fil_index = 1
                    break;
                case 'Status':
                    fil_index = 2
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
Cypress.PageAdminApprovalProcesses.openViewProcess = (_value) => {
    cy.get(`[aria-label="${_value}"]`)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminApprovalProcesses.verifyViewProcessInfo = (_basicInfo, _description, _stageInfo) => {
    let title = ['Course', 'Service type', 'Modified', 'Modified by', 'Status']
    for (let index = 0; index < title.length; index++) {
        cy.get(adminApprovalProcesses.detailRowTitle)
            .eq(index)
            .should('contain', title[index])
    }
    // Verify course
    for (let index = 0; index < _basicInfo[0].length; index++) {
        cy.get(adminApprovalProcesses.detailCourseValue)
            .eq(index)
            .should('contain', _basicInfo[0][index])
    }
    // Verify other
    for (let index = 0; index < 4; index++) {
        if (index == 1) {
            cy.get(adminApprovalProcesses.detailRowValue)
                .eq(index)
                .compareEosDateFormat(_basicInfo[index + 1])
        }
        else if (index == 2) {
            Cypress.auiCommon.verifyCandidateNameInPanel_InShadow_NoTag(_basicInfo[index + 1])
        }
        else {
            cy.get(adminApprovalProcesses.detailRowValue)
                .eq(index)
                .should('contain', _basicInfo[index + 1])
        }
    }
    // Verify description
    cy.get(adminApprovalProcesses.approvalContainer)
        .should('contain', _description)
    // Verify stage
    for (let index = 0; index < _stageInfo.length; index++) {
        if (index == 1) {
            Cypress.auiCommon.verifyCandidateNameInPanelTable_InShadow_NoTag(1, 2, _stageInfo[index])
        }
        else {
            cy.get(auiPanelClass.auiPanelVisible + auiTableClass.auiTbody + auiTableClass.auiTCellContent)
                .eq(index)
                .should('contain', _stageInfo[index])
        }
    }
};