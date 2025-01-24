/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag, auiPopup, auiPanelClass, auiMessageBox, auiDateFilter, auiCalendar, auiComboboxClass, auiOptionList, auiButtonClass, auiTableClass, auiDialogClass, auiFilterCommon } from '../../AUI/aui.common.constants';
import { questionreportClass } from '../../AUI/reports.constants';
import { examAttendanceClass, examClass, sampleExamClass } from '../../AUI/exam.constants';

Cypress.auiCommon = Cypress.auiCommon || {};

function assembleDateStart(_offset) {
    let day2Start, today = new Date()
    day2Start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + _offset).getTime()
    cy.log(day2Start)
    return day2Start
}
function converTime(_time) {
    let nowDisplay = new Date().toLocaleTimeString().split(' ')[1]
    let res = { time: _time, display: 'AM' }

    if (_time > 12 || _time === 12) {
        res.display = (nowDisplay === 'AM' ? 'PM' : 'PM')
        if (_time > 12) {
            res.time = _time - 12
        }
    }
    cy.log(`time and display value =============================> ${res}`)
    return res
}
function waitEosLoading(_timeout) {
    cy.reload()
    return cy.waitUntil(() => cy.window().then(
        win => (!!win.document.querySelector('.loading'))
            && (win.document.querySelector('.loading').style.display === '')
        //cy.expect(win.context.env).eq('pri-loc')//.should('equal','pri-loc')
    )), {
        errorMsg: 'too long error: ' + _timeout, // overrides the default error message
        timeout: _timeout, // waits up to 100000 ms, default to 5000
        interval: 100 // performs the check every 500 ms, default to 200
    }
}
Cypress.auiCommon.visitURL = (_url, _waiting) => {
    cy.visit(_url)
    cy.waitLoading()
    cy.url().should('contain', _url)
}
Cypress.auiCommon.searchBox = (_selector, _value) => {
    return cy.get(_selector)
        .clear()
        .type(_value)
        .type("{enter}")
        // .waitLoading()
        .wait(3000)
}
Cypress.auiCommon.clearSearchBox = (_selector) => {
    return cy.get(_selector).click({ force: true }).waitLoading().wait(1000)
}
Cypress.auiCommon.verifyConfirmPopup = (_value) => {
    return cy.get(auiDialogClass.auiDialogMessage).should('contain', _value)
};
Cypress.auiCommon.confirmAction = (_value) => {
    return cy.get(`button[name="${_value}"]`).click({ force: true }).waitLoading()
};
Cypress.auiCommon.inputTextByLabel = (_label, _value) => {
    cy.get(_label)
        .find('input')
        .clear()
        .type(_value, { force: true })
}
Cypress.auiCommon.inputTextByClass = (_selector, _value) => {

}
Cypress.auiCommon.selectTextFilter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Course':
                    fil_index = 0
                    break;
                case 'Status':
                    fil_index = 1
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll).eq(0)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(`${auiFilterCommon.auiFilterContainer}:visible`)
                .find(auiCommonClass.auiOptionOKBtn)
                .click({ force: true })
            cy.wait(1500)
        })
}
Cypress.auiCommon.selectDateFilter = (_level, _options) => {
    if (_level === 'all') {
        cy.get(auiDateFilter.auiDateFilterRow).contains('All').as('row')
        cy.get('@row').parent().find(auiCommonClass.auiRadio)
            .click({ force: true })
    }
    if (_level === 'spdate') {
        cy.get(auiDateFilter.auiDateFilterRow).contains('Specific date').as('row')
        cy.get('@row').parent().find(auiCommonClass.auiRadio)
            .click({ force: true })
        cy.get('@row').parent().find(auiCalendar.auiDatePicker)
            .click({ force: true })
        //Cypress.auiCommon.selectDate(0, _options)
        // const pop = '#aui_datepicker_popup_0'
        const pop = auiDateFilter.auiDateFilterPopup
        Cypress.auiCommon.datePicker(pop, _options)
    }
    if (_level === 'dayBefore') {
        cy.get(auiDateFilter.auiDateFilterRow).contains('From').as('row')
        cy.get('@row').parent()
            .find(auiCommonClass.auiRadio)
            .click({ force: true })
        cy.get('@row').find('input[type=text]').clear()
            .type(_options).blur()
    }
    if (_level === 'range') { }

    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiOptionOKBtn)
        .eq(0)
        .click({ force: true })
    cy.wait(1500)
}
Cypress.auiCommon.selectDate = (_index, _date) => {
    cy.get(auiCalendar.auiCalendarContainer).eq(_index).as('calendar')
    let date = auiCalendar.auiCalendarDateStart
    date = date + assembleDateStart(_date) + '"]'
    cy.get('@calendar').find(date)
        .click({ force: true })
}

