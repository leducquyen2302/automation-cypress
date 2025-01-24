/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const hotSpot_content = 'Can you pinpoint the area in which the volcano is located on the map?'
const hotSpot_tips = [
    'Click on this image to select your response. ',
    'You can select up to 3 responses.',
    'Select your response and click the delete button to delete it.'
]
const hotspotCorrectAnswer = {
    circle: [0.55, 0.45],
    square: [0.75, 0.65],
    drawing: [
        { dotX: 0.2, dotY: 0.2 },
    ]
};
const order_content = 'Ordering all of the examples or types of simple carbohydrates'
const order_tip = 'Note: Drag and drop options to the right to set the correct order.'
let enrolList = [], ExamNamePrefix = 'ATExamMark', ExamName = '', ExamId = '', hotspot_examName = ''
let examInfo = {
    name: ExamNamePrefix,
    courseCode: "AT001",
    courseId: '',
    startTime: "",
    duration: 0,
    endTime: "",
    isOpenB: true,
    isSave2LocalFile: true,
    filePath: 'MarkExamInfo.json',
    isAppend: false
}
let section_temp = [
    {
        name: "AT Section 1",
        allowRandom: false,
        description: "Section1 Description",
        order: 1,
        questions: []
    }
]
let paperInfo = {
    name: `ATPaper_Mark ${new Date().toLocaleString()}`,
    sections: section_temp
}
let AllStuResp = {
    Correct: {
        Q1: { Answer: ["B. False"], Score: [4] },
        Q2: { Answer: [1, 3, 4], Score: [6] },
        Q3: { Answer: ['Azure subscription', 'Azure account'], Score: [4] },
        Q4: { Answer: ['Azure subscription', 'Azure account'], Score: [4] },
        Q5: { Answer: ["B. False", '3 kinds of cloud: Private cloud; Public cloud; Hybrid cloud'], Score: [10.5] },
        Q6: { Answer: ["True"], Score: [4] },
        Q7: { Answer: [["What's your name?", "Robbin"], ["What's your telephone number?", "###"], ["What's your age?", "Twenty Three"], ["Where are you from?", "China"]], Score: [4] },
        Q8: { Question: 'This is a Multiple drop-down question!', Answer: ['Drop-down第二个选项'], Score: [4] },
        Q9: { Question: 'This is a Multiple radio button question!', Answer: ['Radio button第二个选项'], Score: [4] },
    },
    Stu1: {
        Q1: { Answer: ["B. False"], Score: [4] },
        Q2: { Answer: [1, 3, 4], Score: [6] },
        Q3: { Answer: ['Azure subscription', 'Azure subscription'], Score: [0] },
        Q4: { Answer: ['Azure subscription', 'Azure account'], Score: [4] },
        Q5: { Answer: ['B. False', 'Private cloud; Public cloud; Hybrid cloud'], Score: [10.5] },
        Q6: { Answer: ["True"], Score: [4] },
        Q7: { Answer: [["What's your name?", "Robbin"], ["What's your telephone number?", "###"], ["What's your age?", "Twenty Three"], ["Where are you from?", "China"]], Score: [4] },
        Q8: { Answer: ['B. Drop-down第二个选项'], Score: [4] },
        Q9: { Answer: ['B. Radio button第二个选项'], Score: [4] },
    },
    Stu2: {
        Q1: { Answer: ["A. True"], Score: [0] },
        Q2: { Answer: [4], Score: [0] },
        Q3: { Answer: ['azure subscription', 'azure account'], Score: [4] },
        Q4: { Answer: ['azure subscription', 'azure account'], Score: [0] },
        Q5: { Answer: ["B. False", ''], Score: [4] },
        Q6: { Answer: ["False"], Score: [0] },
        Q7: { Answer: [["What's your name?", "###"], ["What's your telephone number?", "Robbin"], ["What's your age?", "Twenty Three"], ["Where are you from?", "China"]], Score: [0] },
        Q8: { Answer: ['A. Drop-down第一个选项'], Score: [0] },
        Q9: { Answer: ['A. Radio button第一个选项'], Score: [0] },
    }
}

