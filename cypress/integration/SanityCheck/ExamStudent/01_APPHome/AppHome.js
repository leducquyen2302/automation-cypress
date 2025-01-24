/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let Stu = '', examInfo0 = {}, examInfo2 = {}, cardIndex = ''

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    Stu = env[ct].Candidates[0]

    cy.fixture("examInfo").then(($basic) => {
        examInfo0 = $basic[0].examInfo
        examInfo2 = $basic[2].examInfo
    })
})

// Scenario: Candidate登陆Examena
Given(/^作为学生Logon Examena$/, () => {
    cy.LoginByLocal(Stu.userid)
    Cypress.PageAdminCommon.visitHome(5000)
})
Then(/^登录成功，看见WelCome Message和给他准备的3个考试$/, () => {
    let welcome = {
        title: `Hi ${Stu.name}`
    }
    Cypress.PageStudentExam.verifyWelcomeConent(welcome)
});

//Scenario: Ongoing Exam
Given(/^第一个考试即将开始，距离开始时间不足30分钟$/, () => { });
Then(/^Card状态显示Enter Exam，button可点击$/, () => {
    Cypress.PageStudentExam.clickSeeAlllink()
    Cypress.PageExamHome.searchExam(examInfo0.name)
    let card1 = {
        title: examInfo0.name,
        totalQues: examInfo0.sections.questNo,
        fullScore: examInfo0.sections.fullScore,
        status: 'ongoing'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card1)
});

// Scenario: Upcoming
Given(/^第三个考试距离开始还有1小时$/, () => { });
Then(/^Card状态显示Upcoming，Enter Exam button不会亮起$/, () => {
    Cypress.PageExamHome.searchExam(examInfo2.name)
    let card1 = {
        title: examInfo2.name,
        totalQues: examInfo2.sections.questNo,
        fullScore: examInfo2.sections.fullScore,
        status: 'upcoming'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card1)
});

// Scenario: Enter the first exam， Check Instruction and Exam Info
When(/^Enter the first exam, jump into the Instruction page$/, () => {
    Cypress.PageStudentTakeSampleExam.enterStartExamPage(examInfo0.examId)
});
Then(/^Studnet should see Server connect icon by default$/, () => {
    Cypress.auiCommon.verifyUrl('include', '/Instruction?examId')
    Cypress.PageStudentTakeExam.verifyServerConnect('Server connected')
})
Then(/^Student should see the Instruction$/, () => {
    let ins_content = examInfo0.instruction.replace(/\r\n/g, ' ')
    //Cypress.PageStudentTakeExam.verifyExamInstruction(ins_content)
});
Then(/^Student should see Exam informations are right$/, () => {
    Cypress.PageStudentTakeExam.clickExamInfo()
    let examInfo = {
        userId: Stu.userid,
        courseCode: examInfo0.courseCode,
        examName: examInfo0.name,
        fullMark: examInfo0.sections.fullScore,
        sectionNo: examInfo0.sections.sectNo,
        questionNo: examInfo0.sections.questNo,
        instruction: examInfo0.instruction,
    }
    Cypress.PageStudentTakeExam.verifyExamInfo(examInfo)
});
