/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { examAttendanceClass, examClass, examStudentClass, sampleExamClass, markExamClass } from '../../AUI/exam.constants'
import { adminApplicationClass, adminGlobalLinks, adminSwitchRoleClass, adminRoleClass, adminLmsIntegration } from '../../AUI/admin.constants'
import { bankClass } from '../../AUI/bank.constants'
import { auiCommonClass, auiShadowTag, auiComboboxClass, auiTableClass, auiPanelClass, auiDateFilter, auiFilterCommon, auiButtonClass, auiOptionList, auiCalendar, auiDialogClass, auiPopup } from '../../AUI/aui.common.constants'

let tabelBody = auiTableClass.auiTbody
let tabelRow = auiTableClass.auiTRow
let editText = '30.'

Cypress.PageExamAttendance = Cypress.PageExamAttendance || {};

Cypress.PageExamAttendance.enterAttendance_overexam = () => {
    let popup = examAttendanceClass.popupBtn
    let attendance = examClass.attendanceProgressBtn
    cy.get(examClass.examCardContainer + popup).click({ force: true })
    cy.get(attendance).click({ force: true })
    cy.waitElement(auiCommonClass.auiNaviItem)
    cy.wait(2000)
}
Cypress.PageExamAttendance.enterAttendance_examing = () => {
    let attendance = examClass.attendanceProgressBtn
    cy.get(attendance)
        .click()
        .waitLoading()
        .wait(2000)
};
Cypress.PageExamAttendance.verifyStatus = (_value) => {
    let status = ['Submitted', 'Submitted by invigilator', 'Not submitted', 'Absent']
    for (let index = 0; index < 4; index++) {
        cy.get(examAttendanceClass.attandanceStatusName)
            .eq(index)
            .should('contain', status[index])
        cy.get(examAttendanceClass.attandanceStatusValue)
            .eq(index)
            .should('contain', _value[index])
    }
}
Cypress.PageExamAttendance.clickSubmit = (_num) => {
    cy.get(tabelBody + tabelRow)
        .eq(_num)
        .children()
        .as('figure')
    cy.get('@figure')
        .eq(5)
        .contains('Submit')
        .click({ force: true })
        .wait(500)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    cy.wait(500)

}
Cypress.PageExamAttendance.verifyLiveBtn = () => {
    cy.get(examAttendanceClass.liveproctorBtn)
        .should('contain', 'Live proctoring')
}
Cypress.PageExamAttendance.enterLiveProctoring = (ExamId) => {
    cy.visit('/#/exam/schedule/livevideo?examId=' + ExamId)
    cy.waitLoading().wait(500)
}
Cypress.PageExamAttendance.examTime = (startOffset, duration) => {
    let now = new Date()
    let examInfo = {
        startTime: '',
        endTime: '',
    }
    let start = now.setMinutes(now.getMinutes() + startOffset)
    start = new Date(start).setSeconds(0)
    examInfo.startTime = new Date(now.setSeconds(0)).toJSON()
    let end = now.setMinutes(now.getMinutes() + startOffset + duration)
    end = new Date(end).setSeconds(0)
    examInfo.endTime = new Date(end).toJSON()
}
Cypress.PageExamAttendance.waitEndByTime = (time) => {
    let waiting = new Date(time) - new Date()
    if (waiting > 0) {
        cy.wait(waiting)
    }
}
Cypress.PageExamAttendance.verifyMessage = (data) => {
    cy.get(auiShadowTag.auiMessageBar)
        .shadow()
        .find('.message')
        .should('contain', data)
}
Cypress.PageExamAttendance.serchPeopleById = (data) => {
    cy.get(auiCommonClass.auiSearchByCanIdNameUserId)
        .type(data, { force: true })
        .type('{enter}', { force: true })
        .wait(2000)
        .waitLoading()
}
Cypress.PageExamAttendance.serchPeopleByName = (data) => {
    cy.get(examAttendanceClass.searchByNameLabel)
        .find('input')
        .type(data, { force: true })
        .type('{enter}', { force: true })
        .waitLoading()
}
Cypress.PageExamAttendance.clickExampage = () => {
    cy.get(examAttendanceClass.exampageBtn).click({ force: true })
    cy.wait(3000)
}
Cypress.PageExamAttendance.verifyNotStart = () => {
    cy.get(examAttendanceClass.attandanceMessage)
        .should('contain', 'The exam will start in')
}

