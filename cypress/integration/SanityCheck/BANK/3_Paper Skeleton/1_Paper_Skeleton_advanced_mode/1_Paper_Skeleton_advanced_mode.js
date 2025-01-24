/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress by MZ]";
// const skeletonTitle = autoTest + " " + dateTime + " " + "Demo Skeleton";
// const marks = "2.1";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
// const topic = "autotest"+ " " + dateTime;
// const sectionTitle1 = "Section Title 1 " + time;
// const sectionTitle2 = "Section Title 2 " + time;
// const difficultyPercent = "25%";
// const viewMarks = "Full marks: 2.1";
// const bankMsg = {
//     skeletonCreate: 'The paper skeleton was created.',
//     skeletonUpdate: 'The paper skeleton was updated.',
//     skeletonDelete: 'The paper skeleton was deleted.',
//     skeletonFav: 'was added to My favourite paper skeletons list.'
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
//     Cypress.PageBankSkeleton.visitSkeletonBank(18000);
//     Cypress.PageBankSkeleton.createAdvancedSkeleton();
// });
// afterEach(() => {
//     cy.wait(500);
// });


// // Create Skeleton
// Given('I am in Create Skeleton page', () => {
//     Cypress.auiCommon.verifyUrl('contains', '/authoring/CreateSkeleton');
// });

// When('I enter the title of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonTitile(skeletonTitle);
// });

// And('I input the description of basic information', () => {
//     Cypress.PageBankSkeleton.enterSkeletonDescri(loremIpsum);
// });
// And('I add questions and save', () => {
//     //edit section name
//     Cypress.PageBankPaper.editPaperSection('0');
//     Cypress.PageBankSkeleton.enterSkeletonSectionName(sectionTitle1);
//     Cypress.PageBankPaper.editSectionDescri(loremIpsum);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add section question 1
//     Cypress.PageBankSkeleton.addQues('0')
//     Cypress.PageBankSkeleton.setQuesType(0);
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(0);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add section question 2
//     Cypress.PageBankSkeleton.addQues('0');
//     Cypress.PageBankSkeleton.setQuesType(0);
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(1);
//     Cypress.PageBankPaper.clickPanelSave();
// });

// And('I click on Save button', () => {
//     Cypress.PageBankSkeleton.createAdvancedSkeletonSave();
// });

// Then('I should be able to save the Skeleton', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperSkeleton');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonCreate);;
// });

// //Edit Skeleton
// Given('I am in paper skeleton page _Edit_', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
// });

// When('I search for the skeleton created _Edit_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
// });

// And('I check the checkbox of the skeleton _Edit_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click on Edit button _Edit_', () => {
//     Cypress.PageBankSkeleton.editSkeleton();
// });

// And('I edit the skeleton and add a question of the skeleton _Edit_', () => {
//     //add another section 
//     Cypress.PageBankSkeleton.addSection();
//     Cypress.PageBankSkeleton.enterSkeletonSectionName(sectionTitle2);
//     Cypress.PageBankPaper.editSectionDescri(loremIpsum);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add question for new section
//     Cypress.PageBankSkeleton.addQues('1');
//     Cypress.PageBankSkeleton.setQuesType(0);
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(2);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add another question
//     Cypress.PageBankSkeleton.setQuesDiff(3);
// });

// And('I click on Save button of add question page _Edit_', () => {
//     Cypress.PageBankPaper.clickPanelSave();
// });

// Then('I should be able to save the question _Edit_', () => {
//     Cypress.PageBankSkeleton.verifySectionTitle(3, sectionTitle2);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(0, 1, difficultyPercent);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(1, 1, difficultyPercent);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(2, 1, difficultyPercent);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(3, 1, difficultyPercent);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(0, 3, 2);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(1, 3, 4);
//     Cypress.PageBankSkeleton.verifySkeletonInfo(2, 3, '8.4');
// });

// When('I click on Save button _Edit_', () => {
//     Cypress.PageBankSkeleton.createAdvancedSkeletonSave();
// });

// Then('I should be able to see the edited information in the table displayed correctly _Edit_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperSkeleton');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonUpdate);
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankSkeleton.search(skeletonTitle);
//     Cypress.PageBankSkeleton.verifySkeletonMarks('8.4');
// });

// //View Skeleton
// Given('I am in paper skeleton page _View_', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
// });

// When('I search for the skeleton created _View_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
// });

// And('I check the checkbox of the skeleton _View_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on View button _View_', () => {
//     Cypress.PageBankSkeleton.viewSkeleton();
// });

// Then('I should be able to see the skeleton information and questions settings _View_', () => {
//     Cypress.PageBankSkeleton.verifyViewSkeletonTitle(skeletonTitle);
//     Cypress.PageBankSkeleton.verifyViewSkeletonDecri(loremIpsum);
//     Cypress.PageBankSkeleton.verifyViewSkeletonSection(0, sectionTitle1, loremIpsum);
//     Cypress.PageBankSkeleton.verifyViewSkeletonQues(0, 'Question 1', viewMarks, topic, 'None');
//     Cypress.PageBankSkeleton.verifyViewSkeletonQues(1, 'Question 2', viewMarks, topic, 'Competent');
//     Cypress.PageBankSkeleton.verifyViewSkeletonSection(1, sectionTitle2, loremIpsum);
//     Cypress.PageBankSkeleton.verifyViewSkeletonQues(2, 'Question 3', viewMarks, topic, 'Proficient');
//     Cypress.PageBankSkeleton.verifyViewSkeletonQues(3, 'Question 4', viewMarks, topic, 'Advanced');
// });

// When('I click edit button _View_', () => {
//     Cypress.PageBankSkeleton.editViewSkeleton();
// });

// Then('I should be able to see the edit view _View_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'EditSkeleton');
// });

// When('I delete a question in skeleton page and save _View_', () => {
//     Cypress.PageBankSkeleton.delSkeletonQues(0);
//     Cypress.PageBankQuestion.delConfirm();
//     Cypress.PageBankSkeleton.createAdvancedSkeletonSave();
// });

// Then('I should be able to edit skeleton from view skeleton _View_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperSkeleton');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonUpdate);
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankSkeleton.search(skeletonTitle);
//     Cypress.PageBankSkeleton.verifySkeletonMarks('6.3');
// });

// //Skeleton Show on Bank Page
// Given('I am in paper skeleton page _Favorite_', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
// });

// When('I search for the skeleton created _Favorite_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
// });

// And('I click on Show on Bank Page button _Favorite_', () => {
//     Cypress.PageBankSkeleton.favSkeleton(0);
// });

// Then('I should be able to set the skeleton favorite _Favorite_', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonFav);
// });


// And('I go back to bank homepage _Favorite_', () => {
//     Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
// });

// Then('I should be able to see the skeleton information in bank page _Favorite_', () => {
//     Cypress.PageBankSkeleton.verifyHomeSkeleton(skeletonTitle);
// });

// //Delete Skeleton
// Given('I am in paper skeleton page _Delete_', () => {
//     Cypress.PageBankSkeleton.visitSkeletonBank(8000);
// });

// When('I search for the skeleton created _Delete_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
// });

// When('I check the checkbox of the skeleton _Delete_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click on Delete button _Delete_', () => {
//     Cypress.PageBankSkeleton.delSkeleton();
// });

// And('I click on OK button _Delete_', () => {
//     Cypress.PageBankSkeleton.delConfirm();
// });

// Then('I should be able to delete the skeleton _Delete_', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.skeletonDelete);
//     Cypress.PageBankQuestion.verifyDelItem();
// });