/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const valiMessage = 'The retention period for the built-in storage data cannot exceed 30 days.'
const richText_saveToast = 'The text settings were saved.'
const dataRetention_saveToast = 'The data retention settings were saved.'
const userProfileSettings_saveToast = 'The user profile settings were saved.'

let stu1 = ''
let openBookExamId = '', closeBookExamId = '', closeBookStartTime = ''
let paperName = 'ATListExam_Paper' + new Date().toLocaleString()
let Question = {}
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
     name: "ATExam_UserID",
     courseId: '',
     courseCode: 'AT001',
     startOffset: { level: "min", off: 1 },
     startTime: "",
     duration: 10,
     endTime: "",
     isopenB: true,
     isSave2LocalFile: true,
     isAppend: true,
     filePath: 'examUserID.json',
     sections: [{ questNo: 1, name: "AT Section 1", description: "Choice and Essay", fullScore: 6.5 }]
}

let paperInfo = {
     name: paperName,
     sections: section_temp
}

before(() => {
     cy.fixture("questionInfo").then(($ques) => {
          Question = $ques[2]
          section_temp[0].questions[0].question = Question
     })
})
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu1 = env[ct].Candidates[0].userid
     cy.writeFile(`cypress/fixtures/${examInfo.filePath}`, [])
})

// Scenario: Enter global settings card
Given(/^I login as application admin and in admin page$/, () => {
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
     cy.readFile('cypress/fixtures/examUserID.json').then(($data) => {
          openBookExamId = $data[0].examInfo.examId
     })
     examInfo.isopenB = false
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
     cy.readFile('cypress/fixtures/examUserID.json').then(($data) => {
          closeBookExamId = $data[1].examInfo.examId
          closeBookStartTime = $data[1].examInfo.startTime
     })
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then(/^I verify Global Settings configuration position,instruction and enter$/, () => {
     Cypress.PageAdminCommon.clickCardbyName('Administration', 'Global settings')
});

// Scenario: Verify data retention
Given(/^I verify data retention tab bar,content$/, () => {
     Cypress.PageAdminGlobalSettings.verifyDataRention_Content()
});
And(/^I verify default days$/, () => {
     Cypress.PageAdminGlobalSettings.verifyDefaultDays()
});
When(/^I set 31 days$/, () => {
     Cypress.PageAdminGlobalSettings.setDays(31)
});
Then(/^I verify validation message$/, () => {
     Cypress.PageSampleExamCreate.verifyValidationMessage(valiMessage)
});
When(/^I set 1 days$/, () => {
     Cypress.PageAdminGlobalSettings.setDays(1)
});
Then(/^I save and verify save success toast$/, () => {
     Cypress.auiCommon.verifyToast(dataRetention_saveToast)
});
Then(/^I set 30 days$/, () => {
     Cypress.PageAdminGlobalSettings.setDays(30)
});

// Scenario: Verify user profile setting
When(/^I switch user profile setting$/, () => {
     Cypress.PageAdminGlobalSettings.switchSetting(1)
});
Then(/^I verify user profile setting content$/, () => {
     Cypress.PageAdminGlobalSettings.verifyUserProfileSetting_Content()
});
And(/^I verify default is checked$/, () => {
     Cypress.PageAdminGlobalSettings.verifyChecked(0, 'true')
     Cypress.PageAdminGlobalSettings.verifyChecked(1, 'true')
     Cypress.PageAdminGlobalSettings.verifyChecked(2, 'true')
});
When(/^I uncheck User ID, email, Mobile$/, () => {
     Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(0)
     Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(1)
     Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(2)
});
Then(/^I save and verify toast$/, () => {
     Cypress.PageAdminGlobalSettings.clickSave()
     Cypress.auiCommon.verifyToast(userProfileSettings_saveToast)
});
When(/^I enter account management page$/, () => {
     Cypress.PageAdminCommon.clickAdminCard_ByLeftNavigationBar('Account management')
});
Then(/^I verify User ID and Mobile not exist$/, () => {
     var info = {
          rowIndex: 1,
          columns: [
               {
                    index: 3,
                    display: 'User ID',
                    value: '',
               },
               {
                    index: 4,
                    display: 'Email address',
                    value: '',
               },
               {
                    index: 5,
                    display: 'Mobile phone',
                    value: '',
               }
          ]
     }
     Cypress.auiCommon.verifyTable(info)
});

// Scenario: Verify hide user id in Role management with user id column
Given(/^I enter Role management$/, () => {
     Cypress.PageAdminCommon.clickAdminCard_ByLeftNavigationBar('Role management')
});
Then(/^I click the user profile picture on user id column$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});
Then(/^I verify user ID is hide$/, () => {
     Cypress.PageAdminGlobalSettings.verifyHideUserId_InHeadPhoto()
});

// Scenario: Verify hide user id in Course configuration with table column
Given(/^I enter Course configuration$/, () => {
     Cypress.PageAdminCommon.clickAdminCard_ByLeftNavigationBar('Course configuration')
     Cypress.PageAdminCourse.search('AT001')
});
Then(/^I click the user profile picture on table column$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify hide user id in Course configuration with edit candidate
Given(/^I enter the edit candidate page$/, () => {
     Cypress.PageAdminCourse.clickCourseTableCnadiCount(0)
});
Then(/^I click the user profile picture on edit candidate page$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0, 'panel')
});

