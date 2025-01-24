/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
var fileName = 'Import Questions Template.docx';
const autoTest = "[Auto Test with Cypress]";
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const subQues = "Please answer the following sub-questions.";
const bankMsg = {
    quesImport: 'Questions import succeeded.',
    quesUpdate: 'The question was updated.',
    quesDelete: 'The questions were deleted.'
}
const quesTableSub = [
    {
        "tablename": "quesContent",
        "value": subQues
    },
    {
        "tablename": "type",
        "value": "Sub-question"
    },
    {
        "tablename": "marks",
        "value": "11.5"
    },
    {
        "tablename": "topic",
        "value": ""
    },
    {
        "tablename": "difficulty",
        "value": "Advanced"
    }
]
let current = Cypress.env('current_Env')
let ct = Cypress.env('current_ten')
let env = Cypress.env(current)
let paperCrafter = env[ct].paperCrafter[0].userid
before(() => {
    // cy.LoginExambyUserName(false,paperCrafter);
    cy.LoginExamAsSystem();
    cy.wait(2000);
    Cypress.PageAdminCommon.visitBank(20000)
    Cypress.PageBankQuestion.visitQuesBank();

});
afterEach(() => {
    cy.wait(500);
});
Given('I am in question bank', () => {
    Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
});
And('I click import questions from word', () => {
    Cypress.PageBankPaper.clickImportWord();
});
Then('I should see the popup', () => {
    Cypress.PageBankQuestion.verifyDialogTitle("Import questions from Word");
});

Given('I upload a word file', () => {
    Cypress.PageBankPaper.uploadFile(fileName)
});
And('I select a course', () => {
    Cypress.PageBankQuestion.clickcourseInDialog(0);
    Cypress.PageBankQuestion.selectCourseInDialog(0);
});
And('I click Import button', () => {
    Cypress.PageBankQuestion.importConfirm();
});
Then('I should see the created questions', () => {
    cy.waitLoading();
    Cypress.PageBankQuestion.verifyToast(bankMsg.quesImport);
    Cypress.PageBankQuestion.verifyQuesBankTable(quesTableSub);
});

Given('I search a question imported', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(subQues);
});

When('I check word question item', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click Edit question button', () => {
    Cypress.PageBankQuestion.clickQuesEdit();
});
Then('I should see edit question page', () => {
    Cypress.auiCommon.verifyBreadcrumb('Edit question');
});
When('I type question marking scheme', () => {
    Cypress.PageBankQuestion.clickSubQuesSettingsIndex('a');
    Cypress.PageBankQuestion.settingsTypeMarkingScheme(loremIpsum);
    Cypress.PageBankQuestion.clickSettingsSaveBtn()
});
And('I click save button', () => {
    Cypress.PageBankQuestion.createQuestionSave();
});
Then('I should save the word question', () => {
    Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
    Cypress.PageBankQuestion.verifyToast(bankMsg.quesUpdate);;
});

Given('In edit word questions page', () => {
    Cypress.PageBankQuestion.checkItem(1);
    Cypress.PageBankQuestion.clickQuesEdit();
});
When('I click preview', () => {
    Cypress.PageBankQuestion.clickQuesPreview();
});
Then('I should see questions and marking scheme', () => {
    Cypress.PageBankQuestion.verifyPreviewQuesContent(0, subQues);
    Cypress.PageBankPaper.verifyMarkingScheme(0, loremIpsum)
});