/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let cu_env_string = Cypress.env('current_Env')
let cu_ten_string = Cypress.env('current_ten')
let topOrganization = 'UI-school'
let subOrganization = 'UI-discipline'
let semester = 'UI-semester'
let examInfo = {}, paperInfo = {}
let flexibleExam_info = {}
let rowInfo = {
    rowIndex: 0,
    columns: []
}
let oralExamName = ''

before(() => {
    cy.fixture('readingTimeExam.json').then(($markedExam) => {
        examInfo = $markedExam.examInfo
        paperInfo = $markedExam.paperInfo
        cy.log(examInfo)
    })
})
before(() => {
    cy.fixture('takeFlexible.json').then(($data) => {
        flexibleExam_info = $data.examInfo
    })
})
before(() => {
    cy.fixture("oralExamInfo.json").then(($examInfo) => {
        oralExamName = $examInfo.examName
    })
})

// Scenario: Dashboard display 2 cards
Given(/^I am login as CM and enter report page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Reports')
    Cypress.auiCommon.clickTab(1)
});
Then(/^The first card is Exam statistics report$/, () => {
    let cardInfo = {
        title: 'Exam statistics report',
        des: 'Exam statistics report provides an overview of essential metrics related to exams.'
    }
    Cypress.PageReport.verifyReportCard(0, cardInfo)
});

// Scenario: Enter Exam Statistics Report and filter school
Given(/^I enter Exam Statistics Report page and filter data$/, () => {
    Cypress.PageReport.enterStaicReport(true, 0, 6000)
})
When(/^I filter school$/, () => {
    Cypress.PageReport.Filter('School', topOrganization)
})
And(/^I verify school column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                display: 'School',
                value: topOrganization
            }
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});

// Scenario: Filter discipline
When(/^I filter discipline$/, () => {
    Cypress.PageReport.Filter('Discipline', subOrganization)
})
Then(/^I verify discipline column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                display: 'School',
                value: topOrganization
            },
            {
                index: 1,
                display: 'Discipline',
                value: subOrganization
            },
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});

// Scenario: Filter semester
When(/^I filter semester$/, () => {
    Cypress.PageReport.Filter('Semester', semester)
})
Then(/^I verify semester column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 4,
                display: 'Semester',
                value: semester
            },
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});

// Scenario: Filter course
When(/^I filter course$/, () => {
    Cypress.PageReport.Filter('Course', examInfo.courseCode)
})
Then(/^I verify course column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 2,
                display: 'Course code',
                value: examInfo.courseCode
            },
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});

// Scenario: Filter score status
When(/^I filter score status with not locked$/, () => {
    Cypress.PageReport.Filter('Score status', 'Not locked')
})
Then(/^I verify result is not locked$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 11,
                display: 'Score status',
                value: "Not locked"
            }
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
})
When(/^I filter score status with empty$/, () => {
    Cypress.PageReport.Filter('Score status', '(Empty)')
})
Then(/^I verify result is empty$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 11,
                display: 'Score status',
                value: ""
            }
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
})

// Scenario: Search readingTimeExam verify all columns
When(/^I search the readingTimeExam$/, () => {
    cy.reload()
    Cypress.PageReport.search(examInfo.name)
});
Then(/^I sort by exam name$/, () => {
    Cypress.auiCommon.colunmSort(6)
})
Then(/^I verify all columns are right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                display: 'School',
                value: topOrganization
            },
            {
                index: 1,
                display: 'Discipline',
                value: subOrganization
            },
            {
                index: 2,
                display: 'Course code',
                value: examInfo.courseCode
            },
            {
                index: 3,
                display: 'Course name',
                value: 'AutoTesting Programme 1'
            },
            {
                index: 4,
                display: 'Semester',
                value: semester
            },
            {
                index: 5,
                display: 'Exam name',
                value: examInfo.name
            },
            {
                index: 6,
                display: 'Exam classification',
                value: examInfo.Classification
            },
            {
                index: 8,
                display: 'Reading duration',
                value: examInfo.previewTime
            },
            {
                index: 9,
                display: 'Answering duration',
                value: examInfo.duration
            },
            {
                index: 10,
                display: 'Status',
                value: "Marking"
            },
            {
                index: 11,
                display: 'Score status',
                value: "Not locked"
            },
            {
                index: 12,
                display: 'Enrolled candidates',
                value: examInfo.studentCount.length
            },
            {
                index: 13,
                display: 'Presented candidates',
                value: 1
            },
            {
                index: 14,
                display: 'Total marks',
                value: examInfo.sections[0].fullScore
            },
            {
                index: 15,
                display: 'No. of questions',
                value: examInfo.sections[0].questNo
            }

        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
    Cypress.PageReport.verifyDateTimeInTable(1, 8, examInfo.readTime)
})

