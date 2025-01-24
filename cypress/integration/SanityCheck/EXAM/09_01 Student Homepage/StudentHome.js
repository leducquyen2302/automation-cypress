/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let CurrentUserExamApi = '/schedule/api/exam/getallexamsbycurrentuser'
let candidate = ""
let mockExams = {}
const popup = 'The closed-book exam requires candidates to take the exam in Examena app. Please install Examena app in advance. The Examena app will end all other running tasks during exam and ensure your online exam secure and undisrupted.'

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    candidate = env[ct].Candidates[0]

    let mockDataPath = 'Mock/MockStudentExamHome.json'
    cy.fixture(mockDataPath).then(($exams) => {
        mockExams = $exams
        cy.rewriteMockExamTime(mockDataPath, mockExams)
    })
    cy.intercept('POST', CurrentUserExamApi,
        {
            fixture: mockDataPath
        })
})

// Scenario: 学生登录系统，查看Student HomePage
Given(/^作为学生登录到系统$/, () => {
    cy.LoginByLocal(candidate.userid)
    cy.waitLoading()
});
Then(/^我可以在Hompage页面看见我的欢迎信息，2个Ongoing，2个Upcoming$/, () => {
    let username = candidate.name
    let count1 = 2, count2 = 2
    let welcomeMsg = {
        title: `Hi ${username}`,
        content: `You have ${count1} exams ongoing and ${count2} exams on the way. Please be well-prepared!`,
        sampletext: 'To get familiar with the system, you can start with the sample exam. '
    }
    Cypress.PageStudentExam.verifyWelcomeConent(welcomeMsg)
});

// Scenario: Ongoing Exam
Given(/^Exam1是Ongoing Close Book，Exam2是Ongoing Open Book$/, () => { });
Then(/^可以看见Exam1的Enter Exam亮起，Type显示Close book图标和tip$/, () => {
    let card1 = {
        title: mockExams.result[0].examName,
        time: new Date().getTime(),
        totalQues: 60,
        fullScore: 120,
        // examType: 'Closed-book',
        // popup: popup,
        status: 'ongoing'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card1)
});
Then(/^可以看见Exam2的Enter Exam亮起，Type显示Open book$/, () => {
    let card2 = {
        title: mockExams.result[1].examName,
        totalQues: 4,
        fullScore: 24.5,
        examType: 'Open-book',
        status: 'ongoing'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(1, card2)
});

// Scenario: Upcoming Exam
Given(/^Exam3是Upcoming Close Book，Exam4是Upcoming Open Book$/, () => { });
Then(/^可以看见Exam3的Status显示Upcoming，Enter exam不可用，Type显示Close book图标和tip$/, () => {
    let card3 = {
        title: mockExams.result[2].examName,
        totalQues: 1,
        fullScore: 6.5,
        examType: 'Closed-book',
        popup: popup,
        status: 'upcoming'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(2, card3)
});
Then(/^可以看见Exam4的Status显示Upcoming，Enter exam不可用，Type显示Open book$/, () => {
    let card4 = {
        title: mockExams.result[3].examName,
        totalQues: 4,
        fullScore: 24.5,
        examType: 'Open-book',
        status: 'upcoming'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(3, card4)

});