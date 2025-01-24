/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let candiList = [], invigilator1 = '', invigilator2 = '', cm = ''
let td = new Date()
let yy = td.getFullYear(), mm = td.getMonth(), dd = td.getDate(), hh = td.getHours(), min = td.getMinutes()
let time = {
    initialTime_readingStart: new Date(yy, mm, dd, 21, 0, 0),
    initialTime_answeringStart: new Date(yy, mm, dd, 21, 5, 0),
    initialTime_end: new Date(yy, mm, dd, 22, 5, 0),
    // step2 edit exam time 第二天 21:00-21:05-23:00
    editExamTime_readingStart: new Date(yy, mm, dd + 1, 21, 0, 0),
    editExamTime_answeringStart: new Date(yy, mm, dd + 1, 21, 5, 0),
    editExamTime_end: new Date(yy, mm, dd + 1, 23, 0, 0),
    // step1 再次修改 exam time 只把reading start time延后了一小时，duration改为10
    secondEditStep1Time_readingStart: new Date(yy, mm, dd, 22, 0, 0),
    secondEditStep1Time_answeringStart: new Date(yy, mm, dd, 22, 10, 0),
    secondEditStep1Time_end: new Date(yy, mm, dd, 23, 10, 0),
    // step1修改reading duration，step2 edit exam time student only changed reading start time, duration
    editExamTimeChangend_readingStart: new Date(yy, mm, dd + 1, 20, 55, 0),
    editExamTimeChangend_answeringStart: new Date(yy, mm, dd + 1, 21, 5, 0),
    editExamTimeChangend_end: new Date(yy, mm, dd + 1, 23, 0, 0),
}
const message = {
    startTimeError: 'The answering start time must be later than the current time.',
    endtimeError: 'The answering end time must be later than the answering start time.',
    samedayError: 'The answering start time and the answering end time must be on the same day.',
    readingStartTimeError: 'The reading start time must be later than the current time.',
    readingEndTimeError: 'The answering end time must be later than the answering start time.',
    readingSameDayError: 'The reading start time and the answering end time must be on the same day.',
    invigilatorMsg: 'The following invigilators have been assigned with exams that conflict with this exam.',
    noCandidateMsg: 'Enrol at least one candidate.',
    noPaperMsg: 'Create or add a paper for the exam to proceed.'
}

let examObj = {
    _01_02_CreateFixedReadingExam: 'AT_01_02_CreateFixedReadingExam' + new Date().toLocaleString(),
    courseCode: 'AT001',
    instruc: 'Long Text Instruction to Candidates \r ' + new Date().toLocaleString(),
    invigilator: ''
}
const comment = 'This is a comment'

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)

    candiList = env[ct].Candidates
    invigilator1 = env[ct].Invigilator1.display
    invigilator2 = env[ct].Invigilator2.display
    cm = env[ct].CM.display
})

// Scenario: In step1 close exam and have reading time 验证先修改end time能否save and next
Given(/^I login as Course Manager$/, () => {
    cy.LoginExamAsSystem()
});
Then(/^I Click Create exam button from Home page$/, () => {
    Cypress.PageExamHome.clickCreateExam()
    Cypress.auiCommon.verifyUrl('include', '/create?')
});
When(/^设置为have reading time$/, () => {
    Cypress.PageExamCreate.setReadingTime()
});
Then(/^I verify all display minutes by default$/, () => {
    Cypress.PageExamCreate.verify_Default_ReadingAllInfo()
});
Then(/^先修改end time再修改start time、duration$/, () => {
    Cypress.PageExamCreate.examReadingEndTime(0, 22, 0)
    Cypress.PageExamCreate.examReadingStartTime(0, 20, 0)
    Cypress.PageExamCreate.examReadingDuration(0)
});
Then(/^填写必填项$/, () => {
    Cypress.PageExamCreate.inputExamNameWithCode(examObj._01_02_CreateFixedReadingExam)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
    cy.writeFile('cypress/fixtures/01_02_CreateFixedReadingExam.json', `"${examObj._01_02_CreateFixedReadingExam}"`);
});
Then(/^I click save and next$/, () => {
    Cypress.PageExamCreate.saveNextForm()
});

