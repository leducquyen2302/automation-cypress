/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let candiList = [], invigilator1 = '', invigilator2 = ''

let td = new Date()
let yy = td.getFullYear(), mm = td.getMonth(), dd = td.getDate(), hh = td.getHours(), min = td.getMinutes()
let currentTime = new Date().toLocaleString()
const message = {
    startTimeError: 'The answering start time must be later than the current time.',
    endtimeError: 'The answering end time must be later than the answering start time.',
    samedayError: 'The answering start time and the answering end time must be on the same day.',
    invigilatorMsg: 'The following invigilators have been assigned with exams that conflict with this exam.',
    noCandidateMsg: 'Enrol at least one candidate.',
}

const item = ['No person', 'Multiple persons', 'No face', 'Mismatching person', 'Not facing the screen', 'Suspicious device', 'Human voice']
const instruction = [
    'Detects whether a person is present in front of the screen.',
    'Detects whether there are multiple persons in front of the screen.',
    "Detects whether the candidate's face is clear and in full view. Please note that wearing a mask and certain harsh lights or lighting angles can affect the detection accuracy.",
    'Matches the photo taken for face verification or candidate photo in the system with the face captured during candidate proctoring. It is recommended to disable this detection for exams that require candidates to wear masks.',
    'Detects whether the candidate is facing the screen, and not looking around.',
    'Detects whether there are electronic devices in front of the screen.',
    'Detects human voices.'
]
let examObj = {
    examName: 'ATnameEndtime' + currentTime,
    paperName: 'ATQuickExam' + currentTime,
    courseCode: 'AT001',
    instruc: 'Long Text Instruction to Candidates \r ' + currentTime,
    invigilator: ''
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

    candiList = env[ct].Candidates
    invigilator1 = env[ct].Invigilator1.display
    invigilator2 = env[ct].Invigilator2.display
})

// Scenario: Create exam from Home page
Given(/^I login/, () => {
    cy.LoginExamAsSystem()
});
Then(/^I Click Create exam button from Home page$/, () => {
    Cypress.PageExamHome.clickCreateExam()
    Cypress.auiCommon.verifyUrl('include', '/create?')
});

// Scenario: In step1 先修改end time再修改start time,可以save and next
Given(/^I input exam info$/, () => {
    Cypress.PageExamCreate.inputExamNameWithCode(examObj.examName)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
});
When(/^I set end time first$/, () => {
    Cypress.PageExamCreate.examEndTime(0, 23, 0)
});
Then(/^I set start time$/, () => {
    Cypress.PageExamCreate.examStartTime(0, 22, 0)
});
Then(/^I click save and next$/, () => {
    Cypress.PageExamCreate.saveNextForm()
});

// Scenario: In step1 Exam Start Time Can Not Earlier than now
Given(/^I click back goto step1$/, () => {
    Cypress.PageExamCreate.backForm()
});
When(/^I set the start time before current time$/, () => {
    //selectTime(true, 1, 1)
    Cypress.PageExamCreate.examStartTime(0, 1, 0)//today, 1:00 AM
});
Then(/^I will see the validation message$/, () => {
    Cypress.auiCommon.verifyValiMessage(3, message.startTimeError)
});

// Scenario: In step1 Exam End Time Can Not Earlier than now
When(/^I set the end time before current time$/, () => {
    Cypress.PageExamCreate.examEndTime(0, 1, 0)
});
Then(/^I will see the validation message too$/, () => {
    Cypress.auiCommon.verifyValiMessage(4, message.endtimeError)
});

// Scenario: In step1 Exam End Time Can Not Earlier than Start Time
When(/^I set the end time before start time$/, () => {
    Cypress.PageExamCreate.examStartTime(0, 21, 0)
    Cypress.PageExamCreate.examEndTime(0, 20, 0)
});

// Scenario: In step1 Exam Start Time和Exam End Time跨天
When(/^I set the end time after one day$/, () => {
    Cypress.PageExamCreate.examStartTime(0, 21, 0)
    Cypress.PageExamCreate.examEndTime(1, 21, 0)
});
Then(/^I will see the validation message right$/, () => {
    Cypress.auiCommon.verifyValiMessage(4, message.samedayError)
});

// Scenario: In step1 I input correct time save and next
When(/^I set correct time$/, () => {
    Cypress.PageExamCreate.examStartTime(0, 21, 0)
    Cypress.PageExamCreate.examEndTime(0, 23, 0)
});
Then(/^The answer duration is right$/, () => {
    Cypress.PageExamCreate.verifyAnswerDuration('120 mins')
});