before(() => {
    let Q1 = {}, Q2 = {}, Q3 = {}, Q4 = {}, Sub_Q = {}, Q6 = {}, Q7 = {}, Q8 = {}, Q9 = {}
    let UseQuestions = []
    cy.fixture("questionInfo").then(($ques) => {
        let AllQuest = $ques
        Q1 = AllQuest[0]
        Q2 = AllQuest[1]
        Q3 = AllQuest[3]
        Q4 = AllQuest[4]
        Sub_Q = AllQuest[5]
        Q6 = AllQuest[6]
        Q7 = AllQuest[7]
        Q8 = AllQuest[11]
        Q9 = AllQuest[12]
        Sub_Q.questions[0] = Q1
        Sub_Q.questions[1] = AllQuest[2]
        Sub_Q.fullMarks = 10.5
        UseQuestions = [Q1, Q2, Q3, Q4, Sub_Q, Q6, Q7, Q8, Q9]
        for (let q = 0; q < UseQuestions.length; q++) {
            let questionItem = {
                order: 0,
                question: ""
            }
            questionItem.order = q + 1
            questionItem.question = UseQuestions[q]
            section_temp[0].questions.push(questionItem)
        }
        cy.log(section_temp)
    })

    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 4
    cy.CreateExamByAPI(examInfo, paperInfo)

    cy.fixture('MarkExamInfo.json').then(($data) => {
        ExamName = $data.examInfo.name
        ExamId = $data.examInfo.examId
        cy.log(ExamName)
    })

    let now = new Date()
    now.setMinutes(now.getMinutes() + examInfo.startOffset.off)
    examInfo.startTime = new Date(now.setSeconds(0)).toJSON()
    let end = now.setMinutes(now.getMinutes() + examInfo.startOffset.off + examInfo.duration)
    end = new Date(end).setSeconds(0)
    examInfo.endTime = new Date(end).toJSON()
    let ExamAndAnswer = { examInfo, paperInfo, AllStuResp }

    cy.writeFile("cypress/fixtures/MarkExamInfo.json", ExamAndAnswer)
})

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    let stus = env[ct].Candidates
    enrolList.push(stus[0])
    enrolList.push(stus[1])
})

before(() => {
    cy.readFile('cypress/fixtures/hotSpotExam.json').then(($data) => {
        hotspot_examName = $data[1]
        cy.log(hotspot_examName)
    })
})

// Prepare Exam and Take Exam
Given('Question 1 is a single choice question and question 2 is a multiple choice question', () => { });
And('Questions 3 and 4 are blank filling questions.Each question has two blanks.Question 3 is case insensitive and question 4 is case sensitive', () => { })
And('Question 5 is a sub question, under which there is a single choice and an essay', () => { })

