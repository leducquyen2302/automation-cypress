Feature:Admin_02: Role management

    Scenario: I enter role management can see app admin and exam admin
        Given I am login the Examna sytem and visit Admin page
        Then I click the Role management card in Admin page

    Scenario: Verify app admin in global
        Given I check app admin and click edit button
        Then I verify app admin role name display right and can not edit
        And I verify app admin permissions display right and all checked, can not edit
        Then I add app admin description, and add addUser
        Then I click save button
        And I verify app admin all info is right on table
        When I click app admin permission number icon
        Then I verify app admin all info is right on details
        Then I click edit button on details
        Then I verify description echo is right on panel
        Then I remove addUser
        And I click save button
        And I verify app admin users is right on table

    Scenario: Verify exam admin in global
        Given I check exam admin and click edit button
        Then I verify exam admin role name display right and can not edit
        And I verify exam admin permissions display, checked right
        Then I click cancel button on panel
        And I verify exam admin info is right on table
        When I also check app admin
        Then I find delete button is disabled

    Scenario: Customized role in global
        Given I click create role
        When I click save button
        Then I can see role name, users are must be have value
        Then I input role name, description, users
        When I check role management manage permission
        Then I can see role management view permission checked and disabled
        Then I click save button
        When I search the customized role
        And I verify customized role info is right on table
        Then I delete the customized role

    Scenario: Verify school admin
        Given I switch the school tab
        Then I click edit the school role by right button
        And I verify role management manage and view are not checked
        Then I input description
        Then I click save button
        Then I verify school role info is right on table
        When I click the school admin permission number icon
        Then I verify the school admin permission is right

    Scenario: Verify discipline admin
        Given I switch the discipline tab
        When I click the discipline admin permission number icon
        Then I verify the discipline admin permission is right

    Scenario: Verify course role
        Given I switch the course tab
        When I click the class owner permission number icon
        Then I verify the class owner permission is right
        When I click the co course manager permission number icon
        Then I verify the co course manager permission is right
        When I click the course manager permission number icon
        Then I verify the course manager permission is right
        When I click the question crafter permission number icon
        Then I verify the question crafter permission is right
        Then I verify course all info is right on table

    Scenario: Verify exam role
        Given I switch the exam tab
        When I click the checker permission number icon
        Then I verify the checker permission is right
        When I click the marker permission number icon
        Then I verify the marker permission is right
        When I click the monitor permission number icon
        Then I verify the monitor permission is right
        When I click the invigilator permission number icon
        Then I verify the invigilator permission is right
        When I click the supervisor permission number icon
        Then I verify the supervisor permission is right
        Then I verify exam all info is right on table