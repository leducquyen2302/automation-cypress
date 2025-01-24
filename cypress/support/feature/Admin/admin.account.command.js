/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiPopup, auiTableClass, auiFilterCommon, auiCalendar, auiComboboxClass, auiButtonClass, auiPanelClass } from '../../AUI/aui.common.constants';
import { adminAccountClass } from '../../AUI/admin.constants'

Cypress.PageAdminAccount = Cypress.PageAdminAccount || {};

Cypress.PageAdminAccount.search = (_key, _waiting) => {
    cy.get(adminAccountClass.show + auiCommonClass.input)
        .as('search')
    Cypress.auiCommon.searchBox('@search', _key)
        cy.waitLoading()
}
Cypress.PageAdminAccount.switchList = (_tabIndex) => {
    cy.get(adminAccountClass.tabBar)
        .find(adminAccountClass.tab)
        .eq(_tabIndex)
        .click({ force: true })
    cy.waitLoading()
}
Cypress.PageAdminAccount.editAccountProfile = (_num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(adminAccountClass.show)
        .find(auiTableClass.auiTbody)
        .find(auiTableClass.auiTRow)
        .find(adminAccountClass.editAccountBtn)
        .eq(num)
        .click({ force: true })
    cy.waitLoading()
}
Cypress.PageAdminAccount.inputProperty = (_value, _option, _clear) => {
    if (_clear) {
        const cancelNum = Cypress.$(adminAccountClass.closePropertyBtn).length
        cy.log(`======= >>> need cancel button ${cancelNum}`)
        for (let index = 0; index < cancelNum; index++) {
            cy.get(adminAccountClass.closePropertyBtn)
                .eq(0)
                .click()
        }
    }
    cy.get(auiPanelClass.auiPanelVisible + auiCommonClass.input)
        .type(_value, { delay: 25 })
        .wait(500)
    if (_option) {
        cy.get(auiCommonClass.auiOptionNew)
            .click({ force: true })
            .wait(1000)
    }
}
Cypress.PageAdminAccount.closeAccountProfile = () => {
    // cy.get(adminAccountClass.accountProfilePanel)
    cy.contains('Edit profile').parent().parent().parent()
        .find(auiButtonClass.auiBtnClose)
        .click({ force: true })
}
Cypress.PageAdminAccount.staffListFilter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Status':
                    fil_index = 0
                    break;
                case 'Property':
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
Cypress.PageAdminAccount.candidateListFilter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Status':
                    fil_index = 2
                    break;
                case 'Photo validation':
                    fil_index = 3
                    break;
                case 'Property':
                    fil_index = 4
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
Cypress.PageAdminAccount.clickPropertyNum = () => {
    cy.get(adminAccountClass.propertyNum)
        .click({ force: true })
};
Cypress.PageAdminAccount.deleteProperty = (_num) => {
    cy.get(adminAccountClass.closePropertyBtn)
        .eq(_num)
        .click({ force: true })
};


// // Verification Command 
Cypress.PageAdminAccount.verifyTable = (_info) => {
    //因为account页面有两个table，所以要看.aui-tabs-body.show的属性区分当前在哪个table操作
    cy.get(adminAccountClass.show)
        .find(auiTableClass.auiTable)
        .as('table')
    Cypress.auiCommon.verifyTable(_info, '@table')
}

Cypress.PageAdminAccount.verifyProfilePanel = (_content) => {
    // cy.get(adminAccountClass.accountProfilePanel)
    for (let i = 0; i < _content.columns.length; i++) {
        // cy.get('@panel')
        //     .find(adminAccountClass.profileRow)
        //     .eq(_content.columns[i].index)
        //     .as('row')
        cy.get(adminAccountClass.profileRow)
            .eq(_content.columns[i].index)
            .as('row')
        cy.get('@row')
            .find('.editProfile-col1')
            .invoke('attr', 'tabindex', i)
            .focus().wait(100)
            .should('contain', _content.columns[i].display)
        cy.get('@row')
            .find('.editProfile-col2')
            .invoke('attr', 'tabindex', i)
            .focus().wait(100)
            .should('contain', _content.columns[i].value)
    }
}
Cypress.PageAdminAccount.verifySameProperty = () => {
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiOptionNoMatch)
        .should('contain', 'No matches found.')
};
Cypress.PageAdminAccount.verifyAllProperty = (_num, _value) => {
    cy.get(adminAccountClass.propertyPopup)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageAdminAccount.verifyEchoProperty_InPanel = (_num, _value) => {
    cy.get(auiComboboxClass.auiComboItem)
        .eq(_num)
        .should('contain', _value)
};