// Scenario: Candidate1 Take Exam
Given('Candidate1 login search exam', () => {
    let stu1 = enrolList[0]
    cy.LoginByLocal(stu1.userid)
    Cypress.PageAdminCommon.visitExam(8000)
    Cypress.PageExamHome.searchExam(ExamName)
})
Then('Candidate1 enter the exam', () => {
    Cypress.PageStudentExam.enterExam(0)
    Cypress.PageStudentTakeExam.waitStartByTime(examInfo.startTime)
    Cypress.PageStudentTakeExam.startNow()
});
Then('Candidate1 answered question 1 correctly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(0)
    Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Stu1.Q1.Answer[0])
})
And('Candidate1 selected all the answers to question 2', () => {
    Cypress.PageStudentTakeExam.selectQuestion(1)
    let Q2res = AllStuResp.Stu1.Q2.Answer
    for (let r = 0; r < Q2res.length; r++) {
        let index = Q2res[r] - 1
        Cypress.PageStudentTakeExam.selectCheckBoxByIndex(index)
    }
})
And('Candidate1 answer to question 3 is incorrect, and the case is correct', () => {
    Cypress.PageStudentTakeExam.selectQuestion(2)
    let Q3Res = AllStuResp.Stu1.Q3.Answer
    cy.log(Q3Res)
    for (let r = 0; r < Q3Res.length; r++) {
        Cypress.PageStudentTakeExam.inputBlank(r, Q3Res[r])
    }
})
And('Candidate1 answer to question 4 is correct, and the case is correct', () => {
    Cypress.PageStudentTakeExam.selectQuestion(3)
    let Q4Res = AllStuResp.Stu1.Q4.Answer
    for (let r = 0; r < Q4Res.length; r++) {
        Cypress.PageStudentTakeExam.inputBlank(r, Q4Res[r])
    }
})
And('Candidate1 answered sub1 and sub2 of question 5 correctly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(4)
    Cypress.PageConductExam.switchSubQuestion(0)
    Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Stu1.Q1.Answer[0])
    Cypress.PageConductExam.switchSubQuestion(1)
    Cypress.PageStudentTakeExam.inputEassy(AllStuResp.Stu1.Q5.Answer[1])
    cy.wait(500)
})
And('Candidate1 answered question 6 correctly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(5)
    Cypress.PageStudentTakeExam.answerTrueOrFalse(0)
})
And('Candidate1 answered question 7 correctly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(6)
    let Q7Res = AllStuResp.Stu1.Q7.Answer
    for (let r = 0; r < Q7Res.length; r++) {
        cy.log(Q7Res[r[0]], Q7Res[r[1]])
        Cypress.PageStudentTakeExam.answerMatching(Q7Res[r][0], Q7Res[r][1])
    }
})
And('Candidate1 answered question 8 correctly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(7)
    Cypress.PageStudentTakeExam.verifyHotSpotContent(AllStuResp.Correct.Q8.Question)
    Cypress.auiCommon.clickDropdownListSelectItem(1)
})
And('Candidate1 answered question 9 correctly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(8)
    Cypress.PageStudentTakeExam.verifyHotSpotContent(AllStuResp.Correct.Q9.Question)
    Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Stu1.Q9.Answer[0])
})
Then('Candidate1 end the exam', () => {
    Cypress.PageStudentTakeExam.endExam()
    cy.logoutApi()
})

// Scenario: Candidate1 take hot spot question,order question
Given('Candidate1 enter hot spot exam', () => {
    Cypress.PageAdminCommon.visitExam(6000)
    Cypress.PageExamHome.searchExam(hotspot_examName)
    Cypress.PageStudentExam.enterExam(0)
    Cypress.PageStudentTakeExam.startNow(true)
})
Then('The verification question content is right', () => {
    Cypress.PageStudentTakeExam.verifyHotSpotContent(hotSpot_content)
})
And('The verification right tips is right', () => {
    Cypress.PageStudentTakeExam.verifyHotSpotTip(0, hotSpot_tips[0])
    Cypress.PageStudentTakeExam.verifyHotSpotTip(1, hotSpot_tips[1])
    Cypress.PageStudentTakeExam.verifyHotSpotTip(2, hotSpot_tips[2])
})
Then('Candidate1 correctly clicked three points', () => {
    cy.waitLoading()
    Cypress.PageStudentTakeExam.takeHotSpot(hotspotCorrectAnswer.circle[0], hotspotCorrectAnswer.circle[1])
    Cypress.PageStudentTakeExam.takeHotSpot(hotspotCorrectAnswer.square[0], hotspotCorrectAnswer.square[1])
    Cypress.PageStudentTakeExam.takeHotSpot(hotspotCorrectAnswer.drawing[0].dotX, hotspotCorrectAnswer.drawing[0].dotY)
})
Then('The verification question number is displayed in green', () => {
    Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(0)
})
// When('Candidate1 clicks on the next question to switch to order question', () => {
//     Cypress.PageStudentTakeExam.selectQuestion(1)
// })
// And('Candidate1 verifies that the content of the order question is correct', () => {
//     Cypress.PageStudentTakeExam.verifyHotSpotContent(order_content)
//     Cypress.PageStudentTakeExam.verifyOrderQueTip(order_tip)
// })
// And('Candidate1 answered the order question correctly', () => {
//     Cypress.PageStudentTakeExam.takeOrderQue('Egyptain')
// })
Then('Candidate1 ends the exam and logout', () => {
    Cypress.PageStudentTakeExam.endExam(true)
    cy.logoutApi()
})

