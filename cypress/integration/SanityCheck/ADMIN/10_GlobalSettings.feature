Feature: Admin_10: Global Settings

      Scenario: Enter global settings card
            Given I login as application admin and in admin page
            Then I verify Global Settings configuration position,instruction and enter

      Scenario: Verify data retention
            Given I verify data retention tab bar,content
            And I verify default days
            When I set 31 days
            Then I verify validation message
            When I set 1 days
            Then I save and verify save success toast
            Then I set 30 days

      Scenario: Verify user profile setting hide user id in account management
            When I switch user profile setting
            Then I verify user profile setting content
            And I verify default is checked
            When I uncheck User ID, email, Mobile
            Then I save and verify toast
            When I enter account management page
            Then I verify User ID and Mobile not exist

      Scenario: Verify hide user id in Role management with user id column
            Given I enter Role management
            Then I click the user profile picture on user id column
            Then I verify user ID is hide

      Scenario: Verify hide user id in Course configuration with table column
            Given I enter Course configuration
            Then I click the user profile picture on table column
            Then I verify user ID is hide

      Scenario: Verify hide user id in Course configuration with edit candidate
            Given I enter the edit candidate page
            Then I click the user profile picture on edit candidate page
            Then I verify user ID is hide

      Scenario: Verify hide user id in Course configuration with edit class
            Given I enter the edit class page
            Then I click the user profile picture on edit class page
            Then I verify user ID is hide

      Scenario: Verify hide user id in Course configuration with address book
            Given I open the address book
            Then I verify user ID is null in address book

      Scenario: Verify hide user id in Organisation configuration with organization admin
            Given I enter Organisation configuration
            Then I click the user profile picture on organization admin
            Then I verify user ID is hide

      Scenario: Verify hide user id in Sample report
            Given I enter Sample report
            Then I click the user profile picture on table column
            Then I verify user ID is hide

      Scenario: Verify hide user id in Exam table view
            Given I enter Exam table view
            Then I click the user profile picture on table column
            Then I verify user ID is hide

      Scenario: Verify hide user id in Step2 with table
            Given I enter open book exam step2
            Then I click the user profile picture on table column
            Then I verify user ID is hide

      Scenario: Verify hide user id in Step3 with exam basic information
            Given I enter Step3 with exam information
            Then I click the user profile picture on exam basic information
            Then I verify user ID is hide

      Scenario: Verify hide user id in Preview exam with exam information
            Given I enter Preview exam with exam information
            Then I verify user ID is null on exam information

      Scenario: Verify hide user id in Attendance page with candidate detail
            Given I enter Attendance page with candidate detail
            Then I verify user ID is null on candidate detail

      Scenario: Verify hide user id in Attendance page with exam information
            Given I click the user profile picture on exam basic information
            Then I verify user ID is hide

      Scenario: Verify candidate hide user id in home page with user name
            Given I logout and login as student001
            Then I click the user profile picture on right user name
            Then I verify user ID is hide on right user name

      Scenario: Verify candidate hide user id in start exam page with exam information
            Given I enter start exam page with exam information
            Then I verify user ID is null on exam information

      Scenario: Verify hide user id in live proctoring page with candidate list
            Given I logout and login as system
            Then I enter live proctoring page page
            And I click the user profile picture on candidate list
            Then I verify user ID is hide

      Scenario: Check user ID and Mobile
            Then I enter the global setting page
            Then I check User ID and Mobile