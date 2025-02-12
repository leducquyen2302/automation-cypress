export const examButton = {
    enterExam : 'button[aria-label="Enter exam"]'
}
export const instructionPage = {
    button : '.instruction-button-bottom aui-button',
    envFooterButton : '.environment-check-dialog-footer button',
    shareScreenDialog : '#screen-alert-dialog',
}
export const takingPage = {
    shareScreenDialog : '#screen-alert-dialog',
    optionCategory: '.options-area [style="display: block;"] .options-item',
    categoryDropArea: '.categorys-area [style="position: relative;"]',
    nextQuestion : '.buttons-change-questions',
}
export const submitPage = {
    submitedIcon:'.submittedPage_icon img',
    submitMessage:'.submittedPage_des div:nth-child(2)',
    backToHomePageBtn: '.submittedPage_container aui-button',
}
export const examPage = {
    examName : '.exam-card-content a',
    examScore : '.exam-card-info-markscore',
    viewResultBtn : '.exam-card-footer button[aria-label="View results"]',
}

export const examDetail = {
    step1 : 'div.aui-navpanel-box > a[href*="create"]',
    step2 : 'div.aui-navpanel-box > a[href*="assigninvigilator"]',
    step3 : 'div.aui-navpanel-box > a[href*="addpaper"]',
    attendace : 'div.aui-navpanel-box > a[href*="attendance"]',
    marking : 'div.aui-navpanel-box > a[href*="markquestion"]',
    grading : 'div.aui-navpanel-box > a[href*="markgrading"]',
    attendanceChartValue : '.aui-chart-legend-value',
    attendanceTable : '#attendanceTable',
    attendaceHeader : '.attendance-action-header',
    markingHeader : '.making-progress-sticky',
    markingTable : '#MarkScoreList_candidate',
    gradingHeader : '.making-grading-sticky',
    gradingTable : '#MarkScoreList',
    checkboxGradingTable : '[name="MarkScoreList-Checkbox"]',
    unpublish : '#exam-unpublish-btn',
    publishScore : '#publish-group',
    
}

export const viewResult = {
    score : '.basic-info-label[aria-label ="Total score"] + div .basic-info-value-inline',
    status : '.basic-info-label[aria-label ="Status"] + div .basic-info-value-inline',

}
export const markingPage ={
    totalMarks : '.basic-info-label[aria-label="Total marks"] + div',
}