// Scenario: In step1 verify allow authorised url
When(/^I set allow access to specified urls$/, () => {
    Cypress.PageExamCreate.allowSpecifiedUrl()
});
Then(/^I verify display no url items prompt$/, () => {
    Cypress.PageExamCreate.verifyAuthorisedUrl_item('No authorised URL has been added. Please add authorised URLs.')
});
Then(/^I verify add at least one authorised url to proceed validation message$/, () => {
    Cypress.PageExamCreate.verifyAuthorisedUrl_validationMessage('Add at least one authorised URL to proceed.')
});
Then(/^I add authorised url$/, () => {
    Cypress.PageExamCreate.addAuthorisedURL('baidu', 'https://www.baidu.com/')
});

// Scenario: In step1 verify allow authorised windows or mac app is required field
When(/^I set allow access to specified applications$/, () => {
    Cypress.PageSampleExamCreate.clickAllowSpecifiedApp()
});
Then(/^I verify display no app items prompt$/, () => {
    Cypress.PageExamCreate.verifyAuthorisedApp_item('No authorised application has been added. Please add authorised applications.')
});
Then(/^I verify add at least one authorised application to proceed validation message$/, () => {
    Cypress.PageExamCreate.verifyAuthorisedApp_validationMessage('Add at least one authorised application to proceed.')
});
When(/^I add windows app and save$/, () => {
    Cypress.PageSampleExamCreate.addAuthorisedApplication()
    Cypress.PageExamCreate.saveNextForm()
});
Then(/^I verify add at least one authorised application for Mac to proceed validation message$/, () => {
    Cypress.PageExamCreate.verifyAuthorisedApp_validationMessage('Add at least one authorised application for macOS to proceed.')
});
When(/^I delete windows app$/, () => {
    Cypress.PageAdminApplication.clickDelApp()
});
Then(/^I add mac app and save$/, () => {
    Cypress.PageAdminCourse.clickTabBar(1)
    Cypress.PageSampleExamCreate.addAuthorisedApplication()
});
When(/^I verify add at least one authorised application for Windows to proceed validation message$/, () => {
    Cypress.PageExamCreate.verifyAuthorisedApp_validationMessage('Add at least one authorised application for Windows to proceed.')
});
Then(/^I add windows app$/, () => {
    Cypress.PageAdminCourse.clickTabBar(0)
    Cypress.PageSampleExamCreate.addAuthorisedApplication()
});

// Scenario: In step1 verify Facial recognition in Online proctoring
Given(/^I verify Facial recognition description$/, () => {
    Cypress.PageExamCreate.verifyOnlineProctoring_TitleDescription(0, 'Facial recognition', 'Note: Uses biometrics to map facial features from the captured faces to match their photos in the system before the exam.')
});
And(/^I verify default enable Face verification$/, () => {
    Cypress.PageExamCreate.verifyOnlineProctoring_switchBtn(0, 'true')
});
And(/^I verify default uncheck ID verification$/, () => {
    Cypress.PageExamCreate.verifyIdVerification('false')
});

