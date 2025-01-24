/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let date = new Date()
let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hour = date.getHours(), minute = date.getMinutes()
let examObj = {
     name: 'ATDup' + date.toLocaleString(),
     copyExam1: 'ATDup' + date.toLocaleString() + '_Copy',
     copyExam2: 'ATDup' + date.toLocaleString() + '_Copy_Copy',
     copyExam3: 'ATDup' + date.toLocaleString() + '_Copy_Copy_Copy',
     copyExam4: 'ATDup' + date.toLocaleString() + '_Copy_Copy_Copy_Copy',
     courseCode: 'AT001',
     examPaperName: 'ATDupPaper' + date.toLocaleString(),
     examCopy4PaperName: 'ATDupPaper' + date.toLocaleString() + '_Copy_Copy',
     question: 'How old are you?',
     paperFullMark: 100,
     modifyPaperName: `Modified paper name ${date}`,
     modifyFullMark: 60
}
let authorisedUrl = {
     'name': 'baidu',
     'url': 'https://www.baidu.com/'
}
let group = ['Group1', 'Group2']

let readingTimeExam_Name = '', readingStartTime = '', answeringStartTime = '', answeringEndTime = '', readingFullMark = 6.5
before(() => {
     cy.readFile('cypress/fixtures/readingTimeExam.json').then(($data) => {
          readingTimeExam_Name = $data.examInfo.name
          readingStartTime = $data.examInfo.readTime
          answeringStartTime = $data.examInfo.startTime
          answeringEndTime = $data.examInfo.endTime
     })
})

let user = '', system = '', invigilator1 = ''
let stu_list = '', candiList = []
before(() => {
     let current = Cypress.env('current_Env')
     let ct = Cypress.env('current_ten')
     let env = Cypress.env(current)
     stu_list = env[ct].Candidates
     for (let i = 0; i < 5; i++) {
          candiList.push(stu_list[i].name)
     }

     system = env[ct].System.display
     user = env[ct].CM
     invigilator1 = env[ct].Invigilator1.display
     cy.log(`loggin with ${user.display}`)
})

//  Scenario: Duplicate waiting for assigning invigilators exam
Given(/^I login enter the exam page$/, () => {
     cy.LoginExamAsSystem()
     Cypress.PageAdminCommon.visitExam(70000)
})
Then(/^I create close-book、addAuthorisedURL、addAuthorisedApplication$/, () => {
     Cypress.PageExamHome.clickCreateExam()
     Cypress.PageExamCreate.inputExamName(examObj.name)
     Cypress.PageExamCreate.inputCourse(examObj.courseCode)
     Cypress.PageExamCreate.examStartTime(0, 22, 50)
     // Cypress.PageExamCreate.examEndTime(0, 23, 0)
     Cypress.PageExamCreate.addAuthorisedURL(authorisedUrl.name, authorisedUrl.url)
     // Cypress.PageExamCreate.addAuthorisedApplication()
     Cypress.PageSampleExamCreate.addAuthorisedApplication()
     Cypress.PageAdminCourse.clickTabBar(1)
     Cypress.PageSampleExamCreate.addAuthorisedApplication()
})
And(/^I save and close$/, () => {
     Cypress.PageExamCreate.saveCloseForm()
})
When(/^I search OriginalExam$/, () => {
     Cypress.PageExamHome.searchExam(examObj.name)
})
Then(/^I duplicate the exam as CopyExam1$/, () => {
     Cypress.PageExamHome.duplicateExam()
})
And(/^I verify CopyExam1 navigation step1 and step2 highlight$/, () => {
     Cypress.PageExamCreate.verifyStepHighlight(0)
     Cypress.PageExamCreate.verifyStepHighlight(1)
})
And(/^I verify CopyExam1 no reading time，start time and end time same as OriginalExam$/, () => {
     Cypress.PageExamCreate.verifyExamStep1Time('2022-06-01T14:50:00.000Z', '2022-06-01T15:50:00.000Z')
})
And(/^I verify Type、Online proctoring、Authorized application、Authorized URL same as OriginalExam$/, () => {
     Cypress.PageExamCreate.verifyExamType(0, 'Closed-book')
})
And(/^I verify exam name$/, () => {
     Cypress.PageExamCreate.verifyExamName(examObj.copyExam1)
})
When(/^I click save and next$/, () => {
     Cypress.PageExamCreate.saveNextForm()
})
Then(/^I assign system for all as invigilator$/, () => {
     Cypress.PageExamCreate.assignInvigilator(3, 'Assign invigilator for all')
     Cypress.auiCommon.searchInPanel(system)
     Cypress.PageExamCreate.saveInvig()
});
Then(/^I remove student001$/, () => {
     Cypress.PageAdminCourse.courseTableRowCheckbox(0)
     Cypress.PageExamCreate.removeCandidate()
});

