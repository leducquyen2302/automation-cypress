/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiTableClass, auiComboboxClass, auiDialogClass, auiButtonClass, auiPanelClass, CommonMsg, auiFilterCommon, auiDateFilter } from '../../AUI/aui.common.constants'
import { bankClass } from '../../AUI/bank.constants'
import { examClass } from '../../AUI/exam.constants'

const questionType = [
    {
        name: 'choice',
        drag: bankClass.dragQuesTypeChoice
    },
    {
        name: 'fib',
        drag: bankClass.dragQuesTypeFib
    },
    {
        name: 'essay',
        drag: bankClass.dragQuesTypeEssay
    },
    {
        name: 'sub',
        drag: bankClass.dragQuesTypeSub
    },
    {
        name: 'truefalse',
        drag: bankClass.dragQuesTypeTrueFalse
    },
    {
        name: 'match',
        drag: bankClass.dragQuesTypeMatching
    },
    {
        name: 'hotspot',
        drag: bankClass.dragQuesTypeImagelabeling
    },
    {
        name: 'ordering',
        drag: bankClass.dragQuesTypeOrdering
    }
];

Cypress.PageBankQuestion = Cypress.PageBankQuestion || {};

Cypress.PageBankQuestion.createQuestion = () => {
    Cypress.auiCommon.clickBtn(bankClass.createQuesHomepage, 3000)
};
Cypress.PageBankQuestion.clickcourse = (_index) => {
    cy.get(auiFilterCommon.auiFilterContent).eq(_index).then(($item) => {
        Cypress.auiCommon.clickBtn($item.eq(0), 3000)
    })
};
Cypress.PageBankQuestion.selectCourse = (_options) => {
    cy.get(auiCommonClass.auiOptionItem).eq(_options).click();
};
Cypress.PageBankQuestion.selectCourseByName = (_value) => {
    Cypress.auiCommon.comboSearchBox(_value)
};
Cypress.PageBankQuestion.clickcourseInDialog = (_index) => {
    cy.get(auiDialogClass.auiDialog).find(auiFilterCommon.auiFilterContent).eq(_index).then(($item) => {
        Cypress.auiCommon.clickBtn($item.eq(0), 3000)
    })
};
Cypress.PageBankQuestion.selectCourseInDialog = (_options) => {
    cy.get(auiCommonClass.auiOptionItem + ':visible').eq(_options).click();
};
function dragQuestion(_type) {
    cy.get(questionType[_type].drag)
        .drag(bankClass.dragQuestion)
        .wait(1000);
};
Cypress.PageBankQuestion.dragChoiceQuestion = () => {
    dragQuestion(0);
};
Cypress.PageBankQuestion.dragFibQuestion = () => {
    dragQuestion(1);
};
Cypress.PageBankQuestion.dragEssayQuestion = () => {
    dragQuestion(2);
};
Cypress.PageBankQuestion.dragSubQuestion = () => {
    dragQuestion(3);
};
Cypress.PageBankQuestion.dragTFQuestion = () => {
    dragQuestion(4);
};
Cypress.PageBankQuestion.dragMatchQuestion = () => {
    dragQuestion(5);
};
Cypress.PageBankQuestion.dragHotSpotQuestion = () => {
    dragQuestion(6);
};
Cypress.PageBankQuestion.dragOrderingQuestion = () => {
    dragQuestion(7);
};
Cypress.PageBankQuestion.addSection = () => {
    cy.get(examClass.addSectionBtn)
        .click()
        .wait(1000)
    cy.get(examClass.sectionNameLabel)
        .type('Section name')
        .wait(500)
    cy.get(examClass.sectionDescriptionLabel)
        .type('Section description')
    Cypress.auiCommon.clickFooterBtnInPanel(1)
};
Cypress.PageBankQuestion.clickTypeRichTextEditor = (_index, _choiceContent, _issub) => {
    let expander = bankClass.auiExpander
    if (_issub) {
        expander = bankClass.auiSubExpander;
    }
    cy.get(expander).eq(_index)
        .find(bankClass.richTextEditor).eq(0)
        .click().wait(1000)
    cy.waitUntil(() => cy.get(expander).eq(_index).find(bankClass.richEditorInner, { timeout: 80000 })
        .find(bankClass.richEditeContent)
        .find(bankClass.richEditeEditable))
    cy.get(expander).eq(_index).find(bankClass.richEditorInner, { timeout: 80000 })
        .find(bankClass.richEditeContent)
        .find(bankClass.richEditeEditable).click({ force: true })
        .wait(2500)
        .type(_choiceContent, { delay: 25 }).click()
};
Cypress.PageBankQuestion.typeChoiceValue = (_index, _choice, _issub) => {
    let expander = bankClass.auiExpander
    if (_issub) {
        expander = bankClass.auiSubExpander;
    }
    cy.get(expander).eq(_index)
        .find(bankClass.choiceInput)
        .then(($item) => {
            for (let i = 0; i < _choice.length; i++) {
                cy.get($item).eq(i).type(_choice[i]);
            }
        })
    // cy.get(bankClass.choiceInput)
    //     .then(($item) => {
    //         for (let i = 0; i < _choice.length; i++) {
    //             cy.get($item).eq(i).type(_choice[i]);
    //         }
    //     })
};
Cypress.PageBankQuestion.enableCorrectAnswer = (_ques, _index, _issub) => {
    let expander = bankClass.auiExpander
    if (_issub) {
        expander = bankClass.auiSubExpander;
    }
    cy.get(expander).eq(_ques)
        .find(bankClass.choiceCorrectIcon).eq(_index).click();
};
Cypress.PageBankQuestion.createQuestionSave = () => {
    cy.get(bankClass.quesSavebtn).click();
    cy.waitLoading();
};
Cypress.PageBankQuestion.search = (_value) => {
    cy.wait(5000)
    cy.get(auiCommonClass.auiSearchBoxInput).eq(0)
        .clear()
        .type(_value, { delay: 25 }).type('{enter}');
    cy.waitLoading();
};
Cypress.PageBankQuestion.verifyQuesBankTable = (_content) => {
    for (let i = 0; i < _content.length; i++) {
        cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(i + 6)
            .should('contain', _content[i].value);
    }
};
Cypress.PageBankQuestion.visitQuesBank = () => {
    Cypress.auiCommon.clickBtn(bankClass.quesBank, 3000)
};
Cypress.PageBankQuestion.checkItem = (_rowIndex) => {
    cy.wait(1000);
    Cypress.auiCommon.checkBox(auiCommonClass.auiOptionCheckBox, _rowIndex)
};
Cypress.PageBankQuestion.clickQuesEdit = () => {
    Cypress.auiCommon.clickBtn(bankClass.quesBankEdit, 5000)
};
Cypress.PageBankQuestion.clickQuesPreview = () => {
    cy.waitLoading();
    Cypress.auiCommon.clickBtn(bankClass.quePreviewbtn, 3000)
};
Cypress.PageBankQuestion.clickQuesExist = () => {
    cy.get('.aui-button:visible').click();
};
Cypress.PageBankQuestion.clickQuesDel = () => {
    cy.get(bankClass.quesDelbtn).click().wait(1000);
};
Cypress.PageBankQuestion.clickQuesSettings = () => {
    cy.get(bankClass.quesSettings).click().wait(1000);
};
Cypress.PageBankQuestion.clickSubQuesSettingsIndex = (_index) => {
    let quesSettingIndex = bankClass.quesSettings + _index;
    cy.get(quesSettingIndex).wait(300).click();
};
Cypress.PageBankQuestion.clickQuesSettingsIndex = (_index) => {
    let quesSettingIndex = bankClass.quesSettings + _index;
    cy.get(quesSettingIndex + ' button')
        .wait(1000)
        .click({ force: true });
};
Cypress.PageBankQuestion.settingsTypeTopic = (_topic) => {
    cy.get(bankClass.settingContainer)
        .find(auiComboboxClass.auiComboInput).click()
        .type(1)
        .clear()
        .type(_topic, { delay: 100 })
        .wait(4000)
    cy.get(bankClass.auiOptionlistSelectionText, { timeout: 5000 }).eq(0).click()
    // .type("{enter}");
};
Cypress.PageBankQuestion.settingsSetDiff = (_index) => {
    cy.get(bankClass.settingContainer)
        .find(auiFilterCommon.auiFilterContent).eq(1).click({ force: true });
    let optionVisiable = auiCommonClass.auiOptionItem + ':visible'
    cy.get(optionVisiable).eq(_index)
        .click({ force: true })
};
Cypress.PageBankQuestion.settingsTypeMarkingScheme = (_markingScheme) => {
    cy.get(bankClass.settingContainer)
        .find(bankClass.richTextEditor + ':visible').eq(0).click();
    cy.waitUntil(() => cy.get(bankClass.richEditorInner, { timeout: 80000 }))
    cy.get(bankClass.settingContainer)
        .find(bankClass.richTextEditor + ':visible').eq(0)
        .find(bankClass.richEditorInner)
        .wait(2500)
        .clear()
        .type(_markingScheme, { delay: 25 }).click()
}
Cypress.PageBankQuestion.selectTypeofFeedback = (_typeIndex) => {
    cy.get(bankClass.settingContainer)
        .find(bankClass.typeOffeedback)
        .click({ force: true })
        .wait(500)
    cy.get(bankClass.auiOptionlistlabel + ':visible')
        .eq(_typeIndex)
        .click({ force: true })
        .wait(500)
}
Cypress.PageBankQuestion.verifyFeedback = (_type, _feedback) => {
    cy.get(bankClass.settingContainer)
        .find(bankClass.typeOffeedback)
        .should('contain', _type)
    cy.get(bankClass.settingContainer)
        .find(bankClass.richTextEditor + ':visible')
        .as('res')
    if (_type == 'Separate feedback for correct and wrong responses') {
        cy.get('@res').eq(1).should('contain', _feedback.correct)
        cy.get('@res').eq(2).should('contain', _feedback.wrong)
    }
    else {
        cy.get('@res').eq(1).should('contain', _feedback)
    }
};
Cypress.PageBankQuestion.settingsTypeFeedback = (_feedbackIndex, _feedback) => {
    cy.get(bankClass.settingContainer)
        .find(bankClass.richTextEditor + ':visible').eq(_feedbackIndex + 1).click();
    cy.waitUntil(() => cy.get(bankClass.richEditorInner, { timeout: 80000 }))
    cy.get(bankClass.settingContainer)
        .find(bankClass.richTextEditor + ':visible').eq(_feedbackIndex + 1)
        .find(bankClass.richEditorInner)
        .wait(2500)
        .clear()
        .type(_feedback, { delay: 25 }).click()
}

