Feature: Exam_15_02: Attendance live proctoring
    开卷考试、闭卷考试的attendance页面数据准确

    Scenario: Attendance check live proctoring and open for resubmission
        Given 创建闭卷考试
        Then Admin考试过程中进入Attendance页面
        Then I verify live proctoring button is light
        Then I enter live proctoring page and verify default is 9 gird
        And I verify candidate1 show not started
        When Candidate1 enter the exam
        Then I verify candidate1 show network disconnected
        When I switch 25 gird
        Then I verify 1 row have 5 gird
        And I can click refresh button
        Then I verify the first gird have candidate1 name
        When I chat with candidate1
        Then I verify sent successed
        When I verify full screen tooltip
        Then I click full screen
        When I search candidate1 in live proctoring
        Then I maximize candidate1 grid
        When I end exam
        Then I verify end exam confirm tip
        And I write some comments
        And I can see end exam toast
        And I verify candidate1 show compulsory submit
        When I verify small screen tooltip
        Then I click small screen
        Then I verify Live proctoring settings content is right
        Then I click breadcrumb can see candidate1 status is present、submitted by Invigilator in attandance page
        When Exam end time arrived
        Then I choose stu1 stu2 and open for resubmission
        Then I verify live proctoring button is light
        Then I am in live proctoring page
        And I verify stu1 stu2 status
        And I open chat and verify chat history
        Then I chat with stu1
        And I verify message number

    Scenario: Filter class in live proctoring
        When I filter class1
        Then I verify have 4 students

    Scenario: Filter group in live proctoring
        Given I open group filter
        And I verify all group name and order
        Then I filter group1
        Then I verify video name after group filter
        And I verify right list count and student name
        When I search stu1 in live proctoring
        Then I verify no candidates show
        Then I clear search
        When I switch 25 gird
        Then I verify video name after group filter

    Scenario: 有reading time的close exam：在reading time开始后进入live proctoring界面
        Given 创建有reading time的close exam
        Then Admin enter attendance page
        When 没有到达reading time时间,message显示正确
        # Then I can see generate key code button is highlight
        Then 到达reading time的时间，显示button，进入到live proctoring界面