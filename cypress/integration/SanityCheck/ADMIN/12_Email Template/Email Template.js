let system = ''
let date = new Date()
let name = `AT_Name_${date}`
let description = `AT_Description_${date}`
let subject = `AT_Subject_${date}`
let body = `AT_Body_${date}`

let template_1 = [name, 'Publish exam to candidates', 'Candidates', description, system, date]
let template_2 = ['Exam publishing notification for invigilators', 'Publish exam to invigilators', 'Invigilators', 'Notify invigilators when the exam is published.', '', '', "Active"]
let template_3 = ['Exam unpublishing notification for candidates', 'Unpublish exam for candidates', 'Candidates', 'Notify candidates when the exam is unpublished.', '', '', "Active"]
let template_4 = ['Exam unpublishing notification for invigilators', 'Unpublish exam for invigilators', 'Invigilators', 'Notify invigilators when the exam is unpublished.', '', '', "Active"]
let template_5 = ['Exam video files deletion notification', 'Exam video files are deleted', 'Course managers', 'Notify course managers that the exam video files have been automatically deleted.', '', '', "Active"]
let template_6 = ['Reminder of deleting exam video files in 1 day', 'Exam video files will be deleted in 1 day', 'Course managers', 'Remind course managers 1 day before the exam video files are deleted.', '', '', "Active"]
let template_7 = ['Reminder of deleting exam video files in 7 days', 'Exam video files will be deleted in 7 days', 'Course managers', 'Remind course managers 7 days before the exam video files are deleted.', '', '', "Active"]
let template_8 = ['Score publishing notification for candidates', 'Publish scores to candidates', 'Candidates', 'Notify candidates when their scores are published.', '', '', "Active"]
let template_9 = ['Score unpublishing notification for candidates', 'Unpublish scores for candidates', 'Candidates', 'Notify candidates when their scores are unpublished.', '', '', "Active"]
let template_10 = ['Checker assignment notification', 'Checker assignment', 'Checkers', 'Notify staff of their checker assignments for the exam when they are selected as the recipients of the email notification.', '', '', "Active"]
let template_11 = ['Marker assignment notification', 'Marker assignment', 'Markers', 'Notify staff of their marker assignments for the exam when they are selected as the recipients of the email notification.', '', '', "Active"]
let template_12 = ['Monitor assignment notification', 'Monitor assignment', 'Monitors', 'Notify staff of their monitor assignments for the exam when they are selected as the recipients of the email notification.', '', '', "Active"]
let template_13 = ['Score confirmation notification for checker', 'Marker confirms given scores', 'Checkers', `Notify checker when the given scores are confirmed by marker.`, '', '', "Active"]
let template_14 = ['Score verification notification for checker', 'Monitor submits recommended scores', 'Checkers', `Notify checker when the recommended scores are submitted by monitor.`, '', '', "Active"]
let template_15 = ['Score returning notification for markers', 'Return scores to markers', 'Markers', `Notify markers when the given scores are returned.`, '', '', "Active"]
let template_16 = ['Score escalation notification for supervisor', 'Escalate to supervisor', 'Supervisors', `Notify supervisor when scores are escalated to supervisor.`, '', '', "Active"]
let template_17 = ['Supervisor assignment notification', 'Supervisor assignment', 'Supervisors', `Notify staff of their supervisor assignments for the exam when they are selected as the recipients of the email notification.`, '', '', "Active"]
let template_18 = ['Marking completion notification for supervisor', 'Marker completes marking', 'Supervisors', `Notify supervisor when the given scores are confirmed by markers.`, '', '', "Active"]
let template_19 = ['Exam pending approval notification', 'Exam approval task assignment', 'Approvers', `Notify approver when an exam is currently pending on their approval.`, '', '', "Active"]
let template_20 = ['Exam rejection notification', 'Approver rejects the exam', 'Receivers', `Notify the requester or a specific stage approvers when the exam is rejected and returned to them.`, '', '', "Active"]
let template_21 = ['Paper pending approval notification', 'Paper approval task assignment', 'Approvers', `Notify approver when a paper is currently pending on their approval.`, '', '', "Active"]
let template_22 = ['Paper rejection notification', 'Approver rejects the paper', 'Receivers', `Notify the requester or a specific stage approvers when the paper is rejected and returned to them.`, '', '', "Active"]
let template_23 = ['Approval task reminder', 'Reminder for approvers', 'Approvers', `Notify approvers when the approval task is not processed on time.`, '', '', "Active"]
let template_24 = ['Exam approval notification', 'Exam is approved and published', 'Requesters', `Notify the requester when the exam has been approved and published by an approval of the final stage.`, '', '', "Active"]
let template_25 = ['Paper approval notification', 'Paper is approved and completed', 'Requesters', `Notify the requester when the paper has been approved and completed by an approval of the final stage.`, '', '', "Active"]

