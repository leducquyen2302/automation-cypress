/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const bankMsg = {
    quesImport: 'QTI questions were imported.',
    quesUpdate: 'The question was updated.',
    quesDelete: 'The questions were deleted.'
}
var courseCode;
var qType;
var re = /[\\\/\:\*\?\"\<\>\|]+/g
let current = Cypress.env('current_Env')
let ct = Cypress.env('current_ten')
let env = Cypress.env(current)
let paperCrafter = env[ct].paperCrafter[0].userid
before(() => {
    // cy.LoginExambyUserName(false,paperCrafter);
    cy.LoginExamAsSystem();
    cy.waitLoading()
    cy.wait(2000);
    Cypress.PageAdminCommon.visitBank(20000)
    Cypress.PageBankQuestion.visitQuesBank();

});
afterEach(() => {
    cy.wait(500);
});
Given('I am in question bank', () => {
    Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
});
When('I select one question', () => {
    Cypress.PageExamMark.Gettablevalue(1,2).then(($res)=>{
        courseCode = $res.text() 
    })
    Cypress.PageExamMark.Gettablevalue(1,4).then(($res)=>{
        qType = $res.text()      
    })
    Cypress.PageBankQuestion.checkItem(1);
});
And('I click export QTI questions button', () => {
    Cypress.PageBankPaper.clickExportQTI();
});
Then('I should see the popup', () => {
    Cypress.PageBankQuestion.verifyDialogTitle("Export to QTI questions");
});
Then('I can check the include content checkbox', () => {
    Cypress.PageBankQuestion.checkBoxInDialog(0);
    Cypress.PageBankQuestion.verifycheckBoxInDialog('false');
    Cypress.PageBankQuestion.checkBoxInDialog(0);
});
Then('I choose QTI file format', () => {
    Cypress.PageBankQuestion.clickcourseInDialog(0);
    Cypress.PageBankQuestion.selectCourseInDialog(1);
});
Then('I click OK button', () => {
    Cypress.PageBankQuestion.exportConfirm();
});

Given('I am in question bank _Import_', () => {
    Cypress.auiCommon.verifyUrl('contains', 'QuestionBank');
});
And('I click import QTI questions button _Import_', () => {
    Cypress.PageBankPaper.clickImportQTI();
});
Then('I should see the popup _Import_', () => {
    Cypress.PageBankQuestion.verifyDialogTitle("Import QTI questions");
});

Given('I upload a word file', () => {
    var fileName = courseCode + '_' + qType + "_QTI_Package.zip"
    fileName = fileName.replace(re,"_")
    var filePath = '../downloads/' + fileName;
    Cypress.PageBankPaper.uploadFile(filePath)
});
And('I select a course', () => {
    Cypress.PageBankQuestion.clickcourseInDialog(0);
    Cypress.PageBankQuestion.selectCourseInDialog(0);
});
And('I click Import button', () => {
    Cypress.PageBankQuestion.importConfirm();
});
Then('I should see the created questions', () => {
    cy.waitLoading();
    Cypress.PageBankQuestion.verifyToast(bankMsg.quesImport);
});