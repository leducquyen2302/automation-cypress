/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let cu_env_string = Cypress.env('current_Env')
let cu_ten_string = Cypress.env('current_ten')
let env = Cypress.env(cu_env_string)
let system = env[cu_ten_string].System
let searchStaff = env[cu_ten_string].CM
let searchStu = env[cu_ten_string].Candidates[4]
let property1 = 'Property_' + new Date().toLocaleString()
let property2 = ''

Given(/^I login as system$/, () => {
    cy.LoginExamAsSystem()
    cy.wait(1500)
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I enter the account management page$/, () => {
    Cypress.PageAdminCommon.clickCardbyName('Administration', 'Account management')
    cy.waitLoading()
});
When(/^I search staff$/, () => {
    Cypress.PageAdminAccount.search(searchStaff.display)
});
Then(/^I verify search staff result$/, () => {
    let staffInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Type',
                value: 'User',
            },
            {
                index: 2,
                display: 'Staff ID',
                value: searchStaff.staffID,
            },
            {
                index: 3,
                display: 'User ID',
                value: searchStaff.userid
            },
            {
                index: 4,
                display: 'Email address',
                value: searchStaff.userid
            },
            {
                index: 5,
                display: 'Mobile phone',
                value: ''
            },
            {
                index: 6,
                display: 'Status',
                value: 'Active'
            },
            {
                index: 7,
                display: 'Property',
                value: ''
            },
        ]
    }
    Cypress.PageAdminAccount.verifyTable(staffInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, searchStaff.display)
});
When(/^I click edit profile button$/, () => {
    Cypress.PageAdminAccount.editAccountProfile()
});
Then(/^I add property1$/, () => {
    Cypress.PageAdminAccount.inputProperty(property1, true, true)
});
And(/^I verify can not add same name$/, () => {
    Cypress.PageAdminAccount.inputProperty(property1)
    Cypress.PageAdminAccount.verifySameProperty()
});
Then(/^I add property2 and save$/, () => {
    Cypress.PageAdminAccount.inputProperty(' 2', true)
    property2 = property1 + ' 2'
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});

// Scenario: Filter user in address book in role management
Given(/^I enter role management and open address book$/, () => {
    Cypress.PageAdminCommon.clickAdminCard_ByLeftNavigationBar('Role management')
    Cypress.PageAdminAccount.editAccountProfile(0)
    Cypress.PageAdminCommon.openAddressBook()
});
When(/^I filter user in address book$/, () => {
    Cypress.PageAdminCommon.filterAddressBook('Type', 'User')
});
Then(/^I verify filter user result is right$/, () => {
    let addressBookInfo = {
        rowIndex: 2,
        columns: [
            {
                index: 2,
                display: 'Type',
                value: 'User'
            }
        ]
    }
    Cypress.PageAdminCommon.verifyAddressBookTable(addressBookInfo)
});

// Scenario: Verify address book selected user prompt in role management
When(/^I search the System and as the first staff$/, () => {
    Cypress.PageAdminCourse.searchUser_InAddressBook(system.display)
    Cypress.PageAdminCourse.ClickAddUserBtn_InAddressbook(0)
});
Then(/^I verify the selected one user prompt display is right$/, () => {
    Cypress.PageAdminRolePage.verifyAddressBook_selectedPrompt(1)
});
When(/^I search the CM and as the second staff$/, () => {
    Cypress.PageAdminCourse.searchUser_InAddressBook(searchStaff.display)
    Cypress.PageAdminCourse.ClickAddUserBtn_InAddressbook(0)
});
Then(/^I verify the selected two users prompt display is right$/, () => {
    Cypress.PageAdminRolePage.verifyAddressBook_selectedPrompt(2)
});
When(/^I click remove all button$/, () => {
    Cypress.PageAdminRolePage.clickRemoveAllBtn_InAddressBook()
});
Then(/^I verify the selected no users prompt display is right$/, () => {
    Cypress.PageAdminRolePage.verifyAddressBook_selectedPrompt(0)
});

