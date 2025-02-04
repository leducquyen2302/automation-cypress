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


let ques1 = []
let ques2 = []
let date = new Date().toLocaleString()

let section = [{
    "name": "Section A",
    "description": "",
    "order": 1,
    "allowRandom": false,
    "questions": ques1
},
{
    "name": "Section B",
    "description": "",
    "order": 2,
    "allowRandom": false,
    "questions": ques2
}]
let examBody = {}

before(() => {
    cy.fixture('exam').then((examInf) => {
        examBody = examInf
        // examBody.startDate = startDateISO
        // examBody.endDate = endDateISO
        examBody.examName = 'Tutu Exam_' + date
    })
    cy.fixture("question").then(($q) => {
        $q.forEach(($ques, index) => {
            if (index % 2 === 0) {
                ques1.push($ques); // Add to Section A
            } else {
                ques2.push($ques); // Add to Section B
            }
        })
    }).then(() => {
        section[0].questions = ques1
        section[1].questions = ques2
    })
})

Cypress.ExamPage.createExamForCourse = () => {
    cy.log('examBody   = ' + JSON.stringify(examBody))
    cy.createExamAndPublishExamByAPI('ZT-course01', 'TutuPaper_' + date, section, examBody)
}
Cypress.ExamPage.delteteExamCreated = () => {
    cy.deleteExamByAPI(examBody.examName)
    cy.log('delete exam name   = ' + JSON.stringify(examBody.examName))

}
Cypress.ExamPage.deltetePaperCreated = () => {
    cy.deletePaperByAPI('TutuPaper_' + date)
    cy.log('delete paper name   = ' + 'TutuPaper_' + date)
}






