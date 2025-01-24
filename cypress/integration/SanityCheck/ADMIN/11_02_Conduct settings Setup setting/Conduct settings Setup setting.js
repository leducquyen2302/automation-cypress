/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let student001 = ''

let originalKeyMinutes = 5
let originalRestrictMinutes = 30
let newMinutes = 1
let verifyModifySetting_ExamName = 'ATConductSettingExam ' + new Date().toLocaleString()
let verifyModifySetting_PaperName = 'ATConductSettingPaper ' + new Date().toLocaleString()

// create exam
let ExamName = '', ExamStartTime = ''
let paperName = 'ATPaper_Unpublish' + new Date().toLocaleString()
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
    name: "AT_Entrance restriction",
    courseCode: "AT001",
    courseId: '',
    startOffset: { level: "min", off: 1 },
    startTime: "",
    duration: 10,
    endTime: "",
    isSave2LocalFile: true,
    // studentCount: 3,
    isAppend: false,
    filePath: 'enteringRestrictionExam.json',
    enteringRestriction: newMinutes,
    isOpenB: true,
    instruction: 'This is a verify Entrance restriction exam',
    sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 4 }]
}
let paperInfo = {
    name: paperName,
    sections: section_temp
}
let Question1 = {}

before(() => {
    cy.fixture("questionInfo").then(($ques) => {
        Question1 = $ques[0]
        section_temp[0].questions[0].question = Question1
    })
    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile(`cypress/fixtures/${examInfo.filePath}`).then(($data) => {
        ExamName = $data.examInfo.name
        ExamStartTime = $data.examInfo.startTime
    })
})

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    student001 = env[ct].Candidates[0]
})

// Scenario: Key settings for exams in Exam setup settings
Given(/^I enter the Exam setup settings page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminGlobalSettings.confirmCheckedUserId()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Conduct settings')
    Cypress.PageAdminGlobalSettings.switchSetting(1)
});
Then(/^I click enable key code button$/, () => {
    Cypress.ConductSettings.chooseWhetherAbled_keyCode(0)
});
When(/^I verify original minutes and input key code illegal minutes that is 1441$/, () => {
    Cypress.ConductSettings.inputMinutes(0, 1441, originalKeyMinutes)
});
Then(/^I verify the illegal tip$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter an integer between 1 and 1440.')
});
Then(/^I input new correct key code minutes$/, () => {
    Cypress.ConductSettings.inputMinutes(0, newMinutes)
});

// Scenario: Chat box in Exam setup settings
Given(/^I verify default is yes$/, () => {
    Cypress.ConductSettings.verifyCheckChatBoxBtn(0)
});
Then(/^I click chat box No button$/, () => {
    Cypress.ConductSettings.checkChatBoxBtn(1)
});

// Scenario: Entrance restriction for exams in Exam setup settings
Given(/^I click set a restriction on the entrance button$/, () => {
    Cypress.ConductSettings.chooseWhetherRestriction_entranceRestriction(0)
});
Then(/^I verify original minutes and input new restriction 1 minute$/, () => {
    Cypress.ConductSettings.inputMinutes(1, newMinutes, originalRestrictMinutes)
});

// Scenario: Exam reminder for candidates in Exam setup settings
Given(/^I input the minute is not integer$/, () => {
    Cypress.ConductSettings.inputMinutes(2, 1.1)
});
Then(/^I verify the validation message$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, 'Enter an integer greater than zero to proceed.')
});
Then(/^I input 1 minute$/, () => {
    Cypress.ConductSettings.inputMinutes(2, 1)
});

// Scenario: Online proctoring in Exam setup settings
Given(/^I check Enable ID verification, uncheck Enable environment check, uncheck Enable screen proctoring, uncheck no person in close book tab$/, () => {
    Cypress.ConductSettings.checkEnableIDVerification_onlineProctoring(0)
    Cypress.ConductSettings.switchButton_environmentCheck()
    Cypress.ConductSettings.switchButton_onlineProctoring()
    Cypress.ConductSettings.checkNoPerson_onlineProctoring()
});
Then(/^I switch open book tab$/, () => {
    Cypress.auiCommon.clickTab(3)
});
Then(/^I check Enable environment check in open book tab$/, () => {
    Cypress.auiCommon.clickSwitchBtn_InModal(5)
});

