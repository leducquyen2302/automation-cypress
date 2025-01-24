/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let system = '', cm = '', invigilator1 = '', invigilator2 = ''
let examObj = {
    name: 'ATApprovalExam ' + new Date().toLocaleString(),
    editName: 'Edit_ATApprovalExam ' + new Date().toLocaleString(),
    duplicateName: 'Edit_ATApprovalExam ' + new Date().toLocaleString() + '_Copy',
    courseCode: 'AT004',
    examPaperName: 'ATApprovalExamPaper ' + new Date().toJSON()
}
let approveComment = [
    'Invigilator1 who is stage1 approve the exam!',
    'Invigilator2 who is stage2 approve the exam!',
    'Invigilator2 who is assigned approver stage1 approve the exam!',
]
let rejectComment = [
    'Invigilator2 who firstly reject the exam!',
    'Invigilator2 who secondly reject the exam!',
]
let process_1 = {
    'name': `ForTaskCenterExamProcess ${new Date().toLocaleString()}`,
    'type': 'Exam',
    'course': 'AT004',
}

// create paper
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
let Question1 = ''
before(() => {
    cy.fixture("questionInfo").then(($ques) => {
        Question1 = $ques[0]
        section_temp[0].questions[0].question = Question1
    })
})
before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    system = env[ct].System
    cm = env[ct].CM
    invigilator1 = env[ct].Invigilator1
    invigilator2 = env[ct].Invigilator2
})

// Scenario: AppAdmin create approval process
Given(/^Login as AppAdmin$/, () => {
    cy.LoginExamAsSystem()
});
Then(/^AppAdmin enter the Approval Process page$/, () => {
    Cypress.auiCommon.visitURL('/#/admin/ApprovalTemplate')
});
Then(/^AppAdmin create AT004 course approval process$/, () => {
    Cypress.PageAdminApprovalProcesses.clickTopButton(0)
    Cypress.PageAdminApprovalProcesses.inputName(process_1.name)
    Cypress.PageAdminApprovalProcesses.chooseServiceType(process_1.type)
    Cypress.PageAdminApprovalProcesses.chooseCourse(process_1.course)
    Cypress.PageAdminApprovalProcesses.inputApprover(0, invigilator1.display)
    Cypress.PageAdminApprovalProcesses.inputApprover(0, system.display)
    Cypress.PageAdminApprovalProcesses.inputReminder(0, 2)
    Cypress.PageAdminApprovalProcesses.clickAddStage()
    Cypress.PageAdminApprovalProcesses.inputApprover(1, invigilator2.display)
    Cypress.PageAdminApprovalProcesses.inputReminder(1, 3)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    cy.wait(5000)
});

