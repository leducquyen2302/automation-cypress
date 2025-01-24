/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress by RZ]";
const choiceMultiAns = autoTest + " " + dateTime + " " + "Which countries joined the EU in January 2007?";
var choiceMultiAnsAs = ["Bulgaria", "Poland", "Croatia", "Turkey", "Romania", "Albania"];
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const topic = "autotest"+ dateTime;
const bankMsg = {
    quesCreate: 'The question was created.',
    quesUpdate: 'The question was updated.',
    quesDelete: 'The question was deleted.'
}
const feedback = 'This feedback is for Common';
const feecbackType = ['Separate feedback for correct and wrong responses','Common feedback for all responses']
const quesTable = [
    {
        "tablename": "quesContent",
        "value": choiceMultiAns
    },
    {
        "tablename": "type",
        "value": "Choice - multiple answer"
    },
    {
        "tablename": "marks",
        "value": "1"
    },
    {
        "tablename": "topic",
        "value": ""
    },
    {
        "tablename": "difficulty",
        "value": "None"
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
    Cypress.PageBankQuestion.createQuestion();
});
afterEach(() => {
    cy.wait(500);
});
//Delete Question
// after(() => {
//     cy.DeleteQuesByAPI(choiceMultiAns)
// });

// Create Choice Question with Multiple Answers
Given('I am in Create question page', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/CreateQuestion');
});
When('I select a course', () => {
    Cypress.PageBankQuestion.clickcourse(0);
    Cypress.PageBankQuestion.selectCourse(0);
});
And('I drag a Choice question to the specific area', () => {
    Cypress.PageBankQuestion.dragChoiceQuestion();
});
And('I enable Multiple answers', () => {
    Cypress.PageBankQuestion.enableMultiAnswer(0);
});
And('I input Question content', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, choiceMultiAns);
});
And('I click on Add choice button', () => {
    //Add two new choice
    Cypress.PageBankQuestion.quesAddChoice(0);
    Cypress.PageBankQuestion.quesAddChoice(0);
});
And('I input Choice value', () => {
    Cypress.PageBankQuestion.typeChoiceValue(0, choiceMultiAnsAs);
});
And('I set correct answers', () => {
    Cypress.PageBankQuestion.enableCorrectAnswer(0,0);
    Cypress.PageBankQuestion.enableCorrectAnswer(0,4);
});
And('I click on Save button', () => {
    Cypress.PageBankQuestion.createQuestionSave();
});
Then('I should be able to save the question', () => {
    Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
    Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
});
When('I search for the question created', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(choiceMultiAns);
});
Then('I should be able to see the information in the table displayed correctly', () => {
    Cypress.PageBankQuestion.verifyQuesBankTable(quesTable);
});

// Preivew Choice Question with Multiple Answers
Given('I am in Question bank page _Preview_', () => {
     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
    Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Preview_', () => {
    Cypress.PageBankQuestion.search(choiceMultiAns);
});
And('I check the checkbox of the question _Preview_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _Preview_', () => {
    Cypress.PageBankQuestion.clickQuesEdit();
});
And('I click on Preview button _Preview_', () => {
    Cypress.PageBankQuestion.clickQuesPreview();
});
Then('I should be able to see the question content _Preview_', () => {
    Cypress.PageBankQuestion.verifyPreviewChoiceQues(0, choiceMultiAns, choiceMultiAnsAs);
});

//Edit Choice Question with Multiple Answers
Given('I am in Question bank page _Edit_', () => {
     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
    Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Edit_', () => {
    Cypress.PageBankQuestion.search(choiceMultiAns);
});
And('I check the checkbox of the question _Edit_', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button _Edit_', () => {
    Cypress.PageBankQuestion.clickQuesEdit();
});
And('I edit the settings of the question _Edit_', () => {
    Cypress.PageBankQuestion.clickQuesSettings();
    Cypress.PageBankQuestion.settingsTypeTopic(topic);
    Cypress.PageBankQuestion.settingsSetDiff(2);
    Cypress.PageBankQuestion.settingsTypeMarkingScheme(loremIpsum);
    Cypress.PageBankQuestion.settingsDisableRandom(3);
    Cypress.PageBankQuestion.selectTypeofFeedback(1);
    Cypress.PageBankQuestion.settingsTypeFeedback(0,feedback)
    Cypress.PageBankQuestion.clickSettingsSaveBtn()
});
And('I click on Save button _Edit_', () => {
    Cypress.PageBankQuestion.createQuestionSave();
});
Then('I should be able to save the question _Edit_', () => {
    Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
    Cypress.PageBankQuestion.verifyToast(bankMsg.quesUpdate);
});
When('I search for the question edited _Edit_', () => {
    Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(choiceMultiAns);
});
Then('I should be able to see the edited information in the table displayed correctly _Edit_', () => {
    Cypress.PageBankQuestion.verifyEditQues(topic, 'Proficient');
});
Then('I should be able to see the edited settings _Edit_', () => {
    Cypress.PageBankQuestion.clickQuesSettings();
    Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
    Cypress.PageBankSkeleton.verifyGenerateDiff("Proficient");
    Cypress.PageBankSkeleton.verifyGenerateRandom("No");
    Cypress.PageBankQuestion.verifyFeedback(feecbackType[1],feedback)
});
