/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// var exam = {},ExamName;
// const gradeMsg = {
//     startGeneratePDF: 'Start generating candidate responses PDF files. You can click ',
//     finishGeneratePDF: 'Candidate responses PDF files were generated. You can click'
//     };
// const processesMsg = {
//     Allpdfsuccessful : ["PDF files for","all submitted candidates","of exam","were generated."],
//     Onepdfsuccessful :  ["PDF files for","of exam","were generated."],
//     deleteSuccessful : 'The process record was deleted.',
//     clearAllSuccessfull : 'The process records were deleted.',
//     pdfActionTimeMsg : 'Generated at'
// };
// Given('Go to Grading page', () => {
//     cy.LoginExamAsExamAdmin(false)
//     Cypress.PageAdminCommon.visitExam(8000)
//     cy.fixture('MarkExamInfo').then(($exam) => {
//         exam = $exam.examInfo
//         ExamName = exam.name
//         Cypress.PageExamMark.searchExam(ExamName)
//         Cypress.PageExamGrade.enterGradingProgress(0)
//     })
// });
// Then(/^Click Generate PDF for Candidate(.*)$/, (_CNo) => {
//     Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox(_CNo)
//     Cypress.PageExamGrade.clickGeneratePDFforSelected()
// });
// Then('Click Generate button in panel', () => {
//     Cypress.PageExamGrade.clickDownload()
//    Cypress.PageProcesses.verifyToast(gradeMsg.startGeneratePDF);
//     Cypress.auiCommon.closeToast()
//    Cypress.PageProcesses.verifyToast(gradeMsg.finishGeneratePDF);
//     Cypress.auiCommon.closeToast()
// });
// Then('Click Generate PDF for All', () => {
//     Cypress.PageExamGrade.clickGeneratePDFforAll()
// });
// Given('Enter Processes page', () => {
//     Cypress.PageAdminCommon.visitHome(8000) 
//     Cypress.PageProcesses.clickProcesses()
// });
// Then('The Generate PDF job infomation display in process page', () => {
//     Cypress.PageProcesses.verifyActionMsg(0,processesMsg.Allpdfsuccessful)
//     Cypress.PageProcesses.verifyTimeMsg(0,processesMsg.pdfActionTimeMsg) 
//     Cypress.PageProcesses.verifyActionMsg(1,processesMsg.Onepdfsuccessful)
//     Cypress.PageProcesses.verifyTimeMsg(1,processesMsg.pdfActionTimeMsg) 
// });
// Then('Delete a record', () => {
//     Cypress.PageProcesses.clickDeleteItemBtn(0);
//     Cypress.PageProcesses.confirmDel(true);
//    Cypress.PageProcesses.verifyToast(processesMsg.deleteSuccessful);
//     Cypress.auiCommon.closeToast();
// });
// Then('Clear all record in processes page', () => {
//     Cypress.PageProcesses.clickClearAllBtn();
//     Cypress.PageProcesses.confirmDel(true);
//    Cypress.PageProcesses.verifyToast(processesMsg.clearAllSuccessfull);
//     Cypress.auiCommon.closeToast();
// });