Feature: PaperBank_07: [EXAMENA-1126] Sample Exam paper

    Create, preview and delete a sample paper with questions.

    Scenario: Create Sample Paper
        # Given I am in Paper bank
        # And I click Sample exams tab
        # And I click Create paper button
        # When I enter Paper name
        # And I select a course
        # And I drag an Essay question to the specific area
        # And I input Question content 
        # And I click on Complete button 
        # Then I should be able to save the paper

    Scenario: Preview Paper
        # Given I am in Paper bank page _Preview_
        # When I search for the paper created _Preview_
        # And I check the checkbox of the paper _Preview_
        # And I click on Edit button _Preview_
        # And I click on Preview button _Preview_
        # Then I should be able to see the question contents _Preview_

    # Scenario: Delete Sample Paper
    #     Given I am in Paper bank page _Delete_
    #     When I search for the paper created _Delete_
    #     When I check the checkbox of the paper _Delete_
    #     And I click on Delete button _Delete_
    #     And I click on OK button _Delete_
    #     Then I should be able to delete the paper _Delete_