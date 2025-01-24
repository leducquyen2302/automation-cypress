/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiCalendar, auiShadowTag } from '../../AUI/aui.common.constants'
import { examClass } from '../../AUI/exam.constants'

Cypress.PageCalendar = Cypress.PageCalendar || {};
function assembleCellStartDate(_offset) {
    let today = new Date()
    let day = today.getDate() + _offset
    let dayJson = new Date(today.getFullYear(), today.getMonth(), day).getTime()
    return `[data-start="${dayJson}"]`
}
Cypress.PageCalendar.searchExamInCalendar = (_value) => {
    cy.get(auiCommonClass.auiSearchBoxInput)
        .clear({ force: true })
        .type(_value, { force: true })
        .type('{enter}', { force: true })
        .wait(1500)
    cy.waitLoading()
}
Cypress.PageCalendar.selectCalItem = (_day, _index) => {
    cy.get(auiCalendar.auiCalendarMonthTable)
        .find(assembleCellStartDate(_day))
        .find(auiCalendar.auiAgendaItem)
        .eq(_index)
        .invoke('attr', 'tabindex', _index)
        .focus().wait(200)
        .click({ force: true })
        .wait(200)
}
Cypress.PageCalendar.selectPanelItem = (_index) => {
    cy.get(auiCalendar.auiCalendarRightPanel)
        .find(auiShadowTag.auiAgendaEvent)
        .eq(_index)
        .shadow()
        .find('input')
        .click({ force: true })
        .wait(400)
}


// Verification Command 
Cypress.PageCalendar.homeCalendarTable = (_day, _content) => {
    cy.get(auiCalendar.auiHomeCalTable)
        .find(assembleCellStartDate(_day))
        .should('contain', _content)
}
Cypress.PageCalendar.homeCalendarPanelActiveItem = (_data) => {
    // let act = `${auiCalendar.auiHomeCalRightPanel}[aria-hidden="false"]`
    // cy.get(act)
    //     .find(auiCalendar.auiHomeRightPanelItem)
    //     .as('items')

    // cy.get('@items').then(($pi) => {
    //     cy.expect($pi.length).eq(2)
    //     for (let i = 0; i < $pi.length; i++) {
    //         cy.get($pi).eq(i)
    //             .find(auiCalendar.auiHomeRiPanlelItemTi)
    //             .invoke('attr', 'tabindex', i)
    //             .focus().wait(200)
    //         expect($pi.eq(i).text()).contains(_data[i])
    //         cy.wait(500)
    //     }
    // })
    for (let index = 0; index < _data.length; index++) {
        cy.get(auiCalendar.auiHomeRiPanlelItemTi + auiShadowTag.auiEllipsis + 'a')
            .should('contain', _data[index])
    }
}

