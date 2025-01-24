/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { examLiveProctoringClass, examAttendanceClass, examClass, examStudentClass, sampleExamClass } from '../../AUI/exam.constants'
import { auiCommonClass, auiShadowTag, auiPopup, auiComboboxClass, auiTableClass, auiDialogClass, auiButtonClass, auiOptionList, auiCalendar, auiFilterCommon } from '../../AUI/aui.common.constants'

Cypress.PageExamLiveProctoring = Cypress.PageExamLiveProctoring || {};

Cypress.PageExamLiveProctoring.verifyDefault9Display = () => {
    cy.get(auiShadowTag.auiTabBtn)
        .shadow()
        .find(auiCommonClass.roleTab)
        .should('have.attr', 'aria-selected', 'true')
};
Cypress.PageExamLiveProctoring.switch25Display = () => {
    cy.get(examLiveProctoringClass.twentyFiveVideo)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamLiveProctoring.verify1Row5Gird = () => {
    cy.get(examLiveProctoringClass.everyRowContent)
        .eq(0)
        .children()
        .should('have.length', 5)
};
Cypress.PageExamLiveProctoring.verifyExaminationStatus = (_num, _value) => {
    cy.get(examLiveProctoringClass.examinationStatus)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageExamLiveProctoring.refreshLiveVideo = () => {
    cy.contains('Refresh')
        .parent()
        .click({ force: true })
        .waitLoading()
};
Cypress.PageExamLiveProctoring.verifyVideoName = (_num, _value) => {
    cy.get(examLiveProctoringClass.girdVideoName)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageExamLiveProctoring.clickStudentChatIcon = (_num) => {
    cy.get(examLiveProctoringClass.invigilatorIconBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(1000)
};
Cypress.PageExamLiveProctoring.sentMessage = (_value) => {
    cy.get(examLiveProctoringClass.chatTextarea)
        .type(_value, { force: true })
        .type('{enter}')
};
Cypress.PageExamLiveProctoring.verifySentSuccessed = (_value) => {
    cy.get(examLiveProctoringClass.chatContent)
        .should('contain', _value)
};
Cypress.PageExamLiveProctoring.verifyChatMessageNumber = (_number) => {
    cy.get('.chat-box-mymsg')
        .should('have.length', _number)
};
Cypress.PageExamLiveProctoring.closeChat = (_value) => {
    cy.get(examLiveProctoringClass.closeIcon)
        .eq(0)
        .click({ force: true })
};
Cypress.PageExamLiveProctoring.fullOrsmall_tooltip = (_value) => {
    let tooltip = ''
    if (_value === 'full') {
        tooltip = 'Focus on videos'
    }
    if (_value === 'small') {
        tooltip = 'Normal view'
    }
    cy.get(`[aria-label="${tooltip}"]`)
        .rightclick({ force: true })
    cy.get(auiShadowTag.auiTooltip)
        .shadow()
        .find(auiCommonClass.tooltip)
        .should('contain', tooltip)
};
Cypress.PageExamLiveProctoring.switchFullOrSmallScreen = (_value) => {
    if (_value === 'full') {
        cy.get(examLiveProctoringClass.fullScreen)
            .click({ force: true })
    }
    if (_value === 'small') {
        cy.get(examLiveProctoringClass.smallScreen)
            .click({ force: true })
    }
};
Cypress.PageExamLiveProctoring.clickEndExam = () => {
    let endExam = auiDialogClass.auiDialogBody + examAttendanceClass.endExamBtn
    cy.get(endExam)
        .click({ force: true })
};
Cypress.PageExamLiveProctoring.verifyEndTip = (_name) => {
    cy.get(examLiveProctoringClass.confirmDialog)
        .should('contain', `You are about to end exam for candidate ${_name}, and the candidate responses that were updated during the network disconnection cannot be submitted. Please write down your comment below.`)
};
Cypress.PageExamLiveProctoring.inputEndComment = (_value) => {
    cy.get(examAttendanceClass.textArea)
        .type(_value, { force: true })
};
Cypress.PageExamLiveProctoring.clickEndOK = () => {
    cy.get(examAttendanceClass.okBtn).eq(1).click({ force: true })
};
Cypress.PageExamLiveProctoring.clickMaximize = () => {
    cy.get(examAttendanceClass.maximizeBtn)
        .eq(0)
        .click({ force: true })
};
Cypress.PageExamLiveProctoring.closeMaximize = () => {
    cy.get(auiCommonClass.auiDialogContainer + auiButtonClass.auiBtnClose)
        .eq(1)
        .click({ force: true })
};
Cypress.PageExamLiveProctoring.serchPeopleByName = (_data) => {
    cy.get(examAttendanceClass.liveproctoringSearch)
        .find('input')
        .type(_data, { force: true })
        .type('{enter}', { force: true })
        .wait(1000)
};
Cypress.PageExamLiveProctoring.verifyLiveProctorSettings = () => {
    cy.get(examLiveProctoringClass.liveProctoringSettings)
        .click({ force: true })
    cy.get(auiShadowTag.auiPopover)
        .should('contain', 'Both the candidate proctoring and screen proctoring are enabled for this exam.')
        .and('contain', 'The following suspicious activities are invigilated in real-time:')
        .and('contain', 'No person')
        .and('contain', 'Multiple persons')
        .and('contain', 'No face')
        .and('contain', 'Mismatching person')
        .and('contain', 'Not facing the screen')
        .and('contain', 'Suspicious device')
        .and('contain', 'Human voice')
        .and('contain', 'Note: If face verification is disabled for the exam, the facial recognition feature will be unavailable for the candidates who have no photos uploaded.')
};
Cypress.PageExamLiveProctoring.verifyCandidateNumber = (_num) => {
    cy.get(examLiveProctoringClass.videoContainer)
        .should('have.length', _num)
};
Cypress.PageExamLiveProctoring.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let check_index = ''
            switch (_name) {
                case 'Class name':
                    fil_index = 0
                    check_index = 1
                    break;
                case 'Group name':
                    fil_index = 1
                    check_index = 0
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(check_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(check_index)
                .click({ force: true })
                .waitLoading()
                .wait(500)
        })
};
Cypress.PageExamLiveProctoring.openGroupFilter = () => {
    cy.get(auiFilterCommon.auiFilterContent)
        .eq(1)
        .click({ force: true })
};
Cypress.PageExamLiveProctoring.verifyGroupNameAndOrder_InFilterButton = (_groupNumber, _groupName) => {
    cy.log(_groupName)
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiOptionItem)
        .should('have.length', _groupNumber)
    for (let i = 0; i < _groupNumber; i++) {
        cy.get(auiOptionList.auiOptionListItem)
            .eq(i)
            .should('contain', _groupName + i)
    }
};
Cypress.PageExamLiveProctoring.verifyNoStudentShow = () => {
    cy.get(examLiveProctoringClass.noItemMessage)
        .should('contain', 'No candidates to show')
};
Cypress.PageExamLiveProctoring.verifyRightList = (_num, _name) => {
    cy.get(examLiveProctoringClass.rightCandidateListCount)
        .should('contain', _num)
    Cypress.auiCommon.verifyCurrentUser(_name)
};
Cypress.PageExamLiveProctoring.verifyChatMessageNum = (_num) => {
    cy.get(examLiveProctoringClass.chatMessageNumber)
        .should('contain', _num)
};
Cypress.PageExamLiveProctoring.selectChatUser = (_num) => {
    cy.get(examLiveProctoringClass.chatListItem)
        .eq(_num)
        .click()
        .waitLoading()
};