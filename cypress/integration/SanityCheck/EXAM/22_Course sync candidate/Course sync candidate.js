/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let system = '', cm = '', stu1 = '', stu2 = '', stu3 = ''
let courseCode = 'AT003'

let paperName = 'ATReading_Paper ' + new Date().toLocaleString()
let appendixFileContent = 'appendixFileContent ' + new Date().toLocaleString()
let fixedExam = {}
let flexibleExam = {}
let Question = {}
const answer = 'This is an answer!'
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
    courseCode: courseCode,
    courseId: '',
    startOffset: {},
    startTime: "",
    duration: 0,
    endTime: "",
    isopenB: '',
    filePath: 'syncCandidateExam.json',
    isSave2LocalFile: true,
    isAppend: true,
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
    system = env[ct].System.display
    cm = env[ct].CM
    stu1 = env[ct].Candidates[0]
    stu2 = env[ct].Candidates[1]
    stu3 = env[ct].Candidates[2]
    cy.writeFile(`cypress/fixtures/${examInfo.filePath}`, [])
})

// Scenario: Prepare a reading, have team, course have class, fixed exam
Given('I prepare a reading, have team, fixed exam and have class with AT003', () => {
    examInfo.name = 'ATExam_SyncCandidate_fixed'
    examInfo.startOffset = { level: "min", off: 6 }
    examInfo.duration = 10
    examInfo.isOpenB = true
    examInfo.stuGroupName = 'ATGroup_'
    examInfo.previewTime = 5

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/syncCandidateExam.json').then(($data) => {
        fixedExam = $data[0].examInfo
    })
})

// Scenario: Sync for select candidate
Given('I remove student001 and create class2 add student003 to AT003 after the exam already start', () => {
    Cypress.PageStudentTakeExam.waitStartByTime(fixedExam.readTime)
    let removeCourseInfo = {
        courseCode: courseCode,
        candidateList: [stu1.name]
    }
    cy.DeleteCourseCandidate_ByApi(removeCourseInfo)
    var class2 = {
        courseCode: courseCode,
        classOwner: [system],
        className: 'Class 2',
        candidateList: [stu3.name]
    }
    cy.UpdateCourseCandidate_API(class2)
})
When('I login as system and enter Course Configuration', () => {
    cy.LoginExamAsSystem()
    Cypress.auiCommon.visitUrl('/#/admin/CourseConfiguration')
})
Then('I choose AT003 and click Sync to uncompleted exams for selected courses', () => {
    Cypress.PageAdminCourse.search(courseCode)
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.clickSyncCandidateBtn()
    Cypress.PageAdminCourse.clickSyncCandidateForSelectCourseBtn()
})
And('I verify the confirm content and click ok', () => {
    Cypress.auiCommon.verifyConfirmDialogContent_InDialogBody('You are about to synchronise candidates of the courses to exams. All candidates enrolled to the courses will be synchronised to the exams of which the exam end time or deadline has not reached. Are you sure you want to proceed?')
    Cypress.auiCommon.clickFooterBtnInDialog(1)
})
And('I verify the start sync toast and view details toast', () => {
    // Cypress.auiCommon.verifyToast('Start synchronising candidates to exams. You can click ')
    Cypress.auiCommon.closeToast(0)
    cy.wait(3000)
    Cypress.auiCommon.verifyToast_InModal(0, 'Candidates were synchronised to exams. You can click ')
    Cypress.auiCommon.verifyToast_InModal(1, ' to view details.')
})
Then('I click here to open the processs page', () => {
    Cypress.auiCommon.clickToastToViewProcessDetails()
})
And('I verify the sync process name and time is right', () => {
    cy.wait(4000)
    Cypress.auiCommon.verifyProcessContent(0, 'Candidates were synchronised to exams.')
})

