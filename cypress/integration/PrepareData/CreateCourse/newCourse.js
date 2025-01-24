/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let newCourseInfo = {}, allCandi , CM
let courseInfo = {
    code: "ATC001",
    name: "AT Course 001",
    CourseManager: "",
    PaperCrafter: ""
}
before(() => {
    cy.fixture("/CreateDate/newCourse.json").then(($basic) => {
        newCourseInfo = $basic.Courses
        allCandi = $basic.CandidateList
        CM = $basic.CourseManager
    })
})


Given(/^App Admin login, visit Course configuration page$/, () => {
    cy.LoginExamAsSystem()
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCourseCard()
    cy.wait(1500)
});

Then(/^Create Courses$/, () => {
    for (let i = 0; i < newCourseInfo.length; i++) {
        cy.wait(1000)
        newCourseInfo[i].candis = allCandi
        newCourseInfo[i].CM = CM
        Cypress.PageAdminCourse.newCourse(newCourseInfo[i])
    }
})