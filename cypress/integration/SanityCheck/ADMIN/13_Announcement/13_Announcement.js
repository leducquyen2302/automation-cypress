/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let date = new Date()
const toStaffAndCandidates = {
    name: `1toStaffAndCandidates name ${date}`,
    detail: `1toStaffAndCandidates detail ${date}`,
    recipients: 'Staff and candidates'
}
const toCandidates = {
    name: `2toCandidates name ${date}`,
    detail: `2toCandidates detail ${date}`,
    recipients: 'Candidates',
    editName: `2toCandidates edit name ${date}`,
    editDetail: `2toCandidates edit detail ${date}`,
}
const toStaff = {
    name: `3toStaff name ${date}`,
    detail: `3toStaff detail ${date}`,
    recipients: 'Staff'
}
const toStaffAndCandidates_WithCourse = {
    name: `0toStaffAndCandidates_WithCourse name ${date}`,
    detail: `0toStaffAndCandidates_WithCourse detail ${date}`,
    recipients: 'Staff and candidates',
    editName: `0toStaffAndCandidates_WithCourse name Edit ${date}`,
}

let system = '', cm = '', invigilator1 = '', stu1 = ''
before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    system = env[ct].System.display
    cm = env[ct].CM.userid
    invigilator1 = env[ct].Invigilator1.userid
    stu1 = env[ct].Candidates[0].userid
})

// Scenario: Verify Announcement card
Given(/^I login as system admin and in admin page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I verify Announcement configuration position,instruction and enter$/, () => {
    Cypress.PageAdminCommon.clickCardbyName('Administration', 'Announcement')
});
// Then(/^Delete exist data$/, () => {

// });

// Scenario: Verify no announcements tip
Given(/^I click the announcement icon$/, () => {
    Cypress.PageAdminAnnouncement.clickNotificationIcon()
});
Then(/^I verify tip is no announcements$/, () => {
    Cypress.PageAdminAnnouncement.verify_NotificationPopup('No announcements to show.')
});

// Scenario: Create published Announcement to staff and candidates
Given(/^I click create button$/, () => {
    Cypress.PageAdminAnnouncement.clickTopButton(0)
});
When(/^I click publish button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(2)
});
Then(/^I verify validation message$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
    Cypress.auiCommon.verifyValiMessage(1, 'Enter a value to proceed.')
});
And(/^I verify receive announcement default is all$/, () => {
    Cypress.PageAdminAnnouncement.verifyReceivedAllByDefault()
});
Then(/^I input published info and choose all received$/, () => {
    Cypress.PageAdminAnnouncement.inputNameDetail(toStaffAndCandidates.name, toStaffAndCandidates.detail)
});
And(/^I verify published toast$/, () => {
    Cypress.auiCommon.verifyToast('The announcement was published.')
});
And(/^I verify published info is right in table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Announcement name',
                value: toStaffAndCandidates.name,
            },
            // {
            //     index: 2,
            //     display: 'Modified by',
            //     value: system,
            // },
            {
                index: 4,
                display: 'Status',
                value: 'Published',
            },
            {
                index: 6,
                display: 'Recipients',
                value: 'Staff and candidates',
            },
            {
                index: 7,
                display: 'Only apply to specific courses',
                value: 'No',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 4, date)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 6, date)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 3, system)
});


// Scenario: Create draft Announcement to candidates
When(/^I click save and draft button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I input draft info and choose student received$/, () => {
    Cypress.PageAdminAnnouncement.inputNameDetail(toCandidates.name, toCandidates.detail)
    Cypress.PageAdminAnnouncement.chooseReceivedUser(2)
});
And(/^I verify create successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The announcement was created.')
});
And(/^I verify draft info is right in table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Announcement name',
                value: toCandidates.name,
            },
            // {
            //     index: 2,
            //     display: 'Modified by',
            //     value: system,
            // },
            {
                index: 4,
                display: 'Status',
                value: 'Draft',
            },
            {
                index: 5,
                display: 'Published time',
                value: '',
            },
            {
                index: 6,
                display: 'Recipients',
                value: 'Candidates',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 3, system)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 4, date)
});

// Scenario: Create published Announcement to staff
Then(/^I input info and choose staff received$/, () => {
    Cypress.PageAdminAnnouncement.inputNameDetail(toStaff.name, toStaff.detail)
    Cypress.PageAdminAnnouncement.chooseReceivedUser(1)
});

// Scenario: Verify status filter
When(/^I filter Draft$/, () => {
    Cypress.PageAdminAnnouncement.filter('Status', 'Draft')
});
Then(/^I verify filter Draft result is right and only have one item$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: toCandidates.name,
            },
            {
                index: 4,
                value: 'Draft',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I filter Published$/, () => {
    Cypress.PageAdminAnnouncement.filter('Status', 'Draft')
});
Then(/^I verify filter Published result is right and only have one item$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 4,
                value: 'Published',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
Then(/^I filter status All$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(0)
});

