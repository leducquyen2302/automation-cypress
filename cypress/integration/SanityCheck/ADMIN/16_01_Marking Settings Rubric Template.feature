Feature: Admin_16: Marking settings - Rubric template

      Scenario: AppAdmin verify illegal tip
            Given Login as AppAdmin enter Rubric template
            When I click Create rubric template
            Then I click save button
            Then I verify illegal tip
            And I verify the template have 3 columns and 2 rows by default
            Then I input name and course AT002
            When I delete all colums and rows
            Then I click save button
            Then I verify illegal tip Add at least one performance level
            When I add one performance level
            Then I click save button
            Then I verify illegal tip Add at least one criterion
            Then I add the criterion
            When I open edit performance level title
            Then I click save button
            Then I verify illegal tip Complete your settings before saving the rubric template
            And I input the performance level title
            And I input the marks title
            Then I click save button
            Then I verify illegal tip Complete the configurations for this performance level
            When I open performance level mark to 0
            Then I verify illegal tip Enter a positive integer or a decimal with one decimal place

      Scenario: I create Rubric template
            Given I input marking range and description
            Then I click save button

      Scenario: I edit Rubric template
            Given I choose Rubric template just created
            Then I edit the Rubric template name
            And I click save button

      Scenario: I duplicate Rubric template
            Given I choose Rubric template just created
            Then I click duplicate button to the Rubric template
            When I do not choose course to click save
            Then I verify illegal tip Enter a value to proceed
            Then I also choose course AT002 and save

      Scenario: I delete the duplicate Rubric template
            Given I search the duplicate Rubric template
            Then I choose it and delete it

      Scenario: I filter the course AT002
            Given I clear search
            Then I filter the course AT002

      Scenario: I view Rubric template details
            Given I click Rubric template name
            Then I verify Rubric template details

      Scenario: I delete Rubric template
            Given I close Rubric template details
            Then I delete Rubric template