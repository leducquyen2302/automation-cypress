Feature:Admin_04: [EMS-1173] Account Management
    作为Exam Admin, 可以通过页面对examena系统中的账号进行编辑，以便于我保证系统内学员和老师的信息准确性

    Scenario: Staff List, Search Staff, Edit staff profile, Add property
        Given I login as system
        Then I enter the account management page
        When I search staff
        Then I verify search staff result
        When I click edit profile button
        Then I add property1
        And I verify can not add same name
        Then I add property2 and save

    Scenario: Filter user in address book in role management
        Given I enter role management and open address book
        When I filter user in address book
        Then I verify filter user result is right

    Scenario: Verify address book selected user prompt in role management
        When I search the System and as the first staff
        Then I verify the selected one user prompt display is right
        When I search the CM and as the second staff
        Then I verify the selected two users prompt display is right
        When I click remove all button
        Then I verify the selected no users prompt display is right

    Scenario: Filter property in address book in role management
        Given I clear search
        When I filter property in address book
        Then I verify filter property result is right
        When I click property number
        Then I verify all property

    Scenario: Filter property in account management
        Given I enter account management by left navigation
        When I filter property in account management
        Then I verify staff property
        When I click property number
        Then I verify all property
        When I click edit profile button
        Then I verify staff info in panel
        Then I delete all property

    Scenario: Candidate List, Search Candidate, Edit Candidate profile
        Given I goto candidate list page
        When I search student
        Then I verify search student result is right
        When I click edit profile button
        Then I verify student info in panel