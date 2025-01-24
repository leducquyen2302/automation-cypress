/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let build_in = ['BE2021', 'CC2021', 'PM2021']

let courseInfo = {
    code: "AT_code" + new Date().toLocaleString(),
    duplicateCode: "Dup_AT_code" + new Date().toLocaleString(),
    name: "AT_name" + new Date().toLocaleString(),
    CourseManager: "",
    CoCourseManager: "",
    PaperCrafter: "",
    Class1Name: "AT Class1",
    Class2Name: "AT Class2",
}

let system_display = ''
let stu_list = []


const commonMsg = {
    courseCreate: 'The course was created.',
    courseUpdate: 'The course was updated.',
    courseDelete: 'The course was deleted.',
    candiUpdate: 'The candidate was updated.',
    candiDelete: 'The candidate was deleted from current course.',
    sameCourseSemesterOrganization: 'A course of the same course code already exists for the semester and organisation.',
    organizationDelete: 'The organisation was deleted.'
}

let topOrganizationName = `AT_TopOrganization_${new Date().toLocaleString()}`
let edit_topOrganizationName = `edit_AT_TopOrganization_${new Date().toLocaleString()}`
let subOrganizationName = `AT_SubOrganization_${new Date().toLocaleString()}`

let semesterName = `1AT_Semester_${new Date().toLocaleString()}`
let edit_semesterName = `1AT_Edit_Semester_${new Date().toLocaleString()}`
let semesterDescription = `AT_Semester_Des_${new Date().toLocaleString()}`

var semesterRowIndex = ''
function index(_value) {
    cy.log(`value===========>${_value}`)
    cy.contains(`${_value}`)
        .parent()
        .parent()
        .parent()
        .invoke('attr', 'data-row')
        .then(($data) => {
            cy.log(`data===========>${$data}`)
            semesterRowIndex = $data
        })
}

before(() => {
    let current = Cypress.env('current_Env')
    let ct = Cypress.env('current_ten')
    let env = Cypress.env(current)
    system_display = env[ct].System.display
    courseInfo.CourseManager = env[ct].CM
    courseInfo.CourseManager2 = system_display
    courseInfo.CoCourseManager = env[ct].Invigilator1
    courseInfo.PaperCrafter = env[ct].Invigilator2
    stu_list = env[ct].Candidates
    cy.expect(stu_list.length).above(0)
    cy.log(courseInfo, stu_list)
})

//Scenario: Verify build-in data
Given(/^Exam-admin 登录系统，进入Admin页面$/, () => {
    cy.LoginExamAsSystem()
    cy.wait(2500)
    Cypress.PageAdminCommon.clickLeftNaviAndJump('Admin')
});
Then('通过Course Configuration卡片，进入Course configuration页面', () => {
    Cypress.PageAdminCommon.clickCardbyName('Configuration', 'Course configuration')
    cy.waitLoading()
})
When(/^搜索 BE2021$/, () => {
    Cypress.PageAdminCourse.search(build_in[0])
})
Then(/^验证 BE2021的Course code、Course name、Course manager准确$/, () => {
    let courseInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'School',
                value: 'N/A'
            },
            {
                index: 2,
                display: 'Discipline',
                value: 'N/A'
            },
            {
                index: 3,
                display: 'Course code',
                value: build_in[0],
            },
            {
                index: 4,
                display: 'Course name',
                value: 'International Business Environment',
            },
            {
                index: 5,
                display: 'Course manager',
                value: system_display,
            }
        ]
    }
    Cypress.PageExamCreate.verifyInvigilatorTable(courseInfo)
})
When(/^搜索 CC2021$/, () => {
    Cypress.PageAdminCourse.search(build_in[1])
})
Then(/^验证 CC2021的Course code、Course name、Course manager准确$/, () => {
    let courseInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: 'N/A'
            },
            {
                index: 2,
                value: 'N/A'
            },
            {
                index: 3,
                value: build_in[1],
            },
            {
                index: 4,
                value: 'Primary Corporate Culture Training',
            },
            {
                index: 5,
                value: system_display,
            }
        ]
    }
    Cypress.PageExamCreate.verifyInvigilatorTable(courseInfo)
})
When(/^搜索 PM2021$/, () => {
    Cypress.PageAdminCourse.search(build_in[2])
})
Then(/^验证 PM2021的Course code、Course name、Course manager准确$/, () => {
    let courseInfo = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'School',
                value: 'N/A'
            },
            {
                index: 2,
                display: 'Discipline',
                value: 'N/A'
            },
            {
                index: 3,
                value: build_in[2],
            },
            {
                index: 4,
                value: 'Project Management Professional Certification',
            },
            {
                index: 5,
                value: system_display,
            }
        ]
    }
    Cypress.PageExamCreate.verifyInvigilatorTable(courseInfo)
})
Then(/^成功update course$/, () => {
    let info = {
        rowIndex: 1,
        columns: [
            {
                index: 5,
                display: 'Paper crafter',
                value: courseInfo.PaperCrafter.display
            }
        ]
    }
    Cypress.PageAdminCourse.verifyCourseTable(info)
})

