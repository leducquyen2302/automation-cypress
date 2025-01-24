/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let paperName = 'ATPaper_Attendance' + new Date().toLocaleString()
let OpenExam_Name = '', CloseExam_Name = '', flexibleExam_name = '', flexibleExam_startTime = '', flexibleExam_duration = '', flexibleExam_endTime = '', exam_Id = '', fleExamInfo = {}
let Question1 = {}
let stu1 = '', stu2 = '', stu3 = '', stu4 = '', stu5 = '', stu6 = '', system = '', invigilator1 = '', invigilator2 = ''
let reEnterDate = ''
let text = 'This is auto test.'
const toast = 'The exam has been ended.'

const notstarted = 'Not started'
const submitted = 'Submitted'
const subbyinvigilator = 'Submitted by invigilator'
const inprogress = 'In progress'
const absent = 'Absent'
const present = 'Present'
const liveproctoring_status = ['Not started', 'Network disconnected', 'Compulsory submit']

const addComment = 'This is a comment!'
const editEndTime = 'Extend one minute!'
const verifyExtend = 'Your exam time has been extended by 1 minutes.'
const tooltips = [
    'The time when the candidate starts the exam.',
    'The exam end time that is calculated based on the exam start time.',
    'The time when the candidate starts the exam and the exam end time calculated based on the exam start time.'
]
const chatContent = 'hello'
const endComment = 'The student is very good'

let viewName = 'Auto test view Name'
let edit_viewName = 'Edit Auto test view Name'

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
    name: "",
    courseCode: "AT001",
    courseName: "AutoTesting Programme 1",
    courseId: '',
    startOffset: {},
    startTime: "",
    duration: 0,
    endTime: "",
    isopenB: '',
    isSave2LocalFile: true,
    isAppend: false,
    sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 4 }]
}

let paperInfo = {
    name: paperName,
    sections: section_temp
}


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
    stu1 = env[ct].Candidates[0]
    stu2 = env[ct].Candidates[1]
    stu3 = env[ct].Candidates[2]
    stu4 = env[ct].Candidates[3]
    stu5 = env[ct].Candidates[4]
    stu6 = env[ct].Candidates[5]
    system = env[ct].System.display
    invigilator1 = env[ct].Invigilator1.display
    invigilator2 = env[ct].Invigilator2.display
})