// Scenario: Filter property in address book in role management
Given(/^I clear search$/, () => {
    Cypress.auiCommon.clearSearch_InDialog()
});
When(/^I filter property in address book$/, () => {
    Cypress.PageAdminCommon.filterAddressBook('Property', property2)
});
Then(/^I verify filter property result is right$/, () => {
    let addressBookInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Staff ID',
                value: searchStaff.staffID
            },
            {
                index: 2,
                value: 'User'
            },
            {
                index: 3,
                display: 'User ID',
                value: searchStaff.userid
            },
            {
                index: 4,
                display: 'Property',
                value: property1
            },
            {
                index: 4,
                display: 'Property',
                value: '1'
            }
        ]
    }
    Cypress.PageAdminCommon.verifyAddressBookTable(addressBookInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, searchStaff.display)
});
When(/^I click property number$/, () => {
    Cypress.PageAdminAccount.clickPropertyNum()
});
Then(/^I verify all property$/, () => {
    Cypress.PageAdminAccount.verifyAllProperty(0, property1)
    Cypress.PageAdminAccount.verifyAllProperty(1, property2)
});

// Scenario: Filter property in account management
Given(/^I enter account management by left navigation$/, () => {
    Cypress.PageAdminCommon.clickAdminCard_ByLeftNavigationBar('Account management')
});
When(/^I filter property in account management$/, () => {
    Cypress.PageAdminAccount.staffListFilter('Property', property1)
});
Then(/^I verify staff property$/, () => {
    let stuInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 7,
                display: 'Property',
                value: property1
            },
            {
                index: 7,
                value: '1'
            }
        ]
    }
    Cypress.PageAdminAccount.verifyTable(stuInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, searchStaff.display)
});

Then(/^I verify staff info in panel$/, () => {
    let panelContent = {
        columns: [
            {
                index: 0,
                display: "Staff name",
                value: searchStaff.display
            },
            {
                index: 1,
                display: "Staff ID",
                value: searchStaff.staffID
            },
            {
                index: 2,
                display: "User ID",
                value: searchStaff.userid
            }
        ]
    }
    Cypress.PageAdminAccount.verifyProfilePanel(panelContent)
    Cypress.PageAdminAccount.verifyEchoProperty_InPanel(0, property1)
    Cypress.PageAdminAccount.verifyEchoProperty_InPanel(1, property2)
});
Then(/^I delete all property$/, () => {
    Cypress.PageAdminAccount.deleteProperty(1)
    Cypress.PageAdminAccount.deleteProperty(0)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});

// Scenario: Candidate List, Search Candidate, Edit Candidate profile
Given(/^I goto candidate list page$/, () => {
    Cypress.PageAdminAccount.switchList(1)
});
When(/^I search student$/, () => {
    Cypress.PageAdminAccount.search(searchStu.userid)
});
Then(/^I verify search student result is right$/, () => {
    let stuInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Type',
                value: 'User',
            },
            {
                index: 2,
                display: 'Candidate ID',
                value: searchStu.id
            },
            {
                index: 3,
                display: 'User ID',
                value: searchStu.userid
            },
            {
                index: 4,
                display: 'Email address',
                value: searchStu.userid
            },
            {
                index: 7,
                display: 'Status',
                value: 'Active'
            },
            {
                index: 8,
                display: 'Property',
                value: ''
            }
        ]
    }
    Cypress.PageAdminAccount.verifyTable(stuInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, searchStu.name)
});
Then(/^I verify student info in panel$/, () => {
    let panelContent = {
        columns: [
            {
                index: 0,
                display: 'Candidate name',
                value: searchStu.name,
            },
            {
                index: 1,
                display: "Candidate ID",
                value: searchStu.id
            },
            {
                index: 2,
                display: 'User ID',
                value: searchStu.userid
            }
        ]
    }
    Cypress.PageAdminAccount.verifyProfilePanel(panelContent)
});
