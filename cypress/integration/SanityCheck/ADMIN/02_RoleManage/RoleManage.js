/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let current = Cypress.env('current_Env')
let ct = Cypress.env('current_ten')
let env = Cypress.env(current)  //EMS_UAT对象
let addUser = env[ct].Candidates[5].name

const validationMessage = 'Enter a value to proceed.'
const description = {
    appAdmin: `This is Application Admin role Description test by cypress at ${new Date()}`,
    examAdmin: `This is the administrator role at exam level.`,
    otherRole: `Other role description ${new Date()}`,
}
const customizedRole = {
    roleName: `Customized roleName ${new Date()}`,
    description: `Customized description ${new Date()}`
}

before(() => {
    cy.window().then(win => {
        let orHt = win.innerHeight, orWid = win.innerWidth
        cy.log(`${orHt},${orWid}`)
        cy.viewport(1024, 768)
        cy.wait(800)
        cy.viewport(orWid, orHt)
    })
})

// I enter role management can see app admin and exam admin
Given(/^I am login the Examna sytem and visit Admin page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I click the Role management card in Admin page$/, () => {
    Cypress.PageAdminCommon.clickCardbyName('Administration', 'Role management')
});

// Scenario: Verify app admin in global
Given(/^I check app admin and click edit button$/, () => {
    Cypress.PageAdminRolePage.selectRoleCheckbox(0)
    Cypress.PageAdminRolePage.clickEditByTop()
});
Then(/^I verify app admin role name display right and can not edit$/, () => {
    Cypress.PageAdminRolePage.verifyRoleNameDisabled('Application admin')
});
And(/^I verify app admin permissions display right and all checked, can not edit$/, () => {
    Cypress.PageAdminRolePage.verifyAppAdminPermission()
});
Then(/^I add app admin description, and add addUser$/, () => {
    Cypress.PageAdminRolePage.inputDescription(description.appAdmin)
    Cypress.PageAdminRolePage.inputUsers(addUser)
});
Then(/^I click save button$/, () => {
    Cypress.PageAdminRolePage.saveForm()
});
And(/^I verify app admin all info is right on table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Role name',
                value: 'Application admin'
            },
            {
                index: 2,
                display: 'Description',
                value: description.appAdmin
            },
            {
                index: 3,
                display: 'Type',
                value: 'Built-in',
            },
            // {
            //     index: 4,
            //     display: 'Users',
            //     value: addUser,
            // },
            {
                index: 5,
                display: 'Permissions',
                value: 74,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I click app admin permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(0)
});
Then(/^I verify app admin all info is right on details$/, () => {
    Cypress.PageAdminRolePage.verifyRoleDetails(['Application admin', description.appAdmin])
});
Then(/^I click edit button on details$/, () => {
    Cypress.PageAdminRolePage.clickEditByDetails()
});
Then(/^I verify description echo is right on panel$/, () => {
    Cypress.PageAdminRolePage.verifyEchoDescription_OnPanel(description.appAdmin)
});
Then(/^I remove addUser$/, () => {
    Cypress.PageAdminRolePage.removeUsers(addUser)
});
And(/^I verify app admin users is right on table$/, () => {
    Cypress.auiCommon.verifyValueNotInTable(1, 5, addUser)
});

// Scenario: Verify exam admin in global
Given(/^I check exam admin and click edit button$/, () => {
    Cypress.PageAdminRolePage.selectRoleCheckbox(1)
    Cypress.PageAdminRolePage.clickEditByTop()
});
Then(/^I verify exam admin role name display right and can not edit$/, () => {
    Cypress.PageAdminRolePage.verifyRoleNameDisabled('Exam admin')
});
And(/^I verify exam admin permissions display, checked right$/, () => {
    Cypress.PageAdminRolePage.verifyExamAdminPermission()
});
Then(/^I click cancel button on panel$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
And(/^I verify exam admin info is right on table$/, () => {
    let info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: 'Exam admin'
            },
            {
                index: 2,
                value: description.examAdmin
            },
            {
                index: 3,
                value: 'Built-in',
            },
            {
                index: 5,
                value: 61,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I also check app admin$/, () => {
    Cypress.PageAdminRolePage.selectRoleCheckbox(0)
});
Then(/^I find delete button is disabled$/, () => {
    Cypress.PageAdminRolePage.VerifyDeleteDisabled()
});

// Scenario: Customized role in global
Given(/^I click create role$/, () => {
    Cypress.PageAdminRolePage.createRole()
});
Then(/^I can see role name, users are must be have value$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, validationMessage)
    Cypress.auiCommon.verifyValiMessage(2, validationMessage)
});
Then(/^I input role name, description, users$/, () => {
    Cypress.PageAdminRolePage.inputRoleName(customizedRole.roleName)
    Cypress.PageAdminRolePage.inputDescription(customizedRole.description)
    Cypress.PageAdminRolePage.inputUsers(addUser)
});
When(/^I check role management manage permission$/, () => {
    Cypress.PageAdminRolePage.checkManagePermission(0)
});
Then(/^I can see role management view permission checked and disabled$/, () => {
    Cypress.PageAdminRolePage.verifyPermissionCheckedOrDisabled('view')
});
When(/^I search the customized role$/, () => {
    Cypress.ConductSettings.search(customizedRole.roleName)
});
And(/^I verify customized role info is right on table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: customizedRole.roleName
            },
            {
                index: 2,
                value: customizedRole.description
            },
            {
                index: 3,
                value: 'Custom'
            },
            // {
            //     index: 4,
            //     value: addUser
            // },
            {
                index: 5,
                value: 2,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
Then(/^I delete the customized role$/, () => {
    Cypress.PageAdminRolePage.selectRoleCheckbox(0)
    Cypress.PageAdminApplication.clickDelApp()
});

// Scenario: Verify school admin
Given(/^I switch the school tab$/, () => {
    Cypress.PageAdminCourse.clickTabBar(1)
});
Then(/^I click edit the school role by right button$/, () => {
    Cypress.auiCommon.clickEditBtn(0)
});
And(/^I verify role management manage and view are not checked$/, () => {
    Cypress.PageAdminRolePage.verifyPermissionCheckedOrDisabled('manage', false)
});
Then(/^I input description$/, () => {
    Cypress.PageAdminRolePage.inputDescription(description.otherRole)
});
Then(/^I verify school role info is right on table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                value: 'School Admin'
            },
            {
                index: 1,
                value: description.otherRole
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 30,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
Then(/^I click the school admin permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(0)
});
Then(/^I verify the school admin permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyOrganizationOrCourseManagerPermission()
});

