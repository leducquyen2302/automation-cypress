/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let basicInfo = []
let date = new Date()
let yy = date.getFullYear(), mm = date.getMonth(), dd = date.getDate()
let time = {
    openTime: new Date(yy, mm, dd, 22, 30, 0),
    deadline: new Date(yy, mm, dd, 23, 30, 0),
}
const validationMessage = {
    requiredFields: 'Enter a value to proceed.',
    requiredCourse: 'Select a course.',
    requiredDuration: 'Enter an integer greater than zero to proceed.',
}
let examObj = {
    name: 'ATExam_Flexible_Duration' + date.toJSON(),
    courseCode: 'AT002',
    examPaperName: 'Flexible_Paper' + date.toJSON()
}
let examObj1 = {
    name: 'ATExam_Flexible_NoDuration' + date.toJSON(),
    courseCode: 'AT002',
    examPaperName: 'Flexible_Paper_NoDuration' + date.toJSON()
}
let cm = '', stu_list = []

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
            }
        ]
    }
]
let Question1 = ''
before(() => {
    cy.fixture("questionInfo").then(($ques) => {
        Question1 = $ques[0]
        section_temp[0].questions[0].question = Question1
    })
})

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    cm = env[ct].Candidates[5].name
    stu_list = env[ct].Candidates
})

//Scenario: Create flexible time range exam
Given(/^I am login in as Course manager$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.visitExam(8000)
})
Then(/^I am in create exam step1$/, () => {
    Cypress.PageExamHome.clickCreateExam()
    Cypress.auiCommon.verifyUrl('include', '/create?')
});
Then(/^I verify Exam classification and default$/, () => {
    Cypress.PageExamCreate.verifyClassification()
    Cypress.PageExamCreate.verifyDefaultClassification()
});
When(/^I choose Flexible time range$/, () => {
    Cypress.PageExamCreate.chooseFlexibleTime()
});
Then(/^I verify duration is 60$/, () => {
    Cypress.PageExamCreate.verifyAnsweringDuration('60')
});
When(/^I set open time,deadline$/, () => {
    Cypress.PageExamCreate.examOpenTime(0, 22, 30)
    Cypress.PageExamCreate.examDeadline(0, 23, 30)
});
Then(/^I set reading time$/, () => {
    Cypress.PageExamCreate.setReadingTime()
});
And(/^I verify open time,deadline is invariant$/, () => {
    // Cypress.PageExamCreate.verifyOpenTimeAndDeadline()
});
When(/^I clear duration and click next$/, () => {
    Cypress.PageExamCreate.inputAnsweringDuration()
    Cypress.PageExamCreate.saveNextForm(true)
});
Then(/^I verify exam name,course,answering duration is required field$/, () => {
    Cypress.PageExamCreate.verifyValidation(0, validationMessage.requiredFields)
    Cypress.PageExamCreate.verifyValidation(2, validationMessage.requiredCourse)
    Cypress.PageExamCreate.verifyValidation(5, validationMessage.requiredDuration)
});
Then(/^I input all info and choose open-book$/, () => {
    Cypress.PageExamCreate.inputExamName(examObj.name)
    Cypress.PageExamCreate.inputCourse(examObj.courseCode)
    Cypress.PageExamCreate.inputAnsweringDuration(30)
    Cypress.PageExamCreate.chooseExamType(1)
});
When(/^I click next$/, () => {
    Cypress.PageExamCreate.saveNextForm()
});
Then(/^I verify Exam time,Reading duration,Answering duration,Course name,Exam classification$/, () => {
    Cypress.PageExamCreate.expandBasicInfo()
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        classification: 'Flexible time range',
        readingDuration: '15',
        answeringDuration: '30',
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
});
And(/^I verify student number is 3$/, () => {
    Cypress.PageSampleReport.verifyStudentNumber(3)
});
And(/^I verify student1 all columns not have class column$/, () => {
    let student001_Info = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 1,
            //     display: 'Candidate name',
            //     value: stu_list[3].name
            // },
            {
                index: 2,
                display: 'Team',
                value: ''
            },
            {
                index: 5,
                display: 'Reading duration',
                value: '15 minutes'
            },
            {
                index: 6,
                display: 'Answering duration',
                value: '30 minutes'
            },
            // {
            //     index: 8,
            //     display: 'Invigilator',
            //     value: cm
            // },
        ]
    }
    Cypress.auiCommon.verifyTable(student001_Info)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 2, stu_list[3].name)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 9, cm)
    Cypress.auiCommon.verifyTimeInTable(1, 5, time.openTime)
    Cypress.auiCommon.verifyTimeInTable(1, 8, time.deadline)
});
And(/^I verify there is not edit time button$/, () => {
    Cypress.PageExamCreate.verifyInvigilatorSubTitleBtnLength(5)
});
And(/^I verify there is not class filter$/, () => {
    Cypress.auiCommon.verifyFilterNumber(2)
});
And(/^I click save and close$/, () => {
    Cypress.PageExamCreate.saveCloseForm()
});

