/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let student001 = ''
const shortcut1 = ['ATshortcut1', '1', 'Ctrl + 1', 'command + 1']
const shortcut1_edit = ['ATshortcut1_edit', 'A', 'Ctrl + 1', 'command + A']
const shortcut2 = ['ATshortcut2', '2', '3', 'Ctrl + 2', 'command + 3']
const toast = [
    'The shortcut was created.',
    'The shortcut was updated.',
    'The shortcut was deleted.',
    'The selected shortcuts were deactivated.',
    'The shortcut was activated.'
]

let originalKeyMinutes = 5
let originalRestrictMinutes = 30
let newMinutes = 1

// create exam
let ExamName = '', ExamStartTime = ''
let paperName = 'ATPaper_Unpublish' + new Date().toLocaleString()
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
    name: "AT_Entrance restriction",
    courseCode: "AT001",
    courseId: '',
    startOffset: { level: "min", off: 1 },
    startTime: "",
    duration: 10,
    endTime: "",
    isSave2LocalFile: true,
    // studentCount: 3,
    isAppend: false,
    filePath: 'enteringRestrictionExam.json',
    enteringRestriction: newMinutes,
    isOpenB: true,
    instruction: 'This is a verify Entrance restriction exam',
    sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 4 }]
}
let paperInfo = {
    name: paperName,
    sections: section_temp
}
let Question1 = {}
before(() => {
    cy.fixture("questionInfo").then(($ques) => {
        Question1 = $ques[0]
        section_temp[0].questions[0].question = Question1
    })
    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile(`cypress/fixtures/${examInfo.filePath}`).then(($data) => {
        ExamName = $data.examInfo.name
        ExamStartTime = $data.examInfo.startTime
    })
})

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    student001 = env[ct].Candidates[0]
})

// Scenario: I verify conduct settings card
Given(/^I login as exam admin and verify userId is checked$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminGlobalSettings.confirmCheckedUserId()
});
Then(/^I verify conduct settings configuration position,instruction and enter$/, () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Conduct settings')
});

// Scenario: I add shortcut
When(/^I click add shortcut button and save button$/, () => {
    Cypress.ConductSettings.clickActionButton(0)
    Cypress.ConductSettings.saveShortcut()
});
Then(/^I verify the illegal tips$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
});
And(/^I verify the keep same short cut for each system button default is opened$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(0, 'true')
});
Then(/^I add shortcut1 with keep same short cut for each system$/, () => {
    Cypress.ConductSettings.inputFunction(shortcut1[0])
    Cypress.ConductSettings.openVirtualKeyboard(0)
    Cypress.ConductSettings.chooseShortcut('windows', shortcut1[1])
});
And(/^I verify windows and mac display right$/, () => {
    Cypress.ConductSettings.verifyChoosedShortcut(0, shortcut1[2])
    Cypress.ConductSettings.verifyChoosedShortcut(1, shortcut1[3])
});
Then(/^I click save and add another button$/, () => {
    Cypress.PageAdminQuickLink.saveAndAddAnother()
});
And(/^I verify save success tip$/, () => {
    Cypress.auiCommon.verifyToast(toast[0])
});
Then(/^I add shortcut2 without keep same short cut for each system$/, () => {
    Cypress.ConductSettings.inputFunction(shortcut2[0])
    Cypress.auiCommon.clickSwitchBtn_InModal(0)
    Cypress.ConductSettings.openVirtualKeyboard(0)
    Cypress.ConductSettings.chooseShortcut('windows', shortcut2[1])
    Cypress.ConductSettings.openVirtualKeyboard(1)
    Cypress.ConductSettings.chooseShortcut('mac', shortcut2[2])
    Cypress.ConductSettings.saveShortcut()
});

