/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// const datestring = new Date()
// const MT1 = {
//     name:"AutoMappingTemplate1" + datestring,
//     M1: {
//         min: "80",
//         grade: "High"
//     },
//     M2: {
//         min: "60",
//         grade: "Normal"
//     },
//     M3: {
//         min: "0",
//         grade: "Low"
//     }
// }
// const MT1_edit = {
//     name:"AutoMappingTemplate1" + datestring,
//     M1: {
//         min: "85",
//         grade: "Good"
//     },
//     M2: {
//         min: "65",
//         grade: "OK"
//     },
//     M3: {
//         min: "0",
//         grade: "NO"
//     }
// }
// const MT2 = {
//     name:"AutoMappingTemplate2" + datestring,
//     M1: {
//         min: "0",
//         grade: "High"
//     }
// }
// const notexistname = "Not exist" + datestring;
// const defaultNanem = "Grade mapping template"
// const tempatebyAPI_01 = {
//     name: defaultNanem,
//     body: [{"to":1,"from":0.8,"grade":"A"},{"to":0.8,"from":0,"grade":"B"}]
// }
// const tempatebyAPI_02 = {
//     name: "Grade for Exam test",
//     body: [{"to":1,"from":0.8,"grade":"A"},{"to":0.8,"from":0,"grade":"B"}]
// }
// before(() =>{
//     Cypress.PageAdminMarkingsettingsPage.AddGradeMappingbyAPI(tempatebyAPI_01.name,tempatebyAPI_01.body)
//     Cypress.PageAdminMarkingsettingsPage.setasDefaultbyAPI(tempatebyAPI_01.name)
// })
// after(() => {
//     Cypress.PageAdminMarkingsettingsPage.AddGradeMappingbyAPI(tempatebyAPI_02.name,tempatebyAPI_02.body)
//     Cypress.PageAdminMarkingsettingsPage.setasDefaultbyAPI(tempatebyAPI_02.name)
// })
// When('Go to Grade mapping template', () => {
//     cy.LoginExamAsSystem()
//     cy.wait(1500)
//     Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
//     Cypress.PageAdminCommon.clickCardbyName('Exam settings', 'Marking settings')
//     cy.waitLoading()
//     Cypress.PageAdminMarkingsettingsPage.clickTab(0)
// });
// Then('Have four buttons', () => {
//     Cypress.PageAdminMarkingsettingsPage.checkBtnsExist()
// });

// When('Go to Create mapping template page', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickCreateTemplateBtn()
// });
// Then('Add mapping', () => {
//     Cypress.PageAdminMarkingsettingsPage.inputMin(0,MT1.M1.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(0,MT1.M1.grade)
//     Cypress.PageAdminMarkingsettingsPage.clickAddMappingBtn()
// });
// Then('Delete mapping', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickDelMappingBtn()
//     Cypress.PageAdminMarkingsettingsPage.confirmDeleteMapping("Delete")
// });
// Then('Can save mapping template', () => {
//     Cypress.PageAdminMarkingsettingsPage.inputMappingName(MT1.name)
//     Cypress.PageAdminMarkingsettingsPage.clickAddMappingBtn()
//     Cypress.PageAdminMarkingsettingsPage.inputMin(1,MT1.M2.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(1,MT1.M2.grade)
//     Cypress.PageAdminMarkingsettingsPage.clickAddMappingBtn()
//     Cypress.PageAdminMarkingsettingsPage.inputMin(2,MT1.M3.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(2,MT1.M3.grade)
//     Cypress.PageAdminMarkingsettingsPage.clickAddMappingBtn()
//     Cypress.PageAdminMarkingsettingsPage.clickSaveTemplateBtn()
// });
// When('Search a not existed mapping name', () => {
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(notexistname)
// });
// Then('No result after search', () => {
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(0)
// });
// Then('Clear search', () => {
//     Cypress.PageAdminMarkingsettingsPage.clearSearch()
// });
// When('Search a existed mapping name', () => {
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(MT1.name)
// });
// Then('The existed mapping is in search result', () => {
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
// });
// Then('Have a table and display correct', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Mapping template name',
//                 value: MT1.name
//             },
//             {
//                 index: 4,
//                 display: 'Default template',
//                 value: 'No'

