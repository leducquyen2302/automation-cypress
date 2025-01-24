/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// const bankMsg = {
//     paperImport: 'questions were imported.',
//     paperUpdate: 'The paper was updated.',
//     paperDelete: 'The paper was deleted.'
// }
// var courseCode;
// var pName
// var re = /[\\\/\:\*\?\"\<\>\|]+/g
// let current = Cypress.env('current_Env')
// let ct = Cypress.env('current_ten')
// let env = Cypress.env(current)
// let paperCrafter = env[ct].paperCrafter[0].userid
// before(() => {
//     // cy.LoginExamAsAppAdmin(false);
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(2000);
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankPaper.visitPaperBank();
// });
// afterEach(() => {
//     cy.wait(500);
// });
// Given('I am in paper bank', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
// });
// When('I select one paper', () => {
//     Cypress.PageExamMark.Gettablevalue(1,2).then(($res)=>{
//         courseCode = $res.text() 
//     })
//     Cypress.PageExamMark.Gettablevalue(1,3).then(($res)=>{
//         pName = $res.text()
//     })
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click export QTI paper button', () => {
//     Cypress.PageBankPaper.clickExportQTI();
// });
// Then('I should see the popup', () => {
//     Cypress.PageBankQuestion.verifyDialogTitle("Export to QTI paper");
//     Cypress.PageBankQuestion.checkItem(0);
// });
// Then('I can check the include content checkbox', () => {
//     Cypress.PageBankQuestion.checkBoxInDialog(0);
//     Cypress.PageBankQuestion.verifycheckBoxInDialog('false');
//     Cypress.PageBankQuestion.checkBoxInDialog(0);
// });
// Then('I choose QTI file format', () => {
//     Cypress.PageBankQuestion.clickcourseInDialog(0);
//     Cypress.PageBankQuestion.selectCourseInDialog(1);
// });
// Then('I click OK button', () => {
//     Cypress.PageBankQuestion.exportConfirm();
// });

// Given('I am in paper bank _Import_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
// });
// And('I click import QTI paper button _Import_', () => {
//     Cypress.PageBankPaper.clickImportQTI();
// });
// Then('I should see the popup _Import_', () => {
//     Cypress.PageBankQuestion.verifyDialogTitle("Import QTI paper");
// });

// Given('I upload a word file', () => {
//     var fileName = courseCode + '_' + pName + "_QTI_Package.zip"
//     fileName = fileName.replace(re,"_")
//     var filePath = '../downloads/' + fileName;
//     Cypress.PageBankPaper.uploadFile(filePath)
// });
// And('I select a course', () => {
//     Cypress.PageBankQuestion.clickcourseInDialog(0);
//     Cypress.PageBankQuestion.selectCourseInDialog(0);
// });
// And('I click Import button', () => {
//     Cypress.PageBankQuestion.importConfirm();
// });
// Then('I should see the created paper', () => {
//     cy.waitLoading();
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperImport);
// });