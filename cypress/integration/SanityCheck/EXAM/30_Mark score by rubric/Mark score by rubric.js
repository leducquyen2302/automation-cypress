/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let student001 = '', student002 = '', system = ''
let td = new Date()
let yy = td.getFullYear(), mm = td.getMonth(), dd = td.getDate(), hh = td.getHours(), min = td.getMinutes()
let currentHour = td.getHours(), currentMinute = td.getMinutes()
let ExamafterMinute = 3
let Examduration = 40
let rubric = {
     criteria: 'This is a Criteria.',
     compentent: [10, 'Compentent description', 'Competent'],
     proficient: [20, 'Proficient description', 'Proficient'],
     mark1: 5,
     mark2: 15,
}
// create exam
let examObj = {
     name: 'ATExam_MarkRubric_' + td.toJSON(),
     courseCode: 'AT001',
     paperName: 'ATExam_MarkRubric_' + td.toJSON(),
     examId: ''
}
// create paper
let section_temp = [
     {
          name: "AT Section 1",
          description: "Essay question description",
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
          Question1 = $ques[2]
          section_temp[0].questions[0].question = Question1
     })
})
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     system = env[ct].System
     student001 = env[ct].Candidates[0]
     student002 = env[ct].Candidates[1]
})

// Scenario: Create exam with rubric
Given(/^Create exam in step3$/, () => {
     cy.LoginExamAsSystem()
     Cypress.auiCommon.visitURL('/#/exam/schedule/create?pageType=0')
     Cypress.PageExamCreate.inputExamNameWithCode(examObj.name)
     Cypress.PageExamCreate.chooseExamType(1)
     Cypress.PageExamCreate.inputCourse(examObj.courseCode)
     Cypress.PageExamCreate.examStartTime(0, currentHour, currentMinute, ExamafterMinute)
     Cypress.PageExamCreate.examEndTime(0, currentHour, currentMinute, ExamafterMinute, Examduration)
     Cypress.PageExamCreate.saveNextForm()
     Cypress.PageExamCreate.saveNextForm()
     cy.url().then($body => {
          examObj.examId = $body.split('examId=')[1].split('&')[0]
     })
})
Then(/^I create paper with rubric and publish exam$/, () => {
     cy.CreatePaperApi(examObj.courseCode, examObj.paperName, section_temp)
     Cypress.PageSampleExamCreate.addPaperFromBank(examObj.paperName)
     Cypress.PageSampleExamCreate.editPaper()
     cy.wait(2000)
     Cypress.auiCommon.clickEditBtn(0)
     Cypress.PageExamCreate.switchMarkingType(1)
     Cypress.auiCommon.clickPenEditBtn(1)
     Cypress.PageAdminMarkingsettingsPage.deleteCriteria(3)
     Cypress.PageAdminMarkingsettingsPage.deleteCriteria(0)
     Cypress.PageExamCreate.clickEditRubricBtn(2)
     Cypress.PageAdminMarkingsettingsPage.inputMarksTitle(rubric.criteria)
     Cypress.PageExamCreate.clickEditRubricBtn(3)
     Cypress.PageAdminMarkingsettingsPage.inputQuestionMarks(rubric.compentent[0], rubric.compentent[1])
     Cypress.PageExamCreate.clickEditRubricBtn(4)
     Cypress.PageAdminMarkingsettingsPage.inputQuestionMarks(rubric.proficient[0], rubric.proficient[1])
     Cypress.auiCommon.clickFooterBtnInPanel(1)
     Cypress.PageSampleExamCreate.completePaper()
     Cypress.PageExamCreate.examPublish()
     cy.writeFile('cypress/fixtures/MarkRubric.json', { "examId": examObj.examId })
     cy.logoutApi()
})

// Scenario: Student001 complete the exam
Given(/^Student001 complete the exam$/, () => {
     cy.LoginByLocal(student001.userid)
     Cypress.auiCommon.visitUrl(`/#/examapp/Instruction?examId=${examObj.examId}`)
     cy.wait(10000)
     Cypress.PageStudentTakeExam.waitStartByElement()
     Cypress.PageStudentTakeExam.clickStartBtn()
     Cypress.PageStudentTakeSampleExam.inputEassy('Answer')
     Cypress.PageStudentTakeExam.endExam(true)
     cy.logoutApi()
})

// Scenario: I verify rubric information are right in mark student001 score page
Given(/^I enter mark student001 score page$/, () => {
     cy.LoginExamAsSystem()
     cy.wait(5000)
     Cypress.auiCommon.visitUrl(`/#/exam/marking/markquestion?examId=${examObj.examId}`)
     // Cypress.auiCommon.visitUrl(`/#/exam/marking/markquestion?examId=6b14f708-3ad9-4ec5-a97b-0dca23122ee3`)
     cy.wait(8000)
     Cypress.PageExamMark.clickMarkScore(0)
})
Then(/^I verify rubric title, content and score$/, () => {
     let info = {
          title: rubric.criteria,
          totalMark: ` /${rubric.proficient[0]}`,
          detail: [
               {
                    header: rubric.compentent[2],
                    des: rubric.compentent[1],
                    score: '0~10'
               },
               {
                    header: rubric.proficient[2],
                    des: rubric.proficient[1],
                    score: '10.1~20'
               }
          ]
     }
     Cypress.PageExamMark.verifyRubricTitleAndContent(info)
})
Then(/^I input score 5$/, () => {
     Cypress.PageExamMark.inputRubricScore(0, rubric.mark1)
})

