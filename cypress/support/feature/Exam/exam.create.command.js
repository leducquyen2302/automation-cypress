/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiButtonClass, auiPopup, auiShadowTag, auiFilterCommon, auiDialogClass, auiCalendar, auiCommonClass, auiTableClass, auiComboboxClass, auiOptionList, auiPanelClass, auiDateFilter } from '../../AUI/aui.common.constants'
import { adminApplicationClass, adminAccountClass, adminGlobalLinks, adminMarkingSettingsClass, adminCourseClass } from '../../AUI/admin.constants'
import { examClass, examStudentClass, examAttendanceClass, examGradeClass, sampleExamClass } from '../../AUI/exam.constants'
import { bankClass } from '../../AUI/bank.constants'
import { ifElse } from 'ramda'

const examWizard = [
    {
        index: 0,
        name: 'Set up basic information',
    },
    {
        index: 1,
        name: 'Assign invigilators',
    },
    {
        index: 2,
        name: 'Generate paper',
    },
    {
        index: 3,
        name: 'Attendance',
    },
    {
        index: 4,
        name: 'Marking progress',
    },
    {
        index: 5,
        name: 'Grading progress',
    }
]

Cypress.PageExamCreate = Cypress.PageExamCreate || {};

Cypress.PageExamCreate.inputExamName = (_value) => {
    cy.contains('Exam name')
        .next()
        .as('name')
    Cypress.auiCommon.inputTextByLabel('@name', _value)
}
Cypress.PageExamCreate.inputExamNameWithCode = (_name) => {
    cy.contains('Exam name')
        .next()
        .find('input')
        .as('name')
    return cy.ExamTimeCodeName('@name', _name)
}
Cypress.PageExamCreate.inputCourse = (_value) => {
    cy.contains('Course')
        .next()
        .click({ force: true })
        .wait(2000)
    Cypress.auiCommon.comboSearchBox(_value)
};
Cypress.PageExamCreate.verifyStep1Course = (_value) => {
    cy.contains('Course')
        .next()
        .find(auiComboboxClass.auiComboShellContent)
        .should('contain', _value)
};
// Fixed exam
Cypress.PageExamCreate.examStartTime = (_day, _hour, _minute, _afterMinute) => {
    if (_afterMinute) {
        if (_minute < 60 - _afterMinute) {
            _minute = _minute + _afterMinute
            cy.contains('Answering start time').next().click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
        }
        else {
            _minute = _minute + _afterMinute - 60
            cy.contains('Answering start time').next().click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour + 1, _minute)
        }
    }
    else {
        cy.contains('Answering start time').next().click({ force: true })
        cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
        return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
    }
}
Cypress.PageExamCreate.examEndTime = (_day, _hour, _minute, _afterMinute, _duration) => {
    if (_afterMinute) {
        if (_minute > 60 - _afterMinute + _duration) {
            _minute = _minute + _afterMinute + _duration
            cy.contains('Answering end time').next().click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
        }
        else {
            if (_minute + _afterMinute + _duration < 60) {
                _minute = _minute + _afterMinute + _duration
                cy.contains('Answering end time').next().click({ force: true })
                cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
                return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
            }
            else {
                _minute = _minute + _afterMinute + _duration - 60
                cy.contains('Answering end time').next().click({ force: true })
                cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
                return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour + 1, _minute)
            }
        }
    }
    else {
        cy.contains('Answering end time').next().click({ force: true })
        cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
        return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
    }
}
// Flexible / oral exam
Cypress.PageExamCreate.examStartTime_flexible = (_day, _hour, _minute, _afterMinute) => {
    if (_afterMinute) {
        if (_minute < 60 - _afterMinute) {
            _minute = _minute + _afterMinute
            cy.contains('Exam open time').next().click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
        }
        else {
            _minute = _minute + _afterMinute - 60
            cy.contains('Exam open time').next().click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour + 1, _minute)
        }
    }
    else {
        cy.contains('Exam open time').next().click({ force: true })
        cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
        return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
    }
}
Cypress.PageExamCreate.examEndTime_flexible = (_day, _hour, _minute, _afterMinute, _duration) => {
    if (_afterMinute) {
        if (_minute > 60 - _afterMinute + _duration) {
            _minute = _minute + _afterMinute + _duration
            cy.get(examClass.createExamEnddateLabel).next().click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
        }
        else {
            if (_minute + _afterMinute + _duration < 60) {
                _minute = _minute + _afterMinute + _duration
                cy.get(examClass.createExamEnddateLabel).next().click({ force: true })
                cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
                return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
            }
            else {
                _minute = _minute + _afterMinute + _duration - 60
                cy.get(examClass.createExamEnddateLabel).next().click({ force: true })
                cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
                return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour + 1, _minute)
            }
        }
    }
    else {
        cy.get(examClass.createExamEnddateLabel).next().click({ force: true })
        cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
        return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
    }
}
Cypress.PageExamCreate.setReadingTime = () => {
    cy.contains('Reading time')
        .next().click({ force: true })
    cy.contains('Set reading time before exam').click({ force: true })
    // cy.get(examClass.examReadingTimeLabel).click({ force: true })
}
Cypress.PageExamCreate.noReadingTime = () => {
    cy.contains('Reading time')
        .next().click({ force: true })
    cy.contains('No reading time').click({ force: true })
}
Cypress.PageExamCreate.examReadingStartTime = (_day, _hour, _minute) => {
    cy.contains('Reading start time')
        .next().click({ force: true })
    cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
    return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
}
Cypress.PageExamCreate.examReadingEndTime = (_day, _hour, _minute) => {
    cy.contains('Answering end time')
        .next().click({ force: true })
    cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
    return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
}
Cypress.PageExamCreate.examMode = (_value) => {

}
Cypress.PageExamCreate.examType = (_value) => {

}
Cypress.PageExamCreate.examInstruction = (_value) => {
    cy.get(examStudentClass.auiMutiLineText)
        .type(_value)
}
Cypress.PageExamCreate.examVideoOpt = (_opt) => {

}
Cypress.PageExamCreate.examURLOpt = (_opt) => {

}
Cypress.PageExamCreate.examAppOpt = (_opt) => {

};
Cypress.PageExamCreate.examVerifyRestricitionMinutes = (_value) => {
    cy.get(examClass.examRestricitionId + auiCommonClass.auiInputTarget)
        .should('have.attr', 'value', _value)
};
Cypress.PageExamCreate.examVerifyNoRestricition = () => {
    cy.contains('Exam entrance restriction')
        .next()
        .should('contain', 'No restriction')
};
Cypress.PageExamCreate.examVerifyKeyCodeMinutes = (_value) => {
    cy.get(examClass.keyCodeId + auiCommonClass.auiInputTarget)
        .should('have.attr', 'value', _value)
};
Cypress.PageExamCreate.enrolCandidateByid = (_value) => {
    if (_value === 'all') {
        cy.get(examClass.examCandidateLeftPanel)
            .contains('Select all')
            .click({ force: true })
        cy.get(examClass.examCandidateMidPanel + 'div')
            .click({ force: true })
            .wait(2000)
    } else {
        for (let i = 0; i < _value.length; i++) {
            cy.get(auiCommonClass.auiSearchBoxInput)
                .clear({ force: true })
                .type(_value[i], { delay: 25 })
                .type('{enter}')
            cy.get(examClass.examPendingCandidate)
                .click({ force: true })
            cy.get(examClass.examCandidateMidPanel + 'div')
                .click({ force: true })
                .wait(2000)
        }
    }
}
Cypress.PageExamCreate.saveCloseForm = () => {
    cy.wait(500)
    cy.get(examClass.saveCloseBtn)
        .click({ force: true })
        .waitLoading()
}
Cypress.PageExamCreate.backForm = () => {
    cy.get(examClass.backBtn)
        .eq(0)
        .click({ force: true })
    cy.wait(3000)
}
Cypress.PageExamCreate.saveNextForm = (_verifyRequirements) => {
    let save = examClass.saveNextBtn
    Cypress.auiCommon.clickBtn(save)
    // cy.get(examClass.saveNextBtn).click()
    if (_verifyRequirements) {
    }
    else {
        cy.waitNoElement('.hide-scrollbar')
            .wait(2000)
    }
}
Cypress.PageExamCreate.publishExam = () => {
    let publish = examClass.publishBtn
    Cypress.auiCommon.clickBtn(publish)
}
Cypress.PageExamCreate.editInvigilatorList = () => {
    cy.get(auiCommonClass.auiSelectAll).click({ force: true })
    cy.get(examClass.examAssignInvigilator).click({ force: true })
    cy.waitLoading()
}
Cypress.PageExamCreate.assignInvigilator = (_num, _btnName) => {
    cy.waitLoading()
    cy.get(examClass.examAssignInvigilator)
        .click({ force: true })
    cy.get(auiButtonClass.auiPopupBodyBtn)
        .eq(_num)
        .as('popupBtn')
    if (_btnName) {
        cy.get('@popupBtn')
            .should('contain', _btnName)
    }
    cy.get('@popupBtn')
        .click({ force: true })
        .waitLoading()
}
Cypress.PageExamCreate.leftNavigationTo = (_index) => {
    cy.waitLoading()
        .wait(500)
    let step = examWizard[_index]
    cy.get(auiCommonClass.auiNaviIcon)
        .parent()
        .eq(step.index)
        .click()
        .wait(2000)
    if (_index == 1) {
        cy.waitElement(auiShadowTag.auiProfile)
    }
}
Cypress.PageExamCreate.removeInvig = (_num) => {
    cy.get(adminAccountClass.closePropertyBtn)
        .eq(_num)
        .click()
}
Cypress.PageExamCreate.saveInvig = () => {
    let save = auiPanelClass.auiPanelVisible + auiButtonClass.saveBtn
    Cypress.auiCommon.clickBtn(save)
    cy.wait(1000)
    cy.get('body').then($body => {
        if ($body.find(`${auiPanelClass.auiPanelVisible + auiPanelClass.auiPanelFooter} button`).length > 0) {
            Cypress.auiCommon.clickBtn(save, 2000)
        }
    })
    cy.wait(1000)
}
Cypress.PageExamCreate.inputInvig = (_value) => {
    const invig = examClass.invigInput
    Cypress.auiCommon.comboBoxInput(invig, _value)
}
Cypress.PageExamCreate.createExam = (_examInfo, _paper) => {
    Cypress.PageExamCreate.inputExamName()
    Cypress.PageExamCreate.inputCourse()
    //Exam Type
    if (_examInfo.isOpenB) {
        cy.contains('Type')
            .next().click({ force: true })
        cy.get('#aui_optionlist_optionlist_2 [aria-label="Open-book"]').click({ force: true })
    } else {
        //Switch Online Video button
        cy.contains('Online video').as('video')
        cy.get('@video').parent().parent().next().find('[role=switch]').click({ force: true })
    }
    if (_examInfo.instruc) {
        Cypress.PageExamCreate.examInstruction()
    }
    Cypress.PageExamCreate.saveNextForm()
    Cypress.PageExamCreate.enrolCandidateByid('all')
    Cypress.PageExamCreate.saveNextForm()
    Cypress.PageExamCreate.saveNextForm()
}


