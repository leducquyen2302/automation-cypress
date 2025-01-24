/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let system = '', invigilator1 = '', invigilator2 = ''
let process_1 = {
    'name': `ExamProcess`,
    'editName': `EditExamProcess`,
    'type': 'Exam',
    'course': 'AT001',
    'description': 'This is a exam process description!'
}
let process_2 = {
    'name': `PaperProcess`,
    'type': 'Paper',
    'course': 'AT002',
    'description': 'This is a paper process description!'
}
let process_3 = {
    'name': `AllTypeProcess`,
    'type': 'Exam, paper, and question',
    'course': ['AT003', 'AT004'],
    'description': 'This is a all type process description!'
}
const courseFullName = [
    'AT001 (AutoTesting Programme 1 - UI-semester - UI-school - UI-discipline)',
    'AT002 (AutoTesting Programme 2 - UI-semester - UI-school - UI-discipline)',
    'AT003 (AutoTesting Programme 3 - UI-semester - UI-school - UI-discipline)',
    'AT004 (AutoTesting Programme 4 - UI-semester - UI-school - UI-discipline)',
]

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    system = env[ct].System.display
    invigilator1 = env[ct].Invigilator1.display
    invigilator2 = env[ct].Invigilator2.display
})

// Scenario: I verify Approval processes card
Given(/^I login as system admin and in admin page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I verify Approval processes configuration position,instruction and enter$/, () => {
    Cypress.PageAdminCommon.clickCardbyName('Administration', 'Approval processes')
});

// Scenario: I verify create approval process page required fields
Given(/^I click create approval process button$/, () => {
    Cypress.PageAdminApprovalProcesses.clickTopButton(0)
});
When(/^I click save button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify required fields$/, () => {
    Cypress.PageAdminApprovalProcesses.verifyRequiredFields()
});

// Scenario: I create approval process with exam type
Given(/^I input Name, Exam type, Course, Description$/, () => {
    Cypress.PageAdminApprovalProcesses.inputName(process_1.name)
    Cypress.PageAdminApprovalProcesses.chooseServiceType(process_1.type)
    Cypress.PageAdminApprovalProcesses.chooseCourse(process_1.course)
    Cypress.PageAdminApprovalProcesses.inputDescription(process_1.description)
});
When(/^I click add stage$/, () => {
    Cypress.PageAdminApprovalProcesses.clickAddStage()
});
Then(/^I input stage 1 approver is invigilator1 and reminder is 1$/, () => {
    Cypress.PageAdminApprovalProcesses.inputApprover(0, invigilator1)
    Cypress.PageAdminApprovalProcesses.inputReminder(0, 1)
});
And('I input stage 2 approver is $Course manager and reminder is 2', () => {
    Cypress.PageAdminApprovalProcesses.inputApprover(1, '$Course manager')
    Cypress.PageAdminApprovalProcesses.inputReminder(1, 2)
});
Then(/^I verify create successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The process was created.')
});

// Scenario: I verify cannot same name
Then(/^I input same name$/, () => {
    Cypress.PageAdminApprovalProcesses.inputName(process_1.name)
});
Then(/^I verify duplicate name verification message$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'The name you entered already exists. Enter a unique name to proceed.')
});

// Scenario: I create approval process with paper type
Given(/^I input Name, Paper type, Course, Description$/, () => {
    Cypress.PageAdminApprovalProcesses.inputName(process_2.name)
    Cypress.PageAdminApprovalProcesses.chooseServiceType(process_2.type)
    Cypress.PageAdminApprovalProcesses.chooseCourse(process_2.course)
    Cypress.PageAdminApprovalProcesses.inputDescription(process_2.description)
});
Then(/^I input stage 1 approver is invigilator2$/, () => {
    Cypress.PageAdminApprovalProcesses.inputApprover(0, invigilator2)
});

