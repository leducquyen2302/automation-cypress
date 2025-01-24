/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { examKeyCodeClass } from '../../AUI/exam.constants'

Cypress.PageExamKeyCode = Cypress.PageExamKeyCode || {};

Cypress.PageExamKeyCode.verifyCardName = (_num, _name) => {
    cy.get(examKeyCodeClass.keyCodeName)
        .eq(_num)
        .should('contain', _name)
}
Cypress.PageExamKeyCode.verifyCardMinutes = (_value) => {
    cy.get(examKeyCodeClass.keyCodeMinute)
        .should('contain', _value)
}