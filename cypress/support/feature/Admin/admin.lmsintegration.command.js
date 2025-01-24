/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/

import { auiCommonClass, auiMessageBox, auiButtonClass, auiPanelClass } from '../../AUI/aui.common.constants';
import { adminCourseClass, adminLmsIntegration } from '../../AUI/admin.constants'

let originalValue = []
let currentValue = []

Cypress.PageAdminLms = Cypress.PageAdminLms || {};

Cypress.PageAdminLms.deletePlatform = () => {
    cy.get(auiCommonClass.containerName + auiButtonClass.deleBtn)
        .click({ force: true })
    Cypress.auiCommon.verifyConfirmDialogContent('Are you sure you want to delete this platform?')
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast('The platform was deleted.')
    cy.waitLoading()
};
Cypress.PageAdminLms.clickRegister = () => {
    cy.get(adminLmsIntegration.registerBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminLms.clickSave = () => {
    cy.get(auiButtonClass.saveBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminLms.verifyValidationMessage = () => {
    const validation = 'Enter a value to proceed.'
    for (let i = 0; i < 5; i++) {
        cy.get(adminLmsIntegration.integPanelRow)
            .eq(i)
            .parent()
            .should('contain', validation)
    }
    cy.get(adminLmsIntegration.integPanelRow)
        .eq(7)
        .parent()
        .should('contain', validation)
};
Cypress.PageAdminLms.copy = (_value) => {
    cy.get(`[aria-label="Copy-${_value}"] `)
        .click({ force: true })
};
Cypress.PageAdminLms.verifyCopyUrlToast = () => {
    Cypress.auiCommon.verifyToast('URL copied.')
    cy.get(auiCommonClass.auiToastClose)
        .click({ force: true })
};
Cypress.PageAdminLms.verifyCopyPublicKeyToast = () => {
    Cypress.auiCommon.verifyToast('Public key copied.')
    Cypress.PageAdminLms.closeToast()
};
Cypress.PageAdminLms.closeToast = () => {
    cy.get(auiCommonClass.auiToastClose)
        .click({ force: true })
};
Cypress.PageAdminLms.verifyUrlDisabledEdit = (_value) => {
    for (let i = 0; i < _value.length; i++) {
        cy.contains(_value[i])
            .parent()
            .parent()
            .find('input')
            .as('url')
        cy.get('@url')
            .should('have.attr', 'disabled')
        cy.get('@url')
            .invoke('attr', 'value')
            .then(($data) => {
                originalValue.push($data)
            })
    }
};
Cypress.PageAdminLms.verifyKeyDisabledEdit = (_value) => {
    cy.contains(_value)
        .parent()
        .parent()
        .find('textarea')
        .as('key')
    cy.get('@key')
        .should('have.attr', 'disabled')
    cy.get('@key')
        .then(($data) => {
            originalValue.push($data.text())
        })
};
Cypress.PageAdminLms.inputInfo = (_value) => {
    for (let i = 0; i < _value.length - 1; i++) {
        cy.get(adminLmsIntegration.integPanelRow)
            .eq(i).as('panelRow')
        if (i === 0) {
            cy.get('@panelRow')
                .should('contain', 'Display name')
            cy.get('@panelRow')
                .find('input')
                .type(_value[i], { force: true })
        }
        else if (i === 1) {
            cy.get('@panelRow')
                .should('contain', _value[i])
            Cypress.auiCommon.clickDropdownListSelectItem(4)
        }
        else {
            cy.get('@panelRow')
                .should('contain', _value[i])
            cy.get('@panelRow')
                .find('input')
                .type(_value[i], { force: true })
        }
    }
    cy.get(adminLmsIntegration.integPanelRow)
        .eq(9).as('panelRow')
    cy.get('@panelRow')
        .should('contain', _value[6])
    cy.get('@panelRow')
        .find('input')
        .type(_value[6], { force: true })
};
Cypress.PageAdminLms.editDisplayName = (_value) => {
    cy.get(adminLmsIntegration.integPanelRow)
        .eq(0)
        .find('input')
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.PageAdminLms.checkAll = () => {
    Cypress.PageAdminQuickLink.checkAll()
    cy.wait(1000)
};
Cypress.PageAdminLms.verifyViewDetails = (_name, _value) => {
    cy.log(originalValue[0])
    cy.log(originalValue[1])
    cy.log(originalValue[2])
    cy.log(originalValue[3])
    cy.log(originalValue[4])
    currentValue = [originalValue[0], originalValue[1], originalValue[2], 'Client ID', originalValue[4], originalValue[3]]
    cy.contains(_name)
        .click({ force: true })
        .waitLoading()
    cy.get(adminLmsIntegration.detailName)
        .should('contain', _name)
    cy.get(adminLmsIntegration.detailRowTitle)
        .eq(0)
        .should('contain', _value[0])
    cy.get(adminLmsIntegration.detailRowValue)
        .eq(0)
        .should('contain', _name)
    cy.get(adminLmsIntegration.detailRowValue)
        .eq(1)
        .should('contain', _value[1])
    for (let i = 2; i < 12; i++) {
        cy.get(adminLmsIntegration.detailRowTitle)
            .eq(i)
            .should('contain', _value[i])
        if (i < 6) {
            cy.get(adminLmsIntegration.detailRowValue)
                .eq(i)
                .should('contain', _value[i])
        }
        else {
            cy.get(adminLmsIntegration.detailRowValue)
                .eq(i)
                .should('contain', currentValue[i - 6])
        }
    }
};
Cypress.PageAdminLms.closeDetail = () => {
    cy.get(auiPanelClass.auiPanelClose + auiButtonClass.auiBtnClose)
        .eq(1)
        .click({ force: true })
};
Cypress.PageAdminLms.closeRegistration = (_num) => {
    cy.get(auiPanelClass.auiPanelClose + auiButtonClass.auiBtnClose)
        .eq(_num)
        .click({ force: true })
        .wait(500)
};
Cypress.PageAdminLms.verifyUrlValue = () => {
    for (let i = 6; i < 12; i++) {
        cy.get(adminLmsIntegration.integPanelRow)
            .eq(i)
            .as('url')
        if (i !== 9 && i !== 10) {
            cy.get('@url')
                .find('input')
                .invoke('attr', 'value')
                .then(($data) => {
                    if (i === 6) {
                        expect($data).to.eq(currentValue[i - 6])
                    }
                    else {
                        expect($data).not.to.eq(currentValue[i - 6])
                    }
                })
        }
        else {
            if (i == 10) {
                cy.get('@url')
                    .find('textarea')
                    .then(($data) => {
                        expect($data.text()).not.to.eq(currentValue[i - 6])
                    })
            }
        }
    }
};
Cypress.PageAdminLms.chooseLMS = (_value) => {
    cy.get(`[aria-label="${_value}"]`)
        .parent()
        .parent()
        .prev()
        .find('input')
        .click({ force: true })
};