Feature: PaperBank_01: [EMS-862] Paper with Choice

    Create, preview and delete a paper with a single-answer choice question and a multiple-answers choice question.

    Scenario: Create Paper - Save as Draft
    Given I am in Create paper page
    When I enter Paper name
    And I select a course
    And I click on Save as draft button

    Scenario: Create Paper - Choice Question with Single Answer
    Given I have created a paper and am in Paper bank page _Choice SA_
    When I search for the Paper created _Choice SA_
    And I check the checkbox of the paper _Choice SA_
    And I click on Edit button _Choice SA_
    And I drag a Choice question to the specific area _Choice SA_
    And I input Question content _Choice SA_
    And I input Choice value _Choice SA_
    And I set correct answer _Choice SA_
    And I click on Save as draft button _Choice SA_
    Then I should be able to save the paper _Choice SA_

    Scenario: Create Paper - Choice Question with Multiple Answers
    Given I have created a paper and am in Paper bank page _Choice MA_
    When I search for the Paper created _Choice MA_
    And I check the checkbox of the paper _Choice MA_
    And I click on Edit button _Choice MA_
    And I drag a Choice question to the specific area _Choice MA_
    And I enable Multiple answers _Choice MA_
    And I input Question content _Choice MA_
    And I click on Add choice button _Choice MA_
    And I input Choice value _Choice MA_
    And I set correct answers _Choice MA_
    And I click on Save as draft button _Choice MA_
    Then I should be able to save the paper _Choice MA_
    
    Scenario: Preview Paper
    Given I am in Paper bank page _Preview_
    When I search for the paper created _Preview_
    And I check the checkbox of the paper _Preview_
    And I click on Edit button _Preview_
    And I click on Preview button _Preview_
    Then I should be able to see the question contents and all respective values _Preview_

    Scenario: Delete Paper
    Given I am in Paper bank page _Delete_
    When I search for the paper created _Delete_
    When I check the checkbox of the paper _Delete_
    And I click on Delete button _Delete_
    And I click on OK button _Delete_
    Then I should be able to delete the paper _Delete_