// Verification Command 
Cypress.PageExamCreate.verifyStep = (_step) => {
    cy.wait(600)
    let step = examWizard[_step]
    cy.get(examClass.examStepText)
        .eq(step.index)
        .should('contain', step.name)
    cy.wait(3000)
}
Cypress.PageExamCreate.verifyInvigilatorTable = (_invigInfo) => {
    Cypress.auiCommon.verifyTable(_invigInfo)
}
Cypress.PageExamCreate.verifyExamBasicValue = (_info) => {
    // Cypress.PageExamCreate.expandBasicInfo()
    if (_info.examClassification == 'Flexible') {
        if (_info.examTime) {
            cy.get('[aria-label="Exam time"]')
                .should('contain', 'Exam time')
            cy.get('[aria-label="Exam time"]')
                .next()
                .compareEosTimeFormat(_info.examTime.start)
                .compareEosTimeFormat(_info.examTime.end)
        }
        if (_info.readingDuration) {
            cy.get('[aria-label="Reading duration"]')
                .should('contain', 'Reading duration')
            cy.get('[aria-label="Reading duration"]')
                .next()
                .should('contain', _info.readingDuration + ' minutes')
        }
        if (_info.answeringDuration) {
            cy.get('[aria-label="Answering duration"]')
                .should('contain', 'Answering duration')
            cy.get('[aria-label="Answering duration"]')
                .next()
                .should('contain', _info.answeringDuration + ' minutes')
        }
    }
    if (_info.readingTime) {
        cy.get('[aria-label="Reading time"]')
            .should('contain', 'Reading time')
        if (_info.readingTime.exist) {
            // 时间相关先不写
            // cy.get(examClass.examBasicInfoContent + auiCommonClass.auiBox)
            //     .eq(3)
            //     .then($time => {
            //             let startTime = time.split(' - ')[0]
            //         cy.compareEosDateFormat()
            //     })
            //     // .invoke('text'.split(' - '))
            //     .compareEosDateFormat(_info.examTime.start[0])
            //     .compareEosTimeFormat(_info.examTime.start[1])
            // // .compareEosDateFormat(_info.examTime.end)
            // // .compareEosTimeFormat(_info.examTime.end)
        }
        else {
            cy.get('[aria-label="Reading time"]')
                .next()
                .should('contain', 'N/A')
        }
    }
    if (_info.firstOrganization) {
        cy.get('[aria-label="School"]')
            .should('contain', _info.firstOrganization[0])
        cy.get('[aria-label="School"]')
            .next()
            .should('contain', _info.firstOrganization[1])
    }
    if (_info.secondOrganization) {
        cy.get('[aria-label="Discipline"]')
            .should('contain', _info.secondOrganization[0])
        cy.get('[aria-label="Discipline"]')
            .next()
            .should('contain', _info.secondOrganization[1])
    }
    if (_info.courseName) {
        cy.get('[aria-label="Course name"]')
            .should('contain', 'Course name')
        cy.get('[aria-label="Course name"]')
            .next()
            .should('contain', _info.courseName)
    }
    if (_info.semester) {
        cy.get('[aria-label="Semester"]')
            .should('contain', _info.semester[0])
        cy.get('[aria-label="Semester"]')
            .next()
            .should('contain', _info.semester[1])
    }
    if (_info.answeringTime) {
        cy.get('[aria-label="Answering time"]')
            .should('contain', 'Answering time')
        cy.get('[aria-label="Answering time"]')
            .next()
            .compareEosTimeFormat(_info.answeringTime)
    }
    if (_info.classification) {
        cy.get('[aria-label="Exam classification"]')
            .should('contain', 'Exam classification')
        cy.get('[aria-label="Exam classification"]')
            .next()
            .should('contain', _info.classification)
    }
    if (_info.enrolledCandidate) {
        if (_info.enrolledCandidate === 1) {
            cy.get('[aria-label="Enrolled candidate"]')
                .should('contain', 'Enrolled candidate')
        }
        else {
            cy.get('[aria-label="Enrolled candidates"]')
                .should('contain', 'Enrolled candidates')
        }
        cy.get('[aria-label="Enrolled candidates"]')
            .next()
            .should('contain', _info.enrolledCandidate)
    }
    if (_info.invigilator) {
        cy.get('[aria-label="Invigilators"]')
            .should('contain', 'Invigilators')
        cy.get(auiCommonClass.auiExpanderPanel + auiCommonClass.auiProfileName)
            .should('contain', _info.invigilator)
    }
    if (_info.administered) {
        cy.get('[aria-label="No. of administered candidates"]')
            .should('contain', 'No. of administered candidates')
        cy.get('[aria-label="No. of administered candidates"]')
            .next()
            .should('contain', _info.administered)
    }
    if (_info.fullmark) {
        cy.get('[aria-label="Total marks"]')
            .should('contain', 'Total marks')
        cy.get('[aria-label="Total marks"]')
            .next()
            .should('contain', _info.fullmark)

    }
}
Cypress.PageExamCreate.verifyAnswerDuration = (_value) => {
    cy.get(examClass.answeringEndTime + examClass.examWaterMark)
        .eq(0)
        .should('contain', 'Answering duration')
        .and('contain', _value)
}
Cypress.PageExamCreate.verifyExamTimeInfo = () => {
    Cypress.PageExamCreate.expandBasicInfo()
    cy.window().then(win => {
        let format = win.DefaultDateTimeFormat.Time
        if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
            cy.get(examClass.examInfo).eq(0).should('contain', 'N/A')
            cy.get(examClass.examInfo).eq(2).should('contain', '22:59 - 23:59')
        }
        else {
            cy.log('is 12 Hour format')
            cy.get(examClass.examInfo).eq(0).should('contain', 'N/A')
            cy.get(examClass.examInfo).eq(2).should('contain', '10:59 PM - 11:59 PM')
        }
    })
}
Cypress.PageExamCreate.verify_Reading_ExamTimeInfo = () => {
    Cypress.PageExamCreate.expandBasicInfo()
    cy.window().then(win => {
        let format = win.DefaultDateTimeFormat.Time
        if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
            cy.get(examClass.examInfo).eq(0).should('contain', '22:30 - 22:35')
            cy.get(examClass.examInfo).eq(2).should('contain', '22:35 - 23:35')
        }
        else {
            cy.log('is 12 Hour format')
            cy.get(examClass.examInfo).eq(0).should('contain', '10:30 PM - 10:35 PM')
            cy.get(examClass.examInfo).eq(2).should('contain', '10:35 PM - 11:35 PM')
        }
    })
};
Cypress.PageExamCreate.verifyReopensubmission = () => {
    cy.get(auiShadowTag.auiSwitch)
        .shadow()
        .find('button')
        .should('have.attr', 'aria-checked', 'true')
    cy.get(examClass.moduleTitle)
        .eq(1)
        .should('contain', "Proctoring setting")
    cy.get(examClass.reopensubmissionSwitchContent)
        .should('contain', "Allow invigilators to open the exam for candidates' resubmission")
    cy.get(examClass.reopensubmissionNoteContent)
        .should('contain', "Note: With this setting enabled, invigilators can open the exam for candidates to allow candidates to enter the exam and submit exam paper again.")
};
Cypress.PageExamCreate.switchReopensubmission = () => {
    cy.get(examGradeClass.mappingAuiSwitchButton)
        .click({ force: true })
};