Cypress.auiCommon.dropdownList = () => {

}
Cypress.auiCommon.comboBoxInput = (_selector, _value, _num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(_selector)
        .find(auiComboboxClass.auiComboInput)
        .eq(num)
        .type(_value, { delay: 25 })
        .type('{enter}')
}
Cypress.auiCommon.comboSearchBox = (_value) => {
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiSearchBoxInput)
        .type(_value, { delay: 25 })
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiOptionItem)
        .eq(0)
        .click({ force: true })
        .wait(500)
}

Cypress.auiCommon.multiLineText = (_selector, _content) => {
    return cy.get(_selector)
        .find(auiCommonClass.auiMutiLineText)
        .clear()
        .type(_content, { delay: 25 })
}
Cypress.auiCommon.verifyTextarea = (_selector, _content) => {
    return cy.get(_selector)
        .find(auiCommonClass.auiMutiLineText)
        .should('contain', _content)
}
Cypress.auiCommon.switchBox = () => {

}
Cypress.auiCommon.radioBox = () => {

}
Cypress.auiCommon.checkBox = (_selector, _rowIndex) => {
    return cy.get(_selector).eq(_rowIndex)
        .click({ force: true })
}
Cypress.auiCommon.checkBoxInTable = (_tbody, _rowIndex) => {
    cy.get(_tbody)
        .find(auiTableClass.auiTRow)
        .as('row')
    cy.get('@row').eq(_rowIndex)
        .find(auiCommonClass.auiCheckBox)
        .click()
};
Cypress.auiCommon.checkBoxInPanelTable = (_rowIndex) => {
    let panel = auiPanelClass.auiPanelVisible
    Cypress.auiCommon.checkBoxInTable(panel, _rowIndex + 1)
};
Cypress.auiCommon.peoplePicker = () => { }

Cypress.auiCommon.datePickerWithTime = (_popup, _dayOffset, _hour, _minute) => {
    cy.get(_popup)
        .find('.aui-basecalendar-body').eq(0)
        .as('calendar')
    let date = auiCalendar.auiCalendarDateStart
    date = date + assembleDateStart(_dayOffset) + '"]'
    cy.get('@calendar').find(date)
        .click({ force: true })
        .wait(300)

    Cypress.auiCommon.TimePicker(_popup, _hour, _minute)
    cy.get(_popup)
        .find('.aui-datepicker-ok button[name="ok"]').eq(1)
        .click({ force: true })
        .wait(300)
}