// =========== edit exam end time ===========
Cypress.PageExamAttendance.clickClockBtn = (_num) => {
    let num = _num + 1
    cy.get(examAttendanceClass.extendEndTime)
        .eq(num).click({ force: true })
}
Cypress.PageExamAttendance.clickEditEndTimeClock_Fixed = () => {
    cy.get(examAttendanceClass.editEndTime)
        .click({ force: true })
        .wait(800)
};
Cypress.PageExamAttendance.editEndTime_Fixed = (_value, _content, _hour, _minute) => {
    Cypress.PageExamAttendance.clickEditEndTimeClock_Fixed()
    if (_value === 'shorten1Min') {
        if (_minute == 0) {
            cy.get(auiOptionList.auiOptionloopItemSelect)
                .eq(1)
                .find('[data-index="59"]')
                .click({ force: true })
                .wait(500)
        }
        else {
            cy.get(auiOptionList.auiOptionloopItemSelect)
                .eq(1).prev()
                .click({ force: true })
                .wait(500)
        }
    }
    if (_value === 'next1Min') {
        let minute = new Date().getMinutes()
        if (new Date().getSeconds() > 57) {
            minute = minute + 1
        }
        if (minute == 59) {
            cy.get(auiOptionList.auiOptionloopItemSelect)
                .eq(0)
                .next()
                .click({ force: true })
                .wait(500)
            cy.get(auiOptionList.auiOptionloopItemSelect)
                .eq(1)
                .find('[data-index="0"]')
                .click({ force: true })
                .wait(500)
        }
        else {
            cy.get(auiOptionList.auiOptionloopItemSelect)
                .eq(1)
                .next()
                .click({ force: true })
                .wait(500)
        }

    }
    if (_value === 'edit') {
        let popup = auiCalendar.auiTimePop
        Cypress.auiCommon.TimePicker(popup, _hour, _minute)
    }
    cy.get(auiComboboxClass.auiComboEndExamTimePickerButton + auiCommonClass.auiOptionOKBtn)
        .eq(1)
        .click({ force: true })
        .wait(500)
    if (_content) {
        cy.wait(500)
        cy.get(examAttendanceClass.editComment)
            .clear({ force: true }).type(_content, { force: true })
    }
    // cy.get(adminSwitchRoleClass.switchRoleConfirm + examAttendanceClass.okBtn)
    //     .eq(2)
    //     .click({ force: true })
    //     .waitLoading()
    //     .wait(4000)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
}
Cypress.PageExamAttendance.verifyEditEndTime = (_content) => {
    cy.get(examAttendanceClass.editTimeBackground)
        .children().children()
        .should('have.attr', 'aria-label', _content)
    cy.get(examAttendanceClass.editTimeBackground)
        .children().children()
        .compareEosTimeFormat('2022-06-01T15:30:00.000Z')

}
Cypress.PageExamAttendance.clickExamSessionHistory = (_num) => {
    cy.get(examAttendanceClass.examSessionHistoryLabel)
        .eq(_num)
        .click()
}
Cypress.PageExamAttendance.verifyExamSessionHistory = (_number, _role, _type, _value1, _comment) => {
    cy.get('.session-history__item ')
        .eq(_number)
        .as('item')
    // Verify role
    cy.get('@item')
        .find('.session-history__item-title [slot="0"] ')
        .should('contain', _role)
    // Verify type is time or minute
    if (_type) {
        cy.get('@item')
            .find('.session-history__item-title [slot="1"] ')
            .compareEosDateFormat(_value1)
    }
    else {
        cy.get('@item')
            .find('.session-history__item-title [slot="1"] ')
            .should('contain', _value1)
    }
    // Verify comment
    cy.get('@item')
        .find('p')
        .eq(1)
        .should('contain', _comment)
    // Verify operate time
    cy.get('@item')
        .find('p')
        .eq(2)
        .compareEosDateFormat(new Date())
    Cypress.auiCommon.clickClose_InPopup()
};
Cypress.PageExamAttendance.verifySubmissionStatus = (_num, _value) => {
    cy.get(examAttendanceClass.popoverIcon + examAttendanceClass.circleIcon)
        .eq(_num + 2)
        .as('element')
    Cypress.auiCommon.verifyPopoverInner('@element', _value)
};
// Cypress.PageExamAttendance.getEditMinute = (_num) => {
//     cy.get(examAttendanceClass.popoverIcon + examAttendanceClass.clockIcon)
//         .eq(_num)
//         .invoke('attr', 'aria-label')
//         .then(($data) => {
//             editText = $data
//             cy.log('========================================>' + editText)
//         })
// }
Cypress.PageExamAttendance.verifyCardExamTime = (_endTime, _editTimeContent) => {
    cy.get(examClass.examCardTime)
        .next()
        .should('contain', '')
        .invoke('attr', 'tabindex', 1)
        .focus().wait(200)
        .compareEosDateFormat(_endTime)
        .compareEosTimeFormat('2022-06-01T15:30:00.000Z')

    if (_editTimeContent) {
        cy.log('========================================>' + editText)
        cy.get(examStudentClass.examCardEditWarning).invoke('attr', 'aria-label')
            .then(($data) => {
                let tip = $data
                expect(`${tip.split(' 23:')[1]}`).to.eq(editText)
            })
    }
}
Cypress.PageExamAttendance.verifyStuTakeExamEditExam = () => {
    cy.get(auiCommonClass.auiToastInfo).then(($data) => {
        let warning = $data.text().split(' 23:')[1]
        // let takeExamTip = `Your exam end time${editText.split('candidate')[1]}`
        expect(`${warning}`).to.eq(editText)
    })
}
Cypress.PageExamAttendance.chooseStudent = (_rowIndex) => {
    cy.wait(1200)
    let table = adminApplicationClass.appTableBody
    Cypress.auiCommon.checkBoxInTable(table, _rowIndex)
}
Cypress.PageExamAttendance.clickEditEndBtn_Single = () => {
    cy.get(examAttendanceClass.extendEndTime)
        .eq(0)
        .click({ force: true })
    cy.get(adminApplicationClass.popupBtn)
        .eq(2)
        .click({ force: true })
}
Cypress.PageExamAttendance.clickEditEndBtn_All = () => {
    cy.get(examAttendanceClass.extendEndTime)
        .eq(0)
        .click({ force: true })
    cy.get(adminApplicationClass.popupBtn)
        .eq(3)
        .click({ force: true })
}
Cypress.PageExamAttendance.popupEchoTime_Flexible = (_time) => {
    cy.get('.aui-datepicker')
        .compareEosDateFormat(_time)
        .compareEosTimeFormat(_time)
}

