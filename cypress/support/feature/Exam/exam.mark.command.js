/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiPopup, auiTableClass, auiFilterCommon, auiOptionList, auiComboboxClass, auiShadowTag } from '../../AUI/aui.common.constants'
import { sampleExamClass, examClass, markExamClass, examGradeClass } from '../../AUI/exam.constants'
import { adminMarkingSettingsClass, adminCourseClass, adminAccountClass } from '../../AUI/admin.constants'

Cypress.PageExamMark = Cypress.PageExamMark || {};

Cypress.PageExamMark.searchExam = (_value, _index) => {
    cy.waitLoading()
    cy.get("#exam-homepage").find('.aui-searchbox')
        .eq(0).find("input")
        .as('searchBox')
    cy.get('@searchBox')
        .clear().wait(300)
        .type(_value, { delay: 20 }).wait(300)
        .type('{enter}', { force: true })
    cy.waitLoading()
    cy.wait(5000)
    if (_index) {
        cy.get(examClass.examCard)
            .eq(_index).as('card')
    } else {
        cy.get(examClass.examCard)
            .eq(0).as('card')
    }
    cy.get('@card')
        .find(examClass.examCardTitle)
        .should('contain', _value)
};

Cypress.PageExamMark.searchExam1 = (_value, _index) => {
    cy.waitLoading()
    cy.get(':nth-child(2) > .aui-widget-wcr > .aui-searchbox > .input')
        .eq(0)
        .as('searchBox')
    cy.get('@searchBox')
        .clear().wait(300)
        .type(_value, { delay: 20 }).wait(300)
        .type('{enter}', { force: true })
    cy.waitLoading()
    cy.wait(5000)
    if (_index) {
        cy.get(examClass.examCard)
            .eq(_index).as('card')
    } else {
        cy.get(examClass.examCard)
            .eq(0).as('card')
    }
    cy.get('@card')
        .find(examClass.examCardTitle)
        .should('contain', _value)
};

Cypress.PageExamMark.enterMarkingProgress = (_index) => {
    cy.get(examClass.examCard)
        .eq(_index)
        .find(markExamClass.markProgressBtn)
        .wait(1000)
        .click({ force: true })
        .wait(5000)
    cy.waitLoading()
    Cypress.auiCommon.verifyUrl('include', '/exam/marking/markquestion?')
}
// Cypress.PageExamMark.clickMarkScore = (_index) => {
//     cy.get(auiTableClass.auiTbody)
//         .find(markExamClass.markScoreBtn)
//         .eq(_index)
//         .click({ force: true })
//         .wait(500)
//     cy.waitLoading()
// }

// Cypress.PageExamMark.clickMarkScore = (_index) => {
//     cy.get(auiTableClass.auiTbody)
//         .find(markExamClass.markScoreBtn)
//         .eq(_index)
//         .click({ force: true })
//         .wait(500)
//     cy.waitLoading()
// }
Cypress.PageExamMark.clickMarkScore = (_index) => {
    cy.get(auiTableClass.auiTbody)
        .find('.button')
        .eq(_index)
        .click({ force: true })
        .wait(500)
    cy.waitLoading()
}

Cypress.PageExamMark.clickSwitchMarkingProgressSettingBtn = (_num) => {
    cy.get(markExamClass.switchingProcess)
        .find('.flex-row')
        .find('.button')
        .click({ force: true })
        .wait(500)
    cy.get(markExamClass.markingTypeBtn)
        .eq(_num)
        .click()
    Cypress.auiCommon.clickFooterBtnInDialog(1)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
}

Cypress.PageExamMark.verifyMarkScoreStatus = (_index, _bool) => {
    cy.get(auiTableClass.auiTbody)
        .find(markExamClass.markScoreBtn)
        .eq(_index).then(($ele) => {
            if (_bool) {
                cy.get($ele).should('not.have.class', 'disabled')
            }
            else {
                cy.get($ele).should('be.disabled')
            }
        });
}
Cypress.PageExamMark.closeMarkProgress = (_num) => {
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get('#marking_score_close ')
        .eq(num)
        .find('.button > .button-text-part')
        .click({ force: true }).wait(2000)
}
Cypress.PageExamMark.clickStu = (_index) => {
    cy.get(markExamClass.markQuestionRightPanel)
        .find(markExamClass.markStuProfile)
        .eq(_index)
        .click({ force: true }).wait(500)
    cy.waitLoading()
}
Cypress.PageExamMark.selectStuByScore = (_score) => {
    cy.get(markExamClass.markQuestionRightPanel)
        .find(markExamClass.markStuProfile)
        .find(markExamClass.markStuProfileScore)
        .then(($score) => {
            for (let s = 0; s < $score.length; s++) {
                cy.log($score.eq(s).text())
                if ($score.eq(s).text() == _score) {
                    cy.log(`click ${$score.eq(s)}`)
                    cy.get($score.eq(s))
                        .parent()
                        .click({ force: true })
                    cy.wait(1500)
                }
            }
        })
}
Cypress.PageExamMark.selectStuByResp = (_value) => {
    var index = 0
    Cypress.PageExamMark.clickStu(index)
    Cypress.PageExamMark.ClickSubQuestion(index);
    cy.wait(5000)
    cy.get(markExamClass.markResponseAnswer)
        .find(markExamClass.documentarea)
        .then(($resp) => {
            cy.log(`expect ${$resp.text()} == ${_value}`)
            if ($resp.text() != _value) {
                index = index + 1
                Cypress.PageExamMark.clickStu(index)
                Cypress.PageExamMark.ClickSubQuestion(1)
            }
        })
}
Cypress.PageExamMark.switchQuestion = (_index) => {

}
Cypress.PageExamMark.inputScore = (_value) => {
    cy.get(markExamClass.markScoreInput)
        .find("input")
        .click({ force: true })
        .wait(2000)
        .clear({ force: true })
        .wait(500)
        .type(_value, { force: true })
        .wait(500)
        .blur()
        .wait(200)
}

