/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass } from '../../AUI/aui.common.constants'
import { processesClass } from '../../AUI/header.constants'

Cypress.PageProcesses = Cypress.PageProcesses || {};

Cypress.PageProcesses.clickProcesses = () => {
    cy.get(processesClass.downloadCenterIcon).find('span')
        .wait(1500)
        .click({ force: true }).wait(500)
}
Cypress.PageProcesses.clickDownloadBtn = (_index) => {
    cy.get(processesClass.downloadCenterItemBox).eq(_index)
        .find(processesClass.fiaDownload).click().wait(500)
}
Cypress.PageProcesses.clickDeleteItemBtn = (_index) => {
    cy.get(processesClass.downloadCenterItemBox).eq(_index)
        .find(processesClass.fiaCircleTimes).click().wait(500)
}
Cypress.PageProcesses.clickClearAllBtn = () => {
    cy.get(processesClass.clearAllBtn).click().wait(500)
}
Cypress.PageProcesses.confirmDel = (_bool) => {
    if (_bool) {
        cy.get(processesClass.confirmDelBtn).click().wait(500)
    }
    else {
        cy.get(processesClass.cancelDelBtn).click().wait(500)
    }

}
Cypress.PageProcesses.verifyActionMsg = (_index, _msg) => {
    for (var i = 0; i < _msg.length; i++) {
        cy.get(processesClass.downloadCenterItemBox).eq(_index)
            .find(processesClass.flexLeftCenter).should('contain', _msg[i])
    }
}
Cypress.PageProcesses.verifyTimeMsg = (_index, _timemsg) => {
    cy.get(processesClass.downloadCenterItemBox).eq(_index)
        .find(processesClass.flexBetweenCenter).should('contain', _timemsg)
}
Cypress.PageProcesses.verifyToast = (_content) => {
    cy.wait(500)
    cy.waitUntil(() => cy.get(auiCommonClass.auiToastInfo, { timeout: 20000 }))
    return cy.get(auiCommonClass.auiToastInfo)
        .should('contain', _content, { timeout: 60000 })
}