//  Scenario: In step1 Exam Reading End Time Can Not Earlier than now
Given(/^I click back goto step1$/, () => {
    Cypress.PageExamCreate.backForm()
});
When(/^I set the reading end time before current time$/, () => {
    Cypress.PageExamCreate.examReadingEndTime(0, 1, 30)
});
Then(/^Reading End Time提示信息正确$/, () => {
    Cypress.auiCommon.verifyValiMessage(4, message.readingEndTimeError)
});

// Scenario: In step1 Reading Start Time Can Not Earlier than now
When(/^I set the reading start time before current time$/, () => {
    Cypress.PageExamCreate.examReadingStartTime(0, 1, 0)
});
Then(/^Reading Start Time提示信息正确$/, () => {
    Cypress.auiCommon.verifyValiMessage(3, message.readingStartTimeError)
});

//  Scenario: In step1 Exam End Time Can Not Earlier than Reading Start Time
When(/^I set the end time before reading start time$/, () => {
    Cypress.PageExamCreate.examReadingStartTime(0, 21, 0)
    Cypress.PageExamCreate.examReadingEndTime(0, 20, 0)
});
Then(/^结束时间必须早于开始时间的提示信息正确$/, () => {
    Cypress.auiCommon.verifyValiMessage(4, message.readingEndTimeError)
});
Then(/^I will see the validation AnswerDuration right$/, () => {
    Cypress.PageExamCreate.verifyAnswerDuration('0 min')
});

//  Scenario: In step1 set reading time verify answering duration
When(/^I input correct reading time$/, () => {
    Cypress.PageExamCreate.examReadingDuration(0)
    Cypress.PageExamCreate.examReadingStartTime(0, 21, 0)
    Cypress.PageExamCreate.examReadingEndTime(0, 22, 5)
});
Then(/^I will see the correct AnswerDuration right$/, () => {
    Cypress.PageExamCreate.verifyAnswerDuration('60 mins')
});

// Scenario: In step2 verify initial information
Given(/^I am in Exam step 2$/, () => {
    Cypress.PageExamCreate.verifyStep(1)
});
Then(/^I can see all candidates$/, () => {
    Cypress.PageSampleReport.verifyStudentNumber(6)
});
And(/^I verify student001 info in class1 and student004 info in class2$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 1,
            //     display: 'Candidate name',
            //     value: candiList[0].name
            // },
            {
                index: 2,
                display: 'Class name',
                value: 'Class 1'
            },
            {
                index: 3,
                display: 'Team',
                value: ''
            },
            {
                index: 6,
                display: 'Reading duration',
                value: '5 minutes'
            },
            {
                index: 9,
                display: 'Invigilator',
                value: invigilator1
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, candiList[0].name)
    Cypress.auiCommon.verifyTimeInTable(1, 6, time.initialTime_readingStart)
    Cypress.auiCommon.verifyTimeInTable(1, 8, time.initialTime_answeringStart)
    Cypress.auiCommon.verifyTimeInTable(1, 9, time.initialTime_end)
    let student005_Info = {
        rowIndex: 5,
        columns: [
            // {
            //     index: 1,
            //     display: 'Candidate name',
            //     value: candiList[4].name
            // },
            {
                index: 2,
                display: 'Class name',
                value: 'Class 2'
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student005_Info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(5, 2, candiList[4].name)
});

// Scenario: In step2 assign invigilator for classes
When(/^I click assign invigilator for classes$/, () => {
    Cypress.PageExamCreate.assignInvigilator(1, 'Assign invigilator for classes')
});
Then(/^I verify the assign invigilator for classes panel info$/, () => {
    let class1_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Class name',
                value: 'Class 1'
            },
            {
                index: 2,
                display: 'Number of candidates',
                value: 4
            },
            // {
            //     index: 3,
            //     display: 'Invigilator',
            //     value: invigilator1
            // }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(class1_Info)
    Cypress.auiCommon.verifyCandidateNameInPanelTable_InShadow_NoTag(1, 4, invigilator1)
    let class2_Info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: 'Class 2'
            },
            {
                index: 2,
                value: 2
            },
            // {
            //     index: 3,
            //     value: invigilator2
            // }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(class2_Info)
    Cypress.auiCommon.verifyCandidateNameInPanelTable_InShadow_NoTag(2, 4, invigilator2)
});
Then(/^I add CM as invigilator for class1$/, () => {
    Cypress.PageExamCreate.changeInvigilator(1, cm)
});
And(/^I can see 1 icon and have two invigilators$/, () => {
    Cypress.PageExamCreate.verifyMoreInvigNum(1)
    Cypress.PageExamCreate.clickMoreInvig()
    Cypress.PageExamCreate.verifyMoreInvigName(0, cm)
    Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator1)
});
Then(/^I save the change invigilator$/, () => {
    Cypress.PageExamCreate.saveInvig()
});
When(/^I search student001$/, () => {
    Cypress.PageExamCreate.searchCandidate(candiList[0].name)
});
And(/^I can see student001's invigilator column have 1 icon and have two invigilators$/, () => {
    Cypress.PageExamCreate.verifyMoreInvigNum(1)
    Cypress.PageExamCreate.clickMoreInvig()
    Cypress.PageExamCreate.verifyMoreInvigName(0, cm)
    Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator1)
});

