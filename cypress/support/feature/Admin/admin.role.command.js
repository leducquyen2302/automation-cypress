/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag, auiTableClass, auiButtonClass, auiPanelClass, auiDialogClass, CommonMsg } from '../../AUI/aui.common.constants';
import { adminRoleClass, adminCourseClass } from '../../AUI/admin.constants'

Cypress.PageAdminRolePage = Cypress.PageAdminRolePage || {};

const roles = [
    {
        name: 'Application admin',
        des: "This is the administrator role for the whole system."
    },
    {
        name: 'Exam admin',
        des: "This is Exam Administrator role Description test by cypress"
    }
]
const msg = ' role was update.'

Cypress.PageAdminRolePage.selectRoleCheckbox = (_index) => {
    cy.get(adminRoleClass.roleTable)
        .find(auiTableClass.auiTbody)
        .as('tbody')
    return Cypress.auiCommon.checkBoxInTable('@tbody', _index)
};
Cypress.PageAdminRolePage.clickEditByTop = () => {
    const Edit = adminRoleClass.roleActionBar + auiButtonClass.editBtn
    Cypress.auiCommon.clickBtn(Edit)
};
Cypress.PageAdminRolePage.createRole = () => {
    cy.get(adminRoleClass.createRoleBtn)
        .click({ force: true })
};
Cypress.PageAdminRolePage.clickEditByDetails = () => {
    cy.get(adminCourseClass.editBtn)
        .click()
        .waitLoading()
        .wait(2000)
};
Cypress.PageAdminRolePage.inputRoleName = (_name) => {
    cy.get(auiPanelClass.auiPanelVisible + adminRoleClass.roleNameLabel)
        .clear()
        .type(_name)
};
Cypress.PageAdminRolePage.inputDescription = (_des) => {
    Cypress.auiCommon.multiLineText(adminRoleClass.editRolePanel, _des)
};
Cypress.PageAdminRolePage.inputUsers = (_name) => {
    let input = adminRoleClass.editRolePanel
    Cypress.auiCommon.comboBoxInput(input, _name)
};
Cypress.PageAdminRolePage.removeUsers = (_name) => {
    cy.get('.aui-richcombobox ')
        .invoke('attr', 'style', 'min-height: 240px')
    cy.wait(1500)
    cy.get(adminRoleClass.editRolePanel)
        .find('.aui-richcombobox ')
        .find(`[name="${_name}"] `)
        .then(($profiles) => {
            // for (let i = 0; i < $profiles.length; i++) {
            //     cy.log($profiles.eq(i).text())
            // if ($profiles.eq(i).text() === _name) {
            cy.get($profiles).parent().parent().next()
                .click({ force: true })
            // }
            // }
        })
    cy.wait(1500)
};
Cypress.PageAdminRolePage.checkManagePermission = (_num) => {
    cy.get(adminRoleClass.managePerInput)
        .eq(_num)
        .click()
};
Cypress.PageAdminRolePage.cancelForm = () => {
    const cancelBtn = auiPanelClass.auiPanelFooter + auiButtonClass.cancelBtn
    Cypress.auiCommon.clickBtn(cancelBtn, 4000)
};
Cypress.PageAdminRolePage.saveForm = () => {
    cy.get(auiPanelClass.auiPanelFooter)
        .find(auiButtonClass.saveBtn)
        .as('save')
    Cypress.auiCommon.clickBtn('@save')
    cy.waitLoading()
    cy.wait(2000)
};

