/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let new163_User = [
    'emstest24@163.com',
    'emstest25@163.com',
    'emstest26@163.com',
    'emstest27@163.com'
]

// Scenario: Modify 163 user password
Given(/^Modify 163 user password$/, () => {
    for (let i = 0; i < new163_User.length; i++) {
        cy.visit('https://mail.163.com/').wait(4000)
        cy.get('[name="email"]')
            .clear({ force: true })
            .type(new163_User[i])
    }

});

// Scenario: Modify 126 user password
Given(/^Modify 126 user password$/, () => {
    for (let i = 0; i < newCourseInfo.length; i++) {
        cy.wait(1000)
        newCourseInfo[i].candis = allCandi
        newCourseInfo[i].CM = CM
        Cypress.PageAdminCourse.newCourse(newCourseInfo[i])
    }
})