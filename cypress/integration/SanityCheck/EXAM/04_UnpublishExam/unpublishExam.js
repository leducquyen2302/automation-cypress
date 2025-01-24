/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// user
let invigilator1 = '', stu1 = '', stu2 = '', stu3 = ''
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu1 = env[ct].Candidates[0]
     stu2 = env[ct].Candidates[1]
     stu3 = env[ct].Candidates[2]
     invigilator1 = env[ct].Invigilator1
     cy.writeFile(`cypress/fixtures/${examInfo.filePath}`, [])
})
const confirm = [
     'When the exam is unpublished, candidates will:',
     'no longer view this exam. To allow candidates to take this exam, you must republish it again.',
     'Invigilator will',
     'no longer view the exam and their tasks are cancelled. '
]
const examStatus = 'Waiting for publishing'
const unpublishInfo = 'Your task has already been unpublished, please return to the home page.'
const unpubExamToast = ['The exam ', 'AT001 - UI-semester - ', ' - UI-school - UI-discipline ', 'was unpublished.']
// create exam
let ExamName = '', ExamId = ''
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
     name: "",
     courseCode: "AT001",
     courseId: '',
     startOffset: { level: "min", off: 15 },
     startTime: "",
     duration: 5,
     endTime: "",
     isSave2LocalFile: true,
     isAppend: true,
     filePath: 'unpublishExam.json',
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
})
// Scenario: Prepare exam
Given(/^01 I create open reading exam$/, () => {
     examInfo.name = "AT_Unpublish01"
     examInfo.isOpenB = true
     examInfo.previewTime = 5
     examInfo.studentCount = [stu1.name, stu2.name, stu3.name]
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})
Given(/^02 I create close no reading exam$/, () => {
     examInfo.name = "AT_Unpublish02"
     examInfo.isOpenB = false
     examInfo.previewTime = 0
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})
Given(/^03 I create close no reading exam$/, () => {
     examInfo.name = "AT_Unpublish03"
     examInfo.isOpenB = false
     examInfo.previewTime = 0
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})
Given(/^04 I create open reading exam$/, () => {
     examInfo.name = "AT_Unpublish04"
     examInfo.isOpenB = true
     examInfo.previewTime = 5
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})
Given(/^05 I create open no reading exam$/, () => {
     examInfo.name = "AT_Unpublish05"
     examInfo.isOpenB = true
     examInfo.previewTime = 0
     Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
     cy.CreateExamByAPI(examInfo, paperInfo)
})

// Scenario: Staff unpublish reading exam
Given(/^I login as system and I am in Exam page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(5000)
})
Then(/^I search exam01$/, () => {
     cy.readFile('cypress/fixtures/unpublishExam.json').then(($data) => {
          ExamName = $data[0].examInfo.name
          Cypress.PageExamHome.searchExam(ExamName)
     })
})
And(/^I click unpublish exam by exam card$/, () => {
     Cypress.PageExamHome.unpublishExam()
})
And(/^I verify confirm info$/, () => {
     Cypress.PageExamHome.verifyConfirmUnpub(0, confirm[0], 0)
     Cypress.PageExamHome.verifyConfirmUnpub(1, confirm[1])
     Cypress.PageExamHome.verifyConfirmUnpub(2, confirm[2], 1)
     Cypress.PageExamHome.verifyConfirmUnpub(3, confirm[3])
})
When(/^I unpublish$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
})
And(/^I verify card is waiting for publishing$/, () => {
     Cypress.PageExamHome.verifyCardStatus(examStatus)
})

// Scenario: Staff unpublish no reading exam
Given(/^I search exam02$/, () => {
     cy.readFile('cypress/fixtures/unpublishExam.json').then(($data) => {
          ExamName = $data[1].examInfo.name
          Cypress.PageExamHome.searchExam(ExamName)
     })
})
Then(/^I enter exam and goto step4$/, () => {
     Cypress.PageExamHome.enterExamByCardTitle()
     Cypress.PageExamCreate.leftNavigationTo(2)
})
And(/^I click unpublish exam by view exam$/, () => {
     cy.wait(2000)
     Cypress.PageExamCreate.unpublishExam()
})
And(/^I verify confirm info and unpublish$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
})
When(/^I search exam02$/, () => {
})
Then(/^I enter exam modify exam time and enrolled student005$/, () => {
     Cypress.PageExamHome.enterExamByCardTitle()
     Cypress.PageExamCreate.leftNavigationTo(0)
     Cypress.PageExamCreate.examStartTime(0, 21, 0)
     Cypress.PageExamCreate.saveNextForm()
     Cypress.PageExamCreate.addCandidate(2)
     Cypress.PageExamCreate.saveNextForm()
})
And(/^I goto step3 and publish exam$/, () => {
     Cypress.PageExamCreate.examPublish()
})
Then(/^I verify card info is right in examhome page$/, () => {
     let examInfo = {
          title: ExamName,
          titleSta: 'Before exam',
          candidates: 4,
          sta: {
               step: 4,
               descrip: 'Exam published'
          }
     }
     Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});
Then(/^I logout$/, () => {
     cy.logoutApi()
});

// Scenario: Invigilator page when system unpublish reading exam
Given(/^I login as invigilator1$/, () => {
     cy.LoginByLocal(invigilator1.userid)
});
When(/^System unpublish the exam03$/, () => {
     cy.readFile('cypress/fixtures/unpublishExam.json').then(($data) => {
          ExamId = $data[2].examInfo.examId
          ExamName = $data[2].examInfo.name
          cy.log(ExamId)
          cy.UnpublishByApi(ExamId)
     })
})
Then(/^I verify tip$/, () => {
     Cypress.auiCommon.verifyToast(0, unpubExamToast[0])
     Cypress.auiCommon.verifyToast(1, unpubExamToast[1] + ExamName + unpubExamToast[2])
     Cypress.auiCommon.verifyToast(2, unpubExamToast[3])
})

// Scenario: Student enter reading exam instruction page when unpublish reading exam
Given(/^I login as student$/, () => {
     cy.LoginByLocal(stu1.userid)
})
When(/^I enter exam04 instruction page$/, () => {
     cy.readFile('cypress/fixtures/unpublishExam.json').then(($data) => {
          ExamId = $data[3].examInfo.examId
          cy.log(ExamId)
          Cypress.PageStudentTakeSampleExam.enterStartExamPage(ExamId)
     })
})
When(/^Staff unpublish the exam$/, () => {
     cy.UnpublishByApi(ExamId)
})
Then(/^I verify unpublish info and click go back to home$/, () => {
     Cypress.PageStudentTakeExam.verifyUnpublishInfo(unpublishInfo)
     Cypress.PageStudentTakeExam.unpubToHome()
})
Then(/^I verify i am in Home page$/, () => {
     Cypress.auiCommon.verifyUrl('include', '/#/')
})

// Scenario: Student enter no reading exam instruction page when unpublish no reading exam
Given(/^I enter exam05 instruction page$/, () => {
     cy.readFile('cypress/fixtures/unpublishExam.json').then(($data) => {
          ExamId = $data[4].examInfo.examId
          cy.log(ExamId)
          Cypress.PageStudentTakeSampleExam.enterStartExamPage(ExamId)
     })
})