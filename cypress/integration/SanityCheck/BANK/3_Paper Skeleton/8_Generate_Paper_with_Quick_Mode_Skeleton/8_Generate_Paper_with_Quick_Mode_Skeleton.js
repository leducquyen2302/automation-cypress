/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress by MZ]";
// const skeletonTitle = autoTest + " " + dateTime + " " + "TFMatchHotspot Skeleton";
// const marks = "2.1";
// const truefalse = autoTest + " " + dateTime + " " + "Some governments spend a lot of public money training up individuals to be successful in international sporting events.";
// const truefalse2 = autoTest + " " + dateTime + " " + "In a competitive market, what is the relationship between supply and demand?";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const topic = "autotest"+ " " + dateTime;
// const sectionTitle1 = "Section Title 1 " + time;
// const match = autoTest + " " + dateTime + " " + "Match all of the examples or types of simple carbohydrates";
// const match2 = autoTest + " " + dateTime + " " + "Match all of the following countries share no border with Luxembourg?";
// const options = ["Mesopotamian", "Egyptain", "Harappan", "Chinese", "Galactose", "Fructose"];
// const options2 = ["Germany", "German", "British", "United Kingdom", "Greek", "Greece"];
// const hotspot = autoTest + " " + dateTime + " " + "Can you pinpoint the area in which the volcano is located on the map?";
// const hotspot2 = autoTest + " " + dateTime + " " + "Which area in Iceland caused major disruption to air travel across western and northern Europe.";
// const pic = 'testpic.png';
// const bankMsg = {
//     quesCreate: 'The question was created.',
//     quesDelete: 'The questions were deleted.',
//     paperCreate: 'The paper was created.',
//     paperDelete: 'The paper was deleted.',
//     skeletonCreate: 'The paper skeleton was created.',
//     skeletonDelete: 'The paper skeleton was deleted.'
// };
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
//     // cy.LoginExamAsAppAdmin(false);
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
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

// Given('Create questions for testing', () => {
//     // Create TrueFalse Question
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragTFQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, truefalse);
//     Cypress.PageBankQuestion.typeMarks("", marks);
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn();
//     Cypress.PageBankQuestion.createQuestionSave();
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
//     // Create Match Question
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragMatchQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, match);
//     Cypress.PageBankQuestion.typeMatchOption(0, options);
//     Cypress.PageBankQuestion.typeMarks("", marks);
//     Cypress.PageBankQuestion.clickQuesSettings();
//     Cypress.PageBankQuestion.settingsTypeTopic(topic);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
//     Cypress.PageBankQuestion.createQuestionSave();
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesCreate);
//     // Create Hotspot Question
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.createQuestion();
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
//     Cypress.PageBankQuestion.dragHotSpotQuestion();
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, hotspot);
//     Cypress.PageBankQuestion.uploadHotspot(0, pic);
//     Cypress.PageBankQuestion.addCircleSquareHotspotResponse(0, 0,hotspotDarwing.circle);
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
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
//     Cypress.PageBankSkeleton.createAdvancedSkeleton();
// });

// When('I enter the title of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonTitile(skeletonTitle);
// });

// And('I input the description of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonDescri(loremIpsum);
// });
// And('I add three types questions and save', () => {
//     //edit section name
//     Cypress.PageBankPaper.editPaperSection('0');
//     Cypress.PageBankSkeleton.enterSkeletonSectionName(sectionTitle1);
//     Cypress.PageBankPaper.editSectionDescri(loremIpsum);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add section true false question 1
//     Cypress.PageBankSkeleton.addQues('0')
//     Cypress.PageBankSkeleton.setQuesType(7);
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section true false question 2
//     Cypress.PageBankSkeleton.setQuesDiff(1);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section matching question 3
//     Cypress.PageBankSkeleton.setQuesType(5);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section matching question 4
//     Cypress.PageBankSkeleton.setQuesDiff(1);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section Hot spot question 5
//     Cypress.PageBankSkeleton.setQuesType(4);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section Hot spot question 6
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
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(3, 'Yes');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(4, 'No');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(5, 'Yes');
//     Cypress.PageBankSkeleton.verifySkeletonMatchQues(6, 'No');
// });

// And('I click generate button _Generate_', () => {
//     Cypress.PageBankQuestion.generateConfirm();
// });

// Then('I should be able to in create paper by skeleton page _Generate_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'CreatePaper');
//     Cypress.PageBankSkeleton.verifyGenerateMessage(skeletonTitle);
// });

// Then('I should be able to see the questions generate _Generate_', () => {
//     //TrueFalse Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('1');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
//     //TrueFalse Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('2');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Competent");
//     Cypress.PageBankQuestion.settingsClose();
//     //Matching Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('3');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
//     //Matching Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('4');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Competent");
//     Cypress.PageBankQuestion.settingsClose();
//     //Hot spot Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('5');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
//     //Hot spot Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('6');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Competent");
//     Cypress.PageBankQuestion.settingsClose();
// });

// And('I enter Paper name _Generate_', () => {
//     Cypress.PageBankPaper.enterPaperName(skeletonTitle);
// });

// And('I enter question content without matched question _Generate_', () => {
//     //True False Question
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(1, truefalse2);
//     //Matching Question
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, match2);
//     Cypress.PageBankQuestion.typeMatchOption(1, options2);
//     //Hotspot Question
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(5, hotspot2);
//     Cypress.PageBankQuestion.uploadHotspot(5, pic);
//     Cypress.PageBankQuestion.addCircleSquareHotspotResponse(5, 1,hotspotDarwing.square);
// });

// And('I click on Save button _Generate_', () => {
//     cy.wait(1500)
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
//     Cypress.PageBankPaper.verifyPaperMarks(12.6);
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Preview_', () => {
//     Cypress.PageBankPaper.editPaper();
// });

// And('I click on Preview button _Preview_', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });

// Then('I should be able to see the question contents _Preview_', () => {
//     //Matched TrueFalse question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(1, truefalse);
//     //Skeleton TrueFalse question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(2, truefalse2);
//     //Matched Matching question
//     Cypress.PageBankQuestion.verifyPreviewMatchQues(3, match, options);
//     //Skeleton Matching question
//     Cypress.PageBankQuestion.verifyPreviewMatchQues(4, match2, options2);
//     //Matched Hot spot question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(5, hotspot);
//     // Cypress.PageBankQuestion.verifyHotspotResponse(5, 1, 0);
//     Cypress.PageBankQuestion.verifyHotspotResponse(5, 1, 0, 0)
//     //Skeleton Hot spot question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(6, hotspot2);
//     // Cypress.PageBankQuestion.verifyHotspotResponse(6, 0, 1);
//     Cypress.PageBankQuestion.verifyHotspotResponse(6, 0, 1, 0)
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