// Scenario: Edit flexible time range exam
When(/^I search the exam and edit exam$/, () => {
    Cypress.PageExamHome.searchExam(examObj.name)
    Cypress.PageExamHome.editExam(0)
});
Then(/^I am goto step1 and I verify exam name,open time,deadline,answering duration,exam type$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(0)
    // Cypress.PageExamCreate.verifyOpenTimeAndDeadline()
    Cypress.PageExamCreate.verifyAnsweringDuration('30')
    Cypress.PageExamCreate.verifyExamType(1, 'Open-book')
});
When(/^I replace with fixed time range$/, () => {
    Cypress.PageExamCreate.chooseFixedTime()
});
Then(/^I verify start time,end time,exam type no changed$/, () => {
    Cypress.PageExamCreate.verifyExamType(0, 'Open-book')
    // Cypress.PageExamCreate.verifyFixedReadingStep1Time('2022-06-01T14:30:00.000Z', '2022-06-01T15:15:00.000Z')
});
When(/^I replace with flexible time range$/, () => {
    Cypress.PageExamCreate.chooseFlexibleTime()
});
Then(/^I am in step3$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(2)
});
And(/^I verify Exam time,Reading duration,Answering duration,Course name,Exam classification,Enrolled candidates,Invigilator$/, () => {
    Cypress.PageExamCreate.expandBasicInfo()
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        classification: 'Flexible time range',
        readingDuration: '15',
        answeringDuration: '30',
        enrolledCandidate: 3,
        // invigilator: cm,
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
    Cypress.PageExamCreate.verifyBasicInfoName(cm)
});
And(/^I publish exam$/, () => {
    cy.CreatePaperApi(examObj.courseCode, examObj.examPaperName, section_temp)
    Cypress.PageSampleExamCreate.addPaperFromBank(examObj.examPaperName)
    Cypress.PageExamCreate.examPublish()
});

