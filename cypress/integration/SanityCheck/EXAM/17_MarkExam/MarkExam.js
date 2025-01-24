// © 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.
var exam = {}, paperInfo = {}
var AllResp = {}, Stu1Resp = {}, Stu2Resp = {}, CorrectResp = {}
var ExamName, CandiResponse = []// = testName
var Groupandhotspot_examName = ''
var stuName1 = {}, stuName2 = {}
let markerList = [], ExamAdmin;
let examinfoPath = "MarkExamInfo.json"

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    let mars = env[ct].markers
    markerList.push(mars[0])
    markerList.push(mars[1])
    markerList.push(mars[2])
    markerList.push(mars[3])
    ExamAdmin = env[ct].ExamAdmin
    cy.readFile('cypress/fixtures/hotSpotExam.json').then(($data) => {
        Groupandhotspot_examName = $data[1]
        cy.log(Groupandhotspot_examName)
    })
    cy.fixture(examinfoPath).then(($exam) => {
        exam = $exam.examInfo
        ExamName = exam.name
        AllResp = $exam.AllStuResp
        Stu1Resp = AllResp.Stu1
        Stu2Resp = AllResp.Stu2
        CorrectResp = AllResp.Correct
        paperInfo = $exam.paperInfo
        cy.log(`${exam.name}, end: ${exam.endTime}`)
        var Stu1verfiyResponse = [
            {
                type: 'Choice',
                answer: Stu1Resp.Q1.Answer[0],
                sta: 'pass',
                score: Stu1Resp.Q1.Score[0]
            },
            {
                type: 'Muti-ch',
                answer: Stu1Resp.Q2.Answer,
                correct: CorrectResp.Q2.Answer,
                sta: 'pass',
                score: Stu1Resp.Q2.Score[0]
            },
            {
                type: 'FIB',
                answer: Stu1Resp.Q3.Answer,
                correct: CorrectResp.Q3.Answer,
                sta: 'fail',
                score: Stu1Resp.Q3.Score[0]
            },
            {
                type: 'FIB-Case',
                answer: Stu1Resp.Q4.Answer,
                correct: CorrectResp.Q4.Answer,
                sta: 'fail',
                score: Stu1Resp.Q4.Score[0]
            },
            {
                type: 'Sub',
                answer: Stu1Resp.Q5.Answer,
                correct: CorrectResp.Q5.Answer,
                sta: 'pass',
                score: [4, 6.5]
            },
            {
                type: 'T/F',
                answer: Stu1Resp.Q6.Answer,
                correct: CorrectResp.Q6.Answer,
                sta: 'pass',
                score: Stu1Resp.Q6.Score[0]

            },
            {
                type: 'Match',
                answer: Stu1Resp.Q7.Answer,
                correct: CorrectResp.Q7.Answer,
                squareSta: ['pass', 'pass', 'pass', 'pass'],
                sta: 'pass',
                score: Stu1Resp.Q7.Score[0]
            },
            {
                type: 'Hotspot',
                answer: {
                    circle: [0.55, 0.45],
                    square: [0.75, 0.65],
                    drawing: [
                        { dotX: 0.2, dotY: 0.2 },
                    ]
                },
                correct: {
                    circle: [0.55, 0.45],
                    square: [0.75, 0.65],
                    drawing: [
                        { dotX: 0.2, dotY: 0.2 },
                    ]
                },
                squareSta: { pass: 3, fail: 0 },
                sta: 'pass',
                score: 1
            },
            {
                type: 'Ordering',
                answer: [],
                correct: [],
                squareSta: { pass: 0, fail: 2 },
                sta: 'pass',
                score: 0
            }
        ]
        var Stu2verfiyResponse = [
            {
                type: 'Choice',
                answer: Stu2Resp.Q1.Answer[0],
                sta: 'fail',
                score: Stu2Resp.Q1.Score[0]
            },
            {
                type: 'Muti-ch',
                answer: Stu2Resp.Q2.Answer,
                correct: CorrectResp.Q2.Answer,
                sta: 'fail',
                score: Stu2Resp.Q2.Score[0]
            },
            {
                type: 'FIB',
                answer: Stu2Resp.Q3.Answer,
                correct: CorrectResp.Q3.Answer,
                sta: 'pass',
                score: Stu2Resp.Q3.Score[0]
            },
            {
                type: 'FIB-Case',
                answer: Stu2Resp.Q4.Answer,
                correct: CorrectResp.Q4.Answer,
                sta: 'pass',
                score: Stu2Resp.Q4.Score[0]
            },
            {
                type: 'Sub',
                answer: Stu2Resp.Q5.Answer,
                correct: CorrectResp.Q5.Answer,
                sta: 'pass',
                score: [4, 0]
            },
            {
                type: 'T/F',
                answer: Stu2Resp.Q6.Answer,
                correct: CorrectResp.Q6.Answer,
                sta: 'fail',
                score: Stu2Resp.Q6.Score[0]
            },
            {
                type: 'Match',
                answer: Stu2Resp.Q7.Answer,
                correct: CorrectResp.Q7.Answer,
                squareSta: ['fail', 'fail', 'pass', 'pass'],
                sta: 'fail',
                score: Stu2Resp.Q7.Score[0]
            },
            {
                type: 'Hotspot',
                answer: {
                    circle: [0.1, 0.5],
                    square: [0.2, 0.6],
                    drawing: [
                        { dotX: 0.3, dotY: 0.3 },
                    ]
                },
                correct: {
                    circle: [0.55, 0.45],
                    square: [0.75, 0.65],
                    drawing: [
                        { dotX: 0.2, dotY: 0.2 },
                    ]
                },
                squareSta: { pass: 0, fail: 2 },
                sta: 'fail',
                score: 0
            },
            {
                type: 'Ordering',
                answer: [],
                correct: [],
                squareSta: { pass: 0, fail: 2 },
                sta: 'fail',
                score: 0
            }
        ]
        CandiResponse.push(Stu1verfiyResponse)
        CandiResponse.push(Stu2verfiyResponse)
    })
})
When('Login with Course Manager', () => {
    // cy.LoginExamAsExamAdmin(false)
    cy.LoginExamAsSystem();
});
Given("Enter normal exam", () => {
    Cypress.PageAdminCommon.visitExam(15000)
    let delay = new Date(exam.endTime) - new Date()
    if (delay > 0) {
        cy.log(`>>> wait for marking: ${delay / 1000}s`)
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
    Cypress.PageExamMark.enterMarkingProgress(0)
})
Then("go to question view", () => {
    Cypress.PageExamMark.ClickQuestionView()
});
Then('Verify question content and type', () => {
    let q1 = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'No.',
                value: "Q1",
            },
            {
                index: 2,
                display: 'Question content',
                value: paperInfo.sections[0].questions[0].question.title
            },
            {
                index: 3,
                display: 'Type',
                value: 'Choice - single answer'
            }
        ]
    }

    Cypress.PageExamMark.verifyNarkScoreTable(q1)
})
Then('Verify question marking progress', () => {
    let q1 = {
        rowIndex: 1,
        columns: [
            {
                index: 4,
                display: 'Marking progress',
                value: "2/2",
            }
        ]
    }
    let q2 = {
        rowIndex: 2,
        columns: [
            {
                index: 4,
                display: 'Marking progress',
                value: "2/2",
            }
        ]
    }
    let q3 = {
        rowIndex: 3,
        columns: [
            {
                index: 4,
                display: 'Marking progress',
                value: "2/2",
            }
        ]
    }
    let q4 = {
        rowIndex: 4,
        columns: [
            {
                index: 4,
                display: 'Marking progress',
                value: "2/2",
            }
        ]
    }
    let q5 = {
        rowIndex: 5,
        columns: [
            {
                index: 4,
                display: 'Marking progress',
                value: "1/2",
            }
        ]
    }

    Cypress.PageExamMark.verifyNarkScoreTable(q1)
    Cypress.PageExamMark.verifyNarkScoreTable(q2)
    Cypress.PageExamMark.verifyNarkScoreTable(q3)
    Cypress.PageExamMark.verifyNarkScoreTable(q4)
    Cypress.PageExamMark.verifyNarkScoreTable(q5)
})
Given(/^Go to Candidate view$/, (arg0) => {
    Cypress.PageExamMark.ClickCandidateView()
});
// Given(/^Go to Question view$/, (arg0) => {


