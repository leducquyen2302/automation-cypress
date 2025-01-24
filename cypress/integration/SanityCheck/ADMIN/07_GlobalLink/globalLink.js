/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let stu = ''

const avepoint = ['avepoint', 'https://www.avepoint.com/cn']
const usatoday = ['usatoday', 'http://www.usatoday.com', 'editusatoday']
const disange = ['disange', 'https://www.disange.com/']
const yanzheng = ['verify', 'https://www.verify.com/']
const disige = ['disige', 'https://www.disige.net/']

const confirmDelete = 'Are you sure you want to delete the 3 selected quick links?'

let toast = {
     'save': 'The quick link was saved.',
     'update': 'The quick link was updated.',
     'order': 'The order of quick links was changed.',
     'delete': 'The quick link was deleted.',
}
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu = env[ct].Candidates[0]
})

//  Scenario: Delete original data
Given(/^Exam admin登录$/, () => {
     cy.LoginExamAsSystem()
});
Then(/^I add a link$/, () => {
     Cypress.PageAdminQuickLink.enterQuickLink()
     Cypress.PageAdminQuickLink.addQuickLink()
     Cypress.PageAdminQuickLink.inputTitleAndUrl(avepoint[0], avepoint[1])
     Cypress.PageAdminQuickLink.saveQuickLink(0)
});

//  Scenario: Exam Admin add quick link
When(/^I verify left navigation display is right$/, () => {
     Cypress.PageAdminQuickLink.enterQuickLink()
     Cypress.PageAdminCommon.verifyNavigationLink(6)
});
Then(/^点击add quick link,title:avepoint、url:avepoint的url$/, () => {
     Cypress.PageAdminQuickLink.addQuickLink()
     Cypress.PageAdminQuickLink.inputTitleAndUrl(avepoint[0], avepoint[1])
});
When(/^点击save$/, () => {
     Cypress.PageAdminQuickLink.saveQuickLink(0)
});
Then(/^弹出提示语保存成功$/, () => {
     cy.wait(500)
     Cypress.auiCommon.verifyToast(toast.save)
});
When(/^再次添加一个http的link:title:usatoday,url:usatoday的url$/, () => {
     Cypress.PageAdminQuickLink.addQuickLink()
     Cypress.PageAdminQuickLink.inputTitleAndUrl(usatoday[0], usatoday[1])
});
And(/^点击save and add another$/, () => {
     Cypress.PageAdminQuickLink.saveAndAddAnother()
});
When(/^添加一个link: title:disange,url:disange的url$/, () => {
     cy.wait(1500)
     Cypress.PageAdminQuickLink.inputTitleAndUrl(disange[0], disange[1])
});
And(/^点击save and add another$/, () => {
     Cypress.PageAdminQuickLink.saveAndAddAnother()
     cy.wait(2500)
});
When(/^添加一个link: title:yanzheng,url:yanzheng的url$/, () => {
     Cypress.PageAdminQuickLink.inputTitleAndUrl(yanzheng[0], yanzheng[1])
});
Then(/^点击cancel$/, () => {
     Cypress.PageAdminQuickLink.cancel(0)
});
And(/^验证爱奇艺的url没有加上,只有三行link$/, () => {
     Cypress.PageAdminQuickLink.linkNumber(3)
});
When(/^点击面包屑的home,返回home页面$/, () => {
     Cypress.PageAdminQuickLink.backHome()
     cy.wait(1000)
});
Then(/^验证所有link的title正确,且顺序正确$/, () => {
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(0, avepoint[0])
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(1, usatoday[0])
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(2, disange[0])
});

