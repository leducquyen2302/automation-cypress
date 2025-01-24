/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const examName = 'AuSample' + new Date().toLocaleString()
let examInfo = {
     'closeName': 'Close' + examName,
     'openName': 'Open' + examName,
     'instruction': 'This is instruction',
     'editName': 'edit' + examName
}
let authorisedUrl = {
     'name': 'baidu',
     'url': 'https://www.baidu.com/',
     'redirect': 'https://image.baidu.com/',
     'editName': 'editbaidu'
}
const validationMessage = 'Enter a value to proceed.'
let paperInfo = {
     'name': 'AutoSamplePaper' + new Date().toLocaleString(),
     'essayquestion': 'This is an essay question',
     'fullmark': '99',
     'fullmarks': '100'
}
let toastInfo = {
     'updatePaper': 'The paper was updated.',
     'publishExam': 'The exam was published.',
     'unPublishExam': 'The exam was unpublished.',
     'deleteExam': 'The exam was deleted.',
     'createPaper': 'The paper was created.'
}
let confirmInfo = {
     'removePaper': 'Are you sure you want to remove this paper?',
     'publishExam': 'view and take the sample exam at any time with unlimited attempts to get familiar with the system.',
     'unpublishExam': 'no longer view this sample exam. To allow candidates to take this sample exam, you must republish it again.',
     'deleteExam': 'Are you sure you want to delete the exam ' + examInfo.editName + '?'
}