Cypress.PageBankQuestion.settingsEnableCaseSensi = (_ques) => {
    cy.get(bankClass.settingContainer)
        .find(auiComboboxClass.auiComboShell)
        .eq(2)
        .click({ force: true })
    cy.get(auiCommonClass.auiOptionItem + ':visible')
        .eq(1)
        .click({ force: true })
}

Cypress.PageBankQuestion.settingsDisableRandom = (_index) => {
    cy.get(bankClass.settingContainer)
        .find(auiComboboxClass.auiComboShell)
        .eq(_index)
        .click({ force: true })
    cy.get(auiCommonClass.auiOptionItem + ':visible')
        .eq(1)
        .click({ force: true })
}

Cypress.PageBankQuestion.settingsClose = () => {
    let popupVisible = bankClass.settingsPanelClose + ':visible'
    cy.get(popupVisible).click({ force: true });
};

Cypress.PageBankQuestion.delConfirm = () => {
    cy.get(auiDialogClass.auiDialog)
        .find(bankClass.deleBtn).then(($item) => {
            Cypress.auiCommon.clickBtn($item, 5000);
        })
};
Cypress.PageBankQuestion.okConfirm = () => {
    cy.get(auiDialogClass.auiDialog)
        .find(bankClass.okBtn).then(($item) => {
            Cypress.auiCommon.clickBtn($item, 3000);
        })
};
Cypress.PageBankQuestion.generateConfirm = () => {
    cy.get(auiDialogClass.auiDialog)
        .find(bankClass.generateBtn).then(($item) => {
            Cypress.auiCommon.clickBtn($item, 3000);
        })
};
Cypress.PageBankQuestion.importConfirm = () => {
    cy.get(auiDialogClass.auiDialog)
        .find(bankClass.importBtn).then(($item) => {
            Cypress.auiCommon.clickBtn($item, 3000);
        })
};
Cypress.PageBankQuestion.exportConfirm = () => {
    cy.get(auiDialogClass.auiDialog)
        .find(bankClass.exportbtn)
        .click({ force: true })
        .wait(1500)
    cy.waitLoading()
};
Cypress.PageBankQuestion.verifyDialogTitle = (_title) => {
    cy.get(auiDialogClass.auiDialog).eq(0)
        .find(auiDialogClass.auiDialogHeader).eq(0).should('have.text', _title);
};
Cypress.PageBankQuestion.enableMultiAnswer = (_ques, _issub) => {
    let expander = bankClass.auiExpander
    if (_issub) {
        expander = bankClass.auiSubExpander;
    }
    cy.get(expander).eq(_ques)
        .find(bankClass.auiSwithOff).eq(1).click();
};
Cypress.PageBankQuestion.quesAddChoice = (_ques, _subindex, _issub) => {
    let expander = bankClass.auiExpander
    let choice = '#a' + bankClass.addChoice
    if (_ques > 0) {
        choice = '#a' + (_ques + 1) + bankClass.addChoice
    }
    if (_issub) {
        expander = bankClass.auiSubExpander;
        choice = '#a' + _ques + bankClass.addChoice
        _ques = _subindex
    }

    cy.get(expander).eq(_ques)
        .find(choice).click();
};
Cypress.PageBankQuestion.quesRemoveChoice = (_count) => {
    for (let c = 0; c < _count; c++) {
        cy.get('.choice-delete')
            .eq(0)
            .find('button')
            .click({ force: true })
            .wait(200)
    }
}
Cypress.PageBankQuestion.quesAddBlank = (_ques, _subindex, _issub) => {
    let blank = bankClass.addBlank
    let expander = bankClass.auiExpander
    if (_ques > 0) {
        blank = bankClass.addBlank + (_ques + 1);
    }
    if (_issub) {
        expander = bankClass.auiSubExpander;
        blank = bankClass.addBlank + _ques
        _ques = _subindex
    }
    cy.wait(500).get(expander).eq(_ques)
        .find(blank).click();
};
Cypress.PageBankQuestion.typeFibAnswer = (_ques, _content, _issub) => {
    let expander = bankClass.auiExpander
    if (_issub) {
        expander = bankClass.auiSubExpander;
    }
    cy.get(expander).eq(_ques)
        .find(bankClass.textArea).eq(0)
        .clear()
        .type(_content, { delay: 15 });
};
Cypress.PageBankQuestion.inputFIBAnswer = (_quest, _index, _content) => {
    cy.get(bankClass.auiExpander).eq(_quest)
        .find(bankClass.textArea)
        .eq(_index)
        .clear()
        .type(_content, { delay: 15 });
}
Cypress.PageBankQuestion.typeMatchOption = (_ques, _content) => {
    cy.get(bankClass.matchOptions).eq(_ques).find(bankClass.textArea)
        .then(($item) => {
            for (let i = 0; i < _content.length; i++) {
                cy.get($item).eq(i).type(_content[i]);
            }
        })
};
Cypress.PageBankQuestion.typeOrderingOption = (_ques, _content) => {
    cy.get(bankClass.orderTable).eq(_ques).find(bankClass.orderRow).find(bankClass.orderInput)
        .then(($item) => {
            for (let i = 0; i < _content.length; i++) {
                cy.get($item).eq(i).type(_content[i]);
            }
        })
};
Cypress.PageBankQuestion.addSubques = (_group, _index) => {
    cy.get(bankClass.tagSubQ + ' ' + bankClass.auibtngroup).eq(_group).click().wait(300);
    cy.get(bankClass.auibtngroupItem + ':visible').find('button').then(($item) => {
        Cypress.auiCommon.clickBtn($item.eq(_index))
        cy.wait(2000)
    })
};

