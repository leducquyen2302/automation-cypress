Feature: 23_Allow Candidates To View Previous Questions

    Scenario: Create exam set not allow candidates to view previous questions
        Given I create exam and goto step3
        Then I click edit question settings button
        And I set not allow candidates to view previous questions
        Then I publish exam

    Scenario: Verify cannot switch question by the question number
        Given Student enter the exam
        Then I verify question 2 cannot click
        And The tooltip display right

    Scenario: Verify confirm that click the next question when there is no answer
        Given I click the next question
        Then I verify the confirm is right when there is no answer

    Scenario: Verify confirm that click the next question when there is answer
        Given I answer the question
        Then I click the next question
        Then I verify the confirm is right when there is answer

    Scenario: Verify next question still show confirm when not check do not show again checkbox
        Given I click the confirm button
        Then I verify in question 2
        And I answer the question
        When I click the next question
        Then I still see the confirm

    Scenario: Verify check do not show again
        Given I check do not show again
        Then I answer the question
        Then I click the next question
        Then I verify in question 4

    Scenario: Verify recovery site
        Given I reload the page
        Then I answer the question
        Then I click the next question
        Then I still see the confirm