//  Scenario: Create close sample exam
Given(/^I login as system enter exam page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(8000)
});
Then(/^进入sample exam页面$/, () => {
     Cypress.PageSampleExamCreate.enterSampleExam()
});
Then(/^点击create sample exam创建sample exam$/, () => {
     Cypress.PageSampleExamCreate.createSampleExam()
     cy.wait(1000)
});
When(/^点击exam mode$/, () => {
     Cypress.PageSampleExamCreate.clickExamMode()
});
Then(/^验证offline exam不可选$/, () => {
     Cypress.PageSampleExamCreate.verifyOfflineDisabled()
});
And(/^点击Enable Facial recognition来关闭face verification$/, () => {
     Cypress.PageSampleExamCreate.chooseFaceVerification()
});
When(/^Authorised URL中Allow to access specified URLs并Add authorised URL$/, () => {
     Cypress.PageSampleExamCreate.addAuthorisedURL()
});
Then(/^输入name、URL、Authorised address to redirect,然后add$/, () => {
     Cypress.PageSampleExamCreate.inputAuthorisedURLInfo(authorisedUrl.name, authorisedUrl.url, authorisedUrl.redirect)
});
When(/^点击刚才创建的url的edit重新编辑name$/, () => {
     Cypress.PageSampleExamCreate.editAuthorisedURLInfo(authorisedUrl.editName)
});
Then(/^save后验证name更新正确$/, () => {
     Cypress.PageSampleExamCreate.verifyEditUrlName(authorisedUrl.editName)
});
Then(/^Allow to access specified applications and add windows, mac$/, () => {
     Cypress.PageSampleExamCreate.addAuthorisedApplication()
     Cypress.PageAdminCourse.clickTabBar(1)
     Cypress.PageSampleExamCreate.addAuthorisedApplication()
});
When(/^点击save and close$/, () => {
     Cypress.PageSampleExamCreate.clickSampleButton(1)
});
Then(/^exam name弹出提示语,为必填项$/, () => {
     Cypress.PageSampleExamCreate.verifyValidationMessage(validationMessage)
});
And(/^输入name、instruction,点击save and close$/, () => {
     Cypress.PageSampleExamCreate.inputNameAndInstruction(examInfo.closeName, examInfo.instruction)
     Cypress.PageSampleExamCreate.clickSampleButton(1)
     cy.wait(2500)
});
When(/^search刚才save的exam$/, () => {
     Cypress.PageSampleExamCreate.searchSampleExam(examInfo.closeName)
});
Then(/^card上面信息显示正确:closed-book,Disabled,unplished$/, () => {
     Cypress.PageSampleExamCreate.verifyCardInfo()
});
When(/^点击edit exam$/, () => {
     Cypress.PageSampleExamCreate.editSampleExam()
});
Then(/^验证在step2页面,且step2名字正确$/, () => {
     Cypress.PageSampleExamCreate.verifySampleStep2()
});
When(/^点击Back,返回上一步$/, () => {
     Cypress.PageSampleExamCreate.clickSampleButton(1)
});
Then(/^修改name,再点击save and next$/, () => {
     Cypress.PageSampleExamCreate.inputNameAndInstruction(examInfo.editName)
     Cypress.PageSampleExamCreate.clickSampleButton(2)
     cy.wait(2500)
});
When(/^点击Create paper directly$/, () => {
     cy.wait(1000)
     Cypress.PageSampleExamCreate.createPaper()
     cy.wait(1000)
});
Then(/^添加essay question,且输入papername$/, () => {
     Cypress.PageSampleExamCreate.inputPaperInfo(paperInfo.name, paperInfo.essayquestion)
});
When(/^点击Complete$/, () => {
     Cypress.PageSampleExamCreate.completePaper()
});
Then(/^此时回到step2,右上角tip:paper created提示正确$/, () => {
     Cypress.PageSampleExamCreate.verifyToastInfo(toastInfo.createPaper)
});
And(/^点击remove移除paper$/, () => {
     cy.wait(2500)
     Cypress.PageSampleExamCreate.clickRemovePaper()
});
Then(/^弹出confirm提示,验证提示内容,点击cancel,页面数据没有更新$/, () => {
     Cypress.auiCommon.verifyConfirmPopup(confirmInfo.removePaper)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(0)
     Cypress.PageSampleExamCreate.verifyPaperName(paperInfo.name)
});
When(/^再次点击remove,移除paper$/, () => {
     Cypress.PageSampleExamCreate.clickRemovePaper()
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^点击Add paper from bank,add刚才创建的paper$/, () => {
     cy.wait(2000)
     Cypress.PageSampleExamCreate.addPaperFromBank(paperInfo.name)
});
When(/^点击Edit,修改fullmarks$/, () => {
     Cypress.PageSampleExamCreate.editPaper()
     Cypress.PageSampleExamCreate.modifyFullMark(0, paperInfo.fullmark)
});
Then(/^点击complete$/, () => {
     Cypress.PageSampleExamCreate.completePaper()
});
Then(/^回到step2,右上角tip:paper updated提示正确$/, () => {
     Cypress.PageSampleExamCreate.verifyToastInfo(toastInfo.updatePaper)
});
And(/^验证fullmarks修改正确$/, () => {
     Cypress.PageSampleExamCreate.verifyFullMark(paperInfo.fullmarks)
});
When(/^点击save and close返回sample exam页面$/, () => {
     Cypress.PageSampleExamCreate.clickSampleButton(3)
});
Then(/^filter:close-book、disabled$/, () => {
     Cypress.PageSampleExamCreate.filterExam()
     Cypress.PageSampleExamCreate.searchSampleExam(examInfo.editName)
});
Then(/^显示card,验证close-book、unpublished$/, () => {
     Cypress.PageSampleExamCreate.verifyCardInfo()
});
When(/^点击publish,弹出confirm提示正确,确认publish$/, () => {
     Cypress.PageSampleExamCreate.clickPublishExam(confirmInfo.publishExam)
});
Then(/^右上角tip:published提示正确$/, () => {
     Cypress.PageSampleExamCreate.verifyToastInfo(toastInfo.publishExam)
});

// Scenario: Delete close sample exam
Given(/^点击unpublish,弹出confirm提示,且提示内容正确$/, () => {
     cy.wait(1000)
     Cypress.PageSampleExamCreate.clickUnpublish(confirmInfo.unpublishExam)
     cy.wait(1500)
});
Then(/^确认unpublish,右上角tip:unpublished提示正确$/, () => {
     Cypress.PageSampleExamCreate.verifyToastInfo(toastInfo.unPublishExam)
     cy.wait(500)
});
Then(/^card显示unpublished$/, () => {
     Cypress.PageSampleExamCreate.verifyCardInfo()
});
When(/^在exam card点击倒三角,点击delete button$/, () => {
     Cypress.PageSampleExamCreate.clickDelete()
});
Then(/^弹出confirm提示,且内容正确,点击delete$/, () => {
     cy.log(confirmInfo.deleteExam)
     Cypress.PageSampleExamCreate.confirmDelete(confirmInfo.deleteExam)
});
And(/^右上角tip:exam deleted提示正确$/, () => {
     cy.wait(500)
     Cypress.PageSampleExamCreate.verifyToastInfo(toastInfo.deleteExam)
});

// Scenario: Create open sample exam
Given(/^点击create sample exam$/, () => {
     Cypress.PageSampleExamCreate.createSampleExam()
});
When(/^点击type选择为open-book$/, () => {
     Cypress.PageExamCreate.chooseExamType(1)
});
Then(/^只显示face verification,且置灰不可点$/, () => {
     Cypress.PageSampleExamCreate.verifyForbidFace()
     cy.wait(500)
});
Then(/^输入exam name、Instruction$/, () => {
     Cypress.PageSampleExamCreate.inputNameAndInstruction(examInfo.openName, examInfo.instruction)
});
When(/^save and next$/, () => {
     Cypress.PageSampleExamCreate.clickSampleButton(2)
     cy.wait(4000)
});
Then(/^add 已删除的close book sample exam的paper$/, () => {
     Cypress.PageSampleExamCreate.addPaperFromBank(paperInfo.name)
});
Then(/^publish exam,publish confirm正确,右上角提示publish成功$/, () => {
     Cypress.PageSampleExamCreate.clickSampleButton(4)
     Cypress.PageSampleExamCreate.CreatePublishExam(confirmInfo.publishExam)
     Cypress.PageSampleExamCreate.verifyToastInfo(toastInfo.publishExam)
});
And(/^为下一条take sample exam 存储examid和exam name$/, () => {
     Cypress.PageSampleExamCreate.searchSampleExam(examInfo.openName)
     cy.get('.exam-card-title').click({ force: true })
     cy.wait(500)
     cy.url().then(url => {
          const examId = url.split('=')[1].split('&')[0]
          let sampleOpenExamInfo = {
               'examName': examInfo.openName,
               'examId': examId,
               'examInstruction': examInfo.instruction
          }
          cy.writeFile("cypress/fixtures/sampleOpenExamInfo.json", sampleOpenExamInfo)
     })
});

// Scenario: Create close sample exam for new tenant
Given(/^I click cancel$/, () => {
     Cypress.PageSampleExamCreate.clickSampleButton(0)
});
Then(/^I input exam name$/, () => {
     Cypress.PageSampleExamCreate.inputNameAndInstruction(examInfo.closeName)
});
Then(/^I input exam name$/, () => {
     Cypress.PageSampleExamCreate.inputNameAndInstruction(examInfo.closeName)
});
Then(/^I add essay question and paper name$/, () => {
     Cypress.PageSampleExamCreate.inputPaperInfo('Edit' + paperInfo.name, paperInfo.essayquestion)
});