Cypress.PageBankQuestion.typeMarks = (_index, _marks) => {
    let fullmarksItem = bankClass.fullMarks + _index;
    cy.get(fullmarksItem).type('{backspace}').type(_marks);
};
Cypress.PageBankQuestion.inputMarks = (_index, _marks) => {
    cy.get('.aui-input-number')
        .eq(_index)
        .find('input')
        .clear()
        .type(_marks, { force: true })
}
Cypress.PageBankQuestion.addExistQues = () => {
    Cypress.auiCommon.clickBtn(bankClass.addExistbtn, 3000)
};
Cypress.PageBankQuestion.searchInPanel = (_value) => {
    cy.get(auiPanelClass.auiPanel).find(auiCommonClass.auiSearchBoxInput + ':visible')
        .type(_value).wait(200).type('{enter}');
    cy.wait(2000);
};
Cypress.PageBankQuestion.checkBoxInPanel = (_rowIndex) => {
    cy.get(auiPanelClass.auiPanel)
        .find(auiCommonClass.auiCheckBox).then(($item) => {
            Cypress.auiCommon.checkBox($item, _rowIndex);
        })
};
Cypress.PageBankQuestion.checkBoxInDialog = (_rowIndex) => {
    cy.get(auiDialogClass.auiDialog)
        .find(auiCommonClass.auiCheckBox).then(($item) => {
            Cypress.auiCommon.checkBox($item, _rowIndex);
        })
};
Cypress.PageBankQuestion.verifycheckBoxInDialog = (_bool) => {
    cy.get(auiDialogClass.auiDialog)
        .find(auiCommonClass.auiCheckBox).eq(0)
        .invoke('attr', 'aria-checked').should('eq', _bool)
};
Cypress.PageBankQuestion.subSettings = (_index, _setting) => {
    cy.get('.aui-expander-title')
        .eq(_index)
        .click({ force: true })
    cy.get('button[title="Advanced settings"]')
        .eq(_index)
        .click({ force: true })
        .wait(500)
    if (_setting.markingScheme) {
        Cypress.PageBankQuestion.settingsTypeMarkingScheme(_setting.markingScheme)
    }
    if (_setting.fullMarks) {
        Cypress.PageBankQuestion.inputMarks(_index, _setting.fullMarks)
    }
}

