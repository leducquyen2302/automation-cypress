import { leftNav } from '../css/common.constants'

Cypress.CommonPage = Cypress.CommonPage || {}


Cypress.CommonPage.clickLeftNavigation = (name) => {
    let navSelect = ''
    switch (name) {
        case 'Home':
            navSelect = leftNav.Home
            break
        case 'Exam':
            navSelect = leftNav.Exam
            break
        case 'Bank':
            navSelect = leftNav.Bank
            break
        case 'Report':
            navSelect = leftNav.Reports
            break
        case 'Admin':
            navSelect = leftNav.Admin
            break
        case 'Calendar':
            navSelect = leftNav.Calendar
            break
        default:
            navSelect = leftNav.Home
            throw new Error(`Invalid navigation menu: ${name}`)
    }
    cy.get(navSelect).should('be.visible').click()
    cy.waitLoading()
}