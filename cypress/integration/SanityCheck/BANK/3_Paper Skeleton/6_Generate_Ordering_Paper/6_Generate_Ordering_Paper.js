/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress Ordering]";
// const skeletonTitle = autoTest + " " + dateTime + " " + "Demo Skeleton";
// const marks = "2.1";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
// const topic = "autotest"+ " " + dateTime;
// const sectionTitle1 = "Section Title 1 " + time;
// const ordering = autoTest + " " + dateTime + " " + "Ordering all of the examples or types of simple carbohydrates";
// const ordering2 = autoTest + " " + dateTime + " " + "2Ordering all of the examples or types of simple carbohydrates";
// const options = ["Mesopotamian", "Egyptain", "Harappan"]
// const options2 = ["2Mesopotamian", "2Egyptain", "2Harappan"]
// const bankMsg = {
//     quesCreate: 'The question was created.',
//     quesDelete: 'The question was deleted.',
//     paperCreate: 'The paper was created.',
//     paperDelete: 'The paper was deleted.',
//     skeletonCreate: 'The paper skeleton was created.',
//     skeletonDelete: 'The paper skeleton was deleted.'
// }
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// before(() => {
//     // cy.LoginExamAsAppAdmin(false);
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(2000);
//     // Create Ordering Question
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragOrderingQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, ordering);
//     Cypress.PageBankQuestion.typeOrderingOption(0, options);
//     Cypress.PageBankQuestion.typeMarks("", marks);
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
//     Cypress.PageBankQuestion.createQuestionSave();
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
// });
// afterEach(() => {
//     cy.wait(500);
// });

// after(() => {
//     cy.DeletePaperByAPI(skeletonTitle)
//     cy.DeleteQuesByAPI(autoTest) 
//     cy.DeleteSkeletonByAPI(skeletonTitle)  
// })

// //Create Skeleton with Ordering questions
// Given('I am in Create Skeleton page', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
//     Cypress.PageBankSkeleton.createAdvancedSkeleton();
// });

// When('I enter the title of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonTitile(skeletonTitle);
// });

// And('I input the description of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonDescri(loremIpsum);    
// });
// And('I add ordering questions and save', () => {
//     //edit section name
//     Cypress.PageBankPaper.editPaperSection('0');
//     Cypress.PageBankSkeleton.enterSkeletonSectionName(sectionTitle1);
//     Cypress.PageBankPaper.editSectionDescri(loremIpsum);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add section ordering question 1
//     Cypress.PageBankSkeleton.addQues('0')
//     Cypress.PageBankSkeleton.setQuesType(6);
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section ordering question 2
//     Cypress.PageBankSkeleton.setQuesDiff(1);
//     Cypress.PageBankPaper.clickPanelSave();
// });

// And('I click on Save button', () => {
//     Cypress.PageBankSkeleton.createAdvancedSkeletonSave();
// });

// Then('I should be able to save the Skeleton', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperSkeleton');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonCreate);
// });

// //Generate Paper
// Given('I am in paper skeleton page _Generate_', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
// });

// When('I have predefined a skeleton _Generate_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
//     Cypress.PageBankSkeleton.verifyTableSkeletonTitle(skeletonTitle);
// });

// And('I check the the checkbox of the skeleton _Generate_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click generate paper button _Generate_', () => {
//     Cypress.PageBankSkeleton.genSkeleton();
// });

// And('I select a course _Generate_', () => {
//     Cypress.PageBankSkeleton.clickcourse(1);
//     Cypress.PageBankSkeleton.selectCourse(0);
// });

// Then('I should be able to see matched questions _Generate_', () => {
//     cy.wait(1000);
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(1, 'Yes');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(2, 'No');
// });

// And('I click generate button _Generate_', () => {
//     Cypress.PageBankQuestion.generateConfirm();
// });

// Then('I should be able to in create paper by skeleton page _Generate_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'CreatePaper');
//     Cypress.PageBankSkeleton.verifyGenerateMessage(skeletonTitle);
// });

// Then('I should be able to see the questions generate _Generate_', () => {
//     //Ordering Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('1');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
//     //Ordering Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('2');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Competent");
//     Cypress.PageBankQuestion.settingsClose();
// });

// And('I enter Paper name _Generate_', () => {
//     Cypress.PageBankPaper.enterPaperName(skeletonTitle);
// });

// And('I enter question content without matched question _Generate_', () => {
//     //Ordering Question
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(1, ordering2);
//     Cypress.PageBankQuestion.typeOrderingOption(1, options2);
// });

// And('I click on Save button _Generate_', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });

// Then('I should be able to save the paper _Generate_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);
// });

// //Preview Generated Paper
// Given('I am in Paper bank page _Preview_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankPaper.visitPaperBank();
// });
// When('I search for the paper created _Preview_', () => {
//     Cypress.PageBankQuestion.search(skeletonTitle);
// });

// And('I check the checkbox of the paper _Preview_', () => {
//     Cypress.PageBankPaper.verifyPaperMarks(4.2);
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Preview_', () => {
//     Cypress.PageBankPaper.editPaper();
// });

// And('I click on Preview button _Preview_', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });

// Then('I should be able to see the question contents _Preview_', () => {
//     //Matched Ordering question
//     Cypress.PageBankQuestion.verifyPreviewOrderingQues(0, ordering, options);
//     //Skeleton Ordering question
//     Cypress.PageBankQuestion.verifyPreviewOrderingQues(2, ordering2, options2);
// });

// //Delete Paper
// Given('I am in Paper bank page _Delete_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankPaper.visitPaperBank();
// });

// When('I search for the paper created _Delete_', () => {
//     Cypress.PageBankQuestion.search(skeletonTitle);
// });

// And('I check the checkbox of the paper _Delete_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click on Delete button _Delete_', () => {
//     Cypress.PageBankPaper.deletePaper();
// });

// And('I click on Delete button in popup _Delete_', () => {
//     Cypress.PageBankQuestion.delConfirm();
// });

// Then('I should be able to delete the paper _Delete_', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperDelete);
//     Cypress.PageBankQuestion.verifyDelItem();
// });

// //Delete Question
// Given('I am in Question bank page _DeleteQuestion_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.visitQuesBank();
// });

// When('I search for the question created _DeleteQuestion_', () => {
//     Cypress.PageBankQuestion.search(autoTest);
// });

// And('I check the checkbox of the question _DeleteQuestion_', () => {
//     Cypress.PageBankQuestion.checkItem(0);
// });

// And('I click on Delete button _DeleteQuestion_', () => {
//     Cypress.PageBankQuestion.clickQuesDel();
// });

// And('I click on Delete button in popup _DeleteQuestion_', () => {
//     Cypress.PageBankQuestion.delConfirm();
// });

// Then('I should be able to delete the question _DeleteQuestion_', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesDelete);
//     Cypress.PageBankQuestion.verifyDelItem();
// });