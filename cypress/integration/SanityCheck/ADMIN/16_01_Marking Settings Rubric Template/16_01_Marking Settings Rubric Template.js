/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
const templateName = 'AT_Name_' + new Date().toJSON()
const templateName_Edit = 'Edit_AT_Name_' + new Date().toJSON()
const templateName_Edit_Duplicate = templateName_Edit + '_Copy'
const performanceLevel = {
    title: 'PerformanceLevel_Title_' + new Date().toJSON(),
    mark: 10,
    markDescription: 'Marks_Description_' + new Date().toJSON()
}
const marksTitle = 'Marks_Title_' + new Date().toJSON()


// Scenario: AppAdmin create approval process
Given(/^Login as AppAdmin enter Rubric template$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Marking settings')
    Cypress.PageAdminCourse.clickTabBar(1)
});
When(/^I click Create rubric template$/, () => {
    Cypress.PageAdminMarkingsettingsPage.clickRubricTemplateHeaderBtn(0)
});
Then(/^I click save button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I verify illegal tip$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Enter a value to proceed.')
    Cypress.auiCommon.verifyIllegalTip(1, 'Enter a value to proceed.')
    Cypress.auiCommon.verifyIllegalTip(2, 'Complete the configurations for this performance level.')
});
And(/^I verify the template have 3 columns and 2 rows by default$/, () => {
    Cypress.auiCommon.verifyElementNumber('tbody tr', 2)
    Cypress.auiCommon.verifyElementNumber('tbody td', 6)
});
And(/^I input name and course AT002$/, () => {
    Cypress.PageAdminMarkingsettingsPage.inputRubricTemplateName(templateName)
    Cypress.PageAdminMarkingsettingsPage.chooseRubricTemplateCourse('AT002')
});
When(/^I delete all colums and rows$/, () => {
    Cypress.PageAdminMarkingsettingsPage.deleteCriteria(4)
    Cypress.PageAdminMarkingsettingsPage.deleteCriteria(3)
    Cypress.PageAdminMarkingsettingsPage.deleteCriteria(2)
    Cypress.PageAdminMarkingsettingsPage.deleteCriteria(1)
    Cypress.PageAdminMarkingsettingsPage.deleteCriteria(0)
});
Then(/^I verify illegal tip Add at least one performance level$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Add at least one performance level.')
});
When(/^I add one performance level$/, () => {
    Cypress.PageAdminMarkingsettingsPage.addCriteria(0)
});
Then(/^I verify illegal tip Add at least one criterion$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Add at least one criterion.')
});
Then(/^I add the criterion$/, () => {
    Cypress.PageAdminMarkingsettingsPage.addCriteria(1)
});
When(/^I open edit performance level title$/, () => {
    Cypress.auiCommon.clickEditBtn(0)
});
Then(/^I verify illegal tip Complete your settings before saving the rubric template$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Enter a value to proceed.')
    Cypress.auiCommon.verifyIllegalTip(1, 'Complete your settings before saving the rubric template.')
});
And(/^I input the performance level title$/, () => {
    Cypress.PageAdminMarkingsettingsPage.inputPerformanceLevelTitle(performanceLevel.title)
});
And(/^I input the marks title$/, () => {
    Cypress.auiCommon.clickEditBtn(1)
    Cypress.PageAdminMarkingsettingsPage.inputMarksTitle(marksTitle)
});
Then(/^I verify illegal tip Complete the configurations for this performance level$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Complete the configurations for this performance level.')
});
When(/^I open performance level mark to 0$/, () => {
    Cypress.auiCommon.clickEditBtn(2)
    Cypress.PageAdminMarkingsettingsPage.inputQuestionMarks(0)
});
Then(/^I verify illegal tip Enter a positive integer or a decimal with one decimal place$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Enter a positive integer or a decimal with one decimal place.')
});

// Scenario: I create Rubric template
Given(/^I input marking range and description$/, () => {
    Cypress.PageAdminMarkingsettingsPage.inputQuestionMarks(performanceLevel.mark, performanceLevel.markDescription)
});

// Scenario: I edit Rubric template
Given(/^I choose Rubric template just created$/, () => {
    Cypress.PageAdminApplication.appTableRowCheckbox(0)
});
Then(/^I edit the Rubric template name$/, () => {
    Cypress.PageAdminMarkingsettingsPage.clickRubricTemplateHeaderBtn(1)
    Cypress.PageAdminMarkingsettingsPage.inputRubricTemplateName(templateName_Edit)
});

// Scenario: I duplicate Rubric template
Then(/^I click duplicate button to the Rubric template$/, () => {
    Cypress.PageAdminMarkingsettingsPage.clickRubricTemplateHeaderBtn(2)
});
When(/^I do not choose course to click save$/, () => {
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^I verify illegal tip Enter a value to proceed$/, () => {
    Cypress.auiCommon.verifyIllegalTip(0, 'Enter a value to proceed.')
});
Then(/^I also choose course AT002 and save$/, () => {
    Cypress.PageAdminMarkingsettingsPage.chooseRubricTemplateCourse('AT002')
    Cypress.auiCommon.clickPopupBtn(1)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

// Scenario: I delete the duplicate Rubric template
Given(/^I search the duplicate Rubric template$/, () => {
    Cypress.auiCommon.search(templateName_Edit_Duplicate)
});
Then(/^I choose it and delete it$/, () => {
    Cypress.PageAdminApplication.appTableRowCheckbox(0)
    Cypress.PageAdminMarkingsettingsPage.clickRubricTemplateHeaderBtn(3)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});

// Scenario: I filter the course AT002
Given(/^I clear search$/, () => {
    Cypress.PageAdminMarkingsettingsPage.clearSearch()
});
Then(/^I filter the course AT002$/, () => {
    Cypress.PageAdminMarkingsettingsPage.filter('Course', 'AT002')
});

// Scenario: I view Rubric template details
Given(/^I click Rubric template name$/, () => {
    Cypress.auiCommon.clickLinkInTable(1, 2)
});
Then(/^I verify Rubric template details$/, () => {
    let details = {
        name: templateName_Edit,
        course: 'AT002',
        performanceLevelTitle: performanceLevel.title,
        performanceLevelMark: performanceLevel.mark,
        performanceLevelMarkDes: performanceLevel.markDescription,
        markTitle: marksTitle,
        totalMark: performanceLevel.mark
    }
    Cypress.PageAdminMarkingsettingsPage.verifyRubricTemplateDetail(details)
});

// Scenario: I delete Rubric template
Given(/^I close Rubric template details$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(0)
});
Then(/^I delete Rubric template$/, () => {
    Cypress.PageAdminApplication.appTableRowCheckbox(0)
    Cypress.PageAdminMarkingsettingsPage.clickRubricTemplateHeaderBtn(3)
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
});