let template2_detail = [
    'Exam publishing notification for invigilators',
    'Notify invigilators when the exam is published.',
    [
        'Publish exam to invigilators',
        'The exam "$ExamName" has been published to you. Please invigilate the exam on time.',
        'Invigilators'
    ],
    [
        'The following exam has been published to you. Please check the exam time to arrange your time properly and invigilate the exam on time.'
    ]
]
let template3_detail = [
    'Exam unpublishing notification for candidates',
    'Notify candidates when the exam is unpublished.',
    [
        'Unpublish exam for candidates',
        'Unfortunately, "$ExamName" has been unpublished.',
        'Candidates'
    ],
    [
        `We'd like to inform you that, unfortunately, we need to unpublish the following exam that we had arranged:`
    ]
]
let template4_detail = [
    'Exam unpublishing notification for invigilators',
    'Notify invigilators when the exam is unpublished.',
    [
        'Unpublish exam for invigilators',
        'Unfortunately, "$ExamName" has been unpublished.',
        'Invigilators'
    ],
    [`We're very sorry to take up your valuable time. Once the exam is rescheduled, we will publish to you and send you an email. Please accept our sincerest apologies for any inconvenience.`]
]
let template5_detail = [
    'Exam video files deletion notification',
    'Notify course managers that the exam video files have been automatically deleted.',
    [
        'Exam video files are deleted',
        'Exam video files of "$ExamName" have been automatically deleted.',
        'Course managers'
    ],
    [`We'd like to inform you that the exam video files of`]
]
let template6_detail = [
    'Reminder of deleting exam video files in 1 day',
    'Remind course managers 1 day before the exam video files are deleted.',
    [
        'Exam video files will be deleted in 1 day',
        'Reminder - Exam video files of "$ExamName" are going to be deleted in 1 day.',
        'Course managers'
    ],
    [`We'd like to inform you that the exam video files of "`]
]
let template7_detail = [
    'Reminder of deleting exam video files in 7 days',
    'Remind course managers 7 days before the exam video files are deleted.',
    [
        'Exam video files will be deleted in 7 days',
        'Reminder - Exam video files of "$ExamName" will be deleted in 7 days.',
        'Course managers'
    ],
    [`will be deleted in 7 days.`]
]

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    system = env[ct].System.display
})
// Scenario: I verify email template card
Given(/^I login as system admin and in admin page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I verify email template configuration position,instruction and enter$/, () => {
    Cypress.PageAdminCommon.clickCardbyName('Administration', 'Email templates')
});

// Scenario: I edit email template 1
When(/^I click edit email template 1$/, () => {
    Cypress.auiCommon.chooseCheckbox(1)
    Cypress.auiCommon.clickActionHeaderBtn(0)
});
Then(/^I clear name and body content$/, () => {
    Cypress.PageAdminEmailTemplate.clearInput()
});
When(/^I click save button$/, () => {
    Cypress.PageAdminApplication.clickSave()
});
Then(/^I verify required prompt$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
    Cypress.auiCommon.verifyValiMessage(2, 'Enter a value to proceed.')
    Cypress.auiCommon.verifyValiMessage(3, 'Enter a value to proceed.')
});
When(/^I click the subject icon i$/, () => {
    Cypress.PageAdminEmailTemplate.clickSubjectIcon()
});
Then(/^I verify the subject tip is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifySubjectIconTip()
});
Then(/^I input name, description$/, () => {
    Cypress.PageAdminEmailTemplate.inputNameAndDes(name, description)
});
And(/^I verify function and email recipients content is right and disabled$/, () => {
    Cypress.PageAdminEmailTemplate.verifyFunction('Publish exam to candidates')
    Cypress.PageAdminEmailTemplate.verifyEmailRecipients('Candidates')
});
Then(/^I input subject and click insert reference$/, () => {
    Cypress.PageAdminEmailTemplate.inputSubject(subject)
    Cypress.PageAdminEmailTemplate.insertReference(0, 0)
    subject = `${subject}$ExamName`
});
Then(/^I input message body content and click insert reference$/, () => {
    Cypress.PageAdminEmailTemplate.inputBody(body)
    cy.wait(1000)
    Cypress.PageAdminEmailTemplate.insertReference(1, 0)
});
When(/^I click preview$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify email template 1 info is right in preview panel$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView([name, description, ['Publish exam to candidates', subject, 'Candidates'], [body, '$Candidate']])
});
When(/^I click close button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
And(/^I verify update toast is right$/, () => {
    Cypress.auiCommon.verifyToast('The email template was updated.')
});

// Scenario: I view email template 1
When(/^I click email template 1 name$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(0)
});
Then(/^I verify email template 1 info is right in view panel$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView([name, description, ['Publish exam to candidates', subject, 'Candidates'], [body, '$Candidate']])
});

// Scenario: I reset email template 1 to default
When(/^I click edit button in view email template panel$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I click reset to default and save$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(2)
    Cypress.PageAdminEmailTemplate.confirmReset(3)
    // Cypress.auiCommon.clickFooterBtnInDialog(1)
    Cypress.auiCommon.clickFooterBtnInPanel(3)
});