// Scenario: Verify recipients filter
When(/^I filter Staff and candidates$/, () => {
    Cypress.PageAdminAnnouncement.filter('Recipients', 'Staff and candidates')
});
Then(/^I verify filter Staff and candidates result is right$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                value: 'Staff and candidates',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I filter Candidates$/, () => {
    Cypress.PageAdminAnnouncement.filter('Recipients', 'Staff and candidates', 'Staff')
});
Then(/^I verify filter Candidates result is right$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                value: 'Candidates',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
When(/^I filter Staff$/, () => {
    Cypress.PageAdminAnnouncement.filter('Recipients', 'Staff and candidates', 'Candidates')
});
Then(/^I verify filter Staff result is right$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                value: 'Staff',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
Then(/^I filter recipients All$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(1)
});

// Scenario: Search and View Announcement details
Given(/^I search published announcement name$/, () => {
    Cypress.PageReport.search(toStaffAndCandidates.name)
});
Then(/^I click the published announcement name$/, () => {
    Cypress.auiCommon.clickLinkInTable(1, 2)
});
And(/^I verify Announcement details is right$/, () => {
    Cypress.PageAdminAnnouncement.verifyDetailsWithoutCourse(toStaffAndCandidates.name, [system, date, 'Published', date, toStaffAndCandidates.recipients, toStaffAndCandidates.detail])
});
And(/^I verify cannot click edit button$/, () => {
    Cypress.PageAdminAnnouncement.verifyEditBtnDisabled()
});

// Scenario: Edit Announcement
Given(/^I search draft announcement name$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
    Cypress.PageReport.search(toCandidates.name)
});
Then(/^I click edit button$/, () => {
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.PageAdminAnnouncement.clickTopButton(3)
});
Then(/^I input update info$/, () => {
    Cypress.PageAdminAnnouncement.inputNameDetail(toCandidates.editName, toCandidates.editDetail)
});

// Scenario: Verify Notification center popup
Given(/^I publish draft announcement$/, () => {
    Cypress.PageReport.search(toCandidates.editName)
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.PageAdminAnnouncement.clickTopButton(1)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^I verify Notification number$/, () => {
    Cypress.PageAdminAnnouncement.verifyNotificationNum(2)
});
And(/^I verify Notification popup value$/, () => {
    Cypress.auiCommon.closeToast()
    Cypress.PageAdminAnnouncement.clickNotificationIcon()
    Cypress.PageAdminAnnouncement.verifyNotificationPopupValue(0, [toStaff.name, toStaff.detail], date)
    Cypress.PageAdminAnnouncement.verifyNotificationPopupValue(1, [toStaffAndCandidates.name, toStaffAndCandidates.detail], date)
});
When(/^I click the first announcement$/, () => {
    Cypress.PageAdminAnnouncement.clickPopupAnnouncementTitle(0)
});
Then(/^I verify this Announcement details is right$/, () => {
    Cypress.PageAdminAnnouncement.verifyPopupDetail(toStaff.name, toStaff.detail, date)
});
When(/^I close the panel$/, () => {
    Cypress.auiCommon.closePanel()
});
Then(/^I can see only one Announcement$/, () => {
    Cypress.PageAdminAnnouncement.verifyNotificationNum(1)
});

// Scenario: Filter announcement in Announcement management
Given(/^I click see all in notification center popup$/, () => {
    Cypress.PageAdminAnnouncement.clickNotificationIcon()
    Cypress.PageAdminAnnouncement.clickNotificationCenterBtn(1)
});
When(/^I filter read$/, () => {
    Cypress.PageAdminAnnouncement.announcementManagementFilter('Status', 'Read')
});
Then(/^I verify filter read result is right and not have mark$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Announcement name',
                value: toStaff.name,
            },
            {
                index: 3,
                display: 'Content',
                value: toStaff.detail,
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 3, date)
    Cypress.PageAdminAnnouncement.verifyMark(0, false)
});
When(/^I filter unread$/, () => {
    Cypress.PageAdminAnnouncement.announcementManagementFilter('Status', 'Read')
});
Then(/^I verify filter unread result is right and have mark$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Announcement name',
                value: toStaffAndCandidates.name,
            },
            {
                index: 3,
                display: 'Content',
                value: toStaffAndCandidates.detail,
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 3, date)
    Cypress.PageAdminAnnouncement.verifyMark(0, true)
});

// Scenario: Search unread And mark as read And delete
When(/^I filter all$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(0)
});
When(/^I search the unread announcement$/, () => {
    Cypress.PageReport.search(toStaffAndCandidates.name)
});
Then(/^I mark as read and verify toast successful$/, () => {
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.PageAdminAnnouncement.clickTopButton_InAnnouncementManagement(0)
    Cypress.auiCommon.verifyToast('The selected announcements were marked as read.')
});
When(/^I clear search and select all$/, () => {
    Cypress.PageAdminAnnouncement.clearSearch()
    Cypress.PageAdminQuickLink.checkAll()
});
Then(/^I delete all and verify toast successful$/, () => {
    Cypress.PageAdminAnnouncement.clickTopButton_InAnnouncementManagement(1)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast('The selected announcements were deleted.')
});
Then(/^I logout$/, () => {
    cy.logoutApi()
});