//Scenario: Verify organisation structure
Given(/^I click Organisation configuration button$/, () => {
    Cypress.PageAdminCourse.clickTabBar(1)
});
Then(/^I click organisation structure$/, () => {
    Cypress.PageAdminCourse.clickOrganizationStructure()
});
Then(/^I verify level and label are right$/, () => {
    Cypress.PageAdminCourse.verifyStructureValue(0, 'School')
    Cypress.PageAdminCourse.verifyStructureValue(1, 'Discipline')
});
And(/^I verify the delete button can't click and have tooltip$/, () => {
    Cypress.PageAdminCourse.verifyStructure_DeleteLevelBtn()
});
And(/^I verify the add level button can't click and have tooltip$/, () => {
    Cypress.PageAdminCourse.verifyStructure_AddLevelBtn()
});
Then(/^I close the structure page$/, () => {
    Cypress.PageAdminCourse.closePage()
});

//Scenario: 创建一个新 organization
Then(/^I create top level organization$/, () => {
    Cypress.PageAdminCourse.clickCreateTopOrganizationBtn()
    Cypress.PageAdminCourse.inputOrganizationName(topOrganizationName)
    Cypress.PageAdminCourse.inputAdmin(system_display)
    Cypress.auiCommon.clickSave()
});
Then(/^I create sub level organization$/, () => {
    Cypress.PageAdminCourse.clickCreateSubOrganizationBtn(topOrganizationName)
    Cypress.PageAdminCourse.inputOrganizationName(subOrganizationName)
    Cypress.auiCommon.clickSave()
});
When(/^I search the organization name$/, () => {
    Cypress.PageAdminCourse.search(topOrganizationName)
});
Then(/^I can see the result background is yellow$/, () => {
    Cypress.PageAdminCourse.verifySearchResult(topOrganizationName)
});

