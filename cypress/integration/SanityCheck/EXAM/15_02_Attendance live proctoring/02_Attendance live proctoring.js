/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let paperName = 'ATPaper_Attendance' + new Date().toLocaleString()
let OpenExam_Name = '', CloseExam_Name = '', flexibleExam_name = '', flexibleExam_startTime = '', flexibleExam_duration = '', flexibleExam_endTime = '', exam_Id = '', fleExamInfo = {}
let Question1 = {}
let stu1 = '', stu2 = '', stu3 = '', stu4 = '', stu5 = '', stu6 = ''
let text = 'This is auto test.'
const toast = 'The exam has been ended.'

const notstart = 'Not started'
const submitted = 'Submitted'
const subbyinvigilator = 'Submitted by invigilator'
const notsub = 'Not submitted'
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
    // system = env[ct].System.display
})

// Scenario: close book- Attendance页面检查Live proctoring button和end exam功能
Given(/^创建闭卷考试$/, () => {
    examInfo.name = 'ATExam_AttClose'
    examInfo.startOffset = { level: "min", off: 2 }
    examInfo.duration = 3
    examInfo.isOpenB = false
    examInfo.filePath = 'attendanceExam.json'
    examInfo.detectionSetting = {
        "noPersonDetected": true,
        "multiplePersons": true,
        "noFaceCaptured": true,
        "mismatchingPerson": true,
        "notFacingTheScreen": true,
        "suspiciousDevices": true,
        "humanVoiceDetected": true
    }
    examInfo.studentCount = [stu1.name, stu2.name, stu3.name, stu4.name, stu5.name, stu6.name]
    examInfo.stuGroupName = 'ATGroup_'
    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/attendanceExam.json').then(($data) => {
        CloseExam_Name = $data.examInfo.name
        exam_Id = $data.examInfo.examId
        cy.log('CloseExam_Name:' + CloseExam_Name)
    })
})
Then(/^Admin考试过程中进入Attendance页面$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageStudentTakeExam.waitStartByTime(examInfo.startTime)
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(CloseExam_Name)
    Cypress.PageExamAttendance.enterAttendance_examing()
})
Then(/^I verify live proctoring button is light$/, () => {
    Cypress.PageExamAttendance.verifyLiveBtn()
})
Then(/^I enter live proctoring page and verify default is 9 gird$/, () => {
    Cypress.PageExamAttendance.enterLiveProctoring(exam_Id)
    Cypress.PageExamLiveProctoring.verifyDefault9Display()
});
And(/^I verify candidate1 show not started$/, () => {
    Cypress.PageExamLiveProctoring.verifyExaminationStatus(0, liveproctoring_status[0])
});
When(/^Candidate1 enter the exam$/, () => {
    cy.StuEnterExamApi(0, 'attendanceExam.json')
});
Then(/^I verify candidate1 show network disconnected$/, () => {
    Cypress.PageExamLiveProctoring.verifyExaminationStatus(0, liveproctoring_status[1])
});
When(/^I switch 25 gird$/, () => {
    Cypress.PageExamLiveProctoring.switch25Display()
});
Then(/^I verify 1 row have 5 gird$/, () => {
    Cypress.PageExamLiveProctoring.verify1Row5Gird()
});
And(/^I can click refresh button$/, () => {
    Cypress.PageExamLiveProctoring.refreshLiveVideo()
});
Then(/^I verify the first gird have candidate1 name$/, () => {
    Cypress.PageExamLiveProctoring.verifyVideoName(0, stu1.name)
});
When(/^I chat with candidate1$/, () => {
    Cypress.PageExamLiveProctoring.clickStudentChatIcon(0)
    Cypress.PageExamLiveProctoring.sentMessage(chatContent)
});
Then(/^I verify sent successed$/, () => {
    Cypress.PageExamLiveProctoring.verifySentSuccessed(chatContent)
    Cypress.PageExamLiveProctoring.closeChat()
});
When(/^I verify full screen tooltip$/, () => {
    Cypress.PageExamLiveProctoring.fullOrsmall_tooltip('full')
});
Then(/^I click full screen$/, () => {
    Cypress.PageExamLiveProctoring.switchFullOrSmallScreen('full')
});
When(/^I search candidate1 in live proctoring$/, () => {
    Cypress.PageExamLiveProctoring.serchPeopleByName(stu1.name)
});
Then(/^I maximize candidate1 grid$/, () => {
    Cypress.PageExamLiveProctoring.clickMaximize()
});
When(/^I end exam$/, () => {
    Cypress.PageExamLiveProctoring.clickEndExam()
});
Then(/^I verify end exam confirm tip$/, () => {
    Cypress.PageExamLiveProctoring.verifyEndTip(stu1.name)
});
And(/^I write some comments$/, () => {
    Cypress.PageExamLiveProctoring.inputEndComment(endComment)
    Cypress.PageExamLiveProctoring.clickEndOK()
});
And(/^I can see end exam toast$/, () => {
    Cypress.auiCommon.verifyToast(toast)
});
And(/^I verify candidate1 show compulsory submit$/, () => {
    Cypress.PageExamLiveProctoring.verifyExaminationStatus(0, liveproctoring_status[2])
});
When(/^I verify small screen tooltip$/, () => {
    Cypress.PageExamLiveProctoring.fullOrsmall_tooltip('small')
});
Then(/^I click small screen$/, () => {
    Cypress.PageExamLiveProctoring.switchFullOrSmallScreen('small')
});
Then(/^I verify Live proctoring settings content is right$/, () => {
    Cypress.PageExamLiveProctoring.verifyLiveProctorSettings()
});
Then(/^I click breadcrumb can see candidate1 status is present、submitted by Invigilator in attandance page$/, () => {
    Cypress.auiCommon.clickBreadcrumb(1)
    let student001_Info = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'Candidate name',
                value: stu1.name
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
                display: 'Team name',
                value: `${examInfo.stuGroupName}0`
            },
            {
                index: 7,
                display: 'Attendance status',
                value: present
            },
            {
                index: 8,
                display: 'Examination status',
                value: subbyinvigilator
            },
            {
                index: 11,
                display: 'Face verification',
                value: ''
            },
            {
                index: 12,
                display: 'Suspicious activities',
                value: 0
            },
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyDateInTable(1, 10, new Date())
    Cypress.auiCommon.verifyDateInTable(1, 11, new Date())
});
When(/^Exam end time arrived$/, () => {
    Cypress.PageStudentTakeExam.waitStartByTime(examInfo.endTime)
    cy.wait(4000)
});
Then(/^I choose stu1 stu2 and open for resubmission$/, () => {
    Cypress.PageExamAttendance.chooseStudent(0)
    Cypress.PageExamAttendance.chooseStudent(1)
    Cypress.PageExamAttendance.clickAttendanceHeaderBtn(2)
    Cypress.PageExamAttendance.editEndTime_Fixed('edit', addComment, 23, 30)
});
Then(/^I am in live proctoring page$/, () => {
    Cypress.PageExamAttendance.enterLiveProctoring(exam_Id)
});
And(/^I verify stu1 stu2 status$/, () => {
    Cypress.PageExamLiveProctoring.verifyExaminationStatus(0, liveproctoring_status[1])
    Cypress.PageExamLiveProctoring.verifyExaminationStatus(1, liveproctoring_status[0])
});
And(/^I open chat and verify chat history$/, () => {
    Cypress.PageExamLiveProctoring.clickStudentChatIcon(0)
    Cypress.PageExamLiveProctoring.verifySentSuccessed(chatContent)
});
Then(/^I chat with stu1$/, () => {
    Cypress.PageExamLiveProctoring.sentMessage(chatContent)
});
And(/^I verify message number$/, () => {
    Cypress.PageExamLiveProctoring.verifyChatMessageNumber(2)
});