Cypress.auiCommon.datePicker = (_popup, _dayOffset) => {
    cy.get(_popup)
        .find(auiCalendar.auiCalendarContainer)
        .as('calendar')
    let date = auiCalendar.auiCalendarDateStart
    date = date + assembleDateStart(_dayOffset) + '"]'
    cy.get('@calendar').find(date)
        .click({ force: true })
}
Cypress.auiCommon.TimePicker = (_popup, _hour, _minute) => {
    let now = new Date()
    let nowhh = now.getHours()
    let nowmm = now.getMinutes()

    let current = auiOptionList.auiOptionloopItemSelect
    let current_hour = auiCalendar.auiTimePartHour + current
    let current_minute = '.aui-timepart-minute' + current
    //let timeIndex = auiOptionList.auiOptionloopItemIndex
    let hour = ''
    let time = ''
    cy.window().then(win => {
        let format = win.DefaultDateTimeFormat.Time
        if (format.indexOf('HH') != -1 || format.indexOf('H') != -1) {
            cy.log('is 24 Hour format')
            hour = _hour
        }
        else {
            cy.log('is 12 Hour format')
            time = converTime(_hour)
            cy.log(`display  :  ${time.display}`)
            cy.log(`time  :  ${time.time}`)
            cy.get(_popup).find(`[aria-label="${time.display}"]`)
                .click({ force: true })
            hour = time.time - 1
        }
        let hourIndex = ` [data-index="${hour}"] `
        cy.get(_popup)
            .find(current_hour).parent()
            .find(hourIndex)
            .click({ force: true })

        let minuteIndex = ` [data-index="${_minute}"] `
        cy.get(_popup)
            .find(current_minute).parent()
            .find(minuteIndex)
            .click({ force: true })

    })
}
Cypress.auiCommon.clickBtn = (_selector, _delay) => {
    cy.get(_selector)
        .click({ force: true })
    cy.waitLoading()
};
Cypress.auiCommon.clickEditBtn = (_num) => {
    cy.get(auiButtonClass.editBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(1000)
};
Cypress.auiCommon.clickPenEditBtn = (_num) => {
    cy.get(sampleExamClass.editPaperBtn)
        .eq(_num)
        .parent()
        .click({ force: true })
        .wait(1000)
};
Cypress.auiCommon.clickThemeBtn = (_name, _delay) => {
    let btn = `${auiButtonClass.themeBtn}[aria-label="${_name}"]`
    cy.get(btn)
        .invoke('attr', 'tabindex', 0)
        .focus().wait(200)
        .click({ force: true })
    if (_delay) {
        cy.waitLoading()
    } else {
        cy.waitLoading()
    }
};
Cypress.auiCommon.closeToast = (_num) => {
    let num = _num + 1
    if (num) {
        cy.log('111111111111111111')
        return cy.get(auiCommonClass.auiToastClose)
            .eq(_num)
            .click({ force: true })
    }
    else {
        cy.log('22222222222222222')
        return cy.get(auiCommonClass.auiToastClose)
            .click({ force: true })
    }
};

Cypress.auiCommon.logout = () => {
    cy.get('.layout-userphoto')
        .click({ force: true })
    cy.get('[title="Sign out"]')
        .click({ force: true })
    cy.get(auiDialogClass.auiDialog)
        .find(auiButtonClass.singOutBtn)
        .click({ force: true })
    cy.wait(3000)
}

// Verification Command 
Cypress.auiCommon.verifyBreadcrumb = (_text, _num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(auiCommonClass.auibreadcrumbItem)
        .eq(num)
        .should('contain', _text)
}
Cypress.auiCommon.verifyUrl = (_operation, _url) => {
    if (_operation === 'eq') {
        _operation = 'equal'
    }
    if (_operation === 'include') {
        _operation = 'include'
    }
    cy.url().should(_operation, _url)
}
Cypress.auiCommon.verifyToast = (_content) => {
    cy.get(auiCommonClass.auiToastInfo)
        .should('contain', _content, { timeout: 60000 })
}
Cypress.auiCommon.verifyToast_InModal = (_num, _content) => {
    cy.get(auiCommonClass.auiToastInfo + auiShadowTag.auiI18n)
        .shadow()
        .find('span')
        .eq(_num)
        .should('contain', _content, { timeout: 60000 })
}
Cypress.auiCommon.verifyValiMessage = (_index, _content) => {
    if (_index) {
        return cy.get(auiCommonClass.auiValidationMessage)
            .eq(_index)
            .should('contain', _content)
    } else {
        return cy.get(auiCommonClass.auiValidationMessage)
            .should('contain', _content)
    }
}
Cypress.auiCommon.verifyMessageBarMessage = (_value, _index) => {
    if (_index) {
        return cy.get(auiCommonClass.auiMessageBarMessage + 'span').eq(_index)
            .should('contain', _value)
    } else {
        return cy.get(auiCommonClass.auiMessageBarMessage + 'span')
            .should('contain', _value)
    }
}
// Cypress.auiCommon.verifyConfirmDialogContent = (_dialog) => {
//     if (_dialog.title) {
//         cy.get(auiDialogClass.auiDialogVisible)
//             .as('dialog')
//             .find(auiDialogClass.auiDialogHeader)
//             .should('contain', _dialog.title)
//     }
//     if (_dialog.content) {
//         cy.get('@dialog')
//             .find(auiDialogClass.auiDialogBody)
//             .should('contain', _dialog.content)
//     }
// }
Cypress.auiCommon.verifyTable = (_info, _table) => {
    if (_table) {
        cy.get(_table).as('table')
    } else {
        cy.get(auiTableClass.auiTable).as('table')
    }
    for (let c = 0; c < _info.columns.length; c++) {
        if (_info.columns[c].display) {
            cy.get('@table')
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .should('contain', _info.columns[c].display)
        }
        cy.get('@table')
            .find(auiTableClass.auiTbody)
            .find(auiTableClass.auiTRow)
            .eq(_info.rowIndex - 1)
            .find(auiTableClass.auiTCell)
            .eq(_info.columns[c].index)
            .should('contain', _info.columns[c].value)
    }
};
Cypress.auiCommon.verifyTableInPanel = (_info) => {
    let table = auiPanelClass.auiPanel + auiTableClass.auiTable
    Cypress.auiCommon.verifyTable(_info, table)
};
Cypress.auiCommon.verifyPopoverInner = (_element, _value, _date) => {
    // 此function需要element确定到具体
    cy.get(_element)
        .rightclick({ force: true })
        .wait(500)
    if (_date) {
        cy.get(auiShadowTag.auiTooltip)
            .shadow()
            .find(auiCommonClass.tooltip)
            .should('contain', _value)
            .compareEosTimeFormat(_date)
    }
    else {
        cy.get(auiShadowTag.auiTooltip)
            .shadow()
            .find(auiCommonClass.tooltip)
            .should('contain', _value)
    }
};
Cypress.auiCommon.verifyDisabled = (_element) => {
    cy.get(_element)
        .should('be.disabled')
};
Cypress.auiCommon.verifyEditTimeTip = (_element, _operation, _time) => {
    if (_operation === 'shorten') {
        _operation = 'shorten'
    }
    if (_operation === 'extend') {
        _operation = 'extended'
    }
    cy.get(_element)
        .should('contain', 'Your exam time has been ' + _operation + ' by ' + _time + ' minutes.')
};
Cypress.auiCommon.chooseCheckbox = (_num) => {
    cy.get(auiCommonClass.auiChoiceInput)
        .eq(_num)
        .click()
};
Cypress.auiCommon.chooseCheckbox_InPopupBody = (_num) => {
    cy.get('.aui-popup-body:visible ' + auiCommonClass.auiChoiceInput)
        .eq(_num)
        .click({ force: true })
};
Cypress.auiCommon.filterCheckbox = (_num) => {
    Cypress.auiCommon.chooseCheckbox_InPopupBody(0)
    Cypress.auiCommon.chooseCheckbox_InPopupBody(_num)
    cy.get('.aui-popup-body:visible ' + auiCommonClass.auiOptionOKBtn)
        .click({ force: true })
        .wait(4000)
};
Cypress.auiCommon.clickSave = () => {
    cy.get(auiButtonClass.saveBtn)
        .click({ force: true })
        .waitLoading()
        .wait(1000)
};
Cypress.auiCommon.verifySwitchButton = (_index, _value) => {
    cy.get(auiButtonClass.auiSwitchButton)
        .eq(_index)
        .should('have.attr', 'aria-checked', _value)
};
Cypress.auiCommon.breadcrumbValue = (_value) => {
    cy.get(auiCommonClass.auibreadcrumb)
        .should('contain', _value)
};
Cypress.auiCommon.clickFooterBtnInPanel = (_num) => {
    cy.get(`${auiPanelClass.auiPanelVisible + auiPanelClass.auiPanelFooter} button`)
        .eq(_num)
        .click({ force: true })
        .wait(5000)
};
Cypress.auiCommon.clickFitBoxBtn = (_num) => {
    cy.get(`${auiButtonClass.auiFitBoxBtnContainer} button`)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(500)
};
Cypress.auiCommon.inputInDialog = (_value, _operation) => {
    cy.get(auiDialogClass.auiDialogVisible + auiCommonClass.auiInputTarget)
        .clear({ force: true })
        .type(_value, { force: true })
    cy.get(auiDialogClass.auiDialogVisible + `button[name="${_operation}"]`)
        .click({ force: true })
        .waitLoading()
};
Cypress.auiCommon.inputInDialog_InModal = (_value, _num) => {
    cy.get(auiDialogClass.auiDialogMessage + auiCommonClass.auiInputTarget)
        .clear({ force: true })
        .type(_value, { force: true })
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(_num)
    cy.waitLoading()
};
Cypress.auiCommon.clearInput = (_num) => {
    cy.get(auiCommonClass.auiInputTarget)
        .eq(_num)
        .clear()
};
Cypress.auiCommon.input = (_num, _value) => {
    cy.get(auiCommonClass.auiInputTarget)
        .eq(_num)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.auiCommon.popupInput = (_value) => {
    cy.get(auiPopup.auiPopupInput)
        .clear({ force: true })
        .type(_value, { delay: 25 })
};
// 如果value是数字，则直接选择第几个；如果value不是数字，则先搜索在选择第1个结果
Cypress.auiCommon.checkOptionInDialog = (_value) => {
    cy.get(auiDialogClass.auiDialogVisible + auiComboboxClass.auiComboShell)
        .click({ force: true })
    if (typeof (_value) == 'number') {
    }
    else {
        Cypress.auiCommon.popupInput(_value)
        _value = 0
    }
    cy.get(auiPopup.auiPopupVisible + auiOptionList.auiOptionListText)
        .eq(_value)
        .click({ force: true })
};
// 验证已选择的内容
Cypress.auiCommon.verifySelectedInFlexDialog = (_value) => {
    cy.get(auiDialogClass.auiDialogVisible + auiComboboxClass.auiComboShellContent)
        .should('contain', _value)
};
Cypress.auiCommon.clickFooterBtnInDialog = (_num) => {
    cy.get(auiDialogClass.auiDialogVisible + auiDialogClass.auiDialogFooter + 'button')
        .eq(_num)
        .click({ force: true })
        .wait(3000)
};
Cypress.auiCommon.clickFooterBtnInDialog_InModal = (_num) => {
    cy.get(auiDialogClass.auiDialogMessage + 'button')
        .eq(_num)
        .click({ force: true })
        .wait(3000)
};
Cypress.auiCommon.closePanel = () => {
    cy.get(auiPanelClass.auiPanelVisible + auiButtonClass.auiBtnClose)
        .click({ force: true })
        .waitLoading()
};
Cypress.auiCommon.searchInPanel = (_value) => {
    cy.get(auiPanelClass.auiPanelVisible + questionreportClass.searchInput)
        .clear({ force: true })
        .type(_value, { force: true })
        .type("{enter}")
        .wait(1000)
};
Cypress.auiCommon.inputTextareaInPanel = (_value) => {
    cy.get(auiPanelClass.auiPanelVisible + auiCommonClass.auiMutiLineText)
        .clear({ force: true })
        .type(_value, { force: true })
};
Cypress.auiCommon.verifyHighLightInTable = (_num1, _num2) => {
    cy.get(`[data-cell="${_num1},${_num2}"]`)
        .should('have.attr', 'style', 'background-color: rgb(254, 247, 234);')
};
Cypress.auiCommon.verifyToolTipInTable = (_row, _column, _value) => {
    cy.get(`[data-cell="${_row},${_column}"] ${auiCommonClass.dataTooltip}`)
        .should('have.attr', 'aria-label', _value)
};
Cypress.auiCommon.verifyClockIcon = (_value) => {
    cy.get(examAttendanceClass.clockIcon)
        .should('have.attr', 'aria-label', _value)
};
Cypress.auiCommon.verifyTimeInTable = (_row, _column, _dateTime) => {
    cy.wait(1000)
    if (_dateTime) {
        cy.get(`[data-cell="${_row},${_column}"] ${auiCommonClass.dataTooltip}`)
            .compareEosDateFormat(_dateTime)
            .compareEosTimeFormat(_dateTime)
    } else {
        cy.get(`[data-cell="${_row},${_column}"] ${auiCommonClass.dataTooltip}`)
            .should('contain', '')
    }
};
Cypress.auiCommon.verifyDateInTable = (_row, _column, _dateTime) => {
    cy.get(`[data-cell="${_row},${_column}"] ${auiCommonClass.dataTooltip}`)
        .compareEosDateFormat(_dateTime)
};
Cypress.auiCommon.verifyDateInTable_InShadow = (_row, _column, _dateTime) => {
    cy.get(`[data-cell="${_row},${_column}"]`)
        .find(auiShadowTag.auiEllipsis)
        .compareEosDateFormat(_dateTime)
};
Cypress.auiCommon.verifyCandidateName_InShadow_HaveTag = (_row, _column, _value) => {
    cy.get(`[data-cell="${_row},${_column}"]`)
        .find(auiShadowTag.auiEllipsis)
        .should('contain', _value)
};
Cypress.auiCommon.verifyPopupAvatar = (_num, _value) => {
    cy.get(auiPopup.auiPopupVisible + auiShadowTag.auiProfile)
        .eq(_num)
        .shadow()
        .find('.name ')
        .should('contain', _value)
};
Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag = (_row, _column, _value) => {
    cy.get(`[data-cell="${_row},${_column}"] ${auiShadowTag.auiProfile} `)
        .shadow()
        .find('.name ')
        .should('contain', _value)
};
Cypress.auiCommon.verifyCandidateNameInPanelTable_InShadow_NoTag = (_row, _column, _value) => {
    cy.get(`${auiPanelClass.auiPanelVisible} [data-cell="${_row},${_column}"] ${auiShadowTag.auiProfile} `)
        .shadow()
        .find('.name ')
        .should('contain', _value)
};
Cypress.auiCommon.verifyCandidateNameInPanel_InShadow_NoTag = (_value) => {
    cy.get(`${auiPanelClass.auiPanelVisible} ${auiShadowTag.auiProfile} `)
        .shadow()
        .find('.name ')
        .should('contain', _value)
};
// 验证动态变化的值
Cypress.auiCommon.verifyChangeValueInTable = (_row, _column, _value) => {
    cy.get(`[data-cell="${_row},${_column}"] ${auiCommonClass.dataTooltip}`)
        .should('contain', _value)
};
// // 验证动态变化的值
// Cypress.auiCommon.verifyChangeValueInTable = (_row, _column, _value) => {
//     cy.get(`[data-cell="${_row},${_column}"] ${auiShadowTag.auiEllipsis}`)
//         .should('contain', _value)
// };
// 验证固定的值
Cypress.auiCommon.verifyValueInTable = (_row, _column, _value) => {
    cy.get(`[data-cell="${_row},${_column}"]`)
        .should('contain', _value)
};
Cypress.auiCommon.verifyValueNotInTable = (_row, _column, _value) => {
    cy.get(`[data-cell="${_row},${_column}"]`)
        .should('not.contain', _value)
};
Cypress.auiCommon.verifyFilterNumber = (_num) => {
    cy.get(auiFilterCommon.auiFilterGroup + auiCommonClass.auiWidget)
        .should('have.length', _num)
};
Cypress.auiCommon.verifyBtnContainerBtnNum = (_num) => {
    cy.get(auiButtonClass.auiFitBoxBtnContainer + 'button')
        .should('have.length', _num)
};
Cypress.auiCommon.colunmSort = (_num) => {
    cy.get(`${auiTableClass.auiTableHeader} [data-col="${_num}"]`)
        .click({ force: true })
        .waitLoading()
};
Cypress.auiCommon.verifyPopup = (_value) => {
    cy.get(auiCommonClass.popupText)
        .should('contain', _value)
};
Cypress.auiCommon.verifyComBoxContent = (_num, _value) => {
    cy.get(auiComboboxClass.auiComboShellContent)
        .eq(_num)
        .should('contain', _value)
};
Cypress.auiCommon.clickBreadcrumb = (_num) => {
    cy.get(auiCommonClass.auiBreadcrumbLinkText)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(4000)
};
Cypress.auiCommon.clearSearch_InDialog = () => {
    // cy.get(auiDialogClass.auiDialogBody + auiCommonClass.auiClearSearchBtn)
    cy.get(auiDialogClass.auiDialogBody + '[tooltip="Clear search"] ')
        .as('searchBox')
    Cypress.auiCommon.clearSearchBox('@searchBox')
};
Cypress.auiCommon.clickClose_InDialog = () => {
    cy.get(auiDialogClass.auiDialogHeader + auiButtonClass.auiBtnClose)
        .click()
};
Cypress.auiCommon.clickClose_InPopup = () => {
    cy.get(auiPopup.auiPopupVisible + auiButtonClass.auiBtnClose)
        .click()
};
Cypress.auiCommon.verifyDetailPanel = (_title, _value) => {
    for (let index = 0; index < _title.length; index++) {
        cy.get(auiCommonClass.detailRowTitle)
            .eq(index)
            .should('contain', _title[index])
        cy.get(auiCommonClass.detailRowValue)
            .eq(index)
            .should('contain', _value[index])
    }
};
Cypress.auiCommon.visitUrl = (_url) => {
    cy.visit(_url)
    cy.waitLoading().wait(2000)
};
Cypress.auiCommon.inputRichTextConent = (_value) => {
    cy.get(auiCommonClass.auiRichTextConent)
        .clear({ force: true })
        .type(_value, { delay: 25 })
};
Cypress.auiCommon.clickLinkInTable = (_row, _column) => {
    cy.get(`[data-cell="${_row},${_column}"]`)
        .find('a')
        .click()
};
Cypress.auiCommon.clickButtonInTable = (_row, _column) => {
    cy.get(`[data-cell="${_row},${_column}"]`)
        .find('button')
        .click()
        .waitLoading()
        .wait(500)
};
Cypress.auiCommon.verifyConfirmDialogContent = (_value) => {
    cy.get(auiDialogClass.auiDialogMessage)
        .should('contain', _value)
};
Cypress.auiCommon.verifyConfirmDialogContent_InDialogBody = (_content, _title) => {
    cy.get(auiDialogClass.auiDialogVisible + auiDialogClass.auiDialogBody)
        .should('contain', _content)
    if (_title) {
        cy.get(auiDialogClass.auiDialogVisible + auiDialogClass.auiDialogTitle)
            .should('contain', _title)
    }
};
Cypress.auiCommon.clickToastToViewProcessDetails = () => {
    cy.get(auiCommonClass.auiToastInfo)
        .contains('here')
        .click({ force: true })
        .waitLoading()
        .wait(500)
};
Cypress.auiCommon.verifyProcessContent = (_num, _value) => {
    // cy.get(auiCommonClass.processCenterItemBox + auiShadowTag.auiI18n)
    //     .eq(_num)
    //     .shadow()
    //     .should('contain', _value)
    cy.get(`${auiCommonClass.processCenterItemBox} div [style="color: rgb(160, 166, 170);"]`)
        .eq(_num)
        .then((res) => {
            let time = res.text().split('at ')[1]
            expect(new Date().toJSON().split('T')[0]).to.equal(new Date(time).toJSON().split('T')[0])
        })
};
Cypress.auiCommon.clickActionHeaderBtn = (_num) => {
    cy.get(examAttendanceClass.actionHeaderBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
};
Cypress.auiCommon.deleteBtn = () => {
    cy.get(auiButtonClass.deleBtn)
        .click({ force: true })
};
Cypress.auiCommon.expanderAction = (_num) => {
    cy.get(auiCommonClass.auiExpanderAction)
        .eq(_num)
        .click({ force: true })
};
Cypress.auiCommon.clickFooterPanelBtn = (_num, _operation) => {
    cy.wait(500)
    cy.get(examClass.createExamFootPanel + 'button')
        .eq(_num)
        .click({ force: true })
        .waitLoading()
    // Confirm
    if (_operation) {
        Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    }
};
Cypress.auiCommon.verifyDateInTableContent = (_row, _column, _dateTime) => {
    cy.get(`[data-cell="${_row},${_column}"] ${auiTableClass.auiTCellContent}`)
        .compareEosDateFormat(_dateTime)
};
Cypress.auiCommon.clickCheckBox = (_index) => {
    cy.get(auiCommonClass.auiCheckBox)
        .eq(_index)
        .click({ force: true })
}
Cypress.auiCommon.selectNextDay_InDateRangeCalendar = () => {
    cy.get('.end')
        .invoke('attr', 'data-cell')
        .then((res) => {
            cy.log(res.split(',')[1])
            if (res.split(',')[1] == '7') {
                cy.get('.end')
                    .parent()
                    .next()
                    .find(auiCalendar.auiBaseCalCell)
                    .eq(0)
                    .click({ force: true })
            }
            else {
                cy.get('.end')
                    .next()
                    .click({ force: true })
            }
        })
    cy.get(auiCalendar.auiHomeCalTable + '.active')
        .invoke('attr', 'data-cell')
        .then((res) => {
            cy.log(res.split(',')[1])
            if (res.split(',')[1] == '7') {
                cy.get(auiCalendar.auiHomeCalTable + '.active')
                    .parent()
                    .next()
                    .find(auiCalendar.auiBaseCalCell)
                    .eq(0)
                    .click({ force: true })
            }
            else {
                cy.get(auiCalendar.auiHomeCalTable + '.active')
                    .click({ force: true })
            }
        })
    cy.get(auiPopup.auiPopupVisible + '.aui-rangepicker-ok ' + auiCommonClass.auiOptionOKBtn)
        .eq(1)
        .click()
}
Cypress.auiCommon.clickPopupMenuitemBtn = (_index) => {
    cy.get(auiPopup.auiPopupMenuitemBtn)
        .eq(_index)
        .click()
}
Cypress.auiCommon.verifyIllegalTip = (_num, _value) => {
    cy.get(`${examClass.validationMessage}:visible`)
        .eq(_num)
        .should('contain', _value)
};
Cypress.auiCommon.verifyElementNumber = (_element, _num) => {
    cy.get(_element)
        .should('have.length', _num)
};
Cypress.auiCommon.clickSaveLabelBtn = (_num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(auiButtonClass.saveLabelBtn)
        .eq(num)
        .click({ force: true })
};
Cypress.auiCommon.search = (_value) => {
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(0)
        .clear()
        .type(_value)
        .type("{enter}")
        .waitLoading()
        .wait(1000)
};
Cypress.auiCommon.clickPopupBtn = (_num) => {
    cy.get(auiButtonClass.auiPopupBodyBtn)
        .eq(_num)
        .click({ force: true })
};
Cypress.auiCommon.verifyCurrentUser = (_value) => {
    cy.get(auiShadowTag.auiProfile)
        .eq(0)
        .shadow()
        .find('.name ')
        .should('contain', _value)
};
Cypress.auiCommon.verifyButtonDisabled = (_value) => {
    cy.get(`[aria-label="${_value}"]`)
        .should('have.attr', 'disabled')
};
Cypress.auiCommon.clickButton_HaveLabel = (_value) => {
    cy.get(`[aria-label="${_value}"]`)
        .click()
        .waitLoading()
        .wait(2000)
};
Cypress.auiCommon.comboBoxInput_InPanel = (_value, _num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get(auiPanelClass.auiPanelVisible)
        .find(auiComboboxClass.auiComboInput)
        .eq(num)
        .clear({ force: true })
        .type(_value, { delay: 25 })
        .type('{enter}')
};
Cypress.auiCommon.clickStickySectionBtn = (_num) => {
    cy.get(auiCommonClass.stickySectionBtn)
        .eq(_num)
        .click()
};
Cypress.auiCommon.verifyWhetherChecked = (_selector, _num, _value) => {
    cy.get(_selector)
        .eq(_num)
        .should('have.attr', 'aria-checked', _value)
};
Cypress.auiCommon.verifyInputWhetherChecked = (_num, _value) => {
    Cypress.auiCommon.verifyWhetherChecked(auiCommonClass.auiChoiceInput, _num, _value)
};
Cypress.auiCommon.verifyInputValue = (_num, _value) => {
    cy.get(auiCommonClass.auiInputTarget)
        .eq(_num)
        .should('have.attr', 'value', _value)
};
Cypress.auiCommon.clickDropdownListSelectItem = (_num) => {
    cy.get(auiCommonClass.dropDownListBtn)
        .click({ force: true })
        .wait(300)
    cy.get(auiCommonClass.auiOptionItem)
        .eq(_num)
        .click({ force: true })
};
Cypress.auiCommon.clickTab = (_num) => {
    cy.get(auiCommonClass.auiTabBar)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(500)
};
Cypress.auiCommon.clickSwitchBtn_InModal = (_num) => {
    cy.get(auiShadowTag.auiSwitch)
        .eq(_num)
        .shadow()
        .find('button')
        .click({ force: true })
};
Cypress.auiCommon.verifySwitchBtn_WhetherChecked_InModal = (_num, _value) => {
    cy.get(auiShadowTag.auiSwitch)
        .eq(_num)
        .shadow()
        .find('button')
        .should('have.attr', 'aria-checked', _value)
};
Cypress.auiCommon.clickCloseBtn = () => {
    cy.get(auiButtonClass.auiBtnClose)
        .eq(0)
        .click({ force: true })
};
Cypress.auiCommon.clickMoreBtn = () => {
    cy.get(auiButtonClass.moreLabelBtn)
        .click()
};