Feature: 27_Oral exam attendance

    Scenario: Verify oral exam basic info
        Given I enter the attendance page
        Then I verify oral exam basic info

    Scenario: Filter class name
        Given Filter Class1
        Then I verify have 4 result

    Scenario: Filter attendance status
        Given Filter Present attendance status
        Then I verify have 2 result

    Scenario: Filter oral exam progress
        Given Filter Completed oral exam progress
        Then I verify result student only have student001

    Scenario: Filter exam time
        Given Reload attendance page to clear filter
        Then Filter today exam time student
        Then I verify have 2 result

    Scenario: Select student006 to edit exam end time
        Given Select student006 to edit exam end time
        Then I verify student006 comment display right on table

    Scenario: Reopen student001
        Given Select student001 to reopen exam
        Then I verify student001 status, end time and comment display right on table