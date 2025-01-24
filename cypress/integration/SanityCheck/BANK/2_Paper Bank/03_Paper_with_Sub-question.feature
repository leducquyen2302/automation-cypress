Feature: PaperBank_03: [EMS-862] Paper with Sub-question

#     Create, preview and delete a paper with a Sub-question.

    Scenario: Create Paper - Sub-question
#     Given I am in Create paper page
#     When I enter Paper name
#     And I select a course
#     And I drag a Sub-question to the specific area 
#     And I input Question content 
#     And I click on Add a new sub-question button to add a Choice question as a Sub-question 
#     And I input Question content and Choice value 
#     And I set correct answer 
#     And I click on Add a new sub-question button to add a Choice question as a Sub-question _Choice MA_
#     And I enable Multiple answers 
#     And I click on Add choice button 
#     And I input Question content and Choice value _Choice MA_
#     And I set correct answers 
#     And I click on Add a new sub-question button to add an Essay question to the specific area 
#     And I input Question content _Essay_
#     And I click on Add a new sub-question button to add a Fill-in-the-blank question 
#     And I input Question content and add a blank 
#     And I input correct answer 
#     And I click on Complete button 
#     Then I should be able to save the paper 

#     Scenario: Preview Paper
#     Given I am in Paper bank page _Preview_
#     When I search for the paper created _Preview_
#     And I check the checkbox of the paper _Preview_
#     And I click on Edit button _Preview_
#     And I click on Preview button _Preview_
#     Then I should be able to see the question contents and all respective values _Preview_

#     # Scenario: Delete Paper
#     # Given I am in Paper bank page _Delete_
#     # When I search for the paper created _Delete_
#     # When I check the checkbox of the paper _Delete_
#     # And I click on Delete button _Delete_
#     # And I click on OK button _Delete_
#     # Then I should be able to delete the paper _Delete_