Cypress.PageBankQuestion.fillQuestionForm = (_questions) => {
    if (_questions.name === 'SingleChoice') {
        Cypress.PageBankQuestion.dragChoiceQuestion()
        Cypress.PageBankQuestion.clickTypeRichTextEditor(0, _questions.title)
        _questions.options.length <= 4 ?
            Cypress.PageBankQuestion.quesRemoveChoice(4 - _questions.options.length) :
            Cypress.PageBankQuestion.quesAddChoice(0)

        Cypress.PageBankQuestion.typeChoiceValue(0, _questions.options)
        Cypress.PageBankQuestion.enableCorrectAnswer(0, _questions.correctAns[0])
    }
    if (_questions.name === 'MulitChoice') {
        Cypress.PageBankQuestion.dragChoiceQuestion()
        Cypress.PageBankQuestion.clickTypeRichTextEditor(0, _questions.title)
        Cypress.PageBankQuestion.enableMultiAnswer(0)
        _questions.options.length <= 4 ?
            Cypress.PageBankQuestion.quesRemoveChoice(4 - _questions.options.length) :
            Cypress.PageBankQuestion.quesAddChoice(0)
        Cypress.PageBankQuestion.typeChoiceValue(0, _questions.options)
        for (let i = 0; i < _questions.correctAns.length; i++) {
            Cypress.PageBankQuestion.enableCorrectAnswer(0, _questions.correctAns[i])
        }
    }
    if (_questions.name === 'Essay') {
        Cypress.PageBankQuestion.dragEssayQuestion()
        Cypress.PageBankQuestion.clickTypeRichTextEditor(0, _questions.title)
    }
    if (_questions.name === 'FillBlank') {
        Cypress.PageBankQuestion.dragFibQuestion()
        Cypress.PageBankQuestion.clickTypeRichTextEditor(0, _questions.title)

        for (let index = 0; index < _questions.correctAns.length; index++) {
            Cypress.PageBankQuestion.inputFIBAnswer(0, index, _questions.correctAns[index])
        }

    }
    if (_questions.name === 'SubQues') {
        Cypress.PageBankQuestion.dragSubQuestion()
        Cypress.PageBankQuestion.clickTypeRichTextEditor(0, _questions.title)

        Cypress.PageBankQuestion.addSubques(0, 0)
        Cypress.PageBankQuestion.addSubques(0, 1)
        Cypress.PageBankQuestion.clickTypeRichTextEditor(1, _questions.questions[0].title)
        Cypress.PageBankQuestion.quesRemoveChoice(4 - _questions.questions[0].options.length)
        Cypress.PageBankQuestion.typeChoiceValue(0, _questions.questions[0].options)
        Cypress.PageBankQuestion.enableCorrectAnswer(0, _questions.questions[0].correctAns[0])
        Cypress.PageBankQuestion.subSettings(1, _questions.questions[0].advanSeting)

        Cypress.PageBankQuestion.clickTypeRichTextEditor(2, _questions.questions[1].title)
        Cypress.PageBankQuestion.subSettings(2, _questions.questions[1].advanSeting)
    }
    if (_questions.fullMarks) {
        Cypress.PageBankQuestion.inputMarks(0, _questions.fullMarks)
    }
    if (_questions.advanSeting) {
        Cypress.PageBankQuestion.clickQuesSettings()
        if (_questions.advanSeting.topic) {
            Cypress.PageBankQuestion.settingsTypeTopic(_questions.advanSeting.topic)
        }
        if (_questions.advanSeting.caseSensi) {
            Cypress.PageBankQuestion.settingsEnableCaseSensi(0)
        }
        if (_questions.advanSeting.markingScheme) {
            Cypress.PageBankQuestion.settingsTypeMarkingScheme(_questions.advanSeting.markingScheme)
        }
    }
    Cypress.PageBankQuestion.createQuestionSave()
}