// Scenario: I edit shortcut
When(/^I search shortcut1$/, () => {
    Cypress.ConductSettings.search(shortcut1[0])
});
Then(/^I verify shortcut1 all column$/, () => {
    let shortcut1_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Function',
                value: shortcut1[0],
            },
            {
                index: 2,
                display: 'Shortcut in Windows',
                value: shortcut1[2],
            },
            {
                index: 3,
                display: 'Shortcut in macOS',
                value: shortcut1[3],
            },
            {
                index: 4,
                display: 'Type',
                value: 'Custom',
            },
            {
                index: 5,
                display: 'Status',
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut1_info)
});
Then(/^I edit shortcut1 all info with named shortcut1_edit, not keep same, edit mac shorcut$/, () => {
    Cypress.auiCommon.chooseCheckbox(0)
    Cypress.ConductSettings.clickActionButton(1)
    Cypress.ConductSettings.inputFunction(shortcut1_edit[0])
    Cypress.auiCommon.clickSwitchBtn_InModal(0)
    Cypress.ConductSettings.openVirtualKeyboard(1)
    Cypress.ConductSettings.chooseShortcut('mac', shortcut1[1])
    Cypress.ConductSettings.openVirtualKeyboard(1)
    Cypress.ConductSettings.chooseShortcut('mac', shortcut1_edit[1])
    Cypress.ConductSettings.saveShortcut()
});
And(/^I verify edit success tip$/, () => {
    Cypress.auiCommon.verifyToast(toast[1])
});
When(/^I search shortcut$/, () => {
    Cypress.ConductSettings.search('ATshortcut')
});
Then(/^I select all and click deactivate$/, () => {
    Cypress.auiCommon.chooseCheckbox(0)
    Cypress.ConductSettings.clickActionButton(3)
});
And(/^I verify deactivate popup info$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('Are you sure you want to deactivate the 2 selected shortcuts?')
});
Then(/^I confirm deactivate and verify deactivate success tip$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast(toast[3])
});
And(/^I verify all column info$/, () => {
    let shortcut2_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: shortcut2[0],
            },
            {
                index: 2,
                value: shortcut2[3],
            },
            {
                index: 3,
                value: shortcut2[4],
            },
            {
                index: 5,
                value: 'Inactive',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut2_info)
    let shortcut1_edit_info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: shortcut1_edit[0],
            },
            {
                index: 2,
                value: shortcut1_edit[2],
            },
            {
                index: 3,
                value: shortcut1_edit[3],
            },
            {
                index: 5,
                value: 'Inactive',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut1_edit_info)
});
When(/^I select shortcut2 and click activate$/, () => {
    Cypress.auiCommon.chooseCheckbox(1)
    Cypress.ConductSettings.clickActionButton(2)
});
Then(/^I verify activate popup info$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('Are you sure you want to activate this shortcut?')
});
Then(/^I confirm activate and verify activate success tip$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast(toast[4])
});
And(/^I verify shortcut2 status$/, () => {
    let shortcut2_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: shortcut2[0],
            },
            {
                index: 5,
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut2_info)
});
When(/^I select all$/, () => {
    Cypress.auiCommon.chooseCheckbox(0)
});
Then(/^I verify activate button and deactivate button cannot click$/, () => {
    Cypress.ConductSettings.verifyButtonDisabled(2)
    Cypress.ConductSettings.verifyButtonDisabled(3)
});

// Scenario: I verify filter
Given(/^I cancel search$/, () => {
    Cypress.PageAdminCourse.clearSearch()
});
Then(/^I filter type is custom$/, () => {
    Cypress.ConductSettings.filter('Type', 'Custom')
});
And(/^I search shortcut$/, () => {
    Cypress.ConductSettings.search('ATshortcut')
});
Then(/^I verify result with these two function names is right$/, () => {
    let shortcut2_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: shortcut2[0],
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut2_info)
    let shortcut1_edit_info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: shortcut1_edit[0],
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut1_edit_info)
});
When(/^I filter status is inactive$/, () => {
    Cypress.ConductSettings.filter('Status', 'Inactive')
});
Then(/^I verify result with the function name is right$/, () => {
    let shortcut1_edit_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: shortcut1_edit[0],
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut1_edit_info)
});

// Scenario: I delete shortcut by search shortcut
Given(/^I cancel filter$/, () => {
    cy.reload()
    cy.waitLoading()
});
When(/^I search shortcut by shortcut1_edit's windows shortcut$/, () => {
    Cypress.ConductSettings.search(shortcut1_edit[2])
});
Then(/^I verify search windows shortcut result is right$/, () => {
    let shortcut1_edit_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: shortcut1_edit[0],
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut1_edit_info)
});
Then(/^I click delete$/, () => {
    Cypress.auiCommon.chooseCheckbox(0)
    Cypress.ConductSettings.clickActionButton(4)
});
And(/^I verify delete popup info$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('Are you sure you want to delete this shortcut?')
});
Then(/^I confirm delete and verify delete success tip$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast(toast[2])
});
When(/^I search shortcut by shortcut2's mac shortcut$/, () => {
    Cypress.ConductSettings.search(shortcut2[4])
});
Then(/^I verify search shortcut in macos result info$/, () => {
    let shortcut2_info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: shortcut2[0],
            }
        ]
    }
    Cypress.auiCommon.verifyTable(shortcut2_info)
});
Then(/^I delete it$/, () => {
    Cypress.auiCommon.chooseCheckbox(0)
    Cypress.ConductSettings.clickActionButton(4)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

// Scenario: I verify shortcut bulid-in data
Then(/^I filter type is default and status is all$/, () => {
    cy.wait(2000)
    Cypress.ConductSettings.filter('Type', 'Default')
});
When(/^I click show 100 rows$/, () => {
    Cypress.ConductSettings.chooseShowRows(100)
});
Then(/^I verify build in data number$/, () => {
    Cypress.ConductSettings.verifyDefaultDataNumber(52)
});