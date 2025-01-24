/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let StudentExamName1 //= `AT_Exam_Sta ${new Date().toLocaleString().split(',')[0]}`
let StudentExamName2 //= `AT_Exam_Student_Sta ${new Date().toLocaleString().split(',')[0]}`
let StuSta1 = "Upcoming"
let StuSta2 = 'Enter exam'
let StuSta3 = 'Overdue'
let candidate = ""

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    candidate = env[ct].Candidates[0]

    cy.fixture('ExamStatus.json').then(($exams) => {
        // This data need 04_ExamStatus running first
        let len = $exams.length
        if (len != 0) {
            StudentExamName1 = $exams[len - 2].examInfo.name
            StudentExamName2 = $exams[len - 1].examInfo.name
        }
        else {
            StudentExamName1 = $exams[0].examInfo.name
            StudentExamName2 = $exams[1].examInfo.name
        }
        cy.log(StudentExamName1)
        cy.log(StudentExamName2)
    })
})

//Scenario:学生从Home页面跳转到Exam页面
Given(/^学生已经登录到系统$/, () => {
    cy.LoginByLocal(candidate.userid)
});
When(/^点击See all的link$/, () => {
    Cypress.PageStudentExam.clickSeeAlllink()
});
Then(/^跳转到Exam Hompage页面$/, () => {
    Cypress.auiCommon.verifyBreadcrumb('Exam')
});

//Scenario:Student查看Upcoming Exam
Given(/^学生在Exam页面Search,找到距开始时间大于30分钟的考试$/, () => {
    Cypress.PageExamHome.searchExam(StudentExamName2)
})
Then(/^Exam Card的title name正确$/, () => {
    let card = {
        title: StudentExamName2
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
    //cy.get('.exam-card').eq(0).contains(StudentExamName2)
});
Then('Exam Card的状态是 ' + StuSta1, () => {
    let card = {
        title: StudentExamName2,
        status: 'upcoming'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});

//Scenario:学生查看Exam in progress
Given(/^学生在Exam页面Search,找到已经开始的考试$/, () => {
    Cypress.PageExamHome.searchExam(StudentExamName1)
});
Then('Exam Card的状态是 ' + StuSta2, () => {
    let card = {
        title: StudentExamName1,
        status: 'ongoing'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});

//Scenario:学生查看Overdue状态的Exam
Given(/^学生在Exam页面Search,找到已经结束的考试$/, () => {
    Cypress.PageAdminCourse.clearSearch()
    cy.wait(2000)
    Cypress.PageExamHome.selectDateFilter('spdate', -1)
});
Then('Exam Card的状态是 ' + StuSta3, () => {
    StudentExamName2 = 'ATExam_StudentSta'
    let card = {
        title: StudentExamName2,
        status: 'overdue'
    }
    Cypress.PageExamHome.searchExam(StudentExamName2)
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});