// 
// Verification Command 
Cypress.PageExamMark.verifyScore = (_isAuto, _score) => {
    cy.get('.aui-input-target')
        .as('score')
        .invoke('attr', 'tabindex', 0)
        .focus()
        .wait(500)
    if (_isAuto) {
        cy.get('@score').should('be.disabled')
        cy.get('@score').then(($score) => {
            let sc = $score.attr('value')
            cy.log(` >>> expect value: ${sc} eq ${_score}`)
            cy.expect(parseInt(sc)).eq(_score)
        })
    }
    // else {
    //     cy.get('@score').then(($score) => {
    //         let sc = $score.attr('value')
    //         if(!isNaN($score)){
    //         cy.log(` >>> expect value: ${sc} eq ${_score}`)
    //         cy.expect(parseInt(sc)).eq(_score)
    //         }else{
    //         cy.expect(isNaN(parseInt(sc))).eq(true)
    //         }

    //     })
    // }
    // cy.wait(1000)
}
Cypress.PageExamMark.verifyStuRespContent = (_response) => {
    cy.log(`verifying ${_response.type} ...`)
    if (_response.type === 'Choice') {
        cy.get(markExamClass.markSingleChoiceInput).then(($ans) => {
            for (let a = 0; a < $ans.length; a++) {
                cy.log($ans.eq(a).text())
                if ($ans.eq(a).text() === _response.answer) {
                    cy.get($ans.eq(a)).parent()
                        .invoke('attr', 'tabindex', a)
                        .focus()
                        .wait(500)
                        .as('op')
                        .find('[type="radio"]')
                        .should('be.checked')
                    cy.get('@op')
                        .find(markExamClass.autoMarkIcon)
                        .as('sta')
                    if (_response.sta === 'pass') {
                        cy.get('@sta')
                            .should('have.class', markExamClass.passIcon)
                    } else {
                        cy.get('@sta')
                            .should('have.class', markExamClass.failIcon)
                    }
                }
            }
        })
    }

    if (_response.type === 'Muti-ch') {
        //verify my response
        for (let c = 0; c < _response.answer.length; c++) {
            let index = _response.answer[c] - 1
            cy.get(markExamClass.markSingleChoiceInput)
                .eq(index)
                .parent()
                .invoke('attr', 'tabindex', c)
                .focus()
                .wait(300)
                .find('[type="checkbox"]')
                .should('be.checked')

        }
    }
    if (_response.type === 'FIB' || _response.type === 'FIB-Case') {
        cy.get(markExamClass.markfibBlankInput)
            .then(($fib) => {
                for (let i = 0; i < $fib.length; i++) {
                    let expect = _response.correct[i]
                    let pageValue = $fib.eq(i).val()
                    if (_response.type === 'FIB') {
                        expect = expect.toLowerCase()
                        pageValue = pageValue.toLowerCase()
                    }
                    cy.log(`expect ${pageValue} eq ${expect}`)
                    if (pageValue != expect) {
                        cy.log(`expect 小红叉`)
                        cy.get($fib.eq(i))
                            .parent()
                            .invoke('attr', 'tabindex', i)
                            .prev().wait(300)
                            // .should('have.class',markExamClass.autoMarkIcon)
                            .should('have.class', markExamClass.failIcon)
                    }
                    else {
                        cy.get($fib.eq(i))
                            .parent()
                            .invoke('attr', 'tabindex', i)
                            .prev().wait(300)
                            // .should('have.class',markExamClass.autoMarkIcon)
                            .should('have.class', markExamClass.passIcon)
                    }
                }
            })
    }
    if (_response.type === 'T/F') {
        if (_response.answer[0] == "True") {
            cy.get(markExamClass.marktruefalseCheck)
                .find(markExamClass.marktruefalseInput).eq(0)
                .should('be.checked')
        } else (
            cy.get(markExamClass.marktruefalseCheck)
                .find(markExamClass.marktruefalseInput).eq(1)
                .should('be.checked')
        )
    }
    if (_response.type === 'Match') {
        cy.get(markExamClass.previewMatchTable)
            .find(markExamClass.matchSquare).find(markExamClass.matchChevronLeft).then(res => {
                cy.get(markExamClass.previewMatchTable)
                    .find(markExamClass.matchSquare).find(markExamClass.matchChevronRight).then(res1 => {
                        cy.expect(res.length).eq(res1.length)
                        cy.expect(res.length).eq(_response.answer.length)
                    })
            })
        for (let i = 0; i < _response.answer.length; i++) {
            if (_response.squareSta[i] == "pass") {
                cy.get(markExamClass.matchContentLeft)
                    .contains(_response.answer[i][0])
                    .parent().parent()
                    .wait(300)
                    .find(markExamClass.matchSquare)
                    .should("have.css", 'background-color', 'rgb(40, 204, 116)') //Green
                cy.get(markExamClass.matchContentRight)
                    .contains(_response.answer[i][1])
                    .parent().parent()
                    .wait(300)
                    .find(markExamClass.matchSquare)
                    .should("have.css", 'background-color', 'rgb(40, 204, 116)')
                    .wait(300)
                    .parent()
                    .find(markExamClass.martchCricle)
                    .find(markExamClass.matchCheckCircleSolid).then($ele => {
                        const win = $ele[0].ownerDocument.defaultView;
                        const before = win.getComputedStyle($ele[0], 'before');
                        const contentValue = before.getPropertyValue('color')
                        cy.expect(contentValue).to.eq("rgb(40, 204, 116)")
                    })
            }
            if (_response.squareSta[i] == "fail") {
                cy.get(markExamClass.matchContentLeft)
                    .contains(_response.answer[i][0])
                    .parent().parent()
                    .wait(300)
                    .find(markExamClass.matchSquare)
                    .should("have.css", 'background-color', 'rgb(201, 29, 29)') //Red
                cy.get(markExamClass.matchContentRight)
                    .contains(_response.answer[i][1])
                    .parent().parent()
                    .wait(300)
                    .find(markExamClass.matchSquare)
                    .should("have.css", 'background-color', 'rgb(201, 29, 29)')
                    .parent()
                    .find(markExamClass.martchCricle)
                    .wait(300)
                    .find(markExamClass.matchCloseCircleSolid).then($ele => {
                        const win = $ele[0].ownerDocument.defaultView;
                        const before = win.getComputedStyle($ele[0], 'before');
                        const contentValue = before.getPropertyValue('color')
                        cy.expect(contentValue).to.eq("rgb(201, 29, 29)")
                    })
            }
        }
    }
    if (_response.type === 'Hotspot') {
        cy.get(markExamClass.hotspotShapeContainer)
            .then(($item) => {
                cy.get($item).find(markExamClass.ellipse)
                    .should('have.length', _response.correct.circle.length / 2);
                cy.get($item).find(markExamClass.rect)
                    .should('have.length', _response.correct.square.length / 2);
                cy.get($item).find(markExamClass.polyline)
                    .should('have.length', _response.correct.drawing.length);
            })
        cy.get(markExamClass.redCircle)
            .should('have.length', _response.squareSta.fail);
        cy.get(markExamClass.greenCircle)
            .should('have.length', _response.squareSta.pass);

    }
}
Cypress.PageExamMark.verifyNarkScoreTable = (_info) => {
    cy.get(auiTableClass.auiTable + ':visible').as('table')
    Cypress.auiCommon.verifyTable(_info, '@table')
}
Cypress.PageExamMark.monitorClickEditScore = () => {
    cy.wait(1000)
    cy.get("#marking-markbyquestion").find("#markScoreContainer").find(".button").eq(0).click().wait(500)
}
Cypress.PageExamMark.clickEditScore = () => {
    cy.wait(1000)
    cy.get(markExamClass.markEditScorebtn, { timeout: 5000 }).click().wait(500)
}
Cypress.PageExamMark.inputScoreComment = (_num, _comment) => {
    cy.get('[type="textarea"]')
        .eq(_num)
        .click({ force: true })
        .wait(300)
        .clear({ force: true })
        .type(_comment)
        .wait(500)
    cy.get(markExamClass.commentAddBtn)
        .click()
        .wait(500)
}
Cypress.PageExamMark.switchUserComment = (_num) => {
    cy.get(markExamClass.commentUser)
        .click()
    cy.get(auiCommonClass.auiOptionItem)
        .eq(_num)
        .click()
}
Cypress.PageExamMark.ClickSubQuestion = (_index) => {
    cy.wait(2000)
    cy.get(markExamClass.markSubQuestionIndx)
        .find(markExamClass.questionIndex)
        .eq(_index)
        .click()
        .wait(500)
}
Cypress.PageExamMark.ClickCandidateView = (_index) => {
    // cy.get(markExamClass.candidateViewSwitch).click()
    cy.get(':nth-child(1) > .inline-block').click()
    // cy.waitLoading(1500)
    cy.wait(3000)
}
Cypress.PageExamMark.ClickQuestionView = (_index) => {
    cy.get(':nth-child(2) > .inline-block').click()
    // cy.get(markExamClass.questionViewSwitch).click()
    // .wait(1500)
    // cy.waitLoading(1500)
    cy.wait(3000)
}
Cypress.PageExamMark.verifyCanditeViewTable = (_info) => {
    cy.get(auiTableClass.auiTable).as('table')
    Cypress.auiCommon.verifyTable(_info, '@table')
}
Cypress.PageExamMark.clickMarkScoreforCandidate = (_stuNames, _StuNo) => {
    var index = 0
    var stus = []
    cy.get(markExamClass.CandidateViewNameCol).then(($stulist) => {
        for (let i = 0; i < $stulist.length; i++) {
            stus = stus.concat($stulist.eq(i).text())
            cy.log(stus)
            cy.log(`===expect ${stus[i]} ==${_stuNames[_StuNo]}`)
            if (stus[i] == _stuNames[_StuNo]) {
                index = i
                break;
            }
        }
        Cypress.PageExamMark.clickMarkScore(index)
    })
}
Cypress.PageExamMark.selectQuestion = (_index) => {
    cy.get(markExamClass.markQuestionRightPanel)
        .find(markExamClass.questionIndex)
        .eq(_index)
        .click({ force: true })
    cy.waitLoading()
}
Cypress.PageExamMark.GetCheckedStuName = (_filename) => {
    let stuName = {}
    cy.get(markExamClass.markCheckedStu).then(($res) => {
        cy.log(`------${$res.text()}`)
        // _stuNames = $res.text()
        stuName.CandidateName = $res.text()
        cy.writeFile('cypress/fixtures/' + _filename + '.json', stuName)
    })
}
Cypress.PageExamMark.Gettablevalue = (_rowindex, _colindxex) => {
    return cy.get('[data-row="' + _rowindex + '"] > [data-col="' + _colindxex + '"] > .aui-table-cell-content')
}
Cypress.PageExamMark.clickAssignMarker = () => {
    cy.get(markExamClass.assignMarkerBtn).click({ force: true }).wait(300)
    cy.waitLoading()
}
Cypress.PageExamMark.clickAssignMarkertoSelectStudents = () => {
    cy.get(markExamClass.assignMarkingStaffBtn).find("button")
        .click({ force: true })
        .wait(500)
    cy.get(markExamClass.assignRoleBtn).find("button")
        .click({ force: true })
        .waitLoading()
}
Cypress.PageExamMark.clickAssignMarkertoAll = () => {
    cy.get(markExamClass.assignMarkingStaffBtn).find("button").click({ force: true })
    cy.wait(500)
    cy.get((markExamClass.assignRoleAllBtn)).find("button").click({ force: true })
    cy.waitLoading()
    cy.get(markExamClass.assignRolePanel).find("#markerData").find(".aui-richcombobox-selected-area").find("input")
}