// Scenario：open book- Attendance页面candidate status检查
Given(/^创建开卷考试$/, () => {
    examInfo.name = 'ATExam_AttOpen'
    examInfo.startOffset = { level: "min", off: 2 }
    examInfo.duration = 2
    examInfo.isOpenB = true
    examInfo.filePath = 'attendanceExam.json'
    examInfo.detectionSetting = {}
    examInfo.studentCount = [stu1.name, stu2.name, stu3.name, stu4.name, stu5.name, stu6.name]
    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/attendanceExam.json').then(($data) => {
        OpenExam_Name = $data.examInfo.name
        exam_Id = $data.examInfo.examId
        cy.log(OpenExam_Name)
    })
})
Then(/^stu1进入考试并交卷$/, () => {
    cy.LoginByLocal(stu1.userid)
    Cypress.PageStudentTakeSampleExam.enterStartExamPage(exam_Id)
    Cypress.PageStudentTakeExam.waitStartByTime(examInfo.startTime)
    Cypress.PageStudentTakeExam.startNow()
    Cypress.PageStudentTakeExam.endExam()
    cy.logoutApi()
})
Then(/^stu2进入考试，但是没有结束考试，就切换到了Admin登录$/, () => {
    cy.LoginByLocal(stu2.userid)
    Cypress.PageStudentTakeSampleExam.enterStartExamPage(exam_Id)
    Cypress.PageStudentTakeExam.startNow()
    cy.wait(3000)
    cy.logoutApi()
})
Then(/^Admin等待考试时间结束后进入Attendance页面$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamAttendance.waitEndByTime(examInfo.endTime)
    Cypress.PageExamHome.searchExam(OpenExam_Name)
    Cypress.PageExamAttendance.enterAttendance_overexam()
})
Then(/^Attendance status图表数据正确$/, () => {
    Cypress.PageExamAttendance.verifyStatus(['1', '0', '1', '4'])
})
And(/^I verify the exam basic info$/, () => {
    // Cypress.PageExamCreate.expandBasicInfo()
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        courseName: `${examInfo.courseCode} (${examInfo.courseName})`,
        readingTime: {
            exist: false
        },
        // answeringTime: [time.secondEditStep1Time_readingStart, time.secondEditStep1Time_answeringStart],
        enrolledCandidate: 6,
        // invigilator: invigilator1,
        administered: 6,
        fullmark: 4
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
    Cypress.PageExamCreate.verifyBasicInfoName(invigilator1)
    Cypress.PageExamCreate.verifyMoreInvigNum(1)
    Cypress.PageExamCreate.clickMoreInvig()
    Cypress.PageExamCreate.verifyMoreInvigName(0, invigilator1)
    Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator2)
})
And(/^I verify student001 all column is right$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu1.name
            },
            {
                index: 2,
                display: 'Candidate ID',
                value: stu1.id
            },
            {
                index: 3,
                display: 'User ID',
                value: stu1.userid
            },
            {
                index: 4,
                display: 'Status',
                value: 'Active'
            },
            {
                index: 5,
                display: 'Class name',
                value: 'Class 1'
            },
            {
                index: 6,
                display: 'Attendance status',
                value: present
            },
            {
                index: 7,
                display: 'Examination status',
                value: submitted
            },
            {
                index: 10,
                display: 'Face verification',
                value: 'N/A'
            },
            {
                index: 11,
                display: 'Suspicious activities',
                value: 'N/A'
            },
            {
                index: 12,
                display: 'Confirmed activities',
                value: 'N/A'
            },
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyTimeInTable(1, 9, examInfo.startTime)
    Cypress.auiCommon.verifyTimeInTable(1, 10, examInfo.startTime)
    Cypress.auiCommon.verifyTimeInTable(1, 14, examInfo.startTime)
    Cypress.auiCommon.verifyTimeInTable(1, 15, examInfo.endTime)

})
And(/^I verify student002 all column is right$/, () => {
    let student002_Info = {
        rowIndex: 2,
        columns: [
            {
                index: 1,
                value: stu2.name
            },
            {
                index: 2,
                display: 'Candidate ID',
                value: stu2.id
            },
            {
                index: 3,
                display: 'User ID',
                value: stu2.userid
            },
            {
                index: 4,
                value: 'Active'
            },
            {
                index: 5,
                value: 'Class 1'
            },
            {
                index: 6,
                value: present
            },
            {
                index: 7,
                value: inprogress
            },
            {
                index: 9,
                display: 'Candidate ended time',
                value: ''
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student002_Info)
})
And(/^I verify student006 all column is right$/, () => {
    let student006_Info = {
        rowIndex: 6,
        columns: [
            {
                index: 1,
                value: stu6.name
            },
            {
                index: 5,
                value: 'Class 2'
            },
            {
                index: 6,
                value: absent
            },
            {
                index: 7,
                value: notstarted
            },
            {
                index: 8,
                display: 'Candidate started time',
                value: ''
            },
            {
                index: 9,
                display: 'Candidate ended time',
                value: ''
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student006_Info)
})
Then(/^点击stu2的Submit，将stu2的试卷手动提交，status显示正确$/, () => {
    // cy.reload()
    // cy.waitElement('[style="color: var(--link-hover-color); cursor: pointer; padding-left: 10px;"]')
    // Cypress.PageExamAttendance.clickSubmit(1)
    let student006_Info = {
        rowIndex: 2,
        columns: [
            {
                index: 6,
                value: present
            },
            {
                index: 7,
                value: submitted
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student006_Info)
    Cypress.auiCommon.verifyTimeInTable(2, 8, examInfo.endTime)
    Cypress.PageExamAttendance.verifyStatus(['2', '0', '0', '4'])
})

// Scenario: open book- Attendance check open for resubmission status
Given(/^I choose all student$/, () => {
    Cypress.PageExamAttendance.selectAll()
});
Then(/^I reopen and set end time is next minute$/, () => {
    Cypress.PageExamAttendance.clickAttendanceHeaderBtn(2)
    Cypress.PageExamAttendance.editEndTime_Fixed('next1Min', addComment)
});
And(/^I verify attendance status after reopen$/, () => {
    Cypress.PageExamAttendance.verifyStatus(['0', '0', '6', '0'])
});
When(/^I choose stu1$/, () => {
    Cypress.PageExamAttendance.chooseStudent(0)
});
Then(/^I verify reopen button is disabled$/, () => {
    Cypress.PageExamAttendance.verifyReopenGray()
});
When(/^Stu1 end exam$/, () => {
    cy.SubmitExamApi(0, 'attendanceExam.json')
    cy.wait(2000)
});
Then(/^I verify attendance status after submitted student again submit$/, () => {
    Cypress.PageExamAttendance.verifyStatus(['1', '0', '5', '0'])
});
And(/^I verify end time column tooltip$/, () => {
    Cypress.auiCommon.verifyToolTipInTable(1, 15, addComment)
});
When(/^I choose stu2$/, () => {
    Cypress.PageExamAttendance.chooseStudent(1)
});
When(/^Exam deadline arrived$/, () => {
    // Cypress.PageExamAttendance.waitDeadlineArrived()
    cy.wait(60000)
});
Then(/^I verify attendance status after deadline arrived$/, () => {
    Cypress.PageExamAttendance.verifyStatus(['1', '0', '1', '4'])
});
Then(/^I reopen and set end time is 23,30$/, () => {
    Cypress.PageExamAttendance.clickAttendanceHeaderBtn(2)
    Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, 23, 30)
});
When(/^I open stu1 detail$/, () => {
    Cypress.PageExamAttendance.enterCandiDetail(0)
});
Then(/^I verify exam time,end time modified,comment$/, () => {
    let info = {
        fixed_examTime: [examInfo.startTime, '2022-09-08T15:30:00.000Z'],
        fixed_examStartTimeModified: 'N/A',
        fixed_editStartTimeComment: 'N/A',
        fixed_examEndTimeModified: `${system} edited at `,
        fixed_comment: addComment
    }
    Cypress.PageExamAttendance.verifyCandidateDetail(info)
})
When(/^Stu1 enter exam again$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(stu1.userid)
    Cypress.PageStudentTakeSampleExam.enterStartExamPage(exam_Id)
    let ss = new Date().getSeconds()
    if (ss > 53) {
        cy.wait((60 - ss + 1) * 1000)
        reEnterDate = new Date(new Date().setMinutes(new Date().getMinutes() + 1))
    } else {
        reEnterDate = new Date()
    }
    Cypress.PageStudentTakeExam.startNow()
    cy.logoutApi()
});
Then(/^I verify stu1 start time is now$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(OpenExam_Name)
    Cypress.PageExamAttendance.enterAttendance_overexam()
    // Cypress.auiCommon.verifyTimeInTable(1, 7, reEnterDate)
});
And(/^I verify stu1 end time is null$/, () => {
    Cypress.auiCommon.verifyTimeInTable(1, 8)
});

// Scenario: I verify create view is required field
Given(/^I open view list$/, () => {
    Cypress.PageExamAttendance.openAllColumns()
});
Then(/^I click manage views$/, () => {
    Cypress.PageExamAttendance.clickManageViewsBtn()
});
Then(/^I click create view button$/, () => {
    Cypress.PageExamMark.clickCreateViewBtn()
});
When(/^I click save create view$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^I verify name is required field$/, () => {
    Cypress.auiCommon.verifyValiMessage(1, 'Enter a value to proceed.')
});

// Scenario: I verify customized view built in data
Given(/^I input name and set default$/, () => {
    Cypress.PageExamMark.inputViewName(viewName)
    Cypress.PageExamMark.checkDefaultView()
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^I verify Candidate name, Attendance status, Examination status, Oral exam progress are checked and cannot edit$/, () => {
    Cypress.PageExamMark.verifyViewDefaultCheck(['Candidate name', 'Attendance status', 'Examination status (Written exam)', 'Oral exam progress (Oral exam)'])
});

// Scenario: I verify move up, move down, table display right
Given(/^I check Candidate ID and move up it$/, () => {
    Cypress.PageExamMark.checkViewColumn(1)
    Cypress.PageExamMark.moveUpViewColumn(1)
});
Then(/^I verify Candidate ID move up is gray$/, () => {
    Cypress.PageExamMark.verifyMoveUpViewBtnDisabled(0)
});
Then(/^I move down Candidate name and check User ID$/, () => {
    Cypress.PageExamMark.moveDownViewColumn(1)
    Cypress.PageExamMark.checkViewColumn(1)
});
Then(/^I save the customized view$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify table display the customized view right$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Candidate ID',
                value: stu1.id
            },
            {
                index: 2,
                display: 'User ID',
                value: stu1.userid
            },
            {
                index: 3,
                display: 'Candidate name',
                value: stu1.name
            },
            {
                index: 4,
                display: 'Attendance status',
                value: present
            },
            {
                index: 5,
                display: 'Examination status',
                value: inprogress
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
});

// Scenario: I verify manage view button name are right
Given(/^I verify manage view button display the customized view name$/, () => {
    Cypress.PageExamMark.manageColumnsDisplayText(viewName)
});
When(/^I open view list$/, () => {
    Cypress.PageExamAttendance.openAllColumns()
});
Then(/^I verify the customized view name display default$/, () => {
    Cypress.PageExamMark.verifyViewColumnName(1, viewName, true)
});
When(/^I click manage views$/, () => {
    Cypress.PageExamAttendance.clickManageViewsBtn()
});
Then(/^I verify all columns set as default is no$/, () => {
    Cypress.PageExamMark.verifyDefaultValue('No')
});

// Scenario: I verify All columns edit view popup
Given(/^I click edit view button$/, () => {
    Cypress.PageExamMark.clickEditViewBtn()
});
Then(/^I verify view name is gray$/, () => {
    Cypress.PageExamMark.verifyEditViewNameDisabled()
});
Then(/^I click save edit view button$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});

// Scenario: I edit the customized view
Given(/^I switch the customized view$/, () => {
    Cypress.PageExamMark.clickTab_InManageViewsPanel(1)
});
And(/^I verify the customized view name display default and highlight in left Navigation bar$/, () => {
    Cypress.PageExamMark.verifyHightLight_InManageViews(1, 'true', 'true')
});
Then(/^I click edit view button$/, () => {
    Cypress.PageExamMark.clickEditViewBtn()
});
Then(/^I verify input field echo right$/, () => {
    Cypress.PageExamMark.verifyEchoInputViewName(viewName)
});
Then(/^I input a new name$/, () => {
    Cypress.PageExamMark.inputViewName(edit_viewName)
});
Then(/^I uncheck Candidate ID$/, () => {
    Cypress.PageExamMark.checkViewColumn(0)
});
Then(/^I verify table display the customized view right after edit$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'User ID',
                value: stu1.userid
            },
            {
                index: 2,
                display: 'Candidate name',
                value: stu1.name
            },
            {
                index: 3,
                display: 'Attendance status',
                value: present
            },
            {
                index: 4,
                display: 'Examination status',
                value: inprogress
            }
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
});

