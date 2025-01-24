/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let answers = '0123456789,'
let essayAnswers = ''
for (let index = 0; index < 200; index++) {
     essayAnswers = essayAnswers + answers
}
const FIBAnswer1 = 'Auto test FIB answer1'
const FIBAnswer2 = 'Auto test FIB answer2'
const submittedMessage = 'You have submitted the answers and ended your exam!'
const fileUploadName = 'test pdf.pdf'
let username = '', totalMarks = '', sectionMarks1 = '', sectionName1 = '',
     sectionDescription1 = '', sectionQuestions1 = '', sectionMarks2 = '', sectionName2 = '',
     sectionDescription2 = '', sectionQuestions2 = '', examTime = 0, examName = '', examId = '', instru = '',
     fullMarks1 = '', totalMarks1 = '', fileUpload_question = {}, categorization_question = {}
const dialog = [
     {
          title: 'Submit exam',
          content: "You haven't answered all the questions. Are you sure you want to submit the paper and end the exam?",
     },
     {
          title: 'Submit exam',
          content: "You have answered all the questions and you are about to submit. Are you sure you want to submit the paper and end the exam?",
     },
]

before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     username = env[ct].Candidates[0].userid

     cy.fixture("examInfo.json").then(($basic) => {
          let fullMarks1 = $basic[0].examInfo.sections[0].fullMarks
          let totalMarks1 = $basic[0].examInfo.sections[0].totalMarks
          sectionMarks1 = `Section marks: ${totalMarks1}`
          let totalMarks2 = $basic[0].examInfo.sections[1].totalMarks
          sectionMarks2 = `Section marks: ${totalMarks2}`
          let totalMarks = $basic[0].examInfo.sections[0].totalMarks + $basic[0].examInfo.sections[1].totalMarks
          totalMarks = `Total marks: ${totalMarks}`

          let questNo1 = $basic[0].examInfo.sections[0].questNo
          sectionQuestions1 = `Number of questions: ${questNo1}`
          let questNo2 = $basic[0].examInfo.sections[1].questNo
          sectionQuestions2 = `Number of questions: ${questNo2}`

          sectionName1 = $basic[0].examInfo.sections[0].name
          sectionDescription1 = $basic[0].examInfo.sections[0].description
          sectionName2 = $basic[0].examInfo.sections[1].name
          sectionDescription2 = $basic[0].examInfo.sections[1].description

          examTime = $basic[0].examInfo.startTime
          examName = $basic[0].examInfo.name
          examId = $basic[0].examInfo.examId
          instru = $basic[0].examInfo.instruction
          cy.log(`Before Test: ${username},${examName}`)
     })
})
before(() => {
     cy.fixture("questionInfo").then(($ques) => {
          let allQuest = $ques
          fileUpload_question = allQuest[10]
          categorization_question = allQuest[9]
     })
})

//Scenario: Candidate在home页面，点击enter exam button，进入到instruction页面
Given(/^Candidate已经登录，在Exam homepage页面，搜索到需要考试的exam$/, () => {
     cy.LoginByLocal(username)
     Cypress.PageAdminCommon.visitExam(5000)
     cy.wait(500)
     Cypress.PageExamHome.searchExam(examName)
     cy.wait(3000)
});

// Scenario: Candidate进入考试页面
When(/^Candidate点击Enter exam button$/, () => {
     Cypress.PageStudentTakeSampleExam.enterStartExamPage(examId)
});
Then(/^显示Instruction页面$/, () => {
     Cypress.auiCommon.verifyUrl('include', 'Instruction')
});

//Scenario: Candidate可以点击Start now button，进入答题页面，准备答题 
Given(/^Candidate已经进入到instruction页面$/, () => {
     Cypress.PageStudentTakeExam.waitStartByTime(examTime)
});
Then(/^Candidate看到instruction正确$/, () => {
     Cypress.PageStudentTakeExam.verifyExamInstruction(instru)
});
When(/^Candidate点击Acknowledge，词条内容显示正确，并点击ok$/, () => {
     Cypress.PageStudentTakeSampleExam.acknowledgeSampleExam(true)
});
Then(/^Candidate通过面包屑回到home页$/, () => {
     Cypress.PageConductExam.clickBreadCrumb()
});
When(/^Candidate再次enter exam$/, () => {
     Cypress.PageAdminCommon.clickLeftNaviAndJump('Exam')
     Cypress.PageExamHome.searchExam(examName)
     Cypress.PageStudentTakeSampleExam.enterStartExamPage(examId)
});
Then(/^Candidate仍然需要点击Acknowledge$/, () => {
     Cypress.PageStudentTakeSampleExam.acknowledgeSampleExam(true)
});
Then(/^Candidate点击start now button$/, () => {
     Cypress.PageStudentTakeExam.startNow()
});

