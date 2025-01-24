/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const title = ['Your reading time will end in', 'The exam will end in']
const reading_popup = ['The reading time has started!', 'Please start reading the questions in preparation for the exam. You cannot start answering question until after the reading time has completed.']

let paperName = 'ATReading_Paper' + new Date().toLocaleString()
let readingTimeExam_Name = '', ExamId = '', startTime = '', readTime = ''
let attemptsExam = {}
let Question = {}
const answer = 'This is an answer!'
let stu1 = '', stu2 = '', cm = ''
let reEnterDate = ''
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
    sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 4 }]
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
    cm = env[ct].CM
    stu1 = env[ct].Candidates[0]
    stu2 = env[ct].Candidates[1]
})

// Scenario: Flexile no reading time with answering duration exam
Given('Prepare no reading, 2 attempts, open book exam', () => {
    examInfo.name = 'AT_Attempts_Exam'
    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 10
    examInfo.isOpenB = true
    examInfo.filePath = 'attemptExam.json'
    examInfo.examClassification = 1
    examInfo.deadline = 2
    examInfo.previewTime = 0
    examInfo.examAttempts = 3

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/attemptExam.json').then(($data) => {
        attemptsExam = $data.examInfo
    })
})
Then('I am login as student001', () => {
    cy.LoginByLocal(stu1.userid)
})
And('I check exam card info in exam page', () => {
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(attemptsExam.name)
    let card = {
        attempts: {
            submitted: 0,
            sum: examInfo.examAttempts
        }
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});
Then('I wait exam start time and enter exam', () => {
    Cypress.PageStudentTakeExam.waitStartByTime(attemptsExam.openTime)
    Cypress.PageStudentExam.enterExam(0)
});
Then('I start exam', () => {
    Cypress.PageStudentTakeExam.startNow()
});
Then('I take the question and end exam', () => {
    Cypress.PageStudentTakeExam.inputEassy(answer)
    Cypress.PageStudentTakeExam.endExam(false, true)
});
And('I verify submit answer end exam and attempt tips', () => {
    Cypress.PageConductExam.verifySubmittedMessage('You have submitted the answers and ended your exam!')
    Cypress.PageStudentTakeExam.verifyAfterSubmitExam_AttemptsTip(examInfo.examAttempts, 1)
});
When('I click start new attempt button', () => {
    Cypress.PageStudentTakeExam.clickStartNewAttemptBtn()
});
Then('I restart exam', () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.PageStudentTakeExam.startNow()
});
And('I verify question is not answered', () => {
    Cypress.PageStudentTakeExam.verifyInputEassy('')
});
When('I am in exam page', () => {
    Cypress.PageAdminCommon.visitExam(8000)
    cy.reload()
    Cypress.PageExamHome.searchExam(attemptsExam.name)
});
Then('I check exam card attempts is right', () => {
    let card = {
        attempts: {
            submitted: 2,
            sum: examInfo.examAttempts
        }
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});
Then('I click Re-enter', () => {
    Cypress.PageStudentExam.reenterExam(0)
});
Then('I click back to home page', () => {
    Cypress.PageStudentTakeExam.backToHome()
});
Then('I logout', () => {
    cy.logoutApi()
});

// Scenario: CM verify attendance page
Given('I am login as student002', () => {
    cy.LoginByLocal(stu2.userid)
})
When('Exam deadline arrived', () => {
    Cypress.PageExamAttendance.waitEndByTime(examInfo.endTime)
});
Then('I can see exam card is overdue', () => {
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(attemptsExam.name)
    let card = {
        title: attemptsExam.name,
        status: 'overdue'
    }
    Cypress.PageStudentExam.verifyStudentExamCardInfo(0, card)
});

// Scenario: CM verify attendance page
Given('I am login as CM', () => {
    cy.LoginExamAsSystem()
});
When('I am in attendance page', () => {
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(attemptsExam.name)
    Cypress.PageExamAttendance.enterAttendance_overexam()
});
Then('I verify student001 student002 attempts column', () => {
    let candiInfo1 = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                display: 'Attempted / Attempts allowed',
                value: `${examInfo.examAttempts} / ${examInfo.examAttempts}`,
            },
            {
                index: 7,
                display: 'Attendance status',
                value: 'Present',
            },
            {
                index: 8,
                display: 'Examination status',
                value: 'Submitted',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(candiInfo1)
    let candiInfo2 = {
        rowIndex: 2,
        columns: [
            {
                index: 6,
                display: 'Attempted / Attempts allowed',
                value: `0 / ${examInfo.examAttempts}`,
            },
            {
                index: 7,
                display: 'Attendance status',
                value: 'Absent',
            },
            {
                index: 8,
                display: 'Examination status',
                value: 'Not started',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(candiInfo2)
});
Then('I verify student001 details attempts', () => {
    Cypress.PageExamAttendance.enterCandiDetail(0)
    let info = {
        attempt: `${examInfo.examAttempts}/${examInfo.examAttempts}`
    }
    Cypress.PageExamAttendance.verifyCandidateDetail(info)
});
Then('I close detail', () => {
    Cypress.auiCommon.closePanel()
});
Then('I reopen student001 student002', () => {
    Cypress.PageExamAttendance.chooseStudent(0)
    Cypress.PageExamAttendance.chooseStudent(1)
    Cypress.PageExamAttendance.clickAttendanceHeaderBtn(3)
    Cypress.PageExamAttendance.editEndTime_Flexible('edit', 0, 23, 30)
});
And('I verify student001 student002 columns after reopen', () => {
    let candiInfo1 = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                display: 'Attempted / Attempts allowed',
                value: `${examInfo.examAttempts - 1} / ${examInfo.examAttempts}`,
            },
            {
                index: 7,
                display: 'Attendance status',
                value: 'Present',
            },
            {
                index: 8,
                display: 'Examination status',
                value: 'In progress',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(candiInfo1)
    Cypress.auiCommon.verifyDateInTable(1, 10, examInfo.startTime)
    Cypress.auiCommon.verifyDateInTable(1, 11, examInfo.startTime)
    let candiInfo2 = {
        rowIndex: 2,
        columns: [
            {
                index: 6,
                display: 'Attempted / Attempts allowed',
                value: `0 / ${examInfo.examAttempts}`,
            },
            {
                index: 7,
                display: 'Attendance status',
                value: 'Not started',
            },
            {
                index: 8,
                display: 'Examination status',
                value: 'Not started',
            }

        ]
    }
    Cypress.auiCommon.verifyTable(candiInfo2)
});
When('Stu1 enter exam', () => {
    let ss = new Date().getSeconds()
    if (ss > 52) {
        cy.wait((60 - ss + 1) * 1000)
        reEnterDate = new Date(new Date().setMinutes(new Date().getMinutes() + 1)).toJSON()
    } else {
        reEnterDate = new Date().toJSON()
    }
    cy.StuEnterExamApi(0, 'attemptExam.json')
});
Then(/^I verify stu1 start time is now$/, () => {
    Cypress.auiCommon.verifyTimeInTable(1, 10, reEnterDate)
});
And(/^I verify stu1 end time is null$/, () => {
    Cypress.auiCommon.verifyTimeInTable(1, 11)
});
When(/^Stu1 end exam$/, () => {
    cy.SubmitExamApi(0, 'attemptExam.json')
});
Then(/^I verify stu1 end time is now$/, () => {
    Cypress.auiCommon.verifyTimeInTable(1, 11, reEnterDate)
});