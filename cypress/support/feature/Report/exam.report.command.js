/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiFilterCommon, auiComboboxClass, auiOptionList } from '../../AUI/aui.common.constants'
import { examClass, sampleExamClass } from '../../AUI/exam.constants';
import { reportsClass } from '../../AUI/reports.constants'


Cypress.PageReport = Cypress.PageReport || {};

Cypress.PageReport.enterStaicReport = (_ifExistDashboard, _num, _wating) => {
    if (_ifExistDashboard) {
        Cypress.auiCommon.clickTab(1)
    }
    cy.get(reportsClass.reportCardTitle)
        .eq(_num)
        .click({ force: true })
    if (_wating) {
        cy.waitLoading()
    } else {
        cy.waitLoading()
    }
    cy.wait(2000)
}
Cypress.PageReport.search = (_value) => {
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(0)
        .as('search')
    Cypress.auiCommon.searchBox('@search', _value)
    // cy.waitLoading()
}
Cypress.PageReport.Filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'School':
                    fil_index = 0
                    popup_index = 5
                    break;
                case 'Discipline':
                    fil_index = 1
                    popup_index = 6
                    break;
                case 'Course':
                    fil_index = 2
                    popup_index = 0
                    break;
                case 'Semester':
                    fil_index = 3
                    popup_index = 4
                    break;
                case 'Status':
                    fil_index = 4
                    popup_index = 1
                    break;
                case 'Exam classification':
                    fil_index = 5
                    popup_index = 2
                    break;
                case 'Score status':
                    fil_index = 6
                    popup_index = 3
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
            cy.wait(3000)
        })
};
Cypress.PageReport.classificationFilter = () => {
    // 第一次使用是 filter fixed exam
    // 第二次使用是 filter flexibled exam
    cy.get(auiComboboxClass.auiComboShell)
        .eq(2)
        .click({ force: true })
        .wait(1000)
    cy.get(sampleExamClass.selectAll)
        .eq(1)
        .click({ force: true })
        .wait(1000)
    cy.get(examClass.fixedTime)
        .parent()
        .click({ force: true })
        .wait(1000)
    cy.get(auiCommonClass.auiPopupBody + auiCommonClass.auiOptionOKBtn)
        .eq(2)
        .click({ force: true })
        .waitLoading()
}

// Verification Command 
Cypress.PageReport.verifyReportCard = (_index, _card) => {
    cy.get(reportsClass.reportCardTitle)
        .eq(_index)
        .should('contain', _card.title)
    if (_card.des) {
        cy.get(reportsClass.reportCardDes)
            .eq(_index)
            .should('contain', _card.des)
    }
}
Cypress.PageReport.verifyStaticTable = (_info) => {
    for (let c = 0; c < _info.columns.length; c++) {
        if (_info.columns[c].display) {
            cy.get(auiTableClass.auiTableHeader)
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .focus().wait(200)
                .should('contain', _info.columns[c].display)
        }
        if (_info.columns[c].display === 'Last attempted time') {
            cy.get(auiTableClass.auiTbody)
                .find(auiTableClass.auiTRow)
                .eq(_info.rowIndex - 1)
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .focus().wait(100)
                .compareEosDateFormat(_info.columns[c].value)
        }
        else if (_info.columns[c].display === 'Exam time') {
            cy.get(auiTableClass.auiTbody)
                .find(auiTableClass.auiTRow)
                .eq(_info.rowIndex - 1)
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .focus().wait(100)
                .compareEosTimeFormat(_info.columns[c].value_start)
                .compareEosTimeFormat(_info.columns[c].value_end)
        }
        else if (_info.columns[c].display === 'Reading duration') {
            if (_info.columns[c].value === 0) {
                _info.columns[c].value = 'No reading time'
            }
            else {
                _info.columns[c].value = `${_info.columns[c].value} minutes`
            }
            cy.get(auiTableClass.auiTbody)
                .find(auiTableClass.auiTRow)
                .eq(_info.rowIndex - 1)
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .focus().wait(100)
                .should('contain', _info.columns[c].value)
        }
        else if (_info.columns[c].display === 'Answering duration') {
            if (_info.columns[c].value === 0) {
                _info.columns[c].value = 'No answering duration'
            }
            else {
                _info.columns[c].value = `${_info.columns[c].value} minutes`
            }
            cy.get(auiTableClass.auiTbody)
                .find(auiTableClass.auiTRow)
                .eq(_info.rowIndex - 1)
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .focus().wait(100)
                .should('contain', _info.columns[c].value)
        }
        else {
            cy.get(auiTableClass.auiTbody)
                .find(auiTableClass.auiTRow)
                .eq(_info.rowIndex - 1)
                .find(auiTableClass.auiTCell)
                .eq(_info.columns[c].index)
                .invoke('attr', 'tabindex', c)
                .focus().wait(100)
                .should('contain', _info.columns[c].value)
        }
    }
}
Cypress.PageReport.verifyDateTimeInTable = (_row, _column, _dateTime) => {
    cy.get(`[data-cell="${_row},${_column}"] ${auiTableClass.auiTCellContent}`)
        .compareEosDateFormat(_dateTime)
        .compareEosTimeFormat(_dateTime)
};