Cypress.PageExamAttendance.enterCandiDetail = (_num) => {
    cy.waitElement(bankClass.skeletonViewSecTitle)
    cy.get(bankClass.skeletonViewSecTitle)
        .eq(_num)
        .click({ force: true })
        .wait(1000)
}
Cypress.PageExamAttendance.verifyCandidateDetail = (_detailInfo) => {
    cy.get(auiCommonClass.detailRow)
        .as('row')
    // common part
    if (_detailInfo.candidateID) {
        cy.get('@row')
            .eq(1)
            .should('contain', 'Candidate ID')
            .and('contain', _detailInfo.candidateID)
    }
    if (_detailInfo.userId) {
        cy.get('@row')
            .eq(2)
            .should('contain', 'User ID')
            .and('contain', _detailInfo.userId)
    }
    if (_detailInfo.status) {
        cy.get('@row')
            .eq(4)
            .should('contain', 'Status')
            .and('contain', _detailInfo.status)
    }
    if (_detailInfo.attendanceStatus) {
        cy.get('@row')
            .eq(5)
            .should('contain', 'Attendance status')
            .and('contain', _detailInfo.attendanceStatus)
    }
    if (_detailInfo.examinationStatus) {
        cy.get('@row')
            .eq(6)
            .should('contain', 'Examination status')
            .and('contain', _detailInfo.examinationStatus)
    }
    // fixed exam details
    if (_detailInfo.fixed_examTime) {
        cy.get('@row')
            .eq(9)
            .should('contain', 'Exam time')
            .compareEosDateFormat(_detailInfo.fixed_examTime[0])
            .compareEosTimeFormat(_detailInfo.fixed_examTime[0])
            .compareEosTimeFormat(_detailInfo.fixed_examTime[1])
    }
    if (_detailInfo.fixed_examStartTimeModified) {
        cy.get('@row')
            .eq(10)
            .should('contain', 'Exam start time modified')
            .and('contain', _detailInfo.fixed_examStartTimeModified)
    }
    if (_detailInfo.fixed_editStartTimeComment) {
        cy.get('@row')
            .eq(11)
            .should('contain', 'Comment for editing exam start time')
            .and('contain', _detailInfo.fixed_editStartTimeComment)
    }
    if (_detailInfo.fixed_examEndTimeModified) {
        cy.get('@row')
            .eq(12)
            .should('contain', 'Exam end time modified')
            .and('contain', _detailInfo.fixed_examEndTimeModified)
    }
    if (_detailInfo.fixed_editEndTimeComment) {
        cy.get('@row')
            .eq(13)
            .should('contain', 'Comment for editing exam end time')
            .and('contain', _detailInfo.fixed_editEndTimeComment)
    }
    // flexible exam details
    if (_detailInfo.flexible_candidateStartTime) {
        cy.get('@row')
            .eq(9)
            .should('contain', 'Candidate started time')
            .compareEosDateFormat(_detailInfo.flexible_candidateStartTime)
            .compareEosTimeFormat(_detailInfo.flexible_candidateStartTime)
    }
    if (_detailInfo.flexible_candidateEndTime) {
        cy.get('@row')
            .eq(10)
            .should('contain', 'Candidate ended time')
            .compareEosDateFormat(_detailInfo.flexible_candidateStartTime)
            .compareEosTimeFormat(_detailInfo.flexible_candidateStartTime)
    }
    if (_detailInfo.flexible_examDeadline) {
        cy.get('@row')
            .eq(11)
            .should('contain', 'Exam deadline')
            .compareEosDateFormat(_detailInfo.flexible_examDeadline)
            .compareEosTimeFormat(_detailInfo.flexible_examDeadline)
    }
    if (_detailInfo.flexible_deadlineModified) {
        cy.get('@row')
            .eq(12)
            .should('contain', 'Deadline modified')
            .and('contain', _detailInfo.flexible_deadlineModified)
    }
    if (_detailInfo.flexible_commentForEditingDeadline) {
        cy.get('@row')
            .eq(13)
            .should('contain', 'Comment for editing deadline')
            .and('contain', _detailInfo.flexible_commentForEditingDeadline)
    }
    if (_detailInfo.flexible_answeringDuration) {
        cy.get('@row')
            .eq(14)
            .should('contain', 'Answering duration')
            .and('contain', _detailInfo.flexible_answeringDuration)
    }
    if (_detailInfo.flexible_answeringDurationModified) {
        cy.get('@row')
            .eq(15)
            .should('contain', 'Answering duration modified')
            .and('contain', _detailInfo.flexible_answeringDurationModified[0])
            .and('contain', _detailInfo.flexible_answeringDurationModified[1])
    }
    if (_detailInfo.flexible_commentForExtendingDuration) {
        cy.get('@row')
            .eq(16)
            .should('contain', 'Comment for extending duration')
            .and('contain', _detailInfo.flexible_commentForExtendingDuration)
    }
    // have attempt
    if (_detailInfo.attempt) {
        cy.get('@row')
            .eq(5)
            .should('contain', 'Attempted / Attempts allowed')
            .and('contain', _detailInfo.attempt)
    }
}
// Cypress.PageExamAttendance.closeDetail = (_num) => {
//     cy.get(auiPanelClass.auiPanel + auiButtonClass.auiBtnClose)
//         .eq(1)
//         .click({ force: true })
//         .wait(500)
// }
Cypress.PageExamAttendance.filterStatus = (_status) => {
    cy.contains('Attendance status: All')
        .click({ force: true }).wait(500)
    cy.get(sampleExamClass.selectAll)
        .click({ force: true }).wait(500)
    cy.get(`input[aria-label="${_status}"]`)
        .click({ force: true }).wait(500)
    cy.get(auiComboboxClass.auiComboButtonContainer + auiCommonClass.auiOptionOKBtn)
        .eq(0)
        .click({ force: true })
        .wait(4000)
}
Cypress.PageExamAttendance.verifyFlexibleStartAndEndTime = (_start, _end) => {
    cy.get('[data-cell="1,7"]')
        .children().children()
        .compareEosDateFormat(_start)
        .compareEosTimeFormat(_start)
    cy.get('[data-cell="1,7"]')
        .next().children().children()
        .compareEosDateFormat(_end)
        .compareEosTimeFormat(_end)
}
Cypress.PageExamAttendance.verifyFlexibleDetailExamTime = (_value, _start, _end) => {
    cy.get(examAttendanceClass.detailTitle)
        .eq(8).as('individualTime')
    cy.get('@individualTime')
        .should('contain', _value)
    cy.get('@individualTime')
        .next().children().children()
        .compareEosTimeFormat(_start)
        .compareEosTimeFormat(_end)
};
Cypress.PageExamAttendance.verifyFlexEditTimeDisabled = (_value) => {
    for (let i = 0; i < 2; i++) {
        cy.get(`button[aria-label="${_value}"]`)
            .eq(i)
            .should('be.disabled')
    }
};
Cypress.PageExamAttendance.verifyFlexEditTimeNoToolTip = (_value) => {
    for (let i = 1; i < 3; i++) {
        cy.get(examAttendanceClass.actionHeaderBtn)
            .eq(i)
            .should('not.have.attr', 'aria-label', '_value')
    }
};
Cypress.PageExamAttendance.selectAll = () => {
    cy.wait(2000)
    Cypress.auiCommon.chooseCheckbox(0)
};
Cypress.PageExamAttendance.verifyCanNotChoice = (_num) => {
    cy.get(auiCommonClass.auiChoiceInput)
        .eq(_num)
        .should('be.disabled')
};
// Cypress.PageExamAttendance.editInvidualTimeBtn = (_num) => {
//     cy.get(examAttendanceClass.editAnsweringDurationBtn)
//         .click({ force: true })
//     cy.get(examAttendanceClass.menuList + 'button')
//         .eq(_num)
//         .click({ force: true })
// };
Cypress.PageExamAttendance.editEndTime_Flexible = (_value, _day, _hour, _minute, _content) => {
    cy.get(auiCalendar.auiDatePicker)
        .eq(0)
        .click({ force: true })
    let popup = auiDateFilter.auiDateFilterPopup + ':visible'
    if (_value === 'next1Min') {
        cy.get(examAttendanceClass.todayBtn)
            .click({ force: true })
        _minute = _minute + 2
        if (_minute === 60) {
            _hour = _hour + 2
            _minute = 0
        }
    }
    Cypress.auiCommon.datePickerWithTime(popup, _day, _hour, _minute)
    // cy.get(auiDateFilter.auiDatePickerOK + auiCommonClass.auiOptionOKBtn)
    //     .eq(1)
    //     .click({ force: true })
    //     .wait(500)
    if (_content) {
        cy.get(examAttendanceClass.editComment)
            .clear()
            .click()
            .type(_content)
    }
    Cypress.auiCommon.clickFooterBtnInDialog(1)
};
Cypress.PageExamAttendance.verifyRightClockToolTip = () => {
    const clockToolTip = examAttendanceClass.editFlexEndClockBtn
    Cypress.auiCommon.verifyPopoverInner(clockToolTip, 'Edit individual exam end time')
};
Cypress.PageExamAttendance.clickFlexEditEndBtn_All = () => {
    cy.contains('Edit individual exam end time for all')
        .click({ force: true })
};
Cypress.PageExamAttendance.clickFlexEditEndBtn_Clock = (_num) => {
    cy.get(examAttendanceClass.editFlexEndClockBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamAttendance.verifyEchoComment_Flexible = (_value) => {
    cy.get(examAttendanceClass.editComment)
        .should('contain', _value)
};
Cypress.PageExamAttendance.verifyEditEndTime_detail = (_num, _title, _value, _haveTime) => {
    cy.get(examAttendanceClass.detailTitle)
        .eq(_num).as('title')
    cy.get('@title')
        .should('contain', _title)
    if (_num === 8) {
        // 如果_haveTime为ture则验证时间，false为N/A
        if (_haveTime) {
            cy.get('@title')
                .next()
                .compareEosDateFormat(_value)
                .compareEosTimeFormat(_value)
        }
        else {
            cy.get('@title')
                .next()
                .should('contain', 'N/A')
        }
    }
    else {
        cy.get('@title')
            .next()
            .should('contain', _value)
    }
};
Cypress.PageExamAttendance.closeEditDialog = () => {
    cy.get(examAttendanceClass.editOneFlexEndLabel + auiButtonClass.auiBtnClose)
        .click({ force: true })
};
Cypress.PageExamAttendance.clickEditBtnInDurOrDeadline = (_num) => {
    // _num 可以为 0 1 2 3，分别对应edit duration btn，edit deadline btn
    cy.get(examAttendanceClass.attendanceHeaderButton + examAttendanceClass.editAnsweringDurationLabel)
        .click({ force: true })
    cy.get(examAttendanceClass.menuList)
        .eq(_num + 2)
        .click({ force: true })

};
Cypress.PageExamAttendance.verifyEditDurationPopupInfo = () => {
    cy.get(auiCommonClass.auiDialogContainer + examAttendanceClass.editAnsweringDurationLabel)
        .should('contain', 'Extend answering duration')
    cy.get(examAttendanceClass.editDurPopupDurTitle)
        .should('contain', 'Extend duration by')
    // cy.get(examAttendanceClass.editDurationDatepicker)
    //     .should('contain', ' minutes')
};
Cypress.PageExamAttendance.verifyExtendDurAndComNull = () => {
    for (let index = 0; index < 2; index++) {
        cy.get(auiDialogClass.auiDialogBody + auiCommonClass.auiInputTarget)
            .eq(index)
            .should('not.have.attr', 'data-dirty', 'true')
    }
};
Cypress.PageExamAttendance.inputExtendDurAndCom = (_value) => {
    for (let index = 0; index < 2; index++) {
        cy.get(auiDialogClass.auiDialogBody + auiCommonClass.auiInputTarget)
            .eq(index)
            .clear({ force: true })
            .type(_value, { force: true })
    }
    // cy.get(examAttendanceClass.okBtn)
    //     .click({ force: true })
    //     .waitLoading()
    //     .wait(500)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
};
Cypress.PageExamAttendance.verifyStartTime = (_num, _value) => {
    cy.get(auiTableClass.auiTbody + '[data-col="7"]')
        .eq(_num)
        .compareEosDateFormat(_value)
        .compareEosTimeFormat(_value)
};
Cypress.PageExamAttendance.verifyEndTime_Fixed = (_num, _value) => {
    cy.get(examAttendanceClass.durationAndDeadlineValue)
        .eq(_num)
        .compareEosDateFormat(_value)
        .compareEosTimeFormat(_value)
};
Cypress.PageExamAttendance.editRightBtn = (_num) => {
    cy.get(adminApplicationClass.editAppBtn)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageExamAttendance.editDurationByRightBtn = (_num) => {
    cy.get(auiPopup.auiPopupBox + examAttendanceClass.editAnsweringDurationLabel)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageExamAttendance.verifyPopupEchoDate_Flexible = (_value) => {
    cy.get(examAttendanceClass.editEndTimeDatepicker + auiCommonClass.auiComBox)
        .compareEosDateFormat(_value)
        .compareEosTimeFormat(_value)
};
Cypress.PageExamAttendance.inputEditDeadlineComment = (_value) => {
    cy.get(auiDialogClass.auiDialogVisible + auiCommonClass.auiInputTarget)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.PageExamAttendance.verifyOpenresubmissionButton = (_value) => {
    if (_value) {
        cy.get(examAttendanceClass.attendanceHeaderButton)
            .should('contain', 'Open for resubmission')
    }
    else {
        cy.get(examAttendanceClass.attendanceHeaderButton)
            .should('not.contain', 'Open for resubmission')
    }
};

// Function : Open for resubmission
Cypress.PageExamAttendance.clickAttendanceHeaderBtn = (_num) => {
    cy.get(examAttendanceClass.attendanceHeaderButton + 'button')
        .eq(_num)
        .click({ force: true })
        .wait(500)
};
Cypress.PageExamAttendance.verifyReopenGray = () => {
    cy.get(examAttendanceClass.openForResubButton)
        .should('have.attr', 'disabled')
};
Cypress.PageExamAttendance.verifyResubmissionDuration_Echo = (_duration) => {
    // let date = new Date()
    // cy.get(auiCommonClass.auiDialogContainer + auiCommonClass.auiComBox)
    //     .should('contain', date.getMinutes())
    //     .and('contain', date.getHours())
    //     .compareEosDateFormat(date)
    cy.get(auiCommonClass.auiDialogContainer + examAttendanceClass.answeringDurationLabel)
        .should('have.attr', 'value', _duration)
};
Cypress.PageExamAttendance.clearReopensubmissionDuration_Flexible = () => {
    cy.get(auiCommonClass.auiDialogContainer + examAttendanceClass.answeringDurationLabel)
        .clear({ force: true })
        .type('{enter}', { force: true })
};
Cypress.PageExamAttendance.inputReopensubmissionDuration = (_value) => {
    cy.get(auiCommonClass.auiDialogContainer + examAttendanceClass.answeringDurationLabel)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.PageExamAttendance.verifyResubmission_IllegalTip = (_value1, _value2) => {
    cy.get(auiCommonClass.auiDialogContainer + auiCommonClass.auiValidationMessage)
        .eq(0)
        .should('contain', _value1)
    cy.get(auiCommonClass.auiDialogContainer + auiCommonClass.auiValidationMessage)
        .eq(1)
        .should('contain', _value2)
};
Cypress.PageExamAttendance.waitDeadlineArrived = () => {
    // 必须得有absent的学生才能使用此方法
    const message = auiShadowTag.auiMessageBar
    cy.get(message)
        .shadow()
        .then(($data) => {
            for (let index = 0; index < array.length; index++) {
                if ($data.find('.warn ')) {
                    break
                }
            }
        })
    cy.waitElement('.messagebar')
    cy.wait(5000)
};
Cypress.PageExamAttendance.verifyEchoTimeInDialog = (_time) => {
    cy.get(auiDialogClass.auiDialogVisible + auiComboboxClass.auiComboShellContent)
        .compareEosTimeFormat(_time)
};
Cypress.PageExamAttendance.verifyGenerayKeyBtn = () => {
    cy.get(examAttendanceClass.liveproctorBtn + 'button')
        .should('have.length', 2)
};
Cypress.PageExamAttendance.Filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'Status':
                    fil_index = 0
                    popup_index = 0
                    break;
                case 'Class name':
                    fil_index = 1
                    popup_index = 3
                    break;
                case 'Team name':
                    fil_index = 2
                    popup_index = 4
                    break;
                case 'Attendance status':
                    fil_index = 3
                    popup_index = 1
                    break;
                case 'Oral exam progress':
                    fil_index = 4
                    popup_index = 2
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(popup_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(popup_index)
                .click({ force: true })
            // .waitElement('[placeholder="Search by exam name"]')
            cy.wait(2000)
        })
};
Cypress.PageExamAttendance.verifyTotalCandidateTips = (_num) => {
    cy.get(examAttendanceClass.attendanceHeaderButton)
        .should('contain', `Total ${_num} candidate`)
};
Cypress.PageExamAttendance.verifySuspiciousActivities_Middle = (_value) => {
    cy.get(examAttendanceClass.middleSuspiciousActivities)
        .next()
        .should('contain', `< ${_value} times`)
};
Cypress.PageExamAttendance.pauseExam = () => {
    Cypress.PageExamAttendance.clickAttendanceHeaderBtn(4)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
};
Cypress.PageExamAttendance.resumeExam = () => {
    Cypress.auiCommon.clickMoreBtn()
    Cypress.auiCommon.clickPopupMenuitemBtn(0)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
};
Cypress.PageExamAttendance.openAllColumns = () => {
    cy.get(examAttendanceClass.columnViewsBtn)
        .click()
};
Cypress.PageExamAttendance.clickManageViewsBtn = () => {
    cy.get(examAttendanceClass.manageViewsBtn)
        .click()
        .waitLoading()
};