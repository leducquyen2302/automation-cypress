/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let invigilator1 = '', invigilator2 = '', stu0 = '', stu1 = '', stu3 = '', examName = ''
const today = new Date().toJSON()
const content = 'No items to show in this view.'
const value = ['Unpublished', 'Published', 'Closed-book', 'Open-book']
const filterInfo = ['UI-school', 'UI-discipline', 'AT001 (AutoTesting Programme 1)', 'Class 1']
const tableInfo = ['UI-school', 'UI-discipline', 'AT001-AutoTesting Programme 1', 'Class 1']

before(() => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    invigilator1 = env[cu_ten_string].Invigilator1.userid
    stu0 = env[cu_ten_string].Candidates[0]
    stu1 = env[cu_ten_string].Candidates[1]
    stu3 = env[cu_ten_string].Candidates[3]
})
before(() => {
    cy.fixture('sampleOpenExamInfo').then(($data) => {
        examName = $data.examName
    })
})

// Scenario: Invigilator1 enter sample exam statistics report
Given(/^I am login as invigilator1 have 4 candidates$/, () => {
    cy.LoginByLocal(invigilator1)
});
Then(/^I am in report page$/, () => {
    Cypress.PageAdminCommon.clickLeftNaviByKey('Reports')
});
And(/^I verify the sample report description$/, () => {
    let cardInfo = {
        title: 'Sample exam statistics report',
        des: 'Sample exam statistics offers an in-depth summary of the engagement levels associated with sample exams.'
    }
    Cypress.PageReport.verifyReportCard(2, cardInfo)
});
And(/^I enter sample exam report$/, () => {
    Cypress.PageReport.enterStaicReport(false, 2, 10000)
});

// Scenario: Filter School
When(/^I filter School$/, () => {
    Cypress.PageSampleReport.filter('School', filterInfo[0])
});
Then(/^I verify filter school result is right in table$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 3,
                display: 'School',
                value: tableInfo[0]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});

// Scenario: Filter Discipline
When(/^I filter Discipline$/, () => {
    Cypress.PageSampleReport.filter('Discipline', filterInfo[1])
});
Then(/^I verify filter discipline result is right in table$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 4,
                display: 'Discipline',
                value: tableInfo[1]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});

// Scenario: Filter Course
When(/^I filter Course$/, () => {
    Cypress.PageSampleReport.filter('Course', filterInfo[2])
});
Then(/^I verify filter course result is right in table$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 5,
                display: 'Course',
                value: tableInfo[2]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});

// Scenario: Filter Class
When(/^I filter Class$/, () => {
    Cypress.PageSampleReport.filter('Class', filterInfo[3])
});
Then(/^I verify filter class result is right in table$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 6,
                display: 'Class',
                value: tableInfo[3]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});

// Scenario: Filter status
When(/^I filter status with unpublished$/, () => {
    Cypress.PageSampleReport.filter('Status', 'Unpublished')
});
Then(/^I can see unpublished status is right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 8,
                value: value[0]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});
When(/^I filter status with published$/, () => {
    Cypress.PageSampleReport.filter('Status', 'Unpublished')
});
Then(/^I can see published status is right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 8,
                value: value[1]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});
Then(/^I select all status$/, () => {
    Cypress.PageSampleReport.filterAllAfterFilterSome(4, 2)
});

// Scenario: Filter type
When(/^I filter type with Closed-book$/, () => {
    Cypress.PageSampleReport.filter('Type', 'Closed-book')
});
Then(/^I can see closed type is right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 9,
                value: value[2]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});
When(/^I filter type with Open-book$/, () => {
    Cypress.PageSampleReport.filter('Type', 'Closed-book')
});
Then(/^I can see open type is right$/, () => {
    let rowInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 9,
                value: value[3]
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo)
});

// Scenario: Filter exam
When(/^I filter the sample exam name$/, () => {
    Cypress.PageSampleReport.filter('Sample exam name', examName)
});
Then(/^I verify student1 Candidate name、Candidate ID、User ID、Sample exam name、Status、Type、No. of attempts、Last attempted time$/, () => {
    let rowInfo1 = {
        rowIndex: 1,
        columns: [
            // {
            //     index: 0,
            //     display: 'Candidate name',
            //     value: stu0.name
            // },
            {
                index: 1,
                display: 'Candidate ID',
                value: stu0.id
            },
            {
                index: 2,
                display: 'User ID',
                value: stu0.userid
            },
            {
                index: 3,
                display: 'School',
                value: tableInfo[0]
            },
            {
                index: 4,
                display: 'Discipline',
                value: tableInfo[1]
            },
            {
                index: 5,
                display: 'Course',
                value: tableInfo[2]
            },
            {
                index: 6,
                display: 'Class',
                value: tableInfo[3]
            },
            {
                index: 7,
                display: 'Sample exam name',
                value: examName
            },
            {
                index: 8,
                display: 'Status',
                value: 'Published'
            },
            {
                index: 9,
                display: 'Type',
                value: 'Open-book'
            },
            {
                index: 10,
                display: 'No. of attempts',
                value: '1'
            },
            {
                index: 11,
                display: 'Last attempted time',
                value: today
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo1)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 1, stu0.name)
});
Then(/^I verify student4 Candidate name、No.of attempts$/, () => {
    let rowInfo2 = {
        rowIndex: 4,
        columns: [
            // {
            //     index: 0,
            //     value: stu3.name
            // },
            {
                index: 10,
                value: '0'
            },
            {
                index: 11,
                value: ''
            },
        ]
    }
    Cypress.PageReport.verifyStaticTable(rowInfo2)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(3, 1, stu3.name)
});