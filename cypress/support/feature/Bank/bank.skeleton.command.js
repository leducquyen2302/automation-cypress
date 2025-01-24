/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiComboboxClass, auiPanelClass, auiDialogClass, CommonMsg, auiFilterCommon } from '../../AUI/aui.common.constants'
import { bankClass } from '../../AUI/bank.constants'

Cypress.PageBankSkeleton = Cypress.PageBankSkeleton || {};

Cypress.PageBankSkeleton.createAdvancedSkeleton = () => {
    cy.get(bankClass.auibtngroup).eq(0).find(bankClass.auibtngroupTrigger).click().wait(300);
    cy.get(bankClass.auibtninGroup + ':visible').eq(1).click()
};
Cypress.PageBankSkeleton.createQuickSkeleton = () => {
    cy.get(bankClass.auibtngroup).eq(0).find(bankClass.auibtngroupTrigger).click();
    cy.get(bankClass.auibtninGroup + ':visible').eq(0).click()
};
Cypress.PageBankSkeleton.visitSkeletonBank = (_waiting) => {
    cy.visit('/#/authoring/PaperSkeleton');
    cy.wait(3000)
    cy.waitLoading()
};
Cypress.PageBankSkeleton.enterSkeletonTitile = (_skeletonTitle) => {
    cy.get(bankClass.skeletonName).type(_skeletonTitle);
};
Cypress.PageBankSkeleton.enterSkeletonDescri = (_skeletonDescri) => {
    cy.get(bankClass.skeletonDescri).type(_skeletonDescri);
};
Cypress.PageBankSkeleton.enterSkeletonDescri = (_skeletonDescri) => {
    cy.get(bankClass.skeletonDescri).type(_skeletonDescri);
};
Cypress.PageBankSkeleton.enterSkeletonSectionName = (_name) => {
    cy.get(bankClass.skeletonSectionName).type('{selectall}', '{backspace}')
        .type(_name);
};
Cypress.PageBankSkeleton.addQues = (_index) => {
    cy.get(bankClass.skeletonAddQues + _index).click();
};
Cypress.PageBankSkeleton.setQuesType = (_index) => {
    cy.get(bankClass.skeletonQuesType).click();
    cy.get(auiCommonClass.auiOptionList + ':visible')
        .find(auiCommonClass.auiOptionItem).eq(_index).click({ force: true });
};
Cypress.PageBankSkeleton.setQuesTypeName = (_type) => {
    cy.get(bankClass.skeletonQuesType).click();
    cy.get(auiCommonClass.auiOptionList + ':visible')
        .find(auiCommonClass.auiOptionItem).contains(_type).click({ force: true });
};
Cypress.PageBankSkeleton.setQuesMarks = (_marks) => {
    cy.get(bankClass.skeletonQuesMarks).type(_marks);
};
Cypress.PageBankSkeleton.setQuesTopic = (_topic) => {
    cy.get(auiPanelClass.auiPanel)
        .find(auiCommonClass.auiSearchBoxInput).eq(0)
        .type(_topic).wait(3000);
    cy.get(bankClass.auiOptionlistSelectionText,{timeout:5000}).eq(0).click()
};
Cypress.PageBankSkeleton.setQuesDiff = (_diff) => {
    cy.get(bankClass.skeletonQuesDiff).click();
    cy.get(auiCommonClass.auiOptionList + ':visible')
        .find(auiCommonClass.auiOptionItem).eq(_diff).click({ force: true });
};
Cypress.PageBankSkeleton.createAdvancedSkeletonSave = () => {
    cy.get(bankClass.skeletonSave).click({ force: true });
    cy.wait(3000)
};
Cypress.PageBankSkeleton.verifySkeletonMarks = (_marks) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(6)
        .should('have.text', _marks);
};
Cypress.PageBankSkeleton.verifySkeletonQuestionNumber = (_num) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(5)
        .should('have.text', _num);
};
Cypress.PageBankSkeleton.editSkeleton = () => {
    cy.get(bankClass.skeletonEdit).click();
    cy.waitLoading();
};
Cypress.PageBankSkeleton.delSkeleton = () => {
    cy.get(bankClass.skeletonDel).click();
};
Cypress.PageBankSkeleton.genSkeleton = () => {
    cy.get(bankClass.skeletonGen).click();
    cy.wait(1000);
};
Cypress.PageBankSkeleton.addSection = () => {
    cy.get(bankClass.skeletonAddSec).click();
};
Cypress.PageBankSkeleton.verifySectionTitle = (_index, _title) => {
    cy.get(bankClass.auiExpanderSkeleton).eq(_index).should('contain', _title);
};
Cypress.PageBankSkeleton.verifySkeletonInfo = (_row, _span, _value) => {
    cy.get(bankClass.auiExpanderSkeleton).eq(1)
        .find(bankClass.row).eq(_row)
        .find(bankClass.span).eq(_span)
        .should('have.text', _value);
};
Cypress.PageBankSkeleton.viewSkeleton = () => {
    cy.get(bankClass.skeletonView).click();
    cy.wait(500);
};
Cypress.PageBankSkeleton.verifyViewSkeletonTitle = (_title) => {
    cy.get(bankClass.auiPanelTitle).should('contain', _title);
};
Cypress.PageBankSkeleton.verifyViewSkeletonDecri = (_content) => {
    cy.get(bankClass.skeletonViewDescri).should('contain', _content);
};
Cypress.PageBankSkeleton.verifyViewSkeletonSection = (_index, _title, _decri) => {
    cy.get(bankClass.skeletonViewQues).eq(0).find(bankClass.skeletonViewSec).eq(_index).then(($item) => {
        cy.get($item).find(bankClass.skeletonViewSecTitle).eq(0)
            .should('have.text', _title);
        cy.get($item).find(bankClass.skeletonViewSecDescri).eq(0)
            .should('have.text', _decri);
    })
};
Cypress.PageBankSkeleton.verifyViewSkeletonQues = (_index, _title, _marks, _topic, _diff) => {
    cy.get(bankClass.skeletonViewQues).eq(0).find(bankClass.skeletonQuesWhole).eq(_index).then(($item) => {
        cy.get($item).find(bankClass.skeletonQuesTitle)
            .should('contain', _title);
        cy.get($item).find(bankClass.skeletonQuesMark)
            .should('have.text', _marks);
        cy.get($item).find(bankClass.skeletonQuesTopic)
            .should('have.text', _topic);
        cy.get($item).find(bankClass.skeletonViewSecDescri).eq(2)
            .should('have.text', _diff);
    })
};
Cypress.PageBankSkeleton.verifyViewQuickSkeletonQues = (_index, _title, _number) => {
    cy.get(bankClass.skeletonViewQues).eq(0).find(bankClass.skeletonQuesWhole).eq(_index).then(($item) => {
        cy.get($item).find(bankClass.skeletonQuesTitle)
            .should('contain', _title);
        cy.get($item).find(bankClass.skeletonQuesMark)
            .should('have.text', _number);
    })
};
Cypress.PageBankSkeleton.editViewSkeleton = () => {
    Cypress.auiCommon.clickBtn(bankClass.editBtn, 3000)
};
Cypress.PageBankSkeleton.delSkeletonQues = (_index) => {
    cy.get(bankClass.skeletonQuesDel).eq(_index).click({ force: true });
};
Cypress.PageBankSkeleton.favSkeleton = (_index) => {
    cy.get(bankClass.skeletonfav).eq(_index).click({ force: true });
};
Cypress.PageBankSkeleton.verifyHomeSkeleton = (_name) => {
    cy.get(bankClass.skeletonHomePage).should('contain', _name);
};
Cypress.PageBankSkeleton.verifyTableSkeletonTitle = (_title) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(2)
        .should('contain', _title);
};
Cypress.PageBankSkeleton.verifySkeletonMatchQues = (_index, _bool) => {
    cy.get(auiDialogClass.auiDialog).find(auiTableClass.auiTRow).eq(_index + 1)
        .find(auiTableClass.auiTCell).eq(3)
        .should('have.text', _bool)
};
Cypress.PageBankSkeleton.verifyGenerateMessage = (_message) => {
    cy.get(bankClass.auiMessageBar).eq(0).should('contain', _message);
    cy.wait(5000)
};
Cypress.PageBankSkeleton.verifyGenerateTopic = (_topic) => {
    cy.get(auiComboboxClass.auiComboBox).eq(0).should('have.text', _topic);
};
Cypress.PageBankSkeleton.verifyGenerateDiff = (_diff) => {
    cy.get(bankClass.settingContainer + ':visible')
        .contains(_diff).should('be.visible');
};
Cypress.PageBankSkeleton.verifyGenerateRandom = (_bool) => {
    cy.get(bankClass.settingContainer + ':visible')
        .contains(_bool).should('be.visible');
};
Cypress.PageBankSkeleton.search = (_value) => {
    cy.get(auiCommonClass.auiSearchBoxInput).eq(0)
        .clear()
        .type(_value).type('{enter}');
    cy.wait(3000);
};
Cypress.PageBankSkeleton.delConfirm = () => {
    cy.get(auiDialogClass.auiDialog)
        .find(bankClass.deleBtn).click();
};
Cypress.PageBankSkeleton.clickcourse = (_index) => {
    cy.get(bankClass.skeletonFilterCourse).click();
    cy.wait(500);
};
Cypress.PageBankSkeleton.selectCourse = (_index) => {
    cy.get(auiCommonClass.auiOptionItem + ':visible').eq(_index).click({ force: true });
    cy.wait(1000);
};
Cypress.PageBankSkeleton.enterQuickSkeletonInfo = (_index,_content) => {
    cy.get(bankClass.skeletonQuickpanel + " " +bankClass.skeletonQuickInput).eq(_index)
      .clear()
      .type(_content);
    cy.wait(1000);
};
Cypress.PageBankSkeleton.editQuickSkeletonSection = (_index) => {
    cy.get(bankClass.skeletonQuickpanel+ " " +bankClass.skeletonQuickSectionEditBtn)
      .eq(_index)
      .click()
    cy.wait(200);
};
Cypress.PageBankSkeleton.enterQuickSkeletonSectionTitle = (_title) => {
    cy.get(bankClass.skeletonQuickSectionDiag).find(bankClass.skeletonQuickInput)
      .eq(0)
      .clear()
      .type(_title);
    cy.wait(200);
};
Cypress.PageBankSkeleton.enterQuickSkeletonSectionDesp = (_description) => {
    cy.get(bankClass.skeletonQuickSectionDiag).find(bankClass.skeletonQuickInput)
      .eq(1)
      .clear()
      .type(_description);
    cy.wait(200);
};
Cypress.PageBankSkeleton.saveQuickSkeletonSection = () => {
    cy.get(bankClass.skeletonDialogSection)
      .find(bankClass.skeletonQuickSectionDiag).find(bankClass.skeletonQuickSectionSave)
      .eq(0).click()
    cy.wait(200);
};
Cypress.PageBankSkeleton.addQuickQues = (_sectionIndex) => {
    cy.get(bankClass.skeletonQuickSectionPanel).eq(_sectionIndex)
      .find(bankClass.fauiPlus)
      .click()
};
Cypress.PageBankSkeleton.DelQuickQues = (_sectionIndex,_questionIndex) => {
    cy.get(bankClass.skeletonQuickSectionPanel).eq(_sectionIndex)
      .find(bankClass.skeletonQuickQuestion).eq(_questionIndex)
      .find(bankClass.skeletonDeleteQuickQuestion)
      .click()
};
Cypress.PageBankSkeleton.addQuickSection = () => {
    cy.get(bankClass.skeletonQuickpanel)
      .find(bankClass.sekectonAddQuickSession)
      .click()
};
Cypress.PageBankSkeleton.setQuicKQuesType = (_sectionIndex,_questionIndex,_typeIndex) => {
    cy.get(bankClass.skeletonQuickSectionPanel).eq(_sectionIndex)
      .find(bankClass.skeletonQuickQuestion).eq(_questionIndex)
      .find(auiCommonClass.auiComBox)
      .click()
    cy.get(auiCommonClass.auiOptionList + ':visible')
      .find(auiCommonClass.auiOptionItem)
      .eq(_typeIndex).click({ force: true });
};
Cypress.PageBankSkeleton.setQuickQuesNumber = (_sectionIndex,_questionIndex,_content) => {
    cy.get(bankClass.skeletonQuickSectionPanel).eq(_sectionIndex)
      .find(bankClass.skeletonQuickQuestion).eq(_questionIndex)
      .find(bankClass.skeletonQuickInput)
      .clear()
      .type(_content)
};
Cypress.PageBankSkeleton.saveQuickSkeleton = () => {
    cy.get(bankClass.skeletonQuickpanel)
      .find(bankClass.skeletonPanelSaveBtn)
      .click()
    cy.waitLoading()
};