/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const tutorial = [
    {
        step: 'Set up exam',
        des: 'Simple process of creating an exam. Set the exam basic information, assign invigilators and manage candidates, and generate a paper with multiple question types.'
    },
    {
        step: 'Conduct exam and video proctoring in real-time',
        des: 'Invigilators can conduct the exam remotely and monitor candidates via webcam in real-time. Candidates need to do the facial-based authentication before starting the exam, and attendance can be marked automatically.'
    },
    {
        step: 'Mark scores and publish exam results',
        des: "Examena supports auto marking close-ended questions for candidates' responses. Markers can adjust scores manually based on the marking scheme, and decide whether to publish the exam results."
    }
]

before(() => {
    cy.window().then(win => {
        let orHt = win.innerHeight, orWid = win.innerWidth
        cy.log(`${orHt},${orWid}`)
        cy.viewport(1024, 768)
        cy.wait(800)
        cy.viewport(orWid, orHt)
    })
    cy.LoginExamAsSystem()
})

// Scenario: Check Homepage 组件
Given(/^I visit EMS Homepage URL$/, () => {
    Cypress.PageAdminCommon.visitHome(15000)
})
Then('I should see Quick Tutorial和其他组件', () => {
    Cypress.PageExamHome.latestExam('Latest exams')
    Cypress.PageExamHome.landingUnit(0, 'Global links')
    Cypress.PageExamHome.landingUnit(1, 'Calendar')
})
And('I can see Powered by MaivenPoint in footer', () => {
    Cypress.PageExamHome.verifyFooterCopyright()
})
Then('I Check Tutorial each Steps', () => {
    Cypress.PageExamHome.verifyQuickTutorial('Quick tutorial for Examena', tutorial)
})
When("I click Create Exam", () => {
    Cypress.PageExamHome.clickCreateExam(2)
});
Then('I should opening Create Exam page', () => {
    Cypress.auiCommon.verifyUrl('include', '/create?')
});

//Scenario: Visit Each function
Given(/^I go back to HomePage$/, () => {
    Cypress.PageAdminCommon.visitHome(15000)
})
Then(/^I should see 6 navi on Left navigation$/, () => {
    Cypress.PageAdminCommon.verifyNavigationLink(6)
});
Then('I visit Exam Page through left Navi', () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Exam')
});
Then('I visit Bank Page through left Navi', () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Bank')
});
Then('I visit Report Page through left Navi', () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Reports')
});
Then('I visit Admin Page through left Navi', () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump("Admin")
})
Then('I visit Calendar Page through left Navi', () => {
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Calendar')
})