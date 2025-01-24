/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/

import { auiCommonClass, auiComboboxClass, auiOptionList, auiPanelClass, auiDialogClass, auiShadowTag } from '../../AUI/aui.common.constants';
import { adminGlobalSettings } from '../../AUI/admin.constants'

Cypress.PageAdminGlobalSettings = Cypress.PageAdminGlobalSettings || {};

Cypress.PageAdminGlobalSettings.switchSetting = (_num) => {
    cy.get(adminGlobalSettings.tabBar)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(500)
};
Cypress.PageAdminGlobalSettings.verifyDataRention_Content = () => {
    cy.get(adminGlobalSettings.tabBar)
        .should('contain', 'Data retention')
    cy.get(adminGlobalSettings.dataRentionContent)
        .should('contain', 'Exam video retention')
        .and('contain', 'You can configure the retention period for exam proctoring videos and environment check videos in the built-in storage up to 30 days. With your own storage configured in MaivenPoint Online Services, you can configure the retention period as required.')
};
Cypress.PageAdminGlobalSettings.verifyRichTextSettings_Content = () => {
    cy.get(adminGlobalSettings.tabBar)
        .should('contain', 'Text settings')
    cy.get(adminGlobalSettings.richTextSettingsContent)
        .should('contain', 'Default font and size')
        .and('contain', 'You can configure the default font and font size for the text in questions and the comments added when marking or editing scores.')
        .and('contain', 'Font')
        .and('contain', 'Font size')
};
Cypress.PageAdminGlobalSettings.verifyDefaultFontAndSize = () => {
    for (let index = 0; index < 2; index++) {
        cy.get(auiComboboxClass.auiComboShell)
            .eq(index)
            .should('contain', 'Default')
    }
};
Cypress.PageAdminGlobalSettings.verifyDefaultDays = () => {
    cy.get(auiCommonClass.auiInputTarget)
        .should('have.attr', 'value', '30')
};
Cypress.PageAdminGlobalSettings.setDays = (_value) => {
    cy.get(auiCommonClass.auiInputTarget)
        .clear({ force: true })
        .type(_value, { force: true })
        .type('{enter}', { force: true })
    Cypress.PageAdminGlobalSettings.clickSave()
};
Cypress.PageAdminGlobalSettings.clickSave = () => {
    cy.get(adminGlobalSettings.tabPanelBtn + 'button')
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminGlobalSettings.setFontNameAndSize = (_value1, _value2) => {
    let value = [_value1, _value2]
    for (let index = 0; index < 2; index++) {
        cy.get(adminGlobalSettings.popupListBox)
            .eq(index)
            .click({ force: true })
        cy.get(auiCommonClass.auiSearchBoxInput)
            .eq(index)
            .clear({ force: true })
            .type(value[index], { delay: 25 })
        cy.get(auiOptionList.auiOptionListBoxContainer)
            .eq(index)
            .find(auiOptionList.auiOptionListItem)
            .click({ force: true })
    }
};

// User profile setting
Cypress.PageAdminGlobalSettings.verifyUserProfileSetting_Content = () => {
    cy.get(adminGlobalSettings.userSettingsTitle)
        .should('contain', 'User profile information display')
    cy.get(adminGlobalSettings.userSettingContent)
        .should('contain', 'You can choose to show user ID and/or mobile phone in the user profile.')
    cy.get(auiCommonClass.auiChoiceContent)
        .eq(0)
        .should('contain', 'User ID')
    cy.get(auiCommonClass.auiChoiceContent)
        .eq(1)
        .should('contain', 'Email address')
    cy.get(auiCommonClass.auiChoiceContent)
        .eq(2)
        .should('contain', 'Mobile phone')
};
Cypress.PageAdminGlobalSettings.verifyChecked = (_num, _value) => {
    cy.get(auiCommonClass.auiChoiceInput)
        .eq(_num)
        .should('have.attr', 'aria-checked', _value)
};
Cypress.PageAdminGlobalSettings.checkUserIdOrMobile = (_num) => {
    cy.get(auiCommonClass.auiChoiceInput)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminGlobalSettings.confirmCheckedUserId = () => {
    Cypress.auiCommon.visitUrl(`/#/admin/GlobalSettings`)
    Cypress.PageAdminGlobalSettings.switchSetting(1)
    cy.wait(1000)
    cy.get('body').then($body => {
        if ($body.find('[aria-label="User ID (email address)"] input[aria-checked="false"]').length > 0) {
            Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(0)
            Cypress.PageAdminGlobalSettings.clickSave()
        }
        if ($body.find('[aria-label="Email address"] input[aria-checked="false"]').length > 0) {
            Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(1)
            Cypress.PageAdminGlobalSettings.clickSave()
        }
        if ($body.find('[aria-label="Mobile phone"] input[aria-checked="false"]').length > 0) {
            Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(2)
            Cypress.PageAdminGlobalSettings.clickSave()
        }
    })
};
Cypress.PageAdminGlobalSettings.clickUserPhoto = (_num, _module) => {
    if (_module === 'panel') {
        cy.get(auiPanelClass.auiPanelVisible + auiShadowTag.auiProfile)
            .eq(_num)
            .click({ force: true })
    }
    else if (_module === 'dialog') {
        cy.get(auiDialogClass.auiDialogVisible + auiShadowTag.auiProfile)
            .eq(_num)
            .click({ force: true })
    }
    else {
        cy.get(auiShadowTag.auiProfile)
            .eq(_num)
            .click({ force: true })
    }
    cy.wait(500)
};
Cypress.PageAdminGlobalSettings.clickLoginUserPhoto = () => {
    cy.get(auiCommonClass.loginAvatar)
        .click({ force: true })
};
Cypress.PageAdminGlobalSettings.verifyHideUserId_InHeadPhoto = () => {
    cy.get(adminGlobalSettings.headPhotoProfilePopup + auiCommonClass.commonProfileInner)
        .should('have.length', 1)
};
Cypress.PageAdminGlobalSettings.verifyUserId_InRightUserName = (_value) => {
    cy.get(adminGlobalSettings.rightUserNameUserId)
        .should('contain', _value)
};