// // Verification Command 
Cypress.PageBankQuestion.verifyExistQues = (_length) => {
    cy.get(bankClass.choiceQuesPreview).should('have.length', _length)
};
Cypress.PageBankQuestion.verifQuesLenth = (_length) => {
    cy.get(bankClass.previewQuesTitle + ':visible').should('have.length', _length)
};
Cypress.PageBankQuestion.verifyPreviewQuesContent = (_ques, _questionContent) => {
    cy.get(bankClass.previewQuesTitle + ':visible').eq(_ques)
        .find(bankClass.auihtmlpurity).eq(0)
        .should('have.text', _questionContent);
};
Cypress.PageBankQuestion.verifyPreviewChoiceQues = (_ques, _questionContent, _questionChoice) => {
    cy.get(bankClass.previewQuesTitle).eq(_ques)
        .find(bankClass.auihtmlpurity).eq(0).should('have.text', _questionContent);
    cy.get(bankClass.previewQuesTitle).eq(_ques).find(bankClass.auihtmlpurity).then(($item) => {
        for (let i = 0; i < _questionChoice.length; i++) {
            cy.get($item).eq(i + 1)
                .should('contain', _questionChoice[i])
        }
    })
};
Cypress.PageBankQuestion.verifyPreviewEssayQues = (_ques, _questionContent) => {
    cy.get(bankClass.previewQuesTitle + ':visible').eq(_ques)
        .find(bankClass.auihtmlpurity).eq(0).should('have.text', _questionContent)
};
Cypress.PageBankQuestion.verifyPreviewFibQues = (_ques, _questionContent, _questionContent2, _questionAnswer) => {
    cy.get(bankClass.previewQuesTitle + ':visible').eq(_ques).then(($item) => {
        cy.get($item).find(bankClass.auihtmlpurity).eq(0)
            .should('contain', _questionContent).and('contain', _questionContent2);
        cy.get($item).find(bankClass.fibAnswer).eq(0)
            .should('have.text', _questionAnswer);
    })
};
Cypress.PageBankQuestion.verifyEditQues = (_topic, _diff) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(5)
        .should('have.text', _topic);
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(6)
        .should('have.text', _diff);
};
Cypress.PageBankQuestion.verifyQuesMarks = (_marks) => {
    cy.get(auiTableClass.auiTRow).eq(2).find(auiTableClass.auiTCell).eq(4)
        .should('have.text', _marks);
};
Cypress.PageBankQuestion.verifyDelItem = () => {
    cy.get(auiTableClass.auiTbody)
        .should('have.text', CommonMsg.noItems)
};
Cypress.PageBankQuestion.uploadHotspot = (_index, fileName) => {
    cy.fixture(fileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            // cy.get(bankClass.auiExpander).eq(_index)
            // .find("input[type='file']").eq(2)
            cy.get("input[type='file']")
                .attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'application/json',
                    encoding: 'utf8'
                })
        })
    cy.wait(8000)
};
Cypress.PageBankQuestion.verifyPreviewMatchQues = (_ques, _questionContent, _options) => {
    cy.get(bankClass.previewQuesTitle + ':visible').eq(_ques).then(($item) => {
        cy.get($item).find(bankClass.auihtmlpurity).eq(0)
            .should('have.text', _questionContent)
        cy.get($item).find(bankClass.matchPreview).find(bankClass.optionItem).then(($ops) => {
            for (let i = 0; i < _options.length; i++) {
                cy.get($ops).eq(i)
                    .should('have.text', _options[i])
            }
        })
    })
};

