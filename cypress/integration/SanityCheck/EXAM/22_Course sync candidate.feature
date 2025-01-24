Feature: Exam_22: Course sync candidate

    Scenario: Prepare a reading, have team, course have class, fixed exam
        Given I prepare a reading, have team, fixed exam and have class with AT003

    Scenario: Sync for select candidate on fixed exam
        Given I remove student001 and create class2 add student003 to AT003 after the exam already start
        When I login as system and enter Course Configuration
        Then I choose AT003 and click Sync to uncompleted exams for selected courses
        And I verify the confirm content and click ok
        And I verify the start sync toast and view details toast
        Then I click here to open the processs page
        And I verify the sync process name and time is right

    Scenario: Verify step2 and attendance for the sync candidate on fixed exam
        When I enter the fixed exam attendance page
        Then I verify student001 all columns are all right in attendance on fixed exam
        And I verify student003 all columns are all right in attendance on fixed exam
        When I enter the fixed exam step2
        Then I verify student003 all columns are all right in step2 on fixed exam

    Scenario: Prepare a no reading, no team,course no class flexible exam
        Given I remove AT003 all class and add student003
        Then I prepare a no reading, no team, flexible exam and no class in course

    Scenario: Sync for all candidate on flexible exam
        Then I remove student003 and create class1 add student001, student002
        When I enter the Course Configuration page
        Then I click Sync to uncompleted exams for all courses button
        When I enter the flexible exam attendance page
        Then I verify student001 all columns are all right in attendance on flexible exam
        Then I verify student003 all columns are all right in attendance on flexible exam
        When I enter the flexible exam step2
        Then I verify student001 all columns are all right in step2 on flexible exam