let startDate = new Date();
startDate.setMinutes(startDate.getMinutes() + 1)
startDate.setSeconds(0)
startDate.setMilliseconds(0)

let endDate = new Date();
endDate.setHours(startDate.getHours() + 1)
endDate.setMinutes(startDate.getMinutes())
endDate.setSeconds(0)
endDate.setMilliseconds(0)

// Get ISO strings
let startDateISO = startDate.toISOString()
let endDateISO = endDate.toISOString()

let candidate1 = {
    name: 'Scan_ztstu01',
    userId: 'Scan_ZTstu01@snapmail.cc'
}

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
        examBody.startDate = startDateISO
        examBody.endDate = endDateISO
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
    Cypress.ExamPage.createExamForCourse('ZT-course01', 'TutuPaper_' + date, paperBody, examBody,'close book')
    cy.LoginExamAsSystem()
    Cypress.ExamPage.filterExamHasNameAndViewDetail(examBody.examName)
    Cypress.ExamPage.verifyResultBeforeCandidateSubmitAttendancePage(candidate1.userId)
})

And(/^I verify exam in Marking page before submit$/, () => {
    Cypress.ExamPage.verifyResultBeforeCandidateSubmitMarkingPage(candidate1.name)
})

And(/^I verify exam in the Grading page before submit$/, () => {
    Cypress.ExamPage.verifyResultBeforeCandidateSubmitGradingPage(candidate1.userId)
    cy.logoutApi()
})

after(() => {
    Cypress.ExamPage.delteteExamCreated(examBody.examName)
})