// Scenario: Candidate2 Take Exam
Given('Candidate2 login', () => {
    let stu2 = enrolList[1]
    cy.LoginByLocal(stu2.userid)
    Cypress.PageAdminCommon.visitExam(6000)
    Cypress.PageExamHome.searchExam(ExamName)
});
Then('Candidate2 enter the exam', () => {
    Cypress.PageStudentExam.enterExam(0)
    // Cypress.PageStudentTakeExam.startByInstruc()
    Cypress.PageStudentTakeExam.startNow()
    cy.wait(1000)
});
Then('Candidate2 answered question 1 incorrectly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(0)
    Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Stu2.Q1.Answer[0])
})
And('Candidate2 chose only one option in question 2', () => {
    Cypress.PageStudentTakeExam.selectQuestion(1)
    let Q2res = AllStuResp.Stu2.Q2.Answer
    for (let r = 0; r < Q2res.length; r++) {
        let index = Q2res[r] - 1
        Cypress.PageStudentTakeExam.selectCheckBoxByIndex(index)
    }
});
And('Candidate2 answer to question 3 is correct but the case is incorrect', () => {
    Cypress.PageStudentTakeExam.selectQuestion(2)
    let Q3Res = AllStuResp.Stu2.Q3.Answer
    for (let r = 0; r < Q3Res.length; r++) {
        Cypress.PageStudentTakeExam.inputBlank(r, Q3Res[r])
    }
})
And('The answer to question 4 is correct but the case is incorrec', () => {
    Cypress.PageStudentTakeExam.selectQuestion(3)
    let Q4Res = AllStuResp.Stu2.Q4.Answer
    for (let r = 0; r < Q4Res.length; r++) {
        Cypress.PageStudentTakeExam.inputBlank(r, Q4Res[r])
    }
})
And('Candidate2 answered sub1 correctly but did not answer sub2', () => {
    Cypress.PageStudentTakeExam.selectQuestion(4)
    Cypress.PageConductExam.switchSubQuestion(0)
    Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Stu2.Q5.Answer[0])

    Cypress.PageConductExam.switchSubQuestion(1)
    //Cypress.PageStudentTakeExam.inputEassy(AllStuResp.Stu2.Q5.Answer[1])
})
And('Candidate2 answered question 6 incorrectly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(5)
    Cypress.PageStudentTakeExam.answerTrueOrFalse(1)
})
And('Candidate2 answered question 7 incorrectly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(6)
    let Q7Res = AllStuResp.Stu2.Q7.Answer
    for (let r = 0; r < Q7Res.length; r++) {
        cy.log(Q7Res[r[0]], Q7Res[r[1]])
        Cypress.PageStudentTakeExam.answerMatching(Q7Res[r][0], Q7Res[r][1])
    }
})
And('Candidate2 answered question 8 incorrectly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(7)
    Cypress.auiCommon.clickDropdownListSelectItem(0)
})
And('Candidate2 answered question 9 incorrectly', () => {
    Cypress.PageStudentTakeExam.selectQuestion(8)
    Cypress.PageStudentTakeExam.selectRadioByAnswer(AllStuResp.Stu2.Q9.Answer[0])
})
Then('Candidate2 end the exam', () => {
    Cypress.PageStudentTakeExam.endExam()
})

// Scenario: Candidate2 Take hot spot question,order question
Given('Candidate2 enter hot spot exam', () => {
    Cypress.PageAdminCommon.visitExam(6000)
    Cypress.PageExamHome.searchExam(hotspot_examName)
    Cypress.PageStudentExam.enterExam(0)
    Cypress.PageStudentTakeExam.startNow(true)
})
Then('Candidate2 clicked three points', () => {
    cy.waitLoading()
    Cypress.PageStudentTakeExam.takeHotSpot(0.1, 0.5)
    Cypress.PageStudentTakeExam.takeHotSpot(0.2, 0.6)
    Cypress.PageStudentTakeExam.takeHotSpot(0.3, 0.7)
})
And('Candidate2 deleted the first point', () => {
    Cypress.PageStudentTakeExam.delHotSpot(0)
})
Then('The verification question number is displayed in green', () => {
    Cypress.PageConductExam.verifyQuestionIndexAnsweredQuestion(0)
})
// When('Candidate2 clicks on the next question to switch to order question', () => {
//     Cypress.PageStudentTakeExam.selectQuestion(1)
// })
// And('Candidate2 answered the order question incorrectly', () => {
//     Cypress.PageStudentTakeExam.takeOrderQue('Egyptain')
// })
Then('Candidate2 end the exam', () => {
    Cypress.PageStudentTakeExam.endExam()
})