//Scenario: 创建一个新 semester
Given(/^I click Semester configuration button$/, () => {
    Cypress.PageAdminCourse.clickTabBar(2)
});
Then(/^I verify semester setting is enabled and disable edit$/, () => {
    Cypress.PageAdminCourse.verifySemesterSetting()
});
And(/^I verify semester tooltip is right$/, () => {
    Cypress.PageAdminCourse.verifySemesterBtnToolTip()
});
When(/^I click create semester button$/, () => {
    Cypress.PageAdminCourse.createSemester()
});
Then(/^I verify the end date cannot be earlier than the start date$/, () => {
    Cypress.PageAdminCourse.editSemesterStartDate(-1)
    Cypress.PageAdminCourse.editSemesterEndDate(-2)
    Cypress.auiCommon.verifyValiMessage(4, 'The end date must be later than the start date.')
});
Then(/^I input name, description and date$/, () => {
    Cypress.PageAdminCourse.inputSemesterName(semesterName)
    Cypress.PageAdminCourse.inputSemesterDescription(semesterDescription)
    Cypress.PageAdminCourse.editSemesterEndDate(2)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I obtain the semester row$/, () => {
    index(semesterName)
});
And(/^I verify the semester info in table$/, () => {
    Cypress.PageAdminCourse.verifySemesterTableDate(semesterRowIndex, semesterName, semesterDescription)
});
When(/^I edit the semester$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(semesterRowIndex - 1)
    Cypress.PageAdminApplication.clickEdit()
    Cypress.PageAdminCourse.inputSemesterName(edit_semesterName)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^I obtain the editSemester row$/, () => {
    index(edit_semesterName)
});
Then(/^I verify the edit semester info in table$/, () => {
    Cypress.PageAdminCourse.verifySemesterTableDate(semesterRowIndex, edit_semesterName, semesterDescription)
});

//Scenario: 创建一个新 course by just create organisation and semester
Given(/^I click Course configuration button$/, () => {
    Cypress.PageAdminCourse.clickTabBar(0)
});
When(/^点击Create course button$/, () => {
    Cypress.PageAdminCourse.clickCreateCourse();
});
And(/^I input course code, course name, just created organisation, just created semeter, course manager$/, () => {
    Cypress.PageAdminCourse.inputText('Course code', courseInfo.code)
    Cypress.PageAdminCourse.inputText('Course name', courseInfo.name)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(0, edit_semesterName)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(1, topOrganizationName)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(2, subOrganizationName)
    Cypress.PageAdminCourse.inputCourseManager(courseInfo.CourseManager.display)
});
And(/^I verify step1 segment color is right$/, () => {
    Cypress.PageAdminCourse.verifyCreateCourseStepColor(0,'current')
    Cypress.PageAdminCourse.verifyCreateCourseStepColor(1,'unstart')
});
And(/^验证Co-Course Manager水印正确$/, () => {
    Cypress.PageAdminCourse.verifyWatermark(1)
});
Then(/^输入Co-Course Manager by user id$/, () => {
    Cypress.PageAdminCourse.inputCoCourseManager(courseInfo.CoCourseManager.userid)
});
And(/^I click save and next button$/, () => {
    cy.wait(5000)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
    cy.wait(5000)
});
Then(/^course创建成功$/, () => {
    Cypress.auiCommon.verifyToast(commonMsg.courseCreate)
    Cypress.auiCommon.closeToast()
    cy.waitLoading()
});
And(/^I verify step2 segment color is right$/, () => {
    Cypress.PageAdminCourse.verifyCreateCourseStepColor(0,'finished')
    Cypress.PageAdminCourse.verifyCreateCourseStepColor(1,'current')
});
Then(/^I click close button$/, () => {
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});

// Scenario: I can not create the course with the same course code, semester, organization
When(/^I create the course with the same course code, semester, organization$/, () => {
    Cypress.PageAdminCourse.clickCreateCourse();
    Cypress.PageAdminCourse.inputText('Course code', courseInfo.code)
    Cypress.PageAdminCourse.inputText('Course name', courseInfo.name)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(0, edit_semesterName)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(1, topOrganizationName)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(2, subOrganizationName)
    Cypress.auiCommon.clickFooterBtnInPanel(1)
});
Then(/^提示不可以创建相同code和organization的course$/, () => {
    Cypress.auiCommon.verifyValiMessage(0, commonMsg.sameCourseSemesterOrganization)
    Cypress.PageAdminCourse.cancelForm('Create')
});

//Scenario: I can search the course by course code or name
When(/^I search the course code$/, () => {
    Cypress.PageAdminCourse.search(courseInfo.code)
})
Then(/^I verify all columns info$/, () => {
    let course = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                display: 'School',
                value: topOrganizationName
            },
            {
                index: 2,
                display: 'Discipline',
                value: subOrganizationName
            },
            {
                index: 3,
                display: 'Course code',
                value: courseInfo.code
            },
            {
                index: 4,
                display: 'Course name',
                value: courseInfo.name
            },
            {
                index: 5,
                display: 'Semester',
                value: edit_semesterName
            },
            {
                index: 7,
                display: 'Co-course manager',
                value: ''
            },
            {
                index: 8,
                display: 'Paper crafter',
                value: ''
            },
            {
                index: 9,
                display: 'Candidates',
                value: 0
            },
            {
                index: 10,
                display: 'Class',
                value: ''
            }
        ]
    }
    Cypress.PageAdminCourse.verifyCourseTable(course)
    Cypress.auiCommon.verifyCandidateNameInTable_InShadow_NoTag(1, 7, courseInfo.CourseManager.display)
    Cypress.PageAdminCourse.clearSearch()
});
When(/^I search the course name$/, () => {
    Cypress.PageAdminCourse.search(courseInfo.name)
});
Then(/^The result course name is right$/, () => {
    let course = {
        rowIndex: 1,
        columns: [
            {
                index: 4,
                display: 'Course name',
                value: courseInfo.name
            }
        ]
    }
    Cypress.PageAdminCourse.verifyCourseTable(course)
});

