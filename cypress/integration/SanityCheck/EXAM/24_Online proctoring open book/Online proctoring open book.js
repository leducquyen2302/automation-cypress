/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const chatMessage = 'This is a message!'
let date = new Date()
let currentHour = date.getHours(), currentMinute = date.getMinutes()
let ExamafterMinute = 2
let examObj = {
     name: 'ATQuestionSetExam ' + new Date().toLocaleString(),
     paperName: 'ATQuestionSetExam' + new Date().toLocaleString(),
     courseCode: 'AT001',
     examPaperName: 'ATApprovalExamPaper ' + new Date().toJSON(),
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
               },
               {
                    order: 2,
                    question: ""
               },
               {
                    order: 3,
                    question: ""
               },
               {
                    order: 4,
                    question: ""
               },
               {
                    order: 5,
                    question: ""
               },
          ]
     }
]
let Question1 = ''
before(() => {
     cy.fixture("questionInfo").then(($ques) => {
          Question1 = $ques[0]
          section_temp[0].questions[0].question = Question1
          section_temp[0].questions[1].question = Question1
          section_temp[0].questions[2].question = Question1
          section_temp[0].questions[3].question = Question1
          section_temp[0].questions[4].question = Question1
     })
})
// user
let stu1 = ''
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu1 = env[ct].Candidates[0]
})

// Scenario: Create online proctoring open book 
Given(/^Create online proctoring open book$/, () => {
     cy.LoginExamAsSystem()
     Cypress.auiCommon.visitUrl('/#/exam/schedule/create?pageType=0')
     Cypress.PageExamCreate.inputExamName(examObj.name)
     Cypress.PageExamCreate.inputCourse(examObj.courseCode)
     Cypress.PageExamCreate.examStartTime(0, currentHour, currentMinute, ExamafterMinute)
     Cypress.PageExamCreate.chooseExamType(1)
     Cypress.ConductSettings.switchButton_onlineProctoring()
     Cypress.auiCommon.clickSwitchBtn_InModal(2)
     Cypress.auiCommon.clickSwitchBtn_InModal(3)
     Cypress.PageExamCreate.saveNextForm()
     Cypress.PageExamCreate.saveNextForm()
     cy.CreatePaperApi(examObj.courseCode, examObj.paperName, section_temp)
     Cypress.PageSampleExamCreate.addPaperFromBank(examObj.paperName)
     cy.url().then($body => {
          examObj.examId = $body.split('examId=')[1].split('&page')[0]
     })
     Cypress.PageExamCreate.examPublish()
});

// Scenario: Student verify face verification enter exam
Given(/^Student enter the exam instruction page$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(stu1.userid)
     Cypress.auiCommon.visitUrl(`/#/examapp/Instruction?examId=${examObj.examId}`)
});
Then(/^Student click face verification five times$/, () => {
     cy.wait(4000)
     Cypress.PageStudentTakeSampleExam.clickFaceVericationBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.auiCommon.clickFooterBtnInDialog(0)
});
When(/^Student click the start now button$/, () => {
     Cypress.PageStudentTakeExam.waitStartByElement()
     Cypress.PageStudentTakeExam.clickStartBtn()
});
Then(/^Student verify warning and start$/, () => {
     const warningStartContent = 'Once you start it, the entire process will be monitored. Are you sure you want to proceed?'
     Cypress.auiCommon.verifyConfirmDialogContent(warningStartContent)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

// Scenario: Student verify question page
Given(/^Student confirm share information$/, () => {
     const warningStartContent = 'The exam has screen proctoring enabled. Please click OK and share your entire screen with Examena first.'
     // Cypress.auiCommon.verifyConfirmDialogContent(warningStartContent)
     Cypress.auiCommon.clickFooterBtnInDialog(0)
});

// Scenario: Student verify record video
Given(/^Student open the record video$/, () => {
     Cypress.PageStudentTakeExam.openRecordVideo()
});
When(/^Student click setting$/, () => {
     Cypress.PageStudentTakeExam.clickRecordVideoSettingBtn()
});
Then(/^Student select camera and verify display right$/, () => {
     Cypress.PageStudentTakeExam.selectCamera()
     Cypress.PageStudentTakeSampleExam.verifyDeviceDisplay('fake_device_0')
});
And(/^Student click ok in setting$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^Student click maxsize$/, () => {
     Cypress.PageStudentTakeExam.clickRecordVideoMaxsizeBtn()
});
Then(/^Student close the video$/, () => {
     Cypress.PageStudentTakeExam.clickRecordVideoCancelBtn()
});

// Scenario: Student chat to invigilators
Given(/^Student open chat box$/, () => {
     Cypress.PageStudentTakeExam.openChatBox()
});
Then(/^Student max the chat$/, () => {
     Cypress.PageStudentTakeExam.clickMaxsizeChatBoxBtn()
});
Then(/^Student send a message$/, () => {
     Cypress.PageStudentTakeExam.sendMessageToInvigilator(chatMessage)
});
And(/^Student can see the mesaage in chat history$/, () => {
     Cypress.PageStudentTakeExam.verifyChatMessageInChatHistory(chatMessage)
});

// Scenario: Student call the invigilators
Given(/^Student small the chat$/, () => {
     Cypress.PageStudentTakeExam.clickSmallChatBoxBtn()
});
Then(/^Student click the call button$/, () => {
     Cypress.PageStudentTakeExam.clickChatBoxCallBtn()
});
Then(/^Student can see call start in chat history$/, () => {
     Cypress.PageStudentTakeExam.verifyCallStatus(0, 'You started call at')
});
Then(/^Student can click join button$/, () => {
     Cypress.PageStudentTakeExam.clickJoinCallBtn()
});
Then(/^Student decline the call$/, () => {
     Cypress.PageStudentTakeExam.clickDeclineCallBtn()
});
And(/^Student can see call end in chat history$/, () => {
     Cypress.PageStudentTakeExam.verifyCallStatus(1, 'Call ended at')
});

// Scenario: System check chat
Given(/^System enter the live proctoring page$/, () => {
     cy.logoutApi()
     cy.LoginExamAsSystem()
     // Cypress.auiCommon.visitUrl(`/#/exam/schedule/livevideo?examId=41a47efe-98ce-4594-9133-ea0ff67b9233`)
     Cypress.auiCommon.visitUrl(`/#/exam/schedule/livevideo?examId=${examObj.examId}`)
});
Then(/^System can see chat message status is two$/, () => {
     Cypress.PageExamLiveProctoring.verifyChatMessageNum(2)
});
When(/^System open the chat$/, () => {
     Cypress.PageStudentTakeExam.openChatBox()
});
Then(/^System check the message is right and have call history$/, () => {
     Cypress.PageExamLiveProctoring.selectChatUser(1)
     Cypress.PageStudentTakeExam.verifyChatMessageInChatHistory(chatMessage)
     Cypress.PageStudentTakeExam.verifyCallStatus(0, 'started call at')
     Cypress.PageStudentTakeExam.verifyCallStatus(1, 'Call ended at')
});

// Scenario: System check student001 exam status
Given(/^System verify student001 status is Network disconnected$/, () => {
     Cypress.PageExamLiveProctoring.verifyExaminationStatus(0, 'Network disconnected')
});