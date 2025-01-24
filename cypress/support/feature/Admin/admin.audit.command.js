/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiCalendar, auiComboboxClass, auiButtonClass } from '../../AUI/aui.common.constants';
import { adminAccountClass, adminCourseClass } from '../../AUI/admin.constants'

Cypress.PageAdminAudit = Cypress.PageAdminAudit || {};

Cypress.PageAdminAudit.pickFromDate = (_day, _hour, _minute) => {
    cy.get(auiCalendar.auiDatePicker).eq(0)
        .click({ force: true })
    cy.get('.aui-datepicker-single').eq(0).as('startPopupid')
    // 点击today
    cy.get('@startPopupid').find('.aui-datepicker-today')
        .click({ force: true })
    return Cypress.auiCommon.datePickerWithTime('@startPopupid', _day, _hour, _minute)

}
Cypress.PageAdminAudit.pickEndDate = (_day, _hour, _minute) => {
    cy.get(auiCalendar.auiDatePicker).eq(1)
        .click({ force: true })
    cy.get('.aui-datepicker-single').eq(1).as('endPopupid')
    return Cypress.auiCommon.datePickerWithTime('@endPopupid', _day, _hour, _minute)
}

Cypress.PageAdminAudit.pickUser = (_name) => {
    cy.get(adminCourseClass.courseFormAddressBookBtn).click({ force: true })
    cy.waitLoading()
    Cypress.PageAdminCourse.addressBook(_name)
}
Cypress.PageAdminAudit.clickSearch = () => {
    cy.get('.flex button ').eq(1).click()
}

// Verification Command 
Cypress.PageAdminAudit.verifyTable = (_info) => {
    cy.get(auiTableClass.auiTable)
        .as('table')
    Cypress.auiCommon.verifyTable(_info, '@table')
}
