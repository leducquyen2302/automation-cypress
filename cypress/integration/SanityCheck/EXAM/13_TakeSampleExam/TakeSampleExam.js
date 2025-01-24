/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let stu = '', userid = '', candidateID = '', candidateName = '', examName = '', examId = ''
let instruInfo = {
     'userId': userid,
     'candidateID': candidateID,
     'fullMark': '100',
     'instruction': '',
}
const title = 'This is an essay question'
const answer = 'This'
const pinyin = ['ā', 'shui3 luo4 shi2 chu1 hai5 5', 'shuǐ luò shí chū hai5 5']
before(() => {
     cy.fixture('sampleOpenExamInfo').then(($data) => {
          examName = $data.examName
          examId = $data.examId
          instruInfo.instruction = $data.examInstruction
     })
})
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu = env[ct].Candidates[0]
     userid = stu.userid
     candidateName = stu.name
})

//  Scenario: Verify sample exam page
Given(/^student登录$/, () => {
     cy.LoginByLocal(stu.userid)
})
Then(/^气泡内容显示正确$/, () => {
     cy.wait(2000)
     Cypress.PageStudentTakeSampleExam.verifySampleExamPopup()
})
And(/^验证click here to try button$/, () => {
     Cypress.PageStudentTakeSampleExam.verifySampleExamTip()
})
And(/^进入到sample exam page$/, () => {
     Cypress.PageStudentTakeSampleExam.enterSampleExamsPage()
})

// Scenario: Verify sample exam basic info
Given(/^I enter one sample exam instruction page$/, () => {
     Cypress.PageStudentTakeSampleExam.enterStartExamPage(examId)
});
Then(/^验证左上角exam name、exam information所有内容正确$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyInstructionInfo(true, instruInfo.userId, instruInfo.candidateID, examName, instruInfo.fullMark, instruInfo.instruction)
})

// Scenario: Verify acknowledge and face verification
Given(/^I verify acknowledge$/, () => {
     Cypress.PageStudentTakeSampleExam.acknowledgeSampleExam(true)
});
When(/^I click face verification$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFaceVericationBtn()
});
Then(/^I can see display fake device$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyDeviceDisplay('fake_device_0')
});
And(/^I can see user name and email$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyUserInfoInFaceVerication(candidateName, userid)
});
When(/^I click verify$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
});
Then(/^I can see face verification warn$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyFaceWarnMessage('You can only try 5 times in total.')
});
When(/^I click four times verify$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
});
Then(/^I can see failed face verification$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyFaceFailed('You have failed your face verification. It has been reported to your invigilator. Please continue with your task.')
});
And(/^I click ok$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFaceVerifyBtn()
});

// Scenario: Verify sample exam Exam tour
Given(/^开始考试$/, () => {
     Cypress.PageStudentTakeSampleExam.startSampleExam()
})
And(/^I verify the first guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Top toolbar')
})
Then(/^I click next$/, () => {
     Cypress.PageStudentTakeSampleExam.nextTourGuide()
})
And(/^I verify the second guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Collapse question content area')
})
And(/^I verify the third guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Flag questions')
})
And(/^I verify the fourth guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Switch layout')
})
And(/^I verify the fifth guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Full screen mode')
})
And(/^I verify the sixth guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Resize response area')
})
And(/^I verify the seventh guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Take screenshots')
})
And(/^I verify the eighth guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Maximise response area')
})
And(/^I verify the ninth guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Preview questions')
})
And(/^I verify the tenth guide title$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyTourGuideTitle('Submit answers and end exam')
})
Then(/^I click close$/, () => {
     Cypress.PageStudentTakeSampleExam.closeTourGuide()
})

// Scenario: Verify sample exam answer question page
Given(/^答题、标记题、下一题$/, () => {
     Cypress.PageStudentTakeSampleExam.inputEassy(answer)
     Cypress.PageStudentTakeExam.followUpQuestion()
     Cypress.PageStudentTakeExam.verifyFollowUp(0)
     Cypress.PageStudentTakeExam.nextQuestion()
})
And(/^点击上一题,验证刚才所写的内容仍然存在$/, () => {
     Cypress.PageStudentTakeExam.previousQuestion()
     Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay(answer)
})
When(/^刷新当前页面$/, () => {
     cy.reload()
     cy.waitLoading(0)
})
Then(/^答题区域的答案被清空$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay('')
})

// Scenario: Verify sample exam Exam tour skip and previous button
Then(/^I click previous$/, () => {
     Cypress.PageStudentTakeSampleExam.previousTourGuide()
})
Then(/^I click skip$/, () => {
     Cypress.PageStudentTakeSampleExam.skipTourGuide()
})

// Scenario: Open exam tutorial
Given(/^I click exam tutorial button$/, () => {
     Cypress.PageStudentTakeSampleExam.openExamTutorial()
})

