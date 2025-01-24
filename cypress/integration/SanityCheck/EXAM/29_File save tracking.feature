Feature: 29_File save tracking

    Scenario: Create exam with file save tracking question
        Given Create exam with file save tracking question

    Scenario: Enter file save tracking page and verify only show candidates without saving
        Given Enter file save tracking page
        When I click only show candidates without saving
        Then I verify no items to show
        Then I cancel check it

    Scenario: Filter Attendance status is Present
        Given I filter Attendance status is Present
        Then I verify no items to show

    Scenario: Filter Submission status is Submitted
        Given I reenter this page
        Then I filter Submission status is Submitted
        Then I verify no items to show

    Scenario: Verify refresh button
        Given I reenter this page
        Then I search student001
        When I click refresh button
        Then I verify total 1 candidates and have update tip

    Scenario: Verify basic info
        Then I verify student001 table info
        When I click view question content
        Then I verify question content is right