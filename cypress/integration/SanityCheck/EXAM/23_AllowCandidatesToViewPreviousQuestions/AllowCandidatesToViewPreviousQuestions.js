/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const examStatus = 'Waiting for publishing'
const unpublishInfo = 'Your task has already been unpublished, please return to the home page.'
const unpubExamToast = ['The exam ', 'AT001 - UI-semester - ', ' - UI-school - UI-discipline ', 'was unpublished.']
let date = new Date()
let currentHour = date.getHours(), currentMinute = date.getMinutes()
let ExamafterMinute = 2
let examObj = {
     name: 'ATQuestionSetExam ' + new Date().toLocaleString(),
     paperName: 'ATQuestionSetExam' + new Date().toLocaleString(),
     courseCode: 'AT001',
     examPaperName: 'ATApprovalExamPaper ' + new Date().toJSON(),
     examId : ''
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

// Scenario: Staff unpublish reading exam
Given(/^I create exam and goto step3$/, () => {
     cy.LoginExamAsSystem()
     Cypress.auiCommon.visitUrl('/#/exam/schedule/create?pageType=0')
     Cypress.PageExamCreate.inputExamName(examObj.name)
     Cypress.PageExamCreate.inputCourse(examObj.courseCode)
     Cypress.PageExamCreate.examStartTime(0, currentHour, currentMinute, ExamafterMinute)
     Cypress.PageExamCreate.chooseExamType(1)
     // Cypress.PageExamCreate.closeOnlineProctoring()
     Cypress.PageExamCreate.saveNextForm()
     Cypress.PageExamCreate.saveNextForm()
     cy.CreatePaperApi(examObj.courseCode, examObj.paperName, section_temp)
     Cypress.PageSampleExamCreate.addPaperFromBank(examObj.paperName)
     cy.url().then($body => {
          examObj.examId = $body.split('examId=')[1].split('&page')[0]
      })
})
Then(/^I click edit question settings button$/, () => {
     Cypress.auiCommon.clickEditBtn(0)
})
And(/^I set not allow candidates to view previous questions$/, () => {
     Cypress.PageExamCreate.setCandidateViewPreviousQuestions(1)
     Cypress.auiCommon.clickFooterBtnInPanel(1)
})
And(/^I publish exam$/, () => {
     Cypress.PageExamCreate.examPublish()
})

// Scenario: Verify cannot switch question by the question number
Given(/^Student enter the exam$/, () => {
     cy.logoutApi()
     cy.LoginByLocal(stu1.userid)
     Cypress.auiCommon.visitUrl(`/#/examapp/Instruction?examId=${examObj.examId}`)
     Cypress.PageStudentTakeExam.waitStartByElement()
     Cypress.PageStudentTakeExam.clickStartBtn()
})
Then(/^I verify question 2 cannot click$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionDisabled(1)
})
And(/^The tooltip display right$/, () => {
     Cypress.PageStudentTakeExam.verifyDisabledQuestionToolTip(1)
})

// Scenario: Verify confirm that click the next question when there is no answer
Given(/^I click the next question$/, () => {
     Cypress.PageStudentTakeExam.nextQuestion_PreviousDisabled(0)
})
Then(/^I verify the confirm is right when there is no answer$/, () => {
     Cypress.auiCommon.verifyConfirmPopup('You are about to navigate to the next question with this question not answered, and you cannot go back or view any previous questions as the exam is set with strict order navigation. Are you sure you want to proceed?')
})

// Scenario: Verify confirm that click the next question when there is answer
Given(/^I answer the question$/, () => {
     cy.wait(500)
     Cypress.PageStudentTakeExam.selectRadioByIndex(0)
})
Then(/^I verify the confirm is right when there is answer$/, () => {
     Cypress.auiCommon.verifyConfirmPopup('You are about to navigate to the next question, and you cannot go back or view any previous questions as the exam is set with strict order navigation. Are you sure you want to proceed?')
     Cypress.auiCommon.verifyConfirmPopup('Do not show again')
})

// Scenario: Verify next question still show confirm when not check do not show again checkbox
Given(/^I click the confirm button$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
})
Then(/^I verify in question 2$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionName('Question 2')
})
Then(/^I still see the confirm$/, () => {
     Cypress.auiCommon.verifyConfirmPopup('You are about to navigate to the next question, and you cannot go back or view any previous questions as the exam is set with strict order navigation. Are you sure you want to proceed?')
     Cypress.auiCommon.verifyConfirmPopup('Do not show again')
})

// Scenario: Verify check do not show again
Given(/^I check do not show again$/, () => {
     Cypress.auiCommon.clickCheckBox(0)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
})
Then(/^I verify in question 4$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionName('Question 4')
})

// Scenario: Verify recovery site
Given(/^I reload the page$/, () => {
     cy.reload()
})