// Scenario: Degree settings of suspicious activities in Exam setup settings
Given(/^I verify value must greater than 1$/, () => {
    Cypress.ConductSettings.inputLowSuspicion(0)
    Cypress.auiCommon.verifyValiMessage(0, 'The value must be an integer between 2 and 1000.')
});
Given(/^I verify value must be an integer between 2 and 1000$/, () => {
    Cypress.ConductSettings.inputLowSuspicion(9.9)
    Cypress.auiCommon.verifyValiMessage(0, 'The value must be an integer between 2 and 1000.')
});
Then(/^I input 100 value$/, () => {
    Cypress.ConductSettings.inputLowSuspicion(100)
});

// Scenario: Question visibility for candidates in Exam setup settings
Given(/^I verify Question visibility for candidates is Yes by default$/, () => {
    Cypress.ConductSettings.verifyByDefaultYes_QuestionVisibility()
});
Then(/^I check No button in Question visibility for candidates$/, () => {
    Cypress.ConductSettings.checkBtn_QuestionVisibility(1)
});

// Scenario: Proofing settings in Exam setup settings
Given(/^I verify disabled spell check by default$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(6, 'false')
});
Then(/^I enable spell check$/, () => {
    Cypress.auiCommon.clickSwitchBtn_InModal(8)
});

// Scenario: Submission visibility for candidates in Exam setup settings
Given(/^I verify check No Submission visibility for candidates by default$/, () => {
    Cypress.ConductSettings.verifySubmissionVisibility(1, 'true')
});
Then(/^I check Submission visibility for candidates Yes button$/, () => {
    Cypress.ConductSettings.checkSubmissionVisibilityBtn(0)
});
And(/^I click save$/, () => {
    Cypress.ConductSettings.clickSave_examSetupSettings()
    cy.wait(5000)
    Cypress.ConductSettings.clickSave_examSetupSettings()
    cy.wait(5000)
});

// Scenario:I verify key code, restricition, chat box in exam step1 after modified
Given(/^I enter the exam step1$/, () => {
    Cypress.auiCommon.visitUrl('/#/exam/schedule/create?pageType=0')
});
Then(/^I verify exam restricition is right by default$/, () => {
    Cypress.PageExamCreate.examVerifyRestricitionMinutes(newMinutes)
});
Then(/^I verify key code button is enabled by default$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(0, 'true')
});
And(/^I verify key code minutes is right by default$/, () => {
    Cypress.PageExamCreate.examVerifyKeyCodeMinutes(newMinutes)
});
And(/^I verify chat box is disabled$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(1, 'false')
});

// Scenario: I verify close book Online proctoring in exam step1 after modified
Then(/^I verify Enable ID verification is checked,Enable environment is unchecked, Enable screen proctoring is unchecked, no person is unchecked$/, () => {
    Cypress.PageExamCreate.verifyIdVerification('true')
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(3, 'false')
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(4, 'false')
    Cypress.PageExamCreate.verifySuspiciousActivitiesChecked(1, 'false')
});

// Scenario: I verify open book Online proctoring in exam step1 after modified
Given(/^I switch to open book$/, () => {
    Cypress.PageExamCreate.chooseExamType(1)
});
Then(/^I verify Enable environment check is checked$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(2, 'true')
});

// Scenario: I verify Question visibility for candidates, Spell check, Allow candidates to view their submissions in exam step3 after modified
Given(/^I input exam info, change to close book and goto step3$/, () => {
    Cypress.PageExamCreate.inputExamName(verifyModifySetting_ExamName)
    Cypress.PageExamCreate.inputCourse('AT004')
    Cypress.PageExamCreate.examEndTime(0, 23, 0)
    Cypress.PageExamCreate.examStartTime(0, 22, 0)
    Cypress.PageExamCreate.chooseExamType(0)
    Cypress.PageExamCreate.saveNextForm()
    Cypress.PageExamCreate.saveNextForm()
    cy.CreatePaperApi('AT004', verifyModifySetting_PaperName, section_temp)
    Cypress.PageSampleExamCreate.addPaperFromBank(verifyModifySetting_PaperName)
});
Then(/^I verify Question visibility for candidates is No$/, () => {
    Cypress.PageExamCreate.verifyQuestionSettingsValue('No')
});
And(/^I verify Allow candidates to view their submissions is Yes$/, () => {
    Cypress.PageExamCreate.verifyAllowCandidateViewSubValue('Yes')
});
And(/^I verify Spell check is Enabled$/, () => {
    Cypress.PageExamCreate.verifySpellCheckValue('Enabled')
});

