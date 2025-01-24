/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { adminGlobalSettings, adminAnnouncement, adminCourseClass, adminAccountClass } from '../../AUI/admin.constants';
import { auiCommonClass, auiPanelClass, auiTableClass, auiComboboxClass, auiFilterCommon, auiShadowTag } from '../../AUI/aui.common.constants';
import { examClass, sampleExamClass } from '../../AUI/exam.constants';


Cypress.PageAdminAnnouncement = Cypress.PageAdminAnnouncement || {};

Cypress.PageAdminAnnouncement.clickTopButton = (_num) => {
    cy.get(adminGlobalSettings.userSettingContent + 'button')
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminAnnouncement.verifyReceivedAllByDefault = () => {
    cy.get(auiPanelClass.auiPanelVisible + auiCommonClass.auiChoiceInput)
        .eq(0)
        .should('have.attr', 'aria-checked', 'true')
};
Cypress.PageAdminAnnouncement.inputNameDetail = (_name, _detail) => {
    cy.get(adminAnnouncement.name)
        .clear({ force: true })
        .type(_name, { delay: 30 })
    if (_detail) {
        Cypress.auiCommon.inputRichTextConent(_detail)
    }
};
Cypress.PageAdminAnnouncement.chooseReceivedUser = (_num) => {
    cy.get(auiPanelClass.auiPanelVisible + auiCommonClass.auiChoiceInput)
        .eq(_num)
        .click({ force: true })
};
Cypress.PageAdminAnnouncement.chooseCourse = (_value1, _value2) => {
    if (_value1) {
        cy.get(adminAnnouncement.applyCoursesLabel)
            .click({ force: true })
    }
    cy.get(auiPanelClass.auiPanelVisible + auiComboboxClass.auiComboShellContent)
        .click({ force: true })
    cy.get(auiCommonClass.auiSearchBoxInput)
        .eq(4)
        .type(_value2)
    Cypress.PageAdminApprovalProcesses.checkCourse(0)
    Cypress.PageAdminApprovalProcesses.clickCoursePopupOkBtn()
};
Cypress.PageAdminAnnouncement.filter = (_name, _options, _options2) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Status':
                    fil_index = 0
                    break;
                case 'Recipients':
                    fil_index = 1
                    break;
                case 'Courses':
                    fil_index = 2
                    break;
                default:
                    cy.log(`${_name} not defined`);
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
                .find(`[aria-label="${_options}"]`)
                // .as('op')
                // cy.get('@op')
                //     .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            if (_options2) {
                cy.get(auiCommonClass.auiOptionItem)
                    .find(`[aria-label="${_options2}"]`)
                    .as('op2')
                    // cy.get('@op2')
                    //     .find(auiCommonClass.auiOptionCheckBox)
                    .click({ force: true })
            }
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.waitLoading().wait(1000)
        })
};
Cypress.PageAdminAnnouncement.verifyDetailsWithoutCourse = (_title, _info) => {
    let rowTitle = ['Modified by', 'Modified', 'Status', 'Published time', 'Recipients']
    cy.get(adminAnnouncement.detailTitle)
        .should('contain', _title)
    for (let index = 0; index < rowTitle.length; index++) {
        cy.get(adminAnnouncement.detailRowTitle)
            .eq(index)
            .should('contain', rowTitle[index])
        if (index == 0) {
            Cypress.auiCommon.verifyCandidateNameInPanel_InShadow_NoTag(_info[index])
        }
        if (index == 1 || index == 3) {
            cy.get(adminAnnouncement.detailRowValue)
                .eq(index)
                .compareEosDateFormat(_info[index])
        }
        if (index == 2 || index == 4) {
            cy.get(adminAnnouncement.detailRowValue)
                .eq(index)
                .should('contain', _info[index])
        }
        // Verify detail
        if (index == 4) {
            cy.get(auiPanelClass.auiPanelVisible + auiCommonClass.auiRichPurHtml)
                .should('contain', _info[index + 1])
        }
    }
};
Cypress.PageAdminAnnouncement.verifyDetailsWithCourse = (_value) => {
    cy.get(adminAnnouncement.detailRowTitle)
        .eq(5)
        .should('contain', 'Courses')
    cy.get(adminAnnouncement.detailRowValue)
        .eq(5)
        .should('contain', _value)
};
Cypress.PageAdminAnnouncement.expandAllCoursesInDetail = () => {
    cy.get(adminAccountClass.propertyNum)
        .click({ force: true })
};
Cypress.PageAdminAnnouncement.verifyAllCoursesInDetail = (_num, _value) => {
    cy.get(auiCommonClass.propertyDiv)
        .eq(_num)
        .should('contain', _value)
};
Cypress.PageAdminAnnouncement.verifyEditBtnDisabled = () => {
    cy.get(adminCourseClass.editBtn)
        .should('have.attr', 'disabled')
};
Cypress.PageAdminAnnouncement.verifyNotificationNum = (_num) => {
    cy.get(adminAnnouncement.announcementIcon + auiShadowTag.auiBadge)
        .shadow()
        .find('.number ')
        .should('contain', _num)
};
Cypress.PageAdminAnnouncement.verifyNotificationPopupValue = (_num, _value, _publishTime) => {
    cy.get(auiCommonClass.auiPopupBody + adminAnnouncement.announcementPopupTitle)
        .eq(_num)
        .should('contain', _value[0])
    cy.get(auiCommonClass.auiPopupBody + adminAnnouncement.announcementPopupDetail)
        .eq(_num)
        .should('contain', _value[1])
    cy.get(auiCommonClass.auiPopupBody + adminAnnouncement.announcementPopupTime)
        .eq(_num)
        .compareEosDateFormat(_publishTime)
};
Cypress.PageAdminAnnouncement.clickPopupAnnouncementTitle = (_num) => {
    cy.get(auiCommonClass.auiPopupBody + adminAnnouncement.announcementPopupTitle)
        .eq(_num)
        .click()
};
Cypress.PageAdminAnnouncement.verifyPopupDetail = (_title, _content, _time) => {
    cy.get(auiPanelClass.auiPanelVisible + adminAnnouncement.popupDetailTitle)
        .should('contain', _title)
    cy.get(auiPanelClass.auiPanelVisible + auiCommonClass.auiRichPurHtml)
        .should('contain', _content)
    cy.get(auiPanelClass.auiPanelVisible + auiShadowTag.auiEllipsis)
        .find(examClass.basicInfoValue)
        .compareEosDateFormat(_time)
};
Cypress.PageAdminAnnouncement.clickNotificationIcon = () => {
    cy.wait(500)
    cy.get(adminAnnouncement.notificationIcon)
        .click({ force: true })
        .wait(500)
};
Cypress.PageAdminAnnouncement.clickNotificationCenterBtn = (_num) => {
    cy.get(auiCommonClass.auiPopupBody + adminAnnouncement.notificationCenterBtn)
        .eq(_num)
        .click({ force: true })
        .waitLoading()
        .wait(500)
};
Cypress.PageAdminAnnouncement.announcementManagementFilter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Status':
                    fil_index = 0
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true })
                .wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(fil_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options)
                .as('op')
            cy.get('@op')
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.wait(2000)
        })
};
Cypress.PageAdminAnnouncement.verifyMark = (_num, _options) => {
    if (_options) {
        cy.get(auiTableClass.auiTbody + auiTableClass.auiTRow)
            .eq(_num)
            .should('have.attr', 'style')
    } else {
        cy.get(auiTableClass.auiTbody + auiTableClass.auiTRow)
            .eq(_num)
            .should('not.have.attr', 'style')
    }
};
Cypress.PageAdminAnnouncement.clickTopButton_InAnnouncementManagement = (_num) => {
    cy.get(adminCourseClass.addFromAddressBookBtn)
        .eq(_num)
        .parent()
        .click()
};
Cypress.PageAdminAnnouncement.verify_NotificationPopup = (_value) => {
    cy.get(adminAnnouncement.announcementPopupBody)
        .should('contain', _value)
};
Cypress.PageAdminAnnouncement.verifyAnnouncementExpanded = (_value) => {
    cy.wait(5000)
    if (_value) {
        cy.get(adminAnnouncement.announcementPopupCover)
            .should('have.attr', 'data-aui-close')
    }
    else {
        cy.get(adminAnnouncement.announcementPopupCover)
            .should('not.have.attr', 'data-aui-close')
    }

};
Cypress.PageAdminAnnouncement.clearSearch = (_value) => {
    cy.get(auiCommonClass.auiSearchBoxClose)
        .eq(0)
        .click()
        .wait(2000)
};