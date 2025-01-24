/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiComboboxClass, auiPanelClass, CommonMsg } from '../../AUI/aui.common.constants'
import { bankClass } from '../../AUI/bank.constants'

Cypress.PageBankPaper = Cypress.PageBankPaper || {};

const getIframeDocument = () => {
    return cy
        .get('iframe').eq(0)
        .its('0.contentDocument').should('exist')
}
const getIframeBody = () => {
    return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
}

Cypress.PageBankPaper.createPaper = () => {
    Cypress.auiCommon.clickBtn(bankClass.createPaperHomepage, 50000)
};
Cypress.PageBankPaper.visitPaperBank = () => {
    Cypress.auiCommon.clickBtn(bankClass.paperBank, 50000)
};
Cypress.PageBankPaper.clickImportPDF = () => {
    cy.get(bankClass.auibtngroup).eq(0).find(bankClass.auibtngroupTrigger).click();
    Cypress.auiCommon.clickBtn(bankClass.paperImportPDFbtn, 50000)
};
Cypress.PageBankPaper.clickImportWord = () => {
    cy.get(bankClass.auibtngroup).eq(0).find(bankClass.auibtngroupTrigger).click();
    Cypress.auiCommon.clickBtn(bankClass.paperImportbtn, 50000)
};
Cypress.PageBankPaper.clickImportExcel = () => {
    cy.get(bankClass.auibtngroup).eq(0).find(bankClass.auibtngroupTrigger).click();
    Cypress.auiCommon.clickBtn(bankClass.paperImportExcelbtn, 50000)
};
Cypress.PageBankPaper.clickExportQTI = () => {
    cy.exec('rm cypress/downloads/*', { log: true, failOnNonZeroExit: false });
    Cypress.auiCommon.clickBtn(bankClass.exportQtibtn, 50000)
};
Cypress.PageBankPaper.clickImportQTI = () => {
    cy.get(bankClass.auibtngroup).eq(0).find(bankClass.auibtngroupTrigger).click();
    Cypress.auiCommon.clickBtn(bankClass.paperImportQTIbtn, 50000)
};
Cypress.PageBankPaper.clickBankBreadcrumb = () => {
    cy.get('nav').find(auiCommonClass.auibreadcrumbItem).eq(1).click();
    cy.waitLoading();
};
Cypress.PageBankPaper.clickBankTabs = (_index) => {
    cy.get(auiCommonClass.auiTabsBar).find('div').eq(_index).click()
    cy.waitLoading();
};
Cypress.PageBankPaper.clickPaperPreview = () => {
    Cypress.auiCommon.clickBtn(bankClass.paperPreviewbtn, 5000)
    cy.wait(3000)
};
Cypress.PageBankPaper.clickSamplePaperCreate = () => {
    Cypress.auiCommon.clickBtn(bankClass.sampleCreatebtn, 5000)
};
Cypress.PageBankPaper.clickCandidateView = () => {
    Cypress.auiCommon.clickBtn(bankClass.candidateView, 5000)
};
Cypress.PageBankPaper.verifyPaperMarks = (_marks) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(3)
        .should('have.text', _marks);
};
Cypress.PageBankPaper.enterPaperName = (_name) => {
    cy.get(bankClass.textInput).eq(0).type(_name);
};
Cypress.PageBankPaper.savePaperDraft = () => {
    Cypress.auiCommon.clickBtn(bankClass.paperSaveDraft)
    cy.waitLoading()
};
Cypress.PageBankPaper.savePaperComplete = () => {
    cy.wait(5000)
    Cypress.auiCommon.clickBtn(bankClass.paperSaveComplete)
    cy.waitLoading().wait(8000)
};
Cypress.PageBankPaper.editPaper = () => {
    Cypress.auiCommon.clickBtn(bankClass.editPaperbtn)
    cy.waitLoading()
};
Cypress.PageBankPaper.deletePaper = () => {
    cy.get(bankClass.paperDelbtn).wait(500).click();
};
Cypress.PageBankPaper.copyPaper = () => {
    Cypress.auiCommon.clickBtn(bankClass.copyPaperbtn, 15000)
};
Cypress.PageBankPaper.addPaperSection = () => {
    Cypress.auiCommon.clickBtn(bankClass.addPapersection, 15000)
};
Cypress.PageBankPaper.editPaperSection = (_index) => {
    let sectionIndex = bankClass.editPaperSection + _index
    Cypress.auiCommon.clickBtn(sectionIndex, 15000)
};
Cypress.PageBankPaper.editSectionDescri = (_sectionDescri) => {
    cy.get(auiPanelClass.auiPanel)
        .find(bankClass.textArea).eq(0).type(_sectionDescri);
    cy.wait(1000);
};
Cypress.PageBankPaper.clickPanelSave = () => {
    cy.get(auiPanelClass.auiPanel)
        .find(bankClass.saveBtn + ':visible').click();
};
Cypress.PageBankPaper.clickPanelAdd = () => {
    cy.get(auiPanelClass.auiPanel)
        .find(bankClass.addBtn).click();
    cy.waitLoading();
};
Cypress.PageBankPaper.clickPanelSaveCreateNext = () => {
    cy.get(auiPanelClass.auiPanel)
        .find(bankClass.saveNextBtn).click();
};
Cypress.PageBankPaper.verifyCopiedPaper = (_paperName) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(2)
        .should('have.text', _paperName + '_Copy');
};
Cypress.PageBankPaper.verifyPreviewChoiceQues = (_ques, _questionContent, _questionChoice) => {
    let index = _ques + 1
    cy.get(bankClass.previewQuesTitle + ':visible').eq(index)
        .find(bankClass.auihtmlpurity).eq(0).should('have.text', _questionContent);
    cy.get(bankClass.previewQuesTitle + ':visible').eq(index).find(bankClass.auihtmlpurity).then(($item) => {
        for (let i = 0; i < _questionChoice.length; i++) {
            cy.get($item).eq(i + 1)
                .should('contain', _questionChoice[i])
        }
    })
};
Cypress.PageBankPaper.uploadFile = (fileName) => {
    cy.fixture(fileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get("input[type='file']")
                .attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'application/json',
                    encoding: 'utf8'
                })
        })
    // cy.waitLoading()
    cy.wait(2000)
};
Cypress.PageBankPaper.typeImportNum = (_num) => {
    cy.get(bankClass.importPdfNum).type(_num);
};
Cypress.PageBankPaper.verifyImportNum = (_length) => {
    cy.get(bankClass.auiExpander).should('have.length', _length)
};
Cypress.PageBankPaper.addQuesRes = (_index) => {
    cy.get(bankClass.pdfQuesWrap).eq(_index).find(bankClass.pdfAddReponse).click();
};
Cypress.PageBankPaper.delQuesRes = (_index) => {
    cy.get(bankClass.auiExpander).eq(2).find('.aui-expander-title-content').find('.aui-button').eq(0).click();
};
Cypress.PageBankPaper.clickPDFZoomValue = () => {
    getIframeBody().find(bankClass.pdfValue).click();
};
Cypress.PageBankPaper.clickPDFZoomListItem = (_index) => {
    getIframeBody().find(bankClass.pdfZoomlist).eq(_index).click({ force: true }).wait(300);
};
Cypress.PageBankPaper.clickPDFFitWidth = () => {
    getIframeBody().find(bankClass.pdfFitWidth).click().wait(300);
};
Cypress.PageBankPaper.clickPDFZoomIn = () => {
    getIframeBody().find(bankClass.pdfZoomIn).click().wait(300);
};
Cypress.PageBankPaper.verifyPDFValue = (_value) => {
    getIframeBody().find(bankClass.pdfValue).should('have.text', _value);
};
Cypress.PageBankPaper.verifyPDFdefaultZoom = () => {
    cy.wait(5000);
    getIframeBody().find(bankClass.pdfFitHeader)
        .find(bankClass.pdfValue).then(($value) => {
            let value = $value.text()
            Cypress.PageBankPaper.clickPDFZoomValue();
            Cypress.PageBankPaper.clickPDFZoomListItem(0);
            Cypress.PageBankPaper.clickPDFZoomValue();
            Cypress.PageBankPaper.clickPDFFitWidth();
            Cypress.PageBankPaper.verifyPDFValue(value);
        })
};
Cypress.PageBankPaper.verifyMarkingScheme = (_index, _text) => {
    cy.get(bankClass.markingSchemaView)
        .eq(_index).should('have.text', _text);
};
Cypress.PageBankPaper.verifyLeftNaviQuesNum = (_num) => {
    cy.get(bankClass.quesLeft)
        .find(bankClass.quesIndex)
        .should('have.length', _num);
};
Cypress.PageBankPaper.dragPDFCandidateView = (_clientX, _clientY) => {
    cy.get(bankClass.auipdfsplitDrag)
        .trigger('mouseover').trigger('mousedown')
        .trigger('mousemove', { which: 1, clientX: _clientX, clientY: _clientY })
        .trigger('mouseleave')
};
Cypress.PageBankPaper.clickRandmizeQuestions = () => {
    cy.get(bankClass.examSettingbtn)
        .click()
        .wait(500)
    cy.get(bankClass.examChoiceSettingBtn)
        .click()
        .wait(500)
}
Cypress.PageBankPaper.clickRandmizeChoices = () => {
    cy.get(bankClass.examSettingbtn)
        .click()
        .wait(500)
    cy.get(bankClass.examQuestionSettingBtn)
        .click()
        .wait(500)
}
Cypress.PageBankPaper.settingRandmizeQuestions = (_index, _array) => {
    Cypress.PageBankPaper.clickRandmizeQuestions()
    cy.get(bankClass.auiPanelContent)
        .find(bankClass.auiComboboxshellFlex).eq(0).click({ force: true })
    cy.get(bankClass.auiOptionlist + ":visible")
        .find(bankClass.auiOptionlistSelectionLabel)
        .eq(_index)
        .click()
    if (_index == 1) {
        cy.get(bankClass.auiPanelContent)
            .find(bankClass.auiComboboxshellFlex).eq(1).click({ force: true })
        cy.get(bankClass.auiOptionlist + ":visible")
            .find(bankClass.auiOptionlistSelectionLabel)
            .then(($olist) => {
                for (var i = 0; i < _array.length; i++) {
                    cy.get($olist).eq(i).click({ force: true })
                }
            })
        cy.get(bankClass.randomiseQuestionOKbtn + ":visible").click()
    }
    cy.get(bankClass.questionSettingSaveBtn).click()
};
Cypress.PageBankPaper.settingRandmizeChoices = (_index, _bool) => {
    Cypress.PageBankPaper.clickRandmizeChoices()
    cy.get(bankClass.randomChoiceRido)
        .find('input')
        .eq(_index)
        .click()
        .wait(200)
    if (_bool) {
        cy.get(bankClass.applytoAll)
            .click().wait(200)
        cy.get(bankClass.confirmApplyBtn)
            .click().wait(200)
        Cypress.PageBankQuestion.verifyToast('The randomise choices setting was applied.')
        Cypress.auiCommon.closeToast();
    }
    else {
        cy.get(bankClass.applyBtn)
            .click().wait(200)
    }
};

Cypress.PageBankPaper.compareQuesType = (_sequenceinCreatePage, _candidateQindex, _bool) => {
    //get all question type in sequence
    var questionTypes = []
    for (var i = 0; i < _candidateQindex.length; i++) {
        cy.get(bankClass.questionIndex + _candidateQindex[i])
            .click().wait(500)
        //   cy.get(bankClass.commonQuestionTypeIcon).eq(0)
        //     .trigger('mouseover').wait(500)
        cy.get(bankClass.auitooltip).find(bankClass.auiPopoverInner).eq(0).then((res) => {
            questionTypes.push(res.text())
            cy.log(res.text())
        })
    }
    cy.log(_sequenceinCreatePage)
    cy.log(questionTypes)
    cy.compareObjet(_sequenceinCreatePage, questionTypes, _bool)
};
Cypress.PageBankPaper.exitCMPreviewPaper = (_clientX, _clientY) => {
    cy.get(bankClass.previewPaper)
        .find(bankClass.cancelbtn)
        .click({ force: true })
        .wait(1500)
};
Cypress.PageBankPaper.clickCandidatePreviewPaperBtn = (_index) => {
    cy.get(bankClass.questionBottomButton)
        .find('button')
        .eq(_index)
        .click()
        .wait(1500)
};
