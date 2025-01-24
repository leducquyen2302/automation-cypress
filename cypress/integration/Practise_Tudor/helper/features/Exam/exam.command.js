Cypress.ExamPage = Cypress.ExamPage || {}

let startDate = new Date();
startDate.setSeconds(startDate.getSeconds() + 30);

let endDate = new Date();
endDate.setHours(startDate.getHours() + 1);

// Get ISO strings
let startDateISO = startDate.toISOString();
let endDateISO = endDate.toISOString();

let examBody = {}

before(() => {
    cy.fixture('exam').then((examInf) => {
        examBody = examInf
        examBody.startDate = startDateISO
        examBody.endDate = endDateISO
        examBody.examName = 'Tutu Exam_' + startDate
        cy.log('exam data: ' + JSON.stringify(examBody))
    })
})

Cypress.ExamPage.createExamForCourse = () => {
    cy.log('exam data: ' + JSON.stringify(examBody))
    cy.createExamStep1ByAPI('1020', examBody)
}






