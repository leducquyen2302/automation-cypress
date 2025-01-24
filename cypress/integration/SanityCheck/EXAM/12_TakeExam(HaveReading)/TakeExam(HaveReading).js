/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const title = ['Your reading time will end in', 'The exam will end in']
const reading_popup = ['The reading time has started!', 'Please start reading the questions in preparation for the exam. You cannot start answering question until after the reading time has completed.']

let paperName = 'ATReading_Paper ' + new Date().toLocaleString()
let appendixFileContent = 'appendixFileContent ' + new Date().toLocaleString()
let readingTimeExam_Name = '', ExamId = '', startTime = '', readTime = ''
let flexibleExam = {}
let Question = {}
const answer = 'This is an answer!'
let stu1 = '', stu2 = '', stu3 = '', cm = ''
let section_temp = [
    {
        name: "AT Section 1",
        description: "Choice and Essay",
        order: 1,
        questions: [
            {
                order: 1,
                question: ""
            }
        ]
    }
]
let examInfo = {
    name: "",
    courseCode: "AT001",
    courseId: '',
    startOffset: {},
    previewTime: 5,
    startTime: "",
    duration: 0,
    endTime: "",
    isopenB: '',
    isSave2LocalFile: true,
    isAppend: false,
    sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 6.5 }]
}

let paperInfo = {
    name: paperName,
    sections: section_temp
}

before(() => {
    cy.fixture("questionInfo").then(($ques) => {
        Question = $ques[2]
        section_temp[0].questions[0].question = Question
    })
})
before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    stu1 = env[ct].Candidates[0]
    stu2 = env[ct].Candidates[1]
    stu3 = env[ct].Candidates[2]
})

// Scenario: Fixed reading time exam
Given(/^创建开卷、reading time考试/, () => {
    // duration是可以答题的时间间隔，start和end是答题的开始和结束
    // reading考试用json中的readtime当作开始时间
    examInfo.name = 'ATExam_Reading'
    examInfo.startOffset = { level: "min", off: 7 }
    examInfo.duration = 1
    examInfo.isOpenB = true
    examInfo.filePath = 'readingTimeExam.json'
    examInfo.studentCount = [stu1.name, stu2.name, stu3.name]

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/readingTimeExam.json').then(($data) => {
        readingTimeExam_Name = $data.examInfo.name
        ExamId = $data.examInfo.examId
        readTime = $data.examInfo.readTime
    })
});
When(/^student登录$/, () => {
    cy.LoginByLocal(stu1.userid)
    Cypress.PageAdminCommon.visitExam(5000)
});
Then(/^进入exam页面搜索到刚才创建的考试$/, () => {
    Cypress.PageExamHome.searchExam(readingTimeExam_Name)
});
Then(/^进入考试首页的介绍界面$/, () => {
    Cypress.PageStudentExam.enterExam(0)
});
And(/^Reading Time词条显示正确$/, () => {
    Cypress.PageStudentTakeExam.verifyStartReadingTimeTip()
});
When(/^考试开始时间之前start button灰显$/, () => {
    Cypress.PageStudentTakeExam.verifyNotClickStart()
});
When(/^考试开始时间到,点击start button进入考试$/, () => {
    Cypress.PageStudentTakeExam.waitStartByTime(readTime)
    Cypress.PageStudentTakeExam.startNow()
});
And(/^倒计时提示语正确$/, () => {
    Cypress.PageStudentTakeExam.verifyReadingTimeTitle(title[0])
});
Then(/^question显示无法答题$/, () => {
    Cypress.PageStudentTakeExam.verifyNotAnswer()
});

// Scenario: Flexible reading time with answering duration exam
Given('I create a reading 5 minutes、have answering duration flexible exam', () => {
    examInfo.name = 'AT_Flexible_Take'
    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 1
    examInfo.isOpenB = true
    examInfo.filePath = 'takeFlexible.json'
    examInfo.examClassification = 1
    examInfo.deadline = 3

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/takeFlexible.json').then(($data) => {
        flexibleExam = $data.examInfo
    })
})
Then('I search the exam', () => {
    Cypress.PageAdminCommon.visitExam(6000)
    Cypress.PageExamHome.searchExam(flexibleExam.name)
})
And('I verify open time,deadline,sum duration,reading duration,answering duration', () => {
    let card = {
        flexibleTime: {
            openTime: flexibleExam.openTime,
            endTime: flexibleExam.endTime
        },
        sumDuration: flexibleExam.duration + flexibleExam.previewTime,
        readingAndAnsweringDuration: [flexibleExam.previewTime, flexibleExam.duration]
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
})
Then('I enter the exam', () => {
    Cypress.PageStudentExam.enterExam(0)
})
Then('I verify exam information all right', () => {
    Cypress.PageStudentTakeExam.clickExamInfo()
    let examInfo = {
        firstOrganization: 'UI-school',
        secondOrganization: 'UI-discipline',
        semester: 'UI-semester',
        classification: 'Flexible time range',
        examTime: {
            startTime: flexibleExam.openTime,
            endTime: flexibleExam.endTime
        },
        readingDuration: flexibleExam.previewTime,
        answeringDuration: flexibleExam.duration
    }
    Cypress.PageStudentTakeExam.verifyExamInfo(examInfo)
})
When('I start now', () => {
    Cypress.PageStudentTakeExam.waitStartByTime(flexibleExam.openTime)
    Cypress.PageStudentTakeExam.startNow()
})
Then('I verify the reading time', () => {
    Cypress.PageStudentTakeExam.verifyReadingTimeTitle(title[0])
    Cypress.PageStudentTakeExam.verifyReadingTimeTip(reading_popup[0], reading_popup[1])
})

// Scenario: Flexile no reading time with answering duration exam
Given('I create open book,no answering time,exam time is 5 minutes', () => {
    examInfo.name = 'AT_Flexible_Take_NoDuration'
    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 0
    examInfo.isOpenB = true
    examInfo.filePath = 'takeFlexible.json'
    examInfo.examClassification = 1
    examInfo.deadline = 10
    examInfo.previewTime = 0

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    section_temp[0].settings = `{\"enableOptionalQuestion\":true,\"requiredQuestionNumber\":1,\"eachQuestionMarks\":${examInfo.sections[0].fullScore}}`
    paperInfo.appendixFileContent = appendixFileContent
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/takeFlexible.json').then(($data) => {
        flexibleExam = $data.examInfo
    })
})
Then('I search the no duration exam', () => {
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(flexibleExam.name)
})
And('I verify the exam card info is right', () => {
    let card = {
        flexibleTime: {
            openTime: flexibleExam.openTime,
            endTime: flexibleExam.endTime
        },
        noAnsweringDuration: true
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});
Then('I wait exam start time and start', () => {
    Cypress.PageStudentTakeExam.waitStartByTime(flexibleExam.openTime)
    Cypress.PageStudentTakeExam.startNow()
});
Then('I verify option questions tip is right', () => {
    Cypress.PageExamAttendance.verifyMessage('AT Section 1 contains 1 questions (Question 1 - Question 1). Choose to answer 1 of the questions in this section.')
});
And('I verify appendix is right', () => {
    Cypress.PageStudentTakeExam.clickAppendix()
    Cypress.PageStudentTakeExam.verifyAppendix(appendixFileContent)
});
Then('I can see the tip is right', () => {
    Cypress.PageStudentTakeExam.verifyNoDurationTip()
});
Then('I take the question and end exam', () => {
    Cypress.PageStudentTakeExam.inputEassy(answer)
    Cypress.PageStudentTakeExam.endExam()
});