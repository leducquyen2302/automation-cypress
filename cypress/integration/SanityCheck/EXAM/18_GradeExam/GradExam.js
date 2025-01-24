const { auiCommonClass } = require("../../../../support/AUI/aui.common.constants")

/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
var exam = {}, paperInfo = {}
var AllResp = {}, Stu1Resp = {}, Stu2Resp = {}, CorrectResp = {}
var ExamName // = testName
var Groupandhotspot_examName = ''
var Groupandhotspot_examEndTime = ''
let examinfoPath = "MarkExamInfo.json"

const gradeMsg = {
      startGeneratePDF: 'Candidate responses PDF files were generated. You can click ',
      finishGeneratePDF: 'Candidate responses PDF files were generated. You can click'
}

before(() => {
      cy.fixture('MarkExamInfo').then(($exam) => {
            exam = $exam.examInfo
            ExamName = exam.name
            AllResp = $exam.AllStuResp
            Stu1Resp = AllResp.Stu1
            Stu2Resp = AllResp.Stu2
            CorrectResp = AllResp.Correct
            paperInfo = $exam.paperInfo
            cy.log(`${exam.name}, end: ${exam.endTime}`)

      })
      cy.readFile('cypress/fixtures/hotSpotExam.json').then(($data) => {
            Groupandhotspot_examName = $data[1]
            cy.log(Groupandhotspot_examName)
      })
})
When('Login with Course Manager', () => {
      cy.LoginExamAsSystem();
});
Given("Enter normal exam and go to Grading progress", () => {
      Cypress.PageAdminCommon.visitExam(15000)
      let delay = new Date(exam.endTime) - new Date()
      if (delay > 0) {
            cy.log(`>>> wait for grading: ${delay / 1000}s`)
            cy.wait(delay)
            cy.reload(true)
            Cypress.PageExamMark.searchExam(ExamName)
      } else {
            cy.log(`>>> aleady end `)
            Cypress.PageExamMark.searchExam(ExamName)
      }
      const card = {
            title: ExamName,
            sta: { descrip: 'Marking' }
      }
      Cypress.PageExamHome.verifyExamCardInfo(0, card)
      Cypress.PageExamGrade.enterGradingProgress(0)
})
Then('Check Table info,all students score is right', () => {
      let G1 = {
            rowIndex: 1,
            columns: [
                  {
                        index: 6,
                        display: 'Attendance status',
                        value: "Present",
                  },
                  {
                        index: 7,
                        display: 'Submission status',
                        value: "Submitted"
                  },
                  {
                        index: 8,
                        display: 'Total score',
                        value: '30'
                  }
            ]
      }

      Cypress.PageExamMark.verifyNarkScoreTable(G1)
});
Given('Check Candidate id column', () => {
      Cypress.PageExamGrade.clickManagecolumns()
      let optionlistText = 'Candidate ID'
      Cypress.PageExamGrade.clickOptionlistCheckbox(optionlistText)
      Cypress.PageExamGrade.clickOptionlistBtn("OK")
});
Then('Then Candidate Id column display in the table', () => {
      let G1 = {
            rowIndex: 1,
            columns: [
                  {
                        index: 2,
                        display: 'Candidate ID',
                        value: ""
                  }
            ]
      }
      Cypress.PageExamMark.verifyNarkScoreTable(G1)
});
Given('Check User id column', () => {
      Cypress.PageExamGrade.clickManagecolumns()
      let optionlistText = 'User ID'
      Cypress.PageExamGrade.clickOptionlistCheckbox(optionlistText)
      Cypress.PageExamGrade.clickOptionlistBtn("OK")
});
Then('Then User Id column display in the table', () => {
      let G1 = {
            rowIndex: 1,
            columns: [
                  {
                        index: 3,
                        display: 'User ID',
                        value: ""
                  }
            ]
      }
      Cypress.PageExamMark.verifyNarkScoreTable(G1)
});
Given('Lock score', () => {
      var msg = 'locked score for all candidates at ';
      Cypress.PageExamGrade.lockScore()
      Cypress.PageExamGrade.verifyGradeMessageBar(msg)
});
Then('Can not edit score', () => {
      Cypress.PageExamGrade.checkEditScoreStatus(0, false)
});
Given('Unlock score', () => {
      var msg = 'unlocked score for all candidates';
      Cypress.PageExamGrade.unLockScore()
      Cypress.PageExamGrade.verifyGradeMessageBar(msg)
});
Then('Can edit score', () => {
      Cypress.PageExamGrade.checkEditScoreStatus(0, true)
});
Given(/^Click Generate PDF for Candidate(.*)$/, (_CNo) => {
      Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox(_CNo)
      Cypress.PageExamGrade.clickGeneratePDFforSelected()
});
Then('Edit Orientation', () => {

});
Then('Edit paper size', () => {

});
Then('Edit Margins', () => {

});
Then('Edit Scale', () => {

});
Then('Edit Header and footer', () => {

});
Then('Edit Backgroud color', () => {

});
Then('Click Generate button in panel', () => {
      Cypress.PageExamGrade.clickDownload()
      // Cypress.auiCommon.Clickprocesses();
      // Cypress.auiCommon.verifyToast(gradeMsg.startGeneratePDF);
      // Cypress.auiCommon.closeToast()
      cy.wait(2000)

      // Cypress.auiCommon.verifyToast(gradeMsg.finishGeneratePDF);
      // Cypress.auiCommon.closeToast()
});
Given('Click Sync score to reports', () => {
      Cypress.PageExamGrade.clickSync()
});

Then('Publish result to all', () => {
      Cypress.PageExamGrade.publishResult()
});

Then('Unpublish result to all', () => {
      Cypress.PageExamGrade.unpublishResult()
});
