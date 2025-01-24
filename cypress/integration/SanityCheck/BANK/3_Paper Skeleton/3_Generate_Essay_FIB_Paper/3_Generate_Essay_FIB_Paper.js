/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress by MZ]";
// const skeletonTitle = autoTest + " " + dateTime + " " + "Demo Skeleton";
// const marks = "2.1";
// const essay = autoTest + " " + dateTime + " " + "Some governments spend a lot of public money training up individuals to be successful in international sporting events. Some people believe that this money should be spent on things that will benefit the general public instead. To what extent do you agree or disagree?";
// const essay2 = autoTest + " " + dateTime + " " + "In a competitive market, what is the relationship between supply and demand?";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
// const topic = "autotest"+ " " + dateTime;
// const sectionTitle1 = "Section Title 1 " + time;
// const fib1 = autoTest + " " + dateTime + " " + "The process of forming an ester from a reaction between an organic acid and" 
// const fib1tail = "is called esterification.";
// const fibA = "alcohol";
// const bankMsg = {
//     quesCreate: 'The question was created.',
//     quesDelete: 'The questions were deleted.',
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
//     cy.waitLoading()
//     cy.wait(2000);
// });
// afterEach(() => {
//     cy.wait(500);
// });
// after(() => {
//     cy.DeletePaperByAPI(skeletonTitle)
//     cy.DeleteQuesByAPI(autoTest) 
//     cy.DeleteSkeletonByAPI(skeletonTitle)  
// })
// Given('Create Essay Question', () => {
//     // Create Essay Question
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragEssayQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, essay);
//     Cypress.PageBankQuestion.typeMarks("", marks);
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
//     Cypress.PageBankQuestion.createQuestionSave();
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
// });
// Given('Create FIB Question', () => {
//     // Create FIB Question
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragFibQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, fib1);
//     Cypress.PageBankQuestion.quesAddBlank('');
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, fib1tail);
//     Cypress.PageBankQuestion.typeFibAnswer(0, fibA);
//     Cypress.PageBankQuestion.typeMarks("", marks);
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
//     Cypress.PageBankQuestion.createQuestionSave();
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
// });
// //Create Skeleton with essay  and FIB questions
// Given('I am in Create Skeleton page', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(18000);
//     Cypress.PageBankSkeleton.createAdvancedSkeleton();
// });

// When('I enter the title of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonTitile(skeletonTitle);
// });

// And('I input the description of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonDescri(loremIpsum);    
// });
// And('I add essay and FIB questions and save', () => {
//     //edit section name
//     Cypress.PageBankPaper.editPaperSection('0');
//     Cypress.PageBankSkeleton.enterSkeletonSectionName(sectionTitle1);
//     Cypress.PageBankPaper.editSectionDescri(loremIpsum);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add section essay question 1
//     Cypress.PageBankSkeleton.addQues('0')
//     Cypress.PageBankSkeleton.setQuesType(2);
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section essay question 2
//     Cypress.PageBankSkeleton.setQuesDiff(1);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section FIB question 3
//     Cypress.PageBankSkeleton.setQuesType(3);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section FIB question 4
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

// When('I have predefined a skeleton with essay and FIB question _Generate_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
//     Cypress.PageBankSkeleton.verifyTableSkeletonTitle(skeletonTitle);
// });

// And('I check the the checkbox of the skeleton _Generate_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click generate paper button _Generate_', () => {
//     Cypress.PageBankSkeleton.genSkeleton();
// });

// And('I select a course with essay and FIB question _Generate_', () => {
//     Cypress.PageBankSkeleton.clickcourse(1);
//     Cypress.PageBankSkeleton.selectCourse(0);
// });

// Then('I should be able to see matched questions _Generate_', () => {
//     cy.wait(1000);
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(1, 'Yes');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(2, 'No');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(3, 'Yes');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(4, 'No');
// });

// And('I click generate button _Generate_', () => {
//     Cypress.PageBankQuestion.generateConfirm();
// });

// Then('I should be able to in create paper by skeleton page _Generate_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'CreatePaper');
//     Cypress.PageBankSkeleton.verifyGenerateMessage(skeletonTitle);
// });

// Then('I should be able to see the questions generate _Generate_', () => {
//     //Essay Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('1');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
//     //Essay Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('2');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Competent");
//     Cypress.PageBankQuestion.settingsClose();
//     //FIB Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('3');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
//     //FIB  Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('4');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Competent");
//     Cypress.PageBankQuestion.settingsClose();
// });

// And('I enter Paper name _Generate_', () => {
//     Cypress.PageBankPaper.enterPaperName(skeletonTitle);
// });

// And('I enter essay and FIB content without matched question _Generate_', () => {
//     //Essay Question
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(1, essay2);
//     //FIB Question
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, fib1);
//     Cypress.PageBankQuestion.quesAddBlank(3);
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, fib1tail);
//     Cypress.PageBankQuestion.typeFibAnswer(3, fibA);
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
//     Cypress.PageBankPaper.verifyPaperMarks(8.4);
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Preview_', () => {
//     Cypress.PageBankPaper.editPaper();
// });

// And('I click on Preview button _Preview_', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });

// Then('I should be able to see the question contents and all respective values _Preview_', () => {
//     //Matched Essay question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(1, essay);
//     //Skeleton Essay question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(2, essay2)
//     //Matched FIB question
//     Cypress.PageBankQuestion.verifyPreviewFibQues(3, fib1, fib1tail, fibA);
//     //Skeleton FIB question
//     Cypress.PageBankQuestion.verifyPreviewFibQues(4, fib1, fib1tail, fibA);
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

// Then('Delete Delete Skeleton after test', () => {
//     //Delete Skeleton
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
//     Cypress.PageBankSkeleton.search(skeletonTitle);
//     Cypress.PageBankQuestion.checkItem(1);
//     Cypress.PageBankSkeleton.delSkeleton();
//     Cypress.PageBankSkeleton.delConfirm();
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonDelete);
//     Cypress.PageBankQuestion.verifyDelItem();
// });