Cypress.PageExamMark.clickAssignMarkertoGroups = () => {
    cy.get(markExamClass.assignMarkerGroupBtn).click({ force: true }).wait(300)
    cy.waitLoading()
}
Cypress.PageExamMark.clickChangeMarker = () => {
    cy.get(markExamClass.assignGroupChangeMarker).click({ force: true }).wait(300)
    cy.waitLoading()
}
Cypress.PageExamMark.checkGroupCheckBox = (_index) => {
    cy.get(markExamClass.assignGroupPanel)
        .find(markExamClass.tableBody)
        .find(markExamClass.tabCheckBox).eq(_index).click({ force: true }).wait(300)
};
Cypress.PageExamMark.searchMarker = (_userName) => {
    cy.get(markExamClass.assignRolePanel).find("#markerData").find(".aui-richcombobox-selected-area").find("input")
        .click({ force: true })
        .wait(300)
        .clear()
        .type(_userName)
        .wait(2500)
        .type("{enter}")
        .click({ force: true })
    cy.wait(2000)
};
Cypress.PageExamMark.searchMonitor = (_userName) => {
    cy.get(markExamClass.assignRolePanel).find("#monitorData").find(".aui-richcombobox-selected-area").find("input")
        .click({ force: true })
        .wait(300)
        .clear()
        .type(_userName)
        .wait(2500)
        .type("{enter}")
        .click({ force: true })
    cy.wait(2000)
};
Cypress.PageExamMark.searchChecker = (_userName) => {
    cy.get(markExamClass.assignRolePanel).find("#checkerData").find(".aui-richcombobox-selected-area").find("input")
        .click({ force: true })
        .wait(300)
        .clear()
        .type(_userName)
        .wait(2500)
        .type("{enter}")
        .click({ force: true })
    cy.wait(2000)
};

