/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let date = new Date()
// create exam
let examObj = {
    name: 'ATExam_PublishSettings' + date.toJSON(),
    courseCode: 'AT001',
    examPaperName: 'ATExam_PublishSettings' + date.toJSON(),
    examId: ''
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


// Scenario: AppAdmin verify Grades can check when enable grade mapping
Given(/^Login as AppAdmin enter Publish settings$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Marking settings')
    Cypress.PageAdminCourse.clickTabBar(3)
});
Then(/^I verify Grades can check$/, () => {
    Cypress.PageAdminMarkingsettingsPage.verifyGradeWetherAbled(true)
});

// Scenario: AppAdmin verify Grades can check when enable grade mapping
Given(/^I disable grade mapping$/, () => {
    Cypress.PageAdminMarkingsettingsPage.switchGradeMapping()
});
Then(/^I verify Grades cannot check is disabled$/, () => {
    Cypress.PageAdminMarkingsettingsPage.verifyGradeWetherAbled(false)
});
Then(/^I click save$/, () => {
    Cypress.PageAdminMarkingsettingsPage.savePublishSetting()
});

// Scenario: I verify step3 grade mapping and Grades
Given(/^I create exam and in step3 add paper$/, () => {
    Cypress.auiCommon.visitURL('/#/exam/schedule/create?pageType=0')
    Cypress.PageExamCreate.inputExamNameWithCode(examObj.name)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
    Cypress.PageExamCreate.examEndTime(0, 23, 0)
    Cypress.PageExamCreate.examStartTime(0, 22, 0)
    Cypress.PageExamCreate.saveNextForm()
    Cypress.PageExamCreate.saveNextForm()
    cy.CreatePaperApi(examObj.courseCode, examObj.examPaperName, section_temp)
    Cypress.PageSampleExamCreate.addPaperFromBank(examObj.examPaperName)
});
Then(/^I verify score publishing value are right$/, () => {
    Cypress.PageExamCreate.verifyStep3SettingsValue(5, 'No')
    Cypress.PageExamCreate.verifyStep3SettingsValue(6, 'Disabled')
    Cypress.PageExamCreate.verifyStep3SettingsValue(7, 'Scores')
    Cypress.PageExamCreate.verifyStep3SettingsValue(8, 'Yes')
    Cypress.PageExamCreate.verifyStep3SettingsValue(9, 'Yes')
    Cypress.PageExamCreate.verifyStep3SettingsValue(10, 'Yes')
});

// Scenario: I verify step3 Grades and grade mapping have related in edit publish settings
Given(/^I cilck edit publish settings$/, () => {
    Cypress.auiCommon.clickEditBtn(1)
});
When(/^I open the grade mapping$/, () => {
    Cypress.PageAdminMarkingsettingsPage.switchGradeMapping()
});
Then(/^I set grade mapping template score$/, () => {
    // cy.wait(5000)
    // Cypress.auiCommon.input(0, 0)
    Cypress.auiCommon.input(1, 10)
    // cy.wait(5000)
});
And(/^I check Grades$/, () => {
    Cypress.auiCommon.clickCheckBox(2)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify score publishing value are edited right$/, () => {
    Cypress.PageExamCreate.verifyStep3SettingsValue(5, 'No')
    Cypress.PageExamCreate.verifyStep3SettingsValue(6, 'Enabled')
    Cypress.PageExamCreate.verifyStep3SettingsValue(7, 'Scores; Grades')
    Cypress.PageExamCreate.verifyStep3SettingsValue(8, 'Yes')
    Cypress.PageExamCreate.verifyStep3SettingsValue(9, 'Yes')
    Cypress.PageExamCreate.verifyStep3SettingsValue(10, 'Yes')
});
Then(/^I publish exam$/, () => {
    cy.url().then($body => {
        examObj.examId = $body.split('examId=')[1]
    })
    Cypress.PageExamCreate.examPublish()
});

// Scenario: I verify Grades and grade mapping display right in grading progress edit publish settings
Given(/^I enter the grading progress page$/, () => {
    Cypress.auiCommon.visitUrl(`/#/exam/marking/markgrading?examId=${examObj.examId}`)
    cy.wait(5000)
});
Then(/^I click edit publish settings$/, () => {
    Cypress.PageExamGrade.clickHeaderBtn(5)
});
And(/^I verify display right follow step3$/, () => {
    Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal(0, 'true')
    // Cypress.auiCommon.verifyInputValue(1, 0)
    Cypress.auiCommon.verifyInputValue(2, 10)
    Cypress.PageExamGrade.verifyDisplaySettings_WhetherChecked(2, 'true')
});

// Scenario: I disable grade mapping and verify Grades is disabled
And(/^I verify Grades column not in table$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});

// Scenario: I publish result and verify have 0 candidate in popup
Given(/^I click publish to all$/, () => {
    Cypress.PageExamGrade.clickHeaderBtn(0)
    Cypress.auiCommon.clickPopupMenuitemBtn(1)
});
Then(/^I verify the publish popup display right and the toast is right$/, () => {
    Cypress.PageExamGrade.verifyPublishResultConfirm('You are going to publish the scores and response details for 0 candidates. Once published, candidates can view their scores and their response details for this exam. Please make sure the scores are correct and click Publish.')
    Cypress.auiCommon.clickFooterBtnInDialog(1)
    Cypress.auiCommon.verifyToast('The exam results were published.')
});

// Scenario: I unpublish all result and verify have 0 candidate in popup
Given(/^I click unpublish to all$/, () => {
    Cypress.PageExamGrade.clickHeaderBtn(2)
    Cypress.auiCommon.clickPopupMenuitemBtn(1)
});
Then(/^I verify the unpublish popup display right and the toast is right$/, () => {
    Cypress.PageExamGrade.verifyPublishResultConfirm('You are going to unpublish the scores for 0 candidates. After unpublished, candidates can no longer view their scores for this exam. ')
    Cypress.auiCommon.clickFooterBtnInDialog(1)
    Cypress.auiCommon.verifyToast('The exam results were unpublished.')
});

// Scenario: I set publish settings as default
Given(/^I enter Publish settings$/, () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Marking settings')
    Cypress.PageAdminCourse.clickTabBar(3)
});
Then(/^I enable grade mapping$/, () => {
    Cypress.PageAdminMarkingsettingsPage.switchGradeMapping()
});