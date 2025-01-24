
import { toastMessage, button, tab, comboBox, table, searchBox, header } from '../css/common.constants'
import { announPanel, announTable, notiPopup } from '../css/admin.announcement.constants'

let publishMessage = 'The announcement was published.'
Cypress.AdminAnnouncementPage = Cypress.AdminAnnouncementPage || {}

Cypress.AdminAnnouncementPage.enterAnnouncementNameAndSearch = (announName) => {
    return cy.get(searchBox.searchField).eq(0).should('be.visible')
        .type(announName + '{enter}', { delay: 100 })
}

Cypress.AdminAnnouncementPage.editAnnouncement = (announName) => {
    let announId = ''
    // TODO: use API create new announcement
    cy.CreateAnnouncement_ByApi(announName, 'announcement name content', '')

    // TODO: check don't display created on Notifications
    cy.get('body').then((body) => {
        const display = body.find(notiPopup.popup)
        if (display.length === 0) {
            cy.get(header.notificationIcon).click()
        }
        cy.get(notiPopup.popup + ' ' + notiPopup.button).last().click()
        cy.waitLoading()
    })

    cy.get('body').then((body) => {
        const announList = body.find(table.message)
        if (announList.length !== 0 & announList.text() !== 'No items to show in this view.') {
            cy.get(table.tableCellContent + ' a').each((name) => {
                cy.wrap(name).should('not.have.attr', 'aria-label', announName)
                cy.wrap(name).invoke('text')
                    .then((text) => {
                        cy.log('name in popup: ' + text)
                    })
            })
        }
        else cy.log('do not have any announcements')
    })
    //back to announcement page
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
    cy.get('a[href*="/admin/Announcement"]').should('be.visible').click()

    cy.GetAnnouncement_ByApi(announName)
        .then((res_auth) => {
            announId = res_auth.body.result[0].id

            // TODO: unpublish announcement just in case 
            cy.UnpublishAnnouncement_ByApi(announId)

            // TODO: edit announcement and publish announcement
            Cypress.AdminAnnouncementPage.enterAnnouncementNameAndSearch(announName)
            cy.waitLoading()

            Cypress.AdminAnnouncementPage.editAnnouncementByOrder(0, [announName + ' edited', 'new edited content ---------', 0], 2)

            Cypress.AdminAnnouncementPage.checkToastMessage(publishMessage)

            cy.get(table.tableCellContent + ' a').eq(0).click()
            Cypress.AdminAnnouncementPage.checkEditedAnnouncementDetails([announName + ' edited', 'new edited content ---------', 0])
            cy.wait(1500)
            Cypress.AdminAnnouncementPage.checkShowAnnounInNotiPage(announName + ' edited')
            // TODO: use API remove announcement
            cy.DeleteAnnouncement_ByApi(announId)
        })
}

Cypress.AdminAnnouncementPage.checkShowAnnounInNotiPage = (editName) => {
    //TODO: should display on Notifications
    cy.get('body').find(notiPopup.popup).then((display) => {
        cy.log('display            :' + display.length)
        if (display === null) {
            cy.get(header.notificationIcon).click()
        }
        cy.get(notiPopup.popup + ' ' + notiPopup.button).last().click()
        cy.waitLoading()
    })
    let announList = []
    cy.get(table.tableCellContent + ' a')
        .each((name) => {
            cy.wrap(name).invoke('text')
                .then((text) => {
                    announList.push(text)
                    cy.log('name in popup: ' + text)
                })
        }).then(() => {
            cy.log('list : ' + announList)
            cy.wrap(announList).should('include', editName)
        })
}

Cypress.AdminAnnouncementPage.checkToastMessage = (expectMessage) => {
    cy.get(toastMessage.toastContent)
        .should('be.visible')
        .should('contain', expectMessage)
    cy.get(toastMessage.close).click()
}

Cypress.AdminAnnouncementPage.editAnnouncementByOrder = (num, data, action) => {

    cy.get(announTable.checkbox).eq(num).click().wait(500)
    cy.get(button.editButton).should('be.enabled').click()
    cy.waitLoading()

    //edit name and content
    cy.get(announPanel.name).focus().clear()
        .type(data[0], { delay: 20 })

    cy.get(announPanel.content).focus().clear()
        .type('new edited content ---------', { delay: 20 })

    //Announcement recipients
    //0 = staff + candidates, 1 = staff , 2 =   candidates
    cy.get(announPanel.panel).eq(2)
        .find(announPanel.receiveCheckbox).eq(0).click()

    // //specify course selection
    // cy.get(announPanel.specifyCourse).click()
    // cy.get(announPanel.dropdownCourse).should('be.visible').click()
    // cy.get(comboBox.listOption).eq(3)
    //     .find(comboBox.textCheckBox).eq(4)
    //     .click()
    // cy.get(comboBox.actFooterBtn).eq(3)
    //     .find(button.button).eq(1)
    //     .click()

    //pubish the announcement 
    // 0 = cancel , 1 = save as draft , 2 = publish    
    cy.get(announPanel.panel).eq(2)
        .find(announPanel.footerButton).eq(action)
        .click()
    cy.waitLoading()

}

Cypress.AdminAnnouncementPage.checkEditedAnnouncementDetails = (data) => {
    let Recipients = ''
    switch (data[2]) {
        case 0:
            Recipients = 'Staff and candidates'
            break;
        case 1:
            Recipients = 'Staff'
            break;
        default:
            Recipients = 'candidates'
            break;
    }
    cy.get(announPanel.detailTitle).should('have.text', data[0])
    cy.get(announPanel.detailContent).should('have.text', data[1])
    cy.get(announPanel.detailRowValue).eq(4).should('have.text', Recipients)

    //close panel
    cy.get(announPanel.panel).eq(2)
        .find(announPanel.footerButton).eq(0)
        .click()
    cy.waitLoading()
}