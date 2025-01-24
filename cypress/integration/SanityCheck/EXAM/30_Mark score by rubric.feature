Feature: 30_Mark score by rubric

    Scenario: Create exam with rubric
        Given Create exam in step3
        Then I create paper with rubric and publish exam

    Scenario: Student001 complete the exam
        Given Student001 complete the exam

    Scenario: I verify rubric information are right in mark student001 score page
        Given I enter mark student001 score page
        Then I verify rubric title, content and score
        And I input score 5

    Scenario: I verify mark in rubric matrix
        Given I click mark in rubric matrix
        Then I verify table info are right
        And I verify corresponding mark region compentent is highlight
    
    Scenario: I verify mark Invalid value in rubric matrix
        When I enter a number greater than the maximum value
        Then I verify the greater number tip is right
        When I input new mark 15 in rubric matrix
        Then I verify corresponding mark region proficient is highlight
        Then I close the matrix panel
        And I verify question score display right 15

    Scenario: I verify AI marking language
        Given I click AI marking
        Then I verify tip content display right
        And I verify language is English by default
        Then I verify have five languages
        When I search Chinese and choose it to save and generate
        Then I verify AI marking result

    Scenario: I verify AI marking not in view marking history after go back
        When I click go back button
        Then I cannot see records in view marking history

    Scenario: I enter AI marking again verify language is Chinese by default
        When I click AI marking
        Then I verify the language is Chinese

    Scenario: I verify regenerate AI marking
        When I click generate button
        Then I verify AI marking result
        When I click regenerate button
        Then I verify AI marking result

    Scenario: I apply the AI marking
        When I click apply button
        Then I verify the mark comment is the AI marking comment
        And I verify the AI marking comment display right in view marking history