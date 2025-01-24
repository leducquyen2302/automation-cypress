/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/

let topOrganization = 'UI-school', subOrganization = 'UI-discipline', semester = 'UI-semester'
let paperName = 'ATListExam_Paper' + new Date().toLocaleString()
let listExam = '', listExam_Copy_Id = '', listExam_Copy_Name = ''
let flexibleExam = {}
let Question = {}
let cm = '', stu1 = '', stu2 = '', stu3 = ''
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
    courseId: '',
    startOffset: {},
    previewTime: 5,
    startTime: "",
    duration: 0,
    endTime: "",
    isopenB: '',
    isSave2LocalFile: true,
    keyCode: 30,
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
    cm = env[ct].CM.display
    stu1 = env[ct].Candidates[0]
    stu2 = env[ct].Candidates[1]
    stu3 = env[ct].Candidates[2]
})

// Scenario: Prepare two exams
Given(/^Prepare listExam: AT001, closed book, fixed time range, today/, () => {
    examInfo.name = 'ATExam_List1_'
    examInfo.courseCode = "AT001"
    examInfo.courseName = "AutoTesting Programme 1"
    examInfo.startOffset = { level: "min", off: 30 }
    examInfo.duration = 1
    examInfo.isOpenB = false
    examInfo.filePath = 'examListExam.json'
    examInfo.studentCount = [stu1.name, stu2.name, stu3.name]

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/examListExam.json').then(($data) => {
        listExam = $data.examInfo
        listExam_Copy_Name = `${listExam.name}_Copy`
    })
});

// Scenario: Verify fliter in exam list
Given(/^I am login as CM and in exam page$/, () => {
    cy.LoginExamAsSystem(false)
    Cypress.PageAdminCommon.visitExam(8000)
});
Then(/^I can see card and table view button have tooltip$/, () => {
    Cypress.PageExamHome.verifyCardOrTableViewBtn_tooltip()
});
When(/^I switch table view$/, () => {
    Cypress.PageExamHome.switchExamView('Table')
});
Then(/^I filter school organization$/, () => {
    Cypress.PageExamHome.filter('School', topOrganization)
});
And(/^I verify school column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'School',
                value: topOrganization
            }
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});
Then(/^I filter discipline organization$/, () => {
    Cypress.PageExamHome.filter('Discipline', subOrganization)
});
And(/^I verify discipline column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'School',
                value: topOrganization
            },
            {
                index: 2,
                display: 'Discipline',
                value: subOrganization
            },
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});
Then(/^I filter semester$/, () => {
    Cypress.PageExamHome.filter('Semester', semester)
});
And(/^I verify semester column is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 5,
                display: 'Semester',
                value: semester
            }
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});
Then(/^I filter course$/, () => {
    Cypress.PageExamHome.filter('Course', `${examInfo.courseCode} (${examInfo.courseName})`)
});
And(/^I verify course code and course name column are right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                display: 'Course code',
                value: examInfo.courseCode
            },
            {
                index: 4,
                display: 'Course name',
                value: examInfo.courseName
            },
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});
When(/^I search the listExam$/, () => {
    Cypress.PageExamHome.searchExamInTableView(listExam.name)
});
Then(/^I verify search result table info is right$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: topOrganization
            },
            {
                index: 2,
                value: subOrganization
            },
            {
                index: 3,
                value: examInfo.courseCode
            },
            {
                index: 4,
                value: examInfo.courseName
            },
            {
                index: 5,
                value: semester
            },
            {
                index: 6,
                display: 'Exam name',
                value: listExam.name
            },
            {
                index: 7,
                display: 'Exam type',
                value: 'Closed-book'
            },
            {
                index: 8,
                display: 'Exam key',
                value: 'Enabled'
            },
            // {
            //     index: 9,
            //     display: 'Course manager',
            //     value: cm
            // },
            {
                index: 10,
                display: 'Exam classification',
                value: listExam.Classification
            },
            {
                index: 12,
                display: 'Reading duration',
                value: `${examInfo.previewTime} minutes`
            },
            {
                index: 13,
                display: 'Answering duration',
                value: `${examInfo.duration} minutes`
            },
            {
                index: 14,
                display: 'Candidates',
                value: `${examInfo.studentCount.length} enrolled`
            },
            {
                index: 15,
                display: 'Status',
                value: 'Exam is coming'
            },
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 10, cm)
});
When(/^I switch card view$/, () => {
    Cypress.PageExamHome.switchExamView('Card')
});
Then(/^I still see the listExam$/, () => {
    let examInfo = {
        title: listExam.name,
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

// Scenario: Unpublish exam in table view by the top button
When(/^I check the listExam$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
});
Then(/^I unpublish the listExam$/, () => {
    Cypress.PageSampleExamCreate.clickUnpublish()
});
And(/^I verify exam status is waiting for publishing$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 15,
                display: 'Status',
                value: 'Waiting for publishing'
            }
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});

