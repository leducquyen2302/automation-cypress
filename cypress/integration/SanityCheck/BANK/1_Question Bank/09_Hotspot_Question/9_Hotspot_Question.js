/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress]";
// const hotspot = autoTest + " " + dateTime + " " + "Can you pinpoint the area in which the volcano is located on the map?";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const topic = "autotest"+ dateTime;
// const pic = 'testpic.png';
// const bankMsg = {
//     quesCreate: 'The question was created.',
//     quesUpdate: 'The question was updated.',
//     quesDelete: 'The question was deleted.'
// }
// const quesTable = [
//     {
//         "tablename": "quesContent",
//         "value": hotspot
//     },
//     {
//         "tablename": "type",
//         "value": "Hot spot"
//     },
//     {
//         "tablename": "marks",
//         "value": "1"
//     },
//     {
//         "tablename": "topic",
//         "value": ""
//     },
//     {
//         "tablename": "difficulty",
//         "value": "None"
//     }
// ];
// const hotspotDarwing = {
//     circle: [ 0.5 , 0.4 ],
//     square: [ 0.7 , 0.6 ],
//     drawing:[
//         { dotX : 0.1, dotY : 0.2 },
//         { dotX : 0.2, dotY : 0.1 },
//         { dotX : 0.3, dotY : 0.1 },
//         { dotX : 0.4, dotY : 0.2 },
//         { dotX : 0.3, dotY : 0.3 },
//         { dotX : 0.2, dotY : 0.3 }
//     ]
// };
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// before(() => {
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(2000);
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankQuestion.createQuestion();
// });
// afterEach(() => {
//     cy.wait(500);
// });

// // Create Hotspot Question
// Given('I am in Create question page', () => {
//     Cypress.auiCommon.verifyUrl('contains', '/authoring/CreateQuestion');
// });
// When('I select a course', () => {
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
// });
// And('I drag a Hotspot question to the specific area', () => {
//     Cypress.PageBankQuestion.dragHotSpotQuestion();
// });
// And('I input Question content', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, hotspot);
// });
// And('I upload a picture', () => {
//     Cypress.PageBankQuestion.uploadHotspot(0, pic)
// });
// And('I add three response areas', () => {   
//     Cypress.PageBankQuestion.addCircleSquareHotspotResponse(0, 0,hotspotDarwing.circle);
//     Cypress.PageBankQuestion.addCircleSquareHotspotResponse(0, 1,hotspotDarwing.square);
//     Cypress.PageBankQuestion.addDrawingHotspotResponse(0,2,hotspotDarwing.drawing)
// });
// And('I click on Save button', () => {
//     Cypress.PageBankQuestion.createQuestionSave();
// });
// Then('I should be able to save the question', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
// });
// When('I search for the question created', () => {
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankQuestion.search(hotspot);
// });
// Then('I should be able to see the information in the table displayed correctly', () => {
//     Cypress.PageBankQuestion.verifyQuesBankTable(quesTable);
// });

// // Preview Hotspot Question
// Given('I am in Question bank page _Preview_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.visitQuesBank();
// });
// When('I search for the question created _Preview_', () => {
//     Cypress.PageBankQuestion.search(hotspot);
// });
// And('I check the checkbox of the question _Preview_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Preview_', () => {
//     Cypress.PageBankQuestion.clickQuesEdit();
// });
// And('I click on Preview button _Preview_', () => {
//     Cypress.PageBankQuestion.clickQuesPreview();
// });
// Then('I should be able to see the question content and response_Preview_', () => {
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(0, hotspot);
//     Cypress.PageBankQuestion.verifyHotspotResponse(0, 1, 1, 1)
// });

// // Edit Hotspot Question
// Given('I am in Question bank page _Edit_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.visitQuesBank();
// });
// When('I search for the question created _Edit_', () => {
//     Cypress.PageBankQuestion.search(hotspot);
// });
// And('I check the checkbox of the question _Edit_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Edit_', () => {
//     Cypress.PageBankQuestion.clickQuesEdit();
// });
// And('I edit the settings of the question _Edit_', () => {
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.settingsSetDiff(2);
//     Cypress.PageBankQuestion.settingsTypeMarkingScheme(loremIpsum);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()

// });
// And('I click on Save button _Edit_', () => {
//     Cypress.PageBankQuestion.createQuestionSave();
// });
// Then('I should be able to save the question _Edit_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesUpdate);
// });
// When('I search for the question edited _Edit_', () => {
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankQuestion.search(hotspot);
// });
// Then('I should be able to see the edited information in the table displayed correctly _Edit_', () => {
//     Cypress.PageBankQuestion.verifyEditQues(topic, 'Proficient');
// });
// //Delete Question
// Then('Delete Hotspot Question after test', () => {
//     cy.DeleteQuesByAPI(hotspot)
// });