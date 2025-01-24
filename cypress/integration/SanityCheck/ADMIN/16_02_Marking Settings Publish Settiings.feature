Feature: Admin_16: Marking settings - Publish settings

      Scenario: AppAdmin verify Grades can check when enable grade mapping
            Given Login as AppAdmin enter Publish settings
            Then I verify Grades can check

      Scenario: I verify Grades cannot check when disable grade mapping
            Given I disable grade mapping
            Then I verify Grades cannot check is disabled
            Then I click save

      Scenario: I verify step3 value follow the Marking setting
            Given I create exam and in step3 add paper
            Then I verify score publishing value are right

      Scenario: I verify step3 Grades and grade mapping have related in edit publish settings
            Given I cilck edit publish settings
            Then I verify Grades cannot check is disabled
            When I open the grade mapping
            Then I set grade mapping template score
            And I check Grades
            Then I verify score publishing value are edited right
            Then I publish exam

      Scenario: I verify Grades and grade mapping display right in grading progress edit publish settings
            Given I enter the grading progress page
            Then I click edit publish settings
            And I verify display right follow step3

      Scenario: I disable grade mapping and verify Grades is disabled
            Given I disable grade mapping
            Then I verify Grades cannot check is disabled
            And I verify Grades column not in table

      Scenario: I publish all result and verify have 0 candidate in popup
            Given I click publish to all
            Then I verify the publish popup display right and the toast is right

      Scenario: I unpublish all result and verify have 0 candidate in popup
            Given I click unpublish to all
            Then I verify the unpublish popup display right and the toast is right

      Scenario: I set publish settings as default
            Given I enter Publish settings
            Then I enable grade mapping
            Then I click save