// Scenario: I verify can not approval course which has been configured 
Then(/^I input Name, All type, Description$/, () => {
    Cypress.PageAdminApprovalProcesses.inputName(process_3.name)
    Cypress.PageAdminApprovalProcesses.chooseServiceType(process_3.type)
    Cypress.PageAdminApprovalProcesses.inputDescription(process_3.description)
});
When(/^I search course that AT00 and choose all$/, () => {
    Cypress.PageAdminApprovalProcesses.chooseCourse('AT00')
});
Then(/^I can see the red AT001, AT002 conflicting information$/, () => {
    Cypress.PageAdminApprovalProcesses.verifyConflictCourseTips(0, `The approval process "${process_1.name}" has been configured for the course "AT001 (AutoTesting Programme 1 - UI-semester - UI-school - UI-discipline)".`)
    Cypress.PageAdminApprovalProcesses.verifyConflictCourseTips(1, `The approval process "${process_2.name}" has been configured for the course "AT002 (AutoTesting Programme 2 - UI-semester - UI-school - UI-discipline)".`)
});

// Scenario: I create approval process with all type and two courses
Then(/^I choose course the AT003, AT004$/, () => {
    Cypress.PageAdminApprovalProcesses.openCoursePopup()
    Cypress.PageAdminApprovalProcesses.checkCourse(1)
    Cypress.PageAdminApprovalProcesses.checkCourse(2)
    Cypress.PageAdminApprovalProcesses.clickCoursePopupOkBtn()
});

// Scenario: I verify table info all right
Given(/^I verify all type process info$/, () => {
    let tableInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Name',
                value: process_3.name,
            },
            {
                index: 2,
                display: 'Course',
                value: courseFullName[2],
            },
            {
                index: 3,
                display: 'Service type',
                value: process_3.type,
            },
            // {
            //     index: 5,
            //     display: 'Modified by',
            //     value: system,
            // },
            {
                index: 6,
                display: 'Status',
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 6, system)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 5, new Date())
});
And('I verify have +1 property', () => {
    Cypress.PageAdminApprovalProcesses.verifyMoreCourseNumber('1')
});
When(/^I click course right number$/, () => {
    Cypress.PageAdminAccount.clickPropertyNum()
});
Then(/^I verify the two courses info$/, () => {
    Cypress.PageAdminAccount.verifyAllProperty(0, courseFullName[2])
    Cypress.PageAdminAccount.verifyAllProperty(1, courseFullName[3])
});
Given(/^I verify paper type process info$/, () => {
    let tableInfo = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: process_2.name,
            },
            {
                index: 2,
                value: courseFullName[1],
            },
            {
                index: 3,
                value: process_2.type,
            },
            // {
            //     index: 5,
            //     value: system,
            // },
            {
                index: 6,
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(2, 6, system)
    Cypress.auiCommon.verifyDateInTable_InShadow(2, 5, new Date())
});
Given(/^I verify exam type process info$/, () => {
    let tableInfo = {
        rowIndex: 3,
        columns: [
            {
                index: 1,
                value: process_1.name,
            },
            {
                index: 2,
                value: courseFullName[0],
            },
            {
                index: 3,
                value: process_1.type,
            },
            // {
            //     index: 5,
            //     value: system,
            // },
            {
                index: 6,
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(3, 6, system)
    Cypress.auiCommon.verifyDateInTable_InShadow(3, 5, new Date())
});

// Scenario: I deactivate the exam type process
Given(/^I select the exam type process$/, () => {
    Cypress.auiCommon.chooseCheckbox(3)
});
Then(/^I click deactivate button on top$/, () => {
    Cypress.PageAdminApprovalProcesses.clickTopButton(3)
});
And(/^I confirm deactivate$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
And(/^I verify deactivate successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The approval process ExamProcess was deactivated.')
});

// Scenario: I filter course
Given(/^I filter AT001$/, () => {
    Cypress.PageAdminApprovalProcesses.filter('Course', 'AT001')
});
Then(/^I verify filter result course is right$/, () => {
    let tableInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 2,
                value: courseFullName[0],
            }
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
});
Then(/^I filter all course$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(0)
});

// Scenario: I filter service type
Given(/^I filter exam type$/, () => {
    Cypress.PageAdminApprovalProcesses.filter('Service type', 'Exam')
});
Then(/^I verify filter result exam type is right$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                value: process_1.type,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_1)
    let columnInfo_2 = {
        rowIndex: 2,
        columns: [
            {
                index: 3,
                value: process_3.type,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_2)
});

// Scenario: I filter status
Given(/^I filter active status$/, () => {
    Cypress.PageAdminApprovalProcesses.filter('Status', 'Active')
});
Then(/^I verify filter result active status is right$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_1)
});
When(/^I filter inactive status$/, () => {
    Cypress.PageAdminApprovalProcesses.filter('Status', 'Active')
});
Then(/^I verify filter result inactive status is right$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                value: 'Inactive',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_1)
});
Then(/^I filter all status$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(2)
});

