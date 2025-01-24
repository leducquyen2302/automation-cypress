Cypress.ExamPage = Cypress.ExamPage || {}

// let startDate = new Date();
// startDate.setMinutes(startDate.getMinutes() + 2)
// startDate.setSeconds(0)
// startDate.setMilliseconds(0)

// let endDate = new Date();
// endDate.setHours(startDate.getHours() + 1)
// endDate.setSeconds(0)
// endDate.setMilliseconds(0)

// // Get ISO strings
// let startDateISO = startDate.toISOString();
// let endDateISO = endDate.toISOString();

let examBody = {}

before(() => {
    cy.fixture('exam').then((examInf) => {
        examBody = examInf
        // examBody.startDate = startDateISO
        // examBody.endDate = endDateISO
        examBody.examName = 'Tutu Exam_' + examBody.startDate
    })
})

Cypress.ExamPage.createExamForCourse = () => {
    cy.log('exam data: ' + JSON.stringify(examBody))
    cy.createExamStep1ByAPI('ZT-course01', examBody)
}






