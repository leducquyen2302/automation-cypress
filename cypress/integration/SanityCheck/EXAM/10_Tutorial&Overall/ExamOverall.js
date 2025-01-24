/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let cu_env_string = Cypress.env('current_Env')
let cu_ten_string = Cypress.env('current_ten')

// let CurrentUserExamApi = '/schedule/api/exam/getallexamsbycurrentuser'
// let mockExamFixture = 'Mock/MockStudentExamHome.json'

const et_steps = [
    {
        "step_name": "Step 1: Set up basic information",
        "step_des": "You can click Create exam to create your exam, fill in the exam name, set the exam time, add the exam instruction to candidates, and choose whether the online exam can use the Internet and applications."
    },
    {
        "step_name": "Step 2: Assign invigilator",
        "step_des": "You can assign invigilators for the exam, or assign yourself as the invigilator. If you need other invigilators to assist you in the invigilation task, you can add other users. You can also manage the candidates for the exam."
    },
    {
        "step_name": "Step 3: Generate paper",
        "step_des": "You can generate a paper for the exam. You can create an entire new paper directly, or add a paper from bank according to certain rules. You can also configure the score publishing settings for the exam."
    }
]

// before(() => {
//     cy.intercept('POST', CurrentUserExamApi,
//         {
//             fixture: mockExamFixture
//         })
// })

// Scenario: I see a overall table on Homepage , I can see my latest exam at first
Given(/^I logged in Homepage as Course Manager$/, () => {
    cy.LoginExamAsSystem()
});
Then(/^I can see 6 cards on homepage at most, and the latest exam at first$/, () => {
    Cypress.PageExamHome.expectExamCardsLowerThan(6)
    //cy.CompareCardTimeWithFuzzyForamt(0, td)
});

// Scenario: I can see more exams through click more
Given(/^I'm already in Homepage$/, () => { });
When(/^I click the "([^"]*)" link beside the Exam Overall list$/, (arg0,) => {
    Cypress.PageExamHome.clickAndVerifyLink('See all', '/exam')
});

// Scenario: Use Course Code filter and Date filter
When(/^I select Course Code filter$/, () => {
    Cypress.PageExamHome.filter('Course', 'AT001')
});
Then(/^I can find out my Exam by Course Code$/, () => {
    let cardinfo = {
        title: 'AT001',
        titleSta: '',
        candidates: '',
        sta: ""
    }
    Cypress.PageExamHome.verifyExamCardInfo(0, cardinfo)
});
When(/^I select Exam Date filter$/, () => {
    Cypress.PageExamHome.selectDateFilter('spdate', 0)
});
Then(/^I can find out my Exam by Course Date$/, () => {
    //cy.CompareCardTimeWithFuzzyForamt(0, td)
});

// Scenario: I can check tutorial to Create exam step by step and exit tutorial
Given(/^I'm already in Exam page$/, () => {
    Cypress.auiCommon.verifyBreadcrumb("Exam")
});
When(/^I click the tutorial$/, () => {
    Cypress.PageExamHome.clickTutorial('How to create an exam?')
    cy.wait(1500)
});
Then(/^I visit every step on Menu to see the step tutorial$/, () => {
    Cypress.PageExamHome.verifyTutorialContent('Create exam step by step', et_steps)
    Cypress.PageExamHome.closeTutorial()
});
