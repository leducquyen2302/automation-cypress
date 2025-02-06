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

let paperBody = [{
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
                ques1.push($ques)
            } else {
                ques2.push($ques)
            }
        })
    }).then(() => {
        paperBody[0].questions = ques1
        paperBody[1].questions = ques2
    })
})


// When(/^I prepare a new Openbook exam before taking the exam$/, () => {
//     Cypress.ExamPage.createExamForCourse()
// })

And(/^I login as candidate and go to instructions page$/, () => {
    Cypress.ExamPage.createExamForCourse('ZT-course01', 'TutuPaper_' + date, paperBody, examBody)
    cy.LoginByLocal('Scan_ZTstu01@snapmail.cc')
    Cypress.ExamPage.goToInstructionsPageOfExam(examBody.examName)
})

And(/^I enter a openbook exam$/, () => {
    Cypress.ExamPage.enterExam()
})

And(/^I answer all the questions$/, () => {
    Cypress.ExamPage.answerAllQuestions()
})

Then(/^I verify candidate submitting the answers normally$/, () => {
    Cypress.ExamPage.submitExamSuccess()
})

after(() => {
    Cypress.ExamPage.delteteExamCreated(examBody.examName)
})