// Scenario: In step2 assign invigilator for selected candidates
When(/^I check student001$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
});
Then(/^I click assign invigilator for selected candidates$/, () => {
    Cypress.PageExamCreate.assignInvigilator(0, 'Assign invigilator for selected candidates')
});
Then(/^I remove cm$/, () => {
    Cypress.PageExamCreate.removeInvig(0)
});
And(/^I verify student001 invigilator$/, () => {
    // let student001_invigilator = {
    //     rowIndex: 1,
    //     columns: [
    //         {
    //             index: 9,
    //             value: invigilator1
    //         }
    //     ]
    // }
    // Cypress.auiCommon.verifyTable(student001_invigilator)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 10, invigilator1)
});

// Scenario: In step2 verify multiple invigilators in class
Then(/^I can see the class1 is multiple invigilators for different candidates$/, () => {
    let class1_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Class name',
                value: 'Class 1'
            },
            {
                index: 2,
                display: 'Number of candidates',
                value: 4
            },
            {
                index: 3,
                display: 'Invigilator',
                value: 'Multiple invigilators for different candidates'
            }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(class1_Info)
});
Then(/^I click multiple invigilators and verify info$/, () => {
    Cypress.PageExamCreate.clickMultipleInvigilator(0)
    Cypress.PageExamCreate.verifyMultipleInfo(0, cm)
    Cypress.PageExamCreate.verifyMultipleInfo(1, 3)
    Cypress.PageExamCreate.verifyMultipleInfo(2, invigilator1)
    Cypress.PageExamCreate.verifyMultipleInfo(3, 4)
});
Then(/^I click cancel$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});

// Scenario: In step2 manage and assign teams
Given(/^I click manage teams button$/, () => {
    Cypress.PageExamCreate.invigilatorSubTitleBtn(4)
});
Then(/^I create group1$/, () => {
    Cypress.PageExamCreate.clickBtnInManageGroupPanel(0)
    Cypress.auiCommon.inputInDialog('Group 1', 'Save')
});
Then(/^I close manage teams panel$/, () => {
    Cypress.auiCommon.closePanel()
});
When(/^I clear search$/, () => {
    Cypress.PageAdminCourse.clearSearch()
});
Then(/^I check student001 student002$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.courseTableRowCheckbox(1)
});
Then(/^I click assign group$/, () => {
    Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
});
Then(/^I create group2 by click create a new group in select a group$/, () => {
    Cypress.auiCommon.checkOptionInDialog(1)
    Cypress.auiCommon.inputInDialog('Group 2', 'Save')
});
And(/^I verify display group2 by default$/, () => {
    Cypress.auiCommon.verifySelectedInFlexDialog('Group 2')
});
Then(/^I search group1 and click ok$/, () => {
    Cypress.auiCommon.checkOptionInDialog('Group 1')
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
And(/^I verify student002 group is right in table$/, () => {
    let student002_groupInfo = {
        rowIndex: 2,
        columns: [
            {
                index: 3,
                value: 'Group 1'
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student002_groupInfo)
});
When(/^I click save and next$/, () => {
    Cypress.PageExamCreate.saveNextForm()
});
Then(/^I can see some of the candidates have no group assignment tip$/, () => {
    Cypress.auiCommon.verifyToast('Some of the candidates have no team assignment.')
});
Then(/^I assign student003 student004 student005 student006 with group2$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(2)
    Cypress.PageAdminCourse.courseTableRowCheckbox(3)
    Cypress.PageAdminCourse.courseTableRowCheckbox(4)
    Cypress.PageAdminCourse.courseTableRowCheckbox(5)
    Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
    Cypress.auiCommon.checkOptionInDialog('Group 2')
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^I edit group1 to edit_group1$/, () => {
    Cypress.auiCommon.checkBoxInPanelTable(1)
    Cypress.PageExamCreate.clickBtnInManageGroupPanel(1)
    Cypress.auiCommon.inputInDialog('edit_Group 1', 'Save')
});
And(/^I verify the teams info are all right$/, () => {
    let edit_Group1_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Team',
                value: 'edit_Group 1'
            },
            {
                index: 2,
                display: 'No. of candidates',
                value: 2
            }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(edit_Group1_Info)
    let group2_Info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: 'Group 2'
            },
            {
                index: 2,
                value: 4
            }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(group2_Info)
});
And(/^I verify student001 group is right in table$/, () => {
    let student001_groupInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                value: 'edit_Group 1'
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_groupInfo)
});
When(/^I delete edit_group1$/, () => {
    Cypress.PageExamCreate.invigilatorSubTitleBtn(4)
    Cypress.auiCommon.checkBoxInPanelTable(1)
    Cypress.PageExamCreate.clickBtnInManageGroupPanel(2)
    Cypress.PageAdminCourse.confirmDialog(1)
    Cypress.auiCommon.closePanel()
});
Then(/^I verify student001 have no group in table$/, () => {
    let student001_groupInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                value: ''
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_groupInfo)
});
Then(/^I create group1 to student001 student002$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.courseTableRowCheckbox(1)
    Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
    Cypress.auiCommon.checkOptionInDialog(1)
    Cypress.auiCommon.inputInDialog('Group 1', 'Save')
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});

