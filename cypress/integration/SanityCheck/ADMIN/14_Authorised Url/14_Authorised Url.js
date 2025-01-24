/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let authorisedUrl = {
    'name': 'baidu',
    'url': 'https://www.baidu.com/',
    'redirect': 'https://www.baidu.com/**',
    'editName': '1editbaidu'
}
const fileName = 'lms_logo.png'
let examObj = {
    name: 'AuthorisedUrlExam' + new Date(),
    courseCode: 'AT001',
}
const toast = {
    delete: 'The authorised URLs were deleted.'
}
let system = '', examId = ''

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    system = env[ct].System.display
})
// Scenario: I verify Authorised Url card
Given(/^I login as system admin and in admin page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I verify Authorised Url configuration position,instruction and enter$/, () => {
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Authorised URLs')
});

// Scenario: Add url
When(/^I click add url$/, () => {
    Cypress.PageAdminAuthorisedUrl.clickAddUrlBtn()
});
Then(/^I click Preview in Examena App$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
And(/^I verify validation message$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
});
When(/^I input info, upload photo$/, () => {
    Cypress.PageAdminAuthorisedUrl.inputUrlInfo(authorisedUrl.name, authorisedUrl.url, authorisedUrl.redirect)
    Cypress.PageBankPaper.uploadFile(fileName)
});
And(/^I verify the dialog infomation$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('This action requires the Examena app installed on your computer. To download the Examena app, click ')
    Cypress.auiCommon.verifyConfirmPopup('Note that the currently signed-in account of Examena app will be automatically signed out.')
});
Then(/^I close the dialog and save$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(0)
    Cypress.auiCommon.clickFooterBtnInPanel(2)
});
And(/^I verify url info is right in table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Name',
                value: authorisedUrl.name,
            },
            {
                index: 2,
                display: 'URL',
                value: authorisedUrl.url,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario: Verify can same name
When(/^I add same name url$/, () => {
    Cypress.PageAdminAuthorisedUrl.clickAddUrlBtn()
    Cypress.PageAdminAuthorisedUrl.inputUrlInfo(authorisedUrl.name, authorisedUrl.url, authorisedUrl.redirect)
    Cypress.auiCommon.clickFooterBtnInPanel(2)
});
Then(/^I add successfully$/, () => {

});

// Scenario: View details and edit url
When(/^I click url name to view details$/, () => {
    Cypress.PageAdminAuthorisedUrl.viewDetails(0)
});
Then(/^I verify view details info$/, () => {
    let title = ['URL', 'Authorised address to redirect']
    let value = [authorisedUrl.url, authorisedUrl.redirect]
    Cypress.PageAdminAuthorisedUrl.verifyViewDetailsInfo(authorisedUrl.name, title, value)
});
When(/^I click edit button in view details panel$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I edit name and save$/, () => {
    Cypress.PageAdminAuthorisedUrl.inputUrlInfo(authorisedUrl.editName)
    Cypress.auiCommon.clickFooterBtnInPanel(2)
    cy.wait(4000)
});
Then(/^I verify edit url info is right in table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Name',
                value: authorisedUrl.editName,
            },
            {
                index: 2,
                display: 'URL',
                value: authorisedUrl.url,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario: Exam add global url
When(/^I create exam$/, () => {
    Cypress.auiCommon.visitUrl('/#/exam/schedule/create?pageType=0')
});
Then(/^I add global url and search url name$/, () => {
    Cypress.PageExamCreate.allowSpecifiedUrl()
    Cypress.PageExamCreate.clickAddExistUrlBtn()
    Cypress.auiCommon.searchInPanel(authorisedUrl.name)
});
When(/^I click the global url name$/, () => {
    Cypress.PageExamCreate.clickExistUrlNameInPanel(0)
});
Then(/^I verify the global url info is right$/, () => {
    let title = ['URL', 'Authorised address to redirect']
    let value = [authorisedUrl.url, authorisedUrl.redirect]
    Cypress.PageAdminAuthorisedUrl.verifyViewDetailsInfo(authorisedUrl.name, title, value)
});
And(/^I close the panel by close button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
Then(/^I save the url and click save and next$/, () => {
    Cypress.auiCommon.closePanel()
    Cypress.PageAdminQuickLink.checkRow(0)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    Cypress.PageExamCreate.inputExamName(examObj.name)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
    Cypress.PageExamCreate.examStartTime(0, 22, 50)
    Cypress.PageExamCreate.saveNextForm()
    cy.wait(3000)
    cy.url().then($body => {
        examId = $body.split('examId=')[1].split('&page')[0]
    })
});

// Scenario: Delete url
Given(/^I choose all url in Authorised url$/, () => {
    Cypress.auiCommon.visitUrl('/#/admin/AuthorizeUrl')
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.ConductSettings.clickActionButton(2)
});
Then(/^I delete all$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast(toast.delete)
});

// Scenario: Verify exam url is not changed
Given(/^I enter exam just created$/, () => {
    Cypress.auiCommon.visitUrl(`/#/exam/schedule/create?examId=${examId}&pageType=0`)
    cy.waitLoading()
});
Then(/^I also can see the global url$/, () => {
    Cypress.PageExamCreate.verifyUrlName(authorisedUrl.name)
});