Cypress.PageExamMark.confirmSave = (_action) => {
    if (_action === 'Save') {
        // cy.get(markExamClass.assignMarkerPanel).find(markExamClass.assignSaveBtn)
        cy.get(markExamClass.assignRolePanel)
            .find("[name=Save]")
            .find("button")
            .click({ force: true })
    }
    if (_action === 'Cancel') {
        // cy.get(markExamClass.assignMarkerPanel).find(markExamClass.assignCancelBtn)
        cy.get(markExamClass.assignRolePane)
            .find(".aui-panel-footer")
            .find("[text=Save]")
            .click({ force: true })
    }
    cy.waitLoading()
}
Cypress.PageExamMark.confirmConfict = (_action) => {
    if (_action === 'Continue') {
        cy.get(markExamClass.assignConfictContinue, { timeout: 5000 })
            .click({ force: true })
    }
    if (_action === 'Cancel') {
        cy.get(markExamClass.assignConfictCancel)
            .click({ force: true })
    }
    cy.waitLoading()
}
Cypress.PageExamMark.gotoPage = (_number) => {
    cy.get(markExamClass.pageGoto).find(markExamClass.pageInput)
        .click({ force: true }).clear().type(_number).wait(300)
    cy.get(markExamClass.pageGoto).find(markExamClass.pageGoBtn)
        .click({ force: true }).wait(2000)
}

