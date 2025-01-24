/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let examName = "", flexibleExam_duration = "", flexibleExam_openTime = "", flexibleExam_endTime = "", sum_duration = ""
let section_temp = [
    {
        name: "AT Section 1",
        description: "",
        order: 1,
        questions: [
            {
                order: 1,
                question: ""
            }
        ]
    }
]

let examInfo = {
    name: "ATExamCal",
    courseCode: "AT001",
    courseId: '',
    startOffset: { level: 'hh', off: 3 },
    startTime: "",
    duration: 20,
    // studentCount: 3,
    endTime: "",
    isOpenB: true,
    isSave2LocalFile: true,
    filePath: "calendar.json",
}
let paperInfo = {
    name: 'ATPaper_Cal',
    sections: section_temp
}

before(() => {
    cy.log('---> prepare Paper and Exam ...')
    cy.fixture("questionInfo").then(($ques) => {
        let allQuest = $ques
        cy.log(`${allQuest[0].Name}`)
        section_temp[0].questions[0].question = allQuest[0]
    })
})


// Scenario: Staff/Student View Published Exam on Calendar
Given(/^I have created a fixed time range exam$/, () => {
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/calendar.json').then(($data) => {
        examName = $data.examInfo.name
    })
});
Then(/^I login system as Exam Admin$/, () => {
    cy.LoginExamAsSystem(false)
    cy.wait(2500)
});
When(/^I Search the Published Exam on Calendar page$/, () => {
    Cypress.PageAdminCommon.visitCalendar()
    Cypress.PageCalendar.searchExamInCalendar(examName)
})
Then(/^I should see the Exam in the calendar cell and in the background$/, () => {
    Cypress.PageCalendar.VerifyCalItem(0, examName)
    Cypress.PageCalendar.VerifyPanelItem(examName)
});
When(/^I click the Exam name on calendar$/, () => {
    Cypress.PageCalendar.selectCalItem(0, 0)
    cy.wait(800)
});
Then(/^I Can see the Exam Details$/, () => {
    let popInfo = {
        title: examName
    }
    Cypress.PageCalendar.VerifyCalPopup(popInfo)
});


Then(/^I visit Examena Homepage$/, () => {
    Cypress.PageAdminCommon.visitHome(4000)
})
Then(/^I can see the published exam on homepage Calendar Event$/, () => {
    cy.logoutApi()
})

// Scenario: Staff Can Not see unPublished Exam on Calendar
When(/^I Click the view exam button, jump to Exam Page$/, () => {
    Cypress.PageAdminCommon.visitExam(5000)
});
Then(/^I find my Exam using searchbox$/, () => {
    Cypress.PageExamHome.selectDateFilterfixed('spdate', 0)
    Cypress.PageExamHome.searchExam(examName)
});
Then(/^I unpublished the exam just created$/, () => {
    Cypress.PageExamHome.unpublishCardExam(0)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
When(/^I Search the unpublished Exam on Calendar page$/, () => {
    Cypress.PageAdminCommon.visitCalendar()
    Cypress.PageCalendar.searchExamInCalendar(examName)
});
Then(/^I should not See the Exam on Calendar$/, () => {
    Cypress.PageCalendar.verifyNoItemsInPanel()
});

// Scenario: Staff verify flexible exam time range with set a durtion
Given(/^I create a close book,have reading time,set a duration flexible exam$/, () => {
    examInfo.name = 'AT_Flexible_Cal_HaveDur'
    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 5
    examInfo.isOpenB = false
    examInfo.previewTime = 5
    examInfo.examClassification = 1
    examInfo.deadline = 30
    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/calendar.json').then(($data) => {
        examName = $data.examInfo.name
        sum_duration = $data.examInfo.duration + $data.examInfo.previewTime
        flexibleExam_openTime = $data.examInfo.openTime
        flexibleExam_endTime = $data.examInfo.endTime
    })
});
When(/^I search the exam in calendar$/, () => {
    Cypress.PageCalendar.searchExamInCalendar(examName)
});
Then(/^I verify the right panel open time,answering duration,exam name is right$/, () => {
    let panel_info = {
        examname: examName,
        openTime: flexibleExam_openTime,
        flexibleExam_duration: examInfo.deadline
    }
    Cypress.PageCalendar.VerifyPanelItem(panel_info.examname, "0", panel_info.openTime, panel_info.flexibleExam_duration)
});
When(/^I click the card$/, () => {
    Cypress.PageCalendar.selectPanelItem(0)
});
Then(/^I verify exam name,invigilator,exam time,sum duration,reading duration,answering duration,student number is right$/, () => {
    let itemInfo = {
        title: `${examInfo.courseCode} - UI-semester - ${examName} - UI-school - UI-discipline`,
        flexibleExam_openTime: flexibleExam_openTime,
        flexibleExam_endTime: flexibleExam_endTime,
        sum_duration: [examInfo.previewTime, examInfo.duration, sum_duration],
        enrolledNumber: `3 enrolled`
    }
    Cypress.PageCalendar.VerifyCalPopup(itemInfo)
});

// Scenario: Staff verify flexible exam time range with no answering duration
Given(/^I create a open book,no reading,no answering duration flexible exam$/, () => {
    examInfo.name = 'AT_Flexible_Cal_NoDur'
    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 0
    examInfo.isOpenB = true
    examInfo.previewTime = 0
    examInfo.examClassification = 1
    examInfo.deadline = 10080
    Cypress.PageExamAttendance.examTime(examInfo.startOffset.off, examInfo.duration)
    cy.CreateExamByAPI(examInfo, paperInfo)
    cy.readFile('cypress/fixtures/calendar.json').then(($data) => {
        examName = $data.examInfo.name
        sum_duration = $data.examInfo.duration + $data.examInfo.previewTime
        flexibleExam_openTime = $data.examInfo.openTime
        flexibleExam_endTime = $data.examInfo.endTime
    })
});
Then(/^I verify the exam card info in right panel and show Start$/, () => {
    let panel_info = {
        examname: examName,
        openTime: flexibleExam_openTime,
        flexibleExam_duration: 'Start'
    }
    Cypress.PageCalendar.VerifyPanelItem(panel_info.examname, "0", panel_info.openTime, panel_info.flexibleExam_duration)
});
Then(/^I verify exam name,invigilator,exam time,student number,reading duration,no answering duration is right$/, () => {
    let itemInfo = {
        title: `${examInfo.courseCode} - UI-semester - ${examName} - UI-school - UI-discipline`,
        flexibleExam_openTime: flexibleExam_openTime,
        flexibleExam_endTime: flexibleExam_endTime,
        enrolledNumber: `3 enrolled`,
        noAnsweringDuration: false
    }
    Cypress.PageCalendar.VerifyCalPopup(itemInfo)
});    