// Scenario: In step2 assign invigilator for teams
Given(/^I click assign invigilator for teams button$/, () => {
    Cypress.PageExamCreate.assignInvigilator(2, 'Assign invigilator for teams')
});
And(/^I verify group1 group2 info and multiple info$/, () => {
    let group1_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Team name',
                value: 'Group 1'
            },
            {
                index: 2,
                display: 'Number of candidates',
                value: 2
            },
            {
                index: 3,
                display: 'Invigilator',
                value: 'Multiple invigilators for different candidates'
            }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(group1_Info)
    Cypress.PageExamCreate.clickMultipleInvigilator(0)
    Cypress.PageExamCreate.verifyMultipleInfo(0, cm)
    Cypress.PageExamCreate.verifyMultipleInfo(1, 1)
    Cypress.PageExamCreate.verifyMultipleInfo(2, invigilator1)
    Cypress.PageExamCreate.verifyMultipleInfo(3, 2)
    let group2_Info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: 'Group 2'
            },
            {
                index: 2,
                value: 4
            },
            {
                index: 3,
                value: 'Multiple invigilators for different candidates'
            }
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(group2_Info)
    Cypress.PageExamCreate.clickMultipleInvigilator(1)
    Cypress.PageExamCreate.verifyMultipleInfo(4, cm)
    Cypress.PageExamCreate.verifyMultipleInfo(5, 2)
    Cypress.PageExamCreate.verifyMultipleInfo(6, invigilator1)
    Cypress.PageExamCreate.verifyMultipleInfo(7, 2)
    Cypress.PageExamCreate.verifyMultipleInfo(8, invigilator2)
    Cypress.PageExamCreate.verifyMultipleInfo(9, 2)
});
Then(/^I change group1 invigilator with cm$/, () => {
    Cypress.PageExamCreate.changeInvigilator(1, cm)
    Cypress.PageExamCreate.saveInvig()
});
And(/^I verify student002 invigilator$/, () => {
    // let student002_invigilatorInfo = {
    //     rowIndex: 2,
    //     columns: [
    //         {
    //             index: 9,
    //             value: cm
    //         }
    //     ]
    // }
    // Cypress.auiCommon.verifyTable(student002_invigilatorInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(2, 10, cm)
});

// Scenario: In step2 remove two candidate
Given(/^I check student001 student006 click remove candidate button$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.courseTableRowCheckbox(5)
    Cypress.PageExamCreate.verifyCandidateSelectedNumber(2, 6)
    Cypress.PageExamCreate.invigilatorSubTitleBtn(2)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^I verify do not have student001 student006$/, () => {
    Cypress.PageSampleReport.verifyStudentNumber(4)
});

