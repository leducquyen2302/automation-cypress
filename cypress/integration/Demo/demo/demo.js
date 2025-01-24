/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/


Given(/^I login system as Course Manager$/, () => {
    cy.LoginExamAsSystem(true)
});
 
Then(/^Opening the Exam page$/, () => {
    cy.visit('/').wait(2000)
    
    let time = '1/1/2021 10:00'
    cy.CompareCardTimeWithForamt(0, time)

});