// Scenario: Candidate verify announcements content and expanded by default
Given(/^I login as student001$/, () => {
    cy.LoginByLocal(stu1)
});
Then(/^I verify the announcement pop up is expanded by default$/, () => {
    Cypress.PageAdminAnnouncement.verifyAnnouncementExpanded(true)
});
When(/^I click exam page$/, () => {
    Cypress.PageAdminCommon.visitExam(8000)
});
Then(/^I verify the announcement pop up is not expanded$/, () => {
    Cypress.PageAdminAnnouncement.verifyAnnouncementExpanded(false)
});
When(/^I refresh the page$/, () => {
    cy.reload()
});
Then(/^I verify only can see Staff and candidates, Candidates announcements$/, () => {
    Cypress.PageAdminAnnouncement.verifyNotificationPopupValue(0, [toCandidates.editName, toCandidates.editDetail], date)
    Cypress.PageAdminAnnouncement.verifyNotificationPopupValue(1, [toStaffAndCandidates.name, toStaffAndCandidates.detail], date)
});
When(/^I dismiss all$/, () => {
    Cypress.PageAdminAnnouncement.clickNotificationCenterBtn(0)
});
Then(/^I verify notification center is null$/, () => {
    Cypress.PageAdminAnnouncement.verify_NotificationPopup('')
});

// Scenario: Staff unpublish announcement
When(/^I enter announcement page$/, () => {
    Cypress.auiCommon.visitUrl('/#/admin/Announcement')
});
Then(/^I unpublish all and toast successful$/, () => {
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.PageAdminAnnouncement.clickTopButton(2)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast('The announcements were unpublished.')
    Cypress.auiCommon.closeToast()
});
And(/^I verify unpublished status is right$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 4,
                value: 'Unpublished',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario: Staff create staff and student announcement with course draft
Then(/^I input name, content , staff and student, courses that AT001 AT002$/, () => {
    Cypress.PageAdminAnnouncement.inputNameDetail(toStaffAndCandidates_WithCourse.name, toStaffAndCandidates_WithCourse.detail)
    Cypress.PageAdminAnnouncement.chooseCourse(true, 'AT00')
});

// Scenario: Staff verify staff and student announcement with course
And(/^I verify draft info with course is right in table$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 7,
                value: 'Yes',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});
And(/^I verify Announcement with courses details is right$/, () => {
    Cypress.auiCommon.clickLinkInTable(1, 2)
    Cypress.PageAdminAnnouncement.verifyDetailsWithCourse('AT001 (AutoTesting Programme 1 - UI-semester - UI-school - UI-discipline)')
    Cypress.PageAdminAnnouncement.verifyDetailsWithCourse('+')
    Cypress.PageAdminAnnouncement.verifyDetailsWithCourse('3')
    Cypress.PageAdminAnnouncement.expandAllCoursesInDetail()
    Cypress.PageAdminAnnouncement.verifyAllCoursesInDetail(0, 'AT001 (AutoTesting Programme 1 - UI-semester - UI-school - UI-discipline)')
    Cypress.PageAdminAnnouncement.verifyAllCoursesInDetail(1, 'AT002 (AutoTesting Programme 2 - UI-semester - UI-school - UI-discipline)')
    Cypress.PageAdminAnnouncement.verifyAllCoursesInDetail(2, 'AT003 (AutoTesting Programme 3 - UI-semester - UI-school - UI-discipline)')
    Cypress.PageAdminAnnouncement.verifyAllCoursesInDetail(3, 'AT004 (AutoTesting Programme 4 - UI-semester - UI-school - UI-discipline)')
});

// Scenario: Staff publish the staff and student announcement with course
Given(/^I edit the draft$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    Cypress.PageAdminAnnouncement.chooseCourse(false, 'AT004')
});

// Scenario: Filter yes course
When(/^I filter yes course$/, () => {
    Cypress.PageAdminAnnouncement.filter('Courses', 'Yes')
});
Then(/^I verify filter yes course result is right$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 7,
                value: 'Yes',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario: Invigilator1 verify cannot receive announcement with course 4
Given(/^Login as Invigilator1$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(invigilator1)
});

// Scenario: Course Manager verify receive the announcement with course
Given(/^Login as course manager$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(cm)
});
Then(/^I verify announcement with course popup value is right$/, () => {
    Cypress.PageAdminAnnouncement.verifyNotificationPopupValue(0, [toStaffAndCandidates_WithCourse.name, toStaffAndCandidates_WithCourse.detail], date)
});

// Scenario: Staff delete announcement
Then(/^I delete all and toast successful$/, () => {
    cy.logoutApi()
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Administration', 'Announcement')
    Cypress.auiCommon.chooseCheckbox(1)
    Cypress.PageAdminAnnouncement.clickTopButton(2)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast('The announcement was unpublished.')
    Cypress.auiCommon.closeToast()
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.PageAdminAnnouncement.clickTopButton(4)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.verifyToast('The announcements were deleted.')
});