// Scenario: Verify step2 and attendance for the sync candidate
When('I enter the fixed exam attendance page', () => {
    Cypress.auiCommon.visitUrl(`/#/exam/schedule/attendance?examId=${fixedExam.examId}`)
})
Then('I verify student001 all columns are all right in attendance on fixed exam', () => {
    cy.wait(5000)
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu1.name
            },
            {
                index: 2,
                display: 'Candidate ID',
                value: stu1.id
            },
            {
                index: 3,
                display: 'User ID',
                value: stu1.userid
            },
            {
                index: 4,
                value: 'Active'
            },
            {
                index: 5,
                value: 'Class 1'
            },
            {
                index: 6,
                value: 'ATGroup_0'
            },
            {
                index: 7,
                value: 'Not started'
            },
            {
                index: 8,
                value: 'Not started'
            },
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyTimeInTable(1, 15, fixedExam.readTime)
    Cypress.auiCommon.verifyTimeInTable(1, 16, fixedExam.endTime)
})
And('I verify student003 all columns are all right in attendance on fixed exam', () => {
    let student001_Info = {
        rowIndex: 3,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu3.name
            },
            {
                index: 2,
                display: 'Candidate ID',
                value: stu3.id
            },
            {
                index: 3,
                display: 'User ID',
                value: stu3.userid
            },
            {
                index: 4,
                value: 'Active'
            },
            {
                index: 5,
                value: 'Class 2'
            },
            {
                index: 6,
                value: 'Default team'
            },
            {
                index: 7,
                value: 'Not started'
            },
            {
                index: 8,
                value: 'Not started'
            },
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyTimeInTable(1, 15, fixedExam.readTime)
    Cypress.auiCommon.verifyTimeInTable(1, 16, fixedExam.endTime)
})
When('I enter the fixed exam step2', () => {
    Cypress.auiCommon.visitUrl(`/#/exam/schedule/assigninvigilators?examId=${fixedExam.examId}&pageType=2`)
    cy.wait(4000)
})
Then('I verify student003 all columns are all right in step2 on fixed exam', () => {
    let student003Info = {
        rowIndex: 3,
        columns: [
            // {
            //     index: 1,
            //     display: 'Candidate name',
            //     value: stu3.name
            // },
            {
                index: 2,
                value: 'Class 2'
            },
            {
                index: 3,
                value: 'Default team'
            },
            {
                index: 6,
                value: '5 minutes'
            },
            // {
            //     index: 9,
            //     value: system
            // }
        ]
    }
    Cypress.auiCommon.verifyTable(student003Info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(3, 2, stu3.name)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(3, 10, system)
    Cypress.auiCommon.verifyTimeInTable(3, 6, fixedExam.readTime)
    Cypress.auiCommon.verifyTimeInTable(3, 8, fixedExam.startTime)
    Cypress.auiCommon.verifyTimeInTable(3, 9, fixedExam.endTime)
})

// Scenario: Prepare a no reading, no team, flexible exam and no class
Given('I remove AT003 all class and add student003', () => {
    cy.DeleteCourseClass_ByApi(courseCode)
    var student003 = {
        courseCode: courseCode,
        candidateList: [stu3.name]
    }
    cy.UpdateCourseCandidate_API(student003)
})
Then('I prepare a no reading, no team, flexible exam and no class in course', () => {
    examInfo.name = 'ATExam_SyncCandidate_flexible'
    examInfo.startOffset = { level: "min", off: 5 }
    examInfo.duration = 1
    examInfo.isOpenB = true
    examInfo.stuGroupName = ''
    examInfo.filePath = 'syncCandidateExam.json'
    examInfo.previewTime = 0
    examInfo.examClassification = 1

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/syncCandidateExam.json').then(($data) => {
        flexibleExam = $data[1].examInfo
    })
})

// Scenario: Sync for all candidate on flexible exam
Then('I remove student003 and create class1 add student001, student002', () => {
    let removeCourseInfo = {
        courseCode: courseCode,
        candidateList: [stu3.name]
    }
    cy.DeleteCourseCandidate_ByApi(removeCourseInfo)
    var class1 = {
        courseCode: courseCode,
        classOwner: [system],
        className: 'Class 1',
        candidateList: [stu1.name, stu2.name]
    }
    cy.UpdateCourseCandidate_API(class1)
})
When('I enter the Course Configuration page', () => {
    Cypress.auiCommon.visitUrl('/#/admin/CourseConfiguration')
})
Then('I click Sync to uncompleted exams for all courses button', () => {
    Cypress.PageAdminCourse.clickSyncCandidateForAllCourseBtn()
    Cypress.auiCommon.clickFooterBtnInDialog(1)
    Cypress.auiCommon.closeToast(0)
})
When('I enter the flexible exam attendance page', () => {
    Cypress.auiCommon.visitUrl(`/#/exam/schedule/attendance?examId=${flexibleExam.examId}`)
})
Then('I verify student001 all columns are all right in attendance on flexible exam', () => {
    cy.wait(5000)
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu1.name
            },
            {
                index: 4,
                value: 'Active'
            },
            {
                index: 5,
                value: 'Not started'
            },
            {
                index: 6,
                value: 'Not started'
            },
            {
                index: 7,
                value: ''
            },
            {
                index: 8,
                value: ''
            },
            {
                index: 14,
                value: flexibleExam.duration
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyTimeInTable(1, 15, flexibleExam.endTime)
})
And('I verify student003 all columns are all right in attendance on flexible exam', () => {
    let student001_Info = {
        rowIndex: 3,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu3.name
            },
            {
                index: 4,
                value: 'Active'
            },
            {
                index: 5,
                value: 'Not started'
            },
            {
                index: 6,
                value: 'Not started'
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyTimeInTable(1, 15, flexibleExam.endTime)
})
When('I enter the flexible exam step2', () => {
    Cypress.auiCommon.visitUrl(`/#/exam/schedule/assigninvigilators?examId=${flexibleExam.examId}&pageType=2`)
    cy.wait(4000)
})
Then('I verify student001 all columns are all right in step2 on flexible exam', () => {
    let student001Info = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 1,
            //     display: 'Candidate name',
            //     value: stu1
            // },
            {
                index: 2,
                display: 'Team name',
                value: ''
            },
            {
                index: 4,
                value: flexibleExam.duration
            },
            // {
            //     index: 7,
            //     value: system
            // }
        ]
    }
    Cypress.auiCommon.verifyTable(student001Info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, stu1.name)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 8, system)
    Cypress.auiCommon.verifyTimeInTable(1, 5, flexibleExam.openTime)
    Cypress.auiCommon.verifyTimeInTable(1, 7, flexibleExam.deadline)
})