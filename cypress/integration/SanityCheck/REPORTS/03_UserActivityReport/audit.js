/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let cu_env_string = Cypress.env('current_Env')
let cu_ten_string = Cypress.env('current_ten')
let env = Cypress.env(cu_env_string)
let searchStaff = env[cu_ten_string].AppAdmin
let searchStu = env[cu_ten_string].Candidates[0]

before(() => {
    cy.window().then(win => {
        let orHt = win.innerHeight, orWid = win.innerWidth
        cy.log(`${orHt},${orWid}`)
        cy.viewport(1024, 768)
        cy.wait(800)
        cy.viewport(orWid, orHt)
    })
})

Given(/^作为Exam admin登录系统，通过Admin首页进入User activity report页面$/, () => {
    cy.LoginExamAsSystem(false)
    cy.wait(1500)
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    Cypress.PageAdminCommon.clickCardbyName("Administration", 'User activity report')
    //Cypress.PageAdminCommon.verifyAdminCard(5)
    //Cypress.PageAdminCommon.clickAuditReportCard()
});
Then(/^使用时间Filter，选择从昨天到今天时间范围内的数据$/, () => {
    Cypress.PageAdminAudit.pickFromDate(-1, 1, 0)
    Cypress.PageAdminAudit.pickEndDate(0, 23, 0)
});
Then(/^使用User Filter，选择一个Student$/, () => {
    Cypress.PageAdminAudit.pickUser(searchStu.userid)
    Cypress.PageAdminAudit.clickSearch()
    cy.wait(1500)
});
Then(/^点击Search获取数据，可以在下方table中可以看到结果$/, () => {
    let stuInfo = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 0,
            //     display: 'Username',
            //     value: searchStu.name,
            // },
            {
                index: 1,
                display: 'User ID',
                value: searchStu.userid,
            },
            {
                index: 2,
                display: 'Staff/Candidate ID',
                value: searchStu.id,
            },
            {
                index: 5,
                display: 'Category',
                value: 'Take exam'
            },
            {
                index: 6,
                display: 'Action',
                value: 'End exam'
            }
        ]
    }
    Cypress.PageAdminAudit.verifyTable(stuInfo)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, searchStu.name)
});