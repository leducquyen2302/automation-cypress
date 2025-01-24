/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiPopup, auiTableClass, auiFilterCommon, auiCalendar, auiComboboxClass, auiButtonClass, auiPanelClass } from '../../AUI/aui.common.constants';
import { adminAiRobot } from '../../AUI/admin.constants'

Cypress.AiRobot = Cypress.AiRobot || {};

Cypress.AiRobot.openAiRopot = () => {
    cy.get(adminAiRobot.aiChatBot)
        .click()
}
Cypress.AiRobot.verifyAiRobot_BuitlInData = () => {
    let data = [
        'How to add a user?',
        'How to configure a course?',
        'How to create a paper?',
        'How to set up an exam?',
        'How to mark scores and manage marking and grading processes?'
    ]
    for (let index = 0; index < data.length; index++) {
        cy.get(adminAiRobot.aiChatBotInitChatContent)
            .eq(index)
            .should('contain', data[index])
    }
}
Cypress.AiRobot.clickAiRobot_BuitlInData = (_num) => {
    cy.get(adminAiRobot.aiChatBotInitChatContent)
        .eq(_num)
        .click()
}
Cypress.AiRobot.verifyAiRobot_Answer = (_value1, _value2) => {
    if (_value1) {
        cy.waitElement(adminAiRobot.aiChatBotAnswerDot)
    }
    cy.get(adminAiRobot.aiChatBotAnswer)
        .should('contain', _value2)
}
Cypress.AiRobot.clickFooterMoreBtn = () => {
    cy.get(adminAiRobot.aiChatBotFooterMoreBtn)
        .click()
}
Cypress.AiRobot.clickMaxOrMinBtn = () => {
    cy.get(adminAiRobot.aiChatBotMaxIcon)
        .click()
}
Cypress.AiRobot.verifyMaxOrMinIcon = (_value) => {
    cy.get(adminAiRobot.aiChatBotMaxIcon)
        .find('img')
        .should('have.attr', 'src', _value)
}
Cypress.AiRobot.inputText = (_value) => {
    cy.get(adminAiRobot.aiChatBotInputTextBtn)
        .click()
    cy.get(adminAiRobot.aiChatBotInputText)
        .type(_value)
    cy.get(adminAiRobot.aiChatBotSendText)
        .click()
}
Cypress.AiRobot.closeAiBot = (_value) => {
    cy.get(adminAiRobot.aiChatBotCloseBtn)
        .click()
}