//没设置reading time，验证默认时间
Cypress.PageExamCreate.verify_Now_StartAndEndTime = () => {
    cy.window().then(win => {
        var hh = new Date().getHours()
        var next_hh = hh + 1
        let format = win.DefaultDateTimeFormat.Time
        if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
            hh = hh
        }
        else {
            if (hh > 12) {
                hh = hh - 12
                next_hh = next_hh - 12
            }
            if (hh === 12) {
                next_hh = '01'
            }
        }
        cy.get(auiCommonClass.auiComBox).eq(3).should('contain', hh)
        cy.get(auiCommonClass.auiComBox).eq(4).should('contain', next_hh)
    })
}
//没设置reading time，验证自定义endtime
Cypress.PageExamCreate.verifyEndTime = (_hh, _mm) => {
    cy.get(auiCommonClass.auiComBox).eq(4).should('contain', _hh).should('contain', _mm)
}
//设置reading time，验证默认时间
Cypress.PageExamCreate.verify_Default_ReadingAllInfo = () => {
    let now = new Date()
    let cunrent_hh = now.getHours()
    let next_hh = cunrent_hh + 1
    cy.window().then(win => {
        let format = win.DefaultDateTimeFormat.Time
        if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
        }
        else {
            if (cunrent_hh > 12) {
                cunrent_hh = cunrent_hh - 12
                next_hh = next_hh - 12
            }
            if (cunrent_hh === 12) {
                next_hh = Number('01')
            }
        }
        // verify reading start time
        let mm = now.getMinutes()
        // cy.get(auiCommonClass.auiComBox)
        //     .eq(3).should('contain', cunrent_hh).should('contain', mm)
        cy.get(auiCommonClass.auiComBox)
            .eq(3).should('contain', '15 minutes')
        // verify answering start time and answering end time
        if (mm < 45) {
            let start_hh = cunrent_hh
            cy.get(adminApplicationClass.appInputInfo)
                .eq(1).invoke('attr', 'value').should('contain', start_hh).should('contain', mm + 15)
            // let end_hh = cunrent_hh + 1
            // cy.get(auiCommonClass.auiComBox)
            //     .eq(5).should('contain', end_hh).should('contain', mm + 15)
        }
        if (mm > 44) {
            let start_hh = next_hh
            cy.get(adminApplicationClass.appInputInfo)
                .eq(1).invoke('attr', 'value').should('contain', start_hh).should('contain', mm + 15 - 60)
            // let end_hh = next_hh + 1
            // if (cunrent_hh === 11) {
            //     end_hh = Number('01')
            // }
            // cy.get(auiCommonClass.auiComBox)
            //     .eq(5).should('contain', end_hh).should('contain', mm + 15 - 60)

        }
    })
}
//设置reading time，自定义duration，验证自定义duration
Cypress.PageExamCreate.verify_New_ReadingAllInfo = (_hh, _mm, _duration) => {
    if (_mm < 50) {
        cy.get(adminApplicationClass.appInputInfo)
            .eq(1).invoke('attr', 'value').should('contain', _hh).should('contain', _mm + _duration)
        cy.get(auiCommonClass.auiComBox)
            .eq(5).should('contain', _hh + 1).should('contain', _mm + _duration)
    }
    if (_mm > 49) {
        cy.get(adminApplicationClass.appInputInfo)
            .eq(1).invoke('attr', 'value').should('contain', _hh + 1).should('contain', _mm + _duration - 60)
        cy.get(auiCommonClass.auiComBox)
            .eq(5).should('contain', _hh + 2).should('contain', _mm + _duration - 60)
    }
};
// Have Reading Time Common
Cypress.PageExamCreate.verifyDefaultInfo = (_num, _value) => {
    cy.get(auiCommonClass.auiComBox).eq(_num).should('contain', _value)
};
//验证有reading time的step1的开始结束时间
Cypress.PageExamCreate.verifyFixedReadingStep1Time = (_startTime, _endTime) => {
    cy.get(examClass.readingStartTime + auiCommonClass.auiComBox)
        .find('div')
        .compareEosTimeFormat(_startTime)
    cy.get(examClass.answeringEndTime + auiCommonClass.auiComBox)
        .find('div')
        .compareEosTimeFormat(_endTime)
};
Cypress.PageExamCreate.verifyAuthorisedApp_validationMessage = (_value) => {
    cy.get(examClass.whiteListApp + auiCommonClass.auiValidationMessage)
        .should('contain', _value)
};
Cypress.PageExamCreate.verifyAuthorisedApp_item = (_value) => {
    cy.get(examClass.whiteListApp + examClass.whiteListItem)
        .should('contain', _value)
};
Cypress.PageExamCreate.verifyAuthorisedUrl_validationMessage = (_value) => {
    cy.get(examClass.whiteListUrlId + auiCommonClass.auiValidationMessage)
        .should('contain', _value)
};
Cypress.PageExamCreate.verifyAuthorisedUrl_item = (_value) => {
    cy.get(examClass.whiteListUrlId + examClass.whiteListItem)
        .should('contain', _value)
};



