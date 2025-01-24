import { adminTable } from '../helper/css/admin.account.constants'
import { button, tab, comboBox, table, searchBox } from '../helper/css/common.constants'
// import { adminTable } from '../css/admin.account.constants'

//Scenario: View Account management page
Given(/^Login as service admin and go to Account Management$/, () => {
  cy.LoginExamAsSystem()
  Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
  cy.get('a[href*="/admin/AccountManagement"]').should('be.visible').click()
  //wait for staff table to appear
  cy.get('#staffDataTable_1').should('be.visible')
})
Then(/^I check the staff list and candidate list are correct$/, () => {
  Cypress.AdminAccountPage.checkTableTitle()
})
And(/^check the message on top is correct$/, () => {
  Cypress.AdminAccountPage.checkTopMessage()
})

// Scenario: Filter Photo validation
Given(/^I filter Photo validation$/, () => {
  Cypress.AdminAccountPage.filters("Photo Validation", 2)
  cy.waitLoading()
})
Then(/^I check the filter result in candidate list is correct Photo validation$/, () => {
  Cypress.AdminAccountPage.checkFilterResults('Photo Validation', 'Candidate')
  //clear filter
  Cypress.AdminAccountPage.clearFilter('Photo Validation')
})

// Scenario: Filter Status in candidate list
Given(/^I filter status in candidate list$/, () => {
  Cypress.AdminAccountPage.filters("Status Candidate", 2)
  cy.waitLoading()
})
Then(/^I check the filter result in candidate list is correct status$/, () => {
  Cypress.AdminAccountPage.checkFilterResults('Status', 'Candidate')
  //clear filter
  Cypress.AdminAccountPage.clearFilter('Status Candidate')
})

// Scenario: Filter Property in candidate list
Given(/^I filter property in candidate list$/, () => {
  Cypress.AdminAccountPage.filters('Property Candidate', 3)
  cy.waitLoading()
})
Then(/^I check the filter result in candidate list is correct property$/, () => {
  Cypress.AdminAccountPage.checkFilterResults('Property', 'Candidate')
  //clear filter
  Cypress.AdminAccountPage.clearFilter('Property Candidate')
})

// Scenario: Filter Status in staff list
Given(/^I filter status in staff list$/, () => {
  cy.get(tab.tab).eq(0).click()
  Cypress.AdminAccountPage.filters('Status Staff', 1)
  cy.waitLoading()
})
Then(/^I check the filter result in staff list is correct status$/, () => {
  Cypress.AdminAccountPage.checkFilterResults('Status', 'Staff')
  //clear filter
  Cypress.AdminAccountPage.clearFilter('Status Staff')
})

// Scenario: Filter Property in staff list
Given(/^I filter property in staff list$/, () => {
  Cypress.AdminAccountPage.filters('Property Staff', 2)
  cy.waitLoading()
})
Then(/^I check the filter result in staff list is correct property$/, () => {
  Cypress.AdminAccountPage.checkFilterResults('Property', 'Staff')
  //clear filter
  Cypress.AdminAccountPage.clearFilter('Property Staff')
})

// Scenario: Scenario: Search staff
And(/^I enter search key '(.*)' into search field$/, (searchKey) => {
  Cypress.AdminAccountPage.enterKeyAndSearch(searchKey)
})
Then('I check result is correct after search', () => {
  Cypress.AdminAccountPage.searchResults(['Staff name', 'Staff ID', 'User ID'])
})

// //Scenario: Edit staff profile, Add property
// Given(/^I click edit profile button$/, () => {
//   cy.get(adminTable.staffDataTable+' '+adminTable.actionButton).eq(0).click()
// })

// Then(/^I add property1$/, () =>{
//   Cypress.AdminAccountPage.addProperty('Property 1')
// })

// And(/^I verify can not add same name$/, () => {
//   Cypress.AdminAccountPage.addProperty('Property 1')
// })

// Then(/^I add property2 and save$/, () => {
//   Cypress.AdminAccountPage.addProperty('Property 2')
//   cy.get(button.save).click()
// })