Cypress.PageExamMark.verifyTableLength = (_length) => {
    cy.get(auiTableClass.auiTbody).find(auiTableClass.auiTRow)
        .should("have.length", _length)
}
Cypress.PageExamMark.clickViewMarkingHistory = () => {
    cy.get(markExamClass.viewMarkingHistory).find("span").eq(1)
        .click().wait(500)
}
Cypress.PageExamMark.closeViewMarkingHistory = () => {
    cy.get(markExamClass.viewMarkingHistoryPanel)
        .find(markExamClass.closeViewMarkingHistoryBtn)
        .click()
}
Cypress.PageExamMark.verifyViewMarkingHistory = (_num, _user, _action, _content, _contentNum) => {
    cy.get(markExamClass.viewHistoryFitst + '[slot="0"] ')
        .eq(_num)
        .should('contain', _user)
    cy.get(markExamClass.viewHistoryFitst + '[slot="1"] ')
        .eq(_num)
        .should('contain', _action)
    if (_content) {
        cy.get('[slot="1"] ')
            .eq(_contentNum)
            .should('contain', _content)
    }
}
Cypress.PageExamMark.clickExportResponse = () => {
    cy.get('#aui_buttonfitbox_more_333 > .button > .button-icon-part')
        .click({ force: true }).wait(1000)
        .find('#export-to-all-btn')
        .Click({ force: true }).wait(2000)

}

Cypress.PageExamMark.confirmScore = () => {
    cy.get('#marking-button-search').find("#confirm-btn").find("button")
        .click({ force: true }).wait(1000)
    cy.get('#send-email-dialog')
        .find('.aui-dialog-footer')
        .find('[name="Confirm"]')
        .find('.button-text-part')
        .click({ force: true }).wait(2000)

}
Cypress.PageExamMark.pushScore = () => {
    cy.get('#marking-button-search').find("#push-btn").find("button")
        .click({ force: true }).wait(1000)
    cy.get('#send-email-dialog')
        .find('.aui-dialog-footer')
        .find('[name="Push"]')
        .find('.button-text-part')
        .click({ force: true }).wait(2000)

}