// Scenario: Filter class in live proctoring
Given(/^I filter class1$/, () => {
    Cypress.PageExamLiveProctoring.filter('Class name', 'Class 1')
});
And(/^I verify have 4 students$/, () => {
    Cypress.PageExamLiveProctoring.verifyCandidateNumber(4)
});

// Scenario: Filter group in live proctoring
Given(/^I open group filter$/, () => {
    Cypress.PageExamLiveProctoring.openGroupFilter()
});
And(/^I verify all group name and order$/, () => {
    Cypress.PageExamLiveProctoring.verifyGroupNameAndOrder_InFilterButton(4, examInfo.stuGroupName)
});
Then(/^I filter group1$/, () => {
    Cypress.auiCommon.filterCheckbox(2)
});
Then(/^I verify video name after group filter$/, () => {
    // Cypress.PageExamLiveProctoring.verifyVideoName(0, `${stu2.name} (${examInfo.stuGroupName}1)`)
    Cypress.PageExamLiveProctoring.verifyVideoName(0, `${stu2.name}`)
});
And(/^I verify right list count and student name$/, () => {
    Cypress.PageExamLiveProctoring.verifyRightList(1, stu2.name)
});
When(/^I search stu1 in live proctoring$/, () => {
    Cypress.PageExamLiveProctoring.serchPeopleByName(stu1.name)
});
Then(/^I verify no candidates show$/, () => {
    Cypress.PageExamLiveProctoring.verifyNoStudentShow()
});
Then(/^I clear search$/, () => {
    Cypress.PageAdminMarkingsettingsPage.clearSearch()
});

// Scenario: 有reading time的close exam：在reading time开始后进入live proctoring界面
Given(/^创建有reading time的close exam$/, () => {
    examInfo.name = 'ATExam_AttClose_2'
    examInfo.startOffset = { level: "min", off: 10 }
    examInfo.duration = 1
    examInfo.isOpenB = false
    examInfo.filePath = 'attendanceExam.json'
    examInfo.previewTime = 5
    examInfo.keyCode = 30

    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)

    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/attendanceExam.json').then(($data) => {
        CloseExam_Name = $data.examInfo.name
        exam_Id = $data.examInfo.examId
    })
})
Then(/^Admin enter attendance page$/, () => {
    Cypress.PageAdminCommon.visitExam(5000)
    Cypress.PageExamHome.searchExam(CloseExam_Name)
    Cypress.PageExamAttendance.enterAttendance_examing()
})
When(/^没有到达reading time时间,message显示正确$/, () => {
    Cypress.PageExamAttendance.verifyNotStart()
})
Then(/^I can see generate key code button is highlight$/, () => {

})
Then(/^到达reading time的时间，显示button，进入到live proctoring界面$/, () => {
    Cypress.PageStudentTakeExam.waitStartByTime(examInfo.readTime)
    Cypress.PageExamAttendance.verifyLiveBtn()
    Cypress.PageExamAttendance.enterLiveProctoring(exam_Id)
})