Cypress.PaperBankPage = Cypress.PaperBankPage || {}

let ques1 = []
let ques2 = []
let date = new Date().toLocaleString()

let section = [{
    "name": "Section A",
    "description": "",
    "order": 1,
    "allowRandom": false,
    "questions": ques1
},
{
    "name": "Section B",
    "description": "",
    "order": 2,
    "allowRandom": false,
    "questions": ques2
}]

before(() => {
    cy.fixture("question").then(($q) => {
        $q.forEach(($ques,index) => {
            if (index % 2 === 0) {
                ques1.push($ques); // Add to Section A
                cy.log(" ques1 : " + JSON.stringify(ques1))
            } else {
                ques2.push($ques); // Add to Section B
                cy.log(" ques2 : " + JSON.stringify(ques2))

            }
        })
    }).then(() => {
        section[0].questions = ques1
        section[1].questions = ques2
        cy.log("before section : " + JSON.stringify(section))
    })
})

Cypress.PaperBankPage.createPaper = () => {
    cy.CreatePaper_byAPI('1020', 'TutuPaper_'+date, section)
}





