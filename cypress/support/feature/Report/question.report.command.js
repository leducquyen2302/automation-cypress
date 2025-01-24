/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiFilterCommon, auiComboboxClass, auiOptionList } from '../../AUI/aui.common.constants'
import { examClass } from '../../AUI/exam.constants';
import { reportsClass,questionreportClass} from '../../AUI/reports.constants'


Cypress.PageQuestionReport = Cypress.PageQuestionReport || {};
Cypress.PageQuestionReport.Filter = (_index,_ops) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox).as('box')
    cy.get('@box').eq(_index).find(auiFilterCommon.auiFilterContent)
        .click({ force: true }).wait(2500)
    cy.log(_ops)
    cy.get(auiFilterCommon.auiFilterContainer+":visible").as('container')
    cy.get('@container').find(auiCommonClass.auiSearch).type(_ops, {delay:50,force: true })
    cy.get('@container').find(auiCommonClass.auiChoiceInput).eq(0).click({ force: true })
    // cy.get('@container').find(questionreportClass.auiOptionlistSelectAll).click({force:true})
    cy.get(questionreportClass.auiComboboxshellFooter + ' ' + auiCommonClass.auiOptionOKBtn + ':visible')
      .click({ force: true })
    cy.waitLoading()
}
Cypress.PageQuestionReport.verifyFilterSearchResult = (_index,_ops,_length) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox).as('box')
    cy.get('@box').eq(_index).find(auiFilterCommon.auiFilterContent)
        .click({ force: true }).wait(2500)
    cy.get(auiFilterCommon.auiFilterContainer+":visible").as('container')
    cy.get('@container').find(auiCommonClass.auiSearch).type(_ops, {delay:50,force: true })
    if(_length == 0){
      return  cy.get(questionreportClass.auiOptionlistNomatch).should('exist')
    }
    return cy.get('@container').find(auiCommonClass.auiChoiceInput).should('have.length',_length)
}
Cypress.PageQuestionReport.clearFilter = (_index) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox).as('box')
    cy.get('@box').eq(_index).find(auiFilterCommon.auiFilterContent)
        .click({ force: true }).wait(1500)
    cy.get(auiFilterCommon.auiFilterContainer+":visible").as('container')
    cy.get('@container').find(auiCommonClass.auiChoiceInput).eq(0).click({ force: true })
    cy.get(questionreportClass.auiComboboxshellFooter + ' ' + auiCommonClass.auiOptionOKBtn + ':visible')
        .click({ force: true })
    cy.waitLoading()
}

Cypress.PageQuestionReport.clickQuestionIndexLink = (_index) => {
    cy.get(auiTableClass.auiTbody)
        .find(questionreportClass.link)
        .eq(_index)
        .click({ force: true })
        .wait(500)
    cy.waitLoading()
}
Cypress.PageQuestionReport.clickOptionView = (_index) => {
    cy.get(auiTableClass.auiTbody)
        .find(questionreportClass.link)
        .eq(_index)
        .click({ force: true })
        .wait(500)
    cy.waitLoading()
}
Cypress.PageQuestionReport.search = (_content) => {
    cy.get(questionreportClass.searchInput + ":visible")
        .click()
        .clear()
        .type(_content,{delay:25})
    cy.get(questionreportClass.searchBtn + ":visible")
        .click({force:true})
    cy.waitLoading()
}
Cypress.PageQuestionReport.clearSearch = (_content) => {
    cy.get(questionreportClass.clearSearchBtn + ":visible")
        .click({force:true})
    cy.waitLoading()
}