// Scenario: CM verify exam card status is Exam saved
Given(/^Login as course manager$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(cm.userid)
});
Then(/^CM create exam to step3 and add paper$/, () => {
    Cypress.PageExamHome.clickCreateExam()
    Cypress.PageExamCreate.inputExamName(examObj.name)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
    Cypress.PageExamCreate.examEndTime(0, 23, 30)
    Cypress.PageExamCreate.examStartTime(0, 23, 29)
    Cypress.PageExamCreate.saveNextForm()
    Cypress.PageExamCreate.saveNextForm()
    cy.CreatePaperApi(examObj.courseCode, examObj.examPaperName, section_temp)
    Cypress.PageSampleExamCreate.addPaperFromBank(examObj.examPaperName)
});
When(/^CM click save and close$/, () => {
    Cypress.PageExamCreate.saveCloseForm()
});
Then(/^CM search the exam in exam home page$/, () => {
    Cypress.PageExamHome.searchExam(examObj.name)
});
And(/^CM verify exam card status is Exam saved$/, () => {
    let examInfo = {
        title: examObj.name,
        sta: {
            step: 3,
            descrip: 'Exam saved'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

// Scenario: CM verify exam card status is exam is Waiting for approval
Given(/^CM click the card name to enter the exam step3$/, () => {
    Cypress.PageExamHome.enterExamByCardTitle()
    Cypress.PageExamCreate.leftNavigationTo(2)
});
Then(/^CM click approval$/, () => {
    Cypress.PageExamCreate.sendForApproval()
});
Then(/^CM verify exam card status is Waiting for approval$/, () => {
    let examInfo = {
        title: examObj.name,
        sta: {
            step: 4,
            descrip: 'Waiting for approval'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

// Scenario: CM cannot see the exam in task center
Given(/^I enter task center$/, () => {
    Cypress.PageAdminTaskCenter.enterTaskCenter()
});
Then(/^I search the exam in task center$/, () => {
    Cypress.PageReport.search(examObj.name)
});
Then(/^CM see the result is no items$/, () => {
    Cypress.PageSampleReport.verifyMessage('No items to show in this view.')
});

// Scenario: Invigilator1 who is stage1 verify cannot see exam in exam home page
Given(/^Login as invigilator1$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(invigilator1.userid)
});
Then(/^I enter the exam page$/, () => {
    Cypress.PageAdminCommon.visitExam(70000)
});
When(/^I search the exam in exam home page$/, () => {
    Cypress.PageExamHome.searchExam(examObj.name)
});
Then(/^Invigilator1 see the result is no items$/, () => {
    Cypress.PageExamHome.verifyShowNoExams()
});

// Scenario: Invigilator1 who is stage1 verify the task number
Then(/^Invigilator1 verify the task number$/, () => {
    Cypress.PageAdminTaskCenter.verifyTaskIconNumber('1')
});

// Scenario: Invigilator1 who is stage1 verify the exam info on table in task center
Then(/^Invigilator1 verify the exam info in task center$/, () => {
    let tableInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Name',
                value: examObj.name,
            },
            {
                index: 2,
                display: 'Service type',
                value: 'Exam',
            },
            // {
            //     index: 4,
            //     display: 'Submitted by',
            //     value: cm.display,
            // },
            {
                index: 5,
                display: 'Stage No.',
                value: '2',
            },
            // {
            //     index: 6,
            //     display: 'Pending on',
            //     value: system.display,
            // },
            {
                index: 7,
                display: 'Modified',
                value: '',
            },
            {
                index: 8,
                display: 'Modified by',
                value: '',
            },
            {
                index: 9,
                display: 'Status',
                value: 'Waiting for approval',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 5, cm.display)
    Cypress.auiCommon.verifyDateInTableContent(1, 4, new Date())
    Cypress.PageAdminTaskCenter.verifyMoreApproversNumber('1')
});
When(/^Invigilator1 click more pending on approvers$/, () => {
    Cypress.PageAdminTaskCenter.clickMoreApproversNumber()
});
Then(/^Invigilator1 verify approvers are right$/, () => {
    Cypress.PageAdminTaskCenter.verifyMoreApproversStaff(0, system.display)
    Cypress.PageAdminTaskCenter.verifyMoreApproversStaff(1, invigilator1.display)
});

// Scenario: Invigilator1 who is stage1 verify the exam info in detail exam
Given(/^I click the exam name$/, () => {
    Cypress.PageAdminTaskCenter.clickExamName()
});
Then(/^Invigilator1 verify step1 only have Cancel and Next button$/, () => {
    Cypress.PageAdminTaskCenter.viewExamFooterButton(['Cancel', 'Next'])
});
And(/^Invigilator1 verify step2 only have Cancel, Back, Next button$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(1)
    Cypress.PageAdminTaskCenter.viewExamFooterButton(['Cancel', 'Back', 'Next'])
});
And(/^Invigilator1 verify step3 have Cancel, Back, Preview exam, Check out and edit, Reject, Approve button$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(2)
    Cypress.PageAdminTaskCenter.viewExamFooterButton(['Cancel', 'Back', 'Preview exam', 'Check out and edit', 'Reject', 'Approve'])
});

// Scenario: Invigilator1 who is stage1 approve the exam in step3
Given(/^Invigilator1 click the approve button in step3$/, () => {
    Cypress.auiCommon.clickFooterPanelBtn(6)
});
Then(/^Invigilator1 verify confirm message$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('Once approved, the exam will proceed to the next approval stage.')
});
And(/^Invigilator1 add comment$/, () => {
    Cypress.auiCommon.inputInDialog_InModal(approveComment[0], 1)
});
Then(/^Invigilator1 verify approve successfully toast$/, () => {
    Cypress.auiCommon.verifyToast('The exam was approved.')
});

// Scenario: Invigilator1 who is stage1 verify table info after approved
Given(/^Invigilator1 verify table info after approved$/, () => {
    let tableInfo = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 8,
            //     value: invigilator1.display,
            // },
            {
                index: 9,
                value: 'Approved',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 9, invigilator1.display)
    Cypress.auiCommon.verifyDateInTableContent(1, 8, new Date())
});

// Scenario: Invigilator1 who is stage1 verify the task number minus one after approved
Given(/^Invigilator1 verify the task number minus one after approved$/, () => {
    Cypress.PageAdminTaskCenter.verifyTaskIconNumber('')
});

// Scenario: Invigilator1 who is stage1 verify approval stages
Given(/^Invigilator1 click the stage number$/, () => {
    Cypress.PageAdminTaskCenter.clickStageNumber()
});
Then(/^Invigilator1 verify approval stages panel info$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 0,
                display: 'Stage',
                value: 'Stage 1',
            },
            {
                index: 0,
                value: 'Current',
            },
            // {
            //     index: 1,
            //     display: 'Approvers',
            //     value: system.display,
            // },
            {
                index: 2,
                display: 'Reminder',
                value: '2 days',
            },
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(columnInfo_1)
    let columnInfo_2 = {
        rowIndex: 2,
        columns: [
            {
                index: 0,
                value: 'Stage 2',
            },
            // {
            //     index: 1,
            //     value: invigilator2.display,
            // },
            {
                index: 2,
                value: '3 days',
            },
        ]
    }
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(2, 2, invigilator2.display)
    Cypress.auiCommon.verifyTableInPanel(columnInfo_2)
});

// Scenario: Invigilator2 who is stage2 check out and edit exam
Given(/^Login as invigilator2$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(invigilator2.userid)
});
When(/^I goto step3$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(2)
});
Then(/^Invigilator2 click check out and edit exam$/, () => {
    Cypress.auiCommon.clickFooterPanelBtn(4, true)
});
Then(/^Invigilator2 edit the exam name and change to open book exam$/, () => {
    Cypress.PageExamCreate.inputExamName(examObj.editName)
    Cypress.PageExamCreate.chooseExamType(1)
    Cypress.PageExamCreate.saveNextForm()
});
Then(/^Invigilator2 verify step3 have Cancel, Back, Save and preview exam, Save and close, Check in button$/, () => {
    Cypress.PageExamCreate.saveNextForm()
    Cypress.PageAdminTaskCenter.viewExamFooterButton(['Cancel', 'Back', 'Save and preview exam', 'Save and close', 'Check in'])
});
And(/^Invigilator2 verify add, edit, remove paper are disabled$/, () => {
    Cypress.PageAdminTaskCenter.verifyPaperDisabled_AfterCheckOut()
});

