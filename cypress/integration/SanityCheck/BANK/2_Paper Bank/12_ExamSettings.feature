Feature: PaperBank_12: ExamSettings 

#     View,Edit Exam settings.

    Scenario: Add multi question in paper by import excel
#         Given I am in paper bank
#         And I click import paper from excel
#         Then I should see the popup
#         Given I upload a excel file
#         And I click Import button
#         Then I should see the Create paper page
#         When I input paper name
#         And I select a course
#     Scenario: Edit exam settings to Randomaiztion
#         Given I can edit exam settings [Randomaiztion]
#         Then I go to Candidate view
#         Then I can view question display in different sequence
#         Then I exit prevew paper page
#     Scenario: Edit exam settings to No Randomaiztion
#         Given I can edit exam settings [No randomaiztion]
#         Then I go to Candidate view
#         Then I can view question display in same sequence
#         Then I exit prevew paper page
#     Scenario: Edit Randomaiztion Choice to Yes
#         Given I verify question randomisation setting is No
#         Then I edit Randomaiztion Choice to Yes and Apply
#         Then I verify question randomisation setting is No
#         Then I edit Randomaiztion Choice to Yes and Apply to All
#         Then I verify question randomisation setting is Yes
#     Scenario: Edit Randomaiztion Choice to No
#         Given I verify question randomisation setting is Yes
#         Then I edit Randomaiztion Choice to No and only Apply
#         Then I verify question randomisation setting is Yes
#         Then I edit Randomaiztion Choice to No and Apply to All
#         Then I verify question randomisation setting is No