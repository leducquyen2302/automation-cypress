/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let StaffSta1 = 'Exam is coming', StaffSta2 = 'Proctoring', StaffSta3 = 'Marking'
let examName = 'ATExam_Sta'
let examName2 = 'ATExam_StudentSta '
let paperName1 = 'ATPaper_ExamSta_1 ' + new Date().toLocaleString()
let paperName2 = 'ATPaper_ExamSta_2 ' + new Date().toLocaleString()
let filePath = 'ExamStatus.json'
let section_temp = [
    {
        name: "AT Section 1",
        description: "",
        order: 1,
        questions: []
    }
]
let examInfo = {
    name: "",
    courseCode: "AT001",
    courseId: '',
    startOffset: {},
    startTime: "",
    endTime: "",
    time2Start: 0,
    duration: 0,
    instruction: "",
    isOpenB: true,
    isSave2LocalFile: false,
    filePath: ''
}
let paperInfo = {
    name: '',
    sections: section_temp
}
function assembInstrc(_name) {
    //Instruction 
    let Instrcu = 'This Instruction is for Exam : \r\n' + _name +
        '\r\nPlease Read this content very carefully and be prepared for the following exam, ' +
        '\r\nGood Luck :) ☺'

    return Instrcu
}


before(() => {
    cy.fixture("questionInfo").then(($ques) => {
        let allQuest = $ques
        cy.log(` ===>${allQuest[0].name} `)
        section_temp[0].questions.push({
            order: 1,
            question: allQuest[0]
        })
        cy.writeFile(`cypress/fixtures/${filePath}`, [])
    })

    paperInfo.name = paperName1
    examInfo.name = examName
    examInfo.startOffset = { level: "min", off: 2 }
    examInfo.duration = 2
    examInfo.instruction = assembInstrc(examName)
    examInfo.isSave2LocalFile = true
    examInfo.filePath = filePath
    examInfo.isAppend = true
    cy.CreateExamByAPI(examInfo, paperInfo)
})

after(() => {
    cy.log(`---> after all hook start : creating student exam ${examName2}...`)
    paperInfo.name = paperName2
    examInfo.name = examName2
    examInfo.startOffset = { level: "min", off: 120 }
    examInfo.duration = 60
    examInfo.instruction = assembInstrc(examName2)

    examInfo.isSave2LocalFile = true
    examInfo.filePath = filePath
    examInfo.isAppend = true
    cy.CreateExamByAPI(examInfo, paperInfo)
})

//Scenario:Before Exam的考试，状态应该是Wating Exam
Given(/^作为Staff登录系统，创建一个2分钟以后开始的考试$/, () => {
    cy.LoginExamAsSystem()
    cy.wait(500)
    Cypress.PageAdminCommon.visitExam(5000)

})
Then('在Exam页面，找到刚创建的考试，并Publish', () => {
    cy.fixture(filePath).then(($exam) => {
        examName = $exam[0].examInfo.name
        cy.log(examName)
        Cypress.PageExamHome.searchExam(examName)
    })
})
Then('Exam Card状态应该为 ' + StaffSta1, () => {
    let cardinfo = {
        title: examName,
        sta: { descrip: StaffSta1 }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, cardinfo)
})

//Scenario:During Exam时间的考试，状态应该是Proctoring
Given(/^作为Staff登录系统，在Exam页面找到刚刚创建的考试$/, () => {
    Cypress.PageExamHome.searchExam(examName)
    cy.fixture(filePath).then(($data) => {
        let len = $data.length
        examInfo = $data[len - 1].examInfo
        cy.log(`getting ${len} data from ${filePath}... `)
    })
})
Then('等待到达考试开始时间', () => {
    let waiting = new Date(examInfo.startTime) - new Date()
    cy.log(` ===> ${examInfo.name} will start@${examInfo.startTime}, ${waiting / 1000} s`)
    if (waiting > 0) {
        cy.wait(waiting)
        cy.wait(3000)
        cy.reload(true)
    }
})
Then('Exam Card状态应该为 ' + StaffSta2, () => {
    Cypress.PageExamHome.searchExam(examName)
    let cardinfo = {
        title: examName,
        sta: { descrip: StaffSta2 }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, cardinfo)
    cy.logoutApi()
})

//Scenario: After Exam时间的考试，状态应该是Marking
Given(/^Staff登录系统，在Exam页面找到已经过了结束时间的考试$/, () => {
    // implement this case at Mark Exam case
})
Then('Exam Card状态应该为 ' + StaffSta3, () => { })