Feature: Exam_20: Attempt function

    Scenario: Student001 can attempt exam
        Given Prepare no reading, 2 attempts, open book exam
        When I am login as student001
        Then I check exam card info in exam page
        Then I wait exam start time and enter exam
        Then I start exam
        Then I take the question and end exam
        And I verify submit answer end exam and attempt tips
        When I click start new attempt button
        Then I restart exam
        And I verify question is not answered
        Then I take the question and end exam
        When I am in exam page
        Then I check exam card attempts is right
        Then I click Re-enter
        Then I restart exam
        Then I take the question and end exam
        Then I click back to home page
        Then I logout

    Scenario: Student002 can not attempt exam after deadline
        Given I am login as student002
        When Exam deadline arrived
        Then I can see exam card is overdue
        Then I logout

    Scenario: CM verify attendance page
        Given I am login as CM
        When I am in attendance page
        Then I verify student001 student002 attempts column
        Then I verify student001 details attempts
        Then I close detail
        Then I reopen student001 student002
        And I verify student001 student002 columns after reopen
        When Stu1 enter exam
        Then I verify stu1 start time is now
        And I verify stu1 end time is null
        When Stu1 end exam
        Then I verify stu1 end time is now