Cypress.PageCalendar.VerifyCalItem = (_day, _content) => {
    cy.get(auiCalendar.auiCalendarMonthTable)
        .find(assembleCellStartDate(_day))
        .invoke('attr', 'tabindex', 0)
        .focus().wait(200)
        .should('contain', _content)
}
Cypress.PageCalendar.VerifyPanelItem = (_name, _index, _startTime, _duration) => {
    cy.get(auiCalendar.auiCalendarRightPanel)
        .find(auiCalendar.auiCalendarRightContent)
        .find(auiShadowTag.auiAgendaEvent)
        .shadow()
        .as('panel')
    if (_index) {
        cy.get('@panel')
            // .find(auiCalendar.auiAgendaItem)
            // .find(auiCalendar.auiAgendaTitle)
            // .eq(parseInt(_index))
            // .invoke('attr', 'tabindex', parseInt(_index))
            // .focus().wait(200)
            // .should('contain', _name)
            // .find(auiShadowTag.auiAgendaEvent)
            // .shadow()
            .find('.name ')
            .should('contain', _name)
    } else {
        cy.log('no index input')
        cy.get('@panel')
            // .find(auiCalendar.auiAgendaItem)
            // .find(auiShadowTag.auiAgendaEvent)
            // .shadow()
            .find('.name ')
            // .then(($items) => {
            //     //cy.log($items.length)
            //     for (let i = 0; i < $items.length; i++) {
            //         cy.get($items).eq(i)
            //             .invoke('attr', 'tabindex', i)
            //             .focus().wait(200)
            //         //cy.log($items.eq(i).text())
            //         expect($items.eq(i).text()).contains(_name)
            //     }
            // })
            .should('contain', _name)
    }
    if (_startTime) {
        cy.get('@panel')
            .find('.duration div')
            .eq(0)
            .compareEosTimeFormat(_startTime)
        cy.get('@panel')
            .find('.duration div')
            .eq(1)
            .should('contain', _duration)
    }
}
Cypress.PageCalendar.VerifyCalPopup = (_content) => {
    cy.get(auiCalendar.auiCalendarPop)
        .as('pop')
        .find(auiCalendar.auiCalPopItemTi)
        .invoke('attr', 'tabindex', 0)
        .focus().wait(200)
        .should('contain', _content.title)
    // fixed time exam
    if (_content.examTime) {
        cy.get('@pop')
            .find(examClass.examCardTime).next().children()
            .invoke('attr', 'tabindex', 1)
            .focus().wait(200)
            .compareEosDateFormat(_content.examTime)
            .compareEosTimeFormat(_content.examTime)
    }
    if (_content.totalQuestions) {
        cy.get('@pop')
            .find(examClass.examCardQuestionNum).next()
            .invoke('attr', 'tabindex', 2)
            .focus().wait(200)
            .contains(_content.totalQuestions)
    }
    if (_content.fullMarks) {
        cy.get('@pop')
            .find(examClass.examCardMark).next()
            .invoke('attr', 'tabindex', 3)
            .focus().wait(200)
            .contains(_content.fullMarks)
    }
    // flexible time exam
    if (_content.flexibleExam_openTime) {
        cy.get('@pop')
            .find(examClass.examCardFlexibleTime)
            .next().find('span').eq(0)
            .compareEosDateFormat(_content.flexibleExam_openTime)
            .compareEosTimeFormat(_content.flexibleExam_openTime)
    }
    if (_content.flexibleExam_endTime) {
        cy.get('@pop')
            .find(examClass.examCardFlexibleTime)
            .next().find('span').eq(0)
            .compareEosDateFormat(_content.flexibleExam_endTime)
            .compareEosTimeFormat(_content.flexibleExam_endTime)
    }
    if (_content.onlyHave_answeringDuration) {
        cy.get(examClass.examCardDuration)
            .should('have.attr', 'aria-label', ` Answering duration: ${_content.onlyHave_answeringDuration} minutes`)
    }
    if (_content.sum_duration) {
        cy.get(examClass.examCardDuration)
            .should('have.attr', 'aria-label', `Reading duration: ${_content.sum_duration[0]} minutes\n Answering duration: ${_content.sum_duration[1]} minutes`)
            .and('contain', `${_content.sum_duration[2]} mins`)
    }
    if (_content.enrolledNumber) {
        cy.get(examClass.examCardCandidatesNum)
            .next()
            .should('contain', _content.enrolledNumber)
    }
    if (_content.noAnsweringDuration) {
        //判断是否有reading的情况下
        if (_content.noAnsweringDuration) {
            cy.get(auiCalendar.auiCalPopItemProps + examClass.cardTimeRightTips)
                .eq(0)
                .should('not.have.class', 'exam-card-duration')
        }
        else {
            cy.get(auiCalendar.auiCalPopItemProps)
                .eq(1)
                .find('span')
                .eq(1)
                .should('have.length', 1)
        }
    }
}

Cypress.PageCalendar.EventCount = (_day, _num) => {
    cy.get(auiCalendar.auiCalendarMonthTable)
        .find(assembleCellStartDate(_day))
        .find(auiCalendar.auiAgendaItem)
        .then(($items) => {
            cy.expect($items.length).to.equal(_num)
        })
}
Cypress.PageCalendar.PanelItemCount = (_num) => {
    cy.get(auiCalendar.auiCalendarRightPanel)
        .find(auiShadowTag.auiAgendaEvent)
        .then(($items) => {
            cy.expect($items.length).eq(_num)
        })
}
Cypress.PageCalendar.verifyExamTime = (_examName, _endTime) => {
    Cypress.PageCalendar.searchExamInCalendar(_examName)
    Cypress.PageCalendar.selectPanelItem(0)
    cy.get(auiCalendar.auiCalendarPop)
        .as('pop')
        .find(auiCalendar.auiCalPopItemTi)
        .invoke('attr', 'tabindex', 0)
        .focus().wait(200)
        .should('contain', _examName)
    cy.get('@pop')
        .find(examClass.examCardTime).next().children()
        .invoke('attr', 'tabindex', 1)
        .focus().wait(200)
        .compareEosDateFormat(_endTime)
        .compareEosTimeFormat('2022-06-01T15:30:00.000Z')
}
Cypress.PageCalendar.verifyNoItemsInPanel = () => {
    cy.get(auiCalendar.auiCalendarRightContent)
        .should('contain', 'No items to show in this view.')
};
Cypress.PageCalendar.collapsePanel = () => {
    cy.get(auiCalendar.collapsePanelLabel)
        .click({ force: true })
};
Cypress.PageCalendar.expandPanel = () => {
    cy.get(auiCalendar.expandPanelLabel)
        .click({ force: true })
};
Cypress.PageCalendar.selectNextDay = () => {
    cy.get(auiCalendar.currentDate)
        .invoke('attr', 'data-cell')
        .then((res) => {
            cy.log(res.split(',')[1])
            if (res.split(',')[1] == '7') {
                cy.get(auiCalendar.currentDate)
                    .parent()
                    .next()
                    .find(auiCalendar.auiBaseCalCell)
                    .eq(0)
                    .click({ force: true })
            }
            else {
                cy.get(auiCalendar.currentDate)
                    .next()
                    .click({ force: true })
            }
        })
};
Cypress.PageCalendar.verifyPanelTitleDate = (_value) => {
    cy.get(auiCalendar.auiCalPanelTitle)
        .should('contain', _value)
};