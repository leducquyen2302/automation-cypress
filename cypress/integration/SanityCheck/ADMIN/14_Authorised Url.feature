Feature: Admin_14: Authorised Url

      Scenario: I verify Authorised Url card
            Given I login as system admin and in admin page
            Then I verify Authorised Url configuration position,instruction and enter

      Scenario: Add url
            When I click add url
            Then I click Preview in Examena App
            And I verify validation message
            When I input info, upload photo
            Then I click Preview in Examena App
            # And I verify the dialog infomation
            Then I close the dialog and save
            And I verify url info is right in table

      Scenario: Verify can same name
            When I add same name url
            Then I add successfully

      Scenario: View details and edit url
            When I click url name to view details
            Then I verify view details info
            When I click edit button in view details panel
            Then I edit name and save
            And I verify edit url info is right in table

      Scenario: Exam add global url
            Given I create exam
            Then I add global url and search url name
            When I click the global url name
            Then I verify the global url info is right
            Then I save the url and click save and next

      Scenario: Delete url
            Given I choose all url in Authorised url
            Then I delete all

      Scenario: Verify exam url is not changed
            Given I enter exam just created
            Then I also can see the global url