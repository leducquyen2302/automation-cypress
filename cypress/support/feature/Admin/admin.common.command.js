/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiFilterCommon, auiComboboxClass, auiTableClass, auiDialogClass } from '../../AUI/aui.common.constants';
import { adminCommonClass, adminCourseClass } from '../../AUI/admin.constants';
Cypress.PageAdminCommon = Cypress.PageAdminCommon || {};

const LeftNavi = {
    Home: {
        status: 'acitve',
        display: 'Home',
        url: '/#/'
    },
    Exam: {
        status: 'acitve',
        display: 'Exam',
        url: '/#/exam'
    },
    Bank: {
        status: 'acitve',
        display: 'Bank',
        url: '/#/authoring'
    },
    Reports: {
        status: 'acitve',
        display: 'Reports',
        url: '/#/report'
    },
    Admin: {
        status: 'acitve',
        display: 'Admin',
        url: '/#/admin'
    },
    Calendar: {
        status: 'acitve',
        display: 'Calendar',
        url: '/#/Calendar'
    }
}
const adminCards = {
    ExamSettings: {
        display: "Exam settings",
        cards: [
            {
                name: "Marking settings",
                url: '/admin/MarkingSettings',
                des: 'View and configure settings for marking exams.',
                sta: "inuse"
            },
            {
                name: "Authorised applications",
                url: '/admin/WhiteList',
                des: 'Configure the list of authorised applications to be used during exams.',
                sta: "inuse"
            },
            {
                name: "Authorised URLs",
                url: '/admin/AuthorizeUrl',
                des: 'Configure the list of authorised URLs to be accessed during exams.',
                sta: "inuse"
            },
            {
                name: "Authoring settings",
                url: '/admin/AuthoringSettings',
                des: 'View and configure authoring settings.',
                sta: "inuse"
            },
            {
                name: "Conduct settings",
                url: '/admin/ConductSettings',
                des: 'View and configure settings for conducting exams.',
                sta: "inuse"
            }
        ],
    },
    Configuration: {
        display: 'Configuration',
        cards: [
            {
                name: "Course configuration",
                url: '/admin/CourseConfiguration',
                des: 'View and configure courses and semesters, and manage organisations and structure.',
                sta: "inuse"
            }
        ]
    },
    Administration: {
        display: 'Administration',
        cards: [
            {
                name: "Role management",
                url: '/admin/RoleManagement',
                des: 'View and manage the user assignment of each role in the system.',
                sta: "inuse"
            },
            {
                name: "Account management",
                url: '/admin/AccountManagement',
                des: 'View information and manage photos of staff and candidates.',
                sta: "inuse"
            },
            {
                name: "User activity report",
                url: '/admin/AuditManagement',
                des: 'View the user activities in MaivenPoint Examena.',
                sta: "inuse"
            },
            {
                name: "Email templates",
                url: '/admin/EmailTemplate',
                des: 'View and manage email templates for notification emails.',
                sta: "inuse"
            },
            {
                name: "Global settings",
                url: '/admin/GlobalSettings',
                des: 'View and configure global settings.',
                sta: "inuse"
            },
            {
                name: "LMS integration",
                url: '/admin/IntegrationConfiguration',
                des: 'View and register LMS platform for integration.',
                sta: "inuse"
            },
            {
                name: "Announcement",
                url: '/admin/Announcement',
                des: 'View and manage announcements.',
                sta: "inuse"
            },
            {
                name: "Approval processes",
                url: '/admin/ApprovalTemplate',
                des: 'View and manage approval processes for exams and papers.',
                sta: "inuse"
            },
        ]
    }
}

function visitUrl(_Nav) {
    cy.visit(_Nav.url)
    cy.waitLoading()
    cy.url().should('contain', _Nav.url)
}