// Scenario: In step2 assign invigilator for all
Given(/^I click assign invigilator for all$/, () => {
    Cypress.PageExamCreate.assignInvigilator(3, 'Assign invigilator for all')
});
Then(/^I input invigilator2 and save$/, () => {
    Cypress.auiCommon.searchInPanel(invigilator2)
    Cypress.PageExamCreate.saveInvig()
});
Then(/^I verify student002,003,004,005 invigilator$/, () => {
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 10, invigilator2)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(2, 10, invigilator2)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(3, 10, invigilator2)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(4, 10, invigilator2)
});

// Scenario: In step2 add candidate
Given(/^I click add candidate button$/, () => {
    Cypress.PageExamCreate.invigilatorSubTitleBtn(1)
});
Then(/^I verify student001 info in the add candidate panel$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 1,
            //     display: 'Candidate name',
            //     value: candiList[0].name
            // },
            {
                index: 2,
                display: 'Candidate ID',
                value: candiList[0].id
            },
            {
                index: 3,
                display: 'User ID',
                value: candiList[0].userid
            },
            {
                index: 4,
                display: 'Class name',
                value: 'Class 1'
            },
        ]
    }
    Cypress.auiCommon.verifyTableInPanel(student001_Info)
});
Then(/^I search student001 and save$/, () => {
    Cypress.auiCommon.searchInPanel(candiList[0].name)
    Cypress.auiCommon.checkBoxInPanelTable(1)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
And(/^I verify student001 have no group and invigilator is class owner in table$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                value: ''
            },
            {
                index: 9,
                value: invigilator1
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
});
And(/^I verify the blue message display right$/, () => {
    Cypress.PageExamAttendance.verifyMessage('There are 6 candidates in the course. 5 candidates are enrolled in the exam, and 1 candidates are pending enrolment.')
});
Then(/^I assign student001 for group1$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageExamCreate.invigilatorSubTitleBtn(3)
    Cypress.auiCommon.checkOptionInDialog(0)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});