// Scenario: I verify mark in rubric matrix
Given(/^I click mark in rubric matrix$/, () => {
     Cypress.PageExamMark.clickMarkInRubricMatrixBtn()
})
Then(/^I verify table info are right$/, () => {
     let info = {
          criteria: 'Criteria',
          mark: rubric.mark1,
          totalMark: ` / ${rubric.proficient[0]}`,
          compententMarkRange: rubric.compentent[0],
          compententDes: rubric.compentent[1],
          proficientMarkRange: rubric.proficient[0],
          proficientDes: rubric.proficient[1],
     }
     Cypress.PageExamMark.verifyMarkInRubricMatrix(info)
})
And(/^I verify corresponding mark region compentent is highlight$/, () => {
     Cypress.PageExamMark.verifyRubricTableHightlight(0, true)
     Cypress.PageExamMark.verifyRubricTableHightlight(1, false)
})

// Scenario: I verify mark Invalid value in rubric matrix
When(/^I enter a number greater than the maximum value$/, () => {
     Cypress.PageExamMark.inputRubricScore(1, 300)
})
Then(/^I verify the greater number tip is right$/, () => {
     Cypress.auiCommon.verifyValiMessage(1, `The marks cannot be greater than ${rubric.proficient[0]}.`)
})
When(/^I input new mark 15 in rubric matrix$/, () => {
     Cypress.PageExamMark.inputRubricScore(1, rubric.mark2)
})
Then(/^I verify corresponding mark region proficient is highlight$/, () => {
     Cypress.PageExamMark.verifyRubricTableHightlight(0, false)
     Cypress.PageExamMark.verifyRubricTableHightlight(1, true)
})
Then(/^I close the matrix panel$/, () => {
     Cypress.auiCommon.clickFooterBtnInPanel(0)
})
And(/^I verify question score display right 15$/, () => {
     Cypress.PageExamMark.verifyScore(false, 15)
})

// Scenario: I verify AI marking language
Given(/^I click AI marking$/, () => {
     Cypress.PageExamMark.clickAIMarkingBtn()
})
Then(/^I verify tip content display right$/, () => {
     Cypress.PageExamMark.verifyAIMarkingTipsContent()
})
And(/^I verify language is English by default$/, () => {
     Cypress.PageExamMark.verifyAIMarkingDefaultLanguage('English')
})
Then(/^I verify have five languages$/, () => {
     Cypress.PageExamMark.clickLanguageBtn()
     Cypress.PageExamMark.expandLanguage()
     Cypress.PageExamMark.verifyFiveLanguage()
})
When(/^I search Chinese and choose it to save and generate$/, () => {
     Cypress.auiCommon.comboSearchBox('Chinese')
     Cypress.auiCommon.clickFooterBtnInDialog(1)
     cy.waitLoading()
})
Then(/^I verify AI marking result$/, () => {
     // Cypress.PageExamMark.verifyAIMarkingTitleAndScore(rubric.criteria, `(${rubric.mark2}/20):`, '回答')
     Cypress.PageExamMark.verifyAIMarkingTitleAndScore(rubric.criteria, `(5/20):`, '回答')
})

// Scenario: I verify AI marking not in view marking history after go back 
When(/^I click go back button$/, () => {
     Cypress.PageExamMark.clickGoBackBtn()
})
Then(/^I cannot see records in view marking history$/, () => {
     Cypress.PageExamMark.clickViewMarkingHistory()
     Cypress.PageExamMark.verifyViewMarkingHistory(0, system.display, `${rubric.mark2}`)
     Cypress.PageExamMark.closeViewMarkingHistory()
})

// Scenario: I enter AI marking again verify language is Chinese by default
Then(/^I verify the language is Chinese$/, () => {
     Cypress.PageExamMark.verifyAIMarkingDefaultLanguage('Chinese')
})

// Scenario: I verify regenerate AI marking
When(/^I click generate button$/, () => {
     Cypress.PageExamMark.clickGenerateBtn()
})
When(/^I click regenerate button$/, () => {
     Cypress.PageExamMark.clickReGenerateBtn()
})

// Scenario: I apply the AI marking
When(/^I click apply button$/, () => {
     Cypress.PageExamMark.clickApplyBtn()
})
Then(/^I verify the mark comment is the AI marking comment$/, () => {
     Cypress.PageExamMark.verifyMarkingComment('回答')
})
And(/^I verify the AI marking comment display right in view marking history$/, () => {
     Cypress.PageExamMark.clickViewMarkingHistory()
     // Cypress.PageExamMark.verifyViewMarkingHistory(0, system.display, ` added this comment for candidates`, '回答')
     Cypress.PageExamMark.verifyViewMarkingHistory(0, system.display, `${rubric.mark2}`)
     Cypress.PageExamMark.verifyViewMarkingHistory(1, system.display, ` added this comment for candidates`, '回答', 2)
     Cypress.PageExamMark.closeViewMarkingHistory()
})