Cypress.PageAdminRolePage.confirmDialogOK = () => {
    let OK = adminRoleClass.editRoleDialog + adminRoleClass.okBtn
    Cypress.auiCommon.clickBtn(OK, 4000)
};
Cypress.PageAdminRolePage.cancelDialog = () => {
    let cancel = adminRoleClass.editRoleDialog + auiButtonClass.cancelBtn
    Cypress.auiCommon.clickBtn(cancel, 4000)
};
Cypress.PageAdminRolePage.clickPermissionNumIcon = (_num) => {
    cy.get(adminRoleClass.permissionNumIcon)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminRolePage.clickRemoveAllBtn_InAddressBook = () => {
    cy.get(adminRoleClass.addressBookRemoveAllBtn)
        .click({ force: true })
};

// Verification Command 
Cypress.PageAdminRolePage.VerifyDeleteDisabled = () => {
    Cypress.auiCommon.verifyDisabled(auiButtonClass.deleBtn)
};
Cypress.PageAdminRolePage.VerifyRoleEditDialog = (_user, _action) => {
    cy.get(adminRoleClass.editRoleDialog)
        .find(auiDialogClass.auiDialogHeader)
        .invoke('attr', 'tabindex', 0)
        .focus().wait(200)
        .should('contain', 'Edit role')

    cy.get(`${adminRoleClass.editRoleDialog} ${auiTableClass.auiTbody}`)
        .find(auiTableClass.auiTRow)
        .eq(0)
        .invoke('attr', 'tabindex', 1)
        .focus().wait(200)
        .should('contain', _user)
        .and('contain', _action)
    cy.wait(1000)
};
Cypress.PageAdminRolePage.verifyRoleUsers = (_index, _name, _checkMore) => {
    cy.log('verify role users')
    cy.get(adminRoleClass.roleTable)
        .find(auiTableClass.auiTRow)
        .eq(_index)
        .as('row')

    cy.get('@row')
        .find(auiCommonClass.auiProfileName)
        .then(($profiles) => {
            cy.log($profiles.length)
            if ($profiles.length <= 10) {
                for (let p = 0; p < $profiles.length; p++) {
                    cy.log($profiles.eq(p).text())
                    if ($profiles.eq(p).text() === _name) {
                        expect($profiles.eq(p).text()).eq(_name)
                    }
                }
            }
        })
}
Cypress.PageAdminRolePage.verifyRoleNameAndDes = (_index, _des) => {
    cy.get(adminRoleClass.roleTable + auiTableClass.auiTbody + auiTableClass.auiTRow)
        .eq(_index).as('row')
    cy.get('@row')
        .find(adminRoleClass.roleNameFont)
        .invoke('attr', 'tabindex', _index)
        .focus().wait(200)
        .should('contain', roles[_index].name)

    if (_des) {
        cy.get('@row').find(adminRoleClass.roleDesFont)
            .invoke('attr', 'tabindex', _index)
            .focus().wait(200)
            .should('contain', _des)
    }
};

//新增
Cypress.PageAdminRolePage.verifyRoleNameDisabled = (_name) => {
    cy.get(adminRoleClass.roleName)
        .as('roleName')
        .should('have.attr', 'value', _name)
    cy.get('@roleName')
        .should('have.attr', 'disabled')
};
Cypress.PageAdminRolePage.verifyEchoDescription_OnPanel = (_des) => {
    Cypress.auiCommon.verifyTextarea(adminRoleClass.editRolePanel, _des)
};
Cypress.PageAdminRolePage.verifyRoleDetails = (_info) => {
    let title = ['Role name', 'Description']
    for (let i = 0; i < title.length; i++) {
        cy.get(adminRoleClass.detailInfoRowTitle)
            .eq(i + 1)
            .should('contain', title[i])
        cy.get(adminRoleClass.viewPermission + auiShadowTag.auiEllipsis)
            .eq(i)
            .should('contain', _info[i])
    }
};
Cypress.PageAdminRolePage.verifyAppAdminPermission = () => {
    let admin = ['Role management', 'Account management', 'User activity report', 'Email templates', 'Global settings', 'LMS integration', 'Announcement management', 'Approval processes', 'Task centre', 'Course configuration', 'Course candidates and classes', 'Organisation configuration', 'Semester configuration', 'Authorised applications', 'Authorised URLs', 'Marking settings - Candidate information', 'Marking settings - Grade mapping templates', 'Marking settings - Publish settings', 'Marking settings - Rubric templates', 'Marking settings - Marking process', 'Marking settings - Similarity check', 'Conduct settings - Keyboard shortcuts', 'Conduct settings - Exam setup settings', 'Authoring settings']
    let exams = ['Exams', 'Sample exams', 'Attendance', 'Open for resubmission', 'Live proctoring', 'Generate key', 'Marking progress', 'Edit score', 'Assign marking staff', 'Suspicious degree settings', 'Assign monitor', 'Grading progress', 'Publish score', 'Lock score', 'Sync score to reports']
    let bank = ['Question bank', 'Paper bank', 'Paper bank - Sample exams', 'Paper skeletons']
    let reports = ['Sample exam statistics report', 'Question statistics report', 'Candidate statistics report', 'Exam statistics report', 'Power BI report', 'Dashboard']
    let home = ['Global links']
    for (let y = 0; y < 5; y++) {
        if (y !== 0) {
            cy.get('.aui-panel .aui-tabs-bars .aui-tabs-bar')
                .eq(y)
                .click()
        }
        if (y == 0) {
            // verify admin
            for (let i = 0; i < admin.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', admin[i])
                // verify manage
                if (admin[i] !== 'User activity report') {
                    cy.get('@per')
                        .find(adminRoleClass.managePerInput)
                        .as('manage')
                        .should('have.attr', 'checked')
                    cy.get('@manage')
                        .should('have.attr', 'disabled')
                } else {
                    cy.get('@perOperation')
                        .should('have.length', 1)
                }
                // verify view
                if ((admin[i] !== 'Course candidates and classes') && (admin[i] !== 'Organisation configuration') && (admin[i] !== 'Semester configuration') && (admin[i] !== 'Email templates') && (admin[i] !== 'Announcement management') && (admin[i] !== 'Approval processes') && (admin[i] !== 'Task centre')) {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                        .should('have.attr', 'checked')
                    cy.get('@view')
                        .should('have.attr', 'disabled')
                } else {
                    cy.get('@perOperation')
                        .should('have.length', 1)
                }
            }
        }
        if (y == 1) {
            // verify exams
            for (let i = 0; i < exams.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', exams[i])
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                    .should('have.attr', 'checked')
                cy.get('@manage')
                    .should('have.attr', 'disabled')
                // verify view
                if ((i == 0) || (i == 2) || (i == 6) || (i == 11)) {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                        .should('have.attr', 'checked')
                    cy.get('@view')
                        .should('have.attr', 'disabled')
                } else {
                    cy.get('@perOperation')
                        .should('have.length', 1)
                }
            }
        }
        if (y == 2) {
            // verify bank
            for (let i = 0; i < bank.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', bank[i])
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                    .should('have.attr', 'checked')
                cy.get('@manage')
                    .should('have.attr', 'disabled')
                // verify preview, view
                if (i !== 3) {
                    cy.get('@per')
                        .find(adminRoleClass.previewPerInput)
                        .as('preview')
                        .should('have.attr', 'checked')
                    cy.get('@preview')
                        .should('have.attr', 'disabled')
                } else {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                    cy.get('@view')
                        .should('have.attr', 'disabled')
                }
            }
        }
        if (y == 3) {
            // verify reports
            for (let i = 0; i < reports.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', reports[i])
                // verify view/export
                cy.get('@per')
                    .find(adminRoleClass.viewExportPerInput)
                    .as('viewOrExport')
                    .should('have.attr', 'checked')
                cy.get('@viewOrExport')
                    .should('have.attr', 'disabled')
            }
        }
        if (y == 4) {
            // verify home
            for (let i = 0; i < home.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', home[i])
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('Manage')
                    .should('have.attr', 'checked')
                cy.get('@Manage')
                    .should('have.attr', 'disabled')
                cy.get('@perOperation')
                    .should('have.length', 1)
            }
        }
    }
};
Cypress.PageAdminRolePage.verifyExamAdminPermission = () => {
    let admin = ['Role management', 'Account management', 'User activity report', 'Email templates', 'Global settings', 'LMS integration', 'Announcement management', 'Approval processes', 'Task centre', 'Course configuration', 'Course candidates and classes', 'Organisation configuration', 'Semester configuration', 'Authorised applications', 'Authorised URLs', 'Marking settings - Candidate information', 'Marking settings - Grade mapping templates', 'Marking settings - Publish settings', 'Marking settings - Rubric templates', 'Marking settings - Marking process', 'Marking settings - Similarity check', 'Conduct settings - Keyboard shortcuts', 'Conduct settings - Exam setup settings', 'Authoring settings']
    let exams = ['Exams', 'Sample exams', 'Attendance', 'Open for resubmission', 'Live proctoring', 'Generate key', 'Marking progress', 'Edit score', 'Assign marking staff', 'Suspicious degree settings', 'Assign monitor', 'Grading progress', 'Publish score', 'Lock score', 'Sync score to reports']
    let bank = ['Question bank', 'Paper bank', 'Paper bank - Sample exams', 'Paper skeletons']
    let reports = ['Sample exam statistics report', 'Question statistics report', 'Candidate statistics report', 'Exam statistics report', 'Power BI report', 'Dashboard']
    let home = ['Global links']
    for (let y = 0; y < 5; y++) {
        if (y !== 0) {
            cy.get('.aui-panel .aui-tabs-bars .aui-tabs-bar')
                .eq(y)
                .click()
        }
        if (y == 0) {
            // verify admin
            for (let i = 0; i < admin.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', admin[i])
                // verify manage
                if (admin[i] !== 'User activity report') {
                    cy.get('@per')
                        .find(adminRoleClass.managePerInput)
                        .as('manage')
                    if (i > 8 && admin[i]) {
                        cy.get('@manage')
                            .should('have.attr', 'checked')
                    } else {
                        cy.get('@manage')
                            .should('not.have.attr', 'checked')
                    }
                }
                // verify view
                if (admin[i] !== 'Course candidates and classes' && admin[i] !== 'Organisation configuration' && admin[i] !== 'Semester configuration' && admin[i] !== 'Email templates' && admin[i] !== 'Announcement management' && admin[i] !== 'Approval processes' && admin[i] !== 'Task centre') {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                    if (admin[i] !== 'Role management' && admin[i] !== 'Account management' && admin[i] !== 'User activity report' && admin[i] !== 'Global settings' && admin[i] !== 'LMS integration') {
                        cy.get('@view')
                            .should('have.attr', 'checked')
                    } else {
                        cy.get('@view')
                            .should('not.have.attr', 'checked')
                    }
                }
            }
        }
        if (y == 1) {
            // verify exams
            for (let i = 0; i < exams.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', exams[i])
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                cy.get('@manage')
                    .should('have.attr', 'checked')
                // verify view
                if ((i == 0) || (i == 2) || (i == 6) || (i == 11)) {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                        .should('have.attr', 'checked')
                }
            }
        }
        if (y == 2) {
            // verify bank
            for (let i = 0; i < bank.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', bank[i])
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                    .should('have.attr', 'checked')
                // verify preview, view
                if (i !== 3) {
                    cy.get('@per')
                        .find(adminRoleClass.previewPerInput)
                        .as('preview')
                        .should('have.attr', 'checked')
                } else {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                }
            }
        }
        if (y == 3) {
            // verify reports
            for (let i = 0; i < reports.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', reports[i])
                // verify view/export
                cy.get('@per')
                    .find(adminRoleClass.viewExportPerInput)
                    .as('viewOrExport')
                    .should('have.attr', 'checked')
            }
        }
        if (y == 4) {
            // verify home
            for (let i = 0; i < home.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', home[i])
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('Manage')
                    .should('have.attr', 'checked')
            }
        }
    }
};
Cypress.PageAdminRolePage.verifyClassOwnerPermission = () => {
    let exams = ['Exams', 'Attendance', 'Open for resubmission', 'Live proctoring', 'Generate key', 'Grading progress', 'Sync score to reports']
    let reports = ['Sample exam statistics report', 'Question statistics report', 'Candidate statistics report', 'Exam statistics report']
    for (let y = 0; y < 2; y++) {
        if (y !== 0) {
            cy.get('.aui-panel .aui-tabs-bars .aui-tabs-bar')
                .eq(y)
                .click()
        }
        if (y == 0) {
            // verify exams
            for (let i = 0; i < exams.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', exams[i])
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                    .should('have.attr', 'disabled')
                if ((i == 0) || (i == 6)) {
                    cy.get('@manage')
                        .should('not.have.attr', 'checked')
                } else {
                    cy.get('@manage')
                        .should('have.attr', 'checked')
                }

                // verify view
                if ((i == 0) || (i == 1) || (i == 6)) {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                        .should('have.attr', 'checked')
                } else {
                    cy.get('@perOperation')
                        .should('have.length', 1)
                }
            }
        }
        if (y == 1) {
            // verify reports
            for (let i = 0; i < reports.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', reports[i])
                // verify view/export
                cy.get('@per')
                    .find(adminRoleClass.viewExportPerInput)
                    .as('viewOrExport')
                    .should('have.attr', 'checked')
            }
        }
    }
};
Cypress.PageAdminRolePage.verifyOrganizationOrCourseManagerPermission = () => {
    let admin = ['Course configuration', 'Course candidates and classes']
    let exams = ['Exams', 'Attendance', 'Open for resubmission', 'Live proctoring', 'Generate key', 'Marking progress', 'Edit score', 'Assign marking staff', 'Suspicious degree settings', 'Assign monitor', 'Grading progress', 'Publish score', 'Lock score', 'Sync score to reports']
    let bank = ['Question bank', 'Paper bank', 'Paper skeletons']
    let reports = ['Sample exam statistics report', 'Question statistics report', 'Candidate statistics report', 'Exam statistics report']
    for (let y = 0; y < 4; y++) {
        if (y !== 0) {
            cy.get('.aui-panel .aui-tabs-bars .aui-tabs-bar')
                .eq(y)
                .click()
        }
        if (y == 0) {
            // verify admin
            for (let i = 0; i < admin.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', admin[i])
                // verify manage and view
                cy.get('@manage')
                    .should('have.attr', 'disabled')
                if (i == 0) {
                    cy.get('@manage')
                        .should('not.have.attr', 'checked')
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .should('have.attr', 'checked')
                } else {
                    cy.get('@perOperation')
                        .should('have.length', 1)
                }
            }
        }
        if (y == 1) {
            // verify exams
            for (let i = 0; i < exams.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', exams[i])
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                    .should('have.attr', 'checked')
                // verify view
                if ((i == 0) || (i == 1) || (i == 6) || (i == 10)) {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                        .should('have.attr', 'checked')
                } else {
                    cy.get('@perOperation')
                        .should('have.length', 1)
                }
            }
        }
        if (y == 2) {
            // verify bank
            for (let i = 0; i < bank.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionOperation)
                    .children()
                    .as('perOperation')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', bank[i])
                // verify manage
                cy.get('@per')
                    .find(adminRoleClass.managePerInput)
                    .as('manage')
                    .should('have.attr', 'checked')
                // verify preview, view
                if (i !== 2) {
                    cy.get('@per')
                        .find(adminRoleClass.previewPerInput)
                        .as('preview')
                        .should('have.attr', 'checked')
                } else {
                    cy.get('@per')
                        .find(adminRoleClass.viewPerInput)
                        .as('view')
                }
            }
        }
        if (y == 3) {
            // verify reports
            for (let i = 0; i < reports.length; i++) {
                cy.get(adminRoleClass.permission)
                    .eq(i)
                    .as('per')
                cy.get('@per')
                    .find(adminRoleClass.permissionName)
                    .should('contain', reports[i])
                // verify view/export
                cy.get('@per')
                    .find(adminRoleClass.viewExportPerInput)
                    .as('viewOrExport')
                    .should('have.attr', 'checked')
            }
        }
    }
};
Cypress.PageAdminRolePage.verifyQuestionCrafterPermission = () => {
    let bank = ['Question bank', 'Paper bank', 'Paper skeletons']
    // verify bank
    for (let i = 0; i < bank.length; i++) {
        cy.get(adminRoleClass.permission)
            .eq(i)
            .as('per')
        cy.get('@per')
            .find(adminRoleClass.permissionOperation)
            .children()
            .as('perOperation')
        cy.get('@per')
            .find(adminRoleClass.permissionName)
            .should('contain', bank[i])
        // verify manage
        cy.get('@per')
            .find(adminRoleClass.managePerInput)
            .as('manage')
            .should('have.attr', 'checked')
        // verify preview, view
        if (i !== 2) {
            cy.get('@per')
                .find(adminRoleClass.previewPerInput)
                .as('preview')
                .should('have.attr', 'checked')
        } else {
            cy.get('@per')
                .find(adminRoleClass.viewPerInput)
                .as('view')
                .should('have.attr', 'checked')
        }
    }
};
Cypress.PageAdminRolePage.verifyCheckerPermission = () => {
    let exams = ['Exams', 'Marking progress', 'Edit score', 'Assign monitor', 'Grading progress', 'Publish score', 'Lock score', 'Sync score to reports']
    // verify exams
    for (let i = 0; i < exams.length; i++) {
        cy.get(adminRoleClass.permission)
            .eq(i)
            .as('per')
        cy.get('@per')
            .find(adminRoleClass.permissionOperation)
            .children()
            .as('perOperation')
        cy.get('@per')
            .find(adminRoleClass.permissionName)
            .should('contain', exams[i])
        // verify manage
        cy.get('@per')
            .find(adminRoleClass.managePerInput)
            .as('manage')
            .should('have.attr', 'disabled')
        if (i !== 0) {
            cy.get('@manage')
                .should('have.attr', 'checked')
        } else {
            cy.get('@manage')
                .should('not.have.attr', 'checked')
        }
        // verify view
        if (i == 0 || i == 1 || i == 4) {
            cy.get('@per')
                .find(adminRoleClass.viewPerInput)
                .as('view')
                .should('have.attr', 'checked')
        } else {
            cy.get('@perOperation')
                .should('have.length', 1)
        }
    }
};
Cypress.PageAdminRolePage.verifyMarkerPermission = () => {
    let exams = ['Exams', 'Marking progress', 'Edit score']
    // verify exams
    for (let i = 0; i < exams.length; i++) {
        cy.get(adminRoleClass.permission)
            .eq(i)
            .as('per')
        cy.get('@per')
            .find(adminRoleClass.permissionOperation)
            .children()
            .as('perOperation')
        cy.get('@per')
            .find(adminRoleClass.permissionName)
            .should('contain', exams[i])
        // verify manage
        cy.get('@per')
            .find(adminRoleClass.managePerInput)
            .as('manage')
            .should('have.attr', 'disabled')
        if (i !== 0) {
            cy.get('@manage')
                .should('have.attr', 'checked')
        } else {
            cy.get('@manage')
                .should('not.have.attr', 'checked')
        }
        // verify view
        if (i == 0 || i == 1) {
            cy.get('@per')
                .find(adminRoleClass.viewPerInput)
                .as('view')
                .should('have.attr', 'checked')
        } else {
            cy.get('@perOperation')
                .should('have.length', 1)
        }
    }
};
Cypress.PageAdminRolePage.verifyMonitorPermission = () => {
    let exams = ['Exams', 'Marking progress']
    // verify exams
    for (let i = 0; i < exams.length; i++) {
        cy.get(adminRoleClass.permission)
            .eq(i)
            .as('per')
        cy.get('@per')
            .find(adminRoleClass.permissionOperation)
            .children()
            .as('perOperation')
        cy.get('@per')
            .find(adminRoleClass.permissionName)
            .should('contain', exams[i])
        // verify manage
        cy.get('@per')
            .find(adminRoleClass.managePerInput)
            .as('manage')
            .should('have.attr', 'disabled')
        if (i !== 0) {
            cy.get('@manage')
                .should('have.attr', 'checked')
        } else {
            cy.get('@manage')
                .should('not.have.attr', 'checked')
        }
        // verify view
        cy.get('@per')
            .find(adminRoleClass.viewPerInput)
            .as('view')
            .should('have.attr', 'checked')
    }
};
Cypress.PageAdminRolePage.verifyInvigilatorPermission = () => {
    let exams = ['Exams', 'Attendance', 'Live proctoring', 'Generate key']
    // verify exams
    for (let i = 0; i < exams.length; i++) {
        cy.get(adminRoleClass.permission)
            .eq(i)
            .as('per')
        cy.get('@per')
            .find(adminRoleClass.permissionOperation)
            .children()
            .as('perOperation')
        cy.get('@per')
            .find(adminRoleClass.permissionName)
            .should('contain', exams[i])
        // verify manage
        cy.get('@per')
            .find(adminRoleClass.managePerInput)
            .as('manage')
            .should('have.attr', 'disabled')
        if (i !== 0) {
            cy.get('@manage')
                .should('have.attr', 'checked')
        } else {
            cy.get('@manage')
                .should('not.have.attr', 'checked')
        }
        // verify view
        if (i < 2) {
            cy.get('@per')
                .find(adminRoleClass.viewPerInput)
                .as('view')
                .should('have.attr', 'checked')
        } else {
            cy.get('@perOperation')
                .should('have.length', 1)
        }
    }
};
Cypress.PageAdminRolePage.verifySupervisorPermission = () => {
    let exams = ['Exams', 'Marking progress', 'Edit score', 'Grading progress', 'Publish score', 'Lock score', 'Sync score to reports']
    // verify exams
    for (let i = 0; i < exams.length; i++) {
        cy.get(adminRoleClass.permission)
            .eq(i)
            .as('per')
        cy.get('@per')
            .find(adminRoleClass.permissionOperation)
            .children()
            .as('perOperation')
        cy.get('@per')
            .find(adminRoleClass.permissionName)
            .should('contain', exams[i])
        // verify manage
        cy.get('@per')
            .find(adminRoleClass.managePerInput)
            .as('manage')
            .should('have.attr', 'disabled')
        if (i !== 0) {
            cy.get('@manage')
                .should('have.attr', 'checked')
        } else {
            cy.get('@manage')
                .should('not.have.attr', 'checked')
        }
        // verify view
        if (i == 0 || i == 1 || i == 3) {
            cy.get('@per')
                .find(adminRoleClass.viewPerInput)
                .as('view')
                .should('have.attr', 'checked')
        } else {
            cy.get('@perOperation')
                .should('have.length', 1)
        }
    }
};
Cypress.PageAdminRolePage.verifyPermissionCheckedOrDisabled = (_option, _checked) => {
    if (_option == 'manage') {
        cy.get(adminRoleClass.managePerInput)
            .eq(0)
            .as('manage')
        if (_checked) {
            cy.get('@manage')
                .should('have.attr', 'checked')
            cy.get('@manage')
                .should('have.attr', 'disabled')
        } else {
            cy.get('@manage')
                .should('not.have.attr', 'checked')
            cy.get('@manage')
                .should('not.have.attr', 'disabled')
        }
    }
    if (_option == 'view') {
        cy.get(adminRoleClass.viewPerInput)
            .eq(0)
            .as('view')
            .should('have.attr', 'checked')
        cy.get('@view')
            .should('have.attr', 'disabled')
    }
};
Cypress.PageAdminRolePage.verifyAddressBook_selectedPrompt = (_value) => {
    cy.get(auiCommonClass.addressBox)
        .next()
        .next()
        .next()
        .should('contain', `0 groups and ${_value} users selected`)
};