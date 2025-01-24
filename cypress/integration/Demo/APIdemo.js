/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/

let stu_list = []

before(()=>{
    //cy.getStudentList()
    getStuList()
})


function getStuList(){
    Cypress.log({
        name: 'get systoken'
    })
    cy.request({
        url: 'account/account/apeglogin',
        method: 'POST',
        form: false,
        body: {
            userName: "systemaccount@test.qa",
            Password: "1qaz2wsxE"
        }
    }).then((res)=>{
        expect(res.status).to.eq(200)
        listviewApi(res.body.accessToken)
    })
}

function listviewApi(_token){
    Cypress.log({
        name: 'getStudentList'
    })
    let studentListView = '/admin/api/account/studentlistview'
    cy.request({
        url: studentListView,
        method: 'POST',
        auth: { 'bearer': _token },
        body: {
            sortBy: "studentId",
            searchText: "",
            offset: 1,
            limit:10,
            isASC:true,
            SearchFields: "studentName;studentId;userId",
            filters:{
                status:[{name: "Active", checked: true, intValue: 0}]
            }
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        cy.log(res.body.value.result)
        stu_list = res.body.value.result
    })
}

Given(/^I login system as Course Manager$/, () => {
    cy.LoginExamAsSystem(true)
});
 
Then(/^Opening the Exam page$/, () => {
    cy.visit('/admin').wait(1500)
    
    console.table(stu_list)
    
});