Cypress.PageExamCreate.chooseExamType = (_num) => {
    cy.contains('Type')
        .next()
        .click({ force: true })
    // cy.get(auiOptionList.auiOptionListBox + examGradeClass.optionlistSelectText)
    //     .eq(_num)
    //     .click({ force: true })
    if (_num) {
        cy.contains('Open-book')
            .click({ force: true })
    }
    else {
        cy.contains('Closed-book')
            .click({ force: true })
    }
}
Cypress.PageExamCreate.examReadingDuration = (_num) => {
    cy.contains('Reading duration')
        .next().click({ force: true })
    cy.get('[aria-label="Single choice list"]').eq(4)
        .find('label')
        .eq(_num).click({ force: true })
}
Cypress.PageExamCreate.examCardTime = () => {
    cy.window().then(win => {
        let format = win.DefaultDateTimeFormat.Time
        if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
            cy.get('.exam-card-reading-icon')
                .invoke('attr', 'aria-label')
                .should('contain', '22:30 - 22:35 (Duration 5  mins)')
        }
        else {
            cy.get('.exam-card-reading-icon')
                .invoke('attr', 'aria-label')
                .should('contain', '10:30 PM - 10:35 PM (Duration 5  mins)')
        }
    })
}

Cypress.PageExamCreate.examCreatePaperDirectly = (_name, _complete) => {
    cy.contains('Create paper directly')
        .click({ force: true })
        .wait(2000)
    cy.get(examClass.examCreatePaperName)
        .type(_name)
    // Add section
    cy.get(examClass.addSectionBtn)
        .click()
        .wait(1000)
    cy.get(examClass.sectionNameLabel)
        .type('Section name')
        .wait(500)
    cy.get(examClass.sectionDescriptionLabel)
        .type('Section description')
        .wait(500)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    // Add question
    cy.get(examClass.addExistQueBtn)
        .click()
        .waitElement('[name="existQuestionTable-Checkbox"]')
    cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiSearchBoxInput)
        .type('How old are you?', { force: true })
        .type('{enter}', { force: true })
        .waitNoElement('[tabindex="-2"]')
        .wait(2000)
    cy.get(auiCommonClass.auiSelectAll)
        .click().wait(500)
    cy.get(bankClass.addBtn)
        .click({ force: true }).wait(1000)
    if (_complete) {
        cy.get(bankClass.paperSaveComplete)
            .click()
            .wait(1500)
    }
    else {
        cy.get(bankClass.paperSaveDraft)
            .click()
            .wait(1500)
    }
    cy.waitElement(auiCommonClass.auiNaviItem)
        .wait(1000)
}

Cypress.PageExamCreate.examCreateOralPaperDirectly = (_name, _content, _complete, _numberQue, _uploadFile) => {
    cy.contains('Create paper directly')
        .click({ force: true })
        .wait(2000)
    cy.get(examClass.examCreatePaperName)
        .type(_name)
    // Add section
    cy.get(examClass.addSectionBtn)
        .click()
        .wait(1000)
    cy.get(examClass.sectionNameLabel)
        .type('Section name')
        .wait(500)
    cy.get(examClass.sectionDescriptionLabel)
        .type('Section description')
        .wait(500)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    let numberQue = 0
    if (_numberQue) {
        numberQue = _numberQue
    }
    // Add new question
    cy.get(examClass.addNewQuestionLabel)
        .click()
    cy.get(`#questionbutton-0-${numberQue} button`)
        .click()
        .wait(2000)
    cy.get(auiCommonClass.auiRichCotainer)
        .eq(0)
        .click()
        .wait(2000)
    cy.get(auiCommonClass.auiRichTextConent)
        .click()
        .type(_content)
    // whether upload file
    if (_uploadFile) {
        Cypress.PageBankPaper.uploadFile(_uploadFile)
    }
    // Save or Draft
    if (_complete) {
        cy.get(bankClass.paperSaveComplete)
            .click()
            .wait(1500)
    }
    else {
        cy.get(bankClass.paperSaveDraft)
            .click()
            .wait(1500)
    }
    cy.waitElement(auiCommonClass.auiNaviItem)
        .wait(1000)
}
Cypress.PageExamCreate.clickPublish = () => {
    cy.waitLoading()
    cy.wait(500)
    cy.get(examClass.publishBtn)
        .click({ force: true })
        .waitLoading()
    cy.wait(500)
};
Cypress.PageExamCreate.examPublish = () => {
    Cypress.PageExamCreate.clickPublish()
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
};

// Manage group
Cypress.PageExamCreate.clickBtnInManageGroupPanel = (_num) => {
    cy.get(examClass.manageGroupPanelId + auiCommonClass.auiModalBody + 'button')
        .eq(_num)
        .click({ force: true })
}


