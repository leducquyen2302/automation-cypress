/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress by RZ]";
const paperName = autoTest + " " + dateTime + " " + "Demo Paper";
const choiceSingleAns = autoTest + " " + dateTime + " " + "When ancient Olympic games first held?";
var choiceSingleAnsAs1 = ["776", "780", "790", "800"]
var choiceSingleAnsAs2 = "BC";
var choiceSingleAnsAs = [
    choiceSingleAnsAs1[0] + " " + choiceSingleAnsAs2,
    choiceSingleAnsAs1[1] + " " + choiceSingleAnsAs2, 
    choiceSingleAnsAs1[2] + " " + choiceSingleAnsAs2, 
    choiceSingleAnsAs1[3] + " " + choiceSingleAnsAs2
    ];
const choiceMultiAns = autoTest + " " + dateTime + " " + "The lengths of two sides of a triangle are 5 and 7. Which of the following could be the perimeter of the triangle? Select all that apply.";
var choiceMultiAnsAs = ["14", "17", "19", "22", "24", "27"];
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

//Create Paper - Save as Draft
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
And('I click on Save as draft button', () => {
    Cypress.PageBankPaper.savePaperDraft();
});

// Create Paper - Choice Question with Single Answer
Given('I have created a paper and am in Paper bank page _Choice SA_', () => {
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);
    Cypress.auiCommon.verifyUrl('contains',  '/authoring/PaperBank');
});
When('I search for the Paper created _Choice SA_', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(paperName);
});
And('I check the checkbox of the paper _Choice SA_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _Choice SA_', () => {
    Cypress.PageBankPaper.editPaper();
});
And('I drag a Choice question to the specific area _Choice SA_', () => {
    Cypress.PageBankQuestion.dragChoiceQuestion();
});
And('I input Question content _Choice SA_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, choiceSingleAns);
});
And('I input Choice value _Choice SA_', () => {
    Cypress.PageBankQuestion.typeChoiceValue(0, choiceSingleAnsAs);
});
And('I set correct answer _Choice SA_', () => {
    Cypress.PageBankQuestion.enableCorrectAnswer(0, 0);
});
And('I click on Save as draft button _Choice SA_', () => {
    Cypress.PageBankPaper.savePaperDraft();
});
Then('I should be able to save the paper _Choice SA_', () => {
    Cypress.PageBankQuestion.verifyToast(bankMsg.paperUpdate);
});

// Create Paper - Choice Question with Multiple Answers
Given('I have created a paper and am in Paper bank page _Choice MA_', () => {
    Cypress.auiCommon.verifyUrl('contains',  '/authoring/PaperBank');
});
When('I search for the Paper created _Choice MA_', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(paperName);
});
And('I check the checkbox of the paper _Choice MA_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _Choice MA_', () => {
    Cypress.PageBankPaper.editPaper();
});
And('I drag a Choice question to the specific area _Choice MA_', () => {
    Cypress.PageBankQuestion.dragChoiceQuestion();
});
And('I enable Multiple answers _Choice MA_', () => {
    Cypress.PageBankQuestion.enableMultiAnswer(1);
});
And('I input Question content _Choice MA_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(1, choiceMultiAns);
});
And('I click on Add choice button _Choice MA_', () => {
    //Add two new choice
    Cypress.PageBankQuestion.quesAddChoice(1);
    Cypress.PageBankQuestion.quesAddChoice(1);
});
And('I input Choice value _Choice MA_', () => {
    Cypress.PageBankQuestion.typeChoiceValue(1, choiceMultiAnsAs);
});
And('I set correct answers _Choice MA_', () => {
    Cypress.PageBankQuestion.enableCorrectAnswer(1, 1);
    Cypress.PageBankQuestion.enableCorrectAnswer(1, 2);
    Cypress.PageBankQuestion.enableCorrectAnswer(1, 3);
});
And('I click on Save as draft button _Choice MA_', () => {
    Cypress.PageBankPaper.savePaperDraft();
});
Then('I should be able to save the paper _Choice MA_', () => {
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
    // Choice with Single Answer
    Cypress.PageBankPaper.verifyPreviewChoiceQues(0, choiceSingleAns, choiceSingleAnsAs);
    // Choice with Multiple Answers
    Cypress.PageBankPaper.verifyPreviewChoiceQues(1, choiceMultiAns, choiceMultiAnsAs);
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