// Scenario: Verify exam page
When(/^I filter Flexible time range$/, () => {
    Cypress.PageExamHome.filterFlexible()
});
Then(/^I search the exam$/, () => {
    Cypress.PageExamHome.searchExam(examObj.name)
});
And(/^I verify sum duration$/, () => {
    Cypress.PageExamHome.verifySumDuration()
});
And(/^I verify tooltip have reading duration and answering duration$/, () => {
    Cypress.PageExamHome.verifyReadAndAnsDuration()
});
And(/^I can unpublish the exam$/, () => {
    Cypress.PageExamHome.unpublishExam()
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

// Scenario: Create flexible time range, open book, no answering duration, 999 attempts
Given(/^I create exam and choose flexible time range$/, () => {
    Cypress.PageExamHome.clickCreateExam()
    Cypress.PageExamCreate.chooseFlexibleTime()
});
Then(/^I can see default is set a duration and cannot edit,duration is 60 minutes$/, () => {
    Cypress.PageExamCreate.verifyAnswerDurationList('Set a duration', 'true')
    Cypress.PageExamCreate.verifyAnsweringDuration(60)
});
When(/^I choose open book$/, () => {
    Cypress.PageExamCreate.chooseExamType(1)
});
Then(/^I can see default is set a duration and duration is 60 minutes$/, () => {
    Cypress.PageExamCreate.verifyAnswerDurationList('Set a duration')
    Cypress.PageExamCreate.verifyAnsweringDuration(60)
});
And(/^I edit duration is 30 minutes$/, () => {
    Cypress.PageExamCreate.editAnsweringDuration(30)
});
When(/^I choose no answering duration$/, () => {
    Cypress.PageExamCreate.chooseAnsweringDuration(1)
});
Then(/^I can see answering duration input cannot edit$/, () => {
    Cypress.PageExamCreate.verifyNoDurationDisabled()
});
When(/^I choose closed book$/, () => {
    Cypress.PageExamCreate.chooseExamType(0)
});
Then(/^I can see set a duration and can not edit$/, () => {
    Cypress.PageExamCreate.verifyAnswerDurationList('Set a duration', 'true')
});
And(/^I can see answering duration is 30 minutes$/, () => {
    Cypress.PageExamCreate.verifyAnsweringDuration(30)
});
Then(/^I choose open book and no answering duration$/, () => {
    Cypress.PageExamCreate.chooseExamType(1)
    Cypress.PageExamCreate.chooseAnsweringDuration(1)
});
Then(/^I choose open book,no reading book,no answering duration$/, () => {
    Cypress.PageExamCreate.chooseExamType(1)
    Cypress.PageExamCreate.noReadingTime()
    Cypress.PageExamCreate.chooseAnsweringDuration(1)
});
Then(/^I input 999 attempts$/, () => {
    Cypress.PageExamCreate.editAttempts(999)
});
And(/^I input all info$/, () => {
    Cypress.PageExamCreate.inputExamName(examObj1.name)
    Cypress.PageExamCreate.inputCourse(examObj1.courseCode)
    Cypress.PageExamCreate.examOpenTime(0, 22, 30)
    Cypress.PageExamCreate.examDeadline(0, 23, 30)
});
And(/^I click save and close$/, () => {
    Cypress.PageExamCreate.saveCloseForm()
});
When(/^I search the exam and edit it$/, () => {
    Cypress.PageExamHome.searchExam(examObj1.name)
    Cypress.PageExamHome.editExam(0)
});
Then(/^I goto step1 and verify echo no answering duration$/, () => {
    Cypress.PageExamCreate.leftNavigationTo(0)
    Cypress.PageExamCreate.verifyAnswerDurationList('No answering duration')
});
And(/^I verify step2 basic info with no answering duration$/, () => {
    Cypress.PageExamCreate.expandBasicInfo()
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        classification: 'Flexible time range',
        readingDuration: 'N/A',
        answeringDuration: 'N/A',
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
});
And(/^I verify step3 basic info with no answering duration$/, () => {
    Cypress.PageExamCreate.expandBasicInfo()
    let exanInfo = {
        firstOrganization: ['School', 'UI-school'],
        secondOrganization: ['Discipline', 'UI-discipline'],
        semester: ['Semester', 'UI-semester'],
        courseName: examObj.courseCode,
        classification: 'Flexible time range',
        readingDuration: 'N/A',
        answeringDuration: 'N/A',
        enrolledCandidate: 3,
        // invigilator: cm,
    }
    Cypress.PageExamCreate.verifyExamBasicValue(exanInfo)
    Cypress.PageExamCreate.verifyBasicInfoName(cm)
});
And(/^I verify the score publishing title and tip is right$/, () => {
    Cypress.PageExamCreate.verifyPublishScoreTitle()
    Cypress.PageExamCreate.verifyNoPaperScoreTip()
});
When(/^I create paper directly and add paper$/, () => {
    cy.CreatePaperApi(examObj1.courseCode, examObj1.examPaperName, section_temp)
    Cypress.PageSampleExamCreate.addPaperFromBank(examObj1.examPaperName)
});
Then(/^I can see score publishing info$/, () => {
    Cypress.PageExamCreate.verifyHaveScorePublishingInfo('No')
});
When(/^I remove paper$/, () => {
    Cypress.PageSampleExamCreate.clickRemovePaper(true)
});
Then(/^I can see the score publishing tip is right$/, () => {
    Cypress.PageExamCreate.verifyNoPaperScoreTip()
});
When(/^I add paper from bank$/, () => {
    Cypress.PageSampleExamCreate.addPaperFromBank(examObj1.examPaperName)
});
Then(/^I publish the no answering duration exam$/, () => {
    Cypress.PageExamCreate.examPublish()
});
When(/^I search the no answering duration exam$/, () => {
    Cypress.PageExamHome.searchExam(examObj1.name)
});
Then(/^I verify the exam card info is right$/, () => {
    let examInfo = {
        title: examObj1.name,
        titleSta: 'Before exam',
        examTime: date.getTime(),
        candidates: 3,
        sta: {
            step: 4,
            descrip: 'Exam published'
        },
        noAnsweringDuration: true
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, examInfo)
});
When(/^I enter the attendance page$/, () => {
    Cypress.PageExamAttendance.enterAttendance_examing()
});
// Then(/^I verify all column$/, () => {
//     let candiInfo = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Candidate name',
//                 value: stu_list[3].name,
//             }, 
//             {
//                 index: 3,
//                 display: 'Attempted / Attempts allowed',
//                 value: '0 / 999',
//             }
//         ]
//     }
//     Cypress.auiCommon.verifyTable(candiInfo)
//     Cypress.auiCommon.verifyTimeInTable(1, 12, time.deadline)
// });
When(/^I verify edit publish settings is disabled$/, () => {
    Cypress.PageExamCreate.clickScorePublishingEdit()
    Cypress.PageExamCreate.verifyEditPublishSettingsDisabled()
})