/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let name = 'name' + new Date().toJSON()
let description = 'description' + new Date().toJSON()
// Scenario: Edit Exam overview
Given(/^I click edit exam overview button$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Reports')
    Cypress.auiCommon.clickEditBtn(0)
});
Then(/^I verify the widget name is required field$/, () => {
    Cypress.auiCommon.clearInput(0)
    Cypress.PageDashboardReport.clickWidgetActionBtn(0)
    Cypress.auiCommon.verifyValiMessage(0, 'Enter a value to proceed.')
});
Then(/^I input name, description$/, () => {
    Cypress.auiCommon.input(0, name)
    Cypress.auiCommon.input(1, description)
});
And(/^I verify time is Last 4 weeks by default$/, () => {
    Cypress.PageDashboardReport.verifyDateChecked(2, 'true')
});
// Then(/^I verify have 4 filter and filter by is disabled$/, () => {
//     Cypress.PageAdminCourse.clickTabBar(1)
// });
When(/^I click preview button$/, () => {
    Cypress.PageDashboardReport.clickWidgetActionBtn(0)
});
Then(/^I verify name display right on page$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(0, name)
});
When(/^I click cancel and back to dashboard$/, () => {
    Cypress.PageDashboardReport.clickWidgetActionBtn(1)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});
Then(/^I verify the name no change$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(0, 'Exam overview')
});

// Scenario: Edit Exams delivered by time
Given(/^I expand Exams delivered by time$/, () => {
    Cypress.PageDashboardReport.clickExpandBtn(0)
});
Then(/^I click edit button on expand page$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
And(/^I choose bar chart type$/, () => {
    Cypress.PageDashboardReport.chooseVisualisationType(1)
});
And(/^I verify time is Last 12 months by default$/, () => {
    Cypress.PageDashboardReport.verifyDateChecked(3, 'true')
});
Then(/^I click save button$/, () => {
    Cypress.PageDashboardReport.clickWidgetActionBtn(2)
});
And(/^I verify the second chart name changed successfully$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(1, name)
});
Then(/^I verify name and description display right$/, () => {
    Cypress.auiCommon.verifyConfirmDialogContent_InDialogBody(description, name)
});
Then(/^I close the expand page$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog(0)
});

// Scenario: Edit Candidates with exam taken
Given(/^I expand Candidates with exam taken$/, () => {
    Cypress.PageDashboardReport.clickExpandBtn(1)
});
Then(/^I choose pie chart type$/, () => {
    Cypress.PageDashboardReport.chooseVisualisationType(3)
});
And(/^I verify the third chart name changed successfully$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(2, name)
});

// Scenario: Edit Question type distribution
Given(/^I expand Question type distribution$/, () => {
    Cypress.PageDashboardReport.clickExpandBtn(2)
});
Then(/^I choose line chart type$/, () => {
    Cypress.PageDashboardReport.chooseVisualisationType(0)
});
And(/^I verify the forth chart name changed successfully$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(3, name)
});

// Scenario: Edit Question topics by scoring rate
Given(/^I click edit Question topics by scoring rate button$/, () => {
    Cypress.auiCommon.clickEditBtn(4)
});
And(/^I verify bar chart by default$/, () => {
    Cypress.auiCommon.verifyComBoxContent(0, 'Bar chart')
});
And(/^I verify Scoring rate Largest to smallest by default$/, () => {
    Cypress.auiCommon.verifyComBoxContent(3, 'Scoring rate (Largest to smallest)')
});
And(/^I verify the fifth chart name changed successfully$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(4, name)
});

// Scenario: Edit Top 10 candidates with attended and absent exams
Given(/^I expand Top 10 candidates with attended and absent exams$/, () => {
    Cypress.PageDashboardReport.clickExpandBtn(3)
});
And(/^I verify Absent exams Largest to smallest by default$/, () => {
    Cypress.auiCommon.verifyComBoxContent(4, 'Absent exams (Largest to smallest)')
});
And(/^I verify the sixth chart name changed successfully$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(5, name)
});

// Scenario: Edit Candidates submitted vs. marked
Given(/^I expand Candidates submitted vs. marked$/, () => {
    Cypress.PageDashboardReport.clickExpandBtn(4)
});
And(/^I verify the seventh chart name changed successfully$/, () => {
    Cypress.PageDashboardReport.verifyCardTitle(6, name)
});