Cypress.PageBankQuestion.verifyPreviewOrderingQues = (_ques, _questionContent, _options) => {
    cy.get(bankClass.previewQuesTitle + ':visible').eq(_ques).then(($item) => {
        cy.get($item).find(bankClass.auihtmlpurity).eq(0)
            .should('have.text', _questionContent)
        cy.get($item).find(bankClass.orderOptionPreview)
            .find(bankClass.orderOptionItem).find(bankClass.orderOptionContent).then(($ops) => {
                for (let i = 0; i < _options.length; i++) {
                    cy.get($ops).eq(i)
                        .should('have.text', _options[i])
                }
            })
    })
};
Cypress.PageBankQuestion.addCircleSquareHotspotResponse = (_index, _shape, _drawing) => {
    cy.get(bankClass.auiExpander).eq(_index)
        .find(bankClass.hotspotShape).eq(_shape).click().wait(500);
    cy.get(bankClass.auiExpander).eq(_index)
        .find(bankClass.svgContainer).wait(500)
        .then($el => {
            const a = $el[0].getBoundingClientRect();
            const basex = a.right - a.left;
            const basey = a.bottom - a.top;
            cy.get($el).trigger("mousedown", basex * _drawing[0], basey * _drawing[1], { force: true })
                .trigger("mousemove", basex * (_drawing[0] + 0.1), basey * (_drawing[1] + 0.1), { force: true })
                .trigger("mouseup", { force: true }).wait(500)
        })
};
Cypress.PageBankQuestion.clickShapeBtn = (_index, _shape) => {
    cy.get(bankClass.auiExpander).eq(_index)
        .find(bankClass.hotspotShape).eq(_shape).click().wait(500);
};
Cypress.PageBankQuestion.addDrawingHotspotResponse = (_index, _shape, _drawing) => {
    cy.wait(2000)
    cy.get(bankClass.quesTitleMarks + 'button')
        .click()
        .wait(2000)
    cy.get(bankClass.auiExpander).eq(_index)
        .find(bankClass.hotspotShape).eq(_shape).click().wait(500);
    cy.get(".shape-entity").then($el0 => {
        const a = $el0[0].getBoundingClientRect()
        console.log("rect is " + a.top + " " + a.left + " " + a.right + " " + a.bottom)
    })
    cy.get(bankClass.auiExpander).eq(_index)
        .find(bankClass.svgContainer).wait(500)
        .then($el => {
            const a = $el[0].getBoundingClientRect();
            const basex = a.right - a.left;
            const basey = a.bottom - a.top;
            for (var i = 0; i < 6; i++) {
                cy.get($el).click(basex * _drawing[i].dotX, basey * _drawing[i].dotY, { force: true }).wait(200)
            }
            cy.get(bankClass.cursorPoint).click({ force: true }).wait(500)
            // cy.get($el).click(drawing[0].dotX,drawing[0].dotY,{force:true}).wait(2000)
        })
};
Cypress.PageBankQuestion.verifyHotspotResponse = (_ques, _circle, _rect, _polyline) => {
    cy.get(bankClass.previewQuesTitle + ':visible').eq(_ques)
        .then(($item) => {
            cy.get($item).find(bankClass.ellipse).should('have.length', _circle);
            cy.get($item).find(bankClass.rect).should('have.length', _rect);
            cy.get($item).find(bankClass.polyline).should('have.length', _polyline);
        })
};
Cypress.PageBankQuestion.clickAddOrderOptions = () => {
    cy.get(bankClass.orderAddOption).click();
};
Cypress.PageBankQuestion.changeOrderOptions = (_start, _end) => {
    cy.get(bankClass.orderIndex)
        .find(auiComboboxClass.auiComboShell).eq(_start).click({ force: true });
    cy.get('.aui-comboboxshell-popup :visible').find(auiCommonClass.auiOptionItem).eq(_end).click();
};
Cypress.PageBankQuestion.enableAdvanceMode = (_ques, _issub) => {
    let expander = bankClass.auiExpander
    if (_issub) {
        expander = bankClass.auiSubExpander;
    }
    cy.get(expander).eq(_ques)
        .find(bankClass.auiSwithOff).eq(0).click({ force: true });
};
Cypress.PageBankQuestion.changeView = (_bool) => {
    if (_bool) {
        cy.get(bankClass.markerView).click().wait(1500)
    }
    else {
        cy.get(bankClass.candidateView).click().wait(1500)
    }
};