// Scenario: Flexible exam time range exam report
When(/^I filter Fixed time range$/, () => {
    Cypress.PageAdminCourse.clearSearch()
    Cypress.PageReport.Filter('Exam classification', 'Fixed time range')
})
Then(/^I verify the first exam's classification is Fixed time range$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                display: 'Exam classification',
                value: 'Fixed time range'
            }
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
})
When(/^I filter Flexible time range$/, () => {
    Cypress.PageReport.Filter('Exam classification', 'Fixed time range')
})
Then(/^I verify the first exam's classification is Flexible time range$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                display: 'Exam classification',
                value: 'Flexible time range'
            }
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
})
When(/^I search the attandence flexible exam$/, () => {
    Cypress.PageReport.search(flexibleExam_info.name)
})
Then(/^I verify all column info is right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                value: topOrganization
            },
            {
                index: 1,
                value: subOrganization
            },
            {
                index: 2,
                value: flexibleExam_info.courseCode
            },
            {
                index: 4,
                value: semester
            },
            {
                index: 5,
                value: flexibleExam_info.name
            },
            {
                index: 6,
                value: 'Flexible time range'
            },
            {
                index: 8,
                value: 'No reading time'
            },
            {
                index: 9,
                value: 'No answering duration'
            },
            {
                index: 10,
                value: 'Marking'
            },
            {
                index: 11,
                value: 'Not locked'
            },
            {
                index: 12,
                value: flexibleExam_info.studentCount.length
            },
            {
                index: 13,
                value: 1
            },
            {
                index: 14,
                value: flexibleExam_info.sections[0].fullScore
            },
            {
                index: 15,
                value: flexibleExam_info.sections[0].questNo
            }
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
    Cypress.PageReport.verifyDateTimeInTable(1, 8, flexibleExam_info.openTime)
    Cypress.PageReport.verifyDateTimeInTable(1, 8, flexibleExam_info.endTime)
})

// Scenario: Oral exam
Given(/^I search oral exam$/, () => {
    Cypress.PageAdminCourse.clearSearch()
    Cypress.PageReport.search(oralExamName)
})
Given(/^I verify the oral exam all column info are right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                value: topOrganization
            },
            {
                index: 1,
                value: subOrganization
            },
            {
                index: 2,
                value: 'AT001'
            },
            {
                index: 3,
                value: 'AutoTesting Programme 1'
            },
            {
                index: 4,
                value: semester
            },
            {
                index: 5,
                value: oralExamName
            },
            {
                index: 6,
                value: 'Flexible time range'
            },
            {
                index: 8,
                value: 'No reading time'
            },
            {
                index: 9,
                value: 'No answering duration'
            },
            {
                index: 10,
                value: 'Proctoring'
            },
            {
                index: 11,
                value: 6
            },
            {
                index: 12,
                value: 2
            },
            {
                index: 13,
                value: 1
            },
            {
                index: 14,
                value: 1
            }
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
    Cypress.auiCommon.verifyDateInTable(1, 8, new Date())
    Cypress.auiCommon.verifyDateInTable(1, 8, new Date())
})
