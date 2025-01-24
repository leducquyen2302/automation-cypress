/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress by RZ]";
const paperName = autoTest + " " + dateTime + " " + "Demo Paper";
const essay = autoTest + " " + dateTime + " " + "In a competitive market, what is the relationship between supply and demand?";
const fib1 = autoTest + " " + dateTime + " " + "The number of moles of solute dissolved in 1 L solution is known as";
const fib2 = ".";
const fibAs = ["molarity", "concentration"];
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const bankMsg = {
    paperCreate: 'The paper was created.',
    paperUpdate: 'The paper was updated.',
    paperDelete: 'The paper was deleted.'
}
let current = Cypress.env('current_Env')
let ct = Cypress.env('current_ten')
let env = Cypress.env(current)
let paperCrafter = env[ct].paperCrafter[0].userid
before(() => {
    // cy.LoginExambyUserName(false,paperCrafter);
    cy.LoginExamAsSystem();
    cy.wait(2000);
    Cypress.PageAdminCommon.visitBank(20000)
    Cypress.PageBankPaper.createPaper();
});
afterEach(() => {
    cy.wait(500);
});
// after(() => {
//     cy.DeletePaperByAPI(paperName)
// })
// Create Paper - Essay Question
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
And('I drag an Essay question to the specific area _Essay_', () => {
    Cypress.PageBankQuestion.dragEssayQuestion();
});
And('I input Question content _Essay_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, essay);
});
And('I click on Complete button _Essay_', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper _Essay_', () => {
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);
});

// Create Paper - Fill-in-the-blank Question
Given('I have created a paper and am in Paper bank page _FIB_', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/PaperBank');
});
When('I search for the Paper created _FIB_', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(paperName);
});
And('I check the checkbox of the paper _FIB_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _FIB_', () => {
    Cypress.PageBankPaper.editPaper();
});
And('I drag a Fill-in-the-blank question to the specific area _FIB_', () => {
    Cypress.PageBankQuestion.dragFibQuestion();
});
And('I input Question content and add a blank _FIB_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(1, fib1);
    Cypress.PageBankQuestion.quesAddBlank(1);
    Cypress.PageBankQuestion.clickTypeRichTextEditor(1, fib2);
});
And('I input Correct answer _FIB_', () => {
    Cypress.PageBankQuestion.typeFibAnswer(1, fibAs[0] + '{enter}' + fibAs[1]);
});
And('I click on Complete button _FIB_', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper _FIB_', () => {
    Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperUpdate);
});

// Preview Paper
Given('I am in Paper bank page _Preview_', () => {
    Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
    Cypress.PageBankPaper.visitPaperBank();
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
Then('I should be able to see the question contents and all respective values _Preview_', () => {
    // Essay
    Cypress.PageBankQuestion.verifyPreviewEssayQues(0, essay);
    // Fill-in-the-blank
    Cypress.PageBankQuestion.verifyPreviewFibQues(2, fib1, fib2, fibAs[0]);
});

// Delete Paper
Given('I am in Paper bank page _Delete_', () => {
    Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
    Cypress.PageBankPaper.visitPaperBank();
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