// Scenario: I verify exam information in the exam
Given(/^I verify exam information in the exam$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyInstructionInfo(false, instruInfo.userId, instruInfo.candidateID, examName, instruInfo.fullMark, instruInfo.instruction)
})

// Scenario: Take sample exam by pinyin
When(/^I click pinyin in the rich text$/, () => {
     Cypress.PageStudentTakeSampleExam.clickPinyinBtn()
})
Then(/^I verify tooltips$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyPinYinTip()
})
Then(/^I click ā and ok$/, () => {
     cy.wait(2000)
     Cypress.PageStudentTakeSampleExam.clickZiMu(pinyin[0], 'OK')
})
And(/^I verify the question is answered$/, () => {
     Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(0)
})
Then(/^I input “shui3 luo4 shi2 chu1 hai5 5” and ok$/, () => {
     Cypress.PageStudentTakeSampleExam.inputOnPinYinText(pinyin[1], 'OK')
})
Then(/^I verify the content is right$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay(pinyin[0] + pinyin[2])
})
Then(/^I click ā and cancel$/, () => {
     Cypress.PageStudentTakeSampleExam.clickZiMu(pinyin[0], 'Cancel')
})
Then(/^I followup the first question$/, () => {
     Cypress.PageConductExam.clickFollowUp(true)
})

// Scenario: Verify spell check note
Given(/^I verify spell check note$/, () => {
     Cypress.auiCommon.verifyMessageBarMessage('Right-click', 0)
     Cypress.auiCommon.verifyMessageBarMessage('cmd/ctrl + right-click', 1)
})

// Scenario: Verify preview question
Given(/^I click preview question button$/, () => {
     Cypress.PageStudentTakeSampleExam.previewQuestions()
})
Then(/^I verify question1 title, content and mark$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent(0, title)
     Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent(1, pinyin[0])
     Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent(1, pinyin[2])
     Cypress.PageStudentTakeSampleExam.verifyQuestionMark(0, 99)
})
Then(/^I verify question2 title, content and mark$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent(2, title)
     Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent(3, '')
     Cypress.PageStudentTakeSampleExam.verifyQuestionMark(1, 1)
})

// Scenario: Change question number in preview mode
When(/^I select the second question$/, () => {
     Cypress.PageStudentTakeExam.selectQuestion(1)
})
Then(/^I click exit preview question button$/, () => {
     Cypress.PageStudentTakeSampleExam.exitPreviewQuestion()
})
And(/^I verify locate the second question$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay('')
})
Then(/^I end exam$/, () => {
     Cypress.PageStudentTakeExam.endExam(true)
})

// Scenario: Verify full screen function
Given(/^I click full screen button$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFullScreenBtn()
})
Then(/^I verify next question is disabled$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyNextQuestionDisabled()
})
When(/^I click previous question button$/, () => {
     Cypress.PageStudentTakeSampleExam.clickPreviousQuetions_FullScreen()
})
Then(/^I verify the question1 title, content and mark is right on full screen$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyPreviewTitleOrContent(0, title)
     Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay(pinyin[0] + pinyin[2])
     Cypress.PageStudentTakeSampleExam.verifyQuestionMark(0, 99)
})
And(/^I verify the question is followuped$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyFollowup_FullScreen()
})
Then(/^I unfollow up the first question$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFollowup_FullScreen()
})
And(/^I verify previous question is disabled$/, () => {
     Cypress.PageStudentTakeSampleExam.verifyPreviousQuestionDisabled()
})
When(/^I click next question button$/, () => {
     Cypress.PageStudentTakeSampleExam.clickNextQuetions_FullScreen()
})
Then(/^I follow up the second question$/, () => {
     Cypress.PageStudentTakeSampleExam.clickFollowup_FullScreen()
})
And(/^I input answered$/, () => {
     Cypress.PageStudentTakeSampleExam.inputEassy(answer)
})
Then(/^I exit full screen$/, () => {
     Cypress.PageStudentTakeSampleExam.exitFullscreen()
})
Then(/^I can see the first question not follow up$/, () => {
     Cypress.PageStudentTakeExam.verifyNotFollowUp(0)
})
And(/^I can see the second question is follow up and answered is right$/, () => {
     Cypress.PageStudentTakeExam.verifyFollowUp(1)
     Cypress.PageStudentTakeSampleExam.verifyRiciTextInputEssay(answer)
})

// Scenario: Verify sample exam card
Given(/^回到home页再进入到sample exam页面$/, () => {
     Cypress.PageStudentTakeSampleExam.enterSampleExamsPage()
})
Then(/^查看exam card的No. of attempts正确:1$/, () => {
     Cypress.PageStudentTakeSampleExam.noOfAttempts(examName)
})
