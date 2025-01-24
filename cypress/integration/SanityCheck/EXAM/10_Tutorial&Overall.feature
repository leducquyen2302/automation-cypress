Feature:Exam_10: [EMS-858]Exam Overall and tutorial
作为Course Manager，我想查看和我相关Course的考试进展情况，以便于我安排接下来的考试

    Scenario: I see a overall table on Homepage , I can see my latest exam at first
        Given I logged in Homepage as Course Manager
        Then I can see 6 cards on homepage at most, and the latest exam at first

    Scenario: I can see more exams through click See all
        Given I'm already in Homepage
        When I click the "See all" link beside the Exam Overall list

    Scenario: I opening create exam step by step tutorial and see each steps
        Given I'm already in Exam page
        When I click the tutorial
        Then I visit every step on Menu to see the step tutorial