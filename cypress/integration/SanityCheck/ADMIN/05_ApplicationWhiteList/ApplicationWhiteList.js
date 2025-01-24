/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const { and } = require("ramda")

const toast = ['Enter a value to proceed.',
    'At least one process must be added.'
]
let application_win_name = 'App_win_name' + new Date().toLocaleString()
let application_mac_name = 'App_mac_name' + new Date().toLocaleString()
let application_version = 'App_version' + new Date().toLocaleString()
let application_description = 'App_description' + new Date().toLocaleString()
const application_location = "C:/Program Files/Microsoft Office/root/Office16"
let application_arguments = 'App_arguments' + new Date().toLocaleString()
const application_Registrypath = 'HKEY_LOCAL_MACHINE/SOFTWARE/Microsoft/Windows/CurrentVersion/Uninstall/O365ProPlusRetail - en-us'
let processName1 = 'Process1 Name'
let processName2 = 'Process2 Name'
const BundleID = 'com.microsoft.Excel'

// Scenario:Verify Windows build-in data
Given(/^Exam admin登录系统,进入Application list$/, () => {
    cy.LoginExamAsSystem()
    cy.wait(1500)
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Authorised applications')
    cy.waitLoading()
});

When(/^I search Calculator$/, () => {
    Cypress.PageAdminApplication.search('Calculator')
});
Then(/^I verify Calculator info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Calculator',
            },
            {
                index: 3,
                value: 'C:\\\\Windows\\\\System32',
            },
            {
                index: 6,
                value: 'Classic desktop',
            },
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Google Chrome$/, () => {
    Cypress.PageAdminApplication.search('Google Chrome')
});
Then(/^I verify Google Chrome info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Application name',
                value: 'Google Chrome',
            },
            {
                index: 3,
                display: 'Application location',
                value: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application',
            },
            {
                index: 5,
                display: 'Registry path',
                value: 'HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Google Chrome',
            },
            {
                index: 6,
                display: 'Application type',
                value: 'Classic desktop',
            },
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft Excel$/, () => {
    Cypress.PageAdminApplication.search('Microsoft Excel')
});
Then(/^I verify Microsoft Excel info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft Excel',
            },
            {
                index: 3,
                value: 'C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16',
            },
            {
                index: 5,
                value: 'HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\O365ProPlusRetail - en-us',
            },
            {
                index: 6,
                value: 'Classic desktop',
            },
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft PowerPoint$/, () => {
    Cypress.PageAdminApplication.search('Microsoft PowerPoint')
});
Then(/^I verify Microsoft PowerPoint info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft PowerPoint',
            },
            {
                index: 3,
                value: 'C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16',
            },
            {
                index: 5,
                value: 'HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\O365ProPlusRetail - en-us',
            },
            {
                index: 6,
                value: 'Classic desktop',
            },
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft Teams$/, () => {
    Cypress.PageAdminApplication.search('Microsoft Teams')
});
Then(/^I verify Microsoft Teams info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft Teams',
            },
            {
                index: 3,
                value: '<localappdata>\\\\microsoft\\\\teams',
            },
            {
                index: 5,
                value: 'HKEY_CURRENT_USER\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Teams',
            },
            {
                index: 6,
                value: 'Classic desktop',
            },
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft Word$/, () => {
    Cypress.PageAdminApplication.search('Microsoft Word')
});
Then(/^I verify Microsoft Word info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft Word',
            },
            {
                index: 3,
                value: 'C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16',
            },
            {
                index: 5,
                value: 'HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\O365ProPlusRetail - en-us',
            },
            {
                index: 6,
                value: 'Classic desktop',
            },
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario:Windows Add/Edit/Delete application,创建后能成功search
Given(/^点击windows-add application button$/, () => {
    Cypress.PageAdminApplication.clickAddApplication()
});
When(/^Application name、Application location、Processes为空时点击Add$/, () => {
    Cypress.PageAdminApplication.clickAdd(0)
});
Then(/^不能add,提示信息正确$/, () => {
    Cypress.PageAdminApplication.verifyPromptInfo(0, toast[0])
    Cypress.PageAdminApplication.verifyPromptInfo(1, toast[0])
    Cypress.PageAdminApplication.verifyPromptInfo(3, toast[1])
});
And(/^I verify scope default is Exam level$/, () => {
    Cypress.PageAdminApplication.verifyDefaultScope('Exam')
});
When(/^I add all info and choose global level$/, () => {
    Cypress.PageAdminApplication.inputInfo(0, application_win_name)
    Cypress.PageAdminApplication.inputInfo(1, application_version)
    Cypress.PageAdminApplication.inputInfo(2, application_description)
    Cypress.PageAdminApplication.inputInfo(3, application_location)
    Cypress.PageAdminApplication.inputInfo(4, application_arguments)
    Cypress.PageAdminApplication.inputInfo(5, application_Registrypath)
    Cypress.PageAdminApplication.chooseScope('windows', 1)
    Cypress.PageAdminApplication.clickAddprocess(processName1)
    Cypress.PageAdminApplication.clickAddprocess(processName2)
});
Then(/^成功Add,并且Search到结果$/, () => {
    Cypress.PageAdminApplication.clickAdd(0)
    Cypress.PageAdminApplication.search(application_win_name)
});
And(/^I verify scope is Global in table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 7,
                value: 'Global',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
And(/^点击Application name,内容正确$/, () => {
    Cypress.PageAdminApplication.clickApplicationName()
    Cypress.PageAdminApplication.applicationDetails(0, application_version)
    Cypress.PageAdminApplication.applicationDetails(1, application_location)
    Cypress.PageAdminApplication.applicationDetails(2, application_arguments)
    Cypress.PageAdminApplication.applicationDetails(3, application_Registrypath)
    Cypress.PageAdminApplication.applicationDetails(4, 'Classic desktop')
    Cypress.PageAdminApplication.applicationDetails(5, 'Global')
});
When(/^在details页面点击Edit,填写Description,删除第二个process$/, () => {
    Cypress.PageAdminApplication.clickDetailEdit()
    Cypress.PageAdminApplication.inputInfo(4, application_description)
    Cypress.PageAdminApplication.deleteProcess()
});
Then(/^I verify the echo scope is right$/, () => {
    Cypress.PageAdminApplication.verifyDefaultScope('Global')
});
And(/^I modify scope is Exam level$/, () => {
    Cypress.PageAdminApplication.chooseScope('windows', 0)
    Cypress.PageAdminApplication.clickSave()
});
When(/^I filter scope with global level$/, () => {
    Cypress.PageAdminApplication.filterScope('Exam')
});
Then(/^I verify filter no result$/, () => {
    Cypress.PageSampleReport.verifyMessage('No items to show in this view.')
});
When(/^I filter scope with exam level$/, () => {
    Cypress.PageAdminApplication.filterScope('Exam')
    Cypress.PageAdminApplication.filterScope('Global')
});
Then(/^I verify filter result$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 7,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
Then(/^Delete上一步创建的Win Application$/, () => {
    Cypress.PageAdminApplication.appTableRowCheckbox(0)
    Cypress.PageAdminApplication.clickDelApp()
});

// Scenario:Windows Add/Edit/Delete application,创建后能成功search
Given(/^进入Mac Application list$/, () => {
    Cypress.PageAdminApplication.clickMacList()
});
When(/^I search Calculator$/, () => {
    Cypress.PageAdminApplication.search('Calculator')
});
Then(/^I verify Mac Calculator info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Calculator',
            },
            {
                index: 3,
                value: 'com.apple.calculator',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Google Chrome$/, () => {
    Cypress.PageAdminApplication.search('Google Chrome')
});
Then(/^I verify Mac Google Chrome info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Application name',
                value: 'Google Chrome',
            },
            {
                index: 3,
                display: 'Bundle ID',
                value: 'com.google.Chrome',
            },
            {
                index: 4,
                display: 'Team ID',
                value: 'EQHXZ8M8AV',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft Excel$/, () => {
    Cypress.PageAdminApplication.search('Microsoft Excel')
});
Then(/^I verify Mac Microsoft Excel info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft Excel',
            },
            {
                index: 3,
                value: 'com.microsoft.Excel',
            },
            {
                index: 4,
                value: 'UBF8T346G9',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft PowerPoint$/, () => {
    Cypress.PageAdminApplication.search('Microsoft PowerPoint')
});
Then(/^I verify Mac Microsoft PowerPoint info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft PowerPoint',
            },
            {
                index: 3,
                value: 'com.microsoft.Powerpoint',
            },
            {
                index: 4,
                value: 'UBF8T346G9',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft Teams$/, () => {
    Cypress.PageAdminApplication.search('Microsoft Teams')
});
Then(/^I verify Mac Microsoft Teams info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft Teams',
            },
            {
                index: 3,
                value: 'com.microsoft.teams',
            },
            {
                index: 4,
                value: 'UBF8T346G9',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Microsoft Word$/, () => {
    Cypress.PageAdminApplication.search('Microsoft Word')
});
Then(/^I verify Mac Microsoft Word info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Microsoft Word',
            },
            {
                index: 3,
                value: 'com.microsoft.Word',
            },
            {
                index: 4,
                value: 'UBF8T346G9',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Safari$/, () => {
    Cypress.PageAdminApplication.search('Safari')
});
Then(/^I verify Mac Safari info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Safari',
            },
            {
                index: 3,
                value: 'com.apple.Safari',
            },
            {
                index: 5,
                value: 'Exam',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Sogou$/, () => {
    Cypress.PageAdminApplication.search('Sogou')
});
Then(/^I verify Mac Sogou info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Sogou',
            },
            {
                index: 3,
                value: 'com.sogou.inputmethod.sogou',
            },
            {
                index: 5,
                value: 'Global',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search ESET Cyber Security$/, () => {
    Cypress.PageAdminApplication.search('ESET Cyber Security')
});
Then(/^I verify Mac ESET Cyber Security info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'ESET Cyber Security',
            },
            {
                index: 3,
                value: 'com.eset.network',
            },
            {
                index: 5,
                value: 'Global',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I search Cisco$/, () => {
    Cypress.PageAdminApplication.search('Cisco')
});
Then(/^I verify Mac Cisco info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'Cisco',
            },
            {
                index: 3,
                value: 'com.cisco.anyconnect.macos.acsockext',
            },
            {
                index: 5,
                value: 'Global',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario:Mac Add/Edit/Delete application,创建后能成功search
Given(/^点击Mac-add application button$/, () => {
    Cypress.PageAdminApplication.clickAddApplication()
});
When(/^Application name、Bundle ID为空时点击Add$/, () => {
    Cypress.PageAdminApplication.clickAdd(0)
});
Then(/^不能add,提示信息准确$/, () => {
    Cypress.PageAdminApplication.verifyPromptInfo(0, toast[0])
    Cypress.PageAdminApplication.verifyPromptInfo(1, toast[0])
});
When(/^填写Application name、Bundle ID后,点击Add$/, () => {
    Cypress.PageAdminApplication.inputInfo(0, application_mac_name)
    Cypress.PageAdminApplication.inputInfo(3, BundleID)
    Cypress.PageAdminApplication.clickAdd(0)
});
Then(/^Add成功,并且Search到结果$/, () => {
    Cypress.PageAdminApplication.search(application_mac_name)
});
When(/^I click edit button$/, () => {
    Cypress.PageAdminApplication.appTableRowCheckbox(0)
    Cypress.PageAdminApplication.clickEdit()
});
Then(/^I input description,choose global level$/, () => {
    Cypress.PageAdminApplication.inputInfo(4, application_description)
    Cypress.PageAdminApplication.chooseScope('mac', 1)
    Cypress.PageAdminApplication.clickSave()
});
And(/^I verify table info$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: application_mac_name,
            },
            {
                index: 3,
                value: BundleID,
            },
            {
                index: 5,
                value: 'Global',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
Then(/^Delete上一步创建的Mac Application$/, () => {
    Cypress.PageAdminApplication.appTableRowCheckbox(0)
    Cypress.PageAdminApplication.clickDelApp()
});