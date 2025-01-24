/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/

import { adminEmailTemplate } from '../../AUI/admin.constants'
import { auiCommonClass, auiComboboxClass, auiPopup, auiDialogClass } from '../../AUI/aui.common.constants'

Cypress.PageAdminEmailTemplate = Cypress.PageAdminEmailTemplate || {};

Cypress.PageAdminEmailTemplate.clearInput = () => {
    cy.get(adminEmailTemplate.emailName)
        .clear({ force: true })
        .wait(500)
    cy.get(adminEmailTemplate.subject)
        .clear({ force: true })
        .wait(2000)
    cy.get(auiCommonClass.auiRichTextConent)
        .clear({ force: true })
        .wait(500)
};
Cypress.PageAdminEmailTemplate.inputNameAndDes = (_name, _description) => {
    cy.get(adminEmailTemplate.emailName)
        .clear()
        .type(_name, { force: true })
    cy.get(adminEmailTemplate.emailDescription)
        .clear()
        .type(_description, { force: true })
};
Cypress.PageAdminEmailTemplate.verifyFunction = (_value) => {
    Cypress.auiCommon.verifyComBoxContent(0, _value)
    cy.get(auiComboboxClass.auiComboShell)
        .should('have.attr', 'aria-disabled', 'true')
};
Cypress.PageAdminEmailTemplate.verifyEmailRecipients = (_value) => {
    cy.get(adminEmailTemplate.emailRecipients)
        .as('emailRecipients')
    cy.get('@emailRecipients')
        .should('have.attr', 'disabled')
    cy.get('@emailRecipients')
        .should('have.attr', 'value', _value)
};
Cypress.PageAdminEmailTemplate.inputSubject = (_value) => {
    cy.get(adminEmailTemplate.subject)
        .clear({ force: true })
        .type(_value, { force: true })
        .wait(500)
};
Cypress.PageAdminEmailTemplate.inputBody = (_value) => {
    cy.get(auiCommonClass.auiRichTextConent)
        .clear({ force: true })
        .type(_value, { force: true })
        .wait(500)
};
Cypress.PageAdminEmailTemplate.insertReference = (_num1, _num2) => {
    // _num1 第几个insert reference
    // _num2 insert reference中的第几个
    cy.get(adminEmailTemplate.insertReference)
        .eq(_num1)
        .click()
    cy.get(auiPopup.auiPopupMenuitemBtn)
        .eq(_num2)
        .click()
};
Cypress.PageAdminEmailTemplate.verifyPreiviewOrView = (_value) => {
    const title = ['Function', 'Subject', 'Email recipients']
    cy.get(adminEmailTemplate.viewEmailTitle)
        .as('title')
    cy.get('@title')
        .find('div')
        .should('contain', _value[0])
    cy.get('@title')
        .find('textarea')
        .should('contain', _value[1])
    for (let i = 0; i < 3; i++) {
        cy.get(auiCommonClass.detailRow)
            .eq(i)
            .as('row')
        cy.get('@row')
            .find(auiCommonClass.detailRowTitle)
            .should('contain', title[i])
        cy.get('@row')
            .find(auiCommonClass.detailRowValue)
            .should('contain', _value[2][i])
    }
    cy.get(auiCommonClass.auiRichEcho + auiCommonClass.auiRichPurHtml)
        .should('contain', _value[3][0])
    if (_value[3][1]) {
        cy.get(auiCommonClass.auiRichEcho + auiCommonClass.auiRichSpan)
            .should('contain', _value[3][1])
    }
};
Cypress.PageAdminEmailTemplate.verifySubject = (_value) => {
    cy.get(auiCommonClass.detailRow)
        .eq(1)
        .find(auiCommonClass.detailRowValue)
        .should('contain', _value)
};
Cypress.PageAdminEmailTemplate.verifyBody = (_value) => {
    cy.get(auiCommonClass.auiRichEcho + auiCommonClass.auiRichPurHtml)
        .should('contain', _value)
};
Cypress.PageAdminEmailTemplate.verifyTableInfo = (_num, _template) => {
    for (let i = _num; i < _template.length; i++) {
        let info = {
            rowIndex: i + 1,
            columns: [
                {
                    index: 1,
                    value: _template[i][0],
                },
                {
                    index: 2,
                    value: _template[i][1],
                },
                {
                    index: 3,
                    value: _template[i][2],
                },
                {
                    index: 4,
                    value: _template[i][3],
                },
                {
                    index: 5,
                    value: _template[i][4],
                },
                {
                    index: 6,
                    value: _template[i][5],
                },
                {
                    index: 7,
                    value: 'Active',
                }
            ]
        }
        Cypress.auiCommon.verifyTable(info)
    }
    cy.wait(4000)
};
Cypress.PageAdminEmailTemplate.clickTemplateName = (_num) => {
    cy.wait(500)
    cy.get(adminEmailTemplate.templateName)
        .eq(_num)
        .click()
        .waitLoading()
};
Cypress.PageAdminEmailTemplate.clickSubjectIcon = () => {
    cy.get(adminEmailTemplate.subjectIcon)
        .click({ force: true })
};
Cypress.PageAdminEmailTemplate.verifySubjectIconTip = () => {
    cy.get(adminEmailTemplate.subjectIcon)
        .should('have.attr', 'aria-label', 'You can click "Insert reference" to add references to the subject. The inserted references will be replaced with the actual data when an email is sent.')
};
Cypress.PageAdminEmailTemplate.deactivateEmail = (_num) => {
    Cypress.auiCommon.chooseCheckbox(_num)
    Cypress.auiCommon.clickActionHeaderBtn(2)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
};
Cypress.PageAdminEmailTemplate.activateEmail = (_num) => {
    Cypress.auiCommon.chooseCheckbox(_num)
    Cypress.auiCommon.clickActionHeaderBtn(1)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
};
Cypress.PageAdminEmailTemplate.confirmReset = (_num) => {
    cy.get(`${auiDialogClass.auiDialog + auiDialogClass.auiDialogFooter} button`)
        .eq(_num)
        .click({ force: true })
};