//     Cypress.PageExamMark.ClickQuestionView()
// });
Then('Verify candidate submission status and marking progress', () => {
    let candidateView = {
        c1: {
            rowIndex: 1,
            columns: [
                {
                    index: 7,
                    display: 'Submission status',
                    value: 'Submitted'
                },
                {
                    index: 9,
                    display: 'Marking progress',
                    value: '8/9'
                }
            ]
        },
        c2: {
            rowIndex: 2,
            columns: [
                {
                    index: 7,
                    display: 'Submission status',
                    value: "Submitted"
                },
                {
                    index: 9,
                    display: 'Marking progress',
                    value: '9/9'
                }
            ]
        },
        c3: {
            rowIndex: 3,
            columns: [
                {
                    index: 7,
                    display: 'Submission status',
                    value: "Not submitted"
                },
                {
                    index: 9,
                    display: 'Marking progress',
                    value: '0/9'
                }
            ]
        }
    }
    Cypress.PageExamMark.verifyCanditeViewTable(candidateView.c1)
    Cypress.PageExamMark.verifyCanditeViewTable(candidateView.c2)
    Cypress.PageExamMark.verifyCanditeViewTable(candidateView.c3)
});
Given(/^Go to Question view$/, (arg0) => {
    Cypress.PageExamMark.ClickQuestionView()
});
Given(/^Click mark score with No.(.*)$/, (_number) => {
    Cypress.PageExamMark.clickMarkScore(_number - 1)
});
Then(/^Candidate(.*) answered No.(.*) Q(.*) with (.*) and auto mark (.*) score$/, (_CNo, _QexpectNo, _QNo, _QT, _Score) => {
    const QexpectNo = _QexpectNo - 1;
    let CNo = _CNo - 1;
    let candidaResponse = CandiResponse[CNo]
    let candidaResponseQNo = candidaResponse[QexpectNo]
    Cypress.PageExamMark.selectStuByScore(_Score)
    Cypress.PageExamMark.verifyStuRespContent(candidaResponseQNo)
    Cypress.PageExamMark.verifyScore(true, candidaResponseQNo.score)
});
Given(/^I click Q8 mark score$/, () => {
    cy.wait(10000)
    Cypress.PageExamMark.clickMarkScore(7)
});
Then(/^I verify Q8 content, Candidate1 response, correct answer, auto mark 4 score$/, () => {
    Cypress.PageStudentTakeExam.verifyHotSpotContent('This is a Multiple drop-down question!', 0, 'Blank_1')
    Cypress.PageExamMark.verifyStudentResponse('B. Drop-down第二个选项')
    Cypress.PageExamMark.verifyCorrectAnswer('B. Drop-down第二个选项')
    Cypress.PageExamMark.verifyScore(true, 4)
});
And(/^I verify Q8 Candidate2 response, correct response, auto mark 0 score$/, () => {
    Cypress.PageExamMark.selectStuByScore(0)
    Cypress.PageExamMark.verifyStudentResponse('A. Drop-down第一个选项')
    Cypress.PageExamMark.verifyScore(true, 0)
});
Given(/^I click Q9 mark score$/, () => {
    Cypress.PageExamMark.clickMarkScore(8)
});
Then(/^I verify Q9 content, Candidate1 response, correct answer, auto mark 4 score$/, () => {
    Cypress.PageStudentTakeExam.verifyHotSpotContent('This is a Multiple radio button question!', 0, 'Blank_1')
    Cypress.PageExamMark.verifyStudentResponseTitle(1, 'Radio button第二个选项')
    Cypress.auiCommon.verifyInputWhetherChecked(1, 'true')
    Cypress.PageExamMark.verifyCorrectAnswer('B')
    Cypress.PageExamMark.verifyScore(true, 4)
});
And(/^I verify Q9 Candidate2 response, correct response, auto mark 0 score$/, () => {
    Cypress.PageExamMark.selectStuByScore(0)
    Cypress.PageExamMark.verifyStudentResponseTitle(0, 'Radio button第一个选项')
    Cypress.auiCommon.verifyInputWhetherChecked(0, 'true')
    Cypress.PageExamMark.verifyCorrectAnswer('B')
    Cypress.PageExamMark.verifyScore(true, 0)
});
// Scenario: Manul mark score in Question view
Then(/^Manul edit score by Question to (.*) score for No.(.*) Q(.*) with (.*) of Student(.*)$/, (_score, _QexpectNo, _QNo, _QT, _CNo) => {
    const QNoinPage = _QNo - 1;
    const QexpectNo = _QexpectNo - 1;
    const CNo = _CNo - 1;
    const candidaResponse = CandiResponse[CNo]
    const candidaResponseQNo = candidaResponse[QexpectNo]
    const Comment = "Comment for Candidte" + _CNo + "with Question" + _QNo + " by question"
    Cypress.PageExamMark.clickMarkScore(QNoinPage)
    Cypress.PageExamMark.selectStuByScore(candidaResponseQNo.score)
    Cypress.PageExamMark.clickEditScore()
    Cypress.PageExamMark.inputScore(_score)
    Cypress.PageExamMark.inputScoreComment(0, Comment)
    Cypress.PageExamMark.closeMarkProgress()
});
// Then(/^Candidate1 answered Q5 with "Sub question" and auto mark 4 score to sub1,get Candidate1 info$/, () => {
//     Cypress.PageExamMark.selectStuByResp(CandiResponse[0][4].answer[1])
//     Cypress.PageExamMark.clickStu(0);
//     Cypress.PageExamMark.GetCheckedStuName("CandidateInfo1")
//     cy.fixture('CandidateInfo1').then(($stu) => { 
//         stuName1 = $stu
//     })
//     Cypress.PageExamMark.verifyScore(true,NaN)
//     Cypress.PageExamMark.ClickSubQuestion(0)