// Scenario: I deactivate email template 5
When(/^I deactivate email template 5$/, () => {
    Cypress.PageAdminEmailTemplate.deactivateEmail(6)
});
Then(/^I verify deactivate toast$/, () => {
    Cypress.auiCommon.verifyToast('The email template was deactivated.')
});
And(/^I verify email template 5 is deactivate and modified by, modified are not changed on table$/, () => {
    let info = {
        rowIndex: 6,
        columns: [
            {
                index: 5,
                display: 'Modified by',
                value: template_5[4],
            },
            {
                index: 5,
                display: 'Modified',
                value: template_5[5],
            },
            {
                index: 7,
                display: 'Status',
                value: 'Inactive',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario: I activate email template 5
When(/^I activate email template 5$/, () => {
    Cypress.PageAdminEmailTemplate.activateEmail(6)
});
Then(/^I verify activate toast$/, () => {
    Cypress.auiCommon.verifyToast('The email template was activated.')
});
And(/^I verify email template 5 is activate and modified by, modified are not changed on table$/, () => {
    let info = {
        rowIndex: 6,
        columns: [
            {
                index: 5,
                value: template_5[4],
            },
            {
                index: 5,
                value: template_5[5],
            },
            {
                index: 7,
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
});

// Scenario: View Publish exam to invigilators and edit, preview echo
Given(/^I view Publish exam to invigilators$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(1)
});
Then(/^I verify Publish exam to invigilators info is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView(template2_detail)
});
Then(/^I insert reference in subject and body$/, () => {
    Cypress.PageAdminEmailTemplate.insertReference(0, 0)
    Cypress.PageAdminEmailTemplate.insertReference(1, 1)
});
Then(/^I verify the template subject and body echo$/, () => {
    Cypress.PageAdminEmailTemplate.verifySubject('$ExamName')
    Cypress.PageAdminEmailTemplate.verifyBody('$CombinedExamUniqueName')
});
Then(/^I close the preview panel$/, () => {
    Cypress.auiCommon.closePanel()
});
Then(/^I close the edit panel and do not save$/, () => {
    cy.wait(1000)
    Cypress.auiCommon.closePanel()
    cy.wait(500)
    // cy.get('body').then($body => {
    //     if ($body.find(`.aui-dialog:visible .aui-dialog-footer button`).length > 0) {
            // Cypress.auiCommon.clickFooterBtnInDialog(1)
        // }
    // })
    Cypress.PageAdminEmailTemplate.confirmReset(1)
});

// Scenario: View Unpublish exam for candidates and edit, preview echo
Given(/^I view Unpublish exam for candidates$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(2)
});
Then(/^I verify Unpublish exam for candidates info is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView(template3_detail)
});

// Scenario: View Unpublish exam for invigilators and edit, preview echo
Given(/^I view Unpublish exam for invigilators$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(3)
});
Then(/^I verify Unpublish exam for invigilators info is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView(template4_detail)
});

// Scenario: View Exam video files are deleted and edit, preview echo
Given(/^I view Exam video files are deleted$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(4)
});
Then(/^I verify Exam video files are deleted info is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView(template5_detail)
});

// Scenario: View Exam video files will be deleted in 1 day and edit, preview echo
Given(/^I view Exam video files will be deleted in 1 day$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(5)
});
Then(/^I verify Exam video files will be deleted in 1 day info is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView(template6_detail)
});

// Scenario: View Exam video files will be deleted in 7 days and edit, preview echo
Given(/^I view Exam video files will be deleted in 7 days$/, () => {
    Cypress.PageAdminEmailTemplate.clickTemplateName(6)
});
Then(/^I verify Exam video files will be deleted in 7 days info is right$/, () => {
    Cypress.PageAdminEmailTemplate.verifyPreiviewOrView(template7_detail)
});

// Scenario: Verify all email tamplates info in table
Then(/^I verify all email templates info are right in table$/, () => {
    let template = [
        template_1,
        template_2,
        template_3,
        template_4,
        template_5,
        template_6,
        template_7,
        template_8,
        template_9,
        template_10,
        template_11,
        template_12,
        template_13,
        template_14,
        template_15,
        template_16,
        template_17,
        template_18,
        template_19,
        template_20,
        template_21,
        template_22,
        template_23,
        template_24,
        template_25,
    ]
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Template name',
                value: template[0][0],
            },
            {
                index: 2,
                display: 'Function',
                value: template[0][1],
            },
            {
                index: 3,
                display: 'Email recipients',
                value: template[0][2],
            },
            {
                index: 4,
                display: 'Description',
                value: template[0][3],
            },
            {
                index: 5,
                display: 'Modified by',
                value: template[0][4],
            },
            {
                index: 7,
                display: 'Status',
                value: 'Active',
            }
        ]
    }
    Cypress.auiCommon.verifyTable(info)
    Cypress.auiCommon.verifyDateInTable_InShadow(1, 7, template[0][5])
    Cypress.PageAdminEmailTemplate.verifyTableInfo(1, template)
});