// Scenario: Invigilator2 who is stage2 check in the exam
Then(/^Invigilator2 check in the exam$/, () => {
    Cypress.auiCommon.clickFooterPanelBtn(5)
});
And(/^Invigilator2 verify the breadcrumb display right$/, () => {
    Cypress.auiCommon.verifyBreadcrumb('Task centre', 0)
    Cypress.auiCommon.verifyBreadcrumb('View written exam - Generate paper', 1)
});

// Scenario: Invigilator2 who is stage2 approve and publish the exam
Then(/^Invigilator2 approve and publish the exam$/, () => {
    Cypress.auiCommon.clickFooterPanelBtn(6)
    Cypress.auiCommon.inputInDialog_InModal(approveComment[1], 1)
});

// Scenario: CM verify the publish exam info after approve
Then(/^CM verify the exam card is Exam published$/, () => {
    let examInfo = {
        title: examObj.editName,
        sta: {
            step: 5,
            descrip: 'Exam published'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

// Scenario: CM view the approval history
Given(/^CM click the approval history$/, () => {
    Cypress.auiCommon.clickFooterPanelBtn(0)
});
Then(/^CM view cm sent exam for approval$/, () => {
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(2, cm.display, 'sent the exam for approval')
    // Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(2, 'sent the exam for approval')
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryTime(2)
});
And(/^CM view stage1 approved$/, () => {
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(1, invigilator1.display)
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(1, 'Stage 1', ' approved the exam')
    // Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(1, ' approved the exam')
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(1, approveComment[0])
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryTime(1)
});
And(/^CM view stage2 approved$/, () => {
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(0, invigilator2.display)
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(0, 'Stage 2', ' approved the exam')
    // Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(0, ' approved the exam')
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryContent(0, approveComment[1])
    Cypress.PageAdminTaskCenter.verifyApprovalHistoryTime(0)
});

//Scenario: CM duplicate the exam and send for approval
Then(/^CM duplicate the exam$/, () => {
    Cypress.PageExamHome.duplicateExam()
});

//Scenario: Invigilator1 who is stage1 verify reject panel
And(/^I search the duplicate exam in task center$/, () => {
    Cypress.PageReport.search(examObj.duplicateName)
});
Then(/^I check it and click the reject button$/, () => {
    Cypress.auiCommon.chooseCheckbox(1)
    Cypress.PageAdminTaskCenter.clickRejectBtn()
});
And(/^Invigilator1 verify A specific stage button is disabled$/, () => {
    Cypress.PageAdminTaskCenter.verifySpecificStageDisabled_InStage1()
});
And(/^Invigilator1 verify A specific stage table info are right$/, () => {
    let columnInfo_1 = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Stage',
                value: 'Stage 1',
            },
            {
                index: 1,
                value: 'Current',
            },
            // {
            //     index: 2,
            //     display: 'Approvers',
            //     value: system.display,
            // },
            {
                index: 2,
                display: 'Approvers',
                value: '+'
            },
            {
                index: 3,
                display: 'Reminder',
                value: '2 days',
            },
            {
                index: 4,
                display: 'Status',
                value: 'Waiting for approval',
            },
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(columnInfo_1)
});
And(/^Invigilator1 verify Routing rule button is disabled$/, () => {
    Cypress.PageAdminTaskCenter.verifyFollowTheSubStagesLabelDisabledAndChecked_InStage1()
});

//Scenario: Invigilator1 who is stage1 approve the duplicate exam in task center
Given(/^Invigilator1 click Cancel button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
Then(/^Invigilator1 click the approve button$/, () => {
    Cypress.PageAdminTaskCenter.clickApproveBtn()
});
And(/^Invigilator1 input comment and approve$/, () => {
    Cypress.auiCommon.inputInDialog_InModal(approveComment[0], 1)
});

//Scenario: Invigilator2 who is stage2 reject the duplicate exam in task center
Then(/^Invigilator2 choose A specific stage and Return to me directly$/, () => {
    Cypress.PageAdminTaskCenter.clickSpecificStageBtn()
    Cypress.PageAdminTaskCenter.clickReturnToMeDirectlyBtn()
});
When(/^Invigilator2 click ok in reject panel$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^Invigilator2 verify comment is Required field$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
});
Then(/^Invigilator2 input reject comment and ok$/, () => {
    Cypress.auiCommon.inputTextareaInPanel(rejectComment[0])
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
And(/^Invigilator2 verify the reject toast successfully$/, () => {
    Cypress.auiCommon.verifyToast('The task was rejected.')
});

//Scenario: Invigilator2 who is stage2 reject the duplicate exam in task center
Given(/^Login as system$/, () => {
    cy.logoutApi()
    cy.LoginExamAsSystem()
});
Then(/^System check it and click the approver button$/, () => {
    Cypress.auiCommon.chooseCheckbox(2)
    Cypress.PageAdminTaskCenter.clickAssignApproverBtn()
});
When(/^System delete all approvers and click ok$/, () => {
    Cypress.PageAdminCourse.deleteUser_InRichCombobox(0)
    Cypress.PageAdminCourse.deleteUser_InRichCombobox(0)
});
Then(/^System verify the popup is required fields$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
});

// Scenario: System assign invigilator2 approver
Then(/^System assign invigilator2 approver$/, () => {
    Cypress.PageAdminCourse.inputAdmin(invigilator2.display)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});

// Scenario: System verify Only show pending tasks without approvers
Given(/^System clear search$/, () => {
    Cypress.PageAdminAnnouncement.clearSearch()
});
Then(/^System check Only show pending tasks without approvers button$/, () => {
    Cypress.PageAdminTaskCenter.clickShowWithoutApproversBtn()
});
And(/^System verify result is right$/, () => {
    Cypress.PageSampleReport.verifyMessage('No items to show in this view.')
});
Then(/^System cancel check Only show pending tasks without approvers button$/, () => {
    Cypress.PageAdminTaskCenter.clickShowWithoutApproversBtn()
});

// Scenario: System filter status
Given(/^System filter Service type$/, () => {
    Cypress.PageAdminTaskCenter.filter('Service type', 'Exam')
});
And(/^System filter Approved$/, () => {
    Cypress.PageAdminTaskCenter.filter('Status', 'Approved')
});
And(/^System filter Pending on$/, () => {
    Cypress.PageAdminTaskCenter.filter('Pending on', invigilator2.display)
});
And(/^System verify filter result is right$/, () => {
    let tableInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Name',
                value: examObj.name,
            },
            {
                index: 2,
                display: 'Service type',
                value: 'Exam',
            },
            // {
            //     index: 4,
            //     display: 'Submitted by',
            //     value: cm.display,
            // },
            {
                index: 5,
                display: 'Stage No.',
                value: '2',
            },
            // {
            //     index: 6,
            //     display: 'Pending on',
            //     value: invigilator2.display,
            // },
            // {
            //     index: 8,
            //     display: 'Modified by',
            //     value: invigilator2.display,
            // },
            {
                index: 9,
                display: 'Status',
                value: 'Approved',
            },
        ]
    }
    Cypress.auiCommon.verifyTable(tableInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 5, cm.display)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 7, invigilator2.display)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 9, invigilator2.display)
    Cypress.auiCommon.verifyDateInTableContent(1, 4, new Date())
    Cypress.auiCommon.verifyDateInTableContent(1, 8, new Date())
});