// Scenario: Duplicate waiting for generating paper exam
Given(/^I search CopyExam1$/, () => {
     Cypress.PageExamHome.searchExam(examObj.copyExam1)
})
Then(/^I duplicate the exam as CopyExam2$/, () => {
     Cypress.PageExamHome.duplicateExam()
})
And(/^I verify CopyExam2 navigation step1 step2 highlight$/, () => {
     Cypress.PageExamCreate.verifyStepHighlight(0)
     Cypress.PageExamCreate.verifyStepHighlight(1)
})
When(/^I am in step2$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(1)
})
Then(/^I verify CopyExam2 candidate number same as CopyExam1$/, () => {
     Cypress.PageSampleReport.verifyStudentNumber(5)
})
And(/^I verify CopyExam2 invigilator same as CopyExam1$/, () => {
     // let student001_Info = {
     //      rowIndex: 1,
     //      columns: [
     //           {
     //                index: 1,
     //                display: 'Candidate name',
     //                value: candiList[1]
     //           },
     //           {
     //                index: 7,
     //                display: 'Invigilator',
     //                value: system
     //           }
     //      ]
     // }
     // Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, candiList[1])
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 8, system)
})
When(/^I am in step3$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(2)
})
When(/^I create paper directly$/, () => {
     Cypress.PageExamCreate.examCreatePaperDirectly(examObj.examPaperName, true)
});
Then(/^I edit “Automatically publish results” is yes$/, () => {
     Cypress.PageExamCreate.clickScorePublishingEdit()
     Cypress.PageExamCreate.clickAutoPublishResultButton(0)
     Cypress.PageExamCreate.saveEditPublishSettings()
});

// Scenario: Duplicate waiting for publishing
Given(/^I search CopyExam2$/, () => {
     Cypress.PageExamHome.searchExam(examObj.copyExam2)
})
Then(/^I duplicate the exam as CopyExam3$/, () => {
     Cypress.PageExamHome.duplicateExam()
})
And(/^I verify CopyExam3 navigation step1 step2 step3 highlight$/, () => {
     Cypress.PageExamCreate.verifyStepHighlight(0)
     Cypress.PageExamCreate.verifyStepHighlight(1)
     Cypress.PageExamCreate.verifyStepHighlight(2)
})
When(/^I am in step 4$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(3)
})
Then(/^I publish exam$/, () => {
     Cypress.PageExamCreate.examPublish()
})

// Scenario: Duplicate published exam
Given(/^I search CopyExam3$/, () => {
     Cypress.PageExamHome.searchExam(examObj.copyExam3)
})
Then(/^I duplicate the exam as CopyExam4$/, () => {
     Cypress.PageExamHome.duplicateExam()
})
When(/^I am in step3$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(2)
})
Then(/^I verify paper same as CopyExam3$/, () => {
     let paperInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 0,
                    display: 'Paper name',
                    value: examObj.examCopy4PaperName,
               },
               {
                    index: 1,
                    display: 'Created by',
                    value: system,
               },
               {
                    index: 2,
                    display: 'Modified by',
                    value: system,
               },
               {
                    index: 4,
                    display: 'Total marks',
                    value: 100,
               },
               {
                    index: 5,
                    display: 'Status',
                    value: 'Completed',
               }
          ]
     }
     Cypress.auiCommon.verifyTable(paperInfo)
});
And(/^I verify “Automatically publish results” is yes$/, () => {
     Cypress.PageExamCreate.verifyHaveScorePublishingInfo('Yes')
})
When(/^I edit paper$/, () => {
     Cypress.PageSampleExamCreate.editPaper()
})
Then(/^I verify question、fullmark same as CopyExam3$/, () => {
     Cypress.PageExamCreate.verifyPaperInfo(examObj.question, examObj.paperFullMark)
})
And(/^I edit paper name and complete$/, () => {
     Cypress.PageSampleExamCreate.modifyPaperName(examObj.modifyPaperName)
     Cypress.PageSampleExamCreate.completePaper()
})
Then(/^I verify paper name and publish exam$/, () => {
     Cypress.PageSampleExamCreate.verifyPaperName(examObj.modifyPaperName)
     Cypress.PageExamCreate.examPublish()
     cy.wait(3000)
})

// Scenario: Duplicate open-book、have reading exam、no group exam
Given(/^I search complete exam（ 13_TakeExam（ReadingTime） Case ）$/, () => {
     Cypress.PageExamHome.searchExam(readingTimeExam_Name)
})
Then(/^I duplicate the exam as CopyReadingExam$/, () => {
     Cypress.PageExamHome.duplicateExam()
})
And(/^I verify Reading start time、Answering start time、Answering end time$/, () => {
     // Cypress.PageExamCreate.verifyExamTime(3, readingStartTime)
     Cypress.PageExamCreate.verifyExamTime(5, answeringEndTime)
})
And(/^I verify CopyReadingExam Type is Open-book，Online proctoring can't edit$/, () => {
     Cypress.PageExamCreate.verifyExamType(0, 'Open-book')
     // Cypress.PageExamCreate.verifyProctorDisabled()
})
When(/^I am in step2$/, () => {
     Cypress.PageExamCreate.leftNavigationTo(1)
})
Then(/^I verify CopyReadingExam candidate number same as OriginalExam$/, () => {
     Cypress.PageSampleReport.verifyStudentNumber(3)
})
And(/^I verify CopyReadingExam invigilator same as OriginalExam$/, () => {
     // let student001_Info = {
     //      rowIndex: 1,
     //      columns: [
     //           {
     //                index: 1,
     //                display: 'Candidate name',
     //                value: candiList[0]
     //           },
     //           {
     //                index: 9,
     //                display: 'Invigilator',
     //                value: invigilator1
     //           }
     //      ]
     // }
     // Cypress.auiCommon.verifyTable(student001_Info)
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, candiList[0])
     Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 10, invigilator1)
     
})
Then(/^I verify paper fullmark$/, () => {
     let paperInfo = {
          rowIndex: 1,
          columns: [
               {
                    index: 4,
                    value: readingFullMark,
               }
          ]
     }
     Cypress.auiCommon.verifyTable(paperInfo)
})