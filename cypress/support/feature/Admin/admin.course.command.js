/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiFilterCommon, auiDateFilter, auiOptionList, auiPopup, auiCommonClass, auiTableClass, auiButtonClass, auiPanelClass, auiDialogClass, auiComboboxClass, auiShadowTag } from '../../AUI/aui.common.constants';
import { adminCourseClass, adminConductSettings, adminRoleClass } from '../../AUI/admin.constants'
import { examClass, sampleExamClass } from '../../AUI/exam.constants'


const commonMsg = {
    courseCreate: 'The course was created.',
    courseUpdate: 'The course was updated.',
    courseDelete: 'The course was deleted.',
    candiUpdate: 'The candidate was updated.',
    candiDelete: 'The candidate was deleted from current course.',
}

Cypress.PageAdminCourse = Cypress.PageAdminCourse || {};

Cypress.PageAdminCourse.search = (_key) => {
    Cypress.auiCommon.searchBox(adminCourseClass.courseIndex + auiCommonClass.auiSearchBoxInput, _key)
};
Cypress.PageAdminCourse.clearSearch = () => {
    cy.get(auiCommonClass.auiSearchBoxClose).eq(0).as('searchBox')
    Cypress.auiCommon.clearSearchBox('@searchBox')
};
Cypress.PageAdminCourse.clickCourseTableCnadiCount = (_num) => {
    cy.get(adminCourseClass.courseTableCellCandiBtn)
        .eq(_num)
        .click({ force: true })
    cy.waitLoading()
};
Cypress.PageAdminCourse.courseTableRowCheckbox = (_rowIndex) => {
    let table = adminCourseClass.auiTableBody
    Cypress.auiCommon.checkBoxInTable(table, _rowIndex)
};
Cypress.PageAdminCourse.viewCandiEdit = () => {
    let edit = adminCourseClass.editBtn
    Cypress.auiCommon.clickBtn(edit, 8000)
    cy.wait(500)
};
Cypress.PageAdminCourse.clickAddClassBtn = () => {
    cy.get(adminCourseClass.classLeftPanel + 'button')
        .click({ force: true })
        .waitLoading()
        .wait(2000)
};
Cypress.PageAdminCourse.inputClassName = (_value) => {
    cy.get(adminCourseClass.classNameLabel)
        .type(_value, { delay: 25 })
};
Cypress.PageAdminCourse.inputClassOwner = (_name) => {
    cy.get(auiDialogClass.auiDialogBody + auiCommonClass.auiSearchBoxInput)
        .type(_name, { delay: 25 })
        .type('{enter}')
};
Cypress.PageAdminCourse.switchClass = (_index) => {
    cy.get(adminCourseClass.classTab)
        .eq(_index)
        .click({ force: true })
        .waitLoading()
        .wait(1000)
};
Cypress.PageAdminCourse.clickSaveClassBtn = () => {
    cy.get(adminRoleClass.okBtn)
        .click({ force: true })
        .waitLoading()
        .wait(1000)
};
Cypress.PageAdminCourse.clickDeleteClassBtn = () => {
    cy.get(adminCourseClass.classRightPanel + auiButtonClass.deleBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCourse.deleteUser_InRichCombobox = (_num) => {
    cy.get(auiComboboxClass.auiComboItemClose)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminCourse.addCandidate = (_name) => {
    cy.get('.aui-modal-body .action-filter button')
        .eq(0)
        .click({ force: true })
        .waitLoading()
    return Cypress.PageAdminCourse.addressBook(_name)
};
Cypress.PageAdminCourse.checkCandidate = (_rowIndex) => {
    cy.get(adminCourseClass.candidateCheckBox)
        .eq(_rowIndex)
        .click({ force: true })
};
Cypress.PageAdminCourse.searchCandidate = (_name) => {
    cy.get(adminCourseClass.classRightPanel + auiCommonClass.auiSearchBoxInput)
        .type(_name, { force: true })
        .type('{enter}')
        .waitLoading()
};
Cypress.PageAdminCourse.moveCandidate = () => {
    cy.get(adminCourseClass.moveCandidateIcon)
        .parent()
        .click({ force: true })
    cy.contains('Select a class')
        .click({ force: true })
    cy.get(adminCourseClass.classOptionList)
        .click({ force: true })
    cy.get(adminCourseClass.moveConfirmBtn)
        .click({ force: true })
};
Cypress.PageAdminCourse.deleteCandidate = () => {
    cy.get('.aui-modal-body .action-filter button').eq(2).as('deleteBtn')
    Cypress.auiCommon.clickBtn('@deleteBtn', 3000)
};
Cypress.PageAdminCourse.duplicateCourse = () => {
    cy.get(examClass.duplicateBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCourse.clickCreateCourse = () => {
    const createBtn = adminCourseClass.createCourseBtn
    Cypress.auiCommon.clickBtn(createBtn, 3000)
};
Cypress.PageAdminCourse.clickEditCourse = () => {
    const EditBtn = auiCommonClass.auiActionBar + adminCourseClass.editCourseBtn
    return Cypress.auiCommon.clickBtn(EditBtn, 3000)
};
Cypress.PageAdminCourse.clickEditCandidates = () => {
    const EditCandi = auiCommonClass.auiActionBar + adminCourseClass.editCnadiBtn
    return Cypress.auiCommon.clickBtn(EditCandi, 3000)
};
Cypress.PageAdminCourse.clickDelete = () => {
    const deleteBtn = auiCommonClass.auiActionBar + adminCourseClass.deleBtnIcon
    return Cypress.auiCommon.clickBtn(deleteBtn, 3000)
};
Cypress.PageAdminCourse.closePage = () => {
    cy.get(auiPanelClass.auiPanelVisible + auiButtonClass.auiBtnClose)
        .as('closeBtn')
    return Cypress.auiCommon.clickBtn('@closeBtn', 18000)
};
Cypress.PageAdminCourse.inputText = (_filedName, _value) => {
    cy.get(adminCourseClass.newOpenPanel).contains(_filedName).next()
        .find('input')
        .eq(0)
        .clear()
        .type(_value, { delay: 25 })
};
Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse = (_num, _value) => {
    cy.get(adminCourseClass.newOpenPanel + adminConductSettings.dropDownListLabel)
        .eq(_num)
        .click({ force: true })
    cy.get(auiPopup.auiPopupInput)
        .clear()
        .type(_value, { delay: 25 })
        .type('{enter}')
    cy.get(auiPopup.auiPopupVisible + auiOptionList.auiOptionListItem)
        .click({ force: true })
};
Cypress.PageAdminCourse.inputCourseManager = (_value) => {
    cy.get(adminCourseClass.newOpenPanel)
        .contains('Course manager')
        .parent()
        .next()
        .as('label')
    return Cypress.auiCommon.comboBoxInput('@label', _value)
};
Cypress.PageAdminCourse.inputCoCourseManager = (_value) => {
    cy.get(adminCourseClass.newOpenPanel).contains('Co-course manager')
        .next().as('label')
    return Cypress.auiCommon.comboBoxInput('@label', _value)
};
Cypress.PageAdminCourse.inputPaperCrafter = (_value) => {
    cy.get(adminCourseClass.newOpenPanel).contains('Paper crafter').as('pc')
    cy.get('@pc').next().find(adminCourseClass.courseFormAddressBookBtn).click({ force: true })
    cy.waitLoading()
    Cypress.PageAdminCourse.addressBook(_value)
};
Cypress.PageAdminCourse.searchUser_InAddressBook = (_name) => {
    let searchSelector = auiDialogClass.auiDialog + auiCommonClass.input
    cy.get(searchSelector)
        .clear({ force: true })
        .type(_name, { delay: 25 })
        .type('{enter}')
    cy.waitLoading()
};
Cypress.PageAdminCourse.ClickAddUserBtn_InAddressbook = (_num) => {
    cy.get(auiDialogClass.auiDialogBody)
        .find(auiTableClass.auiTableRow)
        .find('button')
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminCourse.addressBook = (_name) => {
    Cypress.PageAdminCourse.searchUser_InAddressBook(_name)
    cy.waitLoading()
    Cypress.PageAdminCourse.ClickAddUserBtn_InAddressbook(0)
    let dialogAdd = adminCourseClass.addressBookDialog + adminCourseClass.addressBookDialogAddBtn
    cy.get(dialogAdd)
        .click({ force: true })
    cy.waitLoading()
    cy.wait(1500)
};
Cypress.PageAdminCourse.cancelForm = (_fromName) => {
    let label
    if (_fromName === 'Edit') {
        label = 'Edit course'
    }
    if (_fromName === 'Create') {
        label = 'Create course'
    }
    if (_fromName === 'View') {
        label = 'View candidates'
    }
    // cy.get(`[aria-label="${label}"] ` + auiPanelClass.auiPanelFooter)
    // cy.get(`[aria-label="${label}"] `).parent().parent().parent()
    cy.get(adminCourseClass.cancelBtn)
        .eq(0)
        .click({ force: true })
        .wait(500)
    cy.waitLoading()
};
Cypress.PageAdminCourse.saveEditCandidate = (_form) => {
    let label
    if (_form === 'Create') {
        label = "Create course"
    }
    if (_form === 'Edit') {
        label = "Edit course"
    }
    cy.get(`[aria-label="${label}"]`)
        .find(auiButtonClass.saveEditCandi)
        .click({ force: true })
        .wait(500)
    cy.waitLoading()
};
Cypress.PageAdminCourse.closeForm = (_form) => {
    cy.get(`[aria-label="${_form}"]`)
        .find(auiPanelClass.auiPanelClose)
        .click({ force: true })
}
Cypress.PageAdminCourse.saveAndEditCandidates = () => {
    cy.get(adminCourseClass.saveAndEditCandidatesBtn)
        .click({ force: true })
        .waitLoading()
        .wait(1000)
};
Cypress.PageAdminCourse.clickMoreStaffs = (_num) => {
    cy.get(adminCourseClass.courseMoreStaffs)
        .eq(_num)
        .click({ force: true })
};

Cypress.PageAdminCourse.newCourse = (_courseInfo) => {
    Cypress.PageAdminCourse.search(_courseInfo.code)

    cy.get('.aui-table-body').then(($table) => {
        if ($table.text().indexOf(_courseInfo.code) != -1) {
            cy.log(` ${_courseInfo.code} SKIP !`)
        } else {
            Cypress.PageAdminCourse.clickCreateCourse();
            cy.log(_courseInfo)
            Cypress.PageAdminCourse.inputText('Course code', _courseInfo.code)
            Cypress.PageAdminCourse.inputText('Course name', _courseInfo.name)
            Cypress.PageAdminCourse.inputCourseManager(_courseInfo.CM.staffName)
            if (_courseInfo.coManager) { }
            if (_courseInfo.paperCf) { }
            Cypress.PageAdminCourse.saveEditCandidate('Create')

            for (let c = 0; c < _courseInfo.candis.length; c++) {
                Cypress.PageAdminCourse.addCandidate(_courseInfo.candis[c].name)
            }
            Cypress.PageAdminCourse.closeForm('Edit candidates')
        }
    })

    cy.waitLoading()
    //Cypress.PageAdminCourse.saveEditCandidate('')
}
Cypress.PageAdminCourse.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'School':
                    fil_index = 0
                    popup_index = 2
                    break;
                case 'Discipline':
                    fil_index = 1
                    popup_index = 3
                    break;
                case 'Course':
                    fil_index = 2
                    popup_index = 0
                    break;
                case 'Semester':
                    fil_index = 3
                    popup_index = 1
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
            cy.waitLoading().wait(1000)
        })
}

// Verification Command 
Cypress.PageAdminCourse.verifyCreateCourseInfo = (_info) => {
    if (_info.courseCode) {
        cy.get(adminCourseClass.courseCodeLabel)
            .should('have.attr', 'value', _info.courseCode)
    }
    if (_info.courseName) {
        cy.get(adminCourseClass.courseNameLabel)
            .should('have.attr', 'value', _info.courseName)
    }
    if (_info.semester) {
        cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiComBox)
            .children()
            .eq(0)
            .should('contain', _info.semester)
    }
    if (_info.school) {
        cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiComBox)
            .children()
            .eq(1)
            .should('contain', _info.school)
    }
    if (_info.discipline) {
        cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiComBox)
            .children()
            .eq(2)
            .should('contain', _info.discipline)
    }
    if (_info.cm) {
        cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiComBox)
            .find(auiShadowTag.auiProfile)
            .eq(0)
            .shadow()
            .find('.name ')
            .should('contain', _info.cm)
    }
    if (_info.coCM) {
        cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiComBox)
            .find(auiShadowTag.auiProfile)
            .eq(1)
            .shadow()
            .find('.name ')
            .should('contain', _info.coCM)
    }
    if (_info.paperCrafter) {
        cy.get(auiCommonClass.auiModalBody + auiCommonClass.auiComBox)
            .find(auiShadowTag.auiProfile)
            .eq(2)
            .shadow()
            .find('.name ')
            .should('contain', _info.paperCrafter)
    }
};
Cypress.PageAdminCourse.verifyMoreStaff = (_content) => {
    cy.get(auiPopup.auiPopupVisible + auiShadowTag.auiProfile)
        .shadow()
        .find('.name ')
        .should('contain', _content)
};
Cypress.PageAdminCourse.verifyCandiTable = (_content, _rowIndex) => {
    cy.get(adminCourseClass.candidateTable)
        .find(auiShadowTag.auiProfile)
        .eq(_rowIndex)
        .shadow()
        .find('.name ')
        .should('contain', _content)
};
Cypress.PageAdminCourse.verifyCourseTable = (_content) => {
    Cypress.auiCommon.verifyTable(_content)
};
Cypress.PageAdminCourse.verifyWatermark = (_number) => {
    cy.get(adminCourseClass.newOpenPanel + auiCommonClass.auiSearchBoxInput)
        .eq(_number)
        .should('have.attr', 'placeholder', 'Search by staff name, staff ID, or user ID')
};
Cypress.PageAdminCourse.verifyClassInfo = (_className, _user1, _user2) => {
    cy.get(adminCourseClass.classTitle)
        .should('contain', _className)
    cy.get(adminCourseClass.classOwnerRow + auiShadowTag.auiProfile)
        .shadow()
        .find('.name ')
        .should('contain', _user1)
    if (_user2) {
        cy.get(adminCourseClass.moreClassOwnerIcon)
            .should('contain', '+')
            .and('contain', '1')
        cy.get(adminCourseClass.moreClassOwnerIcon)
            .click({ force: true })
        cy.get(auiPopup.auiPopupVisible + auiShadowTag.auiProfile)
            .shadow()
            .find('.name ')
            .should('contain', _user1)
            .and('contain', _user2)
    }
};
Cypress.PageAdminCourse.verifyMoveBtnDisabled = () => {
    cy.get(adminCourseClass.moveCandidateIcon)
        .parent()
        .should('have.attr', 'disabled')
};
Cypress.PageAdminCourse.verifyClassCandidateCount = (_num, _value) => {
    cy.get(adminCourseClass.classCandidateCount)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageAdminCourse.verifyStructure_DeleteLevelBtn = () => {
    cy.get(adminCourseClass.deleBtnIcon)
        .eq(0)
        .parent()
        .as('deleteBtn')
    cy.get('@deleteBtn')
        .should('have.attr', 'disabled')
    cy.get('@deleteBtn')
        .should('have.attr', 'aria-label', 'This action is not available as the organisation structure has been published.')
};
Cypress.PageAdminCourse.verifyStructure_AddLevelBtn = () => {
    cy.get(auiPanelClass.auiPanelBody + sampleExamClass.addIcon)
        .parent()
        .as('addBtn')
    cy.get('@addBtn')
        .should('have.attr', 'disabled')
    cy.get('@addBtn')
        .should('have.attr', 'aria-label', 'This action is not available as the organisation structure has been published.')
};
Cypress.PageAdminCourse.verifyStructureValue = (_num, _value) => {
    cy.get(auiCommonClass.auiInputTarget)
        .eq(_num)
        .should('have.attr', 'value', _value)
};

// Organization
Cypress.PageAdminCourse.clickTabBar = (_number) => {
    cy.get(auiCommonClass.auiTabBar)
        .eq(_number)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCourse.clickCreateTopOrganizationBtn = () => {
    cy.get(adminCourseClass.createTopOrganizationBtn)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCourse.clickOrganizationStructure = () => {
    cy.get(adminCourseClass.structureBtn)
        .parent()
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCourse.clickCreateSubOrganizationBtn = (_value) => {
    cy.get(`[aria-label="School: ${_value}"] [aria-label="Add sub-organisation"]`)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCourse.clickOrganizationActionBtn = (_organName, _action) => {
    cy.get(`[aria-label="School: ${_organName}"] ${adminCourseClass.moreActionsBtn}`)
        .click({ force: true })
        .waitLoading()
    if (_action === 'Edit') {
        cy.get(`.aui-popup-body:visible`)
            .find('button')
            .eq(0)
            .click({ force: true })
            .waitLoading()
    }
    if (_action === 'Delete') {
        cy.get(`.aui-popup-body:visible`)
            .find('button')
            .eq(1)
            .click({ force: true })
            .waitLoading()
    }
};
Cypress.PageAdminCourse.inputOrganizationName = (_name) => {
    cy.get(auiCommonClass.auiInputTarget)
        .clear()
        .type(_name, { force: true })
};
Cypress.PageAdminCourse.inputAdmin = (_name) => {
    cy.get(adminCourseClass.inputAdmin)
        .clear()
        .type(_name, { force: true })
        .type('{enter}')
};
Cypress.PageAdminCourse.verifySearchResult = (_value) => {
    cy.contains(_value)
        .should('have.class', 'background-yellow')
};

// Semester
var semesterStartDate = ''
var semesterEndDate = ''
Cypress.PageAdminCourse.verifySemesterSetting = () => {
    cy.get(auiShadowTag.auiSwitch)
        .shadow()
        .find(auiCommonClass.switchRole)
        .as('semesterBtn')
        .should('have.attr', 'aria-checked', 'true')
    cy.get('@semesterBtn')
        .should('have.attr', 'disabled')
    cy.get(adminCourseClass.enableSemester)
        .eq(0)
        .should('contain', 'Enable semester')
};
Cypress.PageAdminCourse.verifySemesterBtnToolTip = () => {
    cy.get(auiShadowTag.auiSwitch)
        .shadow()
        .find(auiCommonClass.switchRole)
        .should('have.attr', 'aria-label', 'This setting cannot be disabled since there are existing semesters.')
};
Cypress.PageAdminCourse.createSemester = () => {
    cy.get(adminCourseClass.createSemester)
        .click({ force: true })
};
Cypress.PageAdminCourse.editSemesterStartDate = (_date) => {
    cy.get(auiPanelClass.auiPanel + auiComboboxClass.auiComboShellInput)
        .eq(0)
        .click({ force: true })
    cy.get(auiDateFilter.auiDateFilterPopup)
        .eq(0)
        .as('calendar')
    Cypress.auiCommon.datePicker('@calendar', _date)
    // cy.get(auiPanelClass.auiPanel + auiComboboxClass.auiComboShellInput)
    //     .eq(0)
    //     .children()
    //     .then(($value) => {
    //         semesterStartDate = $value.text()
    //     })
    // cy.log(`semesterStartDate ================> ${semesterStartDate}`)
};
Cypress.PageAdminCourse.editSemesterEndDate = (_date) => {
    cy.get(auiPanelClass.auiPanel + auiComboboxClass.auiComboShellInput)
        .eq(1)
        .click({ force: true })
    cy.get(auiDateFilter.auiDateFilterPopup)
        .eq(1)
        .as('calendar')
    Cypress.auiCommon.datePicker('@calendar', _date)
    // cy.get(auiPanelClass.auiPanel + auiComboboxClass.auiComboShellInput)
    //     .eq(1)
    //     .children()
    //     .then(($value) => {
    //         semesterEndDate = $value.text()
    //     })
};
Cypress.PageAdminCourse.inputSemesterName = (_value) => {
    cy.get(adminCourseClass.inputSemesterName + 'input')
        .clear()
        .type(_value, { force: true })
        .wait(500)
};
Cypress.PageAdminCourse.inputSemesterDescription = (_value) => {
    cy.get(adminCourseClass.semesterDescriptionLabel)
        .clear()
        .type(_value, { force: true })
        .wait(500)
};
Cypress.PageAdminCourse.verifySemesterTableDate = (_rowIndex, _name, _des) => {
    let semester = {
        rowIndex: _rowIndex,
        columns: [
            {
                index: 1,
                display: 'Name',
                value: _name
            },
            {
                index: 2,
                display: 'Description',
                value: _des
            },
            {
                index: 3,
                display: 'Start date',
                value: semesterStartDate
            },
            {
                index: 4,
                display: 'End date',
                value: semesterEndDate
            }
        ]
    }
    Cypress.PageAdminCourse.verifyCourseTable(semester)
};
Cypress.PageAdminCourse.verifyCreateCourseStepColor = (_num, _value) => {
    cy.get(adminCourseClass.courseStepSegment)
        .eq(_num)
        .should('have.class', `step-segment-${_value}`)
};
Cypress.PageAdminCourse.clickSyncCandidateBtn = () => {
    cy.get(adminCourseClass.syncCandidate)
        .click({ force: true })
};
Cypress.PageAdminCourse.clickSyncCandidateForSelectCourseBtn = () => {
    cy.get(adminCourseClass.syncCandidateForSelectCourse)
        .click({ force: true })
};
Cypress.PageAdminCourse.clickSyncCandidateForAllCourseBtn = () => {
    cy.get(adminCourseClass.syncCandidateForAllCourse)
        .click({ force: true })
};
Cypress.PageAdminCourse.confirmDialog = (_num) => {
    cy.get(auiShadowTag.auiModal)
        .find('button')
        .eq(_num)
        .click({ force: true })
        .wait(500)
};