// Scenario: Candidate verify auto save
Given(/^I answer the first question and wait 15 seconds$/, () => {
     Cypress.PageConductExam.answerMCQuestion(0)
     cy.wait(16000)
});
Then(/^I verify have auto save answer$/, () => {
     Cypress.PageConductExam.verifyAutoSaveAnswer()
     cy.wait(2000)
});
When(/^I reload the page$/, () => {
     cy.reload()
});
And(/^I verify the answer still remain$/, () => {
     Cypress.PageConductExam.verifyChoiceSelected(0)
});

// Scenario: Candidate verify section
Then(/^I verify total marks$/, () => {
     let sectionInfo = {
          name: 'Marks',
          marks: totalMarks
     }
     Cypress.PageConductExam.verifySectionContent(0, sectionInfo)
});
Then(/^I verify section1 name, description, question number, section marks$/, () => {
     let sectionInfo = {
          name: sectionName1,
          des: sectionDescription1,
          quesNum: sectionQuestions1,
          marks: sectionMarks1
     }
     Cypress.PageConductExam.verifySectionContent(1, sectionInfo)
});
Then(/^I verify section2 name, description, question number, section marks$/, () => {
     let sectionInfo = {
          name: sectionName2,
          des: sectionDescription2,
          quesNum: sectionQuestions2,
          marks: sectionMarks2
     }
     Cypress.PageConductExam.verifySectionContent(2, sectionInfo)
});

// Scenario: Candidate verify additional mark
Then(/^Candidate verify additional mark$/, () => {
     Cypress.PageConductExam.verifyAdditionalMarks(totalMarks1 - fullMarks1)
});
Then(/^Candidate verify additional mark comment$/, () => {
     Cypress.auiCommon.verifyPopup('This is additional mark')
     Cypress.auiCommon.clickCloseBtn()
});

// Scenario: Candidate can switch remaining time to clock
When(/^Candidate click the hide eye icon to hide remaining time$/, () => {
     Cypress.PageConductExam.hideRemainingTime()
});
Then(/^Candidate verify can see the clock$/, () => {
     Cypress.PageConductExam.verifyHideRemainingTimeHaveClock()
});
When(/^Candidate click the eye icon to show remaining time$/, () => {
     Cypress.PageConductExam.showRemainingTime()
});
Then(/^Candidate verify can see the time number$/, () => {
     Cypress.PageConductExam.verifyShowRemainingTimeHaveTimeNumber()
});

//Scenario: Candidate可以作答Question1，单选题，标记followup
Given(/^Candidate已经进入答题页面，当前题为Question1单选题$/, () => {
     Cypress.PageStudentTakeExam.selectQuestion(0)
});
When(/^Candidate选择答案，标记followup，并点击Next question button$/, () => {
     Cypress.PageConductExam.answerMCQuestion(1)
     Cypress.PageConductExam.clickFollowUp(true)
     Cypress.PageStudentTakeExam.nextQuestion()
});
Then(/^question1的题号显示为答过题的样式且显示小红旗图标，并跳转到Question2答题页面$/, () => {
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(0)
     Cypress.PageConductExam.verifyFollowUp(0)
     Cypress.PageConductExam.verifyQuestionTitle(0, 'Question 2')
});

// Scenario: Candidate verify switch question structure button
Given(/^I verify switch question structure button tooltip is Vertical and click$/, () => {
     Cypress.auiCommon.clickButton_HaveLabel('Vertical (Top and bottom)')
});
Then(/^Candidate return to the previous question$/, () => {
     Cypress.PageStudentTakeExam.previousQuestion()
});
Then(/^I verify question1 answer is just created and display red flag$/, () => {
     Cypress.auiCommon.verifyInputWhetherChecked(1, 'true')
     Cypress.PageConductExam.verifyFollowUp(0)
});
And(/^I verify switch question structure button tooltip is Horizontal$/, () => {
     Cypress.PageConductExam.verifySwitchQueStructureBtnTooltip('Horizontal (Side by side)')
});
Then(/^I click next question$/, () => {
     Cypress.PageStudentTakeExam.nextQuestion()
});