Cypress.PageBankQuestion.dragOptiontoOrder = (_options, _OrderIndex) => {
    for (let i = 0; i < _options.length; i++) {
        cy.get(bankClass.optionsOrderColumn)
            .find(bankClass.orderOptionContent).eq(_OrderIndex[i]).then($el => {
                cy.get(bankClass.optionsOptionColumn)
                    .find(bankClass.orderOptionsContent).contains(_options[i])
                    .parent().parent().parent().parent().parent()
                    .drag($el).wait(1000)
            })
    }
};
Cypress.PageBankQuestion.filterValue = (_filterIndex, _filterValue, _wait) => {
    cy.get(bankClass.filterHeader).find(bankClass.filterCombobox)
        .eq(_filterIndex).click().wait(500)
    cy.get(bankClass.auiOptionlist)
        .find(bankClass.auiOptionlistSearchbox + '' + 'input')
        .clear()
        .type(_filterValue, { delay: 20 }).wait(300)
    cy.get(bankClass.auiOptionlistCheckboxInput).eq(0).click().wait(300)
    cy.get(bankClass.auiComboboxshellBtnContainer)
        .find(bankClass.filterOKbtn)
        .click()
    cy.waitLoading(_wait)
};
Cypress.PageBankQuestion.clickSettingsSaveBtn = (_filterIndex, _filterValue, _wait) => {
    cy.get(bankClass.settingPanelSave + ":visible").click().wait(200)
};
Cypress.PageBankQuestion.verifyToast = (_content) => {
    cy.waitUntil(() => cy.get(auiCommonClass.auiToastInfo, { timeout: 60000 }))
    return cy.get(auiCommonClass.auiToastInfo)
        .should('contain', _content, { timeout: 60000 })
}
Cypress.PageBankQuestion.verifyRandomiseChoiceSettinginQuestion = (_content) => {
    cy.get(bankClass.labelRandomOptionFilter).should('contain', _content)
}


