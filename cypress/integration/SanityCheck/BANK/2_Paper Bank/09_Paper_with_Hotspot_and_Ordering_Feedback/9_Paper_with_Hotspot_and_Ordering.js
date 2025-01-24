/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
const autoTest = "[Auto Test with Cypress]";
const paperName = autoTest + " " + dateTime + " " + "Hot spot Paper";
const hotspot = autoTest + " " + dateTime + " " + "Can you pinpoint the area in which the volcano is located on the map?";
const ordering = autoTest + " " + dateTime + " " + "Ordering all of the examples or types of simple carbohydrates";
const options = ["Mesopotamian", "Egyptain", "Harappan"]
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const topic = "autotest" + dateTime;
const pic = 'testpic.png';
const bankMsg = {
    paperCreate: 'The paper was created.',
    paperUpdate: 'The paper was updated.',
    paperDelete: 'The paper was deleted.'
};
const feedback1 = {
    correct: 'This answer is correct' + dateTime,
    wrong: 'This answer is wrong' + dateTime
};
const feedback2 = 'This feedback is for Common';
const feecbackType = ['Separate feedback for correct and wrong responses', 'Common feedback for all responses']
const hotspotDarwing = {
    circle: [0.5, 0.4],
    square: [0.7, 0.6],
    drawing: [
        { dotX: 0.1, dotY: 0.2 },
        { dotX: 0.2, dotY: 0.1 },
        { dotX: 0.3, dotY: 0.1 },
        { dotX: 0.4, dotY: 0.2 },
        { dotX: 0.3, dotY: 0.3 },
        { dotX: 0.2, dotY: 0.3 }
    ]
};
let current = Cypress.env('current_Env')
let ct = Cypress.env('current_ten')
let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid

before(() => {
    cy.LoginExamAsSystem();
    cy.wait(3000);
    Cypress.PageAdminCommon.visitBank(20000)
    Cypress.PageBankPaper.createPaper();
});
afterEach(() => {
    cy.wait(500);
});

// Create Paper
Given('I am in Create paper page', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/CreatePaper');
});
When('I enter Paper name', () => {
    Cypress.PageBankPaper.enterPaperName(paperName);
    cy.writeFile('cypress/fixtures/hotSpotExam.json', [paperName]);
});
And('I select a course', () => {
    Cypress.PageBankQuestion.clickcourse(0);
    // Cypress.PageBankQuestion.selectCourse(0);
    Cypress.PageBankQuestion.selectCourseByName('AT001')
    Cypress.PageBankQuestion.addSection()
});
And('I drag a Hotspot question to the specific area', () => {
    Cypress.PageBankQuestion.dragHotSpotQuestion();
});
And('I input Question content', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(0, hotspot);
});
And('I upload a picture', () => {
    Cypress.PageBankQuestion.uploadHotspot(0, pic)
});
And('I add two response areas', () => {
    Cypress.PageBankQuestion.addCircleSquareHotspotResponse(0, 0, hotspotDarwing.circle);
    Cypress.PageBankQuestion.addCircleSquareHotspotResponse(0, 1, hotspotDarwing.square);
});
And('I add separate feedback', () => {
    Cypress.PageBankQuestion.clickQuesSettingsIndex('1');
    Cypress.PageBankQuestion.selectTypeofFeedback(0);
    Cypress.PageBankQuestion.settingsTypeFeedback(0, feedback1.correct)
    Cypress.PageBankQuestion.settingsTypeFeedback(1, feedback1.wrong)
    Cypress.PageBankQuestion.clickSettingsSaveBtn()
});
And('I click on Complete button', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper', () => {
    // Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);
});

// Edit Paper
Given('I have created a paper and am in Paper bank page', () => {
    Cypress.auiCommon.verifyUrl('contains', '/authoring/PaperBank');
});
When('I search for the Paper created', () => {
    // Cypress.auiCommon.closeToast();
    Cypress.PageBankQuestion.search(paperName);
});
And('I check the checkbox of the paper', () => {
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click on Edit button', () => {
    Cypress.PageBankPaper.editPaper();
});
And('I add a response area', () => {
    Cypress.PageBankQuestion.addDrawingHotspotResponse(0, 2, hotspotDarwing.drawing)
    Cypress.PageBankQuestion.clickShapeBtn(0, 2)
});
And('I drag a Ordering question to the specific area', () => {
    Cypress.PageBankQuestion.dragOrderingQuestion();
});
And('I input Question content _Edit_', () => {
    Cypress.PageBankQuestion.clickTypeRichTextEditor(1, ordering);
});
And('I input options', () => {
    Cypress.PageBankQuestion.typeOrderingOption(0, options);
});
And('I add common feedback', () => {
    Cypress.PageBankQuestion.clickQuesSettingsIndex('2');
    Cypress.PageBankQuestion.selectTypeofFeedback(1);
    Cypress.PageBankQuestion.settingsTypeFeedback(0, feedback2)
    Cypress.PageBankQuestion.clickSettingsSaveBtn()
});
And('I click on Complete button _Edit_', () => {
    Cypress.PageBankPaper.savePaperComplete();
});
Then('I should be able to save the paper _Edit_', () => {
    // Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
    // Cypress.PageBankQuestion.verifyToast(bankMsg.paperUpdate);
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
Then('I should be able to see the question contents and response area _Preview_', () => {
    Cypress.PageBankQuestion.verifyPreviewEssayQues(0, hotspot);
    Cypress.PageBankQuestion.verifyHotspotResponse(0, 1, 1, 1)
    Cypress.PageBankQuestion.verifyPreviewOrderingQues(2, ordering, options);

});
