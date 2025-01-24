/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let UsertodayExamApi = '/schedule/api/exam/getuserdaycalenders'
let UserMonthExamApi = '/schedule/api/exam/getusermonthcalenders'
let fixturePath1 = 'Mock/MockStudentCalendarExam.json'
let candidate = "", calendarEvent = '', StudentRespJson = { examCalendarResult: [] }
let durtion = [30, 60, 120]

function assembleExamTime(_dur) {
    let today = new Date()
    let yy = today.getFullYear(), mm = today.getMonth(), dd = today.getDate()
    let hh = today.getHours(), min = today.getMinutes()
    return { start: new Date(yy, mm, dd, hh, min).toJSON(), end: new Date(yy, mm, dd, hh, min + _dur).toJSON() }
}
// 新建mock假考试
before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    let stu_list = env[ct].Candidates
    candidate = stu_list[0].userid
    cy.log(candidate)

    cy.fixture(fixturePath1).then(($cal) => {
        calendarEvent = $cal.examCalendarResult
        StudentRespJson.examCalendarResult = calendarEvent
        for (let i = 0; i < calendarEvent.length; i++) {
            cy.log(calendarEvent[i].examName)
            StudentRespJson.examCalendarResult[i].startDate = assembleExamTime(durtion[i]).start
            StudentRespJson.examCalendarResult[i].endDate = assembleExamTime(durtion[i]).end
        }
        cy.writeFile(`cypress/fixtures/${fixturePath1}`, StudentRespJson)
    })

})
// 新建new真实考试
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


//Student Homepage Calendar
Given(/^I have 3 Exams at Today$/, () => {
    cy.intercept('POST', UsertodayExamApi,
        {
            fixture: fixturePath1
        })
});
When(/^I login examena$/, () => {
    cy.LoginByLocal(candidate)
    cy.waitLoading()
});
Then(/^I Can see calendar selected Today by default$/, () => {
    let today = new Date().getDate()
    Cypress.PageCalendar.homeCalendarTable(0, today)
})
And(/^I can see 2 exams at most on right Panel$/, () => {
    Cypress.PageCalendar.homeCalendarPanelActiveItem([calendarEvent[0].examNameDisplay, calendarEvent[1].examNameDisplay])
})

//Scenario: Student Calendar page
Then(/^I should see 2 events at most on Calenad Cell, 3 items on right Panel$/, () => {
    //cy.intercept('POST', UserMonthExamApi, { fixture: fixturePath1 })
    cy.intercept('POST', UserMonthExamApi, (req) => {
        req.reply((res) => {
            res.send({ fixture: fixturePath1 })
        })
    })
    Cypress.PageAdminCommon.visitCalendar()
    Cypress.PageCalendar.EventCount(0, 2)
    Cypress.PageCalendar.VerifyPanelItem(calendarEvent[0].examNameDisplay, "0")
    Cypress.PageCalendar.VerifyPanelItem(calendarEvent[1].examNameDisplay, "1")
    Cypress.PageCalendar.VerifyPanelItem(calendarEvent[2].examNameDisplay, "2")
})
And('I Can See Exam Details by click today event', () => {
    Cypress.PageCalendar.selectCalItem(0, 0)

    let popInfo = {
        title: calendarEvent[0].examNameDisplay,
        examTime: calendarEvent[0].startDate,
        totalQuestions: calendarEvent[0].totalQuestions,
        fullMarks: calendarEvent[0].fullMarks
    }

    Cypress.PageCalendar.VerifyCalPopup(popInfo)

})
And('I Can See Exam Details by click Panels card', () => {
    Cypress.PageCalendar.PanelItemCount(3)
    Cypress.PageCalendar.selectPanelItem(2)
    let itemInfo = {
        title: calendarEvent[2].examNameDisplay,
        examTime: calendarEvent[2].startDate,
        totalQuestions: calendarEvent[2].totalQuestions,
        fullMarks: calendarEvent[2].fullMarks
    }
    Cypress.PageCalendar.VerifyCalPopup(itemInfo)
})

// Scenario: Student verify close book,have reading time,set a duration flexible exam
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
Then(/^I click the card on left cell$/, () => {
    Cypress.PageCalendar.selectCalItem(0, 0)
});
Then(/^I verify exam name,invigilator,exam time,sum duration,reading duration,answering duration,student number is right$/, () => {
    let itemInfo = {
        title: `${examInfo.courseCode} - UI-semester - ${examName} - UI-school - UI-discipline`,
        flexibleExam_openTime: flexibleExam_openTime,
        flexibleExam_endTime: flexibleExam_endTime,
        sum_duration: [examInfo.previewTime, examInfo.duration, sum_duration],
        totalQuestions: '1 question',
        fullMarks: '4 (total marks)'
    }
    Cypress.PageCalendar.VerifyCalPopup(itemInfo)
});

// Scenario: Student verify close book,no reading time,no answering duration flexible exam
Given(/^I create a close book,no reading time,have answering duration flexible exam$/, () => {
    examInfo.name = 'AT_Flexible_Cal_NoDur'
    examInfo.startOffset = { level: "min", off: 1 }
    examInfo.duration = 10
    examInfo.isOpenB = false
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
Then(/^I verify the exam card info$/, () => {
    let itemInfo = {
        title: `${examInfo.courseCode} - UI-semester - ${examName} - UI-school - UI-discipline`,
        flexibleExam_openTime: flexibleExam_openTime,
        flexibleExam_endTime: flexibleExam_endTime,
        totalQuestions: '1 question',
        fullMarks: '4 (total marks)',
        onlyHave_answeringDuration: examInfo.duration
    }
    Cypress.PageCalendar.VerifyCalPopup(itemInfo)
});

// Scenario: Student can collapse or expand the panel
Given(/^I collapse the panel$/, () => {
    Cypress.PageCalendar.collapsePanel()
});
When(/^I select the next day$/, () => {
    Cypress.PageCalendar.selectNextDay()
});
Then(/^I expand the panel$/, () => {
    Cypress.PageCalendar.expandPanel()
});
And(/^I verify the panel date is the next day$/, () => {
    Cypress.PageCalendar.verifyPanelTitleDate(new Date().getDate() + 1)
});