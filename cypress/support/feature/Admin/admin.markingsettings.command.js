/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
import { auiCommonClass, auiShadowTag, auiFilterCommon, auiComboboxClass, auiTableClass, auiButtonClass, auiPanelClass, auiDialogClass, CommonMsg } from '../../AUI/aui.common.constants';
import { adminMarkingSettingsClass } from '../../AUI/admin.constants'
import { sampleExamClass } from '../../AUI/exam.constants'

Cypress.PageAdminMarkingsettingsPage = Cypress.PageAdminMarkingsettingsPage || {};

const current = Cypress.env('current_Env');
const ct = Cypress.env('current_ten');
let env = Cypress.env(current);
const currentAPIurl = env[ct].Apiurl;
let user = env[ct].System

Cypress.PageAdminMarkingsettingsPage.clickTab = (_index) => {
    cy.get(adminMarkingSettingsClass.tabList).find(adminMarkingSettingsClass.tab)
        .eq(_index).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.checkBtnsExist = () => {
    let btns =
        [
            adminMarkingSettingsClass.createTemplateBtn,
            adminMarkingSettingsClass.editTepmlateBtn,
            adminMarkingSettingsClass.setDefaultBtn,
            adminMarkingSettingsClass.deleteTemplateBtn
        ]
    for (var i = 0; i < btns.length; i++) {
        cy.get(btns[i]).should("be.visible")
    }
};
Cypress.PageAdminMarkingsettingsPage.clickCreateTemplateBtn = () => {
    cy.get(adminMarkingSettingsClass.createTemplateBtn).click({ force: true })
    cy.wait(1500)
};
Cypress.PageAdminMarkingsettingsPage.inputMin = (_index, _value) => {
    cy.get(adminMarkingSettingsClass.minInput).eq(_index).click({ force: true }).clear()
        .type(_value, { delay: 1 }).blur()
    cy.wait(300)
};
Cypress.PageAdminMarkingsettingsPage.inputGrade = (_index, _value) => {
    cy.get(adminMarkingSettingsClass.gradeInput).eq(_index).click({ force: true }).clear()
        .type(_value, { delay: 1 }).blur()
    cy.wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickAddMappingBtn = () => {
    cy.get(adminMarkingSettingsClass.addMappingBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickDelMappingBtn = () => {
    cy.get(adminMarkingSettingsClass.deteletMappingBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickSaveTemplateBtn = () => {
    cy.get(adminMarkingSettingsClass.saveTempalteBtn).click({ force: true })
    cy.wait(3500)
};
Cypress.PageAdminMarkingsettingsPage.clickCancelTemplateBtn = () => {
    cy.get(adminMarkingSettingsClass.cancelTemplateBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickCloseTemplateBtn = () => {
    cy.get(adminMarkingSettingsClass.closePanelBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.confirmDeleteMapping = (_content) => {
    if (_content === 'Delete') {
        cy.get(adminMarkingSettingsClass.confirmDeleteMapping)
            .click({ force: true })
    }
    if (_content === 'Cancel') {
        cy.get(adminMarkingSettingsClass.confirmCancelMapping)
            .click({ force: true })
    }
    cy.wait(1500)
};
Cypress.PageAdminMarkingsettingsPage.confirmDeleteTemplate = (_content) => {
    if (_content === 'Delete') {
        cy.get(adminMarkingSettingsClass.confirmDeleteTemplate)
            .click({ force: true })
    }
    if (_content === 'Cancel') {
        cy.get(adminMarkingSettingsClass.cancelDeleteTemplate)
            .click({ force: true })
    }
    cy.wait(1500)
};
Cypress.PageAdminMarkingsettingsPage.searchMappingTemplate = (_content) => {
    cy.get(adminMarkingSettingsClass.searchInput).click({ force: true }).clear().type(_content, { delay: 1 })
    cy.get(adminMarkingSettingsClass.searchBtn).click({ force: true })
    cy.wait(4000)
};
Cypress.PageAdminMarkingsettingsPage.clearSearch = () => {
    cy.get(adminMarkingSettingsClass.clearSearchBtn).click({ force: true })
    cy.wait(2000)
};
Cypress.PageAdminMarkingsettingsPage.inputMappingName = (_content) => {
    cy.get(adminMarkingSettingsClass.templateNameInput).click({ force: true }).type(_content, { delay: 1 })
};
Cypress.PageAdminMarkingsettingsPage.verifySearchResult = (_length) => {
    cy.get(adminMarkingSettingsClass.tabRow).should("have.length", _length + 2)
};
Cypress.PageAdminMarkingsettingsPage.clickMappingName = () => {
    cy.get(adminMarkingSettingsClass.tabNameValue).click({ force: true })
};
Cypress.PageAdminMarkingsettingsPage.inputMappingName = (_content) => {
    cy.get(adminMarkingSettingsClass.templateNameInput).click({ force: true }).type(_content, { delay: 1 })
};
Cypress.PageAdminMarkingsettingsPage.checkTabCheckBox = (_index) => {
    cy.get(adminMarkingSettingsClass.tableBody)
        .find(adminMarkingSettingsClass.tabCheckBox).eq(_index).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickEditBtn = () => {
    cy.get(adminMarkingSettingsClass.editTepmlateBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickDelBtn = () => {
    cy.get(adminMarkingSettingsClass.deleteTemplateBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickSetDefaultBtn = () => {
    cy.get(adminMarkingSettingsClass.setDefaultBtn).click({ force: true }).wait(300)
};
Cypress.PageAdminMarkingsettingsPage.clickEditBtn = () => {
    cy.get(adminMarkingSettingsClass.editTepmlateBtn).click({ force: true })
    cy.wait(2000)
};
Cypress.PageAdminMarkingsettingsPage.verifyPreviewTable = (_info) => {
    cy.get(adminMarkingSettingsClass.previewPanel).find(auiTableClass.auiTable + ':visible').as('table')
    Cypress.auiCommon.verifyTable(_info, '@table')
};
Cypress.PageAdminMarkingsettingsPage.clickCancelPreviewBtn = () => {
    cy.get(adminMarkingSettingsClass.previewPanel).find(adminMarkingSettingsClass.previewCancelBtn)
        .click({ force: true }).wait(300)
    cy.wait(2000)
};
Cypress.PageAdminMarkingsettingsPage.verifySort = (_colIndex, _TimeorStr) => {
    if (_TimeorStr == "String") {
        cy.StringSortCheck(adminMarkingSettingsClass.tableBody + ' [data-col="' + _colIndex + '"]')
    }
    if (_TimeorStr == "Time") {
        cy.TimeSortCheck(adminMarkingSettingsClass.tableBody + '[data-col="' + _colIndex + '"]')
    }
};
Cypress.PageAdminMarkingsettingsPage.clickColHeader = (_index) => {
    cy.get(adminMarkingSettingsClass.columnHeader).eq(_index).click({ force: true }).wait(2000)
}
Cypress.PageAdminMarkingsettingsPage.clickTabCheckbox = (_index) => {
    cy.get(adminMarkingSettingsClass.tableBody)
        .find(adminMarkingSettingsClass.tabCheckBox).eq(_index).click({ force: true }).wait(300)
}
Cypress.PageAdminMarkingsettingsPage.confirmSetDefault = (_Content) => {
    if (_Content === 'Set as default') {
        cy.get(adminMarkingSettingsClass.verifysetDefaultBtn)
            .click({ force: true })
    }
    if (_Content === 'Cancel') {
        cy.get(adminMarkingSettingsClass.cancelsetDefaultBtn)
            .click({ force: true })
    }
    cy.wait(1500)
}
Cypress.PageAdminMarkingsettingsPage.clickShowRows = () => {
    cy.get(adminMarkingSettingsClass.showRowsBtn).click({ force: true }).wait(300)
}
Cypress.PageAdminMarkingsettingsPage.clickRowsNumber = (_number) => {
    cy.get(adminMarkingSettingsClass.optionlistText).contains(_number).click({ force: true })
    cy.wait(2000)
}
Cypress.PageAdminMarkingsettingsPage.verifyRows = (_length) => {
    cy.get(adminMarkingSettingsClass.tabRow).should("have.length.lte", _length + 2)
};

Cypress.PageAdminMarkingsettingsPage.checkCandidateInfoCheckBox = (_content) => {
    if (_content === 'Candidate ID') {
        cy.get(adminMarkingSettingsClass.candiateIdCheckbox).then(($res) => {
            const attr = Cypress.$($res).attr('aria-checked');
            console.log("attr1 is " + attr)
            if (attr == "false") {
                cy.get($res).click()
            }
        })
    }
    if (_content === 'Candidate profile (name, photo, and user ID)') {
        cy.get(adminMarkingSettingsClass.candiateProfileCheckbox).then(($res) => {
            const attr = Cypress.$($res).attr('aria-checked');
            if (attr == "false") {
                cy.get($res).click()
            }
        })
    }
    cy.wait(1500)
};
Cypress.PageAdminMarkingsettingsPage.uncheckCandidateInfoCheckBox = (_content) => {
    if (_content === 'Candidate ID') {
        cy.get(adminMarkingSettingsClass.candiateIdCheckbox).then(($res) => {
            const attr = Cypress.$($res).attr('aria-checked');
            if (attr == "true") {
                cy.get($res).click()
            }
        })
    }
    if (_content === 'Candidate profile (name, photo, and user ID)') {
        cy.get(adminMarkingSettingsClass.candiateProfileCheckbox).then(($res) => {
            const attr = Cypress.$($res).attr('aria-checked');
            if (attr == "true") {
                cy.get($res).click()
            }
        })
    }
    cy.wait(1500)
};
Cypress.PageAdminMarkingsettingsPage.saveCandidateInfo = () => {
    cy.get(adminMarkingSettingsClass.candidateInfoSaveBtn).click({ force: true })
    cy.wait(2000)
}
Cypress.PageAdminMarkingsettingsPage.AddGradeMappingbyAPI = (_templateName, _body) => {
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.loginid,
            Password: "1qaz2wsxE",
            RegionHost: currentAPIurl,
            TenantId: user.tenantid
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[ct].System.tenantid,
            _apiUrl: currentAPIurl
        }
        if (token != null) {
            cy.wait(800)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
        cy.GetGradeMappingbyAPI(Auth, _templateName).then((templateId) => {
            if (!templateId) {
                cy.request(
                    {
                        method: 'POST',
                        url: currentAPIurl + "/admin/api/markingsettings/grademapping/createtemplate",
                        auth: { 'bearer': Auth._token },
                        headers: {
                            Cookie: "TenantId=" + Auth._tenId
                        },
                        body: {
                            "name": _templateName,
                            "details": _body
                        }
                    }
                ).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.state).to.eq(true)
                })
            }
        })
    })
}
Cypress.PageAdminMarkingsettingsPage.DelGradeMappingbyAPI = (_templateName) => {
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.loginid,
            Password: "1qaz2wsxE",
            RegionHost: currentAPIurl,
            TenantId: user.tenantid
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[ct].System.tenantid,
            _apiUrl: currentAPIurl
        }
        if (token != null) {
            cy.wait(800)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
        cy.GetGradeMappingbyAPI(Auth, _templateName).then((templateId) => {
            if (!templateId) {
                cy.request(
                    {
                        method: 'POST',
                        url: currentAPIurl + "/admin/api/markingsettings/grademapping/deletetemplate",
                        auth: { 'bearer': Auth._token },
                        headers: {
                            Cookie: "TenantId=" + Auth._tenId
                        },
                        body: {
                            "ids": [templateId]
                        }
                    }
                ).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.state).to.eq(true)
                })
            }
        })
    })
}
Cypress.Commands.add("GetGradeMappingbyAPI", (_Auth, _templateName) => {
    cy.request(
        {
            method: 'POST',
            url: currentAPIurl + "/admin/api/markingsettings/grademapping/gettemplate",
            auth: { 'bearer': _Auth._token },
            headers: {
                Cookie: "TenantId=" + _Auth._tenId
            },
            body: {
                searchText: _templateName,
                SearchFields: "name",
                offset: 1,
                limit: 10,
                sortBy: "modifiedTime",
                isASC: false
            }
        }
    ).then((response) => {
        expect(response.status).to.eq(200)
        if (response.body.result.length == 0) {
            return false
        }
        else {
            var temId = response.body.result[0].id
            return temId
        }
    })

})
Cypress.PageAdminMarkingsettingsPage.setasDefaultbyAPI = (_templateName) => {
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.loginid,
            Password: "1qaz2wsxE",
            RegionHost: currentAPIurl,
            TenantId: user.tenantid
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[ct].System.tenantid,
            _apiUrl: currentAPIurl
        }
        if (token != null) {
            cy.wait(800)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
        cy.GetGradeMappingbyAPI(Auth, _templateName).then((templateId) => {
            cy.request(
                {
                    method: 'POST',
                    url: currentAPIurl + "/admin/api/markingsettings/grademapping/setasdefault",
                    auth: { 'bearer': Auth._token },
                    headers: {
                        Cookie: "TenantId=" + Auth._tenId
                    },
                    body: { id: templateId }
                }
            ).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(true)
            })
        })

    })
}

// Rubric template
Cypress.PageAdminMarkingsettingsPage.clickRubricTemplateHeaderBtn = (_num) => {
    cy.get(adminMarkingSettingsClass.rubricTemplateHeaderBtn)
        .eq(_num)
        .click()
};
Cypress.PageAdminMarkingsettingsPage.inputRubricTemplateName = (_name) => {
    cy.get(adminMarkingSettingsClass.rubricTemplateName)
        .clear()
        .type(_name)
};
Cypress.PageAdminMarkingsettingsPage.chooseRubricTemplateCourse = (_value) => {
    cy.get(auiComboboxClass.auiComboShell)
        .eq(1)
        .click()
    Cypress.auiCommon.comboSearchBox(_value)
};
Cypress.PageAdminMarkingsettingsPage.deleteCriteria = (_num) => {
    cy.get(adminMarkingSettingsClass.rubricTableId + auiButtonClass.deleBtn)
        .eq(_num)
        .click({ force: true })
    Cypress.auiCommon.clickFooterBtnInDialog_InModal(1)
};
Cypress.PageAdminMarkingsettingsPage.addCriteria = (_num) => {
    cy.get(adminMarkingSettingsClass.addLabel)
        .click({ force: true })
    Cypress.auiCommon.clickPopupMenuitemBtn(_num)
};
Cypress.PageAdminMarkingsettingsPage.inputPerformanceLevelTitle = (_value) => {
    cy.get(adminMarkingSettingsClass.criteriaLabel)
        .clear()
        .type(_value)
    Cypress.auiCommon.clickSaveLabelBtn()
};
Cypress.PageAdminMarkingsettingsPage.inputMarksTitle = (_value) => {
    cy.get(adminMarkingSettingsClass.marksLabel)
        .clear()
        .type(_value)
    Cypress.auiCommon.clickSaveLabelBtn()
};
Cypress.PageAdminMarkingsettingsPage.inputQuestionMarks = (_value1, _value2) => {
    cy.get(adminMarkingSettingsClass.rubricTableId + adminMarkingSettingsClass.questionMarksLabel)
        .clear()
        .type(_value1)
    if (_value2) {
        cy.get(adminMarkingSettingsClass.questionMarkDesLabel)
            .clear()
            .type(_value2)
    }
    Cypress.auiCommon.clickSaveLabelBtn()
};
Cypress.PageAdminMarkingsettingsPage.filter = (_name, _options) => {
    cy.get(auiFilterCommon.auiFilterGroup)
        .find(auiFilterCommon.auiFilterBox)
        .then(($boxs) => {
            let fil_index = ''
            switch (_name) {
                case 'Course':
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
Cypress.PageAdminMarkingsettingsPage.verifyRubricTemplateDetail = (_value) => {
    cy.get(adminMarkingSettingsClass.templateNameLabel)
        .next().children()
        .should('contain', _value.name)
    cy.get(adminMarkingSettingsClass.courseLabel)
        .next().children()
        .should('contain', _value.course)
    cy.get(adminMarkingSettingsClass.rubricContentCell + auiShadowTag.auiEllipsis)
        .should('contain', _value.performanceLevelTitle)
    cy.get(adminMarkingSettingsClass.rubricContentCell + '.strong')
        .should('contain', _value.performanceLevelMark)
    cy.get(adminMarkingSettingsClass.rubricContentCell + adminMarkingSettingsClass.rubricCriterionMarksDescription)
        .should('contain', _value.performanceLevelMarkDes)
    cy.get(adminMarkingSettingsClass.rubricCriterionName)
        .eq(0)
        .should('contain', _value.markTitle)
    cy.get(adminMarkingSettingsClass.rubricCriterionTableContent + adminMarkingSettingsClass.rubricCriterionMarksDescription)
        .should('contain', _value.totalMark)
};
Cypress.PageAdminMarkingsettingsPage.verifyGradeWetherAbled = (_value) => {
    if (_value) {
        cy.get(adminMarkingSettingsClass.displaySettingInput)
            .eq(2)
            .should('not.have.attr', 'disabled')
    } else {
        cy.get(adminMarkingSettingsClass.displaySettingInput)
            .eq(2)
            .should('have.attr', 'disabled')
    }
};
Cypress.PageAdminMarkingsettingsPage.switchGradeMapping = (_value) => {
    cy.get(auiShadowTag.auiSwitch)
        .shadow()
        .find(sampleExamClass.faceVerificationBtn)
        .click()
        .wait(2000)
};
Cypress.PageAdminMarkingsettingsPage.savePublishSetting = () => {
    cy.get(adminMarkingSettingsClass.saveSettingBtn)
        .click()
};