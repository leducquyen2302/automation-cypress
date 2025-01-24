Feature: PaperSkeleton_01: [EMS-2803]Create/Edit/View/Delete skeleton

#     Create, edit, preview and delete a skeleton in paper skeleton page.

    Scenario: Create Skeleton
#         Given I am in Create Skeleton page
#         When I enter the title of basic information
#         And I input the description of basic information
#         And I add questions and save
#         And I click on Save button
#         Then I should be able to save the Skeleton

#     Scenario: Edit Skeleton
#         Given  I am in paper skeleton page _Edit_
#         When I search for the skeleton created _Edit_
#         And I check the checkbox of the skeleton _Edit_
#         And I click on Edit button _Edit_
#         And I edit the skeleton and add a question of the skeleton _Edit_
#         And I click on Save button of add question page _Edit_
#         Then I should be able to save the question _Edit_
#         When I click on Save button _Edit_
#     # Then I should be able to see the edited information in the table displayed correctly _Edit_

#     Scenario: View Skeleton
#         Given  I am in paper skeleton page _View_
#         When I search for the skeleton created _View_
#         And I check the checkbox of the skeleton _View_
#         And I click on View button _View_
#         Then I should be able to see the skeleton information and questions settings _View_
#         When I click edit button _View_
#         Then I should be able to see the edit view _View_
#         When I delete a question in skeleton page and save _View_
#         Then I should be able to edit skeleton from view skeleton _View_

#     Scenario: Skeleton Show on Bank Page
#         Given  I am in paper skeleton page _Favorite_
#         When I search for the skeleton created _Favorite_
#         And I click on Show on Bank Page button _Favorite_
#         Then I should be able to set the skeleton favorite _Favorite_
#         And I go back to bank homepage _Favorite_
#         Then I should be able to see the skeleton information in bank page _Favorite_

#     Scenario: Delete Skeleton
#         Given I am in paper skeleton page _Delete_
#         When I search for the skeleton created _Delete_
#         When I check the checkbox of the skeleton _Delete_
#         And I click on Delete button _Delete_
#         And I click on OK button _Delete_
#         Then I should be able to delete the skeleton _Delete_