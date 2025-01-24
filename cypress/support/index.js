// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-wait-until';
import './feature/Admin/admin.common.command'
import './feature/Admin/admin.course.command'
import './feature/Admin/admin.role.command'
import './feature/Admin/admin.account.command'
import './feature/Admin/admin.audit.command'
import './feature/Admin/admin.application.command'
import './feature/Admin/admin.switchrole.command'
import './feature/Admin/admin.quicklink.command'
import './feature/Admin/admin.markingsettings.command'
import './feature/Admin/admin.lmsintegration.command'
import './feature/Admin/admin.globalsettings.command'
import './feature/Admin/admin.conductsettings.command'
import './feature/Admin/admin.emailTemplate.command'
import './feature/Admin/admin.authorisedUrl.command'
import './feature/Admin/admin.announcement.command'
import './feature/Admin/admin.approvalProcesses.command'
import './feature/Admin/admin.taskCenter.command'
import './feature/Admin/admin.airobot.command'
import 'cypress-file-upload'
import 'cypress-iframe'
import 'cypress-real-events'
import  './feature/Calendar/calendar.command'

import './feature/Bank/bank.question.command'
import './feature/Bank/bank.paper.command'
import './feature/Bank/bank.skeleton.command'
import './feature/Common/aui.common.command'
import './feature/Exam/exam.home.command'
import './feature/Exam/exam.create.command'
import './feature/Exam/exam.mark.command'
import './feature/Exam/student.exam.command'
import './feature/Exam/student.examConduct.command'
import './feature/Exam/examApp.conduct.command'
import './feature/Report/exam.report.command'
import './feature/Report/sampleExam.report.command'
import './feature/Report/question.report.command'
import './feature/Report/candidate.report.command'
import './feature/Report/dashboard.report.command'
import './feature/Exam/exam.grade.command'
import './feature/Exam/exam.attendance.command'
import './feature/Exam/exam.fileSaveTracking.command'
import './feature/Exam/exam.liveproctoring.command'
import './feature/Exam/exam.keycode.command'
import './feature/Exam/sampleExam.create.command'
import './feature/Exam/student.sampleExamConduct.command'
import './feature/Header/processes.command'

import  '../integration/Practise_Tudor/helper/features/admin.account.command'
import  '../integration/Practise_Tudor/helper/features/admin.announcement.command'
import  '../integration/Practise_Tudor/helper/features/Exam/exam.command'
import  '../integration/Practise_Tudor/helper/features/PaperBank/paper.command'



// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })