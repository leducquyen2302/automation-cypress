/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress Sub]";
// const skeletonTitle = autoTest + " " + dateTime + " " + "Demo Skeleton";
// const marks = "10.5";
// const subQues = autoTest + " " + dateTime + " " + "Sub-question";
// const subQuesChoiceSing = "Who is known as the father of Modern Medicine?" + " " + dateTime;
// const subQuesChoiceSingAs = ["Euclid", "Pythagoras", "Hippocrates", "Erastosthenes"];
// const subQuesChoiceMulti = "The lengths of two sides of a triangle are 5 and 7. Which of the following could be the perimeter of the triangle? Select all that apply." + " " + dateTime;
// const subQuesChoiceMultiAs = ["14", "17", "19", "22", "24", "27"];
// const subQuesEssay = "Should wealthy nations be required to share their wealth among poorer nations by providing such things as food and education?" + " " + dateTime;
// const subQuesFib1 = "Any alkane with one or more alkyl groups is automatically a"
// const subQuesFib2 = "alkane." + " " + dateTime;
// const subQuesFibA = "branched-chain";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
// const topic = "autotest";
// const sectionTitle1 = "Section Title 1 " + time;
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
// });
// afterEach(() => {
//     cy.wait(500);
// });
// after(() => {
//     cy.DeletePaperByAPI(skeletonTitle)
//     cy.DeleteQuesByAPI(autoTest) 
//     cy.DeleteSkeletonByAPI(skeletonTitle)  
// })

// //Create Skeleton with Sub-question questions
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

// And('I add Sub-question questions and save', () => {
//     //edit section name
//     Cypress.PageBankPaper.editPaperSection('0');
//     Cypress.PageBankSkeleton.enterSkeletonSectionName(sectionTitle1);
//     Cypress.PageBankPaper.editSectionDescri(loremIpsum);
//     Cypress.PageBankPaper.clickPanelSave();
//     //add section question 1
//     Cypress.PageBankSkeleton.addQues('0')
//     Cypress.PageBankSkeleton.setQuesTypeName('Sub-question');
//     Cypress.PageBankSkeleton.setQuesMarks(marks);
//     Cypress.PageBankSkeleton.setQuesTopic(topic);
//     Cypress.PageBankSkeleton.setQuesDiff(2);
//     Cypress.PageBankPaper.clickPanelSaveCreateNext();
//     //add section question 2
//     Cypress.PageBankSkeleton.setQuesDiff(0);
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

// When('I have predefined a skeleton with Sub-question question _Generate_', () => {
//     Cypress.PageBankSkeleton.search(skeletonTitle);
//     Cypress.PageBankSkeleton.verifyTableSkeletonTitle(skeletonTitle);
// });

// And('I check the the checkbox of the skeleton _Generate_', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });

// And('I click generate paper button _Generate_', () => {
//     Cypress.PageBankSkeleton.genSkeleton();
// });

// And('I select a course with Sub-question question _Generate_', () => {
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
//     //Question matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('1');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("Proficient");
//     Cypress.PageBankQuestion.settingsClose();
//     cy.scrollTo("bottom",{duration:1000})
//     //Question not matched
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('2');
//     Cypress.PageBankSkeleton.verifyGenerateTopic(topic);
//     Cypress.PageBankSkeleton.verifyGenerateDiff("None");
//     Cypress.PageBankQuestion.settingsClose();
// });

// And('I enter Paper name _Generate_', () => {
//     Cypress.PageBankPaper.enterPaperName(skeletonTitle);
// });

// And('I enter Sub-question content without matched question _Generate_', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(6, subQues);
// });
// And('I click on Add a new sub-question button to add a Choice question as a Sub-question', () => {
//     Cypress.PageBankQuestion.addSubques(1, 0);
//     Cypress.PageBankQuestion.typeMarks('2a', 2.1);
// });
// And('I input Question content and Choice value', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(5, subQuesChoiceSing, 1);
//     Cypress.PageBankQuestion.typeChoiceValue(5, subQuesChoiceSingAs, 1);
// });
// And('I set correct answer', () => {
//     Cypress.PageBankQuestion.enableCorrectAnswer(5, 2, 1);
// });
// And('I click on Add a new sub-question button to add a Choice question as a Sub-question _Generate_', () => {
//     Cypress.PageBankQuestion.addSubques(1, 0);
//     Cypress.PageBankQuestion.typeMarks('2b', 2.1);
// });
// And('I enable Multiple answers', () => {
//     Cypress.PageBankQuestion.enableMultiAnswer(6, 1);
// });
// And('I click on Add choice button', () => {
//     //Add two more choice for multiple choice sub-question
//     Cypress.PageBankQuestion.quesAddChoice('2b', 6, 1);
//     Cypress.PageBankQuestion.quesAddChoice('2b', 6, 1);
// });
// And('I input Question content and Choice value _Generate_', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(6, subQuesChoiceMulti, 1);
//     Cypress.PageBankQuestion.typeChoiceValue(6, subQuesChoiceMultiAs, 1);
// });
// And('I set correct answers', () => {
//     Cypress.PageBankQuestion.enableCorrectAnswer(6, 1, 1);
//     Cypress.PageBankQuestion.enableCorrectAnswer(6, 2, 1);
//     Cypress.PageBankQuestion.enableCorrectAnswer(6, 3, 1);
// });
// And('I click on Add a new sub-question button to add an Essay question to the specific area', () => {
//     Cypress.PageBankQuestion.addSubques(1, 1);
//     Cypress.PageBankQuestion.typeMarks('2c', 2.1);
// });
// And('I input Question content _Generate_', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(7, subQuesEssay, 1);
// });
// And('I click on Add a new sub-question button to add a Fill-in-the-blank question', () => {
//     Cypress.PageBankQuestion.addSubques(1, 2);
//     Cypress.PageBankQuestion.typeMarks('2d', 2.1);
// });
// And('I input Question content and add a blank', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(8, subQuesFib1, 1);
//     Cypress.PageBankQuestion.quesAddBlank('2d', 8, 1);
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(8, subQuesFib2, 1);
// });
// And('I input correct answer', () => {
//     Cypress.PageBankQuestion.typeFibAnswer(8, subQuesFibA, 1);
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
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankPaper.visitPaperBank();
// });
// When('I search for the paper created _Preview_', () => {
//     Cypress.PageBankQuestion.search(skeletonTitle);
// });

// And('I check the checkbox of the paper _Preview_', () => {
//     Cypress.PageBankPaper.verifyPaperMarks(18.9);
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Edit button _Preview_', () => {
//     Cypress.PageBankPaper.editPaper();
// });

// And('I click on Preview button _Preview_', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });

// Then('I should be able to see the question contents and all respective values _Preview_', () => {
//     Cypress.PageBankQuestion.verifQuesLenth(12);
// });

// //Delete Paper
// Given('I am in Paper bank page _Delete_', () => {
//     Cypress.PageAdminCommon.visitBank(20000)
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
//     Cypress.PageAdminCommon.visitBank(20000)
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
//     Cypress.PageBankQuestion.verifyDelItem();
// });