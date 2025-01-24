/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiTableClass, auiComboboxClass, auiCommonClass, auiOptionList, auiFilterCommon } from '../../AUI/aui.common.constants'
import { sampleExamClass } from '../../AUI/exam.constants'
import { adminMarkingSettingsClass } from '../../AUI/admin.constants'
import { dashboardReportClass } from '../../AUI/reports.constants'


Cypress.PageDashboardReport = Cypress.PageDashboardReport || {};


Cypress.PageDashboardReport.verifyDateChecked = (_num, _value) => {
    Cypress.auiCommon.verifyWhetherChecked(auiCommonClass.auiRadio, _num, _value)
};
Cypress.PageDashboardReport.clickWidgetActionBtn = (_num) => {
    cy.get(dashboardReportClass.widgetActionBtn)
        .eq(_num)
        .click()
        .waitLoading()
        .wait(2000)
};
Cypress.PageDashboardReport.verifyCardTitle = (_num, _value) => {
    cy.get(dashboardReportClass.cardTitle)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageDashboardReport.clickExpandBtn = (_num) => {
    cy.wait(1500)
    cy.get(dashboardReportClass.expandBtnLabel)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageDashboardReport.chooseVisualisationType = (_num) => {
    cy.contains('Visualisation type')
        .next()
        .click({ force: true })
    cy.get(auiOptionList.auiOptionListItem)
        .eq(_num)
        .click({ force: true })
};