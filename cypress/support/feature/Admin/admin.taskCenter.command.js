/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { adminTaskCenter, adminAccountClass, adminApprovalProcesses } from '../../AUI/admin.constants';
import { examClass, } from '../../AUI/exam.constants';
import { auiCommonClass, auiPanelClass, auiShadowTag, auiComboboxClass, auiFilterCommon, auiTableClass, auiButtonClass } from '../../AUI/aui.common.constants';


Cypress.PageAdminTaskCenter = Cypress.PageAdminTaskCenter || {};

Cypress.PageAdminTaskCenter.enterTaskCenter = () => {
    cy.get(adminTaskCenter.taskIcon)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminTaskCenter.verifyTaskIconNumber = (_num) => {
    cy.get(adminTaskCenter.taskIcon + auiShadowTag.auiBadge)
        .shadow()
        .find('.number')
        .should('contain', _num)
};
Cypress.PageAdminTaskCenter.viewExamFooterButton = (_value) => {
    const footerButton = examClass.createExamFootBtn + 'span'
    // expect(footerButton.length()).eq(_value.length)
    for (let index = 0; index < _value.length; index++) {
        cy.get(footerButton)
            .eq(index)
            .should('contain', _value[index])
    }
};
Cypress.PageAdminTaskCenter.verifyMoreApproversNumber = (_value) => {
    cy.get(adminTaskCenter.tableMoreApprovers)
        .should('contain', _value)
};
Cypress.PageAdminTaskCenter.clickMoreApproversNumber = () => {
    cy.get(adminTaskCenter.tableMoreApprovers)
        .click({ force: true })
};
Cypress.PageAdminTaskCenter.verifyMoreApproversStaff = (_num, _value) => {
    // cy.get(adminTaskCenter.taskApproverPopup)
    //     .should('contain', _value)
    Cypress.auiCommon.verifyPopupAvatar(_num, _value)
};
Cypress.PageAdminTaskCenter.clickExamName = () => {
    cy.get(auiTableClass.auiTCellContent + 'a')
        .click({ force: true })
        .wait(3000)
};
Cypress.PageAdminTaskCenter.clickStageNumber = () => {
    cy.get(adminTaskCenter.taskTotalStage)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminTaskCenter.verifyPaperDisabled_AfterCheckOut = () => {
    for (let index = 0; index < 5; index++) {
        if (index != 2) {
            cy.get(auiButtonClass.auiFitBoxBtnContainer + 'button')
                .should('have.attr', 'disabled')
        }
    }
};
Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent = (_num, _title, _content) => {
    cy.get(adminTaskCenter.approvalHistoryDiv)
        .eq(_num)
        .should('contain', _title)
    if (_content) {
        cy.get(adminTaskCenter.approvalHistoryDiv + auiShadowTag.auiI18n)
            .eq(_num)
            .shadow()
            .find('span')
            .should('contain', _content)
    }
};
Cypress.PageAdminTaskCenter.verifyApprovalHistoryTime = (_num) => {
    cy.get(adminTaskCenter.approvalHistoryTime)
        .eq(_num)
        .compareEosDateFormat(new Date())
};
Cypress.PageAdminTaskCenter.clickApproveBtn = () => {
    cy.get(adminTaskCenter.approveBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminTaskCenter.clickRejectBtn = () => {
    cy.get(adminTaskCenter.rejectBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminTaskCenter.verifySpecificStageDisabled_InStage1 = () => {
    cy.get(adminTaskCenter.specificStageLabel)
        .should('have.attr', 'aria-disabled', 'true')
};
Cypress.PageAdminTaskCenter.clickSpecificStageBtn = () => {
    cy.get(adminTaskCenter.specificStageLabel)
        .click({ force: true })
};
Cypress.PageAdminTaskCenter.clickReturnToMeDirectlyBtn = () => {
    cy.get(adminTaskCenter.returnToMeDirectlyLabel)
        .click({ force: true })
};
Cypress.PageAdminTaskCenter.verifyFollowTheSubStagesLabelDisabledAndChecked_InStage1 = () => {
    cy.get(adminTaskCenter.followTheSubStagesLabel + 'input')
        .should('have.attr', 'disabled')
    cy.get(adminTaskCenter.followTheSubStagesLabel + 'input')
        .should('have.attr', 'aria-checked', 'true')
};
Cypress.PageAdminTaskCenter.clickAssignApproverBtn = () => {
    cy.get(adminTaskCenter.assignApproversBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminTaskCenter.clickShowWithoutApproversBtn = () => {
    cy.get(adminTaskCenter.showWithoutApproversLabel)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminTaskCenter.filter = (_name, _options, _options2) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Service type':
                    fil_index = 0
                    break;
                case 'Status':
                    fil_index = 1
                    break;
                case 'Pending on':
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
            cy.get(auiCommonClass.auiOptionItem)
                .find(`[aria-label="${_options}"]`)
                // .as('op')
                // cy.get('@op')
                //     .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            if (_options2) {
                cy.get(auiCommonClass.auiOptionItem)
                    .find(`[aria-label="${_options2}"]`)
                    .as('op2')
                    // cy.get('@op2')
                    //     .find(auiCommonClass.auiOptionCheckBox)
                    .click({ force: true })
            }
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.waitLoading().wait(1000)
        })
};