//Scenario: I edit course and add paper craft
When(/^选择刚刚的course并且点击Edit course$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.clickEditCourse()
})
And(/^I add paper crafter$/, () => {
    Cypress.PageAdminCourse.inputPaperCrafter(courseInfo.PaperCrafter.display)
})
And(/^I click save and edit candidates button$/, () => {
    Cypress.PageAdminCourse.saveAndEditCandidates()
})

// Scenario: I create class
When(/^I click create class button$/, () => {
    Cypress.PageAdminCourse.clickAddClassBtn()
});
Then(/^I input class1 name and add two class owners$/, () => {
    Cypress.PageAdminCourse.inputClassName(courseInfo.Class1Name)
    Cypress.PageAdminCourse.inputClassOwner(courseInfo.CourseManager.display)
    Cypress.PageAdminCourse.inputClassOwner(courseInfo.CoCourseManager.display)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^I verify class1 name and class1 owner display right$/, () => {
    Cypress.PageAdminCourse.verifyClassInfo(courseInfo.Class1Name, courseInfo.CourseManager.display, courseInfo.CoCourseManager.display)
});
When(/^I edit class1$/, () => {
    Cypress.PageAdminApplication.clickEdit()
});
Then(/^I delete one class1 owner$/, () => {
    Cypress.PageAdminCourse.deleteUser_InRichCombobox(0)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
And(/^I verify class1 owner display right$/, () => {
    Cypress.PageAdminCourse.verifyClassInfo(courseInfo.Class1Name, courseInfo.CoCourseManager.display)
});

// Scenario: Add candidates in class
When(/^I add four candidates in class1$/, () => {
    Cypress.PageAdminCourse.addCandidate(stu_list[0].userid)
    Cypress.PageAdminCourse.addCandidate(stu_list[1].userid)
    Cypress.PageAdminCourse.addCandidate(stu_list[2].userid)
    Cypress.PageAdminCourse.addCandidate(stu_list[3].userid)
});
Then(/^I search student001 and check it$/, () => {
    Cypress.PageAdminCourse.searchCandidate(stu_list[0].userid)
    Cypress.PageAdminCourse.checkCandidate(0)
});
And(/^I verify the move button is disabled$/, () => {
    Cypress.PageAdminCourse.verifyMoveBtnDisabled()
});
Then(/^I delete the candidate$/, () => {
    Cypress.PageAdminCourse.deleteCandidate()
    Cypress.PageAdminCourse.confirmDialog(1)
});
When(/^I create class2$/, () => {
    Cypress.PageAdminCourse.clickAddClassBtn()
    Cypress.PageAdminCourse.inputClassName(courseInfo.Class2Name)
    Cypress.PageAdminCourse.inputClassOwner(courseInfo.CourseManager.display)
    Cypress.auiCommon.clickFooterBtnInDialog(1)
});
Then(/^I switch class1 and move student002 to class2$/, () => {
    Cypress.PageAdminCourse.switchClass(0)
    Cypress.PageAdminCourse.checkCandidate(0)
    Cypress.PageAdminCourse.moveCandidate(courseInfo.Class2Name)
});
And(/^I verify class1 and class2 number is right$/, () => {
    Cypress.PageAdminCourse.verifyClassCandidateCount(0, 2)
    Cypress.PageAdminCourse.verifyClassCandidateCount(1, 1)
});
And(/^I verify class2 candidate is right$/, () => {
    Cypress.PageAdminCourse.switchClass(1)
    Cypress.PageAdminCourse.verifyCandiTable(stu_list[1].name, 0)
});

// Scenario: Delete class
When(/^I click delete class2 button$/, () => {
    Cypress.PageAdminCourse.clickDeleteClassBtn()
});
Then(/^I verify delete class popup is right and confirm delete$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('You are about to delete the class, and the candidates in this class will also be deleted. Are you sure you want to proceed?')
    Cypress.PageAdminCourse.confirmDialog(1)
});
And(/^I close the candidate page$/, () => {
    Cypress.PageAdminCourse.closePage()
});
And(/^I verify the Candidates and Class column info are all right$/, () => {
    let course = {
        rowIndex: 1,
        columns: [
            {
                index: 9,
                display: 'Candidates',
                value: '2'
            },
            {
                index: 10,
                display: 'Class',
                value: '1'
            },
        ]
    }
    Cypress.PageAdminCourse.verifyCourseTable(course)
});
When(/^I click the candidate number icon$/, () => {
    Cypress.PageAdminCourse.clickCourseTableCnadiCount(0)
});
Then(/^I verify the candidates are right$/, () => {
    Cypress.PageAdminCourse.verifyCandiTable(stu_list[2].name, 0)
    Cypress.PageAdminCourse.verifyCandiTable(stu_list[3].name, 1)
    Cypress.PageAdminCourse.closePage()
});
When(/^I click the class number icon$/, () => {
    Cypress.PageAdminCourse.clickCourseTableCnadiCount(1)
});
Then(/^I verify the class is right$/, () => {
    Cypress.PageAdminCourse.verifyClassInfo(courseInfo.Class1Name, courseInfo.CoCourseManager.display)
    Cypress.PageAdminCourse.closePage()
});

// Scenario: Filter organization
Given(/^I clear search$/, () => {
    Cypress.PageAdminCourse.clearSearch()
});
When(/^I filter school$/, () => {
    Cypress.PageAdminCourse.filter('School', topOrganizationName)
});
Then(/^The result school is right$/, () => {
    Cypress.auiCommon.verifyValueInTable(1, 2, topOrganizationName)
});
When(/^I filter discipline$/, () => {
    Cypress.PageAdminCourse.filter('Discipline', subOrganizationName)
});
Then(/^The result discipline is right$/, () => {
    Cypress.auiCommon.verifyValueInTable(1, 3, subOrganizationName)
});

// Scenario: Filter semester
When(/^I filter semester$/, () => {
    Cypress.PageAdminCourse.filter('Semester', edit_semesterName)
});
Then(/^The result semester is right$/, () => {
    Cypress.auiCommon.verifyValueInTable(1, 6, edit_semesterName)
});

// Scenario: Filter course
When(/^I filter course$/, () => {
    Cypress.PageAdminCourse.filter('Course', `${courseInfo.code} (${courseInfo.name})`)
});
Then(/^The result course name is right$/, () => {
    Cypress.auiCommon.verifyValueInTable(1, 5, courseInfo.name)
});

// Scenario: Duplicate course
When(/^I duplicate course by top button$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.duplicateCourse()
});
Then(/^I verify every row info is the same as origanial, semester is null$/, () => {
    let info = {
        courseCode: courseInfo.code,
        courseName: courseInfo.name,
        semester: 'Semester',
        school: topOrganizationName,
        discipline: subOrganizationName,
        cm: courseInfo.CourseManager.display,
        coCM: courseInfo.CoCourseManager.display,
        paperCrafter: courseInfo.PaperCrafter.display,
    }
    Cypress.PageAdminCourse.verifyCreateCourseInfo(info)
});
Then(/^I edit course code, choose semester$/, () => {
    Cypress.PageAdminCourse.inputText('Course code', courseInfo.duplicateCode)
    Cypress.PageAdminCourse.chooseOrganizationSemester_InCourse(0, edit_semesterName)
});
Then(/^I input two CM,two co CM,two paper crafter$/, () => {
    Cypress.PageAdminCourse.inputCourseManager(system_display)
    Cypress.PageAdminCourse.inputCoCourseManager(system_display)
    Cypress.PageAdminCourse.inputPaperCrafter(system_display)
});

// Scenario: Verify more staffs
Then(/^I search the duplicate course$/, () => {
    Cypress.PageAdminCourse.search(courseInfo.duplicateCode)
});
Then(/^I verify duplicated course table info$/, () => {
    let course = {
        rowIndex: 1,
        columns: [
            {
                index: 1,
                value: topOrganizationName
            },
            {
                index: 2,
                value: subOrganizationName
            },
            {
                index: 3,
                value: courseInfo.duplicateCode
            },
            {
                index: 4,
                value: courseInfo.name
            },
            {
                index: 5,
                value: edit_semesterName
            },
            {
                index: 6,
                value: '1'
            },
            {
                index: 7,
                value: '1'
            },
            {
                index: 8,
                value: '1'
            },
            {
                index: 9,
                value: 0
            },
            {
                index: 10,
                value: ''
            }
        ]
    }
    Cypress.PageAdminCourse.verifyCourseTable(course)
});
When(/^I click more CM icon$/, () => {
    Cypress.PageAdminCourse.clickMoreStaffs(0)
});
Then(/^I can see all CM$/, () => {
    Cypress.PageAdminCourse.verifyMoreStaff(system_display)
    Cypress.PageAdminCourse.verifyMoreStaff(courseInfo.CourseManager.display)
});
When(/^I click more co cm icon$/, () => {
    Cypress.PageAdminCourse.clickMoreStaffs(1)
});
Then(/^I can see all co cm$/, () => {
    Cypress.PageAdminCourse.verifyMoreStaff(system_display)
    Cypress.PageAdminCourse.verifyMoreStaff(courseInfo.CoCourseManager.display)
});
When(/^I click more paper crafter icon$/, () => {
    Cypress.PageAdminCourse.clickMoreStaffs(2)
});
Then(/^I can see all paper crafter$/, () => {
    Cypress.PageAdminCourse.verifyMoreStaff(system_display)
    Cypress.PageAdminCourse.verifyMoreStaff(courseInfo.PaperCrafter.display)
});

// Scenario: Scenario: Delete Course
When(/^I delete original course$/, () => {
    cy.wait(2000)
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.clickDelete()
});
Then(/^I verify delete course info on confirm is right$/, () => {
    Cypress.auiCommon.verifyConfirmPopup(`Are you sure you want to delete the course ${courseInfo.code} - ${edit_semesterName} - ${topOrganizationName} - ${subOrganizationName}?`)
});
And(/^I confirm delete course$/, () => {
    Cypress.PageAdminCourse.confirmDialog(1)
    Cypress.auiCommon.verifyToast(commonMsg.courseDelete)
});
Then(/^I delete duplicate course$/, () => {
    cy.wait(2000)
    Cypress.PageAdminCourse.courseTableRowCheckbox(0)
    Cypress.PageAdminCourse.clickDelete()
    Cypress.PageAdminCourse.confirmDialog(1)
});

// Scenario: Edit top-level organisation
When(/^I click top level organisation edit button$/, () => {
    Cypress.PageAdminCourse.clickOrganizationActionBtn(topOrganizationName, 'Edit')
});
Then(/^I edit organization name$/, () => {
    Cypress.PageAdminCourse.inputOrganizationName(edit_topOrganizationName)
    Cypress.auiCommon.clickSave()
});

// Scenario: Delete top-level organisation
When(/^I click top level organisation delete button$/, () => {
    cy.wait(2000)
    Cypress.PageAdminCourse.clickOrganizationActionBtn(edit_topOrganizationName, 'Delete')
});
Then(/^I delete the top organization$/, () => {
    Cypress.auiCommon.verifyConfirmPopup('Are you sure you want to delete this organisation?')
    Cypress.PageAdminCourse.confirmDialog(1)
    Cypress.auiCommon.verifyToast(commonMsg.organizationDelete)
});

// Scenario: Delete semester
Then(/^I delete the editSemester$/, () => {
    Cypress.PageAdminCourse.courseTableRowCheckbox(semesterRowIndex - 1)
    Cypress.PageAdminApplication.clickDelApp()
});