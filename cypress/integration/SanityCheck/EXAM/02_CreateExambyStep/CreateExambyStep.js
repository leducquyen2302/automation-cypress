/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let user = '', stu_list = []
const examMessage = {
    noInvigilatorMessage: 'Enter a value to proceed.',
    paperNoCompleted: 'The exam cannot be published since the paper has not been completed.',
    noCandidateMessage: 'Enrol at least one candidate.'
}
let examObj = {
    name: 'ATExamStep' + new Date().toJSON(),
    courseCode: 'AT001',
    instruc: 'Long Text Area Instruction to Candidates! \rGood Luck:) ',
    invigilator: '',
    examPaperName: 'paper' + new Date().toJSON()
}

let date = new Date()
let currentHour = date.getHours(), currentMinute = date.getMinutes()
let ExamafterMinute = 8
let Examduration = 40

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)

    stu_list = env[ct].Candidates
    user = env[ct].CM
    examObj.invigilator = env[ct].Invigilator1
    cy.log(`loggin with ${user.loginid}`)
})

//Scenario: Set Up Exam basic Information though Exam Page
Given(/^login as Course Manager, visit Exam page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.visitExam(5000)
})
Then(/^I opening the Exam create Page$/, () => {
    Cypress.PageExamHome.clickCreateExam()
    Cypress.auiCommon.verifyUrl('include', '/create?')
});
Then(/^I Input Exam name and Course$/, () => {
    Cypress.PageExamCreate.inputExamNameWithCode(examObj.name)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
    Cypress.PageExamCreate.chooseExamType(1)
    Cypress.PageExamCreate.closeOnlineProctoring()
});
Then(/^I verify course display is right$/, () => {
    Cypress.PageExamCreate.verifyStep1Course('AT001 (AutoTesting Programme 1 - UI-semester - UI-school - UI-discipline)') 
});
Then(/^I Set Exam start time at 9 PM today and type Instruction$/, () => {
    // Cypress.PageExamCreate.examStartTime(0, 22, 59)
    Cypress.PageExamCreate.examStartTime(0, currentHour, currentMinute, ExamafterMinute)
    Cypress.PageExamCreate.examEndTime(0, currentHour, currentMinute, ExamafterMinute, Examduration)
    Cypress.PageExamCreate.examInstruction(examObj.instruc)
});
Then(/^I click save and close$/, () => {
    Cypress.PageExamCreate.saveCloseForm()
    cy.waitLoading()
});

//Scenario: Step1 保存之后，Exam Card状态应该是Waiting for assigning invigilators
When(/^I search the exam$/, () => {
    cy.wait(1500)
    examObj.name = Cypress.env('tempExamName')
    cy.log(examObj)
    Cypress.PageExamHome.searchExam(examObj.name)
});
Then(/^Exam Card的状态是Waiting for assigning invigilators$/, () => {
    let examInfo = {
        title: examObj.name,
        titleSta: 'Before exam',
        examTime: new Date().getTime(),
        candidates: 6,
        sta: {
            step: 1,
            descrip: 'Waiting for assigning invigilators'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

// Scenario: No students can't save in step2
Given(/^I click edit exam$/, () => {
    Cypress.PageExamHome.editExam(0)
    Cypress.PageExamCreate.verifyStep(1)
});
Then(/^I remove all students$/, () => {
    Cypress.PageAdminQuickLink.checkAll()
    Cypress.PageExamCreate.removeCandidate()
});
When(/^I click save and next$/, () => {
    Cypress.PageExamCreate.saveNextForm()
});
Then(/^I can see must have candidate toast$/, () => {
    Cypress.auiCommon.verifyToast(examMessage.noCandidateMessage)
});

// Scenario: Step2 保存之后,Exam Card状态应该是Waiting for generating paper
Given(/^Add all candidates$/, () => {
    Cypress.PageExamCreate.addCandidate(0)
});
Then(/^Exam Card的状态是Waiting for generating paper$/, () => {
    let examInfo = {
        title: examObj.name,
        titleSta: 'Before exam',
        candidates: 6,
        sta: {
            step: 2,
            descrip: 'Waiting for generating paper'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

//Scenario: Can not publish the exam with the draft paper
Given(/^I am in Generate Paper page$/, () => {
    Cypress.PageExamHome.editExam(0)
    Cypress.PageExamCreate.verifyStep(2)
});
Then(/^I click Create Paper directly and save as draft$/, () => {
    Cypress.PageExamCreate.examCreatePaperDirectly(examObj.examPaperName, false)
});
And(/^I should see status is draft$/, () => {
    Cypress.PageExamCreate.verifyPaperStatus('Draft')
});
Then(/^I can't publish the exam with the draft paper$/, () => {
    Cypress.PageExamCreate.clickPublish()
    Cypress.auiCommon.verifyToast(examMessage.paperNoCompleted)
});

//Scenario: Step3 保存之后，Exam Card状态应该是Exam Published
Then(/^Exam Card的状态是Waiting for publishing$/, () => {
    let examInfo = {
        title: examObj.name,
        titleSta: 'Before exam',
        candidates: 6,
        sta: {
            step: 3,
            descrip: 'Waiting for publishing'
        }
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});

//Scenario: Edit paper in exam and publish exam
Then(/^I publish exam and edit exam in dialog$/, () => {
    Cypress.PageExamCreate.clickPublish()
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^I remove paper$/, () => {
    Cypress.PageSampleExamCreate.clickRemovePaper()
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^I add another paper$/, () => {
    // cy.CreatePaperApi(examObj.courseCode, examObj.name, section_temp)
    // Cypress.PageSampleExamCreate.addPaperFromBank(examObj.name)
    cy.readFile('cypress/fixtures/hotSpotExam.json').then(($data) => {
        let paperName = $data[0]
        Cypress.PageSampleExamCreate.addPaperFromBank(paperName)
    })
});
Then(/^I publish exam$/, () => {
    cy.appendfixtureData('hotSpotExam.json', examObj.name, true)
    cy.appendfixtureData('hotSpotExam.json', examObj.examTime, true)
    Cypress.PageExamCreate.examPublish()
});