// Scenario: Verify discipline admin
Given(/^I switch the discipline tab$/, () => {
    Cypress.PageAdminCourse.clickTabBar(2)
});
When(/^I click the discipline admin permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(0)
});
Then(/^I verify the discipline admin permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyOrganizationOrCourseManagerPermission()
});

// Scenario: Verify course role
Given(/^I switch the course tab$/, () => {
    Cypress.PageAdminCourse.clickTabBar(3)
});
When(/^I click the class owner permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(0)
});
Then(/^I verify the class owner permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyClassOwnerPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the co course manager permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(1)
});
Then(/^I verify the co course manager permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyOrganizationOrCourseManagerPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the course manager permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(2)
});
Then(/^I verify the course manager permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyOrganizationOrCourseManagerPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the question crafter permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(3)
});
Then(/^I verify the question crafter permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyQuestionCrafterPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
Then(/^I verify course all info is right on table$/, () => {
    let classOwnerInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                value: 'Class owner'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 13,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(classOwnerInfo)
    let coCMInfo = {
        rowIndex: 2,
        columns: [
            {
                index: 0,
                value: 'Co-course manager'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 30,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(coCMInfo)
    let cmInfo = {
        rowIndex: 3,
        columns: [
            {
                index: 0,
                value: 'Course manager'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 30,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(cmInfo)
    let queCraInfo = {
        rowIndex: 4,
        columns: [
            {
                index: 0,
                value: 'Paper crafter'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 6,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(queCraInfo)
});

// Scenario: Verify exam role
Given(/^I switch the exam tab$/, () => {
    Cypress.PageAdminCourse.clickTabBar(4)
});
When(/^I click the checker permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(0)
});
Then(/^I verify the checker permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyCheckerPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the marker permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(1)
});
Then(/^I verify the marker permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyMarkerPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the monitor permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(2)
});
Then(/^I verify the monitor permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyMonitorPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the invigilator permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(3)
});
Then(/^I verify the invigilator permission is right$/, () => {
    Cypress.PageAdminRolePage.verifyInvigilatorPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
When(/^I click the supervisor permission number icon$/, () => {
    Cypress.PageAdminRolePage.clickPermissionNumIcon(4)
});
Then(/^I verify the supervisor permission is right$/, () => {
    Cypress.PageAdminRolePage.verifySupervisorPermission()
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
Then(/^I verify exam all info is right on table$/, () => {
    let checkerInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                value: 'Checker'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 10,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(checkerInfo)
    let markerInfo = {
        rowIndex: 2,
        columns: [
            {
                index: 0,
                value: 'Marker'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 4,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(markerInfo)
    let monitorInfo = {
        rowIndex: 3,
        columns: [
            {
                index: 0,
                value: 'Monitor'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 3,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(monitorInfo)
    let invigilatorInfo = {
        rowIndex: 4,
        columns: [
            {
                index: 0,
                value: 'Invigilator'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 6,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(invigilatorInfo)
    let supervisorInfo = {
        rowIndex: 5,
        columns: [
            {
                index: 0,
                value: 'Supervisor'
            },
            {
                index: 1,
                value: ''
            },
            {
                index: 2,
                value: 'Built-in'
            },
            {
                index: 3,
                value: 9,
            }
        ]
    }
    Cypress.auiCommon.verifyTable(supervisorInfo)
});