// Scenario: In step2 edit exam time
Given(/^I check student005 click edit exam time button$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(4)
    Cypress.PageExamCreate.invigilatorSubTitleBtn(5)
    cy.wait(1000)
});
Then(/^I verify reading start time, reading duration, answering start time, answering end time$/, () => {
    // Cypress.PageExamCreate.verifyStep2EditExamTime_StartTimeOrEndTime(0, '2023-01-07T13:00:00.000Z')
    Cypress.PageExamCreate.verifyStep2EditExamTime_Duration(5)
    Cypress.PageExamCreate.verifyStep2EditExamTime_AnsweringStartTimeWithReading('13:05:00.000Z')
    // Cypress.PageExamCreate.verifyStep2EditExamTime_StartTimeOrEndTime(2, '2023-01-07T14:05:00.000Z')
});
When(/^I changed the end time tomorrow 23:00 so that the start and end are not on the same day$/, () => {
    Cypress.PageExamCreate.setStep2EditExamTime_AnsweringEndTime(0, 1, 23, 0)
});
Then(/^I can see must be on the same day message$/, () => {
    Cypress.auiCommon.verifyValiMessage(1, message.readingSameDayError)
});
Then(/^I changed the start time to tomorrow and add comment$/, () => {
    Cypress.PageExamCreate.setStep2editExamTime_ReadingStartTime(1, 1, 21, 0)
    Cypress.auiCommon.inputTextareaInPanel(comment)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
And(/^I verify student005 exam time, background highlight, comment, clock icon$/, () => {
    Cypress.auiCommon.verifyTimeInTable(5, 6, time.editExamTime_readingStart)
    Cypress.auiCommon.verifyTimeInTable(5, 8, time.editExamTime_answeringStart)
    Cypress.auiCommon.verifyTimeInTable(5, 9, time.editExamTime_end)
    Cypress.auiCommon.verifyHighLightInTable(5, 6)
    Cypress.auiCommon.verifyHighLightInTable(5, 8)
    Cypress.auiCommon.verifyHighLightInTable(5, 9)
    Cypress.auiCommon.verifyToolTipInTable(5, 6, comment)
    // 暂时没写clock tooltip
    // Cypress.auiCommon.verifyClockIcon(`The exam start time of the candidate has been updated to ${}.
    // The exam end time of the candidate has been updated to ${}.
    // `)
});
Then(/^I modify reading start time, reading duration$/, () => {
    Cypress.PageExamCreate.examReadingStartTime(0, 22, 0)
    Cypress.PageExamCreate.examReadingDuration(1)
});
Then(/^I verify student001 exam time, duration is the same as step1$/, () => {
    Cypress.auiCommon.verifyTimeInTable(1, 6, time.secondEditStep1Time_readingStart)
    Cypress.auiCommon.verifyValueInTable(1, 7, '10 minutes')
    Cypress.auiCommon.verifyTimeInTable(1, 8, time.secondEditStep1Time_answeringStart)
    Cypress.auiCommon.verifyTimeInTable(1, 9, time.secondEditStep1Time_end)
});
And(/^I verify student005 exam time, duration not changed$/, () => {
    Cypress.auiCommon.verifyTimeInTable(5, 6, time.editExamTimeChangend_readingStart)
    Cypress.auiCommon.verifyValueInTable(5, 7, '10 minutes')
    Cypress.auiCommon.verifyTimeInTable(5, 8, time.editExamTimeChangend_answeringStart)
    Cypress.auiCommon.verifyTimeInTable(5, 9, time.editExamTimeChangend_end)
});

// Scenario: In step2 class filter
When(/^I filter class1$/, () => {
    Cypress.PageExamCreate.step2Filter('Class', 'Class 1')
});
Then(/^I verify have 4 students$/, () => {
    Cypress.PageSampleReport.verifyStudentNumber(4)
});
When(/^I filter group1$/, () => {
    Cypress.PageExamCreate.step2Filter('Group', 'Group 1')
});
Then(/^I verify have 2 students$/, () => {
    Cypress.PageSampleReport.verifyStudentNumber(2)
});
When(/^I filter invigilator1$/, () => {
    Cypress.PageExamCreate.step2Filter('Invigilator', invigilator1)
});
Then(/^I verify have 1 students and is student001$/, () => {
    Cypress.PageSampleReport.verifyStudentNumber(1)
    // let student001_Info = {
    //     rowIndex: 1,
    //     columns: [
    //         {
    //             index: 1,
    //             display: 'Candidate name',
    //             value: candiList[0].name
    //         }
    //     ]
    // }
    // Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, candiList[0].name)
});

// Scenario: In step2 verify basic info
Given(/^I open basic info$/, () => {
    Cypress.PageExamCreate.expandBasicInfo()
});
Then(/^I verify step2 basic info$/, () => {
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        // readingTime: {
        //     exist: true,
        //     start: new Date(yy, mm, dd, 22, 0, 0),
        //     end: '2023/01/07 22:00'
        // },
        // answeringTime: [time.secondEditStep1Time_readingStart, time.secondEditStep1Time_answeringStart],
        classification: 'Fixed time range',
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
});

// Scenario: In step2 verify basic info
Given(/^I verify navigation bar in exam step3$/, () => {
    Cypress.PageExamCreate.verifyStep(2)
});
Then(/^I verify step3 basic info$/, () => {
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        // readingTime: {
        //     exist: true,
        //     start: new Date(yy, mm, dd, 22, 0, 0),
        //     end: '2023/01/07 22:00'
        // },
        // answeringTime: [time.secondEditStep1Time_readingStart, time.secondEditStep1Time_answeringStart],
        classification: 'Fixed time range',
        enrolledCandidate: '5',
        // invigilator: invigilator1
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
    Cypress.PageExamCreate.verifyBasicInfoName(invigilator1)
    Cypress.PageExamCreate.verifyMoreInvigNum(1)
    Cypress.PageExamCreate.clickMoreInvig()
    Cypress.PageExamCreate.verifyMoreInvigName(0, invigilator1)
    Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator2)
});

// Scenario: In step3 can't publish exam without any papers
Then(/^I can't publish exam without any papers$/, () => {
    Cypress.PageExamCreate.clickPublish()
    Cypress.auiCommon.verifyToast(message.noPaperMsg)
});

// Scenario: In step3 create paper directly and publish exam
Then(/^I create paper directly$/, () => {
    Cypress.PageExamCreate.examCreatePaperDirectly(examObj._01_02_CreateFixedReadingExam, true)
});
And(/^I publish exam$/, () => {
    Cypress.PageExamCreate.examPublish()
});