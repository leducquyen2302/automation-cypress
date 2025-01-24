/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag, auiComboboxClass, auiTableClass, auiButtonClass, auiPanelClass, auiDialogClass, CommonMsg } from '../../AUI/aui.common.constants';
import { adminGlobalLinks, adminApplicationClass, adminCourseClass } from '../../AUI/admin.constants'
import { examClass, examAttendanceClass, sampleExamClass } from '../../AUI/exam.constants'

Cypress.PageAdminQuickLink = Cypress.PageAdminQuickLink || {};

Cypress.PageAdminQuickLink.enterQuickLink = () => {
     cy.visit('/#/GlobalLink')
          .waitLoading()
     cy.wait(2000)
};
Cypress.PageAdminQuickLink.verifyNoQuickLink = () => {
     cy.get(adminGlobalLinks.noItem)
          .eq(0).find('img').should('have.attr', 'src', '/resources/images/no-link.svg')
     cy.get(adminGlobalLinks.noItem)
          .eq(0).find('p').should('contain', 'No quick links')
};
Cypress.PageAdminQuickLink.addQuickLink = () => {
     cy.get(adminGlobalLinks.addQuickLink)
          .click({ force: true })
};
Cypress.PageAdminQuickLink.inputTitleAndUrl = (_title, _url) => {
     if (_url) {
          cy.get(adminApplicationClass.appInputInfo)
               .eq(1).clear().type(_url).wait(300)
     }
     // cy.get(adminApplicationClass.appInputInfo)
     //      .eq(0)
     //      .click({ force: true })
     //      .waitLoading()
     //      .wait(500)
     cy.get(adminApplicationClass.appInputInfo)
          .eq(0)
          .clear({ force: true })
          .type(_title, { delay: 15 })
          .wait(500)
};
Cypress.PageAdminQuickLink.verifyLogo = (_image) => {
     cy.get(adminGlobalLinks.logoImage)
          .children().should('have.attr', 'src', _image)
};
Cypress.PageAdminQuickLink.saveQuickLink = (_num) => {
     cy.get(auiButtonClass.saveBtn)
          .eq(_num).click({ force: true }).waitLoading().wait(3000)
};
Cypress.PageAdminQuickLink.saveAndAddAnother = () => {
     cy.get(adminGlobalLinks.saveAndAnother)
          .click({ force: true })
          .waitLoading()
          .wait(2000)
};
Cypress.PageAdminQuickLink.cancel = (_num) => {
     cy.get(auiButtonClass.cancelBtn)
          .eq(_num).click({ force: true })
};
Cypress.PageAdminQuickLink.linkNumber = (_number) => {
     cy.get('.aui-table-body [role="row"]')
          .should('have.length', _number)
};
Cypress.PageAdminQuickLink.backHome = () => {
     cy.get(adminGlobalLinks.homeIcon)
          .click({ force: true }).wait(1500)
};
Cypress.PageAdminQuickLink.verifyHomeQuickLink = (_num, _title) => {
     cy.get(adminGlobalLinks.linkTitle)
          .eq(_num).should('contain', _title)
};
Cypress.PageAdminQuickLink.checkRow = (_num) => {
     cy.get(adminGlobalLinks.rowInfoCheckbox)
          .eq(_num)
          .click({ force: true })
};
Cypress.PageAdminQuickLink.editLink = () => {
     cy.get(auiButtonClass.editBtn)
          .eq(0).click({ force: true })
};
Cypress.PageAdminQuickLink.checkAll = () => {
     cy.get(auiCommonClass.auiSelectAll)
          .click({ force: true })
          .wait(1000)
};
Cypress.PageAdminQuickLink.verifyDisabledEdit = () => {
     cy.get(auiButtonClass.editBtn)
          .eq(0)
          .should('have.attr', 'disabled')
};
Cypress.PageAdminQuickLink.rightEditBtn = () => {
     cy.get(examAttendanceClass.popupBtn)
          .eq(1).click({ force: true })
     cy.get(auiButtonClass.editBtn)
          .eq(2).click({ force: true })
};
Cypress.PageAdminQuickLink.clickChangeOrder = () => {
     cy.waitLoading()
     cy.get(adminGlobalLinks.changeOrderBtn)
          .click({ force: true }).wait(500)
};
Cypress.PageAdminQuickLink.verifyChangeOrderTitle = (_num, _title) => {
     cy.get(adminGlobalLinks.changeOrderTable + auiShadowTag.auiEllipsis)
          .eq(_num).should('contain', _title)
};
Cypress.PageAdminQuickLink.changeOrder = (_initialNum, _changeNum) => {
     cy.get(adminGlobalLinks.changeOrderTable + sampleExamClass.sampleModeAndtype)
          .eq(_initialNum).click({ force: true }).wait(500)
     if (_changeNum) {
          cy.get(auiCommonClass.auiOptionItem)
               .eq(_changeNum).click({ force: true })
     }
};
Cypress.PageAdminQuickLink.verifyOrderLength = (_length) => {
     cy.get('#aui_optionlist_listbox_0')
          .find('label').should('have.length', _length)
};
Cypress.PageAdminQuickLink.verifyTitleAndUrl = (_num, _content) => {
     cy.get(auiShadowTag.auiEllipsis)
          .eq(_num).should('contain', _content)
};
Cypress.PageAdminQuickLink.deleteLink = () => {
     cy.get(adminCourseClass.deleBtnIcon)
          .eq(0).click({ force: true }).wait(500)
};
Cypress.PageAdminQuickLink.confirmDelete = () => {
     cy.get(adminCourseClass.deleBtn)
          .click({ force: true }).wait(1000)
};
Cypress.PageAdminQuickLink.judgeExistData = () => {
     cy.waitLoading()
     cy.wait(20000)
     const quicklink_card = '.quicklink-card'
     const length = Cypress.$(quicklink_card).length
     cy.log(`================ >>> Exist link length ${length}`)
     if (length) {
          cy.log('================ >>> Have quick link')
          Cypress.PageAdminQuickLink.enterQuickLink()
          Cypress.PageAdminQuickLink.checkAll()
          Cypress.PageAdminQuickLink.deleteLink()
          Cypress.PageAdminCourse.confirmDialog(1)
     }
     else {
          cy.log('================ >>> No quick link')
          Cypress.PageAdminQuickLink.verifyNoQuickLink()
     }
};
Cypress.PageAdminQuickLink.verifyManageQuickLinkBtn = () => {
     cy.get(examClass.examHomeLandingUnitHeader)
          .eq(0)
          .find('button')
          .should('have.attr', 'aria-label', 'Manage quick links')
};
Cypress.PageAdminQuickLink.verifySeeAllBtn = () => {
     cy.get(examClass.examHomeLandingUnitHeader)
          .find('a')
          .should('have.class', 'links-seeall')
};