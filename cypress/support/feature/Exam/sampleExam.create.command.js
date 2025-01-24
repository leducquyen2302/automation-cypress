/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag, auiPanelClass, auiOptionList, auiButtonClass, auiDialogClass, auiTableClass, auiFilterCommon } from '../../AUI/aui.common.constants'
import { examClass, examStudentClass, sampleExamClass, sampleExamStudentClass, examAttendanceClass } from '../../AUI/exam.constants'
import { bankClass } from '../../AUI/bank.constants'
import { adminCourseClass, adminApplicationClass } from '../../AUI/admin.constants'

Cypress.PageSampleExamCreate = Cypress.PageSampleExamCreate || {};

Cypress.PageSampleExamCreate.enterSampleExam = () => {
     cy.get(sampleExamClass.chooseSampleExam)
          .eq(1).click({ force: true })
     cy.waitLoading()
     cy.wait(1500)
}
Cypress.PageSampleExamCreate.createSampleExam = () => {
     cy.get(sampleExamClass.createSampleExamBtn)
          .click({ force: true }).wait(1000)
}
Cypress.PageSampleExamCreate.clickExamMode = () => {
     cy.get(sampleExamClass.sampleModeAndtype)
          .eq(0).click({ force: true })
}
Cypress.PageSampleExamCreate.verifyOfflineDisabled = () => {
     cy.get(auiOptionList.auiOptionListBox)
          .eq(0).find('div').eq(1)
          .should('have.attr', 'aria-checked', 'false')
}
Cypress.PageSampleExamCreate.chooseFaceVerification = () => {
     cy.get(auiShadowTag.auiSwitch)
          .eq(1)
          .shadow()
          .find(auiCommonClass.switchRole)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.addAuthorisedURL = () => {
     cy.get(sampleExamClass.allowAuthorisedURL)
          .click({ force: true })
     cy.get(sampleExamClass.addIcon)
          .eq(0)
          .click({ force: true })
     cy.get(sampleExamClass.addIcon)
          .eq(1)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.inputAuthorisedURLInfo = (_name, _url, _redirect) => {
     cy.get(sampleExamClass.inputName)
          .type(_name)
     cy.get(sampleExamClass.inputAddress)
          .type(_url)
     cy.get(auiPanelClass.auiPanelBody + examAttendanceClass.textArea)
          .type(_redirect)
     cy.get(sampleExamClass.addBtn)
          .eq(1).click({ force: true }).wait(500)
}
Cypress.PageSampleExamCreate.editAuthorisedURLInfo = (_editName) => {
     cy.get(auiButtonClass.editBtn)
          .click({ force: true })
     cy.get(sampleExamClass.inputName)
          .type(_editName)
     Cypress.auiCommon.clickFooterBtnInPanel(2)
}
Cypress.PageSampleExamCreate.verifyEditUrlName = (_name) => {
     cy.get(sampleExamClass.sampleUrlName)
          .should('contain', _name)
}
Cypress.PageSampleExamCreate.clickAllowSpecifiedApp = () => {
     cy.get(sampleExamClass.allowAuthorisedApplication)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.clickAddAuthorisedApplicationsBtn = () => {
     cy.get(sampleExamClass.addIcon)
          .eq(0)
          .click({ force: true })
          .wait(1500)
}
Cypress.PageSampleExamCreate.addAuthorisedApplication = (_value, _mac) => {
     if (_mac) {
          Cypress.PageAdminCourse.clickTabBar(1)
     }
     Cypress.PageSampleExamCreate.clickAllowSpecifiedApp()
     Cypress.PageSampleExamCreate.clickAddAuthorisedApplicationsBtn()
     Cypress.PageSampleExamCreate.chooseApplications(_value)
}
Cypress.PageSampleExamCreate.chooseApplications = (_value) => {
     if (_value) {
          Cypress.auiCommon.searchInPanel(_value)
     }
     cy.get(sampleExamClass.chooseApplications)
          .eq(0).click({ force: true })
     cy.get(sampleExamClass.addBtn)
          .eq(0)
          .click({ force: true })
          .waitLoading()
}
Cypress.PageSampleExamCreate.clickSampleButton = (_num) => {
     cy.get(sampleExamClass.createSampleExamBelowBtn)
          .find('button')
          .eq(_num)
          .click({ force: true })
          .wait(2000)
     cy.waitLoading()
}
Cypress.PageSampleExamCreate.verifyValidationMessage = (_value) => {
     cy.get(auiCommonClass.auiValidationMessage)
          .should('contain', _value)
}
Cypress.PageSampleExamCreate.inputNameAndInstruction = (_name, _instruction) => {
     cy.get(examClass.examName)
          .clear().type(_name)
     if (_instruction) {
          cy.get(examStudentClass.auiMutiLineText)
               .clear().type(_instruction)
     }
}
Cypress.PageSampleExamCreate.searchSampleExam = (_name) => {
     cy.get(sampleExamClass.searchExam)
          .type(_name, { force: true })
          .wait(1000)
          .type('{enter}', { force: true })
          .wait(3000)
}
Cypress.PageSampleExamCreate.verifyCardInfo = (_name) => {
     cy.get(examClass.examCardInfoLi)
          .eq(0).children().eq(1).should('contain', 'Closed-book')
     cy.get(examClass.examCardInfoLi)
          .eq(1).children().eq(1).should('contain', 'Face verification disabled')
     cy.get(sampleExamClass.sampleStatus)
          .should('contain', 'Unpublished')
     if (_name) {
          cy.get(examClass.examCardTitle)
               .should('contain', _name)
     }
}
Cypress.PageSampleExamCreate.editSampleExam = () => {
     cy.get(examClass.editExamBtn)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.verifySampleStep2 = () => {
     cy.get(examClass.examStepText)
          .should('contain', 'Generate paper')
}
Cypress.PageSampleExamCreate.createPaper = () => {
     cy.get(sampleExamClass.addIcon)
          .eq(0)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.inputPaperInfo = (_name, _content) => {
     cy.get(examClass.examCreatePaperName)
          .clear().type(_name)
     // Add section
     cy.get(examClass.addSectionBtn)
          .click()
     cy.get(examClass.sectionNameLabel)
          .type('Section name')
     cy.get(examClass.sectionDescriptionLabel)
          .type('Section description')
     Cypress.auiCommon.clickFooterBtnInPanel(1)
     // 创建第一个essay question
     cy.get(sampleExamClass.addIcon)
          .eq(0)
          .parent()
          .click()
     cy.get(sampleExamClass.essayQuestion)
          .click()
          .wait(100)
     cy.get(examStudentClass.inputAnswer)
          .eq(0).click().wait(3000)
     cy.get(sampleExamClass.essayContent)
          .clear().type(_content)
     // 创建第二个essay question
     cy.get(sampleExamClass.addIcon)
          .eq(0)
          .parent()
          .click()
     cy.get(sampleExamClass.essayQuestion)
          .click()
          .wait(100)
     cy.get(examStudentClass.inputAnswer)
          .eq(3)
          .click()
          .wait(3000)
     cy.get(sampleExamClass.essayContent)
          .clear()
          .type(_content)
}
Cypress.PageSampleExamCreate.completePaper = () => {
     cy.get(bankClass.paperSaveComplete)
          .click()
          .waitElement(auiCommonClass.auiNaviItem)
          .wait(4000)
}
Cypress.PageSampleExamCreate.clickRemovePaper = (_confirmRemove) => {
     cy.get(adminCourseClass.deleBtnIcon)
          .eq(0)
          .click()
     if (_confirmRemove) {
          Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
     }
}
// Cypress.PageSampleExamCreate.verifyRemoveConfirmInfo = (_value) => {
//      cy.get(sampleExamClass.confirmMessageContent)
//           .should('contain', _value)
// }
Cypress.PageSampleExamCreate.clickCancel = () => {
     cy.get(auiDialogClass.auiDialogMod + ' ' + auiButtonClass.cancelBtn)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.verifyPaperName = (_name) => {
     cy.get(auiShadowTag.auiEllipsis)
          .eq(0)
          .should('contain', _name)
}
Cypress.PageSampleExamCreate.addPaperFromBank = (_name) => {
     cy.get(adminCourseClass.addFromAddressBookBtn)
          .eq(0).click({ force: true }).waitLoading()
     cy.wait(500)
     cy.get(auiCommonClass.auiSearchBoxInput)
          .type(_name, { force: true }).type('{enter}', { force: true }).wait(2000)
     cy.get(auiCommonClass.auiChoiceInput)
          .eq(0).click({ force: true })
     cy.get(sampleExamClass.addBtn)
          .click({ force: true })
     cy.waitLoading()
     cy.wait(1500)
}
Cypress.PageSampleExamCreate.editPaper = () => {
     cy.get(auiButtonClass.auiFitBoxBtnContainer + sampleExamClass.editPaperBtn)
          .parent()
          .click({ force: true })
          .wait(1000)
}
Cypress.PageSampleExamCreate.modifyPaperName = (_name) => {
     cy.get(examClass.examCreatePaperName)
          .clear()
          .type(_name, { force: true })
}
Cypress.PageSampleExamCreate.modifyFullMark = (_num1, _num2) => {
     cy.get(sampleExamStudentClass.questionMark + 'button')
          .eq(_num1)
          .click({ force: true })
     cy.get(sampleExamClass.fullMark)
          .clear()
          .type(_num2, { force: true })
}
Cypress.PageSampleExamCreate.verifyToastInfo = (_value) => {
     cy.get(auiCommonClass.auiToastInfo)
          .should('contain', _value)
}
Cypress.PageSampleExamCreate.verifyFullMark = (_num) => {
     cy.get(auiTableClass.auiTbody)
          .find('.aui-table-cell').eq(3).should('contain', _num)
}
Cypress.PageSampleExamCreate.filterExam = () => {
     // filter type
     cy.get(auiFilterCommon.auiFilterContent).eq(0).click({ force: true })
     cy.get(auiOptionList.auiOptionCheckBoxAll).eq(0).click({ force: true })
     cy.get(sampleExamClass.filterClosedBook).click({ force: true })
     cy.get(auiCommonClass.auiOptionOKBtn).eq(0).click({ force: true }).wait(1000)
     // filter face verification
     cy.get(auiFilterCommon.auiFilterContent).eq(1).click({ force: true })
     cy.get(auiOptionList.auiOptionCheckBoxAll).eq(3).click({ force: true }).wait(500)
     cy.get(sampleExamClass.filterDisabled).click({ force: true })
     cy.get(auiCommonClass.auiOptionOKBtn).eq(1).click({ force: true }).wait(500)
}
Cypress.PageSampleExamCreate.clickPublishExam = (_value) => {
     cy.get(examClass.publishBtn)
          .click({ force: true })
     if (_value) {
          cy.get(sampleExamClass.sampleExamConfirm)
               .children().eq(2).should('contain', _value)
     }
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
}
Cypress.PageSampleExamCreate.verifyForbidFace = () => {
     cy.get(sampleExamClass.faceVerificationBtn)
          .should('have.attr', 'aria-checked', 'false')
}
Cypress.PageSampleExamCreate.CreatePublishExam = (_value) => {
     cy.get(sampleExamClass.sampleExamConfirm)
          .children().eq(2).should('contain', _value)
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
}
Cypress.PageSampleExamCreate.clickUnpublish = (_value) => {
     cy.get(examClass.unPublishBtn)
          .click({ force: true }).wait(1500)
     if (_value) {
          cy.get(sampleExamClass.sampleExamConfirm)
               .children().eq(2).should('contain', _value)
     }
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
}
Cypress.PageSampleExamCreate.clickDelete = () => {
     cy.get(sampleExamClass.buttonGroup)
          .click({ force: true })
     cy.get(auiButtonClass.deleBtn)
          .click({ force: true })
}
Cypress.PageSampleExamCreate.confirmDelete = (_value) => {
     if (_value) {
          Cypress.auiCommon.verifyConfirmDialogContent(_value)
     }
     Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
}