// I filter paper type and select all tyoe
When(/^I filter paper type$/, () => {
    Cypress.PageAdminApprovalProcesses.filter('Service type', 'Exam')
});
Then(/^I verify filter result paper type is right$/, () => {
    let columnInfo_2 = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                value: process_3.type,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_2)
    let columnInfo_1 = {
        rowIndex: 2,
        columns: [
            {
                index: 3,
                value: process_2.type,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_1)
});
Then(/^I filter all type$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(1)
});

// Scenario: I activate the exam type process
Given(/^I check the exam type process$/, () => {
    Cypress.auiCommon.chooseCheckbox(1)
});
Then(/^I click activate button on top$/, () => {
    Cypress.PageAdminApprovalProcesses.clickTopButton(2)
});
And(/^I confirm activate$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
And(/^I verify activate successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The approval process ExamProcess was activated.')
});

// Scenario: I search paper process
Given(/^I search paper process$/, () => {
    Cypress.PageReport.search(process_2.name)
});
Then(/^I verify search result is right$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: process_2.name,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_1)
});
Then(/^I clear search$/, () => {
    Cypress.PageAdminAnnouncement.clearSearch()
});

// Scenario: I view exam process
Given(/^I click all type process name$/, () => {
    Cypress.PageAdminApprovalProcesses.openViewProcess(process_3.name)
});
Then(/^I verify the process all info are right$/, () => {
    let basicInfo = [
        [courseFullName[2], courseFullName[3]],
        process_3.type,
        new Date(),
        system,
        'Active'
    ]
    let stageInfo = ['Stage 1', invigilator2, '']
    Cypress.PageAdminApprovalProcesses.verifyViewProcessInfo(basicInfo, process_3.description, stageInfo)
});
And(/^I click close button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});

// Scenario: I edit exam type process and delete one stage
Then(/^I click edit button on top$/, () => {
    Cypress.PageAdminApprovalProcesses.clickTopButton(1)
});
Then(/^I edit the name$/, () => {
    Cypress.PageAdminApprovalProcesses.inputName(process_1.editName)
});
Then(/^I delete stage 1$/, () => {
    Cypress.PageAdminApprovalProcesses.deleteStage(0)
});
And(/^I verify cannot click delete stage button when only have one stage$/, () => {
    Cypress.PageAdminApprovalProcesses.verifyStageBtnDisabled()
});
Then(/^I verify update successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The approval process was updated.')
});
Then(/^I verify update successfully on table$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: process_1.editName,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(columnInfo_1)
});

// Scenario: I delete all process
Given(/^I check all process$/, () => {
    Cypress.auiCommon.chooseCheckbox(0)
});
Then(/^I click delete button on top$/, () => {
    Cypress.PageAdminApprovalProcesses.clickTopButton(4)
});
And(/^I confirm delete$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
And(/^I verify delete successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The processes were deleted.')
});