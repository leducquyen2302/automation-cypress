/*�2021-20243, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress]";
const paperName = autoTest + " " + dateTime + " " + "TF Match Paper";
const truefalse = autoTest + " " + dateTime + " " + "There is an Internet-based company that provides online support services for businesses that need help in setting up and maintaining their websites.";
const match = autoTest + " " + dateTime + " " + "Match all of the examples or types of simple carbohydrates";
const options = ["Mesopotamian", "Egyptain", "Harappan", "Chinese", "Galactose", "Fructose"]

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
    // cy.LoginExamAsAppAdmin(false);
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
// Create Paper - True or False Question
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
And('I drag an True or False question to the specific area _TrueFalse_', () => {
    Cypress.PageBankQuestion.dragTFQuestion();
});
And('I input Question content _TrueFalse_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, truefalse);
});
And('I click on Complete button _TrueFalse_', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper _TrueFalse_', () => {
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);
});

// Edit Paper - Matching Question
Given('I have created a paper and am in Paper bank page _Matching_', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/PaperBank');
});
When('I search for the Paper created _Matching_', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(paperName);
});
And('I check the checkbox of the paper _Matching_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _Matching_', () => {
    Cypress.PageBankPaper.editPaper();
});
And('I drag a Matching question to the specific area _Matching_', () => {
    Cypress.PageBankQuestion.dragMatchQuestion();
});
And('I input Question content _Matching_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(1, match);
});
And('I input options _Matching_', () => {
    Cypress.PageBankQuestion.typeMatchOption(0, options);
});
And('I click on Complete button _Matching_', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper _Matching_', () => {
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
    // True or False
    Cypress.PageBankQuestion.verifyPreviewEssayQues(1, truefalse);
    // Matching
    Cypress.PageBankQuestion.verifyPreviewMatchQues(2, match, options);
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