// Scenario: In step1 verify Video proctoring in Online proctoring
Given(/^I verify Video proctoring description$/, () => {
    Cypress.PageExamCreate.verifyOnlineProctoring_TitleDescription(2, 'Video proctoring', 'Note: With video proctoring enabled, both candidate activities and candidate screens can be monitored for a comprehensive invigilator oversight during the exam through video recording.')
});
Then(/^I verify default all enabled in video proctoring$/, () => {
    Cypress.PageExamCreate.verifyOnlineProctoring_switchBtn(1, 'true')
    Cypress.PageExamCreate.verifyOnlineProctoring_switchBtn(2, 'true')
    Cypress.PageExamCreate.verifyAIIfSelected(0, 'true')
});
And(/^I verify all suspicious activities instruction$/, () => {
    Cypress.PageExamCreate.verifyActivityInfo(item, instruction)
});
When(/^I uncheck select all$/, () => {
    Cypress.PageExamCreate.chooseIfSelected(0)
});
Then(/^I verify “No person” is unchecked$/, () => {
    Cypress.PageExamCreate.verifyAIIfSelected(1, 'false')
});
Then(/^I only select “No person”$/, () => {
    Cypress.PageExamCreate.chooseIfSelected(1)
});
When(/^I close enable candidate proctoring$/, () => {
    Cypress.PageExamCreate.switchOnlineProctoring('Enable candidate proctoring')
});
Then(/^I verify hide all item$/, () => {
    Cypress.PageExamCreate.verifyHideItem()
});
When(/^I open enable candidate proctoring$/, () => {
    Cypress.PageExamCreate.switchOnlineProctoring('Enable candidate proctoring')
});
Then(/^I verify “No person” is checked$/, () => {
    Cypress.PageExamCreate.verifyAIIfSelected(1, 'true')
});
And(/^I verify “No face” is unchecked$/, () => {
    Cypress.PageExamCreate.verifyAIIfSelected(3, 'false')
});
When(/^I click save and close$/, () => {
    Cypress.PageExamCreate.saveCloseForm()
});
Then(/^I edit just exam$/, () => {
    const part_ExamName = 'NAMEEndtime' + currentTime
    Cypress.PageExamHome.searchExam(part_ExamName)
    Cypress.PageExamHome.editExam(0)
    Cypress.PageExamCreate.leftNavigationTo(0)
});
When(/^I click save and next$/, () => {
    Cypress.PageExamCreate.saveNextForm()
});
Then(/^I go back to step1$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(0)
});
When(/^I choose open book$/, () => {
    Cypress.PageExamCreate.chooseExamType(1)
});
Then(/^I verify the enable video proctoring are disabled and unchecked$/, () => {
    Cypress.PageExamCreate.verifyOnlineProctoring_switchBtn(0, 'false', 'true')
    Cypress.PageExamCreate.verifyOnlineProctoring_switchBtn(1, 'false', 'true')
});

// Scenario: In step2 verify basic info
When(/^I open basic info$/, () => {
    Cypress.PageExamCreate.expandBasicInfo()
});
Then(/^I verify step2 basic info$/, () => {
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        readingTime: {
            exist: false
        },
        // answeringTime: [time.secondEditStep1Time_readingStart, time.secondEditStep1Time_answeringStart],
        classification: 'Fixed time range',
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
});

// Scenario: In step2 verify proctoring setting is opened by default
And(/^I verify proctoring setting is opened by default$/, () => {
    Cypress.PageExamCreate.verifyReopensubmission()
});

// Scenario: In step3 verify basic info
Then(/^I verify step3 basic info$/, () => {
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        courseName: examObj.courseCode,
        readingTime: {
            exist: false
        },
        // answeringTime: [time.secondEditStep1Time_readingStart, time.secondEditStep1Time_answeringStart],
        enrolledCandidate: '6',
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
    Cypress.auiCommon.verifyCurrentUser(invigilator1)
    Cypress.PageExamCreate.verifyMoreInvigNum(1)
    Cypress.PageExamCreate.clickMoreInvig()
    Cypress.auiCommon.verifyPopupAvatar(0, invigilator1)
    Cypress.auiCommon.verifyPopupAvatar(1, invigilator2)
    // Cypress.PageExamCreate.verifyMoreInvigName(0, invigilator1)
    // Cypress.PageExamCreate.verifyMoreInvigName(1, invigilator2)
});

// Scenario: In step3 add paper and publish exam
When(/^I create paper and add$/, () => {
    cy.CreatePaperApi(examObj.courseCode, examObj.paperName, section_temp)
    Cypress.PageSampleExamCreate.addPaperFromBank(examObj.paperName)
});
Then(/^I publish exam$/, () => {
    Cypress.PageExamCreate.examPublish()
});

// Scenario: Delete the published status exam
Given(/^I search the exam$/, () => {
    Cypress.PageExamHome.searchExam(examObj.examName)
});
Then(/^I delete the exam$/, () => {
    Cypress.PageExamHome.clickExamCardBtn(1, true)
});

// Scenario: Verify the paper also be deleted
Given(/^I enter the paper page$/, () => {
    Cypress.auiCommon.visitURL('/#/authoring/PaperBank')
});
When(/^I search the paper$/, () => {
    Cypress.PageReport.search(examObj.paperName)
});
Then(/^I see no items$/, () => {
    Cypress.PageSampleReport.verifyMessage('No items to show in this view.')
});

// Scenario: Verify not exist in exam statistics report
Given(/^I enter the exam report page$/, () => {
    Cypress.auiCommon.visitURL('/#/report/examReport')
});
When(/^I search the paper$/, () => {
    Cypress.PageReport.search(examObj.paperName)
});
Then(/^I see no items$/, () => {
    Cypress.PageSampleReport.verifyMessage('No items to show in this view.')
});