//Scenario: Candidate可以作答Question2，简答题，标记followup
Given(/^Candidate已经进入答题页面，当前题为Question2简答题$/, () => {
     Cypress.PageStudentTakeExam.selectQuestion(1)
});
When(/^Candidate输入答案，标记followup，并点击Next question button$/, () => {
     Cypress.PageStudentTakeExam.inputEassy(essayAnswers)
     cy.wait(500)
     Cypress.PageConductExam.clickFollowUp(true)
     Cypress.PageStudentTakeExam.nextQuestion()
});
Then(/^question2的题号显示为答过题的样式且显示小红旗图标，并跳转到Question3a答题页面$/, () => {
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(1)
     Cypress.PageConductExam.verifyFollowUp(1)
     Cypress.PageConductExam.verifyQuestionTitle(0, 'Question 3')
     Cypress.PageConductExam.verifyQuestionTitle(2, 'Question 3a')
});

//Scenario: Candidate可以作答Question3，Sub qeustion，标记followup
Given(/^Candidate已经进入答题页面，当前题为Question3a，多选题$/, () => { });
When(/^Candidate作答Question3a，多选题，标记followup，并切换到Question3b$/, () => {
     Cypress.PageStudentTakeExam.selectCheckBoxByIndex(1)
     Cypress.PageStudentTakeExam.selectCheckBoxByIndex(2)
     Cypress.PageConductExam.clickFollowUp(true)
     Cypress.PageStudentTakeExam.nextQuestion()
});
Then(/^question3a的题号显示为答过题的样式并显示小红旗图标,question3的题号不显示答过题的样式且显示小红旗图标，然后页面跳转到Question3b，FIB$/, () => {
     Cypress.PageConductExam.verifySubQuestionIndexAnsweredQuestion(0)
     Cypress.PageConductExam.verifyFollowUp(0)
     Cypress.PageConductExam.verifyQuestionIndexNoAnsweredQuestion(2)
     Cypress.PageConductExam.verifyFollowUp(2)
     Cypress.PageConductExam.verifyQuestionTitle(2, 'Question 3b')
});
When(/^Candidate作答Question3b，FIB填空题，并点击Next question button$/, () => {
     Cypress.PageStudentTakeExam.inputBlank(0, FIBAnswer1)
     Cypress.PageStudentTakeExam.inputBlank(1, FIBAnswer2)
     Cypress.PageConductExam.clickquestionTitle(3)
});
Then(/^question3b和question3的题号都显示为答过题的样式，并跳转到Question4答题页面$/, () => {
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(5)
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(2)
     Cypress.PageStudentTakeExam.nextQuestion()
     Cypress.PageConductExam.verifyQuestionTitle(0, 'Question 4')
});

//Scenario: Candidate没有答完全部的question，end exam时，应有对应的提示信息
Given(/^Candidate没有作答完全部的question$/, () => { });
When(/^Candidate点击end exam button$/, () => {
     Cypress.PageConductExam.endExam()
});
Then(/^显示confirm 页面，并提示没有答完全部的question$/, () => {
     Cypress.auiCommon.verifyConfirmDialogContent(dialog[0].content)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(0)
});

//Scenario: Candidate可以作答Question4，填空题
Given(/^Candidate已经进入答题页面，当前题为Question4填空题$/, () => { });
When(/^Candidate填入第一个空的答案$/, () => {
     Cypress.PageStudentTakeExam.inputBlank(0, FIBAnswer1)
});
Then(/^question4的题号不显示为答过题的样式$/, () => {
     Cypress.PageConductExam.verifyQuestionIndexNoAnsweredQuestion(3)
});
When(/^Candidate输入第二个空的答案$/, () => {
     Cypress.PageStudentTakeExam.inputBlank(1, FIBAnswer2)
     Cypress.PageConductExam.clickquestionTitle(1)
});
Then(/^question4的题号显示为答过题的样式$/, () => {
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(3)
});