// Scenario: Edit、change order、delete quick link
Given(/^进入到manage quick links页面$/, () => {
     cy.wait(2000)
     Cypress.PageAdminQuickLink.enterQuickLink()
});
Then(/^勾选第1个link 勾选框,点击edit$/, () => {
     Cypress.PageAdminQuickLink.checkRow(0)
     Cypress.PageAdminQuickLink.editLink()
});
Then(/^title更改为:disige,url更改为:disige的url$/, () => {
     cy.wait(1000)
     Cypress.PageAdminQuickLink.inputTitleAndUrl(disige[0], disige[1])
});
And(/^点击save,弹出提示语更新成功$/, () => {
     Cypress.PageAdminQuickLink.saveQuickLink(0)
     Cypress.auiCommon.verifyToast(toast.update)
});
When(/^全部勾选$/, () => {
     cy.wait(1500)
     Cypress.PageAdminQuickLink.checkAll()
});
Then(/^edit button置灰$/, () => {
     Cypress.PageAdminQuickLink.verifyDisabledEdit()
});
When(/^点击第2个link的右侧edit,滑出edit页面$/, () => {
     Cypress.PageAdminQuickLink.rightEditBtn()
});
Then(/^更改title:editusatoday,save$/, () => {
     Cypress.PageAdminQuickLink.inputTitleAndUrl(usatoday[2])
     Cypress.PageAdminQuickLink.saveQuickLink(0)
});
When(/^点击change order$/, () => {
     cy.wait(500)
     Cypress.PageAdminQuickLink.clickChangeOrder()
});
Then(/^验证change order页面每行的title正确$/, () => {
     cy.wait(1000)
     Cypress.PageAdminQuickLink.verifyChangeOrderTitle(0, disige[0])
     Cypress.PageAdminQuickLink.verifyChangeOrderTitle(1, usatoday[2])
     Cypress.PageAdminQuickLink.verifyChangeOrderTitle(2, disange[0])
     cy.wait(1000)
});
When(/^点击第1个title的order的下拉列表,验证有3个order可选$/, () => {
     Cypress.PageAdminQuickLink.changeOrder(0)
     Cypress.PageAdminQuickLink.verifyOrderLength(3)
});
Then(/^点击第1个order,验证第1个title没有发生变化$/, () => {
     Cypress.PageAdminQuickLink.changeOrder(0)
});
When(/^点击第1个title的order的下拉列表,选择第3个$/, () => {
     Cypress.PageAdminQuickLink.changeOrder(0, 2)
});
Then(/^验证change order页面所有title正确$/, () => {
     Cypress.PageAdminQuickLink.verifyChangeOrderTitle(0, disange[0])
     Cypress.PageAdminQuickLink.verifyChangeOrderTitle(1, usatoday[2])
     Cypress.PageAdminQuickLink.verifyChangeOrderTitle(2, disige[0])
});
And(/^save,右上角弹出提示语:order changed$/, () => {
     Cypress.PageAdminQuickLink.saveQuickLink(1)
     Cypress.auiCommon.verifyToast(toast.order)
});
When(/^再次点击change order$/, () => {
     Cypress.PageAdminQuickLink.clickChangeOrder()
});
Then(/^cancel,验证页面title、url、order正确$/, () => {
     Cypress.PageAdminQuickLink.cancel(1)
     Cypress.PageAdminQuickLink.verifyTitleAndUrl(0, disange[0])
     Cypress.PageAdminQuickLink.verifyTitleAndUrl(1, disange[1])
     Cypress.PageAdminQuickLink.verifyTitleAndUrl(2, usatoday[2])
     Cypress.PageAdminQuickLink.verifyTitleAndUrl(3, usatoday[1])
     Cypress.PageAdminQuickLink.verifyTitleAndUrl(4, disige[0])
     Cypress.PageAdminQuickLink.verifyTitleAndUrl(5, disige[1])
});
When(/^全部勾选$/, () => {
     Cypress.PageAdminQuickLink.checkAll()
});
Then(/^点击delete,验证confirm提示,cancel$/, () => {
     Cypress.PageAdminQuickLink.deleteLink()
     Cypress.auiCommon.verifyConfirmDialogContent(confirmDelete)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(0)
});
When(/^只选第2个link$/, () => {
     Cypress.PageAdminQuickLink.checkRow(0)
     Cypress.PageAdminQuickLink.checkRow(2)
});
Then(/^删除,右上角弹出提示语:deleted$/, () => {
     Cypress.PageAdminQuickLink.deleteLink()
     Cypress.PageAdminCourse.confirmDialog(1)
     Cypress.auiCommon.verifyToast(toast.delete)
});

// Scenario: Admin验证home页
When(/^点击面包屑的home,返回home页面$/, () => {
     Cypress.PageAdminQuickLink.backHome()
});
Then(/^I verify have manage quick link button$/, () => {
     Cypress.PageAdminQuickLink.verifyManageQuickLinkBtn()
});
And(/^验证所有link的title和order$/, () => {
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(0, disange[0])
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(1, disige[0])
});
When(/^I enter the View quick links page$/, () => {

});
Then(/^I verify the link info are right$/, () => {

});
Then(/^admin退出登录$/, () => {
     cy.logoutApi()
});

// Scenario: Student验证home页
Given(/^student登录$/, () => {
     cy.LoginByLocal(stu.userid)
});
Then(/^I verify have see all button$/, () => {
     Cypress.PageAdminQuickLink.verifySeeAllBtn()
});
Then(/^验证所有link的title和order$/, () => {
     cy.wait(3000)
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(0, disange[0])
     Cypress.PageAdminQuickLink.verifyHomeQuickLink(1, disige[0])
});
Given(/^student退出登录$/, () => {
     cy.logoutApi()
});

// Scenario: Admin登录删除所有link
Given(/^admin登录$/, () => {
     cy.LoginExamAsSystem()
});
Then(/^删除所有link$/, () => {
     cy.wait(1000)
     Cypress.PageAdminQuickLink.enterQuickLink()
     Cypress.PageAdminQuickLink.checkAll()
     Cypress.PageAdminQuickLink.deleteLink()
     Cypress.PageAdminCourse.confirmDialog(1)
});
And(/^I go back home and verify no quick link$/, () => {
     cy.visit('/')
     Cypress.PageAdminQuickLink.verifyNoQuickLink()
});