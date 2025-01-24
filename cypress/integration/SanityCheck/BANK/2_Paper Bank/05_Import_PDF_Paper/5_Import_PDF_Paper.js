/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// const { bankClass } = require("../../../../../support/AUI/bank.constants");

// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// var fileName = 'test pdf.pdf';
// const quesNum = 5;
// const autoTest = "[Auto Test with Cypress]";
// const paperName = autoTest + " " + dateTime + " " + "PDF Paper";
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
// before(() => {
//     // cy.LoginExambyUserName(false,paperCrafter);
//     cy.LoginExamAsSystem();
//     cy.wait(2000);
//     Cypress.PageAdminCommon.visitBank(20000)
//     Cypress.PageBankPaper.visitPaperBank();

// });
// afterEach(() => {
//     cy.wait(500);
// });
// after(() => {   
//     cy.DeletePaperByAPI(paperName) 
// })
// Given('I am in paper bank', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
// });
// And('I click import pdf paper', () => {
//     Cypress.PageBankPaper.clickImportPDF();
// });
// Then('I should see the popup', () => {
//     Cypress.PageBankQuestion.verifyDialogTitle("Import PDF paper");
// });

// Given('I upload a pdf file', () => {
//     Cypress.PageBankPaper.uploadFile(fileName)
// });
// And('I input PDF paper question number', () => {
//     Cypress.PageBankPaper.typeImportNum(quesNum);
// });
// And('I click Import button', () => {
//     Cypress.PageBankQuestion.importConfirm();
// });
// Then('I should see the Create PDF paper page', () => {
//     cy.waitLoading();
//     Cypress.auiCommon.verifyUrl('contains', '/authoring/CreatePaper');
// });
// Then('I should see the question number imported', () => {
//     Cypress.PageBankPaper.verifyImportNum(quesNum);
// });

// When('The PDF is loaded', () => {
//     // cy.frameLoaded(0)
// });
// Then('The PDF percentage is fit width by default', () => {
//     Cypress.PageBankPaper.verifyPDFdefaultZoom();
// });

// When('I click pdf 100% percentage', () => {
//     Cypress.PageBankPaper.clickPDFZoomListItem(2);
// });
// And('I click zoom in', () => {
//     Cypress.PageBankPaper.clickPDFZoomIn();
// });
// Then('The pdf percentage should be 110%', () => {
//     Cypress.PageBankPaper.verifyPDFValue("110%")
// });

// When('I add a section', () => {
//     Cypress.PageBankPaper.addPaperSection();
//     Cypress.PageBankSkeleton.enterSkeletonSectionName("Section2");
//     Cypress.PageBankPaper.clickPanelSave();
// });
// And('add new section question response', () => {
//     Cypress.PageBankPaper.addQuesRes(1);
// });
// Then('I should see the new question', () => {
//     Cypress.PageBankPaper.verifyImportNum(quesNum + 1);
// });
// When('I input paper name', () => {
//     Cypress.PageBankPaper.enterPaperName(paperName);
// });
// And('I select a course', () => {
//     Cypress.PageBankQuestion.clickcourse(0);
//     Cypress.PageBankQuestion.selectCourse(0);
// });

// And('I type marking scheme of one question', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(0, loremIpsum)
// });
// And('I click save button', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });
// Then('I should save the PDF paper', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperCreate);;
// });

// Given('pdf paper has already been imported', () => {
//     Cypress.auiCommon.closeToast();
//     Cypress.PageBankQuestion.search(paperName);
// });

// When('I check PDF paper item', () => {
//     Cypress.PageBankQuestion.checkItem(1);
// });
// And('I click Edit paper button', () => {
//     Cypress.PageBankPaper.editPaper();
// });
// Then('I should see edit pdf paper page', () => {
//     Cypress.auiCommon.verifyBreadcrumb('Edit paper');
//     Cypress.PageBankPaper.verifyImportNum(quesNum + 1);
// });
// When('I type question marking scheme', () => {
//     Cypress.PageBankQuestion.clickTypeRichTextEditor(1, loremIpsum)
// });
// And('I delete a question response', () => {
//     Cypress.PageBankPaper.delQuesRes();
//     Cypress.PageBankSkeleton.delConfirm();
// });
// And('I click save button _Edit_', () => {
//     Cypress.PageBankPaper.savePaperComplete();
// });
// Then('I should save the PDF paper _Edit_', () => {
//     Cypress.auiCommon.verifyUrl('contains', 'PaperBank');
//     Cypress.PageBankQuestion.verifyToast(bankMsg.paperUpdate);;
// });
// Given('In edit PDF paper page', () => {
//     Cypress.PageBankQuestion.checkItem(1);
//     Cypress.PageBankPaper.editPaper();
// });
// When('I click preview', () => {
//     Cypress.PageBankPaper.clickPaperPreview();
// });
// Then('I should see questions and marking scheme', () => {
//     Cypress.PageBankPaper.verifyImportNum(quesNum);
//     Cypress.PageBankPaper.verifyMarkingScheme(0, loremIpsum)
//     Cypress.PageBankPaper.verifyMarkingScheme(1, loremIpsum)
// });
// When('I click candidate view', () => {
//     Cypress.PageBankPaper.clickCandidateView();
// });
// Then('I should see left panel and can drag splitter', () => {
//     Cypress.PageBankPaper.verifyLeftNaviQuesNum(quesNum);
//     Cypress.PageBankPaper.dragPDFCandidateView(600, 800);
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