//Scenario: 验证question3，Sub question的答案显示正确
Given(/^Candidate在Question4的答题页面$/, () => {
});
When(/^Candidate点击Previous question button$/, () => {
     Cypress.PageStudentTakeExam.previousQuestion()
     Cypress.PageStudentTakeExam.previousQuestion_tooltip()
});
Then(/^显示question3b的答题页面，且答案显示正确$/, () => {
     Cypress.PageConductExam.verifyQuestionTitle(2, 'Question 3b')
     Cypress.PageConductExam.verifyAnswerFIB(FIBAnswer1, 0)
     Cypress.PageConductExam.verifyAnswerFIB(FIBAnswer2, 1)
});
When(/^Candidate切换到Question3a的答题页面$/, () => {
     Cypress.PageStudentTakeExam.previousQuestion()
});
Then(/^显示question3a的答题页面，且答案显示正确$/, () => {
     Cypress.PageConductExam.verifyAnswerMRQuestion(1)
     Cypress.PageConductExam.verifyAnswerMRQuestion(2)
});

//Scenario: 验证question2，简答题答案显示正确，取消followup并清空答案，题号样式显示正确
Given(/^Candidate在Question3a的答题页面$/, () => { });
When(/^Candidate点击Previous question button$/, () => {
     Cypress.PageStudentTakeExam.previousQuestion()
});
Then(/^右侧显示Question2，且答案显示正确$/, () => {
     Cypress.PageConductExam.verifyQuestionTitle(0, 'Question 2')
     Cypress.PageConductExam.verifyAnswerEssay(essayAnswers)
});
When(/^去掉小红旗图标，并清空答案$/, () => {
     Cypress.PageConductExam.clickFollowUp(false)
     Cypress.PageConductExam.clearAnswerEssay()
     Cypress.PageConductExam.clickquestionTitle(0)
});
Then(/^question2题号不显示为答完题的样式也不显示小红旗$/, () => {
     Cypress.PageConductExam.verifyNoFollowUp(1)
     Cypress.PageConductExam.verifyQuestionIndexNoAnsweredQuestion(1)
});
When(/^Candidate再次输入答案$/, () => {
     Cypress.PageStudentTakeExam.inputEassy(essayAnswers)
});
Then(/^Question2题号再次显示答完题样式$/, () => {
     Cypress.PageConductExam.clickquestionTitle(1)
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(1)
});

//Scenario: 验证question1，单选题，答案显示正确
Given(/^Candidate在Question2的答题页面$/, () => { });
Then(/^右侧显示Question1，且答案显示正确$/, () => {
     Cypress.PageConductExam.verifyQuestionTitle(0, 'Question 1')
     Cypress.PageConductExam.verifyAnswerMCQuestion(1)
});

//Scenario: 验证question4，填空题答案显示正确
Given(/^Candidate在Question1的答题页面$/, () => { });
When(/^Candidate在左侧Section中切换到Question4$/, () => {
     Cypress.PageStudentTakeExam.selectQuestion(3)
});
Then(/^右侧显示Question4，且答案显示正确$/, () => {
     Cypress.PageConductExam.verifyQuestionTitle(0, 'Question 4')
     Cypress.PageConductExam.verifyAnswerFIB(FIBAnswer1, 0)
     Cypress.PageConductExam.verifyAnswerFIB(FIBAnswer2, 1)
});

//Scenario: Verify File upload without answer box
Given(/^Candidate在左侧Section中切换到Question5$/, () => {
     Cypress.PageStudentTakeExam.selectQuestion(4)
});
And(/^I verify the file upload question content$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionContent(1, fileUpload_question.content)
});
When(/^I upload file$/, () => {
     Cypress.PageBankPaper.uploadFile(fileUploadName)
});
Then(/^I verify the file name, type, size are right$/, () => {
     Cypress.PageStudentTakeExam.verifyUploadContent(fileUploadName, '70.9 KB')
});
And(/^I can see the sub question1 display already answered$/, () => {
     Cypress.PageConductExam.verifySubQuestionIndexAnsweredQuestion(0)
});

