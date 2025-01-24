/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
let paperName1 = 'ATPaper_01 Azure Knowledge Check ' + new Date().toLocaleString()
let paperName2 = 'ATPaper_02 Azure Knowledge Check ' + new Date().toLocaleString()
let paperName3 = 'ATPaper_03 Azure Knowledge Check ' + new Date().toLocaleString()
let localfile = 'examInfo.json'
let Question1 = {}, Question2 = {}, Question3 = {}, Question4 = {}, Question5 = {}, Question9_Categorization = {}, Question8_haveShowBox = {}

let section_all = [
    {
        name: "AT_Sec1 Choice",
        description: "Autotest for EXAMAPP Choice Question",
        order: 1,
        questions: [
            {
                order: 1,
                question: ""
            },
            {
                order: 2,
                question: ""
            }
        ]
    },
    {
        name: "AT_Sec2 Essay",
        description: "Autotest for EXAMAPP Eassy Question",
        order: 2,
        questions: [
            {
                order: 3,
                question: ""
            }
        ]
    },
    {
        name: "AT_Sec3 FIB",
        description: "Autotest for EXAMAPP Fill-in-blank Question",
        order: 3,
        questions: [
            {
                order: 4,
                question: ""
            }
        ]
    },
    {
        name: "AT_Sec4 Sub-Question",
        description: "Autotest for EXAMAPP Sub-Question",
        order: 4,
        questions: [
            {
                order: 5,
                question: ""
            }
        ]
    }
]

let section_temp = [
    {
        name: "AT Section 1",
        description: "Choice and Essay",
        order: 1,
        questions: [
            {
                order: 1,
                question: ""
            },
            {
                order: 2,
                question: ""
            },
            {
                order: 3,
                question: ""
            }
        ]
    },
    {
        name: "AT Section 2",
        description: "Fill-in-blank",
        order: 2,
        questions: [
            {
                order: 4,
                question: ""
            },
            {
                order: 5,
                question: ""
            },
        ]
    }
]

let examInfo = {
    name: "",
    courseCode: "AT001",
    courseId: '',
    startOffset: {},
    startTime: "",
    duration: 0,
    endTime: "",
    isOpenB: true,
    isSave2LocalFile: false,
    filePath: "",
}

let paperInfo = {
    name: "",
    sections: section_temp
}

function sectionInfo(_sections) {
    let sections = []
    for (let c = 0; c < _sections.length; c++) {
        let sectionInfo = {
            questNo: 0, fullMarks: 0, totalMarks: 0, name: '', description: ''
        }
        let questions = _sections[c].questions
        sectionInfo.name = _sections[c].name
        sectionInfo.description = _sections[c].description
        sectionInfo.questNo = sectionInfo.questNo + questions.length
        for (let q = 0; q < questions.length; q++) {
            let question = questions[q].question
            sectionInfo.fullMarks = sectionInfo.fullMarks + question.fullMarks
            sectionInfo.totalMarks = sectionInfo.totalMarks + question.totalMarks
        }
        sections.push(sectionInfo)
    }
    return sections
}

before(() => {
    cy.log('---> get fixture info ...')
    cy.fixture("questionInfo").then(($ques) => {
        let allQuest = $ques
        Question1 = allQuest[8]
        Question2 = allQuest[1]
        Question3 = allQuest[2]
        Question4 = allQuest[3]
        Question5 = allQuest[5]
        Question8_haveShowBox = allQuest[10]
        Question9_Categorization = allQuest[9]
        let Question5_Sub = JSON.parse(JSON.stringify(Question5))
        let Question7_noShowBox = JSON.parse(JSON.stringify(Question8_haveShowBox))
        Question7_noShowBox.settings = "{\"isShowBox\":false,\"allowRichText\":false,\"responseLimit\":0,\"number\":null}"
        Question5_Sub.totalMarks = Question7_noShowBox.totalMarks + Question9_Categorization.totalMarks + Question8_haveShowBox.totalMarks
        Question5_Sub.fullMarks =Question7_noShowBox.fullMarks + Question9_Categorization.fullMarks + Question8_haveShowBox.fullMarks
            //section 1 
            section_temp[0].questions[0].question = Question1
        section_temp[0].questions[1].question = Question3
        Question5.questions.push(Question2)
        Question5.questions.push(Question4)
        section_temp[0].questions[2].question = Question5
        //section 2
        section_temp[1].questions[0].question = Question4
        Question5_Sub.questions.push(Question7_noShowBox)
        Question5_Sub.questions.push(Question8_haveShowBox)
        Question5_Sub.questions.push(Question9_Categorization)
        section_temp[1].questions[1].question = Question5_Sub
    })
    cy.writeFile(`cypress/fixtures/${localfile}`, [])
})

// =============== Exam 1 for web open book===============
Given(/^Exam Admin 登录 examena$/, () => {
    //cy.LoginExamAsExamAdmin(true)
});
Then(/^创建一个2分钟以后开始的Open Book Exam$/, () => {
    examInfo.name = `ATExamAPP01`
    examInfo.startOffset = { level: "min", off: 2 }
    examInfo.duration = 30
    examInfo.isSave2LocalFile = true
    examInfo.filePath = localfile
    examInfo.isAppend = true
    examInfo.sections = sectionInfo(section_temp)
    examInfo.instruction = 'This is a instruction!'

    paperInfo.name = paperName1
    cy.log(paperInfo)

    cy.CreateExamByAPI(examInfo, paperInfo)
})

Then(/^创建一个3分钟以后开始的Close Book Exam$/, () => {
    examInfo.name = `ATExamAPP02`
    examInfo.startOffset = { level: "min", off: 3 }
    examInfo.duration = 10
    examInfo.isOpenB = false
    examInfo.isSave2LocalFile = true
    examInfo.filePath = localfile
    examInfo.isAppend = true
    examInfo.sections = sectionInfo(section_temp)

    paperInfo.name = paperName2
    cy.CreateExamByAPI(examInfo, paperInfo)
})

// =============== Exam 2 for app ===============
Then(/^创建一个1小时以后开始的Close Book Exam$/, () => {
    cy.wait(1500)

    examInfo.name = `ATExamAPP03`
    examInfo.startOffset = { level: "min", off: 60 }
    examInfo.duration = 10
    examInfo.isOpenB = true
    examInfo.isSave2LocalFile = true
    examInfo.filePath = localfile
    examInfo.isAppend = true
    examInfo.sections = sectionInfo(section_temp)

    paperInfo.name = paperName3
    cy.CreateExamByAPI(examInfo, paperInfo)
})