Feature: Admin_11_01: Conduct settings Shortcut

      Scenario: I verify conduct settings card
            Given I login as exam admin and verify userId is checked
            Then I verify conduct settings configuration position,instruction and enter

      Scenario: I add shortcut
            When I click add shortcut button and save button
            Then I verify the illegal tips
            And I verify the keep same short cut for each system button default is opened
            Then I add shortcut1 with keep same short cut for each system
            And I verify windows and mac display right
            Then I click save and add another button
            And I verify save success tip
            Then I add shortcut2 without keep same short cut for each system

      Scenario: I edit shortcut
            When I search shortcut1
            Then I verify shortcut1 all column
            Then I edit shortcut1 all info with named shortcut1_edit, not keep same, edit mac shorcut
            And I verify edit success tip
            When I search shortcut
            Then I select all and click deactivate
            And I verify deactivate popup info
            Then I confirm deactivate and verify deactivate success tip
            And I verify all column info
            When I select shortcut2 and click activate
            Then I verify activate popup info
            Then I confirm activate and verify activate success tip
            And I verify shortcut2 status
            When I select all
            Then I verify activate button and deactivate button cannot click

      Scenario: I verify filter
            Given I cancel search
            Then I filter type is custom
            And I search shortcut
            Then I verify result with these two function names is right
            When I filter status is inactive
            Then I verify result with the function name is right

      Scenario: I delete shortcut by search shortcut
            Given I cancel filter
            When I search shortcut by shortcut1_edit's windows shortcut
            Then I verify search windows shortcut result is right
            Then I click delete
            And I verify delete popup info
            Then I confirm delete and verify delete success tip
            When I search shortcut by shortcut2's mac shortcut
            Then I verify search shortcut in macos result info
            Then I delete it

      Scenario: I verify shortcut bulid-in data
            Given I cancel search
            Then I filter type is default and status is all
            # When I click show 100 rows
            # Then I verify build in data number