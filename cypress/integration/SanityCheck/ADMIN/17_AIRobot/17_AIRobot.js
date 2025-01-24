/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/

// Scenario: AppAdmin verify built in data
Given(/^Login as AppAdmin open ai robot$/, () => {
    cy.LoginExamAsSystem()
    Cypress.AiRobot.openAiRopot()
});
Then(/^I verify have 5 built in data$/, () => {
    Cypress.AiRobot.verifyAiRobot_BuitlInData()
});
When(/^I click How to set up an exam$/, () => {
    Cypress.AiRobot.clickAiRobot_BuitlInData(3)
});
Then(/^I verify How to set up an exam response is right$/, () => {
    Cypress.AiRobot.verifyAiRobot_Answer(true, 'To set up an exam using Examena, you can follow these steps:')
});
When(/^I click footer more button$/, () => {
    Cypress.AiRobot.clickFooterMoreBtn()
});
Then(/^I click How to create a paper$/, () => {
    Cypress.AiRobot.clickAiRobot_BuitlInData(2)
});
And(/^I verify How to create a paper response is right$/, () => {
    Cypress.AiRobot.verifyAiRobot_Answer(true, 'To create a paper using Examena, you can follow these steps:')
});

// Scenario: AppAdmin verify Max and Min
When(/^I click max button$/, () => {
    Cypress.AiRobot.clickMaxOrMinBtn()
});
Then(/^I verify icon is max icon$/, () => {
    Cypress.AiRobot.verifyMaxOrMinIcon('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBkPSJNMTYwIDY0YzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMydjY0SDMyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnMxNC4zIDMyIDMyIDMyaDk2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjY0ek0zMiAzMjBjLTE3LjcgMC0zMiAxNC4zLTMyIDMyczE0LjMgMzIgMzIgMzJIOTZ2NjRjMCAxNy43IDE0LjMgMzIgMzIgMzJzMzItMTQuMyAzMi0zMlYzNTJjMC0xNy43LTE0LjMtMzItMzItMzJIMzJ6TTM1MiA2NGMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMnY5NmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg5NmMxNy43IDAgMzItMTQuMyAzMi0zMnMtMTQuMy0zMi0zMi0zMkgzNTJWNjR6TTMyMCAzMjBjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjk2YzAgMTcuNyAxNC4zIDMyIDMyIDMyczMyLTE0LjMgMzItMzJWMzg0aDY0YzE3LjcgMCAzMi0xNC4zIDMyLTMycy0xNC4zLTMyLTMyLTMySDMyMHoiLz48L3N2Zz4=')
});
When(/^I click min button$/, () => {
    Cypress.AiRobot.clickMaxOrMinBtn()
});
Then(/^I verify icon is min icon$/, () => {
    Cypress.AiRobot.verifyMaxOrMinIcon('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBkPSJNMzIgMzJDMTQuMyAzMiAwIDQ2LjMgMCA2NHY5NmMwIDE3LjcgMTQuMyAzMiAzMiAzMnMzMi0xNC4zIDMyLTMyVjk2aDY0YzE3LjcgMCAzMi0xNC4zIDMyLTMycy0xNC4zLTMyLTMyLTMySDMyek02NCAzNTJjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJ2OTZjMCAxNy43IDE0LjMgMzIgMzIgMzJoOTZjMTcuNyAwIDMyLTE0LjMgMzItMzJzLTE0LjMtMzItMzItMzJINjRWMzUyek0zMjAgMzJjLTE3LjcgMC0zMiAxNC4zLTMyIDMyczE0LjMgMzIgMzIgMzJoNjR2NjRjMCAxNy43IDE0LjMgMzIgMzIgMzJzMzItMTQuMyAzMi0zMlY2NGMwLTE3LjctMTQuMy0zMi0zMi0zMkgzMjB6TTQ0OCAzNTJjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJ2NjRIMzIwYy0xNy43IDAtMzIgMTQuMy0zMiAzMnMxNC4zIDMyIDMyIDMyaDk2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjM1MnoiLz48L3N2Zz4=')
});

// Scenario: AppAdmin ask something
When(/^I ask 1$/, () => {
    Cypress.AiRobot.inputText('1')
});
Then(/^I verify answer 1 is right$/, () => {
    Cypress.AiRobot.verifyAiRobot_Answer(true, `Oops! It seems like your question is beyond my expertise. If you have any questions about our products, I'm here to assist and provide the accurate information!`)
});

// Scenario: AppAdmin close and reopen AiBot
Given(/^I close the window$/, () => {
    Cypress.AiRobot.closeAiBot()
});
Then(/^I reopen AiBot$/, () => {
    Cypress.AiRobot.openAiRopot()
});
And(/^I verify the content is the same as before$/, () => {
    Cypress.AiRobot.verifyAiRobot_Answer(false, `Oops! It seems like your question is beyond my expertise. If you have any questions about our products, I'm here to assist and provide the accurate information!`)
});