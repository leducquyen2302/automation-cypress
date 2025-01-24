/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let username = ''
let allExamName = []
const fileUploadName = 'test pdf.pdf'
before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    username = env[ct].Candidates[0].userid
})
before(() => {
    cy.fixture("testExam_json").then(($examName) => {
        allExamName = $examName
    })
})
Given(/^Student upload question$/, () => {
    cy.LoginByLocal(username)
    // for (let i = 0; i < 500; i++) {
    Cypress.PageAdminCommon.visitExam(5000)
    cy.wait(500)
    // cy.log(allExamName[i].examAndPaperName)
    // Cypress.PageExamHome.searchExam(allExamName[i].examAndPaperName)
    Cypress.PageExamHome.searchExam('bluo1455_Copy_Copy')
    cy.wait(2000)
    Cypress.PageStudentExam.enterExam(0)
    // Cypress.PageStudentTakeExam.startNow()
    cy.wait(10000)
    Cypress.PageBankPaper.uploadFile(fileUploadName)
    // cy.get('[aria-label="Supported file types: DOC; DOCX; PPTX; PPT; XLS; XLSX; CSV; TXT; WPD; WPS; XML; HTML; HTM; MP3; MPA; WAV; WMA; AVI; FLV; M4V; MOV; MP4; MPG; WMV; SWF; 3GP; JPG; PNG; BMP; ZIP; GIF; RAR; 7Z; DAT; RTF; JPEG; PDF."] input')
    //     .attachFile(fileUploadName, { force: true, encoding: 'utf8' })
    cy.wait(2000)
    // Cypress.PageStudentTakeExam.nextQuestion()
    // Cypress.PageBankPaper.uploadFile(fileUploadName)
    // Cypress.PageStudentTakeExam.endExam()
    // }
});