//             }
//         ]
//     }  
//     Cypress.PageExamMark.verifyNarkScoreTable(G1)
// });
// When('Go to Preview mapping page', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickMappingName()
// });
// Then('Then information is right in preview', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 0,
//                 display: 'Score from (inclusive)',
//                 value: MT1.M1.min
//             },
//             {
//                 index: 1,
//                 display: 'Score to',
//                 value: "100"
//             },
//             {
//                 index: 2,
//                 display: 'Grade',
//                 value: MT1.M1.grade
//             }
//         ]
//     }  
//     let G2 = {
//         rowIndex: 2,
//         columns: [
//             {
//                 index: 0,
//                 display: 'Score from (inclusive)',
//                 value: MT1.M2.min
//             },
//             {
//                 index: 1,
//                 display: 'Score to',
//                 value: MT1.M1.min
//             },
//             {
//                 index: 2,
//                 display: 'Grade',
//                 value: MT1.M2.grade
//             }
//         ]
//     }  
//     let G3 = {
//         rowIndex: 3,
//         columns: [
//             {
//                 index: 0,
//                 display: 'Score from (inclusive)',
//                 value: MT1.M3.min
//             },
//             {
//                 index: 1,
//                 display: 'Score to',
//                 value: MT1.M2.min
//             },
//             {
//                 index: 2,
//                 display: 'Grade',
//                 value: MT1.M3.grade
//             }
//         ]
//     } 
//     Cypress.PageAdminMarkingsettingsPage.verifyPreviewTable(G1)
//     Cypress.PageAdminMarkingsettingsPage.verifyPreviewTable(G2)
//     Cypress.PageAdminMarkingsettingsPage.verifyPreviewTable(G3)
//     Cypress.PageAdminMarkingsettingsPage.clickCancelPreviewBtn()
// });
// When('Go to Edit page', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox(0)
//     Cypress.PageAdminMarkingsettingsPage.clickEditBtn()
// });
// Then('Can Edit grade mapping successfully', () => {
//     Cypress.PageAdminMarkingsettingsPage.inputMin(0,MT1_edit.M1.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(0,MT1_edit.M1.grade)
//     Cypress.PageAdminMarkingsettingsPage.inputMin(1,MT1_edit.M2.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(1,MT1_edit.M2.grade)
//     Cypress.PageAdminMarkingsettingsPage.inputMin(2,MT1_edit.M3.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(2,MT1_edit.M3.grade)
//     Cypress.PageAdminMarkingsettingsPage.clickSaveTemplateBtn()
//     Cypress.PageAdminMarkingsettingsPage.clearSearch()
// });

// Then('Then can not search the mapping', () => {
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(MT1.name)
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(0)
// });
// When('The defacult sort by modified time', () => {
//     cy.reload().wait(3000)
//     Cypress.PageAdminMarkingsettingsPage.verifySort(3,"Time")
// });
// Then('Sort_Mapping template name', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickColHeader(1)
//     Cypress.PageAdminMarkingsettingsPage.verifySort(2,"String")
// });
// Then('Sort_Modified', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickColHeader(2)
//     Cypress.PageAdminMarkingsettingsPage.verifySort(3,"Time")
// });
// Then('Sort_Modified By', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickColHeader(3)
//     Cypress.PageAdminMarkingsettingsPage.verifySort(4,"String")
// });
// Then('Sort_Defacult Template', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickColHeader(4)
//     Cypress.PageAdminMarkingsettingsPage.verifySort(5,"String")
// });
// When('Choose a template and Set as defacult', () => {
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(MT1.name)
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
//     Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox(0)
//     Cypress.PageExamMark.Gettablevalue(1,5).then(($value) => {
//         if ($value.text() != "Yes"){
//             Cypress.PageAdminMarkingsettingsPage.clickSetDefaultBtn()
//             let btn = "Set as default"
//             Cypress.PageAdminMarkingsettingsPage.confirmSetDefault(btn)
//         }
//     })
// });
// Then('Defacult Template value display correct', () => {
//     let G1 = {
//         rowIndex: 1,
//         columns: [
//             {
//                 index: 1,
//                 display: 'Mapping template name',
//                 value: MT1.name
//             },
//             {
//                 index: 4,
//                 display: 'Default template',
//                 value: "Yes"
//             }
//         ]
//     }  
//     Cypress.PageExamMark.verifyNarkScoreTable(G1)
// });
// Given('Create another mapping tempalte', () => {
//     Cypress.PageAdminMarkingsettingsPage.clickCreateTemplateBtn()
//     Cypress.PageAdminMarkingsettingsPage.inputMappingName(MT2.name)
//     Cypress.PageAdminMarkingsettingsPage.inputMin(0,MT2.M1.min)
//     Cypress.PageAdminMarkingsettingsPage.inputGrade(0,MT2.M1.grade)
//     Cypress.PageAdminMarkingsettingsPage.clickSaveTemplateBtn()
// });
// Then('Choose an another tempalte and Set as defacult', () => {
//     cy.reload()
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(MT2.name)
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
//     Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox(0)
//     Cypress.PageAdminMarkingsettingsPage.clickSetDefaultBtn()
// });
// Then('Have warning and can be changed successfully', () => {
//     let btn = "Set as default"
//     Cypress.PageAdminMarkingsettingsPage.confirmSetDefault(btn)
// });
// When('Delete the mapping tempalte', () => {
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(MT1.name)
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
//     Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox(0)
//     Cypress.PageAdminMarkingsettingsPage.clickDelBtn()
//     Cypress.PageAdminMarkingsettingsPage.confirmDeleteTemplate("Delete")
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(MT2.name)
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
//     Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox(0)
//     Cypress.PageAdminMarkingsettingsPage.clickDelBtn()
//     Cypress.PageAdminMarkingsettingsPage.confirmDeleteTemplate("Delete")
// });
// When(/^Change Show rows to 10$/, (arg0) => {
//     Cypress.PageAdminMarkingsettingsPage.clickShowRows()
//     Cypress.PageAdminMarkingsettingsPage.clickRowsNumber(10)
// });
// Then(/^The item number less than 10 in page$/, (arg0) => {
//     Cypress.PageAdminMarkingsettingsPage.verifyRows(10)
// });
// Then('Set as defacult to Build in tempalte', () => {
//     cy.reload()
//     Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate(defaultNanem)
//     Cypress.PageAdminMarkingsettingsPage.verifySearchResult(1)
//     Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox(0)
//     Cypress.PageAdminMarkingsettingsPage.clickSetDefaultBtn()
//     let btn = "Set as default"
//     Cypress.PageAdminMarkingsettingsPage.confirmSetDefault(btn)
// });