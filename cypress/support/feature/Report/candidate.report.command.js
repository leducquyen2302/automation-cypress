/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiFilterCommon, auiComboboxClass, auiOptionList } from '../../AUI/aui.common.constants'
import { examClass } from '../../AUI/exam.constants';
import { reportsClass,candidatereportClass} from '../../AUI/reports.constants'


Cypress.PageCandidateReport = Cypress.PageCandidateReport || {};
Cypress.PageCandidateReport.clickCandidateNameLink = (_index) => {
    cy.get(auiTableClass.auiTbody)
        .find(candidatereportClass.fontSemibold)
        .eq(_index)
        .click({ force: true })
        .wait(500)
    cy.waitLoading()
}