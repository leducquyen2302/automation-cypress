Feature: 30_Mark score by rubric

    Scenario: Verify all columns tab display right on manage views panel
        Given Login as system admin
        Then Enter marking progress
        When I click manage views
        Then I verify All columns tab display highlight and default
        And I verify set as default display yes
        And I verify all columns are checked
        When I click edit all columns
        Then I verify name cannot edit and set as default button checked
        Then I click cancel

    Scenario: Create view in regular marking
        Given I click create view
        When I click save create view button
        Then I verify illegal tip
        Then I input name and set as default
        Then I verify just create view is highlight and display default
        And I verify Candidate name, Total score, Marking progress, Marker status, Marking status Double-blind marking, Action are disabled check
        Then I check Candidate ID and click move up
        Then I click save manage views
        Then I verify table display right in regular marking

    Scenario: Verify view in double mind marking
        Given I switch double mind marking
        Then I verify default view is just created
        Then I verify table display right in double mind marking

    Scenario: Edit view in double mind marking
        Given I click manage views
        Then I verify All columns tab set as default display No
        When I switch just created view
        Then I move down Candidate ID
        And I edit the view name
        Then I click save manage views
        Then I verify table display right after edit in double mind marking

    Scenario: CM check marking progress table view
        Given Login as CM
        Then Enter marking progress
        Then I verify table display all columns

    Scenario: System delete just created table view
        Given CM logout and login as system admin
        Then Enter marking progress
        Then I click manage views
        When I switch just created view
        Then I delete just created table view

    Scenario: Create table view in grading progress
        Given I enter grading progress
        Then I verify table view name display all columns
        When I click manage views
        Then I create table view and set default in grading progress
        And I check Candidate ID and click move up
        Then I click save manage views
        Then I verify table view is just created in grading progress

    Scenario: Edit table view set all columns default in grading progress
        Given I click manage views
        Then I click edit all columns
        Then I set as default
        And I verify table display all columns in grading progress

    Scenario: Delete table view in grading progress
        Given I click manage views
        Then I switch just created view
        Then I delete just created table view