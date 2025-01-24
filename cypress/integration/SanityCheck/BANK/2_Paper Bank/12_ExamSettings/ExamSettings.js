/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// var fileName =  `Bank/Import_Exam_Paper_Template.xlsx`;
// const autoTest = "[Auto Test with Cypress]";
// const paperName = autoTest + " " + dateTime + " " + "Import excel Paper";
// const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const bankMsg = {
//     paperCreate: 'The paper was created.',
//     paperUpdate: 'The paper was updated.',
//     paperDelete: 'The paper was deleted.'
// }
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// let sequenceinExcel = ['Choice - single answer',
//                     'Choice - multiple answers',
//                     'True/False',
//                     'Fill-in-the-blank',
//                     'Ordering',
//                     'Essay',
//                     'Sub-question'
//                 ];
// let candidateQindex = [1,2,3,4,5,6,7]
// afterEach(() => {
//     cy.wait(500);
// });
// after(() => {   
//     cy.DeletePaperByAPI(paperName) 
// })
// Given('I am in paper bank', () => {
//     // cy.LoginExamAsAppAdmin(false);
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(2000);
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankPaper.visitPaperBank();
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
// });
// And('I click import paper from excel', () => {
//     Cypress.PageBankPaper.clickImportExcel();
// });
// Then('I should see the popup', () => {
//     Cypress.PageBankQuestion.verifyDialogTitle("Import paper from Excel");
// });

// Given('I upload a excel file', () => {
//     Cypress.PageBankPaper.uploadFile(fileName)
// });
// And('I click Import button', () => {
//     Cypress.PageBankQuestion.importConfirm();
// });
// Then('I should see the Create paper page', () => {
//     cy.waitLoading();
//     Cypress.auiCommon.verifyUrl('contains', '/authoring/CreatePaper');
// });
// When('I input paper name', () => {
//     Cypress.PageBankPaper.enterPaperName(paperName);
// });
// And('I select a course', () => {
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
// });
// Given('I can edit exam settings [Randomaiztion]', () => {
//     Cypress.PageBankPaper.settingRandmizeQuestions(1,[0])
// });
// Then('I go to Candidate view', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
//     Cypress.PageBankPaper.clickCandidateView();
// });
// Then('I can view question display in same sequence', () => {
//     Cypress.PageBankPaper.compareQuesType(sequenceinExcel,candidateQindex,true)
// });
// Then('I exit prevew paper page', () => {
//     Cypress.PageBankPaper.clickCandidatePreviewPaperBtn(0)
// });
// Given('I can edit exam settings [No randomaiztion]', () => {
//     Cypress.PageBankPaper.settingRandmizeQuestions(0)
// });
// Then('I can view question display in different sequence', () => {
//     Cypress.PageBankPaper.compareQuesType(sequenceinExcel,candidateQindex,false)
// });
// Given(/^I verify question randomisation setting is (.*)$/, (_string) => {
//     Cypress.PageBankQuestion.clickSubQuesSettingsIndex(1)
//     Cypress.PageBankQuestion.verifyRandomiseChoiceSettinginQuestion(_string)
//     Cypress.PageBankQuestion.settingsClose()
// });
// Then(/^I edit Randomaiztion Choice to (.*) and (.*)$/, (_string,_isApply) => {
//     var choiceIndex = 1, isApplyAll = false
//     if (_string == "Yes")
//         {
//             choiceIndex = 0
//         }
//     if (_isApply == 'Apply to All')
//         {
//             isApplyAll = true
//         }
//     Cypress.PageBankPaper.settingRandmizeChoices(choiceIndex,isApplyAll) 
// });