// Scenario: I verify Suspicious activities after modified
Given(/^I publish the exam and enter the attendance page$/, () => {
    cy.reload()
    Cypress.PageExamCreate.examPublish()
    Cypress.PageExamHome.searchExam(verifyModifySetting_ExamName)
    Cypress.PageExamAttendance.enterAttendance_examing()
});
Then(/^I verify Suspicious activities display right$/, () => {
    Cypress.PageExamAttendance.verifySuspiciousActivities_Middle(100)
});

// Scenario: Set all settings are default
Given(/^I enter the exam setup settings page$/, () => {
    Cypress.auiCommon.visitUrl('/#/admin/ConductSettings')
    Cypress.PageAdminGlobalSettings.switchSetting(1)
});
Then(/^I click yes in chat box$/, () => {
    Cypress.ConductSettings.checkChatBoxBtn(0)
});
Then(/^I set key code and entrance restriction are disabled and set 1 minutes together$/, () => {
    Cypress.ConductSettings.inputMinutes(0, originalKeyMinutes)
    Cypress.ConductSettings.chooseWhetherAbled_keyCode(1)
    Cypress.ConductSettings.inputMinutes(1, originalRestrictMinutes)
    Cypress.ConductSettings.chooseWhetherRestriction_entranceRestriction(1)
});
And(/^I uncheck Enable ID verification, check Enable environment check, check Enable screen proctoring, check no person in close book$/, () => {
    Cypress.ConductSettings.checkEnableIDVerification_onlineProctoring(0)
    Cypress.ConductSettings.switchButton_environmentCheck()
    Cypress.ConductSettings.switchButton_onlineProctoring(1)
    Cypress.ConductSettings.checkNoPerson_onlineProctoring()
});
Then(/^I disable environment check in open book tab$/, () => {
    Cypress.auiCommon.clickSwitchBtn_InModal(5)
});
And(/^I set degree settings of suspicious activities as defualt$/, () => {
    Cypress.ConductSettings.resetDefaultSuspiciousActivities()
});
And(/^I check Yes in Question visibility for candidates$/, () => {
    Cypress.ConductSettings.checkBtn_QuestionVisibility(0)
    Cypress.ConductSettings.clickSave_examSetupSettings()
});
And(/^I enable spell check$/, () => {
    Cypress.auiCommon.clickSwitchBtn_InModal(6)
});
And(/^I check No in Submission visibility$/, () => {
    Cypress.ConductSettings.checkSubmissionVisibilityBtn(1)
});
Then(/^I verify restriction is disabled in exam step1$/, () => {
    cy.visit('/#/exam/schedule/create?pageType=0')
    Cypress.PageExamCreate.examVerifyNoRestricition()
});
And(/^I verify key code is disabled in exam step1$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(0, 'false')
});

// Scenario: I verify entrance restriction in student exam page
Given(/^I logout and login as student001$/, () => {
    cy.logoutApi()
    cy.LoginByLocal(student001.userid)
});
When(/^I enter exam and click start exam button$/, () => {
    Cypress.PageStudentTakeExam.waitStartByTime(ExamStartTime)
    cy.wait(60000)
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(ExamName)
    Cypress.PageStudentExam.enterExam(0)
    Cypress.PageStudentTakeExam.clickStartBtn(true)
});
Then(/^I verify the warning popup$/, () => {
    Cypress.auiCommon.verifyConfirmPopup(`You are not allowed to start the task since you attempted to enter later than the allowed time, which is ${newMinutes} minutes after task starts. If you have any questions, please contact the staff.`)
});
When(/^I click ok$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(0)
});
Then(/^I verify stay on this page$/, () => {
    cy.url().should('contain', 'examapp/Instruction?examId=')
});