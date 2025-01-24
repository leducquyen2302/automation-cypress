Feature: PaperBank_09: [EXAMENA-2597][EXAMENA-3695] Paper with Hotspot and Ordering

    Create, preview and delete a paper with Hot spot and Ordering questions.

    Scenario: Create Paper - Hot spot Question
        Given I am in Create paper page
        When I enter Paper name
        And I select a course
        And I drag a Hotspot question to the specific area
        And I input Question content
        And I upload a picture
        And I add two response areas
        And I add separate feedback
        And I click on Complete button
        Then I should be able to save the paper
    
    Scenario: Edit Paper - Hot spot Question
        Given I have created a paper and am in Paper bank page
        When I search for the Paper created
        And I check the checkbox of the paper
        And I click on Edit button
        And I add a response area

    Scenario: Edit Paper - Ordering Question
        And I drag a Ordering question to the specific area
        And I input Question content _Edit_
        And I input options
        And I add common feedback
        And I click on Complete button _Edit_
        Then I should be able to save the paper _Edit_

    Scenario: Preview Paper
        Given I am in Paper bank page _Preview_
        When I search for the paper created _Preview_
        And I check the checkbox of the paper _Preview_
        And I click on Edit button _Preview_
        And I click on Preview button _Preview_
        Then I should be able to see the question contents and response area _Preview_