Cypress.PageExamCreate.verifyEnrolledCandidate = (_num) => {
    cy.get(examClass.examEnrolledCandidate)
        .eq(1).should('contain', _num)
}
Cypress.PageExamCreate.addGroup = () => {
    cy.get(examClass.examAddGroupBtn)
        .click({ force: true })
}
Cypress.PageExamCreate.verifyGroupNameRequired = () => {
    cy.get(examClass.examGroupSave)
        .find('button').click({ force: true })
    cy.get(auiCommonClass.auiValidationMessage)
        .should('contain', 'Enter a value to proceed.')
}
Cypress.PageExamCreate.inputGroupName = (_name) => {
    cy.get(examClass.examInputGroupName)
        .clear({ force: true })
        .type(_name, { force: true })
    cy.get(examClass.examGroupSave)
        .find('button').click({ force: true })
}
Cypress.PageExamCreate.verifyGroupNameAndNumber = (_value, _name, _number) => {
    if (_value === 0) {
        cy.get(examClass.examGroupName)
            .should('contain', _name)
        cy.get(examClass.examGroupNumber)
            .should('contain', _number)
    }
    else {
        cy.get(examClass.examGroupName)
            .eq(_value).should('contain', _name)
        cy.get(examClass.examGroupNumber)
            .eq(_value).should('contain', _number)
    }
}
// Cypress.PageExamCreate.removeCandidate = (_num) => {
//     cy.get(examClass.examRemoveCandidate)
//         .eq(_num).click({ force: true })
// }
Cypress.PageExamCreate.enrolCandidateToGroup = (_value, _num) => {
    for (let i = 0; i < _value.length; i++) {
        cy.get(auiCommonClass.auiSearchBoxInput)
            .clear({ force: true })
            .type('{enter}')
            .type(_value[i], { force: true })
            .type('{enter}')
        cy.get(examClass.examPendingCandidate)
            .click({ force: true })
        cy.get(examClass.examCandidateMidPanel + 'div')
            .click({ force: true })
        cy.get(auiCommonClass.auiComBox)
            .click({ force: true })
        cy.get(examGradeClass.optionlistSelectText)
            .eq(_num).click({ force: true })
    }
}
Cypress.PageExamCreate.editGroup = (_num) => {
    cy.get(examClass.examGroupListBtn)
        .eq(_num)
        .click({ force: true }).wait(1000)
    cy.get(examClass.examEditGroup)
        .eq(_num).children()
        .click({ force: true }).wait(1000)
}
Cypress.PageExamCreate.deleteGroup = (_num) => {
    cy.get(examClass.examDeleteGroup)
        .eq(_num).children()
        .click({ force: true })
}
Cypress.PageExamCreate.confirmDelGroup = (_value) => {
    cy.get(sampleExamClass.confirmMessageContent)
        .should('contain', _value)
    cy.get(adminApplicationClass.deleBtn)
        .click({ force: true })
}
Cypress.PageExamCreate.removeAllCandidate = () => {
    cy.get(examClass.examRemoveAllCandidate)
        .click({ force: true })
}
Cypress.PageExamCreate.verifyExamBasicInfo = (_num, _value) => {
    cy.get(auiCommonClass.auiExpanderPanel + auiCommonClass.auiProfileName)
        .should('contain', _value)
};
Cypress.PageExamCreate.verifyBasicInfoName = (_value) => {
    cy.get(examClass.basicInfo + auiShadowTag.auiProfile)
        .shadow()
        .find('.name ')
        .should('contain', _value)
}
Cypress.PageExamCreate.expandBasicInfo = () => {
    cy.get(examClass.expandBtn)
        .eq(0)
        .click({ force: true })
};
Cypress.PageExamCreate.searchCandidate = (_name) => {
    cy.get(examClass.examGroupSearchCandidate)
        .clear({ force: true })
        .type(_name, { force: true })
        .type('{enter}')
        .waitLoading()
        .wait(1000)
}
Cypress.PageExamCreate.assignInvigilatorForGroup = (_name) => {
    cy.get(examClass.examAssignInvigForGroupBtn)
        .click({ force: true })
        .wait(1500)
}
Cypress.PageExamCreate.verifyInvigilatorForGroupTable = (_invigInfo) => {
    let table = auiPanelClass.auiPanelBody + auiTableClass.auiTable
    Cypress.auiCommon.verifyTable(_invigInfo, table)
}
Cypress.PageExamCreate.clickMultipleInvigilator = (_num) => {
    cy.get(auiPanelClass.auiPanelBody)
        .find(examClass.multipleInvigilatorsLink)
        .eq(_num)
        .click({ force: true })
}
Cypress.PageExamCreate.verifyMultipleInfo = (_num, _info) => {
    if (typeof _info === 'number') {
        cy.get(auiTableClass.auiPureTable + examClass.multipleDataCell)
            .eq(_num)
            .should('contain', _info)
    }
    else {
        cy.get(auiTableClass.auiPureTable + examClass.multipleDataCell)
            .find(auiShadowTag.auiProfile)
            .eq(_num / 2)
            .shadow()
            .find('.name ')
            .should('contain', _info)
    }
}
Cypress.PageExamCreate.invigilatorSubTitleBtn = (_num) => {
    cy.get(`${examClass.invigilatorSubTitleBtn} button`)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(1500)
}
Cypress.PageExamCreate.editExamTimeForBtn_OralExam = (_num) => {
    let bottonElement = ''
    if (_num == 0) {
        bottonElement = examClass.editOralExamSelectedBtn
    }
    if (_num == 1) {
        bottonElement = examClass.editOralExamTeamsBtn
    }
    if (_num == 2) {
        bottonElement = examClass.editOralExamClassesBtn
    }
    if (_num == 3) {
        bottonElement = examClass.editOralExamAllBtn
    }
    cy.get(bottonElement)
        .click({ force: true })
        .wait(500)
}
Cypress.PageExamCreate.verifyInvigilatorSubTitleBtnLength = (_num) => {
    cy.get(examClass.invigilatorSubTitleBtn + 'button')
        .should('have.length', _num)
}
Cypress.PageExamCreate.changeInvigilator = (_num, _value) => {
    Cypress.auiCommon.checkBoxInPanelTable(_num)
    cy.get(examClass.changeInvigilator)
        .click({ force: true })
        .waitLoading()
    let inputBox = auiComboboxClass.auiComboBox
    Cypress.auiCommon.comboBoxInput(inputBox, _value)
    cy.get(auiDialogClass.auiDialogVisible + auiButtonClass.saveBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamCreate.verifyMoreInvigNum = (_number) => {
    cy.get(examClass.moreInvigilator)
        .should('contain', '+', _number)
}
Cypress.PageExamCreate.clickMoreInvig = () => {
    cy.get(examClass.moreInvigilator)
        .click({ force: true })
}
Cypress.PageExamCreate.verifyMoreInvigName = (_num, _name) => {
    Cypress.auiCommon.verifyPopupAvatar(_num, _name)
}
Cypress.PageExamCreate.basicClickMoreInvig = () => {
    cy.get(examClass.stepMoreInvigilator)
        .click({ force: true })
}
Cypress.PageExamCreate.verifyCandidateSelectedNumber = (_num1, _num2) => {
    cy.get('[style="text-wrap: nowrap;"]')
        .should('contain', `${_num1} of ${_num2} selected`)
};
Cypress.PageExamCreate.verifyStepMoreInvig = (_num, _name) => {
    Cypress.auiCommon.verifyPopupAvatar(_num, _name)
}
Cypress.PageExamCreate.inputPaperName = (_name) => {
    cy.get(examClass.examCreatePaperName)
        .clear({ force: true })
        .type(_name)
};
Cypress.PageExamCreate.verifyPaperStatus = (_value) => {
    cy.get(examClass.paperStatus)
        .should('contain', _value)
};

// ============================================= duplicate =============================================
Cypress.PageExamCreate.verifyStepHighlight = (_num) => {
    cy.get('.aui-navpanel-box')
        .eq(_num)
        .find('a')
        .eq(0)
        .should('have.attr', 'aria-disabled', 'false')
}
Cypress.PageExamCreate.allowSpecifiedUrl = () => {
    cy.get(sampleExamClass.allowAuthorisedURL)
        .click({ force: true })
}
Cypress.PageExamCreate.addAuthorisedURL = (_name, _url) => {
    Cypress.PageExamCreate.allowSpecifiedUrl()
    cy.get(sampleExamClass.addIcon)
        .eq(0)
        .click({ force: true })
    cy.get(sampleExamClass.addIcon)
        .eq(1)
        .click({ force: true })
    cy.get(sampleExamClass.inputName)
        .type(_name)
    cy.get(sampleExamClass.inputAddress)
        .type(_url)
    cy.get(sampleExamClass.addBtn)
        .eq(1)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamCreate.clickAddExistUrlBtn = () => {
    cy.get(sampleExamClass.addIcon)
        .eq(0)
        .click({ force: true })
    cy.get(sampleExamClass.addIcon)
        .eq(2)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamCreate.clickExistUrlNameInPanel = (_num) => {
    cy.get(auiPanelClass.auiPanelVisible + 'a')
        .eq(_num)
        .click()
        .waitLoading()
};
Cypress.PageExamCreate.verifyUrlName = (_value) => {
    cy.get(sampleExamClass.sampleUrlName)
        .should('contain', _value)
};
Cypress.PageExamCreate.verifyExamName = (_name) => {
    cy.get(examClass.examName)
        .invoke('attr', 'value').should('contain', _name)
}
Cypress.PageExamCreate.verifyOnlineProctor = () => {
    cy.get(bankClass.auiSwithOff)
        .eq(0)
        .should('have.attr', 'aria-checked', 'true')
    cy.get(bankClass.auiSwithOff)
        .eq(1)
        .should('have.attr', 'aria-checked', 'true')
}
Cypress.PageExamCreate.verifyAPPAndURL = (_app, _name) => {
    cy.get(sampleExamClass.sampleUrlName)
        .eq(0)
        .should('contain', _app)
    cy.get(sampleExamClass.sampleUrlName)
        .eq(1)
        .should('contain', _name)
}
Cypress.PageExamCreate.verifyExamStep1Time = (_startTime, _endTime) => {
    //start time
    cy.get(sampleExamClass.sampleModeAndtype)
        .eq(3).children().children().as('startTime')
        .compareEosTimeFormat(_startTime)
    //end time
    cy.get(sampleExamClass.sampleModeAndtype)
        .eq(4).children().children().as('endTime')
        .compareEosTimeFormat(_endTime)
}
Cypress.PageExamCreate.verifyStep2EnrolledCandidate = (_num, _name) => {
    cy.get(examClass.groupWrap)
        .eq(_num).find(examClass.enrolledStuName).should('contain', _name)
}
Cypress.PageExamCreate.verifyStep4Paper = (_paperInfo) => {
    Cypress.auiCommon.verifyTable(_paperInfo)
}
Cypress.PageExamCreate.verifyPaperInfo = (_question, _fullmark) => {
    cy.get(examStudentClass.questionContent)
        .should('contain', _question)
    cy.get('.common-question-stack-title .font-semibold ')
        .eq(0)
        .should('contain', _fullmark)
}
Cypress.PageExamCreate.verifyProctorDisabled = () => {
    cy.get(sampleExamClass.faceVerificationBtn)
        .eq(0).should('have.attr', 'aria-disabled', 'true')
    cy.get(sampleExamClass.faceVerificationBtn)
        .eq(1).should('have.attr', 'aria-disabled', 'true')
}
Cypress.PageExamCreate.verifyExamType = (_examClass, _type) => {
    // fixed exam
    if (_examClass === 0) {
        cy.contains('Type')
            .next()
            .should('contain', _type)
    }
    // flexible exam
    if (_examClass === 1) {
        cy.contains('Type')
            .next()
            .should('contain', _type)
    }
}
Cypress.PageExamCreate.verifyExamTime = (_num, _timeJson) => {
    cy.get(auiCommonClass.auiComBox)
        .eq(_num).children()
        .compareEosDateFormat(_timeJson)
        .compareEosTimeFormat(_timeJson)
}

Cypress.PageExamCreate.unpublishExam = () => {
    cy.get(examClass.createExamFootBtn + adminCourseClass.addFromAddressBookBtn)
        .eq(3)
        .click({ force: true })
        .waitLoading()

}

// ============================================= flexible time range =============================================
Cypress.PageExamCreate.verifyClassification = () => {
    cy.get(examClass.fixedTime)
        .find('span')
        .should('contain', 'Fixed time range')
    cy.get(examClass.flexibleTime)
        .find('span')
        .should('contain', 'Flexible time range')
}
Cypress.PageExamCreate.verifyDefaultClassification = () => {
    cy.get(examClass.fixedTime)
        .find('input')
        .invoke('attr', 'aria-checked', 'true')
}
Cypress.PageExamCreate.chooseFixedTime = () => {
    cy.get(examClass.fixedTime)
        .find('input')
        .click({ force: true })
        .waitLoading()
}
Cypress.PageExamCreate.chooseFlexibleTime = () => {
    cy.get(examClass.flexibleTime)
        .find('input')
        .click({ force: true })
}
Cypress.PageExamCreate.verifyAnsweringDuration = (_value) => {
    cy.contains('Answering duration')
        .next()
        .find('input')
        .invoke('attr', 'value', _value)
}
Cypress.PageExamCreate.inputAnsweringDuration = (_number) => {
    cy.get(auiCommonClass.auiInputTarget)
        .eq(1)
        .as('answeringDuration')
    if (_number) {
        cy.get('@answeringDuration')
            .click({ force: true })
            .clear({ force: true })
            .type(_number, { force: true })
    }
    else {
        cy.get('@answeringDuration')
            .click({ force: true })
            .clear({ force: true })
    }
}
Cypress.PageExamCreate.verifyValidation = (_num, _value) => {
    cy.get(auiCommonClass.containerName + auiCommonClass.auiValidationMessage)
        .eq(_num)
        .should('contain', _value)

}
Cypress.PageExamCreate.examOpenTime = (_day, _hour, _minute, _afterMinute) => {
    cy.contains('Exam open time')
        .next()
        .as('openTime')
    if (_afterMinute) {
        if (_minute < 60 - _afterMinute) {
            _minute = _minute + _afterMinute
            cy.get('@openTime').click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
        }
        else {
            _minute = _minute + _afterMinute - 60
            cy.get('@openTime').click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour + 1, _minute)
        }
    }
    else {
        cy.get('@openTime').click({ force: true })
        cy.get(auiDateFilter.auiDateFilterPopup).eq(0).as('allcalendar')
        return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
    }
}
Cypress.PageExamCreate.examDeadline = (_day, _hour, _minute, _afterMinute, _duration) => {
    cy.contains('Exam deadline')
        .next()
        .as('deadLine')
    if (_afterMinute) {
        if (_minute > 60 - _afterMinute + _duration) {
            _minute = _minute + _afterMinute + _duration
            cy.get('@deadLine').click({ force: true })
            cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
            return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
        }
        else {
            if (_minute + _afterMinute + _duration < 60) {
                _minute = _minute + _afterMinute + _duration
                cy.get('@deadLine').click({ force: true })
                cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
                return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
            }
            else {
                _minute = _minute + _afterMinute + _duration - 60
                cy.get('@deadLine').click({ force: true })
                cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
                return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour + 1, _minute)
            }
        }
    }
    else {
        cy.get('@deadLine').click({ force: true })
        cy.get(auiDateFilter.auiDateFilterPopup).eq(1).as('allcalendar')
        return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
    }
}
Cypress.PageExamCreate.verifyOpenTimeAndDeadline = (_number) => {
    let today = new Date().toJSON()
    cy.get(auiCommonClass.auiComBox)
        .eq(1)
        .children()
        .compareEosDateFormat(today)
        .compareEosTimeFormat('2022-06-01T14:30:00.000Z')
    cy.get(auiCommonClass.auiComBox)
        .eq(2)
        .children()
        .compareEosDateFormat(today)
        .compareEosTimeFormat('2022-06-01T15:30:00.000Z')
};
Cypress.PageExamCreate.verifyOnlineProctoring_TitleDescription = (_num, _title, _des) => {
    let num = _num + 0
    cy.get(examClass.onlineProctoringTitle)
        .eq(num)
        .should('contain', _title)
    cy.get(examClass.onlineProctoringTitle)
        .eq(num)
        .next()
        .should('contain', _des)
};
Cypress.PageExamCreate.verifyIdVerification = (_option) => {
    cy.get(examClass.IdVerification)
        .should('have.attr', 'aria-checked', _option)
    cy.get(examClass.IdVerification)
        .parent()
        .parent()
        .parent()
        .next()
        .should('contain', 'With ID verification enabled, candidates need to take a photo of their identification cards to complete the verification.')
};
Cypress.PageExamCreate.verifyAIIfSelected = (_num, _value) => {
    cy.get(examClass.cheatingOptions + auiCommonClass.auiCheckBox)
        .eq(_num)
        .should('have.attr', 'aria-checked', _value)
};
Cypress.PageExamCreate.chooseIfSelected = (_num) => {
    cy.get(examClass.cheatingOptions + auiCommonClass.auiCheckBox)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageExamCreate.verifySuspiciousActivitiesChecked = (_num, _option) => {
    cy.get(examClass.cheatingOptions + auiCommonClass.auiCheckBox)
        .eq(_num)
        .should('have.attr', 'aria-checked', _option)
};
Cypress.PageExamCreate.verifyActivityInfo = (_item, _instruction) => {
    for (let i = 0; i < 7; i++) {
        cy.get(examClass.cheatingOptions + auiCommonClass.auiCheckBox)
            .eq(i + 1).as('checkbox')
        cy.get('@checkbox')
            .next()
            .should('contain', _item[i])
        cy.get('@checkbox')
            .parent()
            .parent()
            .parent()
            .parent()
            .should('contain', _instruction[i])
    }
}
Cypress.PageExamCreate.switchOnlineProctoring = (_buttonDes) => {
    cy.contains(_buttonDes)
        .prev()
        .shadow()
        .find('button')
        .click({ force: true }).wait(500)
}
Cypress.PageExamCreate.verifyOnlineProctoring_switchBtn = (_num, _value1, _value2) => {
    let num = _num + 1
    cy.get(auiShadowTag.auiSwitch)
        .eq(num)
        .shadow()
        .find('button')
        .as('switchBtn')
    cy.get('@switchBtn')
        .should('have.attr', 'aria-checked', _value1)
    if (_value2) {
        cy.get('@switchBtn')
            .should('have.attr', 'aria-disabled', _value2)
    }
}
Cypress.PageExamCreate.verifyHideItem = () => {
    expect(Cypress.$(examClass.cheatingOptions + auiCommonClass.auiCheckBox).length).to.equal(0)
};
Cypress.PageExamCreate.verifyAnswerDurationList = (_value1, _value2) => {
    cy.get(examClass.flexiblAnswerDuration + auiComboboxClass.auiCombo)
        .should('contain', _value1)
    // 验证是否置灰
    if (_value2)
        cy.get(examClass.flexiblAnswerDuration + auiComboboxClass.auiCombo)
            .should('have.attr', 'aria-disabled', _value2)
};
Cypress.PageExamCreate.verifyAnsweringDuration = (_value) => {
    cy.get(examClass.flexiblAnswerDuration + auiCommonClass.auiInputTarget)
        .should('have.attr', 'value', _value)
};
Cypress.PageExamCreate.editAnsweringDuration = (_value) => {
    cy.get(examClass.flexiblAnswerDuration + auiCommonClass.auiInputTarget)
        .eq(0)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.PageExamCreate.editAttempts = (_value) => {
    cy.get(examClass.flexiblAnswerDuration + auiCommonClass.auiInputTarget)
        .eq(1)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.PageExamCreate.chooseAnsweringDuration = (_num) => {
    cy.get(examClass.flexiblAnswerDuration + auiCommonClass.auiComBox)
        .click({ force: true })
    // cy.get(examGradeClass.optionlistSelectText)
    //     .eq(_num)
    //     .click({ force: true })
    if (_num = 1) {
        cy.contains('No answering duration')
            .click({ force: true })
    }
    else {
        cy.contains('Set a duration')
            .click({ force: true })
    }
};
Cypress.PageExamCreate.verifyNoDurationDisabled = () => {
    cy.get(examClass.flexiblAnswerDuration + auiCommonClass.auiInputTarget)
        .should('have.attr', 'disabled')
};
Cypress.PageExamCreate.verifyPublishScoreTitle = () => {
    cy.get(auiCommonClass.auiExpanderTitleContent)
        .eq(2)
        .should('contain', 'Score publishing')
};
Cypress.PageExamCreate.verifyNoPaperScoreTip = () => {
    cy.get(auiCommonClass.auiExpanderPanel)
        .eq(2)
        .should('contain', 'The score publishing settings are only available when a paper has been created or added.')
};
Cypress.PageExamCreate.verifyHaveScorePublishingInfo = (_value) => {
    cy.get('[aria-label="Automatically publish results"]')
        .next()
        .should('contain', _value)
};
Cypress.PageExamCreate.clickScorePublishingEdit = () => {
    cy.get(auiButtonClass.editBtn)
        .eq(1)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamCreate.clickAutoPublishResultButton = (_num) => {
    cy.get(examClass.autoPublishResultButton)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageExamCreate.saveEditPublishSettings = () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
};
Cypress.PageExamCreate.verifyEditPublishSettingsDisabled = () => {
    cy.get(examClass.autoPublishResultButton)
        .eq(0)
        .should('have.attr', 'disabled')
};


// ================================= NEW =================================
Cypress.PageExamCreate.verifyStep2EditExamTime_StartTimeOrEndTime = (_num, _timeJson) => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellContent)
        .eq(_num)
        .compareEosTimeFormat(_timeJson)
};
Cypress.PageExamCreate.verifyStep2EditExamTime_Duration = (_duration) => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellContent)
        .should('contain', `${_duration} minutes`)
};
Cypress.PageExamCreate.verifyStep2EditExamTime_AnsweringStartTimeWithReading = (_time) => {
    cy.get(examClass.examStartTimeLabel)
        .invoke('attr', 'value')
        .then(($time) => {
            let jsonTime = new Date($time).toJSON().split('T')[1]
            expect(_time).to.equal(jsonTime)
        })
};
Cypress.PageExamCreate.setStep2editExamTime_ReadingStartTime = (_num, _day, _hour, _minute) => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellInput)
        .eq(0)
        .click({ force: true })
        .waitLoading()
    cy.get(auiDateFilter.auiDateFilterPopup).eq(_num).as('allcalendar')
    return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
};
Cypress.PageExamCreate.setStep2EditExamTime_AnsweringEndTime = (_num, _day, _hour, _minute) => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellInput)
        .eq(2)
        .click({ force: true })
        .waitLoading()
    cy.get(auiDateFilter.auiDateFilterPopup).eq(_num).as('allcalendar')
    return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
};
Cypress.PageExamCreate.setStep2EditExamTime = (_num1, _num2, _day, _hour, _minute) => {
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellInput)
        .eq(_num1)
        .click({ force: true })
        .waitLoading()
    cy.get(auiDateFilter.auiDateFilterPopup).eq(_num2).as('allcalendar')
    return Cypress.auiCommon.datePickerWithTime('@allcalendar', _day, _hour, _minute)
};
Cypress.PageExamCreate.step2Filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Class':
                    fil_index = 0
                    break;
                case 'Group':
                    fil_index = 1
                    break;
                case 'Invigilator':
                    fil_index = 2
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(fil_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
                .waitLoading()
                .wait(1500)
        })
};
Cypress.PageExamCreate.removeCandidate = () => {
    Cypress.PageExamCreate.invigilatorSubTitleBtn(2)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
};
Cypress.PageExamCreate.addCandidate = (_checkNum) => {
    Cypress.PageExamCreate.invigilatorSubTitleBtn(1)
    cy.wait(2000)
    Cypress.auiCommon.checkBoxInPanelTable(_checkNum)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
};
Cypress.PageExamCreate.clickNext = () => {
    cy.get(examClass.createExamFootBtn + examClass.nextBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamCreate.sendForApproval = () => {
    cy.get(examClass.sengForApprovalBtn)
        .click()
        .waitLoading()
        .wait(2000)
};
Cypress.PageExamCreate.verifyQuestionSettingsValue = (_value) => {
    cy.get('[aria-label="Allow candidates to view previous questions"]')
        .next()
        .should('contain', _value)
};
Cypress.PageExamCreate.verifyAllowCandidateViewSubValue = (_value) => {
    cy.get('[aria-label="Allow candidates to view their submissions"]')
        .next()
        .should('contain', _value)
};
Cypress.PageExamCreate.verifySpellCheckValue = (_value) => {
    cy.get('[aria-label="Spell check"]')
        .next()
        .should('contain', _value)
};
Cypress.PageExamCreate.setCandidateViewPreviousQuestions = (_num) => {
    cy.get(examClass.setCandidateViewPreviousQuestions)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageExamCreate.closeOnlineProctoring = () => {
    for (let index = 0; index < 4; index++) {
        cy.get(auiShadowTag.auiSwitch)
            .eq(index)
            .shadow()
            .find(sampleExamClass.faceVerificationBtn)
            .click({ force: true })
    }
};
Cypress.PageExamCreate.clickEditExamTimeInPanel = () => {
    cy.get(examClass.editOralExamTimeId + 'button')
        .click({ force: true })
};
Cypress.PageExamCreate.step2FilterDate = (_num) => {
    cy.get(auiDateFilter.auiDateFilterDefault)
        .click()
    cy.get(auiDateFilter.auiDateFilterRow + '.aui-radio ')
        .eq(_num)
        .click()
    if (_num == 3) {
        cy.get(auiDateFilter.auiDateFilterRow)
            .eq(_num)
            .click()
        Cypress.auiCommon.selectNextDay_InDateRangeCalendar()
    }
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiOptionOKBtn)
        .eq(1)
        .click()
        .wait(2000)
};
Cypress.PageExamCreate.verifyStep2TotalCandidates = (_num) => {
    cy.get(examClass.invigilatorSubTitleBtn)
        .should('contain', `Total ${_num} candidates`)
};
Cypress.PageExamCreate.verifyOralExamBasicValue = (_info) => {
    if (_info.examTime) {
        cy.get(examClass.basicInfoLabel)
            .eq(4)
            .should('contain', 'Exam time')
        cy.get(examClass.basicInfoLabel)
            .eq(4)
            .next()
            .compareEosTimeFormat(_info.examTime.start)
            .compareEosTimeFormat(_info.examTime.end)
    }
    if (_info.firstOrganization) {
        cy.get(examClass.basicInfoLabel)
            .eq(0)
            .should('contain', _info.firstOrganization[0])
        cy.get(examClass.basicInfoLabel)
            .eq(0)
            .next()
            .should('contain', _info.firstOrganization[1])
    }
    if (_info.secondOrganization) {
        cy.get(examClass.basicInfoLabel)
            .eq(1)
            .should('contain', _info.secondOrganization[0])
        cy.get(examClass.basicInfoLabel)
            .eq(1)
            .next()
            .should('contain', _info.secondOrganization[1])
    }
    if (_info.courseName) {
        cy.get(examClass.basicInfoLabel)
            .eq(2)
            .should('contain', 'Course name')
        cy.get(examClass.basicInfoLabel)
            .eq(2)
            .next()
            .should('contain', _info.courseName)
    }
    if (_info.semester) {
        cy.get(examClass.basicInfoLabel)
            .eq(3)
            .should('contain', _info.semester[0])
        cy.get(examClass.basicInfoLabel)
            .eq(3)
            .next()
            .should('contain', _info.semester[1])
    }
    if (_info.enrolledCandidate) {
        if (_info.enrolledCandidate === 1) {
            cy.get(examClass.basicInfoLabel)
                .eq(5)
                .should('contain', 'Enrolled candidate')
        }
        else {
            cy.get(examClass.basicInfoLabel)
                .eq(5)
                .should('contain', 'Enrolled candidates')
        }
        cy.get(examClass.basicInfoLabel)
            .eq(5)
            .next()
            .should('contain', _info.enrolledCandidate)
    }
    if (_info.invigilator) {
        cy.get(examClass.basicInfoLabel)
            .eq(6)
            .should('contain', 'Invigilator')
        Cypress.PageExamCreate.verifyOralExamBasicValue(_info.invigilator)
    }
    if (_info.administered) {
        cy.get(examClass.basicInfoLabel)
            .eq(7)
            .should('contain', 'No. of administered candidates')
        cy.get(examClass.basicInfoLabel)
            .eq(7)
            .next()
            .should('contain', _info.administered)
    }
    if (_info.fullmark_inAttendance) {
        cy.get(examClass.basicInfoLabel)
            .eq(8)
            .should('contain', 'Total marks')
        cy.get(examClass.basicInfoLabel)
            .eq(8)
            .next()
            .should('contain', _info.fullmark_inAttendance)
    }
    if (_info.fullmark_inGrading) {
        cy.get(examClass.basicInfoLabel)
            .eq(7)
            .should('contain', 'Total marks')
        cy.get(examClass.basicInfoLabel)
            .eq(7)
            .next()
            .should('contain', _info.fullmark_inGrading)
    }

}
Cypress.PageExamCreate.verifyStep3SettingsValue = (_num, _value) => {
    cy.get(examClass.basicInfoValue)
        .eq(_num)
        .should('contain', _value)
}
Cypress.PageExamCreate.switchMarkingType = (_num) => {
    cy.get(examClass.pullRight + auiComboboxClass.auiComboShell)
        .click({ force: true })
    cy.get(auiOptionList.auiOptionListItem)
        .eq(_num)
        .click({ force: true })
}
Cypress.PageExamCreate.clickEditRubricBtn = (_num) => {
    cy.get(adminMarkingSettingsClass.rubricTableId + auiButtonClass.editBtn)
        .eq(_num)
        .click({ force: true })
}
Cypress.PageExamCreate.verifyExamDetailInvigilator = (_value) => {
    cy.get(examClass.examDetail + auiShadowTag.auiProfile)
        .shadow()
        .find('.name ')
        .should('contain', _value)
}