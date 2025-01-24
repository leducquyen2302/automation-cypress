/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass } from '../../AUI/aui.common.constants';
import { adminSwitchRoleClass, adminRoleClass } from '../../AUI/admin.constants';

Cypress.SwitchRole = Cypress.SwitchRole || {};
const stu_LeftNavi = {
    Home: {
        url: '/#/'
    },
    Exam: {
        url: '/#/exam'
    },
    Calendar: {
        url: '/#/Calendar'
    }
}

const staff_LeftNavi = {
    Home: {
        url: '/#/'
    },
    Exam: {
        url: '/#/exam'
    },
    Reports: {
        url: '/#/report'
    },
    Calendar: {
        url: '/#/Calendar'
    }
}

const switch_staff_LeftNavi = {
    Home: {
        url: '/#/'
    },
    Exam: {
        url: '/#/exam'
    },
    Bank: {
        url: '/#/authoring'
    },
    Reports: {
        url: '/#/report'
    },
    Admin: {
        url: '/#/admin'
    },
    Calendar: {
        url: '/#/Calendar'
    }
}

Cypress.SwitchRole.clickRole = () => {
    cy.get('.layout-userphoto')
        .click({ force: true })
};
Cypress.SwitchRole.verifyNoSwitch = () => {
    cy.get(adminSwitchRoleClass.usermenuPanel)
        .children().should('have.length', 2)
};
Cypress.SwitchRole.verifySwitchCandiate = () => {
    cy.get(adminSwitchRoleClass.usermenuPanel)
        .children().should('have.length', 3)
};
Cypress.SwitchRole.verifyLoginRole = (_value) => {
    cy.get(adminSwitchRoleClass.userLoginRole)
        .should('contain', _value)
};
Cypress.SwitchRole.clickSwitchRole = (_value) => {
    if (_value == 'staff') {
        cy.get(adminSwitchRoleClass.switchStaffTitle)
            .click({ force: true })
    }
    if (_value == 'candidate') {
        cy.get(adminSwitchRoleClass.switchCandiateTitle)
            .click({ force: true })
    }
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    cy.waitLoading()
    cy.wait(1000)
};
Cypress.SwitchRole.verifyCandidateAuthority = () => {
    let leftNaArr = Object.keys(stu_LeftNavi)
    cy.log(leftNaArr)
    for (let i = 0; i < 3; i++) {
        cy.wait(500)
        cy.get(auiCommonClass.auiNaviItem).eq(i)
            .find('a')
            .should('have.attr', 'href')
            .and('contain', stu_LeftNavi[leftNaArr[i]].url)
    }
};
Cypress.SwitchRole.verifyStaffAuthority = () => {
    let leftNaArr = Object.keys(staff_LeftNavi)
    cy.log(leftNaArr)
    for (let i = 0; i < 4; i++) {
        cy.wait(500)
        cy.get(auiCommonClass.auiNaviItem).eq(i)
            .find('a')
            .should('have.attr', 'href')
            .and('contain', staff_LeftNavi[leftNaArr[i]].url)
    }
};
Cypress.SwitchRole.verifySwitchStaffAuthority = () => {
    let leftNaArr = Object.keys(switch_staff_LeftNavi)
    cy.log(leftNaArr)
    for (let i = 0; i < 6; i++) {
        cy.wait(500)
        cy.get(auiCommonClass.auiNaviItem).eq(i)
            .find('a')
            .should('have.attr', 'href')
            .and('contain', switch_staff_LeftNavi[leftNaArr[i]].url)
    }
};
Cypress.SwitchRole.verifyErrorPage = (_value) => {
    cy.get(adminSwitchRoleClass.errorTitle)
        .should('contain', _value[0])
    cy.get(adminSwitchRoleClass.errorContent)
        .should('contain', _value[1])
};