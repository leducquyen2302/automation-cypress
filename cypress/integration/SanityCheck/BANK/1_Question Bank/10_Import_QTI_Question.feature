Feature: QuestionBank_10: [EXAMENA-2599]Questions QTI

    Export and import QTI questions in question bank.

    Scenario: Export questions QTI popup
        Given I am in question bank
        When I select one question
        And I click export QTI questions button
        Then I should see the popup
        Then I can check the include content checkbox
        Then I choose QTI file format
        Then I click OK button

    Scenario: Import questions QTI popup
        Given I am in question bank _Import_
        And I click import QTI questions button _Import_
        Then I should see the popup _Import_

    # Scenario: Import QTI questions from upload file
    #     Given I upload a word file
    #     And I select a course
    #     And I click Import button
    #     Then I should see the created questions