// Scenario: Publish exam in table view by the top button
Then(/^I publish the listExam$/, () => {
    Cypress.PageSampleExamCreate.clickPublishExam()
});
And(/^I verify exam status is exam is coming$/, () => {
    let exam = {
        rowIndex: 1,
        columns: [
            {
                index: 15,
                display: 'Status',
                value: 'Exam is coming'
            }
        ]
    }
    Cypress.auiCommon.verifyTable(exam)
});

// Scenario: Duplicate exam in table view by the right button
When(/^I click duplicate exam by the right button$/, () => {
    Cypress.PageExamHome.clickRightBtn_tableView(0, 0)
});
Then(/^I goto step3 publish exam$/, () => {
    cy.wait(1000)
    cy.url().then($body => {
        listExam_Copy_Id = $body.split('examId=')[1].split('&page')[0]
    })
    Cypress.PageExamCreate.leftNavigationTo(2)
    Cypress.PageExamCreate.examPublish()
});

// Scenario: Generate key code on the top button
Then(/^I check the listExam and the listExam_Copy$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.courseTableRowCheckbox(1)
});
Then(/^The generate key button is highlight and have tooltips$/, () => {
    Cypress.PageExamHome.verifyGenerateKeyBtn_hightLight()
});
Then(/^I generate the listExam and the listExam_Copy key code$/, () => {
    cy.visit(`/#/examapp/keycode?id=${listExam.examId}&id=${listExam_Copy_Id}`)
});
And(/^I verify the key code card name$/, () => {
    Cypress.PageExamKeyCode.verifyCardName(0, listExam.name)
    Cypress.PageExamKeyCode.verifyCardName(1, listExam_Copy_Name)
});
And(/^I verify the key code minutes is right$/, () => {
    Cypress.PageExamKeyCode.verifyCardMinutes('The key will be updated in 30 minutes.')
});

// Scenario: Delete waiting for publishing status exam in table view by the right button
Given(/^I am in table view and search the listExam$/, () => {
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExamInTableView(listExam_Copy_Name)
    Cypress.PageExamHome.switchExamView('Table')
});
Then(/^I unpublish the listExam_Copy by the right button$/, () => {
    Cypress.PageExamHome.clickRightBtn_tableView(0, 2)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    cy.waitElement('[placeholder="Search by exam name"]')
    cy.wait(1000)
});
Then(/^I delete the listExam_Copy by right button$/, () => {
    Cypress.PageExamHome.clickRightBtn_tableView(0, 3)
    Cypress.PageSampleExamCreate.confirmDelete(`You are going to delete this exam. Once deleted, the exam statistics will be deleted and cannot be restored.`)
});

// Scenario: Click exam name in table view
When(/^I click listExam name$/, () => {
    Cypress.PageExamHome.clickExamName_tableView()
});
Then(/^I can View written exam - Set up basic information$/, () => {
    Cypress.auiCommon.breadcrumbValue('View written exam - Set up basic information')
});

// Scenario: Delete published exam status in table view
Given(/^I click cancel$/, () => {
    Cypress.auiCommon.clickFooterPanelBtn(0)
});
Then(/^I click the published exam status delete button by right button$/, () => {
    Cypress.PageExamHome.clickRightBtn_tableView(0, 4)
    Cypress.PageSampleExamCreate.confirmDelete(`You are going to delete the exam. Once deleted, the paper used in the exam, exam statistics, and the candidate responses will all be deleted and cannot be restored.`)
});
And(/^I verify the exam delete successfully$/, () => {
    Cypress.auiCommon.verifyToast('The exam was deleted.')
});