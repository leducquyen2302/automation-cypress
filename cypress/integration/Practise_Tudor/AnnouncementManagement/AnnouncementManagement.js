let date = new Date().toLocaleString()

//Scenario: View Announcement management page
Given(/^Login as service admin and go to Announcement Management$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    cy.get('a[href*="/admin/Announcement"]').should('be.visible').click()
})
Then(/^I edit announcement$/, () => {
    Cypress.AdminAnnouncementPage.editAnnouncement('tutu_'+date)
})