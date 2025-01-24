/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let staff = '', stu_1 = '', stu_11 = ''
const errorPagePrompt = [
    "Forbidden page",
    "You don't have permission to access this page. You can contact the administrator for assistance."
]
let examUrl = '/#/examapp/Question?examId=54e7f8be-a024-4186-809b-9b227c895664'

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)

    stu_1 = env[ct].Candidates[0]    //第1名candidate
    stu_11 = env[ct].Candidates[5]   //第6名candidate
    staff = env[ct].Invigilator1     //atstaff003@test.qa    
})

// Scenario: user只有一个candidate role
Given(/^candidate登录$/, () => {
    cy.LoginByLocal(stu_1.userid)
});
Then(/^验证没有Switch button$/, () => {
    Cypress.SwitchRole.clickRole()
    Cypress.SwitchRole.verifyNoSwitch()
});
And(/^student页面权限正确$/, () => {
    Cypress.SwitchRole.verifyCandidateAuthority()
});
Then(/^退出登录$/, () => {
    cy.logoutApi()
});

// Scenario: user只有一个staff role
Given(/^staff登录$/, () => {
    cy.LoginByLocal(staff.userid)
});
Then(/^验证没有Switch button$/, () => {
    Cypress.SwitchRole.clickRole()
    Cypress.SwitchRole.verifyNoSwitch()
});
And(/^staff页面权限正确$/, () => {
    Cypress.SwitchRole.verifyStaffAuthority()
});
Then(/^退出登录$/, () => {
});

// Scenario: user既有candidate也有staff role
Given(/^user登录,默认是staff role$/, () => {
    cy.LoginByLocal(stu_11.userid)
    Cypress.SwitchRole.verifyLoginRole('Staff')
});
Then(/^切换candidate role,candidate role对应的页面和权限正确$/, () => {
    Cypress.SwitchRole.clickRole()
    Cypress.SwitchRole.clickSwitchRole('candidate')
});
Then(/^candidate role对应的页面和权限正确$/, () => {
    Cypress.SwitchRole.verifyCandidateAuthority()
});
When(/^进入到staff有权限但candidate没权限的url:白名单的url$/, () => {
    cy.visit('/#/admin/WhiteList')
});
Then(/^页面显示Forbidden page$/, () => {
    Cypress.SwitchRole.verifyErrorPage(errorPagePrompt)
});
When(/^再切换回staff$/, () => {
    Cypress.SwitchRole.clickRole()
    Cypress.SwitchRole.clickSwitchRole('staff')
});
Then(/^staff role权限正确$/, () => {
    Cypress.SwitchRole.verifySwitchStaffAuthority()
});
When(/^进入candidate有权限但staff没权限的url:正在考试的url$/, () => {
    cy.visit(examUrl)
    cy.waitElement('.hide-scrollbar')
    cy.wait(3000)
});
Then(/^url显示“Error403”$/, () => {
    // Cypress.auiCommon.verifyUrl('include', '/error/403')
});
