Feature: PaperBank_02: [EMS-862] Paper with Essay and FIB

    Create, preview and delete a paper with an Essay question and a Fill-in-the-blank question.

    Scenario: Create Paper - Essay Question
    # Given I am in Create paper page
    # When I enter Paper name
    # And I select a course
    # And I drag an Essay question to the specific area _Essay_
    # And I input Question content _Essay_
    # And I click on Complete button _Essay_
    # Then I should be able to save the paper _Essay_

    Scenario: Create Paper - Fill-in-the-blank Question
    # Given I have created a paper and am in Paper bank page _FIB_
    # When I search for the Paper created _FIB_
    # And I check the checkbox of the paper _FIB_
    # And I click on Edit button _FIB_
    # And I drag a Fill-in-the-blank question to the specific area _FIB_
    # And I input Question content and add a blank _FIB_
    # And I input Correct answer _FIB_
    # And I click on Complete button _FIB_
    # Then I should be able to save the paper _FIB_

    Scenario: Preview Paper
    # Given I am in Paper bank page _Preview_
    # When I search for the paper created _Preview_
    # And I check the checkbox of the paper _Preview_
    # And I click on Edit button _Preview_
    # And I click on Preview button _Preview_
    # Then I should be able to see the question contents and all respective values _Preview_

    Scenario: Delete Paper
    # Given I am in Paper bank page _Delete_
    # When I search for the paper created _Delete_
    # When I check the checkbox of the paper _Delete_
    # And I click on Delete button _Delete_
    # And I click on OK button _Delete_
    # Then I should be able to delete the paper _Delete_