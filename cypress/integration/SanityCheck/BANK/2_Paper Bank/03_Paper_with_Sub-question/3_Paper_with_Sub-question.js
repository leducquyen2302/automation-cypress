/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress by RZ]";
// const paperName = autoTest + " " + dateTime + " " + "Demo Paper";
// const subQues = autoTest + " " + dateTime + " " + "Sub-question";
// const subQuesChoiceSing = autoTest + " " + dateTime + " " + "Who is known as the father of Modern Medicine?";
// const subQuesChoiceSingAs = ["Euclid", "Pythagoras", "Hippocrates", "Erastosthenes"];
// const subQuesChoiceMulti = autoTest + " " + dateTime + " " + "The lengths of two sides of a triangle are 5 and 7. Which of the following could be the perimeter of the triangle? Select all that apply.";
// const subQuesChoiceMultiAs = ["14", "17", "19", "22", "24", "27"];
// const subQuesEssay = autoTest + " " + dateTime + " " + "Should wealthy nations be required to share their wealth among poorer nations by providing such things as food and education?";
// const subQuesFib1 = autoTest + " " + dateTime + " " + "Any alkane with one or more alkyl groups is automatically a"
// const subQuesFib2 = "alkane.";
// const subQuesFibA = "branched-chain";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
// const bankMsg = {
//     paperCreate: 'The paper was created.',
//     paperUpdate: 'The paper was updated.',
//     paperDelete: 'The paper was deleted.'
// }
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// before(() => {
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(2000);
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankPaper.createPaper();
// });
// afterEach(() => {
//     cy.wait(500);
// });
// after(() => {
//     cy.DeletePaperByAPI(paperName)
// })
// // Create Paper - Sub-question
// Given('I am in Create paper page', () => {
//     Cypress.auiCommon.verifyUrl('contains', '/authoring/CreatePaper');
// });
// When('I enter Paper name', () => {
//     Cypress.PageBankPaper.enterPaperName(paperName);
// });
// And('I select a course', () => {
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
// });
// And('I drag a Sub-question to the specific area', () => {
//     Cypress.PageBankQuestion.dragSubQuestion();
// });
// And('I input Question content', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, subQues, 0);
// });
// And('I click on Add a new sub-question button to add a Choice question as a Sub-question', () => {
//     Cypress.PageBankQuestion.addSubques(0, 0);
// });
// And('I input Question content and Choice value', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, subQuesChoiceSing, 1);
//     Cypress.PageBankQuestion.typeChoiceValue(0, subQuesChoiceSingAs, 1);
// });
// And('I set correct answer', () => {
//     Cypress.PageBankQuestion.enableCorrectAnswer(0, 2, 1);
// });
// And('I click on Add a new sub-question button to add a Choice question as a Sub-question _Choice MA_', () => {
//     Cypress.PageBankQuestion.addSubques(0, 0);
// });
// And('I enable Multiple answers', () => {
//     Cypress.PageBankQuestion.enableMultiAnswer(1, 1);
// });
// And('I click on Add choice button', () => {
//     //Add two more choice for multiple choice sub-question
//     Cypress.PageBankQuestion.quesAddChoice('1b', 1, 1);
//     Cypress.PageBankQuestion.quesAddChoice('1b', 1, 1);
// });
// And('I input Question content and Choice value _Choice MA_', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(1, subQuesChoiceMulti, 1);
//     Cypress.PageBankQuestion.typeChoiceValue(1, subQuesChoiceMultiAs, 1);
// });
// And('I set correct answers', () => {
//     Cypress.PageBankQuestion.enableCorrectAnswer(1, 1, 1);
//     Cypress.PageBankQuestion.enableCorrectAnswer(1, 2, 1);
//     Cypress.PageBankQuestion.enableCorrectAnswer(1, 3, 1);
// });
// And('I click on Add a new sub-question button to add an Essay question to the specific area', () => {
//     Cypress.PageBankQuestion.addSubques(0, 1);
// });
// And('I input Question content _Essay_', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(2, subQuesEssay, 1);
// });
// And('I click on Add a new sub-question button to add a Fill-in-the-blank question', () => {
//     Cypress.PageBankQuestion.addSubques(0, 2);
// });
// And('I input Question content and add a blank', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, subQuesFib1, 1);
//     Cypress.PageBankQuestion.quesAddBlank('1d', 3, 1);
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, subQuesFib2, 1);
// });
// And('I input correct answer', () => {
//     Cypress.PageBankQuestion.typeFibAnswer(3, subQuesFibA, 1);
// });
// And('I click on Complete button', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });
// Then('I should be able to save the paper', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);;
// });

// // Preview Paper
// Given('I am in Paper bank page _Preview_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankPaper.visitPaperBank();
// });
// When('I search for the paper created _Preview_', () => {
//     Cypress.PageBankQuestion.search(paperName);
// });
// And('I check the checkbox of the paper _Preview_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Preview_', () => {
//     Cypress.PageBankPaper.editPaper();
// });
// And('I click on Preview button _Preview_', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });
// Then('I should be able to see the question contents and all respective values _Preview_', () => {
//     // Sub-question
//     Cypress.PageBankQuestion.verifyPreviewQuesContent(0, subQues);
//     // Sub-question Choice with Single Answer
//     Cypress.PageBankPaper.verifyPreviewChoiceQues(1, subQuesChoiceSing, subQuesChoiceSingAs);
//     // Sub-question Choice with Multiple Answer
//     Cypress.PageBankPaper.verifyPreviewChoiceQues(2, subQuesChoiceMulti, subQuesChoiceMultiAs);
//     // Sub-question Essay
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(4, subQuesEssay);
//     // Sub-question Fill-in-the-Blank
//     Cypress.PageBankQuestion.verifyPreviewFibQues(5, subQuesFib1, subQuesFib2, subQuesFibA);
// });

// // Delete Paper
// Given('I am in Paper bank page _Delete_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankPaper.visitPaperBank();
// });
// When('I search for the paper created _Delete_', () => {
//     Cypress.PageBankQuestion.search(paperName);
// });
// When('I check the checkbox of the paper _Delete_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Delete button _Delete_', () => {
//     Cypress.PageBankPaper.deletePaper();
// });
// And('I click on OK button _Delete_', () => {
//     Cypress.PageBankQuestion.delConfirm();
// });
// Then('I should be able to delete the paper _Delete_', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperDelete);
//     Cypress.PageBankQuestion.verifyDelItem();
// });