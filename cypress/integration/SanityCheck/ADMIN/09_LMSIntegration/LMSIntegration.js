/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const title = ['Display name' + new Date().toLocaleString(), 'LMS platform', 'Issuer', 'JWK set URL', 'Access token URL', 'Authorisation URL', 'Client ID']
const editTitle = 'EditDisplay name' + new Date().toLocaleString()
const fixedValue = ['Login URL', 'Launch URL', 'Proctoring URL', 'Public key', 'Public JWK set URL']
const value = ['Display name', 'Others', 'Issuer', 'JWK set URL', 'Access token URL', 'Authorisation URL', 'Login URL', 'Launch URL', 'Proctoring URL', 'Client ID', 'Public key', 'Public JWK set URL']
const fileName = 'lms_logo.png'
var rowindex = ''
function index(_value) {
     cy.get(`[aria-label="${_value}"]`)
          .parent()
          .parent()
          .parent()
          .invoke('attr', 'data-row')
          .then(($data) => {
               rowindex = $data
          })
}

// Scenario: Verify LMS Integration required fields
Given(/^I login as application admin and in admin page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I verify LMS integration configuration position,instruction and enter$/, () => {
     Cypress.PageAdminCommon.clickCardbyName('Administration', 'LMS integration')
});
When(/^I register new platform$/, () => {
     Cypress.PageAdminLms.clickRegister()
});
Then(/^I click save$/, () => {
     Cypress.PageAdminLms.clickSave()
});
Then(/^I verify “Display name、Issuer、JWK set URL、Access Token URL、Authorisation URL” is required$/, () => {
     Cypress.PageAdminLms.verifyValidationMessage()
});

// Scenario: Copy url and verify url cannot edit
When(`I copy ${fixedValue[0]}`, () => {
     Cypress.PageAdminLms.copy(fixedValue[0])
});
Then(/^I can see copy success toast$/, () => {
     Cypress.PageAdminLms.verifyCopyUrlToast()
});
When(`I copy ${fixedValue[1]}`, () => {
     Cypress.PageAdminLms.copy(fixedValue[1])
});
When(`I copy ${fixedValue[2]}`, () => {
     Cypress.PageAdminLms.copy(fixedValue[2])
});
When(`I copy ${fixedValue[3]}`, () => {
     Cypress.PageAdminLms.copy(fixedValue[3])
});
Then(/^I can see public key copy success toast$/, () => {
     Cypress.PageAdminLms.verifyCopyPublicKeyToast()
});
When(`I copy ${fixedValue[4]}`, () => {
     Cypress.PageAdminLms.copy(fixedValue[4])
});
And(/^I verify Login URL, Launch URL, Proctoring URL, Public key, Public JWK set URL cannot edit$/, () => {
     const url = [fixedValue[0], fixedValue[1], fixedValue[2], fixedValue[4]]
     Cypress.PageAdminLms.verifyUrlDisabledEdit(url)
     Cypress.PageAdminLms.verifyKeyDisabledEdit(fixedValue[3])
});

// Scenario: Create LMS
Given(/^I input all info$/, () => {
     Cypress.PageAdminLms.inputInfo(title)
});
And(/^I upload logo image$/, () => {
     Cypress.PageBankPaper.uploadFile(fileName)
     cy.wait(1000)
});
Then(/^I save it$/, () => {
     Cypress.PageAdminApplication.clickSave()
});

// Scenario: Edit LMS
When(/^I edit just platform display name$/, () => {
     Cypress.PageAdminLms.chooseLMS(title[0])
     Cypress.PageAdminQuickLink.editLink()
     Cypress.PageAdminLms.editDisplayName(editTitle)
     Cypress.PageAdminApplication.clickSave()
});
Then(/^I obtain row index$/, () => {
     index(editTitle)
});
Then(/^I view tabel is right$/, () => {
     let info = {
          rowIndex: rowindex,
          columns: [
               {
                    index: 1,
                    display: 'Display name',
                    value: editTitle,
               },
               {
                    index: 2,
                    display: 'Issuer',
                    value: 'Issuer',
               }
          ]
     }
     Cypress.auiCommon.verifyTable(info)
});
And(/^I view details is right$/, () => {
     Cypress.PageAdminLms.verifyViewDetails(editTitle, value)
     Cypress.PageAdminLms.closeDetail(2)
});

// Scenario: Verify URL is different every time
When(/^I new register$/, () => {
     Cypress.PageAdminLms.clickRegister()
});
Then(/^I verify login url no changed and Launch URL,Public key,Public JWK set URL changed$/, () => {
     Cypress.PageAdminLms.verifyUrlValue()
});

// Scenario: Delete LMS
Then(/^I delete just platform$/, () => {
     Cypress.PageAdminLms.closeRegistration(1)
     Cypress.PageAdminLms.chooseLMS(editTitle)
     Cypress.PageAdminLms.deletePlatform()
});