Cypress.PageAdminCommon.visitHome = () => {
    visitUrl(LeftNavi.Home)
};
Cypress.PageAdminCommon.visitExam = () => {
    visitUrl(LeftNavi.Exam)
    cy.waitElement('[placeholder="Search by exam name"]')
    cy.waitLoading()
};
Cypress.PageAdminCommon.visitBank = (_waiting) => {
    visitUrl(LeftNavi.Bank, _waiting)
};
Cypress.PageAdminCommon.visitAdmin = (_waiting) => {
    visitUrl(LeftNavi.Admin, _waiting)
};
Cypress.PageAdminCommon.visitCalendar = () => {
    visitUrl(LeftNavi.Calendar)
    cy.waitElement('.title-date-text')
    cy.waitLoading()
};
Cypress.PageAdminCommon.clickCardbyName = (_groupName, _cardName) => {
    cy.get('.common-cards-title').as('groups')
    let gindex = 0, gp = '', cindex = ''
    switch (_groupName) {
        case adminCards.ExamSettings.display:
            gindex = 0
            gp = adminCards.ExamSettings
            break;
        case adminCards.Configuration.display:
            gindex = 1
            gp = adminCards.Configuration
            break;
        case adminCards.Administration.display:
            gindex = 2
            gp = adminCards.Administration
            break;
    }
    cy.get('@groups').eq(gindex)
        .invoke('attr', 'tabindex', gindex)
        .focus().wait(200)
        .should('contain', _groupName)
        .as('gt')
    for (let i = 0; i < gp.cards.length; i++) {
        if (gp.cards[i].name === _cardName) {
            cindex = i
        }
    }
    cy.get('@gt').parent().find('.common-link-card-title-text')
        .eq(cindex)
        .invoke('attr', 'tabindex', cindex)
        .focus().wait(200)
        .should('contain', gp.cards[cindex].name)
    cy.get('@gt').parent().find('.common-link-card-desc')
        .eq(cindex)
        .invoke('attr', 'tabindex', cindex)
        .focus().wait(200)
        .should('contain', gp.cards[cindex].des)
        .click({ force: true })
    cy.wait(1000)
    cy.waitLoading()
    cy.url().should('contain', gp.cards[cindex].url)
};
Cypress.PageAdminCommon.clickLeftNaviAndJump = (_key, _waiting) => {
    let leftNaArr = Object.keys(LeftNavi)
    let index = leftNaArr.indexOf(_key)
    cy.get(auiCommonClass.auiNaviItem).find("a")
        .eq(index)
        .should('contain', LeftNavi[_key].display)
        .click({ force: true })
    if (_waiting) {
        cy.waitLoading()
    }
    else {
        cy.waitLoading()
    }
    cy.wait(1500)
    cy.get(auiCommonClass.auibreadcrumbItem)
        .should('contain', LeftNavi[_key].display)
    cy.waitLoading()
}
Cypress.PageAdminCommon.clickLeftNaviByKey = (_key) => {
    cy.get(auiCommonClass.auiNaviItem).find("a")
        .contains(LeftNavi[_key].display)
        .click({ force: true })
    cy.wait(1500)
    cy.get(auiCommonClass.auibreadcrumbItem)
        .should('contain', LeftNavi[_key].display)
    cy.waitLoading()
}

//  Verification Command 
Cypress.PageAdminCommon.verifyNavigationLink = (_length) => {
    cy.get(auiCommonClass.auiNaviItem).then(($items) => {
        cy.expect($items.length).eq(_length)
        cy.log($items)
        let leftNaArr = Object.keys(LeftNavi)
        for (let i = 0; i < _length; i++) {
            cy.wait(500)
            cy.get($items).eq(i)
                .find('a')
                .invoke('attr', 'tabindex', i)
                .focus()
                .should('have.attr', 'href')
                .and('contain', LeftNavi[leftNaArr[i]].url)
        }
    })
}
Cypress.PageAdminCommon.verifyAdminCard = (_index) => {
    cy.log(`card : ${admin_cards[_index].name} `)
    cy.get(adminCommonClass.card).then(($card) => {
        cy.get($card).eq(_index)
            .invoke('attr', 'tabindex', _index)
            .focus().wait(200)
            .as('card')
        cy.get('@card').find(adminCommonClass.cardTitle)
            .invoke('attr', 'tabindex', _index)
            .focus().wait(200)
            .should('contain', admin_cards[_index].name)
        cy.get('@card').find(adminCommonClass.cardDes)
            .invoke('attr', 'tabindex', _index)
            .focus().wait(200)
            .should('contain', admin_cards[_index].des)
    })
}
Cypress.PageAdminCommon.clickAdminCard_ByLeftNavigationBar = (_navName) => {
    cy.get(auiCommonClass.auiNaviBody)
        .contains(_navName)
        .eq(0)
        .click({ force: true })
        .waitLoading()
}
Cypress.PageAdminCommon.openAddressBook = () => {
    cy.get(adminCourseClass.courseFormAddressBookBtn)
        .eq(0)
        .click({ force: true })
        .waitLoading()
};
Cypress.PageAdminCommon.filterAddressBook = (_name, _options) => {
    cy.get(auiCommonClass.multiComBox + auiComboboxClass.auiComboShell)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Type':
                    fil_index = 0
                    break;
                case 'Property':
                    fil_index = 1
                    break;
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(fil_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.waitLoading().wait(1000)
        })
};
Cypress.PageAdminCommon.verifyAddressBookTable = (_info) => {
    cy.get(auiDialogClass.auiDialogBody + auiTableClass.auiTable)
        .as('table')
    Cypress.auiCommon.verifyTable(_info, '@table')
}