// Scenario: Verify hide user id in Course configuration with edit class
Given(/^I enter the edit class page$/, () => {
     Cypress.PageAdminApplication.clickEdit(0)
});
Then(/^I click the user profile picture on edit class page$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0, 'dialog')
});

// Scenario: Verify hide user id in Course configuration with address book
Given(/^I open the address book$/, () => {
     Cypress.PageAdminCommon.openAddressBook()
});
Then(/^I verify user ID is null in address book$/, () => {
     let addressBookInfo = {
          rowIndex: 2,
          columns: [
               {
                    index: 3,
                    display: 'User ID',
                    value: ''
               }
          ]
     }
     Cypress.PageAdminCommon.verifyAddressBookTable(addressBookInfo)
});

// Scenario: Verify hide user id in Organisation configuration with organization admin
Given(/^I enter Organisation configuration$/, () => {
     Cypress.PageAdminCourse.clickTabBar(1)
});
Then(/^I click the user profile picture on organization admin$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify hide user id in Sample report
Given(/^I enter Sample report$/, () => {
     Cypress.PageAdminCommon.clickLeftNaviByKey('Reports')
     Cypress.PageReport.enterStaicReport(true, 2, 10000)
});
Then(/^I click the user profile picture on table column$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify hide user id in Exam table view
Given(/^I enter Exam table view$/, () => {
     Cypress.PageAdminCommon.visitExam(8000)
     Cypress.PageExamHome.switchExamView('Table')
});
Then(/^I click the user profile picture on table column$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify hide user id in Step2 with table
Given(/^I enter open book exam step2$/, () => {
     Cypress.auiCommon.visitUrl(`/#/exam/schedule/assigninvigilators?examId=${openBookExamId}&pageType=2`)
});
Then(/^I click the user profile picture on table column$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify hide user id in Step3 with exam basic information
Given(/^I enter Step3 with exam information$/, () => {
     Cypress.PageExamCreate.clickNext()
     Cypress.PageExamCreate.expandBasicInfo()
});
Then(/^I click the user profile picture on exam basic information$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify hide user id in Preview exam with exam information
Given(/^I enter Preview exam with exam information$/, () => {
     Cypress.auiCommon.visitUrl(`/#/examapp/Instruction?examId=${openBookExamId}&isPreview=true`)
     Cypress.PageStudentTakeExam.clickExamInfo()
});
Then(/^I verify user ID is null on exam information$/, () => {
     let examInfo = {
          userId: ''
     }
     Cypress.PageStudentTakeExam.verifyExamInfo(examInfo)
});

// Scenario: Verify hide user id in Attendance page with candidate detail
Given(/^I enter Attendance page with candidate detail$/, () => {
     Cypress.auiCommon.visitUrl(`/#/exam/schedule/attendance?examId=${openBookExamId}`)
     Cypress.PageExamAttendance.enterCandiDetail(0)
});
Then(/^I verify user ID is null on candidate detail$/, () => {
     let info = {
          userId: '',
     }
     Cypress.PageExamAttendance.verifyCandidateDetail(info)
});

// Scenario: Verify hide user id in Attendance page with exam information
Given(/^I click the user profile picture on exam basic information$/, () => {
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Verify candidate hide user id in home page with user name
Given(/^I logout and login as student001$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(stu1)
});
Then(/^I click the user profile picture on right user name$/, () => {
     cy.wait(2000)
     Cypress.PageAdminGlobalSettings.clickLoginUserPhoto()
});
Then(/^I verify user ID is hide on right user name$/, () => {
     cy.wait(500)
     Cypress.PageAdminGlobalSettings.verifyUserId_InRightUserName('')
});

// Scenario: Verify candidate hide user id in start exam page with exam information
Given(/^I enter start exam page with exam information$/, () => {
     Cypress.PageStudentTakeSampleExam.enterStartExamPage(openBookExamId)
     Cypress.PageStudentTakeExam.clickExamInfo()
});

// Scenario: Verify hide user id in live proctoring page with candidate list
Given(/^I logout and login as system$/, () => {
     cy.logoutApi()
     cy.LoginExamAsSystem()
});
Then(/^I enter live proctoring page page$/, () => {
     Cypress.PageStudentTakeExam.waitStartByTime(closeBookStartTime)
     Cypress.auiCommon.visitUrl(`/#/exam/schedule/livevideo?examId=${closeBookExamId}`)
});
And(/^I click the user profile picture on candidate list$/, () => {
     cy.wait(5000)
     Cypress.PageAdminGlobalSettings.clickUserPhoto(0)
});

// Scenario: Check user ID and Mobile
Then(/^I enter the global setting page$/, () => {
     Cypress.auiCommon.visitUrl(`/#/admin/GlobalSettings`)
});
Then(/^I check User ID and Mobile$/, () => {
     Cypress.PageAdminGlobalSettings.switchSetting(1)
     Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(0)
     Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(1)
     Cypress.PageAdminGlobalSettings.checkUserIdOrMobile(2)
     Cypress.PageAdminGlobalSettings.clickSave()
});