//Scenario: Verify File upload with answer box
Given(/^Candidate switch the sub question2$/, () => {
     Cypress.PageStudentTakeExam.nextQuestion()
     Cypress.PageStudentTakeExam.nextQuestion_tooltip()
});
Then(/^I input the answer$/, () => {
     Cypress.PageStudentTakeExam.inputEssayText('This is a answered!', true)
});
Then(/^I can see the sub question2 display already answered$/, () => {
     Cypress.PageConductExam.verifySubQuestionIndexAnsweredQuestion(1)
});
Then(/^I can delete the file$/, () => {
     Cypress.auiCommon.deleteBtn()
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

//Scenario: Verify Categorization
Given(/^I switch the sub question3$/, () => {
     Cypress.PageStudentTakeExam.nextQuestion()
});
And(/^I verify the categorization title are right$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionContent(1, categorization_question.content)
});
When(/^I answer the first categorization question$/, () => {
     Cypress.PageStudentTakeExam.answerCategorization(0, 0)
});
Then(/^I verify the sub question3 display has no answered yet$/, () => {
     Cypress.PageConductExam.verifySubQuestionIndexNoAnsweredQuestion(2)
});
And(/^I can choose the first categorization option to left$/, () => {
     Cypress.PageStudentTakeExam.cancelAnsweredCategorization(0, 0)
});
When(/^I answer all categorization question option$/, () => {
     Cypress.PageStudentTakeExam.answerCategorization(0, 0)
     Cypress.PageStudentTakeExam.answerCategorization(0, 1)
     Cypress.PageStudentTakeExam.answerCategorization(0, 1)
     Cypress.PageStudentTakeExam.answerCategorization(0, 1)
     Cypress.PageStudentTakeExam.answerCategorization(0, 1)
});
Then(/^I verify the sub question3 display already answered$/, () => {
     Cypress.PageConductExam.verifySubQuestionIndexAnsweredQuestion(2)
});
Then(/^I choose the first categorization option to the second categorization$/, () => {
     Cypress.PageStudentTakeExam.switchCategorizationAnsweredOption(0, 0, 1)
});
When(/^I fold the second categorization$/, () => {
     Cypress.auiCommon.expanderAction(1)
});
Then(/^I cannot see the second option$/, () => {
     Cypress.PageStudentTakeExam.verifyCategoryFold(1)
});

//Scenario: Verify full screen
Given(/^Candidate点击full screen$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFullScreenBtn()
});
Then(/^Candidate can see exam time$/, () => {
     Cypress.PageConductExam.verifyExamTime_FullScreen()
});
When(/^Candidate cilck previous question button$/, () => {
     Cypress.PageStudentTakeSampleExam.clickPreviousQuetions_FullScreen()
});
Then(/^Candidate input the answer$/, () => {
     Cypress.PageStudentTakeExam.inputEssayText('This is a answered!_Full Screen', false)
});
When(/^Candidate collapse the question title$/, () => {
     Cypress.PageConductExam.collapseQuestion()
});
Then(/^Candidate click next question button$/, () => {
     Cypress.PageStudentTakeSampleExam.clickNextQuetions_FullScreen()
});
And(/^Candidate verify this question is the sub question3$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionContent(1, categorization_question.content)
});
Then(/^Candidate click the sub second question number to the sub second question$/, () => {
     Cypress.PageConductExam.switchSubQuestion(1)
});
And(/^Candidate verify the sub second question title is right$/, () => {
     Cypress.PageStudentTakeExam.verifyQuestionContent(1, fileUpload_question.content)
});
Then(/^Candidate exit full screen$/, () => {
     Cypress.PageStudentTakeSampleExam.exitFullScreenBtn()
});

//Scenario: Verify preview questions
Given(/^Candidate click preview questions button$/, () => {
     Cypress.PageStudentTakeSampleExam.previewQuestions()
});
Then(/^Candidate verify the sub question2 answer display right$/, () => {
     Cypress.PageStudentTakeExam.verifyPreviewEssayQuestion(2, 'This is a answered!_Full Screen')
});

//Scenario: Candidate答完全部的question，end exam时，应有对应的提示信息
When(/^Candidate点击end exam button$/, () => {
     Cypress.PageConductExam.endExam()
});
Then(/^显示confirm 页面，提示所有的question都被答完$/, () => {
     Cypress.auiCommon.verifyConfirmDialogContent(dialog[1].content)
});

//Scenario: Candidate可以提交答案
Given(/^Candidate已经点击了end exam button，显示confirm页面$/, () => { });
When(/^Candidate点击End exam button$/, () => {
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^显示Successfully submitted页面$/, () => {
     Cypress.PageConductExam.verifySubmittedMessage(submittedMessage)
});