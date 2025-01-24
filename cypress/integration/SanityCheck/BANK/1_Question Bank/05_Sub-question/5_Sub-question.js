/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// const autoTest = "[Auto Test with Cypress Sub]";
// const subQues = autoTest + " " + dateTime + " " + "Sub-question";
// const subQuesChoiceSing = "Who is known as the father of Modern Medicine?" + " " + dateTime;
// const subQuesChoiceSingAs = ["Euclid", "Pythagoras", "Hippocrates", "Erastosthenes"];
// const subQuesChoiceMulti = "The lengths of two sides of a triangle are 5 and 7. Which of the following could be the perimeter of the triangle? Select all that apply." + " " + dateTime;
// const subQuesChoiceMultiAs = ["14", "17", "19", "22", "24", "27"];
// const subQuesEssay = "Should wealthy nations be required to share their wealth among poorer nations by providing such things as food and education?" + " " + dateTime;
// const subQuesTruefalse = "There is an Internet-based company that provides online support services for businesses that need help in setting up and maintaining their websites."
// const subQuesFib1 = "Any alkane with one or more alkyl groups is automatically a"
// const subQuesFib2 = "alkane." + " " + dateTime;
// // const subQuesFib = subQuesFib1 + " _BLANK1_ " +subQuesFib2;
// const subQuesFibA = "branched-chain";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const topic = "autotest";
// const marks = "2.1";
// const bankMsg = {
//     quesCreate: 'The question was created.',
//     quesUpdate: 'The question was updated.',
//     quesDelete: 'The question was deleted.'
// }
// const quesTable = [
//     {
//         "tablename": "quesContent",
//         "value": subQues
//     },
//     {
//         "tablename": "type",
//         "value": "Sub-question"
//     },
//     {
//         "tablename": "marks",
//         "value": 5
//     },
//     {
//         "tablename": "topic",
//         "value": ""
//     },
//     {
//         "tablename": "difficulty",
//         "value": "None"
//     }
// ]
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// before(() => {
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(3000);
//     Cypress.PageAdminCommon.visitBank(20000);
//     Cypress.PageBankQuestion.createQuestion();
// });
// afterEach(() => {
//     cy.wait(500);
// });

// // Create Sub-question
// Given('I am in Create question page', () => {
//     Cypress.auiCommon.verifyUrl('contains', '/authoring/CreateQuestion');
// });
// When('I select a course', () => {
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
// });
// And('I drag a Sub-question to the specific area', () => {
//     Cypress.PageBankQuestion.dragSubQuestion();
// });
// And('I input Question content', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, subQues);
// });
// And('I click on Add a new sub-question button to add a Choice question as a Sub-question', () => {
//     Cypress.PageBankQuestion.addSubques(0, 0);
// });
// And('I input Question content and Choice value', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, subQuesChoiceSing, 1);
//     Cypress.PageBankQuestion.typeChoiceValue(0, subQuesChoiceSingAs, 1);
// });
// And('I set correct answer', () => {
//     Cypress.PageBankQuestion.enableCorrectAnswer(0, 2);
// });
// And('I click on Add a new sub-question button to add a Choice question as a Sub-question _Create_', () => {
//     Cypress.PageBankQuestion.addSubques(0, 0);
// });
// And('I enable Multiple answers', () => {
//     Cypress.PageBankQuestion.enableMultiAnswer(1, 1);
// });
// And('I click on Add choice button', () => {
//     //Add two more choice for multiple choice sub-question
//     Cypress.PageBankQuestion.quesAddChoice('b', 1, 1);
//     Cypress.PageBankQuestion.quesAddChoice('b', 1, 1);
// });
// And('I input Question content and Choice value _Create_', () => {
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
// And('I input Question content _Create_', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(2, subQuesEssay, 1);
// });
// And('I click on Add a new sub-question button to add a Fill-in-the-blank question', () => {
//     Cypress.PageBankQuestion.addSubques(0, 2);
// });
// And('I input Question content and add a blank', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, subQuesFib1, 1);
//     cy.wait(1000);
//     Cypress.PageBankQuestion.quesAddBlank('d', 3, 1);
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(3, subQuesFib2, 1);
// });
// And('I input correct answer', () => {
//     Cypress.PageBankQuestion.typeFibAnswer(3, subQuesFibA, 1);
// });
// And('I click on Add a new sub-question button to add an True or False question to the specific area', () => {
//     Cypress.PageBankQuestion.addSubques(0, 6);
// });
// And('I input TrueFalse question content', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(4, subQuesEssay, 1);
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
//     Cypress.PageBankQuestion.search(subQues);
// });
// Then('I should be able to see the information in the table displayed correctly', () => {
//     Cypress.PageBankQuestion.verifyQuesBankTable(quesTable);
// });

// // Preview Sub-question
// Given('I am in Question bank page _Preview_', () => {
//      Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.visitQuesBank();
// });
// When('I search for the question created _Preview_', () => {
//     Cypress.PageBankQuestion.search(subQues);
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
// Then('I should be able to see the question content and all respective values _Preview_', () => {
//     // Question Content
//     Cypress.PageBankQuestion.verifyPreviewQuesContent(0, subQues);
//     // First Sub-question
//     Cypress.PageBankPaper.verifyPreviewChoiceQues(0, subQuesChoiceSing, subQuesChoiceSingAs);
//     // Second Sub-question
//     Cypress.PageBankPaper.verifyPreviewChoiceQues(1, subQuesChoiceMulti, subQuesChoiceMultiAs);
//     // Third Sub-question
//     Cypress.PageBankQuestion.verifyPreviewEssayQues(3, subQuesEssay);
//     // Fourth Sub-question
//     Cypress.PageBankQuestion.verifyPreviewFibQues(4, subQuesFib1, subQuesFib2, subQuesFibA);
// });

// // Edit Sub-question
// Given('I am in Question bank page _Edit_', () => {
//      Cypress.PageAdminCommon.clickLeftNaviByKey('Bank');
//     Cypress.PageBankQuestion.visitQuesBank();
// });
// When('I search for the question created _Edit_', () => {
//     Cypress.PageBankQuestion.search(subQues);
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
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
//     //Edit marks
//     Cypress.PageBankQuestion.typeMarks('a', marks);
//     Cypress.PageBankQuestion.typeMarks('b', marks);
//     Cypress.PageBankQuestion.typeMarks('c', marks);
//     Cypress.PageBankQuestion.typeMarks('d', marks);
//     Cypress.PageBankQuestion.typeMarks('e', marks);
// });
// And('I edit the settings on the first sub-question _Edit_', () => {
//     Cypress.PageBankQuestion.clickSubQuesSettingsIndex('a');
//     Cypress.PageBankQuestion.settingsTypeMarkingScheme(loremIpsum);
//     Cypress.PageBankQuestion.clickSettingsSaveBtn()
    
// });
// When('I click on Save button _Edit_', () => {
//     Cypress.PageBankQuestion.createQuestionSave();
// });
// Then('I should be able to save the question _Edit_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.quesUpdate);
// });
// When('I search for the question edited _Edit_', () => {
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankQuestion.search(subQues);
// });
// Then('I should be able to see the edited information in the table displayed correctly _Edit_', () => {
//     Cypress.PageBankQuestion.verifyQuesMarks('10.5');
//     Cypress.PageBankQuestion.verifyEditQues(topic, 'Proficient');
// });