//     // Cypress.PageExamMark.inputScore(6.5)
// });
// And(/^Candidate2 answered Q5 with "Sub question" and auto mark 0 score to sub1,get Candidate2 info$/, () => {
//     Cypress.PageExamMark.selectStuByResp(CandiResponse[1][4].answer[1])
//     Cypress.PageExamMark.GetCheckedStuName("CandidateInfo2")
//     cy.fixture('CandidateInfo2').then(($stu) => { 
//         stuName2 = $stu
//     })
//     Cypress.PageExamMark.verifyScore(true,0)
//     Cypress.PageExamMark.ClickSubQuestion(0)

//     // Cypress.PageExamMark.inputScore(0)   
// });
Then(/^Manul edit score by Question to (.*) score for (.*) Q(.*) of (.*) of Student(.*)_(.*) mark$/, (_score, _QT, _SQNo, _QNo, _CNo, _MarkType) => {
    const QNo = _QNo - 1;
    const CNo = _CNo - 1;
    const SQNo = _SQNo - 1;
    const candidaResponse = CandiResponse[CNo]
    const candidaResponseQNo = candidaResponse[QNo]
    const Comment = "Comment for Candidte" + _CNo + "with Question" + _SQNo + " of " + _QNo + " by Question";
    Cypress.PageExamMark.clickMarkScore(QNo)
    // Cypress.PageExamMark.selectStuByResp(candidaResponseQNo.answer[1])
    Cypress.PageExamMark.selectStuByScore(candidaResponseQNo.score)
    Cypress.PageExamMark.ClickSubQuestion(SQNo)
    console.log(_MarkType)
    if (_MarkType == '"Auto"') {
        Cypress.PageExamMark.clickEditScore()
    }
    Cypress.PageExamMark.inputScore(1)
    Cypress.PageExamMark.inputScoreComment(0, Comment)
    Cypress.PageExamMark.closeMarkProgress()
});
Then(/^Monitor manul edit score by Question to (.*) score for (.*) Q(.*) of (.*) of Student(.*)_(.*) mark$/, (_score, _QT, _SQNo, _QNo, _CNo, _MarkType) => {
    const QNo = _QNo - 1;
    const CNo = _CNo - 1;
    const SQNo = _SQNo - 1;
    const candidaResponse = CandiResponse[CNo]
    const candidaResponseQNo = candidaResponse[QNo]
    const Comment = "Comment for Candidte" + _CNo + "with Question" + _SQNo + " of " + _QNo + " by Question";
    Cypress.PageExamMark.clickMarkScore(QNo)
    // Cypress.PageExamMark.selectStuByResp(candidaResponseQNo.answer[1])
    Cypress.PageExamMark.selectStuByScore(candidaResponseQNo.score)
    Cypress.PageExamMark.ClickSubQuestion(SQNo)
    console.log(_MarkType)

    Cypress.PageExamMark.monitorClickEditScore()

    Cypress.PageExamMark.inputScore(1)
    Cypress.PageExamMark.inputScoreComment(0, Comment)
    Cypress.PageExamMark.closeMarkProgress()
});
Then(/^Add annotation to  (.*) Q(.*) of (.*) of Student(.*)$/, (_QT, _SQNo, _QNo, _CNo) => {
    const QNo = _QNo - 1;
    const CNo = _CNo - 1;
    const SQNo = _SQNo - 1;
    const candidaResponse = CandiResponse[CNo]
    const candidaResponseQNo = candidaResponse[QNo]
    const Comment = "Annotation" + _CNo + "with Question" + _SQNo + " of " + _QNo + " by Question";
    Cypress.PageExamMark.clickMarkScore(QNo)
    Cypress.PageExamMark.selectStuByResp(candidaResponseQNo.answer[1])
    Cypress.PageExamMark.ClickSubQuestion(SQNo)
    Cypress.PageExamMark.addHighlight(candidaResponseQNo.answer[1], 0)
    Cypress.PageExamMark.addAnnotation(Comment, 0)
    Cypress.PageExamMark.closeMarkProgress()
});
Given(/^Go to Candidate(.*) row and click mark score$/, (arg0) => {
    var stuNames = [stuName1.CandidateName, stuName2.CandidateName]
    console.log("student 1 is: " + stuName1.CandidateName)
    console.log("student 2 is: " + stuName2.CandidateName)
    Cypress.PageExamMark.clickMarkScoreforCandidate(stuNames, 0)
});
Then(/^Page can locate to unmarked question under Candidate(.*)$/, (_CNo) => {
    Cypress.PageExamMark.verifyScore(false, NaN)
});
Then(/^Manul edit score by Candidate to (.*) score for No.(.*) Q(.*) with (.*) of Student(.*)$/, (_score, _QexpectNo, _QNo, _QT, _CNo) => {
    const QNo = _QNo - 1;
    const Comment = "Comment for Candidte" + _CNo + "with Question" + _QNo + " by Candidate"
    Cypress.PageExamMark.selectQuestion(QNo)
    Cypress.PageExamMark.clickEditScore()
    Cypress.PageExamMark.inputScore(1)
    Cypress.PageExamMark.inputScoreComment(0, Comment)
});
Then(/^Manul edit score by Candidate to (.*) score for (.*) Q(.*) of (.*) of Student(.*)_(.*) mark$/, (_score, _QT, _SQNo, _QNo, _CNo, _MarkType) => {
    const QNo = _QNo - 1;
    const SQNo = _SQNo - 1;
    const Comment = "Comment for Candidte" + _CNo + "with Question" + _SQNo + " of " + _QNo + " by Candidate";
    Cypress.PageExamMark.selectQuestion(QNo)
    Cypress.PageExamMark.ClickSubQuestion(SQNo)
    if (_MarkType == '"Auto"') {
        Cypress.PageExamMark.clickEditScore()
    }
    Cypress.PageExamMark.inputScore(1)
    Cypress.PageExamMark.inputScoreComment(0, Comment)
});
Then('Close mark score page', () => {
    Cypress.PageExamMark.closeMarkProgress()
});
Given('Click Export response', () => {
    Cypress.PageExamMark.clickExportResponse()
});
Then('The excel file is exported successfully', () => {
    var filePath = '../downloads/' + "001_Sub-question_QTI_Package.zip";
    Cypress.PageExamMark.uploadFile(filePath)
});
Given('Click Import response', () => {

});
Then('The excel file is import skipped for no change', () => {

});
Given('Enter Group and Hotspot test Exam', () => {
    Cypress.PageAdminCommon.visitExam(15000)
    Cypress.PageExamMark.searchExam(Groupandhotspot_examName)
    Cypress.PageExamMark.enterMarkingProgress(0)
});
Given('Go to Question View', () => {
    Cypress.PageExamMark.ClickQuestionView()
});
When('Assign marker in Question View', () => {
    Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox(0) //8
    Cypress.PageExamMark.clickAssignMarker()
    Cypress.PageExamMark.searchMarker(markerList[0].display)
    let action = "Save"
    Cypress.PageExamMark.confirmSave(action)
});
Then('Logout', () => {
    cy.logoutApi()
});
When(/^Login with marker (.*)$/, (_index) => {
    let marker = markerList[_index - 1]
    cy.LoginByLocal(marker.userid)
    cy.wait(3000)
});
Then(/^Verify have (.*) record to marker$/, (_number) => {
    Cypress.PageExamMark.verifyTableLength(_number)
});
When('Assign staff to All in Question View', () => {
    Cypress.PageExamMark.clickAssignMarkertoAll()
    let marker1 = markerList[1]
    let monitor = markerList[2]
    let checker = markerList[3]
    Cypress.PageExamMark.searchMarker(marker1.display)
    Cypress.PageExamMark.searchMonitor(monitor.display)
    Cypress.PageExamMark.searchChecker(checker.display)
    let action = "Save"
    Cypress.PageExamMark.confirmSave(action)
});
Then(/^Maker mark question (.*) score for Q(.*) in Question View$/, (_score, _QNo) => {
    const comment = "Marker edit score to " + _score + " to Question " + _QNo + "in Question view"
    Cypress.PageExamMark.clickMarkScore(_QNo - 1)
    Cypress.PageExamMark.clickEditScore()
    Cypress.PageExamMark.inputScore(_score)
    Cypress.PageExamMark.inputScoreComment(0, comment)
});
Then('marker click Confirm score', () => {
    Cypress.PageExamMark.confirmScore()
})
Then('Login with checker', () => {
    let checker = markerList[3]
    cy.LoginByLocal(checker.userid)
});
Then('Login with monitor', () => {
    let monitor = markerList[2]
    cy.LoginByLocal(monitor.userid)
});
Then('checker push score to monitor', () => {
    Cypress.PageExamMark.pushScore()
});
Then('monitor submit score', () => {
    Cypress.PageExamMark.submitScore()
});
When('Assign marker in Candidate View', () => {
    Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox(0)
    Cypress.PageExamMark.clickAssignMarker()
    let action_continue = "Continue"
    Cypress.PageExamMark.confirmConfict(action_continue)
    Cypress.PageExamMark.searchMarker(markerList[0].display)
    let action = "Save"
    Cypress.PageExamMark.confirmSave(action)
});
Then(/^Maker mark question (.*) score for Candidate(.*) in Candidate View$/, (_score, _CNo) => {
    const comment = "Marker edit score to " + _score + " to Candidate " + _CNo + "in Candidate view"
    Cypress.PageExamMark.clickMarkScore(_CNo - 1)
    Cypress.PageExamMark.selectQuestion(0)
    Cypress.PageExamMark.clickEditScore()
    Cypress.PageExamMark.inputScore(_score)
    Cypress.PageExamMark.inputScoreComment(0, comment)
});
When('Assign marker to Group in Candidate View', () => {
    Cypress.PageExamMark.ClickCandidateView()
    Cypress.PageExamMark.clickAssignMarkertoGroups()
    Cypress.PageExamMark.checkGroupCheckBox(0)
    Cypress.PageExamMark.clickChangeMarker()
    Cypress.PageExamMark.searchMarker(markerList[1].display)
    let action = "Save"
    Cypress.PageExamMark.confirmSave(action)
    Cypress.PageExamMark.confirmSave(action)
});
Then('Click view marking history', () => {
    Cypress.PageExamMark.clickViewMarkingHistory()
});
Then(/^The history display in table for history(.*)$/, (_index) => {
    var history1 = [
        {
            user: ["System Account", "ExamAdmin.display"],
            action: ["assigned score 0", "edited score from", "added this comment"],
            comment: ["", "", "by question"]
        },
        {
            user: ["System Account", "ExamAdmin.display"],
            action: ["assigned score 4", "edited score from", "added this comment"],
            comment: ["", "", "by Candidate"]
        }
    ]
    // Cypress.PageExamMark.verifyViewMarkingHistory(history1[_index - 1])
});
Then('Close marking history', () => {
    Cypress.PageExamMark.closeViewMarkingHistory()
});
Then(/^Chick Candidate (.*) with score (.*)$/, (_CNo, _score) => {
    Cypress.PageExamMark.selectStuByScore(_score)
});
Then('Switch processes', () => {
    // Cypress.PageExamMark.clickSwitchMarkingProgressSettingBtn(1)
});