// Scenario: Invigilator2 who is assigned approver approve the exam firstly
Then(/^Invigilator2 approve the exam firstly$/, () => {
    Cypress.auiCommon.chooseCheckbox(1)
    Cypress.PageAdminTaskCenter.clickApproveBtn()
    Cypress.auiCommon.inputInDialog_InModal(approveComment[2], 1)
});

// Scenario: Invigilator2 who is assigned approver reject the exam to requester secondly
Then(/^Invigilator2 who is assigned approver reject the exam to requester secondly$/, () => {
    Cypress.auiCommon.chooseCheckbox(1)
    Cypress.PageAdminTaskCenter.clickRejectBtn()
    Cypress.auiCommon.inputTextareaInPanel(rejectComment[1])
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});

// Scenario: CM verify the rejected status exam
And(/^CM search the duplicate exam in exam home page$/, () => {
    Cypress.PageExamHome.searchExam(examObj.duplicateName)
});
Then(/^CM verify the exam card is rejected$/, () => {
    let examInfo = {
        title: examObj.duplicateName,
        sta: {
            step: 4,
            descrip: 'Rejected'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
    cy.logoutApi()
});

// Scenario: AppAdmin delete the process
And(/^AppAdmin delete the approval process$/, () => {
    cy.wait(3000)
    Cypress.auiCommon.chooseCheckbox(0)
    Cypress.PageAdminApprovalProcesses.clickTopButton(4)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});