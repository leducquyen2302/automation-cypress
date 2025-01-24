Feature: PaperBank_05: [EXAMENA-30] PDF Paper

#     Create, edit, preview and delete a paper imported by pdf format.

    Scenario: Import PDF paper popup
#         Given I am in paper bank
#         And I click import pdf paper
#         Then I should see the popup

#     Scenario: Import PDF paper upload file
#         Given I upload a pdf file
#         And I input PDF paper question number
#         And I click Import button
#         Then I should see the Create PDF paper page
#         Then I should see the question number imported

#     Scenario: PDF paper Zoom in Create page
#         When The PDF is loaded
#         Then The PDF percentage is fit width by default
#         When I click pdf 100% percentage
#         And I click zoom in
#         Then The pdf percentage should be 110%

#     Scenario: Create PDF paper
#         When I add a section
#         And add new section question response
#         Then I should see the new question
#         When I input paper name
#         And I select a course
#         And I type marking scheme of one question
#         And I click save button
#         Then I should save the PDF paper

#     Scenario: Edit PDF paper
#         Given pdf paper has already been imported
#         When I check PDF paper item
#         And I click Edit paper button
#         Then I should see edit pdf paper page
#         When I type question marking scheme
#         And I delete a question response
#         And I click save button _Edit_
#         Then I should save the PDF paper _Edit_

#     Scenario: Preview PDF paper
#         Given In edit PDF paper page
#         When I click preview
#         Then I should see questions and marking scheme
#         When I click candidate view
#         Then I should see left panel and can drag splitter

#     # Scenario: Delete PDF paper
#     #     When I click paper bank breadcrumb
#     #     And I check the checkbox of the paper
#     #     And I click on Delete button
#     #     And I click on OK button
#     #     Then I should be able to delete the paper