Cypress.PageExamMark.submitScore = () => {
    cy.get('#marking-button-search').find("#confirm-btn").find("button")
        .click({ force: true }).wait(1000)
    cy.get('#send-email-dialog')
        .find('.aui-dialog-footer')
        .find('[name="Submit"]')
        .find('.button-text-part')
        .click({ force: true }).wait(2000)

}
// Cypress.PageExamMark.clickExportResponse = () => {
//     cy.get(markExamClass.fiaFileImport).next()
//         .click({force:true}).wait(1000)
// }
Cypress.PageExamMark.uploadFile = (fileName) => {
    cy.get(markExamClass.fiaFileImport).parent().click().wait(5000)
    cy.fixture(fileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get(markExamClass.fiaFileImport).parent()
                .attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'application/json',
                    encoding: 'utf8'
                })
        })
    // cy.waitLoading()
    cy.wait(8000)
};
Cypress.PageExamMark.addHighlight = (_content, _index) => {
    var highlightvalue = _content.split(" ")
    cy.get(markExamClass.markResponseAnswer)
        .find(markExamClass.documentarea)
        .find('.aui-htmlpurify')
        .contains(highlightvalue[_index])
        .type('{ctrl}A').wait(5000)
};
Cypress.PageExamMark.addAnnotation = (_Annotation, _highlightindex) => {
    cy.get(markExamClass.highlighted).eq(_highlightindex).click().wait(500)
    cy.get(markExamClass.addAnnotation).click()
    cy.get(markExamClass.annotationContent).find(markExamClass.textarea).clear().type(_Annotation, { delay: 25 })
    cy.wait(500)
    cy.get(markExamClass.annotationContent).find(markExamClass.saveBtn).click()
    cy.wait(1000)
};
Cypress.PageExamMark.leftNavigationTo = (_index) => {
    cy.waitLoading()
    const examWizard = [
        {
            index: 0,
            name: 'Set up basic information',
        },
        {
            index: 1,
            name: 'Enrol candidates',
        },
        {
            index: 2,
            name: 'Assign invigilators',
        },
        {
            index: 3,
            name: 'Generate paper',
        },
        {
            index: 4,
            name: 'Attendance',
        },
        {
            index: 5,
            name: 'Marking progress',
        },
        {
            index: 6,
            name: 'Grading progress',
        }
    ]
    let step = examWizard[_index]
    cy.get('.aui-navpanel-box .aui-navpanel-item-content:visible')
        .eq(step.index)
        .click({ force: true })
        .wait(6000)
};
Cypress.PageExamMark.enterExamInMarkingProgress = (_num) => {
    cy.get(markExamClass.enterExamBtn).eq(_num).click({ force: true }).waitLoading().wait(2000)
};
Cypress.PageExamMark.startSession = () => {
    cy.get(markExamClass.startSessionBtn).click({ force: true }).waitLoading().wait(3000)
};
Cypress.PageExamMark.endSession = () => {
    Cypress.PageExamMark.closeMarkProgress(0)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
};
Cypress.PageExamMark.Filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'Team name':
                    fil_index = 0
                    popup_index = 3
                    break;
                case 'Status':
                    fil_index = 1
                    popup_index = 0
                    break;
                case 'Class name':
                    fil_index = 2
                    popup_index = 4
                    break;
                case 'Property':
                    fil_index = 3
                    popup_index = 1
                    break;
                case 'Oral exam progress':
                    fil_index = 4
                    popup_index = 2
                    break;
                case 'Marker status':
                    fil_index = 6
                    popup_index = 6
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click({ force: true }).wait(1500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(popup_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(popup_index)
                .click({ force: true })
            // .waitElement('[placeholder="Search by exam name"]')
            cy.wait(2000)
        })
};
Cypress.PageExamMark.verifyTotalCandidateTips = (_num) => {
    cy.get(markExamClass.markingProgressSticky)
        .should('contain', `Total ${_num} candidate`)
};
Cypress.PageExamMark.clickSwitchCandidateBtn = () => {
    cy.get(markExamClass.switchCandidateBtn)
        .click()
        .waitLoading()
        .wait(1000)
};
Cypress.PageExamMark.switchCandidateListFilter_InRegularMark = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            let popup_index = ''
            switch (_name) {
                case 'Marker':
                    fil_index = 0
                    popup_index = 1
                    break;
                default:
                    cy.log(`${_name} not defined`);
            }
            cy.get($boxs.eq(fil_index))
                .find(auiFilterCommon.auiFilterContent)
                .click().wait(5500)
            cy.get(auiCommonClass.auiOptionAll)
                .eq(popup_index)
                .find(auiCommonClass.auiOptionCheckBox)
                .click()
                .wait(5000)
            cy.log(_options)
            cy.get(auiCommonClass.auiOptionItem)
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click()
                .wait(5000)
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(popup_index)
                .click()
                .wait(5000)
            cy.wait(2000)
        })
};
Cypress.PageExamMark.switchCandidateListFilter_InDoubleBlindMark = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Marker 1':
                    fil_index = 0
                    break;
                case 'Marker 2':
                    fil_index = 1
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
                .contains(_options).as('op')
            cy.get('@op').find(auiCommonClass.auiOptionCheckBox)
                .click({ force: true })
            cy.get(auiCommonClass.auiPopupBody)
                .find(auiCommonClass.auiOptionOKBtn)
                .eq(fil_index)
                .click({ force: true })
            cy.wait(2000)
        })
};
Cypress.PageExamMark.verifyRubricTitleAndContent = (_info) => {
    cy.get(markExamClass.rubricTitle)
        .eq(0)
        .should('contain', _info.title)
    cy.get(markExamClass.rubricTitle + '[slot="0"]')
        .should('contain', _info.totalMark)
    for (let index = 0; index < _info.detail.length; index++) {
        cy.get(markExamClass.rangeScoreDetailHeader)
            .eq(index)
            .should('contain', _info.detail[index].header)
        cy.get(markExamClass.rangeScoreDetailDesc)
            .eq(index)
            .should('contain', _info.detail[index].des)
        cy.get(markExamClass.rubricScoreDetail)
            .eq(index * 2)
            .should('contain', _info.detail[index].score)
    }
};
Cypress.PageExamMark.clickMarkInRubricMatrixBtn = () => {
    cy.get(markExamClass.markScoreContainerBtn)
        .eq(0)
        .click({ force: true })
        .waitLoading()
        .wait(500)
};
Cypress.PageExamMark.verifyMarkInRubricMatrix = (_info) => {
    cy.get(markExamClass.rubricTableCell)
        .eq(0)
        .should('contain', 'Criteria')
    cy.get(markExamClass.rubricHeaderCell)
        .eq(0)
        .should('contain', 'Competent')
    cy.get(markExamClass.rubricHeaderCell)
        .eq(1)
        .should('contain', 'Proficient')
    // Verify Criteria
    cy.get(markExamClass.rubricCriterionName)
        .eq(0)
        .should('contain', _info.criteria)
    cy.get(markExamClass.rubricCriterionMark)
        .should('have.attr', 'value', _info.mark)
    cy.get(markExamClass.rubricCriterionTotalMarks)
        .should('contain', _info.totalMark)
    // Verify Competent
    cy.get(markExamClass.rubricCriterionRangeMark)
        .eq(0)
        .should('contain', _info.compententMarkRange)
    cy.get(markExamClass.rubricCriterionDescription)
        .should('contain', _info.compententDes)
    // Verify Proficient
    cy.get(markExamClass.rubricCriterionRangeMark)
        .eq(1)
        .should('contain', _info.proficientMarkRange)
    cy.get(markExamClass.rubricCriterionDescription)
        .should('contain', _info.proficientDes)
};
Cypress.PageExamMark.inputRubricScore = (_num, _value) => {
    cy.get(adminMarkingSettingsClass.questionMarksLabel)
        .eq(_num)
        .clear()
        .type(_value, { force: true })
        .wait(500)
        .type('{enter}', { force: true })
        .wait(3000)
};
Cypress.PageExamMark.verifyRubricTableHightlight = (_num, _value) => {
    if (_value) {
        cy.get(`tbody ${adminMarkingSettingsClass.rubricContentCell}`)
            .eq(_num)
            .should('have.attr', 'style', 'background-color: rgb(218, 242, 238);')
    } else {
        cy.get(`tbody ${adminMarkingSettingsClass.rubricContentCell}`)
            .eq(_num)
            .should('not.have.attr', 'style', 'background-color: rgb(218, 242, 238);')
    }
};
Cypress.PageExamMark.clickAIMarkingBtn = () => {
    cy.get(markExamClass.aiMarkingBtn)
        .click({ force: true })
};
Cypress.PageExamMark.verifyAIMarkingTipsContent = () => {
    cy.get(markExamClass.aiMarkingTipsContent)
        .should('contain', 'To unleash the power of AI for marking suggestions, simply choose your desired language and click Generate.')
};
Cypress.PageExamMark.verifyAIMarkingDefaultLanguage = (_value) => {
    cy.get(markExamClass.aiMarkingLanguageBtn + adminCourseClass.addFromAddressBookBtn)
        .should('contain', _value)
};
Cypress.PageExamMark.clickLanguageBtn = () => {
    cy.get(markExamClass.aiMarkingLanguageBtn + 'button')
        .click({ force: true })
};
Cypress.PageExamMark.expandLanguage = () => {
    cy.get(adminMarkingSettingsClass.showRowsBtn)
        .click({ force: true })
};
Cypress.PageExamMark.verifyFiveLanguage = () => {
    let language = ['Chinese', 'English', 'German', 'Dutch', 'Japanese']
    for (let index = 0; index < language.length; index++) {
        cy.get(auiOptionList.auiOptionListText)
            .should('contain', language[index])
    }
};
Cypress.PageExamMark.verifyAIMarkingTitleAndScore = (_title, _score, _comment) => {
    cy.get('.aimarking-content-rubricscore .font-bold')
        .should('contain', _title)
        .and('contain', _score)
    cy.get('.aimarking-content-rubricscore span')
        .should('contain', _comment)
};
Cypress.PageExamMark.clickGoBackBtn = () => {
    cy.get(markExamClass.goBackLabel)
        .click()
};
Cypress.PageExamMark.clickGenerateBtn = () => {
    cy.get(markExamClass.generateBtn)
        .click()
        .waitLoading()
};
Cypress.PageExamMark.clickReGenerateBtn = () => {
    cy.get(markExamClass.regenerateBtn)
        .click()
        .waitLoading()
};
Cypress.PageExamMark.clickApplyBtn = () => {
    cy.get(markExamClass.applyBtn)
        .click()
        .wait(2000)
};
Cypress.PageExamMark.verifyMarkingComment = (_content) => {
    cy.get(markExamClass.markingCommentContent)
        .should('contain', _content)
};
Cypress.PageExamMark.verifyStudentResponse = (_content) => {
    cy.get(auiComboboxClass.auiComboShellCenter)
        .should('contain', _content)
};
Cypress.PageExamMark.verifyStudentResponseTitle = (_num, _content) => {
    cy.get(markExamClass.markResponseAnswer + auiCommonClass.auiRichPurHtml)
        .eq(_num)
        .should('contain', _content)
};
Cypress.PageExamMark.verifyCorrectAnswer = (_content) => {
    cy.contains('Correct answer')
        .next()
        .should('contain', _content)
};
Cypress.PageExamMark.clickManageViewsBtn = () => {
    cy.get(markExamClass.manageViewsBtn)
        .click()
    cy.get(auiPopup.auiPopupVisible)
        .contains('Manage views')
        .parent()
        .click()
        .waitLoading()
        .wait(1000)
};
Cypress.PageExamMark.verifyHightLight_InManageViews = (_num, _value, _default) => {
    cy.get(auiCommonClass.auiTabsBar + auiCommonClass.roleTab)
        .eq(_num)
        .should('have.attr', 'aria-selected', _value)
    if (_default) {
        cy.get(auiCommonClass.auiTabsBar + markExamClass.defaultTab)
            .should('contain', '(Default)')
    }
};
Cypress.PageExamMark.verifyDefaultValue = (_value) => {
    cy.get(markExamClass.manageViewPanel + examClass.basicInfoValue)
        .should('contain', _value)
};
Cypress.PageExamMark.verifyAllColumnsSelected = () => {
    cy.get(markExamClass.manageViewTable + sampleExamClass.selectAll)
        .should('have.attr', 'aria-checked', 'true')
};
Cypress.PageExamMark.clickEditViewBtn = () => {
    cy.get(adminAccountClass.show + markExamClass.editViewBtn)
        .click()
};
Cypress.PageExamMark.verifyEditViewNameDisabled = () => {
    cy.get(markExamClass.editViewName)
        .should('have.attr', 'disabled')
};
Cypress.PageExamMark.inputViewName = (_value) => {
    cy.get(markExamClass.editViewName)
        .clear()
        .type(_value)
};
Cypress.PageExamMark.verifyEchoInputViewName = (_value) => {
    cy.get(markExamClass.editViewName)
        .should('have.attr', 'value', _value)
};
Cypress.PageExamMark.clickCreateViewBtn = () => {
    cy.get(markExamClass.createViewBtn)
        .click()
};
Cypress.PageExamMark.checkDefaultView = () => {
    cy.get(markExamClass.defaultViewInput)
        .click()
};
Cypress.PageExamMark.verifyViewDefaultCheck = (_value) => {
    for (let index = 0; index < _value.length; index++) {
        cy.get(auiCommonClass.auiTabsContent + adminAccountClass.show)
            .find(`input[aria-label="${_value[index]}"]`)
            .should('have.attr', 'aria-checked', 'true')
            .and('have.attr', 'disabled')
    }
};
Cypress.PageExamMark.checkViewColumn = (_num) => {
    cy.get(auiCommonClass.auiTabsContent + adminAccountClass.show + markExamClass.inputViewCheckbox)
        .eq(_num)
        .click()
};
Cypress.PageExamMark.moveUpViewColumn = (_num) => {
    cy.get(adminAccountClass.show + markExamClass.moveUpBtn)
        .eq(_num)
        .click()
};
Cypress.PageExamMark.verifyMoveUpViewBtnDisabled = (_num) => {
    cy.get(adminAccountClass.show + markExamClass.moveUpBtn)
        .eq(_num)
        .should('have.attr', 'disabled')
};
Cypress.PageExamMark.moveDownViewColumn = (_num) => {
    cy.get(adminAccountClass.show + markExamClass.moveDownBtn)
        .eq(_num)
        .click()
};
Cypress.PageExamMark.manageColumnsDisplayText = (_value) => {
    cy.get(markExamClass.manageColumns + examGradeClass.buttonTextPart)
        .should('contain', _value)
};
Cypress.PageExamMark.clickTab_InManageViewsPanel = (_num) => {
    cy.get(markExamClass.tabName)
        .eq(_num)
        .click()
};
Cypress.PageExamMark.deleteTableView = () => {
    cy.get(adminAccountClass.show + markExamClass.deleteViewBtn)
        .click()
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
};
Cypress.PageExamMark.verifyViewColumnName = (_num, _value1, _value2) => {
    cy.get(auiPopup.auiPopupVisible + auiCommonClass.auiTabLoop)
        .find('button')
        .eq(_num)
        .as('view')
    cy.get('@view')
        .find(auiCommonClass.dataTooltipIfNeed)
        .should('contain', _value1)
    if (_value2) {
        cy.get('@view')
            .find('i')
            .should('contain', '(Default)')
    }
};