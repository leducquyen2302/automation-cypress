/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress Ordering]";
const ordering = autoTest + " " + dateTime + " " + "Match all of the examples or types of simple carbohydrates";
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const topic = "autotest"+ dateTime;
const options = ["Mesopotamian", "Egyptain", "Harappan", "test"]
const order = [0,1,2,3]
const optionsnew = ["test", "Egyptain", "Harappan", "Mesopotamian"]
const bankMsg = {
    quesCreate: 'The question was created.',
    quesUpdate: 'The question was updated.',
    quesDelete: 'The question was deleted.'
}
const quesTable = [
    {
        "tablename": "quesContent",
        "value": ordering
    },
    {
        "tablename": "type",
        "value": "Ordering"
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
//     cy.DeleteQuesByAPI(ordering)    
// });

// Create Ordering Question
Given('I am in Create question page', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/CreateQuestion');
});
When('I select a course', () => {
    Cypress.PageBankQuestion.clickcourse(0);
    Cypress.PageBankQuestion.selectCourse(0);
});
And('I drag a Ordering question to the specific area', () => {
    Cypress.PageBankQuestion.dragOrderingQuestion();
});
And('I input Question content', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, ordering);
});
And('I click add option', () => {
    Cypress.PageBankQuestion.clickAddOrderOptions();
});
And('I input options', () => {
    Cypress.PageBankQuestion.typeOrderingOption(0, options);
});
And('I click advance mode', () => {
    Cypress.PageBankQuestion.enableAdvanceMode(0);
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
    Cypress.PageBankQuestion.search(ordering);
});
Then('I should be able to see the information in the table displayed correctly', () => {
    Cypress.PageBankQuestion.verifyQuesBankTable(quesTable);
});

// Preview Ordering Question
Given('I am in Question bank page _Preview_', () => {
    Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
    Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Preview_', () => {
    Cypress.PageBankQuestion.search(ordering);
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
    Cypress.PageBankQuestion.verifyPreviewOrderingQues(0, ordering, options);
    Cypress.PageBankQuestion.changeView(0)
    const orderdrag ={
        options:options,
        oderindex: order,
    }
    Cypress.PageBankQuestion.dragOptiontoOrder(orderdrag.options, orderdrag.oderindex)
});

// Edit Ordering Question
Given('I am in Question bank page _Edit_', () => {
    Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
    Cypress.PageBankQuestion.visitQuesBank();
});
When('I search for the question created _Edit_', () => {
    Cypress.PageBankQuestion.search(ordering);
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
    Cypress.PageBankQuestion.clickSettingsSaveBtn()

});
And('I change order of first and last option _Edit_', () => {
    Cypress.PageBankQuestion.changeOrderOptions(0, 3);
});
And('I disable advanced mode _Edit_', () => {
    Cypress.PageBankQuestion.enableAdvanceMode(0);
    Cypress.PageBankQuestion.okConfirm();
});
And('I click preview button _Edit_', () => {
    Cypress.PageBankQuestion.clickQuesPreview();
});
Then('I can see options changed _Edit_', () => {
    Cypress.PageBankQuestion.verifyPreviewOrderingQues(0, ordering, optionsnew);
});
When('I click exist _Edit_', () => {
    Cypress.PageBankQuestion.clickQuesExist();
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
    Cypress.PageBankQuestion.search(ordering);
});
Then('I should be able to see the edited information in the table displayed correctly _Edit_', () => {
    Cypress.PageBankQuestion.verifyEditQues(topic, 'Proficient');
});