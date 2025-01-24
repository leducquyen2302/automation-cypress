/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress";
const paperName = autoTest + " " + dateTime + " " + "Sample Paper";
const essay = autoTest + " " + dateTime + " " + "In a competitive market, what is the relationship between supply and demand?";
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const bankMsg = {
    paperCreate: 'The paper was created.',
    paperUpdate: 'The paper was updated.',
    paperDelete: 'The paper was deleted.'
}
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
before(() => {
    // cy.LoginExamAsAppAdmin(false);
    // cy.LoginExambyUserName(false,paperCrafter);
    cy.LoginExamAsSystem();
    cy.wait(2000);
    Cypress.PageAdminCommon.visitBank(20000)
});
// afterEach(() => {
//     cy.wait(500);
// });
// Create Sample Paper
Given('I am in Paper bank', () => {
    Cypress.PageBankPaper.visitPaperBank();
});
And('I click Sample exams tab', () => {
    Cypress.PageBankPaper.clickBankTabs(2);
});
And('I click Create paper button', () => {
    Cypress.PageBankPaper.clickSamplePaperCreate();
});
Given('I am in Create paper page', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/CreatePaper');
});
When('I enter Paper name', () => {
    Cypress.PageBankPaper.enterPaperName(paperName);
});
And('I select a course', () => {
    Cypress.PageBankQuestion.clickcourse(0);
    Cypress.PageBankQuestion.selectCourse(0);
});
And('I drag an Essay question to the specific area', () => {
    Cypress.PageBankQuestion.dragEssayQuestion();
});
And('I input Question content', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, essay);
});
And('I click on Complete button', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper', () => {
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);;
});

// Preview Paper
Given('I am in Paper bank page _Preview_', () => {
    Cypress.auiCommon.closeToast();
    Cypress.auiCommon.verifyUrl('contains', '/authoring/PaperBank');
});
When('I search for the paper created _Preview_', () => {
    Cypress.PageBankQuestion.search(paperName);
});
And('I check the checkbox of the paper _Preview_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _Preview_', () => {
    Cypress.PageBankPaper.editPaper();
});
And('I click on Preview button _Preview_', () => {
    Cypress.PageBankPaper.clickPaperPreview();
});
Then('I should be able to see the question contents _Preview_', () => {
    Cypress.PageBankQuestion.verifyPreviewEssayQues(0, essay);
});

// Delete Paper
Given('I am in Paper bank page _Delete_', () => {
    Cypress.PageBankPaper.clickBankBreadcrumb();
    Cypress.PageBankPaper.clickBankTabs(2);
});
When('I search for the paper created _Delete_', () => {
    Cypress.PageBankQuestion.search(paperName);
});
When('I check the checkbox of the paper _Delete_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Delete button _Delete_', () => {
    Cypress.PageBankPaper.deletePaper();
});
And('I click on OK button _Delete_', () => {
    Cypress.PageBankQuestion.delConfirm();
});
Then('I should be able to delete the paper _Delete_', () => {
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperDelete);
    Cypress.PageBankQuestion.verifyDelItem();
});