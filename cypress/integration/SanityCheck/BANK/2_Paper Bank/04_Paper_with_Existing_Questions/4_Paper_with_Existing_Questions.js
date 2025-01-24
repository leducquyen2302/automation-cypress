/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress ExistQues by RZ]";
// const choiceSingleAns = autoTest + " " + dateTime + " " + "Rivers Tigris and Euphrates are associated with?";
// var choiceSingleAnsAs1 = ["Mesopotamian", "Egyptain", "Harappan", "Chinese"]
// var choiceSingleAnsAs2 = "Civilization";
// var choiceSingleAnsAs = [
//     choiceSingleAnsAs1[0] + " " + choiceSingleAnsAs2,
//     choiceSingleAnsAs1[1] + " " + choiceSingleAnsAs2, 
//     choiceSingleAnsAs1[2] + " " + choiceSingleAnsAs2, 
//     choiceSingleAnsAs1[3] + " " + choiceSingleAnsAs2
//     ];
// const paperName = autoTest + " " + dateTime + " " + "Demo Paper";
// const sectionDescrip = "Section of existing questions";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const topic = "autotest"+ dateTime;
// const bankMsg = {
//     quesCreate: 'The question was created.',
//     quesUpdate: 'The question was updated.',
//     quesDelete: 'The question was deleted.',
//     paperCreate: 'The paper was created.',
//     paperUpdate: 'The paper was updated.',
//     paperDelete: 'The paper was deleted.',
//     papersDelete: 'The papers were deleted.'
// }
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// before(() => {
//     // cy.LoginExamAsAppAdmin(false);
//     cy.LoginExambyUserName(false,paperCrafter);
// })
// afterEach(() => {
//     cy.wait(500);
// });

// //Delete Questin
// after(() => {   
//     cy.DeletePaperByAPI(paperName)
//     cy.DeleteQuesByAPI(choiceSingleAns)  
// })
// Given('Create questions and go to Greate paper page', () => {
//     cy.wait(3000);
//     // Create Question
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragChoiceQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, choiceSingleAns);
//     Cypress.PageBankQuestion.typeChoiceValue(0, choiceSingleAnsAs);
//     Cypress.PageBankQuestion.enableCorrectAnswer(0, 0);
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
//     Cypress.PageBankQuestion.createQuestionSave();
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
//     // Visit Create Paper Page
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankPaper.createPaper();
// });
// // Create Paper - Add Existing Questions
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
// And('I click on Edit section icon', () => {
//     Cypress.PageBankPaper.editPaperSection("0");
// });
// And('I input Section description', () => {
//     Cypress.PageBankPaper.editSectionDescri(sectionDescrip);
// });
// And('I click on Save button', () => {
//     Cypress.PageBankPaper.clickPanelSave();
// });
// And('I click on Add existing questions button', () => {
//     Cypress.PageBankQuestion.addExistQues();
// });
// And('I search for the questions I created in Question bank', () => {  
//     Cypress.PageBankQuestion.searchInPanel(choiceSingleAns);
// });
// And('I check the checkboxes of the questions', () => {
//     Cypress.PageBankQuestion.verifyEditQues(topic, 'None')
//     Cypress.PageBankQuestion.checkBoxInPanel(0);
// });
// And('I click on Add button', () => {
//     Cypress.PageBankPaper.clickPanelAdd();
// });
// And('I click on Complete button', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });
// Then('I should be able to save the Paper', () => {
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
//     // Existing questions
//     Cypress.PageBankQuestion.verifyExistQues(1);
// });

// //Duplicate Paper
// Given('I am in Paper bank page _Copy_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankPaper.visitPaperBank();
// });

// When('I search for the paper created _Copy_', () => {
//     Cypress.PageBankQuestion.search(paperName);
// });

// And('I check the checkbox of the paper _Copy_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click on Duplicate button _Copy_', () => {
//     Cypress.PageBankPaper.copyPaper();
// });

// And('I click on confirm duplicate button _Copy_', () => {
//     Cypress.PageBankQuestion.okConfirm();
// });

// Then('I should be able to see a same paper copied in homepage _Copy_', () => {
//     Cypress.PageBankPaper.verifyCopiedPaper(paperName);
// });

// And('I check the checkbox of the duplicate paper _Copy_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// }); 
    
// And('I click on Edit button _Copy_', () => {
//     Cypress.PageBankPaper.editPaper();
// }); 

// And('I click on Preview button _Copy_', () => { 
//     Cypress.PageBankPaper.clickPaperPreview();
// });

// Then('I should be able to see paper content is same _Copy_', () => {
//     Cypress.PageBankQuestion.verifyExistQues(1);  
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
//     //Duplicate Paper
//     Cypress.PageBankQuestion.checkItem(2);
// });
// And('I click on Delete button _Delete_', () => {
//     Cypress.PageBankPaper.deletePaper();
// });
// And('I click on OK button _Delete_', () => {
//     Cypress.PageBankQuestion.delConfirm();
// });
// Then('I should be able to delete the paper _Delete_', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.papersDelete);
//     Cypress.PageBankQuestion.verifyDelItem();
// });