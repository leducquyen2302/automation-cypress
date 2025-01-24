import { button, tab, comboBox, table, searchBox } from '../css/common.constants'
import { adminTable } from '../css/admin.account.constants'

Cypress.AdminAccountPage = Cypress.AdminAccountPage || {}

let key = ''
let messageTop = "The account information, such as name and ID, is retrieved from MaivenPoint Online Services and cannot be edited here. Please go to MaivenPoint Online Services to edit the account information."
const staffColumns = [
    'Staff name',
    'Type',
    'Staff ID',
    'User ID',
    'Email address',
    'Mobile phone',
    'Status',
    'Property'];

const candidateColumns = [
    'Candidate name',
    'Type',
    'Candidate ID',
    'User ID',
    'Email address',
    'Mobile phone',
    'Photo validation',
    'Status',
    'Property']
const status = {
    Active: {
        dot: 'solid-dot-active',
        status: 'Active'
    },
    Inactive: {
        dot: 'solid-dot-inactive',
        status: 'Inactive'
    },
    Deleted: {
        dot: 'solid-dot-deleted',
        status: 'Deleted'
    }
}
const photoValidation = {
    PendingUpload: {
        dot: 'yellow-dot solid-dot',
        status: 'Pending upload'
    },
    Fail: {
        dot: 'red-dot solid-dot',
        status: 'Failed'
    },
    'N/A': {
        dot: 'yellow-dot solid-dot',
        status: 'N/A'
    },
    Passed: {
        dot: 'green-dot solid-dot',
        status: 'Passed'
    },
    PendingValid: {
        dot: 'blue-dot solid-dot',
        status: 'Pending validation'
    }
}
Cypress.AdminAccountPage.checkTopMessage = () => {
    //check message display on top
    let firstText = ''
    let secondText = ''
    let thirdText = ''
    // get first text
    cy.get('aui-messagebar') // Select the shadow host
        .shadow() // Access the shadow DOM
        .find('aui-i18n')
        .shadow()
        .find('span').eq(0)
        .then(($span1) => {
            firstText = $span1.text()
            cy.log('log text: ' + firstText)
        })
    // get second text
    cy.get('aui-messagebar')
        .shadow()
        .find('aui-i18n a')
        .eq(0)
        .then(($span2) => {
            secondText = $span2.text()
            cy.log('log text: ' + secondText)
        })
    //get third text
    cy.get('aui-messagebar')
        .shadow()
        .find('aui-i18n')
        .shadow()
        .find('span').eq(1).then(($span3) => {
            thirdText = $span3.text()
            cy.log('log text: ' + thirdText)
        })

    cy.then(() => {
        const messageDisplay = `${firstText}${secondText}${thirdText}`
        cy.log('log message: ' + messageDisplay) // Log the message
        cy.expect(messageDisplay).to.equal(messageTop)
    });

}
Cypress.AdminAccountPage.checkTableTitle = () => {
    cy.get('.aui-table-header [id*="staffDataTable"] .aui-table-cell-content')
        .each(($cell, index) => {
            // Assert that the column name matches the expected value
            expect($cell.text().trim()).to.equal(staffColumns[index]);
        });
    //switch to candidate tab and check candidate columns name
    cy.get('[role="tablist"] div[tabindex="-1"]').click()
    cy.get('.aui-table-header [id*="studentDataTable"] .aui-table-cell-content')
        .each(($cell, index) => {
            // Assert that the column name matches the expected value
            expect($cell.text().trim()).to.equal(candidateColumns[index]);
        });
}


