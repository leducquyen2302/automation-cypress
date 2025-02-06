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

// Scenario: Course manager verify result before taking
Given(/^I login as course management verify in the Attendance page before submit$/, () => {
    Cypress.ExamPage.createExamForCourse('ZT-course01', 'TutuPaper_' + date, paperBody, examBody)
    cy.LoginExamAsSystem()
    Cypress.ExamPage.filterExamHasNameAndViewDetail(examBody.examName)
    Cypress.ExamPage.verifyResultBeforeCandidateSubmitAttendancePage('Scan_ZTstu01@snapmail.cc')
})

And(/^I verify exam in Marking page before submit$/, () => {
    Cypress.ExamPage.verifyResultBeforeCandidateSubmitMarkingPage('Scan_ZTstu01@snapmail.cc')
})
And(/^ verify exam in the Grading page and publish score to candidate before submit$/, () => {
    
    cy.logoutApi()
})


//Scenario: Candidate taking exam
And(/^I login as candidate and go to instructions page$/, () => {
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
    cy.logoutApi()
})


//Scenario: Course manager verify result after taking
Given(/^I login as course management verify in the Attendance page after submit$/, () => {
    cy.LoginExamAsSystem()
    Cypress.ExamPage.filterExamHasNameAndViewDetail(examBody.examName)
    Cypress.ExamPage.verifyResultAfterCandidateSubmitAttendancePage('Scan_ZTstu01@snapmail.cc')

})

Then(/^I verify exam in Marking page after submit$/, () => {
    Cypress.ExamPage.verifyResultAfterCandidateSubmitMarkingPage('Scan_ZTstu01@snapmail.cc')
})

And(/^I verify exam in the Score page after submit$/, () => {
    // Cypress.ExamPage.()
})

And(/^I verify exam in the Grading page and publish score to candidate after submit$/, () => {
    // Cypress.ExamPage.()
})
after(() => {
    Cypress.ExamPage.delteteExamCreated(examBody.examName)
})