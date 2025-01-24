/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress by RZ]";
const choiceSingleAns = autoTest + " " + dateTime + " " + "Rivers Tigris and Euphrates are associated with?";
var choiceSingleAnsAs1 = ["Mesopotamian", "Egyptain", "Harappan", "Chinese"]
var choiceSingleAnsAs2 = "Civilization";
var choiceSingleAnsAs = [
      choiceSingleAnsAs1[0] + " " + choiceSingleAnsAs2,
      choiceSingleAnsAs1[1] + " " + choiceSingleAnsAs2,
      choiceSingleAnsAs1[2] + " " + choiceSingleAnsAs2,
      choiceSingleAnsAs1[3] + " " + choiceSingleAnsAs2
];
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const topic = "autotest" + dateTime;
const bankMsg = {
      quesCreate: 'The question was created.',
      quesUpdate: 'The question was updated.',
      quesDelete: 'The question was deleted.'
}
const feedback = {
      correct: 'This answer is correct' + dateTime,
      wrong: 'This answer is wrong' + dateTime
};
const feecbackType = ['Separate feedback for correct and wrong responses', 'Common feedback for all responses']
const quesTable = [
      {
            "tablename": "quesContent",
            "value": choiceSingleAns
      },
      {
            "tablename": "type",
            "value": "Choice - single answer"
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

afterEach(() => {
      cy.wait(500);
});

// Create Choice Question with Single Choice
Given('I am in Create question page', () => {
      cy.LoginByLocal(paperCrafter);
      cy.wait(2000);
      Cypress.PageAdminCommon.visitBank(20000)
      Cypress.PageBankQuestion.createQuestion();
      Cypress.auiCommon.verifyUrl('contains', '/authoring/CreateQuestion');
});
When('I select a course', () => {
      Cypress.PageBankQuestion.clickcourse(0);
      Cypress.PageBankQuestion.selectCourse(0);
});
And('I drag a Choice question to the specific area', () => {
      Cypress.PageBankQuestion.dragChoiceQuestion();
});
And('I input Question content', () => {
      Cypress.PageBankQuestion.clickTypeRichTextEditor(0, choiceSingleAns);
});
And('I input Choice value', () => {
      Cypress.PageBankQuestion.typeChoiceValue(0, choiceSingleAnsAs);
});
And('I set correct answer', () => {
      Cypress.PageBankQuestion.enableCorrectAnswer(0, 0);
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
      Cypress.PageBankQuestion.search(choiceSingleAns);
});
Then('I should be able to see the information in the table displayed correctly', () => {
      Cypress.PageBankQuestion.verifyQuesBankTable(quesTable);
});

// Preview Choice Question with Single Choice
Given('I am in Question bank page _Preview_', () => {
      Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
      Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Preview_', () => {
      Cypress.PageBankQuestion.search(choiceSingleAns);
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
Then('I should be able to see the question content and choice value _Preview_', () => {
      Cypress.PageBankQuestion.verifyPreviewChoiceQues(0, choiceSingleAns, choiceSingleAnsAs);
});

// Edit Choice Question with Single Choice
Given('I am in Question bank page _Edit_', () => {
      Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
      Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Edit_', () => {
      Cypress.PageBankQuestion.search(choiceSingleAns);
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
      Cypress.PageBankQuestion.settingsDisableRandom(2);
      Cypress.PageBankQuestion.selectTypeofFeedback(0);
      Cypress.PageBankQuestion.settingsTypeFeedback(0, feedback.correct)
      Cypress.PageBankQuestion.settingsTypeFeedback(1, feedback.wrong)
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
      Cypress.PageBankQuestion.search(choiceSingleAns);
});
Then('I should be able to see the edited information in the table displayed correctly _Edit_', () => {
      Cypress.PageBankQuestion.verifyEditQues(topic, 'Proficient');
});
Then('I should be able to see the edited settings _Edit_', () => {
      Cypress.PageBankQuestion.clickQuesSettings();
      Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
      Cypress.PageBankSkeleton.verifyGenerateDiff("Proficient");
      Cypress.PageBankSkeleton.verifyGenerateRandom("No");
      Cypress.PageBankQuestion.verifyFeedback(feecbackType[0], feedback)
});

// Delete Choice Question with Single Choice
Given('I am in Question bank page _Delete_', () => {
      Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
      Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Delete_', () => {
      Cypress.PageBankQuestion.search(choiceSingleAns);
});
When('I check the checkbox of the question _Delete_', () => {
      Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Delete button _Delete_', () => {
      Cypress.PageBankQuestion.clickQuesDel();
});
And('I click on OK button _Delete_', () => {
      Cypress.PageBankQuestion.delConfirm();
});
Then('I should be able to delete the question _Delete_', () => {
      Cypress.PageBankQuestion.verifyToast(bankMsg.quesDelete);
      Cypress.PageBankQuestion.verifyDelItem();
});