Cypress.AdminAccountPage.filters = (filter, indexOption) => {
    let indexDropdown = ''
    switch (filter) {
        case 'Status Staff':
            indexDropdown = 0
            break;
        case 'Property Staff':
            indexDropdown = 1
            break;
        case 'Status Candidate':
            indexDropdown = 2
            break;
        case 'Photo Validation':
            indexDropdown = 3
            break;
        case 'Property Candidate':
            indexDropdown = 4
            break;
        default:
            cy.log(`${filter} not defined`);
            break;
    }
    cy.get(comboBox.comboBox)
        .eq(indexDropdown)
        .should('be.visible')
        .click()

    cy.get(comboBox.listOption).eq(indexDropdown)
        .find(comboBox.checkBoxAll)
        .eq(0)
        .click()

    cy.get(comboBox.listOption).eq(indexDropdown)
        .find(comboBox.checkBox)
        .eq(indexOption)
        .click()

    cy.get(comboBox.actFooterBtn)
        .eq(indexDropdown)
        .find('.button')
        .eq(1)
        .click()
}
Cypress.AdminAccountPage.getFilterCriteria = () => {
    let filterCriteria = ''
    return cy.get(comboBox.comboBox)
        .find(comboBox.comboBoxContent)
        .each(($element) => {
            cy.wrap($element)
                .invoke('attr', 'aria-label')
                .then((text) => {
                    cy.log(text.trim());
                    if (text.trim() !== 'All') {
                        // filterCriteria.push(text.trim())
                        filterCriteria = text.trim()
                        // cy.log('pushing     :' + text.trim())
                    }
                })
        })
        .then(() => {
            return cy.wrap(filterCriteria)
        })
}
Cypress.AdminAccountPage.checkFilterResults = (filter, role) => {
    let actual = []
    let tableindex = ''
    let column = ''
    if (role === 'Staff') {
        tableindex = 0
        switch (filter) {
            case 'Status':
                column = 7
                break;
            case 'Property':
                column = 8
                break;
            default:
                cy.log(`${filter} not defined`);
                break;
        }
    } else {
        tableindex = 1
        switch (filter) {
            case 'Photo Validation':
                column = 7
                break;
            case 'Status':
                column = 8
                break;
            case 'Property':
                column = 9
                break;
            default:
                cy.log(`${filter} not defined`);
                break;
        }
    }
    Cypress.AdminAccountPage.getFilterCriteria().then((expected) => {
        cy.log('expected filter :' + expected)
        switch (filter) {
            case 'Photo Validation':
                //check dot status
                cy.get(table.tableBody).eq(tableindex)
                    .find('[data-col="' + column + '"]' + ' ' + adminTable.dotPhotoTable)
                    .each(($dot) => {
                        cy.get($dot).should('have.class', photoValidation[expected]?.dot)
                    })
                //check status
                cy.get(table.tableBody).eq(tableindex)
                    .find('[data-col="' + column + '"]' + ' ' + adminTable.statusPhotoTable)
                    .each(($status) => {
                        cy.get($status).should('contain.text', photoValidation[expected]?.status)
                    })
                break;
            case 'Status':
                //check dot status
                cy.get(table.tableBody).eq(tableindex)
                    .find('[data-col="' + column + '"]' + ' ' + adminTable.dotStatusTable)
                    .each(($dot) => {
                        cy.get($dot).should('have.class', status[expected]?.dot)
                    })
                //check status
                cy.get(table.tableBody).eq(tableindex)
                    .find('[data-col="' + column + '"]' + ' ' + adminTable.statusTable)
                    .each(($status) => {
                        cy.wrap($status).should('contain.text', status[expected]?.status)
                    })
                break;
            case 'Property':
                cy.get(table.tableBody).eq(tableindex)
                    .find('[data-col="' + column + '"]' + ' ' + adminTable.tableProperty)
                    .each(($prop) => {
                        cy.log('number prop     :' + $prop.length)
                        cy.wrap($prop).then(($number) => {
                            cy.wrap($number).children('div') // Get all child div elements
                                .then(($children) => {
                                    const childCount = $children.length;
                                    if (childCount === 2) { //check if more than one property
                                        cy.wrap($children[1]).click() //click + icon
                                        // After clicking, get the additional properties
                                        cy.get(adminTable.propertyPopup).each(($pr) => {
                                            cy.wrap($pr)
                                                .invoke('text')
                                                .then((text) => {
                                                    actual.push(text.trim())// Add the text to the list
                                                    cy.log('property list: ' + actual)
                                                })
                                        }).then(() => {
                                            cy.wrap(actual).should('include', expected);
                                            cy.log('property list: ' + actual)
                                        })
                                    } else {
                                        cy.wrap($children[0]).should('contain.text', expected)
                                    }
                                })
                        })
                    })
                break;
            default:
                cy.log(`${filter} not defined`);
                break;
        }

    })

}
Cypress.AdminAccountPage.clearFilter = (filterItem) => {
    let indexDropdown = ''
    switch (filterItem) {
        case 'Status Staff':
            indexDropdown = 0
            break;
        case 'Property Staff':
            indexDropdown = 1
            break;
        case 'Status Candidate':
            indexDropdown = 2
            break;
        case 'Photo Validation':
            indexDropdown = 3
            break;
        case 'Property Candidate':
            indexDropdown = 4
            break;
        default:
            cy.log(`${filter} not defined`);
            break;
    }
    // TODO: click on the dropdown
    cy.get(comboBox.comboBox)
        .eq(indexDropdown)
        .should('be.visible')
        .click()
    // TODO: click on select all checkbox
    cy.get(comboBox.listOption).eq(indexDropdown)
        .find(comboBox.checkBoxAll)
        .eq(0)
        .click()
    cy.get(comboBox.actFooterBtn)
        .eq(indexDropdown)
        .find('.button')
        .eq(1)
        .click()
    cy.waitLoading()
}
Cypress.AdminAccountPage.searchResults = (checkfield, expected) => {
    cy.log(checkfield)
    let actual = []
    let column = []
    let tableId = ''
    for (let i = 0; i < checkfield.length; i++) {
        cy.log('searching for:  ' + checkfield[i])
        //get column of search field
        cy.contains(checkfield[i])
            .parent()
            .invoke('attr', 'data-col')
            .then((col) => {
                cy.log('column:  ' + col)
                column.push(col)
                cy.log(column)
            })
        //get id of table 
        cy.contains(checkfield[i])
            .closest('.aui-table').should('exist')
            .invoke('attr', 'id')
            .then((idTable) => {
                tableId = '#' + idTable
                cy.log('table id:  ' + tableId)
            })
    }
    //get search results
    cy.get(tableId + ' ' + table.tableBody + ' ' + table.tableRow)
        .then((num) => {
            const numRow = num.length
            for (let j = 0; j < numRow; j++) {
                const rowData = []
                for (let i = 0; i < column.length; i++) {
                    cy.get(tableId + ' ' + table.tableBody + ' ' + '[data-col="' + column[i] + '"]')
                        .eq(j)
                        .then((cell) => {
                            rowData.push(cell.text())
                        })
                }
                cy.wrap(rowData).then(() => {
                    actual.push(rowData);  // Push the row data into the tableData array
                    cy.log('actual list:  ' + actual)
                    // cy.wrap(actual[0]).should('include', "0")
                })
            }
        })
}
Cypress.AdminAccountPage.enterKeyAndSearch = (searchKey) => {
    return cy.get(searchBox.searchField).should('be.visible')
        .type(searchKey + '{enter}', { delay: 100 })
        .invoke('attr', 'value')
        .then((val) => {
            cy.log('logging value:  ' + val)
            key = val
            cy.waitLoading()
        })
}

Cypress.AdminAccountPage.addProperty = (property) => {

}
