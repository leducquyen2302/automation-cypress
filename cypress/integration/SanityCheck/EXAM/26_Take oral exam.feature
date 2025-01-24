Feature: 26_Take oral exam

    Scenario: Start session to student001 and student002
        Given Admin enter the oral exam marking page
        Then I start 001 session and end 001 session
        Then I start 002 session
        Then I logout

    Scenario: Student001 filter oral exam
        Given I login as Student001
        Then I enter exam home page
        Then I filter oral exam

    Scenario: Student001 oral exam card display completed
        Given I search the oral exam
        Then I verify exam card display completed
        Then I logout

    Scenario: Student002 oral exam card display right with view instructions and click
        Given I login as Student002
        Then I enter exam home page
        And I search the oral exam
        Then I verify exam card display view instructions and click
        Then I verify exam instruction display right