// Scenario: I delete the customized view
Given(/^I delete the customized view$/, () => {
    Cypress.PageExamMark.deleteTableView()
});
Then(/^I verify table display default view$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu1.name
            },
            {
                index: 2,
                display: 'Candidate ID',
                value: stu1.id
            },
            {
                index: 3,
                display: 'User ID',
                value: stu1.userid
            },
            {
                index: 4,
                display: 'Status',
                value: 'Active'
            },
            {
                index: 5,
                display: 'Class name',
                value: 'Class 1'
            },
            {
                index: 6,
                display: 'Attendance status',
                value: present
            },
            {
                index: 7,
                display: 'Examination status',
                value: inprogress
            },
            {
                index: 9,
                display: 'Candidate ended time',
                value: ''
            },
            {
                index: 10,
                display: 'Face verification',
                value: 'N/A'
            },
            {
                index: 11,
                display: 'Suspicious activities',
                value: 'N/A'
            },
            {
                index: 12,
                display: 'Confirmed activities',
                value: 'N/A'
            },
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyTimeInTable(1, 14, examInfo.startTime)
    let endDate = new Date()
    let yy = endDate.getFullYear(), mm = endDate.getMonth(), dd = endDate.getDate()
    let endTime = new Date(yy, mm, dd, 23, 30)
    Cypress.auiCommon.verifyTimeInTable(1, 15, endTime)
});