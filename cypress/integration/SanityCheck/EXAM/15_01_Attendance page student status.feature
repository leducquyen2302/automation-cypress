Feature: Exam_15_01: Attendance page student status
    开卷考试、闭卷考试的attendance页面数据准确

    Scenario: open book- Attendance check natural candidate status
        Given 创建开卷考试
        Then stu1进入考试并交卷
        Then stu2进入考试，但是没有结束考试，就切换到了Admin登录
        Then Admin等待考试时间结束后进入Attendance页面
        Then Attendance status图表数据正确
        And I verify the exam basic info
        And I verify student001 all column is right
        And I verify student002 all column is right
        And I verify student006 all column is right

    Scenario: open book- Attendance check open for resubmission status
        Given I choose all student
        Then I reopen and set end time is next minute
        And I verify attendance status after reopen
        When I choose stu1
        Then I verify reopen button is disabled
        When Stu1 end exam
        Then I verify attendance status after submitted student again submit
        And I verify end time column tooltip
        When Exam deadline arrived
        Then I verify attendance status after deadline arrived
        When I choose all student
        Then I reopen and set end time is 23,30
        When I open stu1 detail
        Then I verify exam time,end time modified,comment
        When Stu1 enter exam again
        Then I verify stu1 start time is now
        And I verify stu1 end time is null

    Scenario: I verify create view is required field
        Given I open view list
        Then I click manage views
        Then I click create view button
        When I click save create view
        Then I verify name is required field

    Scenario: I verify customized view built in data
        Given I input name and set default
        Then I verify Candidate name, Attendance status, Examination status, Oral exam progress are checked and cannot edit

    Scenario: I verify move up, move down, table display right
        Given I check Candidate ID and move up it
        Then I verify Candidate ID move up is gray
        Then I move down Candidate name and check User ID
        Then I save the customized view
        Then I verify table display the customized view right

    Scenario: I verify manage view button name are right
        Given I verify manage view button display the customized view name
        When I open view list
        Then I verify the customized view name display default
        When I click manage views
        Then I verify all columns set as default is no

    Scenario: I verify All columns edit view popup
        Given I click edit view button
        Then I verify view name is gray
        Then I click save edit view button

    Scenario: I edit the customized view
        Given I switch the customized view
        And I verify the customized view name display default and highlight in left Navigation bar
        Then I click edit view button
        Then I verify input field echo right
        Then I input a new name
        Then I click save edit view button
        Then I uncheck Candidate ID
        Then I save the customized view
        Then I verify table display the customized view right after edit

    Scenario: I delete the customized view
        Given I open view list
        Then I click manage views
        Then I switch the customized view
        Then I delete the customized view
        Then I verify table display default view