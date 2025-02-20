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

// And('I click save button', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });
// Then('I should save the excel paper', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);;
// });

// Given('Excel paper has already been imported', () => {
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankQuestion.search(paperName);
// });

// When('I check excel paper item', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click Edit paper button', () => {
//     Cypress.PageBankPaper.editPaper();
// });
// Then('I should see edit excel paper page', () => {
//     Cypress.auiCommon.verifyBreadcrumb('Edit paper');
//     Cypress.PageBankPaper.verifyImportNum('9');
// });
// When('I type question marking scheme', () => {
//     Cypress.PageBankQuestion.clickQuesSettingsIndex('1');
//     Cypress.PageBankQuestion.settingsTypeMarkingScheme(loremIpsum);
// });
// And('I click save button _Edit_', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });
// Then('I should save the excel paper _Edit_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperUpdate);;
// });
// Given('In edit excel paper page', () => {
//     Cypress.PageBankQuestion.checkItem(1);
//     Cypress.PageBankPaper.editPaper();
// });
// When('I click preview', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });
// Then('I should see questions and marking scheme', () => {
//     Cypress.PageBankPaper.verifyMarkingScheme(0, loremIpsum)
// });

// When('I click paper bank breadcrumb', () => {
//     Cypress.PageBankPaper.clickBankBreadcrumb();
// });
// And('I check the checkbox of the paper', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click on Delete button', () => {
//     Cypress.PageBankPaper.deletePaper();
// });
// And('I click on OK button', () => {
//     Cypress.PageBankQuestion.delConfirm();
// });
// Then('I should be able to delete the paper', () => {
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperDelete);
// });